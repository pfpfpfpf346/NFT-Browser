from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app)

opensea_api_key = "d7bc517c25894772ae915ef729c8a443"
alchemy_api_key = "Fn6XgY7SlhdqnbN09xv5QFenmRxaK0Ej"
delay = 0.4

opensea_headers = {
    "accept": "application/json",
    "X-API-KEY": opensea_api_key
}

def iterate_get_nfts(nfts_raw): # iterate getting sale value out of json
    out = []
    for nft in nfts_raw:
        collection = nft["contract"]
        identifier = nft["identifier"]
        token_standard = nft["token_standard"]
        name = nft["name"]
        opensea_url = nft["opensea_url"]
        out.append([collection, identifier, token_standard, name, opensea_url]) # nft_data
    return out

def get_nfts_acc(acc, cursor, iter): # get sale data
    if cursor:
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=100&next={cursor}"
    else:
        nfts = []
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=100"
    response = requests.get(url, headers=opensea_headers)
    print("get nft code:", response.status_code)
    data = response.json()
    if 'next' in data:
        next = data['next']
    else:
        next = False
    nfts_raw = data['nfts']
    nfts = iterate_get_nfts(nfts_raw)
    return (nfts, next)

def alchemy_process(nfts):
    input = []
    for nft in nfts:
        input.append({"contractAddress": nft[0], 
                      "tokenId": nft[1],
                      "tokenType": nft[2]})
    url = f"https://eth-mainnet.g.alchemy.com/nft/v3/{alchemy_api_key}/getNFTMetadataBatch"
    payload = {"tokens": input, "refreshCache": False}
    headers = {
        "accept": "application/json",
        "content-type": "application/json"
    }
    response = requests.post(url, json=payload, headers=headers)
    print("get nft addi_data code:", response.status_code)
    data = response.json()
    out = []
    for i in range(len(data["nfts"])):
        nft_data = nfts[i]
        nft_additional_data = data["nfts"][i]
        opensea_metadata = nft_additional_data["contract"]["openSeaMetadata"]

        name = nft_additional_data["name"]
        if not name:
            name = nft_data[3]
        colle_name = opensea_metadata["collectionName"]
        image = nft_additional_data["image"]["cachedUrl"]
        if not image:
            image = opensea_metadata["imageUrl"]
        opensea_url = nft_data[4]
        out.append([name, colle_name, image, opensea_url]) # final
    return out

@app.route('/search-wallet', methods=['POST'])
def search_wallet():
    data = request.get_json()
    # Perform processing with the received data
    wallet_address = data['walletAddress']
    cursor = data['cursor']
    (nfts, next) = get_nfts_acc(wallet_address, cursor, 0)
    #use alchemy to process nfts
    nfts_processed = alchemy_process(nfts)
    processed_data = {
        'message': 'Data processed successfully',
        'input_data': wallet_address,
        'output': nfts_processed,
        'next': next
    }
    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(port=5001)
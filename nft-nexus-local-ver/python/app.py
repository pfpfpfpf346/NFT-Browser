from flask import Flask, request, jsonify
import json
from flask_cors import CORS
import requests
import time

app = Flask(__name__)
CORS(app)

api_key = "d7bc517c25894772ae915ef729c8a443"
delay = 0.4

headers = {
    "accept": "application/json",
    "X-API-KEY": api_key
}

def iterate_get_nfts(nfts_raw): # iterate getting sale value out of json
    out = []
    for nft in nfts_raw:
        name = nft["name"]
        collection = nft["collection"]
        raw_image_url = nft["image_url"]
        raw_opensea_url = nft["opensea_url"]
        if raw_image_url:
            image_url = raw_image_url
        else:
            image_url = False
        raw_metadata_url = nft["metadata_url"]
        if raw_opensea_url:
            opensea_url = raw_opensea_url
        else:
            opensea_url = False
        if raw_metadata_url:
            metadata_url = raw_metadata_url
        else:
            metadata_url = False
        
        out.append([name, collection, image_url, opensea_url, metadata_url])
 
    return out

def get_nfts_acc(acc, cursor, iter): # get sale data
    if cursor:
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=100&next={cursor}"
    else:
        nfts = []
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=100"
    response = requests.get(url, headers=headers)
    print("get nft code:", response.status_code)
    data = response.json()
    if 'next' in data:
        next = data['next']
    else:
        next = False
    nfts_raw = data['nfts']
    nfts = iterate_get_nfts(nfts_raw)
    return (nfts, next)
        

@app.route('/search-wallet', methods=['POST'])
def search_wallet():
    data = request.get_json()
    # Perform processing with the received data
    wallet_address = data['walletAddress']
    cursor = data['cursor']
    (nfts, next) = get_nfts_acc(wallet_address, cursor, 0)
    processed_data = {
        'message': 'Data processed successfully',
        'input_data': wallet_address,
        'output': nfts,
        'next': next
    }
    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(port=5001)
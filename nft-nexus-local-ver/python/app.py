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
        if raw_image_url and len(raw_image_url) > 8 and raw_image_url[:8] == 'https://':
            image_url = raw_image_url
        else:
            image_url = False
        raw_metadata_url = nft["metadata_url"]
        if raw_metadata_url and len(raw_metadata_url) > 8 and raw_metadata_url[:8] == 'https://':
            metadata_url = raw_metadata_url
        else:
            metadata_url = False

        out.append([name, collection, image_url, metadata_url])
 
    return out

def get_nfts_acc(acc, cursor, iter): # get sale data
    if cursor:
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=200&next={cursor}"
    else:
        nfts = []
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=200"
    response = requests.get(url, headers=headers)
    print("get nft code:", response.status_code)
    data = response.json()
    if 'next' in data:
        next = data['next']
    else:
        next = False
    nfts_raw = data['nfts']
    nfts = iterate_get_nfts(nfts_raw)
    if next and iter < 4:
        time.sleep(delay)
        return nfts + get_nfts_acc(acc, next, iter + 1)
    else:
        if next:
            print("too many nfts, taking top 1000 only")
        return nfts

@app.route('/search-wallet', methods=['POST'])
def search_wallet():
    data = request.get_json()
    # Perform processing with the received data
    wallet_address = data['walletAddress']
    res = get_nfts_acc(wallet_address, False, 0)
    processed_data = {
        'message': 'Data processed successfully',
        'input_data': wallet_address,
        'output': res
    }
    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(port=5001)
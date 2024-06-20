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

alchemy_headers = {"accept": "application/json"}

# get nft from account api

def iterate_get_nfts(nfts_raw): # iterate getting nft out of json
    out = []
    for nft in nfts_raw:
        collection = nft["contract"]
        identifier = nft["identifier"]
        token_standard = nft["token_standard"]
        name = nft["name"]
        opensea_url = nft["opensea_url"]
        out.append([collection, identifier, token_standard, name, opensea_url]) # nft_data
    return out

def get_nfts_acc(acc, cursor, iter, order_dir, order_by): # get nfts from acc
    if cursor:
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=100&next={cursor}"
    else:
        nfts = []
        url = f"https://api.opensea.io/api/v2/chain/ethereum/account/{acc}/nfts?limit=100"
    if order_by:
        url = url + f"&order_by={order_by}&order_direction={order_dir}"
    print(url)
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
        fp = opensea_metadata["floorPrice"]
        opensea_url = nft_data[4]
        out.append([name, colle_name, image, fp, opensea_url]) # final
    return out

@app.route('/search-wallet', methods=['POST'])
def search_wallet():
    data = request.get_json()
    # Perform processing with the received data
    wallet_address = data['walletAddress']
    cursor = data['cursor']
    sort = data['sort']
    if sort == 'cfp':
        order_dir = 'desc'
        order_by = 'price'
    elif sort == 'rr':
        order_dir = 'desc'
        order_by = 'created_date'
    elif sort == 'bo':
        order_dir = 'desc'
        order_by = 'best_offer'
    else:
        order_dir = ''
        order_by = ''
    (nfts, next) = get_nfts_acc(wallet_address, cursor, 0, order_dir, order_by)
    #use alchemy to process nfts
    nfts_processed = alchemy_process(nfts)
    processed_data = {
        'message': 'Data processed successfully',
        'input_data': wallet_address,
        'output': nfts_processed,
        'next': next
    }
    return jsonify(processed_data)

# get collections api

def load_collections(cursor, sort): # get collections
    if cursor:
        url = f"https://api.opensea.io/api/v2/collections?chain=ethereum&limit=20&next={cursor}&order_by={sort}"
    else:
        collections = []
        url = f"https://api.opensea.io/api/v2/collections?chain=ethereum&limit=20&order_by={sort}"
    print(url)
    response = requests.get(url, headers=opensea_headers)
    print("load collections code:", response.status_code)
    data = response.json()
    if 'next' in data:
        next = data['next']
    else:
        next = False
    collections_raw = data['collections']
    collections = []
    for collection in collections_raw:
        name = collection["name"]
        slug = collection["collection"]
        image = collection["image_url"]
        category = collection["category"]
        opensea_url = collection["opensea_url"]
        collections.append([name, slug, image, category, opensea_url]) # nft_data
    return (collections, next)

def search_collections(collection, cursor, sort): # get collections
    if cursor:
        url = f"https://eth-mainnet.g.alchemy.com/nft/v3/{alchemy_api_key}/searchContractMetadata?query={collection}"
    else:
        url = f"https://eth-mainnet.g.alchemy.com/nft/v3/{alchemy_api_key}/searchContractMetadata?query={collection}"
    print(url)
    response = requests.get(url, headers=alchemy_headers)
    print("search collections code:", response.status_code)
    data = response.json()
    next = False
    collections_raw = data['contracts']
    collections = []
    for collection in collections_raw:
        opensea_metadata = collection["openSeaMetadata"]
        name = opensea_metadata["collectionName"]
        slug = opensea_metadata["collectionSlug"]
        image = opensea_metadata["imageUrl"]
        supply = collection["totalSupply"]
        collections.append([name, slug, image, supply, None]) # nft_data
    return (collections, next)

def additional_info(collections):
    out = []
    for collection in collections:
        slug = collection[1]
        url = f"https://api.opensea.io/api/v2/collections/{slug}/stats"
        print(url)
        response = requests.get(url, headers=opensea_headers)
        print("get collections addi_info code:", response.status_code)
        data = response.json()
        out.append(collection + [data["total"], data["intervals"]])
    return out

@app.route('/search-collection', methods=['POST'])
def load_collection():
    data = request.get_json()
    collection = data['collection']
    cursor = data['cursor']
    if data['sort'] == '':
        sort = "seven_day_volume"
    else:
        sort = data['sort']
    if collection:
        (collections, next) = search_collections(collection, cursor, sort)
    else:
        (collections, next) = load_collections(cursor, sort)
    collections_processed = additional_info(collections)
    processed_data = {
        'message': 'Data processed successfully',
        'input_data': "test",
        'output': collections_processed,
        'next': next
    }
    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(port=5001)
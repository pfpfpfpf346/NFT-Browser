from flask import Flask, request, jsonify
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/process-data', methods=['POST'])
def process_data():
    data = request.get_json()
    # Perform processing with the received data
    processed_data = {
        'message': 'Data processed successfully',
        'input_data': data
    }
    return jsonify(processed_data)

if __name__ == '__main__':
    app.run(port=5001)
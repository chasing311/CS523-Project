import yaml
from pymongo.mongo_client import MongoClient
from flask import Flask, request, jsonify

def load_config(config_path):
    with open(config_path, 'r') as file:
        config = yaml.safe_load(file)
        return config

config = load_config('app.yaml')

DB_URI = config["database"]["db_uri"]
DB_PASSWORD = config["database"]["db_password"]
def db_connection():
    connection_str = DB_URI.replace("<password>", DB_PASSWORD)
    client = MongoClient(connection_str)
    db = client.get_database("acto")
    return db
    

app = Flask(__name__)

@app.route('/operator/status', methods=['GET'])
def operator_status():
    db = db_connection()
    collection = db["results"]
    pipeline = [
        {"$group": {
            "_id": None,
            "operators": {"$sum": 1},
            "trials": {"$sum": "$trial"},
            "alarms": {"$sum": "$alarm"}
        }}
    ]
    result = list(collection.aggregate(pipeline))
    if result:
        return jsonify(result[0])
    return jsonify({})

@app.route('/issue/status', methods=['GET'])
def issue_status():
    db = db_connection()
    collection = db["issues"]
    pipeline = [
        {"$group": {
            "_id": None,
            "issues": {"$sum": 1},
            "fixed": {"$sum": {"$cond": [{"$eq": ["$status", "fixed"]}, 1, 0]}}
        }}
    ]
    result = list(collection.aggregate(pipeline))
    if result:
        return jsonify(result[0])
    return jsonify({})

@app.route('/operator/list', methods=['GET'])
def list_operators():
    db = db_connection()
    collection = db["results"]
    records = list(collection.find({}, {"_id": 0}))
    return jsonify(records)

@app.route('/operator/details', methods=['GET'])
def operator_details():
    db = db_connection()
    result_collection = db["results"]
    operator = request.args.get('operator')
    query = {"operator": operator}
    results = result_collection.find_one(query, {"_id": 0})
    issue_collection = db["issues"]
    results["issues"] = list(issue_collection.find(query, {"_id": 0}))
    
    return jsonify(results)

if __name__ == '__main__':
    app.run(port=8000, debug=True)
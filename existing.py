import pymongo
import requests
import numpy as np
from flask import jsonify
import json
from dotenv import load_dotenv
import os

load_dotenv()  # Load environment variables from .env file

my_var = os.environ.get('FLASK_MONGO')
hftoken = os.environ.get('FLASK_HF')
client = pymongo.MongoClient(my_var)
db = client.sample_data

hf_token = hftoken
embedding_url = "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2"

def generate_embedding(text: str) -> list[float]:

    response = requests.post(embedding_url, json={"inputs": text}, headers={"Authorization": f"Bearer {hf_token}"})
    
    if response.status_code != 200:
        raise ValueError(f"Request failed with status code {response.status_code}: {response.text}")

    return response.json()

def cosine_similarity(vec1, vec2):
    dot_product = np.dot(vec1, vec2)
    norm_vec1 = np.linalg.norm(vec1)
    norm_vec2 = np.linalg.norm(vec2)
    
    if norm_vec1 == 0 or norm_vec2 == 0:
        return 0  # Return 0 if either vector is zero

    return dot_product / (norm_vec1 * norm_vec2)


"""for doc in collection.find({'category':{"$exists": True}}).limit(0):
    doc['catdesc_embed_hf'] = generate_embedding(doc['category']) + doc['description_embed_hf']
    collection.replace_one({'_id': doc['_id']}, doc) """

def helper(comp):
    collection = db.merged

    item = collection.find({ "Name_x": comp })

    test = collection.find({ "Name_x": comp })

    test = list(test)

    if not test: return json.dumps({"error": "company not found"})

    dupeProduct = set()
    description_embeddings = []
    category_embeddings = []


    for doc in item:
        if doc['Product'] not in dupeProduct:
            dupeProduct.add(doc['Product'])
        description_embeddings.append(generate_embedding(doc['Description']))
        category_embeddings.append(generate_embedding(doc['Category']))


    combined_description_embedding = np.mean(description_embeddings, axis=0)
    combined_category_embedding = np.mean(category_embeddings, axis=0)

    combined_embedding = np.concatenate([combined_description_embedding, combined_category_embedding])
    combined_embedding = combined_embedding.tolist()

    collection = db.products

    results = collection.aggregate([
    {"$vectorSearch": {
        "queryVector": combined_embedding,
        "path": "catdesc_embed_hf",
        "numCandidates": 500,
        "limit": 30,
        "index": "PlotProducts",
        },}
    ])

    finish = []
    temp = []
    yay = []
    for doc in results:
        temp.append({"name": doc['name'], "category": doc['category'], "description": doc['description']})
        if doc['name'] not in dupeProduct:
            current_description_embedding = generate_embedding(doc['description'])
            similarity_score = cosine_similarity(combined_description_embedding, current_description_embedding)
            yay.append({"name": doc['name'], "category": doc['category'], "description": doc['description'], "score": similarity_score})
    finish.append(temp)
    finish.append(yay)
    return json.dumps(finish)
    
    # Exclude the "sensitiveData" field
    



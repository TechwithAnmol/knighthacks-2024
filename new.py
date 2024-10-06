import pymongo
import requests
import numpy as np
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

res = []

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

def determineSimilar(results, description_embeddings):
    for doc in results:
    # Calculate cosine similarity
        similarity_score = cosine_similarity(description_embeddings, doc['catdesc_embed_hf'])
        res.append({"name": doc['name'], "category": doc['category'], "description": doc['description']})


"""for doc in collection.find({'category':{"$exists": True}}).limit(0):
    doc['catdesc_embed_hf'] = generate_embedding(doc['category']) + doc['description_embed_hf']
    collection.replace_one({'_id': doc['_id']}, doc) """

def newhelp(name, sd, count1, count2, count3, count4, count5):

    collection = db.products
    description_embeddings = []
    category_embeddings = []
    marketingResults = []
    pmResults = []
    crmResults = []
    businessResults = []
    helpResults = []
    accel = ["Marketing Automation", 'Business Intelligence and Analytics', "Project Management", "Help Desk, Customer Relationship Management"]
    description_embeddings = generate_embedding(sd)
        
    for i, query in enumerate(accel):
        accel[i] = np.concatenate([description_embeddings, generate_embedding(query)]).tolist()

    collection = db.products

    for i in range(len(accel)):
        if i == 0:
            marketingResults = collection.aggregate([
    {"$vectorSearch": {
        "queryVector": accel[i],
        "path": "catdesc_embed_hf",
        "numCandidates": 2000,
        "limit": int(count1),
        "index": "PlotProducts",
        }}
    ])
        if i == 1:
            businessResults = collection.aggregate([
    {"$vectorSearch": {
        "queryVector": accel[i],
        "path": "catdesc_embed_hf",
        "numCandidates": 2000,
        "limit": int(count2),
        "index": "PlotProducts",
        }}
    ])
        if i == 2:
            pmResults = collection.aggregate([
    {"$vectorSearch": {
        "queryVector": accel[i],
        "path": "catdesc_embed_hf",
        "numCandidates": 2000,
        "limit": int(count3),
        "index": "PlotProducts",
        }}
    ])
        if i == 3:
            helpResults = collection.aggregate([
    {"$vectorSearch": {
        "queryVector": accel[i],
        "path": "catdesc_embed_hf",
        "numCandidates": 2000,
        "limit": int(count4),
        "index": "PlotProducts",
        }}
    ])
        if i == 4:
            crmResults = collection.aggregate([
    {"$vectorSearch": {
        "queryVector": accel[i],
        "path": "catdesc_embed_hf",
        "numCandidates": 2000,
        "limit": int(count5),
        "index": "PlotProducts",
        }}
    ])

    description_embeddings = np.tile(description_embeddings, 2)

    determineSimilar(marketingResults, description_embeddings)
    determineSimilar(businessResults, description_embeddings)
    determineSimilar(pmResults, description_embeddings)
    determineSimilar(helpResults, description_embeddings)
    determineSimilar(crmResults, description_embeddings)

    return json.dumps(res)

import requests
from dotenv import find_dotenv, load_dotenv
import os
import json
load_dotenv(find_dotenv())

API_KEY = os.getenv("API_KEY")

params = {
    "apiKey": API_KEY,
    # "query": 'orange',
    "maxCalories": 600,  # we will change this
    "minCalories": 300,
    "diet": "vegan",
    "intolerances": "dairy",
    "number": 1,

}
response = requests.get(
    "https://api.spoonacular.com/recipes/complexSearch",
    params=params
).json()
# print(type(response))
print(json.dumps(response, indent=2))
# print(response)
# print(response.json())
print(response["results"][0]["title"])


def nutInfos():
    pass

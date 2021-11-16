"""
Python file for API Endpoint to Spoonacular
"""
import os
import json
import random
from dotenv import find_dotenv, load_dotenv
import requests
load_dotenv(find_dotenv())

API_KEY = os.getenv("API_KEY")

params = {
    "apiKey": API_KEY,
    "number": 1,
    "offset": random.randrange(25)

}
def addparam(paramname, paramvalue):
    """
    Add a parameter to the recipe search
    """
    params[paramname] = paramvalue

def getrecipe():
    """
    Return the recipe that is the result of the search. Reset parameters for future recipe calls.
    """
    response = requests.get(
        "https://api.spoonacular.com/recipes/complexSearch",
        params=params
    ).json()
    resetparams()
    return response

def resetparams():
    """
    Reset parameters
    """
    params = {
        "apiKey" : API_KEY,
        "number" : 1,
        "offset": random.randrange(25)
    }
#print(response["results"][0]["title"])

addparam("maxCalories", 600)
addparam("minCalories", 580)
recipe = getrecipe()
print(json.dumps(recipe, indent = 2))

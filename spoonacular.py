"""
Python file for API Endpoint to Spoonacular
"""

# pylint: disable=redefined-outer-name
# pylint: disable=unused-argument
# pylint: disable=unused-variable

import os

# import json
import random
from dotenv import find_dotenv, load_dotenv
import requests

load_dotenv(find_dotenv())

API_KEY = os.getenv("API_KEY")

params = {
    "apiKey": API_KEY,
    "number": 1,
    "offset": random.randrange(25),
    "instructionsRequired": True,
    "addRecipeInformation": True,
}


def addparam(paramname, paramvalue):
    """
    Add a parameter to the recipe search
    """
    params[paramname] = paramvalue


def getrecipeswithcalories(calories):
    """
    Given calories, get three meals roughly equal to eachother
    """
    calories /= 3
    addparam("maxCalories", calories + 10)
    addparam("minCalories", calories - 10)
    addparam("number", 3)
    recipes = getrecipe()
    # print(json.dumps(recipes, indent=2))
    # print(recipes["results"][0]["title"])
    # print(recipes["results"][0]["sourceUrl"])
    # print(recipes["results"][0]["image"])
    # print(recipes["results"][0]["nutrition"]["nutrients"][0]["amount"])
    return recipes


def getrecipe():
    """
    Return the recipe that is the result of the search. Reset parameters for future recipe calls.
    """
    response = requests.get(
        "https://api.spoonacular.com/recipes/complexSearch", params=params
    ).json()
    resetparams()
    return response


def resetparams():
    """
    Reset parameters
    """
    params = {
        "apiKey": API_KEY,
        "number": 1,
        "offset": random.randrange(25),
        "instructionsRequired": True,
        "addRecipeInformation": True,
    }


# print(response["results"][0]["title"])

# addparam("maxCalories", 600)
# addparam("minCalories", 580)
# recipe = getrecipe()
# print(json.dumps(recipe, indent=2))
# getRecipesWithCalories(2100)

"""
Python file for API Endpoint to Spoonacular
"""

# pylint: disable=redefined-outer-name
# pylint: disable=unused-argument
# pylint: disable=unused-variable

import os
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


def usercalories(user):
    """
    Get calories needed from the user
    """
    caloriesneeded = (
        (10 * int(user.weight)) + (6.25 * int(user.height)) - (5 * int(user.age))
    )
    if user.gender == "F":
        caloriesneeded -= 161
    elif user.gender == "M":
        caloriesneeded += 5
    return caloriesneeded


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
    print(recipes)
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

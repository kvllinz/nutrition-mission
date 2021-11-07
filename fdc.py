import requests
from dotenv import find_dotenv, load_dotenv
import os

load_dotenv(find_dotenv())

API_KEY = os.getenv("API_KEY")

params = {
    "api_key": API_KEY,
    "query": 'apple',
    # "dataType": ["Survey (FNDDS)"],  # we will change this
    "pageSize": 4,

}
response = requests.get(
    "https://api.nal.usda.gov/fdc/v1/foods/search",
    params=params
)

print(response.json())

import unittest
import flask_testing
from unittest.mock import patch
import os
import random
import requests
from dotenv import find_dotenv, load_dotenv
from spoonacular import getrecipe
from app import (
    login_post,
    get_user_info_from_db,
    CreateUser,
    usercalories,
    get_user_workout_info_from_db,
    Workout,
)

load_dotenv(find_dotenv())


class NutritionMissionTest(unittest.TestCase):
    def setUp(self):
        self.mock_db_entries = [
            CreateUser(
                id="1",
                email="random@gmail.com",
                name="random",
                age="24",
                gender="M",
                weight=180,
                height=72,
            ),
            CreateUser(
                id="2",
                email="random123@gmail.com",
                name="random123",
                age="22",
                gender="F",
                weight=120,
                height=66,
            ),
        ]
        self.mock_db_entries1 = [
            Workout(
                id="1",
                email="random@gmail.com",
                milesRun=5,
                pushUps=10,
                jumpingJacks=10,
                sitUps=20,
            ),
            Workout(
                id="1",
                email="random123@gmail.com",
                milesRun=4,
                pushUps=15,
                jumpingJacks=20,
                sitUps=15,
            ),
        ]

    def test_get_user_workout_info_from_db(self):
        expected_email = []
        expected_milesRun = []
        expected_pushUps = []
        expected_jumpingJacks = []
        expected_sitUps = []
        for user in self.mock_db_entries1:
            expected_email.append(user.email)
            expected_milesRun.append(user.milesRun)
            expected_pushUps.append(user.pushUps)
            expected_jumpingJacks.append(user.jumpingJacks)
            expected_sitUps.append(user.sitUps)
        print("expected: ")
        print(expected_email, expected_milesRun)

        with patch("app.Workout.query") as mocked_query:
            mocked_query.all.return_value = self.mock_db_entries1
            users = get_user_workout_info_from_db()
            print("function: ")
            print(str(users))
            self.assertEqual(
                users,
                (
                    expected_email,
                    expected_milesRun,
                    expected_pushUps,
                    expected_jumpingJacks,
                    expected_sitUps,
                ),
            )

    def test_get_user_info_from_db(self):
        expected_email = []
        expcted_name = []
        expected_age = []
        expected_gender = []
        expected_weight = []
        expected_height = []
        for user in self.mock_db_entries:
            expected_email.append(user.email)
            expcted_name.append(user.name)
            expected_age.append(user.age)
            expected_gender.append(user.gender)
            expected_weight.append(user.weight)
            expected_height.append(user.height)

        with patch("app.CreateUser.query") as mocked_query:
            mocked_query.all.return_value = self.mock_db_entries
            users = get_user_info_from_db()
            self.assertEqual(
                users,
                (
                    expected_email,
                    expcted_name,
                    expected_age,
                    expected_gender,
                    expected_weight,
                    expected_height,
                ),
            )

    def test_usercaloriesMale(self):
        userCal1 = usercalories(180, 72, 24, "M")
        userCal2 = usercalories(150, 66, 30, "M")

        self.assertEqual(userCal1, 2135)
        self.assertEqual(userCal2, 1767.5)

    def test_usercaloriesFemalF(self):
        userCal1 = usercalories(100, 56, 18, "F")
        userCal2 = usercalories(120, 66, 22, "F")

        self.assertEqual(userCal1, 1099)
        self.assertEqual(userCal2, 1341.5)

    def test_getrecipe(self):
        API_KEY = os.getenv("API_KEY")

        params = {
            "apiKey": API_KEY,
            "number": 1,
            "offset": random.randrange(25),
            "instructionsRequired": True,
            "addRecipeInformation": True,
        }
        response = requests.get(
            "https://api.spoonacular.com/recipes/complexSearch", params=params
        )
        self.assertEqual(response.status_code, 200)


if __name__ == "__main__":
    unittest.main()

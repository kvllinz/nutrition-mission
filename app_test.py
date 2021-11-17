import unittest
import flask_testing
from unittest.mock import patch
from app import login_post, get_user_info_from_db, CreateUser, usercalories, getemail


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

    def test_getEmail(self):
        expected_email = []
        for user in self.mock_db_entries:
            expected_email.append(user.email)

        with patch("app.CreateUser.query.filter_by(email=email)") as mocked_query:
            mocked_query.first.return_value = self.mock_db_entries
            email = getemail()
            self.assertEqual(email, (expected_email))

    def test_usercalories(self):
        weight = 180
        height = 72
        age = 24
        gender = "M"

        userCalories = (10 * int(weight)) + (6.25 * int(height)) - (5 * int(age))

        if gender == "M":
            userCalories += 5
        elif gender == "F":
            userCalories -= 161

        for user in self.mock_db_entries:
            user = usercalories(user.email)
            self.assertEqual(user, userCalories)


if __name__ == "__main__":
    unittest.main()

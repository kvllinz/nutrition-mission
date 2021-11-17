import unittest
import flask_testing
from unittest.mock import patch
from app import login_post, get_user_info_from_db, CreateUser


# class loginTest(unittest.TestCase):
#     def setUp(self) -> None:
#         return super().setUp()


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


if __name__ == "__main__":
    unittest.main()

import unittest
import flask_testing
from unittest.mock import patch
from app import login_post 


# class loginTest(unittest.TestCase):
#     def setUp(self) -> None:
#         return super().setUp()


class NutritionMissionTest(unittest.TestCase):
    def setUp(self):
        self.mock_db_entries = [ 
            
            email=email, name=name, age=age, gender=gender, weight=weight, height=height
        ]


if __name__ == "__main__":
    unittest.main()

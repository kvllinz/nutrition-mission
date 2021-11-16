import unittest
import flask_testing
from unittest.mock import patch


# class loginTest(unittest.TestCase):
#     def setUp(self) -> None:
#         return super().setUp()


class RouterTest(unittest.TestCase):
    def create_app(self):
        return myflaskapp

    def test_index():
        self.app.get("/")
        self.assert_template_used("index.html")


if __name__ == "__main__":
    unittest.main()

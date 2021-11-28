"""
Database information for application
"""


import sqlalchemy
from app import db


class CreateUser(db.Model):
    """
    Model for Users
    """

    id = sqlalchemy.Column(sqlalchemy.Integer, primary_key=True)
    email = sqlalchemy.Column(sqlalchemy.String(120), unique=True)
    name = sqlalchemy.Column(sqlalchemy.String(120), unique=True)
    age = sqlalchemy.Column(sqlalchemy.String(3))
    gender = sqlalchemy.Column(sqlalchemy.String(1))
    weight = sqlalchemy.Column(sqlalchemy.String(3))
    height = sqlalchemy.Column(sqlalchemy.String(3))

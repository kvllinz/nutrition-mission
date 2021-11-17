# Nutrition Mission

<img src="https://i.ibb.co/jRJQ9wx/apple512x512.png" alt="apple512x512" width="128" height="128">

## Deployment

[Nutrition Mission](https://ancient-anchorage-26581.herokuapp.com/home)

## About The Project

Aimed to deliver a health-focused app accessible from the browser. Health is an important aspect of our lives, but every app focuses on one specific aspect of it like a good workout routine in one app and another app for getting healthful recipes. We wanted to combine the different applications into a one stop shop for all things health and nutrition related. Features of the application will include search boxes that allow users to get nutrition facts for ingredients and restaurant meals and text boxes for users to enter their height, weight, and workout plans to get visual feedback on their gains and losses for a specific period of time.

### Built With

Flask and `create-react-app`

Python

Css

html

#### Libraries & Frameworks

import flask

import os

from flask_sqlalchemy import SQLAlchemy

#### APIs

spoonacular.com

## Requirements

npm install

pip install -r requirements.txt

## Usage

usage of the this browser is to track your health, like see how much do you weigh, what is your height and how much you want to gain or lose weight, It will also track your workout.

## Run Application

1. Run command in terminal (in your project directory): `npm run build`. This will update anything related to your `App.js` file (so `public/index.html`, any CSS you're pulling in, etc).
2. Run command in terminal (in your project directory): `python3 app.py`
3. Preview web page in browser 'localhost:8080/' (or whichever port you're using)

## Deploy to Heroku

1. Create a Heroku app: `heroku create --buildpack heroku/python`
2. Add nodejs buildpack: `heroku buildpacks:add --index 1 heroku/nodejs`
3. Push to Heroku: `git push heroku main`

Heroku: [Nutrition Mission](https://ancient-anchorage-26581.herokuapp.com/login)

## Contributing

<ol>
  <li> Fork the Project </li>
  <li> Create your Feature Branch  </li>
  <li> Commit your Changes  </li>
  <li> Push to the Branch  </li>
  <li> Open a Pull Request </li>
</ol>

## FAQ

what do you do if your webpage is blank?
check if you install npm and run "npm run build"
what do you do if the url is not working?

what to do when you enter data on the liveright section and liveright doesn't respond?
check if you entered integers instead of strings.

Am I able to add an exercise that is not already there?

Will there be any fees for using it in the future?

Will my workout data be made public?

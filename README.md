# Nutrition Mission

<img src="https://i.ibb.co/jRJQ9wx/apple512x512.png" alt="apple512x512" width="128" height="128">

## Deployment

[Nutrition Mission](https://ancient-anchorage-26581.herokuapp.com/home)

## About The Project

This project aims to deliver a health-focused app accessible from the browser. Health is an essential part of our lives, but usually apps only focus on one specific aspect of it. Examples include a good workout routine in one app and another for getting healthy recipes. We wanted to combine the different applications into a one stop shop for all things health and nutrition related. Later features of the application will include search boxes that allow users to get nutrition facts for ingredients and restaurant meals and text boxes for users to enter their height, weight, and workout plans to get visual feedback on their gains and losses for a specific period of time.

#### Libraries & Frameworks

import flask

import os

from flask_sqlalchemy import SQLAlchemy

- Python
- HTML
- CSS
- JavaScript
- PostGreSQL

#### Libraries & Frameworks

- Flask
- React
- SQLAlchemy

#### APIs

- Spoonacular

## Requirements

npm install

pip install -r requirements.txt

## Usage

usage of the this browser is to track your health, like see how much do you weigh, what is your height and how much you want to gain or lose weight, It will also track your workout.

## How To Run

1. Clone this repository.
2. Run this command in the terminal while in your project directory: `npm run build`. This will update anything related to your `App.js` file and its various dependencies such as `public/index.html`, any CSS you're pulling in, and additional images needed to be displayed.
3. Run `python3 app.py`.
4. Preview the web page in your local browser with the declaration of `localhost:8080/` or whichever port you're using.

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
copy the link and paste it in your browser: https://ancient-anchorage-26581.herokuapp.com/

what to do when you enter data on the liveright section and liveright doesn't respond?
check if you entered integers instead of strings.

Am I able to add an exercise that is not already there?
As of now user will not be able to add an exercise.

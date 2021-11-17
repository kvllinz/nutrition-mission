import React, { useEffect, useState } from "react";
import './Login.css';
import GLogin from "../../GoogleLogin";
import logo512 from "../../logo512.png"
import googleLogo from '../../googleLogo.png';


const Login = () => {
  return (
    <div class="displayContainer">
      <div class="landingContainer">
        <img src={logo512} height="64" width="64" />
        <div class="title">
          Nutrition Mission
        </div>
        <div class="landingBoxBorder">
          <div class="landingBox">
            <div class="motto">
              Eat Right, Live Right.
            </div>
            <div class="descriptionContainer">
              <div class="descriptionBox">
                Welcome to Nutrition Mission, a project about you and for you!
                We aim to provide you interesting and diversified recipes
                while also catering to your specific caloric needs as a person.
                With the ability to save your daily workouts, you can sleep
                easily knowing you're making a difference to your personal
                wellbeing. Logging into the application is easy! Since your login
                is verified by Google Authentification services, your personal data
                will be ensured to be for your own eyes only.
              </div>
            </div>
            <div class="featuresTitle">
              Features
            </div>
            <div class="featuresContainerBorder">
              <div class="featuresContainer">
                <div class="featuresBox">
                  <ul>
                    <li>Diversified Daily Meals</li>
                    <li>Recipes & Nutrition Facts</li>
                  </ul>
                </div>
                <div class="featuresBox">
                  <ul>
                    <li>Personalized Weight Maintenance</li>
                    <li>Workout Tracker</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="titleContainer">
        <div class="titleL">
          <div class="titleLIn">
          </div>
        </div>
        <div class="titleC">
          <div class="titleCIn">
            Nutrition Mission
          </div>
        </div>
        <div class="titleR">
          <div class="titleRIn">
          </div>
        </div>
      </div>
      <div class="loginContainer">
        <div class="loginBoxL">
          <div class="loginBoxLIn">
          </div>
        </div>
        <div class="loginBoxC">
          <div class="loginBoxCIn">
            <div class="login">
              <img src={googleLogo} height="128" width="128" /><br />
              <GLogin />
            </div>
          </div>
        </div>
        <div class="loginBoxR">
          <div class="loginBoxRIn">
          </div>
        </div>
      </div>
    </div >
  )
}

export default Login;
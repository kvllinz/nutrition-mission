import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import './Login.css';
import GLogin from "../../GoogleLogin";
import googleLogo from '../../googleLogo.png';


const Login = () => {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('')
  const history = useHistory();

  useEffect(() => {
    if (response === "Ok") {
      history.push("/home")
    }
  }, [response])


  const loginUser = () => {
    fetch('/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ "username": username, "password": password }),
    }).then(response => response.json()).then(data => {
      setResponse(data.loginResponse);
    });
  }

  return (
    <div class="displayContainer">
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
    </div>
  )
}

export default Login;
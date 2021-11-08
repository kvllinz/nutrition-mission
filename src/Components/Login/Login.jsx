import React, { useEffect, useState } from "react";
import { Route, useHistory } from "react-router-dom";
import SessionStorageProvider from "../../Integrations/storage"
import './Login.css';
import storage from "../../Integrations/storage";
// import { GoogleLogin } from 'react-google-login';
import GLogin from "../../GoogleLogin";


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
      SessionStorageProvider.setSessionToken(response);
    });
  }

  // const onSuccess = (res) => {
  //   console.log('Login Success: currentUser:', res.profileObj);
  //   alert(
  //     `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
  //   );
  //   refreshTokenSetup(res);
  // };

  // const onFailure = (res) => {
  //   console.log('Login failed: res:', res);
  //   alert(
  //     `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
  //   );
  // };

  return (
    // <form onSubmit ={()=> loginUser()}>
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
            {/* <div class="loginSubmit"> */}
            {/* <input type="submit" value="Login" /> */}
            <button class="loginSubmit" onClick={() => loginUser()}> Login</button>
            {/* </div> */}
            <div class="loginFieldsContainer">
              <div class="loginFieldsBox">
                <div class="loginField">
                  Username:
                </div>
                <div class="loginField">
                  Password:
                </div>
              </div>
              <div class="loginFieldsBox">
                <div class="loginInputContainer">
                  <div class="loginInputBox">
                    <div class="loginInputL">
                      <div class="loginInputLIn">
                      </div>
                    </div>
                    <div class="loginInputC">
                      <div class="loginInputCIn">
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} name="username" />
                      </div>
                    </div>
                    <div class="loginInputR">
                      <div class="loginInputRIn">
                      </div>
                    </div>
                  </div>
                </div>
                <div class="loginInputContainer">
                  <div class="loginInputBox">
                    <div class="loginInputL">
                      <div class="loginInputLIn">
                      </div>
                    </div>
                    <div class="loginInputC">
                      <div class="loginInputCIn">
                        <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} name="password" />
                      </div>
                    </div>
                    <div class="loginInputR">
                      <div class="loginInputRIn">
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="loginBoxR">
          <div class="loginBoxRIn">
          </div>
        </div>
      </div>
      {/* <div>
        <GoogleLogin
          clientId={clientId}
          buttonText="Login"
          onSuccess={onSuccess}
          onFailure={onFailure}
          cookiePolicy={'single_host_origin'}
          style={{ marginTop: '100px' }}
          isSignedIn={true}
        />
      </div> */}

      <GLogin />
    </div>
    //   </form>
  )
}

export default Login;
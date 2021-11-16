import React from 'react';
import { refreshTokenSetup } from './Components/Login/utils/refreshToken';
import { GoogleLogin } from 'react-google-login';
import { Route, useHistory } from "react-router-dom";

require('dotenv').config()

const clientId = process.env.REACT_APP_Google_Client_ID;

const GLogin = () => {

    console.log(clientId);

    const history = useHistory();

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        alert(
            `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );
        refreshTokenSetup(res);
        sessionStorage.setItem('loggedIn', true)
        history.push("/home", { profilePhoto: res.profileObj.imageUrl, name: res.profileObj.name, email: res.profileObj.email })
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 `
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                style={{ marginTop: '100px' }}
                isSignedIn={true}
            />
        </div>
    )

}

export default GLogin;
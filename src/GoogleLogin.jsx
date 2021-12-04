import React from 'react';
import { refreshTokenSetup } from './Components/Login/utils/refreshToken';
import { GoogleLogin } from 'react-google-login';
import { useHistory } from "react-router-dom";

require('dotenv').config()

const clientId = process.env.REACT_APP_Google_Client_ID;

const GLogin = () => {

    console.log(clientId);

    const history = useHistory();

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        alert(
            `Logged in successfully. Welcome, ${res.profileObj.name} 😍.\nSee console for the full profile object.`
        );
        refreshTokenSetup(res);
        sessionStorage.setItem('loggedIn', true)
        history.push("/home", { profilePhoto: res.profileObj.imageUrl, name: res.profileObj.name, email: res.profileObj.email })
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢`
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId={clientId}
                buttonText="Sign in with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
                theme="dark"
            />
        </div>
    )

}

export default GLogin;
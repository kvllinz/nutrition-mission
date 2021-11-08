import React from 'react';
import { refreshTokenSetup } from './Components/Login/utils/refreshToken';
import { GoogleLogin } from 'react-google-login';

const clientId =

const GLogin = () => {


    console.log(clientId);


    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        alert(
            `Logged in successfully welcome ${res.profileObj.name} 😍. \n See console for full profile object.`
        );
        refreshTokenSetup(res);
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login. 😢 Please ping this to repo owner twitter.com/sivanesh_fiz`
        );
    };

    return (
        <div>
            <GoogleLogin
                clientId= {clientId}
                buttonText="Login"
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
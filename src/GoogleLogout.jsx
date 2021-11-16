import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { Route, useHistory } from "react-router-dom";

require('dotenv').config()

const clientId = process.env.REACT_APP_Google_Client_ID;

const GLogout = () => {

    const history = useHistory();

    const onSuccess = () => {
        console.log('Logged out successfully.');
        alert('Logged out successfully ✌.');
        sessionStorage.setItem('loggedIn', false)
        history.push("/")
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
                theme="dark"
            />
        </div>
    );
}

export default GLogout;
import React from 'react';
import { GoogleLogout } from 'react-google-login';
import { Route, useHistory } from "react-router-dom";

require('dotenv').config()

const clientId = process.env.REACT_APP_Google_Client_ID;

const GLogout = () => {

    const history = useHistory();

    const onSuccess = () => {
        console.log('Logout made successfully');
        alert('Logout made successfully✌');
<<<<<<< HEAD
        history.push("/login")
=======
        sessionStorage.setItem('loggedIn', false)
        history.push("/")
>>>>>>> origin/main
    };

    return (
        <div>
            <GoogleLogout
                clientId={clientId}
                buttonText="Logout"
                onLogoutSuccess={onSuccess}
            />
        </div>
    );
}

export default GLogout;
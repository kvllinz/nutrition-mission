import React from "react";
import { Redirect, Route } from "react-router";

const PrivateRoute =({ component, path, exact})=>{
const isLoggedIn = sessionStorage.getItem("loggedIn")

return isLoggedIn === "true" ? 
    <Route path={path} exact={exact} component={component} /> :
    <Redirect to='/login' />;
}

export default PrivateRoute;
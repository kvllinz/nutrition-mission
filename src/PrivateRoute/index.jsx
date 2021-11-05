import React from "react";
import { Redirect, Route } from "react-router";
import SessionStorageProvider from "../Integrations/storage"

// interface PrivateRouteProps extends RouteProps{
//    component,
//    path,
//    exact 
// }

const PrivateRoute =({ component, path, exact})=>{
const isLoggedIn = Boolean(SessionStorageProvider.getSessionToken());
console.log(isLoggedIn)

return isLoggedIn? 
    <Route path={path} exact={exact} component={component} /> :
    <Redirect to='/login' />;
}

export default PrivateRoute;
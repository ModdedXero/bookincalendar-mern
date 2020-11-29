import React from "react";
import { Redirect } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import DynamicRoute from "./DynamicRoute";

export default function PrivateRoute({ component: Component, ...rest }) {
    const { currentUser } = useAuth();
    
    return (
        <DynamicRoute {...rest} render={props => {
            return currentUser ? <Component {...props} /> : <Redirect to="/login" />
        }}>

        </DynamicRoute>
    );
}

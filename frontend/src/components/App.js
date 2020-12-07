import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import DynamicRoute from "./DynamicRoute";

import Home from "./Home";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import ForgotPassword from "./Login/ForgotPassword";
import Calendar from "./Calendar/Calendar";
import Setup from "./Setup";
import Profile from "./Profile";
import "../styles/flatly.css";

function App() {
  return (
      <AuthProvider>
        <Router>
          <Switch>
            <DynamicRoute exact path="/" layout="SITE" component={Home} />
            <DynamicRoute path="/l/login/signup" layout="SITE" component={Signup} />
            <DynamicRoute path="/l/login/forgot-password" layout="SITE" component={ForgotPassword} />
            <DynamicRoute path="/l/login" layout="SITE" component={Login} />
            <DynamicRoute path="/l/calendar" layout="PROFILE" secure component={Calendar} />
            <DynamicRoute path="/l/setup" layout="PROFILE" secure component={Setup} />
            <DynamicRoute path="/l/profile" layout="PROFILE" secure component={Profile} />
          </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;

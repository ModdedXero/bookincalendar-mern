import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import DynamicRoute from "./Utility/DynamicRoute";

import Home from "./Website/Home";
import Login from "./Login/Login";
import Signup from "./Login/Signup";
import ForgotPassword from "./Login/ForgotPassword";
import Calendar from "./Private/Calendar/Calendar";
import Sessions from "./Private/Setup/Sessions";
import Profile from "./Private/Profile";

import "../styles/style.css";

function App() {
  return (
      <AuthProvider>
        <Router>
          <Switch>
            <DynamicRoute exact path="/" layout="SITE" component={Home} />
            <DynamicRoute path="/login/signup" layout="SITE" component={Signup} />
            <DynamicRoute path="/login/forgot-password" layout="SITE" component={ForgotPassword} />
            <DynamicRoute path="/login" layout="SITE" component={Login} />
            <DynamicRoute path="/private/calendar" layout="PROFILE" secure component={Calendar} />
            <DynamicRoute path="/private/setup/sessions" layout="PROFILE" secure component={Sessions} />
            <DynamicRoute path="/private/profile" layout="PROFILE" secure component={Profile} />
          </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;

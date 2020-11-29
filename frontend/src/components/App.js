import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import DynamicRoute from "./DynamicRoute";
import SiteNavbar from "./SiteNavbar";
import ProfileNavbar from "./ProfileNavbar";
import Dashboard from "./Dashboard";
import Home from "./Home";
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";
import "../styles/flatly.css";

function App() {
  return (
    <AuthProvider>
        <Router>
          <Switch>
            <DynamicRoute exact path="/" layout="SITE" component={Home} />
            <DynamicRoute path="/login" layout="SITE" component={Login} />
            <DynamicRoute path="/signup" layout="SITE" component={Signup} />
            <DynamicRoute path="/forgot-password" layout="SITE" component={ForgotPassword} />
            <PrivateRoute path="/dashboard" layout="PROFILE" component={Dashboard} />
          </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;

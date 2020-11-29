import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";
import Navbar from "./Navbar";
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
          <Navbar />
            <Switch>
              <Route exact path="/" component={Home} />
              <PrivateRoute path="/dashboard" component={Dashboard} />
              <Route path="/login" component={Login} />
              <Route path="/signup" component={Signup} />
              <Route path="/forgot-password" component={ForgotPassword} />
            </Switch>
        </Router>
      </AuthProvider>
  );
}

export default App;

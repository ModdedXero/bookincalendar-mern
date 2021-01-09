import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { Switch, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import DynamicRoute from "./Utility/DynamicRoute";

import Home from "./Public/MainSite/Home/Home";
import ECourses from "./Public/MainSite/ECourses";
import Booking from "./Public/MainSite/Booking";
import Blog from "./Public/MainSite/Blog";
import Presets from "./Public/MainSite/Presets";

/* Login Routes */
import Login from "./Public/Login/Login";
import Signup from "./Public/Login/Signup";
import ForgotPassword from "./Public/Login/ForgotPassword";

/* Booking Calendar Routes */
import Calendar from "./Private/BookingCalendar/Calendar/Calendar";
import ClientCalendar from "./Private/BookingCalendar/Calendar/Client/ClientCalendar";
import Sessions from "./Private/BookingCalendar/Sessions/Sessions";
import Profile from "./Private/BookingCalendar/Profile";
import Contracts from "./Private/BookingCalendar/Contracts/Contracts";

import "../styles/style.css";

function App() {
    const location = useLocation();

    return (
        <AuthProvider>
            <AnimatePresence exitBeforeEnter>
                <Switch location={location} key={location.pathname}>
                    <DynamicRoute exact path="/" layout="SITE" component={Home} />
                    <DynamicRoute path="/ecourses" layout="SITE" component={ECourses} />
                    <DynamicRoute path="/booking" layout="SITE" component={Booking} />
                    <DynamicRoute path="/blog" layout="SITE" component={Blog} />
                    <DynamicRoute path="/presets" layout="SITE" component={Presets} />

                    <DynamicRoute path="/login/signup" layout="SITE" component={Signup} />
                    <DynamicRoute path="/login/forgot-password" layout="SITE" component={ForgotPassword} />
                    <DynamicRoute path="/login" layout="SITE" component={Login} />

                    <DynamicRoute path="/calendar/:calendarID" layout="NONE" component={ClientCalendar} />
                    <DynamicRoute path="/private/calendar" layout="PROFILE" secure component={Calendar} />
                    <DynamicRoute path="/private/setup/sessions" layout="PROFILE" secure component={Sessions} />
                    <DynamicRoute path="/private/profile" layout="PROFILE" secure component={Profile} />
                    <DynamicRoute path="/private/contracts" layout="PROFILE" secure component={Contracts} />
                </Switch>
            </AnimatePresence>
        </AuthProvider>
    );
}

export default App;

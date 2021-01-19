import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { Switch } from "react-router-dom";

import DynamicRoute from "./Utility/DynamicRoute";

/* Main Site Routes */
import Home from "./Public/MainSite/Home/Home";
import ECourses from "./Public/MainSite/ECourses";
import Booking from "./Public/MainSite/Booking";
import Blog from "./Public/MainSite/Inspire/Blog";
import Presets from "./Public/MainSite/Presets";

/* Login Routes */
import Login from "./Public/Login/Login";
import Signup from "./Public/Login/Signup";
import ForgotPassword from "./Public/Login/ForgotPassword";

/* Admin Routes */
import CreateBlog from "./Private/Blog/CreateBlog";
import BlogAdmin from "./Private/Blog/BlogAdmin";

/* Booking Calendar Routes */
import Calendar from "./Private/BookingCalendar/Calendar/Calendar";
import ClientCalendar from "./Private/BookingCalendar/Calendar/Client/ClientCalendar";
import Sessions from "./Private/BookingCalendar/Sessions/Sessions";
import Profile from "./Private/BookingCalendar/Profile";
import Contracts from "./Private/BookingCalendar/Contracts/Contracts";

import "../styles/style.css";

function App() {
    return (
        <AuthProvider>
            <Switch>
                {/* Main Site Routes */}
                <DynamicRoute exact path="/" layout="SITE" component={Home} />
                <DynamicRoute path="/inspire" layout="SITE" component={Blog} />
                <DynamicRoute path="/create" layout="SITE" component={Booking} />
                <DynamicRoute path="/educate" layout="SITE" component={ECourses} />
                <DynamicRoute path="/submit" layout="SITE" component={Presets} />

                {/* Login Routes */}
                <DynamicRoute path="/login/signup" layout="SITE" component={Signup} />
                <DynamicRoute path="/login/forgot-password" layout="SITE" component={ForgotPassword} />
                <DynamicRoute path="/login" layout="SITE" component={Login} />

                {/* Admin Routes */}
                <DynamicRoute path="/private/admin/blog/create" layout="SITE" secure admin component={CreateBlog} />
                <DynamicRoute path="/private/admin/blog/edit/:postID" layout="SITE" secure admin component={CreateBlog} />
                <DynamicRoute path="/private/admin/blog" layout="SITE" secure admin component={BlogAdmin} />

                {/* Booking Calendar Routes */}
                <DynamicRoute path="/client/calendar/:calendarID" layout="NONE" component={ClientCalendar} />
                <DynamicRoute path="/private/booking/calendar" layout="PROFILE" secure component={Calendar} />
                <DynamicRoute path="/private/booking/setup/sessions" layout="PROFILE" secure component={Sessions} />
                <DynamicRoute path="/private/booking/profile" layout="PROFILE" secure component={Profile} />
                <DynamicRoute path="/private/booking/contracts" layout="PROFILE" secure component={Contracts} />
            </Switch>
        </AuthProvider>
    );
}

export default App;

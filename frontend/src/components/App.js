import React from "react";
import { AuthProvider } from "../contexts/AuthContext";
import { Switch } from "react-router-dom";

import DynamicRoute from "./Utility/DynamicRoute";
import "normalize.css"

/* Public Routes */

/* Main Site Routes */
import Home from "./Public/MainSite/Home/Home";
import ECourses from "./Public/MainSite/ECourses";
import Booking from "./Public/MainSite/Booking";
import Submit from "./Public/MainSite/Submit";

/* Blog Routes */
import Blog from "./Public/MainSite/Inspire/Blog";
import PostView from "./Public/MainSite/Inspire/PostView/PostView";

/* Login Routes */
import Login from "./Public/Login/Login";
import Signup from "./Public/Login/Signup";
import ForgotPassword from "./Public/Login/ForgotPassword";

/* Secure Routes */

import SecureBlogPosts from "./Private/Secure/Blog/SecureBlogPosts";
import SecurePostCreate from "./Private/Secure/Blog/SecurePostCreate";
import SecureInbox from "./Private/Secure/SecureInbox";
import SecureUsers from "./Private/Secure/Users/SecureUsers";

/* Admin Routes */
import CreateBlog from "./Private/Secure/BlogAdmin/CreateBlog";
import BlogAdmin from "./Private/Secure/BlogAdmin/BlogAdmin";
import BlogComments from "./Private/Secure/BlogAdmin/BlogComments";

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
                {/* Public Routes */}

                {/* Main Site Routes */}
                <DynamicRoute exact path="/" layout="SITE" component={Home} />
                <DynamicRoute path="/create" layout="SITE" component={Booking} />
                <DynamicRoute path="/educate" layout="SITE" component={ECourses} />
                <DynamicRoute path="/submit" layout="SITE" component={Submit} />

                {/* Blog Routes */}
                <DynamicRoute path="/inspire/post/" layout="SITE" component={PostView} />
                <DynamicRoute path="/inspire" layout="SITE" component={Blog} />

                {/* Login Routes */}
                <DynamicRoute path="/login/signup" layout="SITE" component={Signup} />
                <DynamicRoute path="/login/forgot-password" layout="SITE" component={ForgotPassword} />
                <DynamicRoute path="/login" layout="SITE" component={Login} />

                {/* Admin Routes */}
                <DynamicRoute path="/secure/admin/blog/create" layout="SITE" secure admin component={CreateBlog} />
                <DynamicRoute path="/secure/admin/blog/edit/" layout="SITE" secure admin component={CreateBlog} />
                <DynamicRoute path="/secure/admin/blog/comments/" layout="PROFILE" secure admin component={BlogComments} />
                <DynamicRoute exact path="/secure/admin/blog" layout="PROFILE" secure admin component={BlogAdmin} />

                {/* Secure Routes */}

                <DynamicRoute path="/secure/blog/post" layout="PROFILE" secure component={SecurePostCreate} />
                <DynamicRoute path="/secure/blog" layout="PROFILE" secure component={SecureBlogPosts} />
                <DynamicRoute path="/secure/users" layout="PROFILE" secure component={SecureUsers} />
                <DynamicRoute path="/secure" layout="PROFILE" secure component={SecureInbox} />

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

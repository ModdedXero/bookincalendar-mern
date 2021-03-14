import React, { useState, useEffect } from "react";
import axios from "axios";

import { useAuth } from "../../../contexts/AuthContext";
import DynamicLink from "../../Utility/DynamicLink";
import ProfileCard from "./Profile/ProfileCard";

export default function SecureNavbar({ component: Component }) {
    const { currentUser } = useAuth();
    
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);
    const [profile, setProfile] = useState({});

    useEffect(() => {
        axios.get(`/api/login/${currentUser.uid}`)
            .then(res => {
                setProfile(res.data.response);
            })
    }, [])

    const toggleNav = () => {
        setIsNavCollapsed(!isNavCollapsed);
    }

    return (
        <div>
            <nav className="navbar">
                <div className={`navbar-links ${isNavCollapsed ? "" : "active animate"}`}>
                    <DynamicLink className="navbar-link" to="/" root>Home</DynamicLink>
                    <DynamicLink className="navbar-link" to="/inspire" root>Inspire</DynamicLink>
                    <DynamicLink className="navbar-link" to="/create" root>Create</DynamicLink>
                    <DynamicLink className="navbar-link" to="/educate" root>Educate</DynamicLink>
                    <DynamicLink className="navbar-link" to="/submit" root>Submit</DynamicLink>
                </div>
                <button className="navbar-burger" onClick={toggleNav}><i className="fa fa-bars"></i></button>
            </nav>
            <nav className="sidenav">
                <ProfileCard profile={profile} />
                <div className="sidenav-links">
                    <DynamicLink className="sidenav-link" to="/secure">Inbox</DynamicLink>
                    <DynamicLink className="sidenav-link" to="/secure/users" secure={0} authority={profile.profileAuthority}>Users</DynamicLink>
                    <DynamicLink className="sidenav-link" to="/secure/blog">Blog Posts</DynamicLink>
                    <DynamicLink className="sidenav-link" to="/secure/admin/blog" secure={0} authority={profile.profileAuthority}>Blog Admin</DynamicLink>
                </div>
            </nav>
            <div className="sidenav-content">
                <Component authority={profile.profileAuthority} />
            </div>
        </div>
    )
}
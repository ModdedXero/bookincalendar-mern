import React from "react";

import ProfileNavbar from "../Private/ProfileNavbar";
import SiteNavbar from "../Public/SiteNavbar";
import { useAuth } from "../../contexts/AuthContext";
import Login from "../Public/Login/Login";
import { useParams } from "react-router-dom";

const adminUsers = ["blakekw00@gmail.com", "ericawilliamsphotography@yahoo.com"];

export default function DynamicRoute({ component: Component, layout, secure, admin }) {
  const { currentUser } = useAuth();
  let paramID = useParams();

  const actualRouteComponent = () => {
    if (!secure) {
      return Component;
    } else if (secure) {
      if (!admin) {
        return currentUser ? Component : Login;
      } else if (admin) {
        if (currentUser && adminUsers.includes(currentUser.email)) {
          return currentUser ? Component : Login;
        } else {
          return Login;
        }
      }
    }

    return currentUser ? Component : Login;
  }
  
    switch (layout) {
      case "SITE": {
        return (
          <SiteNavbar component={actualRouteComponent()} />
        )
      }
      case "PROFILE": {
        return (
          <ProfileNavbar>
            {actualRouteComponent()}
          </ProfileNavbar>
        )
      }
      default: {
        return (
          <>
            {actualRouteComponent()}
          </>
        )
      }
    }
};
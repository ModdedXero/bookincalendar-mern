import React from "react";

import ProfileNavbar from "../Private/Secure/SecureNavbar";
import SiteNavbar from "../Public/SiteNavbar";
import { useAuth } from "../../contexts/AuthContext";
import { Redirect } from "react-router-dom";

const adminUsers = ["blakekw00@gmail.com", "ericawilliamsphotography@yahoo.com"];

export default function DynamicRoute({ component: Component, layout, secure, admin }) {
  const { currentUser } = useAuth();

  const renderComponent = () => {
    switch (layout) {
      case "SITE": {
        return (
          <SiteNavbar component={Component} />
        )
      }
      case "PROFILE": {
        return (
          <ProfileNavbar component={Component} />
        )
      }
      default: {
        return (
          <>
            {Component}
          </>
        )
      }
    }
  }

  if (secure) {
    if (!admin) {
      return currentUser ? renderComponent() : <Redirect to="/login" />;
    } else if (admin) {
      if (currentUser && adminUsers.includes(currentUser.email)) {
        return currentUser ? renderComponent() : <Redirect to="/login" />;
      } else {
        return <Redirect to="/login" />;
      }
    }
  } else {
    return renderComponent();
  }
};
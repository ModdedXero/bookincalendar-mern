import React from "react";
import { Redirect, Route } from "react-router-dom";

import SiteNavbar from "./SiteNavbar";
import ProfileNavbar from "./ProfileNavbar";
import { useAuth } from "../contexts/AuthContext";

export default function DynamicRoute({ component: Component, layout, secure, ...rest }) {
  const { currentUser } = useAuth();
  
    const actualRouteComponent = (
      secure ?
      <Route {...rest} layout render={props => (
        currentUser ? <Component {...props} /> : <Redirect to="/login" />
      )} />
      :
      <Route {...rest} layout render={props => (
        <Component {...props} />
      )} />
    );
  
    switch (layout) {
      case "SITE": {
        return (
          <SiteNavbar>
            {actualRouteComponent}
          </SiteNavbar>
        )
      }
      case "PROFILE": {
        return (
          <ProfileNavbar>
            {actualRouteComponent}
          </ProfileNavbar>
        )
      }
      default: {
        return (
          <>
            {actualRouteComponent}
          </>
        )
      }
    }
};
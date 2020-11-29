import React from "react";
import { Route } from "react-router-dom";

import SiteNavbar from "./SiteNavbar";
import ProfileNavbar from "./ProfileNavbar";

export default function DynamicRoute({ component: Component, layout, ...rest }) {
    // render actual Route from react-router
    const actualRouteComponent = (
        <Route {...rest} render={props => {
            <Component {...props} />
        }}>

        </Route>
    );
  
    // depends on the layout, you can wrap Route component in different layouts
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
          <SiteNavbar>
            {actualRouteComponent}
          </SiteNavbar>
        )
      }
    }
  };
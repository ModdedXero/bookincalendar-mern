import React from "react";

import SetupSidebar from "../SetupSidebar";
import ListContainer from "../../Utility/ListContainer";
import EventTypeList from "../ListComponents/EventTypeList";

export default function Sessions() {
    return (
        <>
            <SetupSidebar />
            <ListContainer>
                <h2 className="x_list-header">Session Types</h2>
                <EventTypeList className="x_list-component-last" />
            </ListContainer>
        </>
    )
}

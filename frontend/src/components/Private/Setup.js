import React from "react";

import GridContainer from "../GridContainer";
import EventComp from "./GridComponents/EventComp";

import "../../styles/form.css";


export default function Setup() {

    return (
        <div className="backdrop">
            <GridContainer triple_nth>
                <EventComp />
            </GridContainer>
        </div>
    )
}
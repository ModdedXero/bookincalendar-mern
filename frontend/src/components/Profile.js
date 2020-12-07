import React from "react";
import GridContainer from "./GridContainer";
import GridComponent from "./GridComponent";

export default function Profile() {

    return (
        <div className="backdrop">
            <GridContainer>
                <GridComponent>
                    Test 1
                </GridComponent>
                <GridComponent>
                    Test 2
                </GridComponent>
                <GridComponent>
                    Test 3
                </GridComponent>
                <GridComponent>
                    Test 4
                </GridComponent>
            </GridContainer>
        </div>
    )
}
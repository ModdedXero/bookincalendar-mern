import React, { useState } from "react";

import SetupSidebar from "../SetupSidebar";
import ListContainer from "../../Utility/ListContainer";
import EventTypeList from "../ListComponents/EventTypeList";
import SessionTypeModal from "./SessionTypeModal";

export default function Sessions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <>
            <SetupSidebar />
            <ListContainer>
                <div className="x_list-header-container">
                    <h2 className="x_list-header">Session Types</h2>
                    <button className="btn btn-info x_list-btn" onClick={toggleModal}>Add Session Type</button>
                </div>
                <SessionTypeModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
                <EventTypeList className="x_list-component-last" />
            </ListContainer>
        </>
    )
}

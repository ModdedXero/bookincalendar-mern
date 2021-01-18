import React, { useState } from "react";

import SessionTypeList from "./SessionTypeList";
import SessionTypeModal from "./SessionTypeModal";

export default function Sessions() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    return (
        <div className="component-sm">
            <div className="table-title-group">
                <h2>Session Types</h2>
                <button type="button" className="button" onClick={toggleModal}>Add Type</button>
            </div>
            <SessionTypeModal isModalOpen={isModalOpen} toggleModal={toggleModal} />
            <SessionTypeList />
        </div>
    )
}

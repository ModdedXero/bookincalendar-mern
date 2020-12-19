import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../../../contexts/AuthContext";
import SessionTypeModal from "./SessionTypeModal";

export default function TypeTableItem({ eventType }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { currentUser } = useAuth();
    

    const toggleModal = () => {
        setIsModalOpen(!isModalOpen);
    }

    const handleDelete = () => {
        axios.delete(`/api/calendar/eventtype/${currentUser.uid}/${eventType._id}`)
            .then(res => console.log(res.data.response))

        window.location.reload();
    }

    return (
        <>
            <tr>
                <td>{eventType.eventName}</td>
                <td style={{ backgroundColor: eventType.backgroundColor }}></td>
                <td style={{ backgroundColor: eventType.color }}></td>
                <td>$300</td>
                <td><button className="button" onClick={toggleModal}>Edit</button></td>
                <td><button className="button" onClick={handleDelete}>Delete</button></td>
            </tr>
            <SessionTypeModal isModalOpen={isModalOpen} toggleModal={toggleModal} updateType={eventType} />
        </>
    )
}

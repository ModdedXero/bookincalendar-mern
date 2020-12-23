import React, { useState } from "react";
import axios from "axios";

import { useAuth } from "../../../contexts/AuthContext";
import SessionTypeModal from "../Setup/SessionTypeModal";

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
                <th scope="row">{eventType.eventName}</th>
                <td className="x_color-block" style={{ backgroundColor: eventType.backgroundColor }}></td>
                <td className="x_color-block" style={{ backgroundColor: eventType.color }}></td>
                <td>Click Edit to View</td>
                <td>Click Edit to View</td>
                <td><button className="btn btn-info submit-btn" onClick={toggleModal}>Edit</button></td>
                <td><button className="btn btn-info submit-btn" onClick={handleDelete}>Delete</button></td>
            </tr>
            <SessionTypeModal isModalOpen={isModalOpen} toggleModal={toggleModal} updateType={eventType} />
        </>
    )
}

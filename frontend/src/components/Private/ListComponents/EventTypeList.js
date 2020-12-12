import React, { useState, useEffect } from "react";
import axios from "axios";

import ListComponent from "../../Utility/ListComponent";
import TypeTableItem from "./TypeTableItem";
import { useAuth } from "../../../contexts/AuthContext";

export default function EventTypeList() {
    const [eventTypes, setEventTypes] = useState([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        axios.get(`/api/calendar/eventtype/${currentUser.uid}`)
            .then(res => setEventTypes(res.data.eventTypes))
    }, [])

    return (
        <ListComponent>
            <table className="table table-hover">
                <thead>
                    <tr>
                        <th scope="col">Label</th>
                        <th scope="col">Background Color</th>
                        <th scope="col">Text Color</th>
                        <th scope="col">Description</th>
                        <th scope="col">Photo</th>
                        <th scope="col" style={{ width: "50px" }}></th>
                        <th scope="col" style={{ width: "50px" }}></th>
                    </tr>
                </thead>
                <tbody>
                    {eventTypes.map((type) => {
                        return (
                            <TypeTableItem key={type.eventName} eventType={type} />
                        )
                    })}
                </tbody>
            </table>
        </ListComponent>
    )
}

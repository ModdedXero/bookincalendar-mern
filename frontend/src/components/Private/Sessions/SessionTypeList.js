import React, { useState, useEffect } from "react";
import axios from "axios";

import TypeTableItem from "./TypeTableItem";
import { useAuth } from "../../../contexts/AuthContext";

export default function SessionTypeList() {
    const [eventTypes, setEventTypes] = useState([]);

    const { currentUser } = useAuth();

    useEffect(() => {
        axios.get(`/api/calendar/eventtype/${currentUser.uid}`)
            .then(res => setEventTypes(res.data.eventTypes))
    }, [])

    return (
        <table className="table table-hover">
            <thead>
                <tr>
                    <th>Label</th>
                    <th>Calendar Background Color</th>
                    <th>Calendar Text Color</th>
                    <th>Base Price</th>
                    <th style={{ width: "50px" }}></th>
                    <th style={{ width: "50px" }}></th>
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
    )
}

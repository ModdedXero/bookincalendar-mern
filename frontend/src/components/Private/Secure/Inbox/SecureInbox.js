import React, { useEffect, useState } from "react";
import axios from "axios";

import Modal from "../../../Utility/Modal";
import Form from "../../../Utility/Form";

export default function SecureInbox({ authority, userProfile }) {
    const [messages, setMessages] = useState([]);
    const [sendMessageModal, setSendMessageModal] = useState(false);

    useEffect(() => {
        axios.get(`/api/inbox/${userProfile.inboxID}`)
            .then(res => setMessages(res.data.response.messages));
    })

    return (
        <div className="secure-inbox-container">
            {authority == 0 &&
            <div className="generic-table-contentbar">
                <button className="stripped-button" onClick={() => setSendMessageModal(true)}>Create Message</button>
            </div>}

            <Modal open={sendMessageModal} onClose={() => setSendMessageModal(false)} small>
                <Form>
                    
                </Form>
            </Modal>
        </div>
    )
}

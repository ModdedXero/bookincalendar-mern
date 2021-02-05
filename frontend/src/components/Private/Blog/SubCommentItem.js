import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

import Modal from "../../Utility/Modal";
import { DirtyRerender, useRerender } from "../../Utility/Hooks";

export default function SubCommentItem({ subComment, containerID, commentID }) {
    const [isModal, setIsModal] = useState(false);

    const bodyRef = useRef();

    useRerender();
    useEffect(() => {
        bodyRef.current.style.height = "0px";
        const scrollHeight = bodyRef.current.scrollHeight;
        bodyRef.current.style.height = scrollHeight + "px";
    }, [])

    const handleApprove = () => {
        axios.post(`/api/blog/comment/sub/approve/${containerID}`, { commentID: commentID, subComID: subComment._id })
            .then(res => {
                if (res.data.response === "SUCCESS") {
                    subComment.isApproved = true;
                    DirtyRerender();
                }
            })
    }

    const handleDelete = () => {
        axios.delete(`/api/blog/comment/sub/delete/${containerID}/${commentID}/${subComment._id}`)
        .then(() => DirtyRerender())
    }

    const toggleDeleteModal = () => {
        setIsModal(!isModal);
    }

    const renderBody = () => {
        var ret = []
        const sep = subComment.commentBody.split("\\n");
        ret = sep.join("\n");
        return ret;
    }

    return (
        <div className="inspire-subcomment">
            <p>{subComment.authorName} said:</p>
            <p className="inspire-comment-date">{format(new Date(Date.parse(subComment.createdDate)), "MMMM d, yyyy h:mm aaaa")}</p>
            <textarea 
                ref={bodyRef}
                className="inspire-comment-body" 
                readOnly
            >{renderBody()}</textarea>
            {!subComment.isApproved && <button className="yellow-button" onClick={handleApprove}>
                Approve
            </button>}
            <button style={{ marginLeft: "20px" }} className="yellow-button" onClick={toggleDeleteModal}>Delete</button>
            <Modal open={isModal} onClose={toggleDeleteModal} small>
                Are you sure? <button className="generic-button" onClick={handleDelete}>Yes</button> <button className="generic-button" onClick={toggleDeleteModal}>No</button>
            </Modal>
        </div>
    )
}

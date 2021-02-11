import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

import { useStickyWindow, useRerender, DirtyRerender } from "../../../Utility/Hooks";
import SubCommentItem from "./SubCommentItem";
import Modal from "../../../Utility/Modal";

export default function CommentItem({ comment, containerID }) {
    const [isModal, setIsModal] = useState(false);

    const bodyRef = useRef();

    useEffect(() => {
        bodyRef.current.style.height = "0px";
        const scrollHeight = bodyRef.current.scrollHeight;
        bodyRef.current.style.height = scrollHeight + "px";
    }, [])

    useRerender(2);

    const handleApprove = () => {
        axios.post(`/api/blog/comment/approve/${containerID}`, { commentID: comment._id })
            .then(res => {
                if (res.data.response === "SUCCESS") {
                    comment.isApproved = true;
                    DirtyRerender();
                }
            })
    }

    const handleDelete = () => {
        axios.delete(`/api/blog/comment/delete/${containerID}/${comment._id}`)
            .then(() => DirtyRerender())
    }

    const toggleDeleteModal = () => {
        setIsModal(!isModal);
    }

    useStickyWindow();

    const renderBody = () => {
        var ret = []
        const sep = comment.commentBody.split("\\n");
        ret = sep.join("\n");
        return ret;
    }

    return (
        <div className="inspire-comment">
            <p>{comment.authorName} said:</p>
            <p className="inspire-comment-date">{format(new Date(Date.parse(comment.createdDate)), "MMMM d, yyyy h:mm aaaa")}</p>
            <textarea 
                ref={bodyRef}
                className="inspire-comment-body" 
                readOnly
            >{renderBody()}</textarea>
            {!comment.isApproved && <button className="yellow-button" onClick={handleApprove}>
                Approve
            </button>}
            <button style={{ marginLeft: "20px" }} className="yellow-button" onClick={toggleDeleteModal}>Delete</button>
            <Modal open={isModal} onClose={toggleDeleteModal} small>
                Are you sure? <button className="generic-button" onClick={handleDelete}>Yes</button> <button className="generic-button" onClick={toggleDeleteModal}>No</button>
            </Modal>
            {comment.subComments.map((sub) => {
                return <SubCommentItem subComment={sub} containerID={containerID} commentID={comment._id} />
            })}
        </div>
    )
}

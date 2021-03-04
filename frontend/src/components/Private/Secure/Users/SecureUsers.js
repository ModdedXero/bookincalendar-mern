import React, { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import axios from "axios";

import Modal from "../../../Utility/Modal";
import { ProfileAuthority } from "../../../../global";
import { MakeID } from "../../../Utility/RandomUtils";
import Form from "../../../Utility/Form";

export default function SecureUsers() {
    const [users, setUsers] = useState([]);
    const [addUserModal, setAddUserModal] = useState(false);
    const [editUserModal, setEditUserModal] = useState(false);
    const [currentUser, setCurrentUser] = useState({});

    // Add User Refs
    const emailRef = useRef();
    const usernameRef = useRef();
    const authorityRef = useRef();

    useEffect(() => {
        axios.get("/api/login/users")
            .then(res => setUsers(res.data.response))
    }, [])

    const handleAddUser = () => {
        const newUser = {
            email: emailRef.current.value, 
            username: usernameRef.current.value,
            tempPassword: MakeID(12),
            profileAuthority: authorityRef.current.value
        }

        axios.post(`/api/login/signup`, newUser);
    }

    const handleEditUser = () => {
        const profileUpdate = currentUser;
        profileUpdate.email = emailRef.current.value;
        profileUpdate.profileName = usernameRef.current.value;
        profileUpdate.profileAuthority = authorityRef.current.value;
        
        axios.post("/api/login/update", { profileUpdate: profileUpdate });
    }

    const showEditUser = (user) => {
        setCurrentUser(user);
        setEditUserModal(true);
    }

    const renderProfileAuthority = () => {
        var returnArray = [];

        for (const [key, value] of Object.entries(ProfileAuthority)) {
            returnArray.push(<option value={key}>{value}</option>)
        }

        return returnArray;
    }

    return (
        <div className="secure-users-container">
            <div className="generic-table-contentbar">
                <button className="stripped-button" onClick={() => setAddUserModal(!addUserModal)}>Add User</button>
            </div>

            <Modal open={addUserModal} onClose={() => setAddUserModal(false)} small>
                <Form 
                    style={{ display: "flex", flexDirection: "column" }} 
                    activeText="Add User" 
                    disabledText="Adding..."
                    buttonClass="yellow-button"
                    onSubmit={handleAddUser}
                >
                    <label>Name</label>
                    <input required ref={usernameRef} />
                    <label>Email</label>
                    <input required ref={emailRef} />
                    <label>Authority</label>
                    <select ref={authorityRef}>
                        {renderProfileAuthority()}
                    </select>
                </Form>
            </Modal>

            <table className="generic-table">
                <thead>
                    <tr>
                        <th><input type="checkbox" /></th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Authority</th>
                        <th>Join Date</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr>
                                <td><input type="checkbox" /></td>
                                <td>{user.profileName}</td>
                                <td>{user.email}</td>
                                <td>{ProfileAuthority[user.profileAuthority]}</td>
                                <td>{format(Date.parse(user.profileCreatedDate), "MM/dd/yyyy")}</td>
                                <td><button className="stripped-button" onClick={() => showEditUser(user)}>Edit</button></td>
                                <td><button className="stripped-button">Delete</button></td>
                                <Modal open={editUserModal} onClose={() => setEditUserModal(false)} small>
                                    <Form 
                                        style={{ display: "flex", flexDirection: "column" }} 
                                        activeText="Save User" 
                                        disabledText="Saving..."
                                        buttonClass="yellow-button"
                                        onSubmit={handleEditUser}
                                    >
                                        <label>Name</label>
                                        <input required ref={usernameRef} defaultValue={currentUser.profileName} />
                                        <label>Email</label>
                                        <input required ref={emailRef} defaultValue={currentUser.email} />
                                        <label>Authority</label>
                                        <select ref={authorityRef} defaultValue={currentUser.profileAuthority}>
                                            {renderProfileAuthority()}
                                        </select>
                                    </Form>
                                </Modal>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

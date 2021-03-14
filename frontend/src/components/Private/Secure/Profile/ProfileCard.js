import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

import { useAuth } from "../../../../contexts/AuthContext";
import Modal from "../../../Utility/Modal";
import Form from "../../../Utility/Form";
import { ProfileAuthority } from "../../../../global";
import ProfileTag from "./ProfileTag";

export default function ProfileCard({ profile }) {
    const { updatePassword, uploadFile } = useAuth();

    const [isModal, setIsModal] = useState();
    const [profilePic, setProfilePic] = useState();
    const [profilePicPreview, setProfilePicPreview] = useState(profile.profilePicture || "https://firebasestorage.googleapis.com/v0/b/react-auth-dev-57b4d.appspot.com/o/SiteImages%2FProfile%2Fnouserimage.png?alt=media&token=847c5b69-bba2-4a06-9da3-d7f22caab20d");

    const usernameRef = useRef();
    const passwordRef = useRef();
    const userPicInput = useRef();

    useEffect(() => {
        setIsModal(profile.profilePicture == "");
    }, [profile])

    async function handleSave(e) {
        e.preventDefault();
        const profileUpload = profile;
        profileUpload.profileName = usernameRef.current.value;
        if (passwordRef.current.value !== "DEFAULT") updatePassword(passwordRef.current.value);

        const fileRef = {
            file: profilePic,
            fileName: "Profile/profilePicture",
            isAdmin: false
        }

        if (profilePic !== undefined) {
            profileUpload.profilePicture = await uploadFile(fileRef);
        }

        axios.post("/api/login/update", { profileUpdate: profileUpload })
            .then(res => console.log(res.data.response))

        window.location.reload();
    }

    const handlePicture = (e) => {
        e.stopPropagation();

        userPicInput.current.click();
    }

    const handlePictureChange = (e) => {
        setProfilePic(e.target.files[0]);
        setProfilePicPreview(URL.createObjectURL(e.target.files[0]));
    }

    const getProfilePic = () => {
        return profile.profilePicture ? profile.profilePicture : "https://firebasestorage.googleapis.com/v0/b/react-auth-dev-57b4d.appspot.com/o/SiteImages%2FProfile%2Fnouserimage.png?alt=media&token=847c5b69-bba2-4a06-9da3-d7f22caab20d"
    }

    return (
        <div className="profile-card">
            <img className="profile-card-img" src={getProfilePic()} onClick={() => setIsModal(!isModal)}></img>
            <p>{profile.profileName}</p>
            <p>{ProfileAuthority[profile.profileAuthority]}</p>
            <div>
                {/*profile.profileTags.map((tag) => {
                    return <ProfileTag tag={tag} />
                })*/}
            </div>
            <Modal open={isModal} onClose={() => setIsModal(false)} small noClose={!profile.profileName}>
                <Form 
                    style={{ display: "flex", flexDirection: "column" }} 
                    activeText="Add User" 
                    disabledText="Adding..."
                    buttonClass="yellow-button"
                    onSubmit={handleSave}
                >
                    <input ref={userPicInput} type="file" onChange={handlePictureChange} style={{ display: "none" }} />
                    <img className="profile-card-img" src={getProfilePic()} onClick={handlePicture} />
                    <label>Username</label>
                    <input ref={usernameRef} defaultValue={profile.profileName} required />
                    <label>Password</label>
                    <input type="password" ref={passwordRef} defaultValue={profile.profileName ? "DEFAULT" : ""} required />
                </Form>
            </Modal>
        </div>
    )
}

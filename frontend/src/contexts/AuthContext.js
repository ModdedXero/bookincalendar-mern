import React, { useContext, useState, useEffect } from "react";
import { auth, storage } from "../firebase";
import axios from "axios";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // User Functions
    function signup(email, password) {
        return auth.createUserWithEmailAndPassword(email, password)
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password);
    }

    function logout() {
        return auth.signOut();
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email);
    }

    function updateEmail(email) {
        return currentUser.updateEmail(email);
    }

    function updatePassword(password) {
        return currentUser.updatePassword(password);
    }

    // Storage Functions

    function uploadFile(fileRef = {
        file: "",
        fileName: "",
        upload: ""
        }) {
        const sRef = storage.ref(`${currentUser.uid}/` + fileRef.fileName);
        const task = sRef.put(fileRef.file);

        task.on("state_changed",
            function progress(snapshot) {
                const percentage = (snapshot.bytesTransferred /
                    snapshot.totalBytes) * 100;
                fileRef.upload.value = percentage;
            },
            
            function error(err) {
                console.log(err);
            },
            
            function complete() {

            }
        )
    }

    function downloadFile(path) {
        const sRef = storage.ref(path);

        sRef.getDownloadURL()
            .then((url) => {
                return (
                    <img src={url} alt=""></img>
                )
            })
            .catch((err) => console.log(err))

        return <img alt=""></img>
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            // If user isn't set try adding user to DB
            if (user !== currentUser) {
                axios.post(`/api/login/signup`, { email: user.email, uid: user.uid } )
                    .then((res) => console.log(res.data.response))
            }
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    }, []);

    const value = {
        // User Exports
        currentUser,
        login,
        signup,
        logout,
        resetPassword,
        updateEmail,
        updatePassword,

        // Storage Exports
        uploadFile,
        downloadFile
    };

    return (
        <AuthContext.Provider value={value}>
            {!isLoading && children}
        </AuthContext.Provider>
    );
}
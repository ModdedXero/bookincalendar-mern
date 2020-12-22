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
        return auth.createUserWithEmailAndPassword(email, password);
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
                if (fileRef.updload != null) {
                    const percentage = (snapshot.bytesTransferred /
                        snapshot.totalBytes) * 100;
                    fileRef.upload.value = percentage;
                }
            },
            
            function error(err) {
                console.log(err);
            },
            
            function complete() {
                console.log("File Uploaded!");
            }
        )

        return task.then();
    }

    function downloadFile(path) {
        const sRef = storage.ref(`${currentUser.uid}/` + path);

        return sRef.getDownloadURL();
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
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
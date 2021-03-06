import React, { useContext, useState, useEffect } from "react";
import { auth, storage, googleAuth } from "../firebase";

const AuthContext = React.createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    // User Email Functions

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

    // User Google Functions

    function signInWithGoogle() {
        return auth.signInWithPopup(googleAuth);
    }

    // Storage Functions

    async function uploadFile(fileRef = {
        file: "",
        fileName: "",
        isAdmin: false
        }) {
        
        var returnUrl;
        const sRef = storage.ref(`${!fileRef.isAdmin ? currentUser.uid : ""}/` + fileRef.fileName);
        await sRef.put(fileRef.file)
        .then(snapshot => {
            returnUrl = snapshot.ref.getDownloadURL();
        })
        
        return returnUrl;
    }

    function downloadFile(path) {
        const sRef = storage.ref(path);

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

        // Google Exports
        signInWithGoogle,

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
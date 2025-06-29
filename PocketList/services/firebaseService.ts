import firebaseAuth from "@/src/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    signOut,
} from "firebase/auth";

// AUTH FUNCTIONS

export const registerUser = async (email: string, password: string) => {
    const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    return { user: userCredential.user };
};

export const loginUser = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return { user: userCredential.user };
};

export const resetPassword = async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email);
    return true;
};

export const logoutUser = async () => {
    await signOut(firebaseAuth);
    return true;
};

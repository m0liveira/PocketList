import * as ExpoCrypto from "expo-crypto";
import { sha256 } from "js-sha256";
import { firebaseAuth, db } from "@/src/firebaseConfig";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    deleteUser,
    sendPasswordResetEmail,
    sendEmailVerification,
    signOut,
    User
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

// ENDPOINTS
const USERS_COLLECTION = "users";

// UTILITY FUNCTIONS

async function generateUserCode(email: string, username: string, createdAt: string, uid: string) {
    const randomBytes = await ExpoCrypto.getRandomBytesAsync(8);

    const randomHex = Array.from(randomBytes).map((b) => b.toString(16).padStart(2, "0")).join("");

    const baseString = `${uid}-${email}-${username}-${createdAt}-${randomHex}`;

    const hash = sha256(baseString);

    const code = `${hash.slice(0, 5).toUpperCase()}-${hash.slice(5, 9).toUpperCase()}`;

    return code;
}

// AUTH FUNCTIONS

export const registerUser = async (data: any) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
        const user = userCredential.user;

        const endpoint = doc(db, USERS_COLLECTION, user.uid);
        const date = new Date();

        const userData = {
            photo: '',
            username: data.username,
            code: await generateUserCode(data.email, data.username, date.toLocaleDateString("pt-PT"), user.uid),
            createdAt: date.toLocaleDateString("pt-PT"),
        };

        try {
            await setFirestoreData(userData, endpoint);

            try {
                await emailVerification(user);
            } catch (emailError) {
                throw emailError;
            }
        } catch (firestoreError) {
            try {
                await deleteUserAccount(user);
            } catch (deleteError) {
                throw deleteError;
            }
            throw firestoreError;
        }

        return { user, userData };
    } catch (error) {
        throw error;
    }
};

export const loginUser = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
        const user = userCredential.user;

        if (!user.emailVerified) {
            try {
                await emailVerification(user);
            } catch (emailError) {
                throw emailError;
            }

            await logoutUser();
            return false;
        }

        return { user };
    } catch (error) {
        throw error;
    }
};

export const deleteUserAccount = async (user: User) => {
    try {
        await deleteUser(user);
        return true;
    } catch (error) {
        throw error;
    }
};

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(firebaseAuth, email);
        return true;
    } catch (error) {
        throw error;
    }
};

export const emailVerification = async (user: User) => {
    try {
        await sendEmailVerification(user);
    } catch (error) {
        throw error;
    }
};

export const logoutUser = async () => {
    try {
        await signOut(firebaseAuth);
        return true;
    } catch (error) {
        throw error;
    }
};

// FIRESTORE FUNCTIONS

export const setFirestoreData = async (data: any, endpoint: any) => {
    try {
        const result = await setDoc(endpoint, data, { merge: true });
        return result;
    } catch (error) {
        throw error;
    }
};

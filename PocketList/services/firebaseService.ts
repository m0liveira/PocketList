import { firebaseAuth, db } from "@/src/firebaseConfig";
import * as ExpoCrypto from "expo-crypto";
import { sha256 } from "js-sha256";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithCredential,
    GoogleAuthProvider,
    deleteUser,
    sendPasswordResetEmail,
    sendEmailVerification,
    updateProfile,
    signOut,
    User,
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { getUserData } from "./userService";

// ENDPOINTS
export const USERS_COLLECTION_REF = "users";
export const LIST_COLLECTION_REF = "lists";

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

export const getUser = async (user: any) => {
    const endpoint = doc(db, USERS_COLLECTION_REF, user.uid);
    let result = null;

    try {
        result = await getFirestoreData(endpoint);
    } catch (error) {
        throw error;
    }

    let data = {
        uid: user.uid,
        email: user.email,
        emailVerified: user.emailVerified,
        isAnonymous: user.isAnonymous,
        providerData: user.providerData,
        createdAt: user.metadata.creationTime || "",
        lastLoginAt: user.metadata.lastSignInTime || "",
        photoURL: user.photoURL,
        displayName: user.displayName,
        firestoreData: result,
    }
    return data;
};

export const registerUser = async (data: any) => {
    try {
        const userCredential = await createUserWithEmailAndPassword(firebaseAuth, data.email, data.password);
        const user = userCredential.user;

        try {
            await updateProfile(user, {
                displayName: data.username,
                photoURL: '',
            });
        } catch (error) {
            throw new Error("Error updating user profile: " + error);
        }

        const endpoint = doc(db, USERS_COLLECTION_REF, user.uid);
        const date = new Date();

        const userData = {
            code: await generateUserCode(data.email, data.username, date.toLocaleDateString("pt-PT"), user.uid),
            createdAt: date.toLocaleDateString("pt-PT"),
            friends: {
                friends: [],
                pending: [],
                blocked: [],
            },
            notifications: {
                unread: [],
                read: [],
            }
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
            return { verified: false, user };
        }

        return getUser(user);
    } catch (error) {
        throw error;
    }
};

export const signInWithGoogle = async (idToken: string) => {
    try {
        const credential = GoogleAuthProvider.credential(idToken);
        const userCredential = await signInWithCredential(firebaseAuth, credential);
        const user = userCredential.user;

        // If it's a new user, you may want to initialize their Firestore data here

        // if (!user.emailVerified) {
        //     await emailVerification(user);
        //     await logoutUser();
        //     return { verified: false, user };
        // }

        return { user };
    } catch (error) {
        throw error;
    }
};

export const updateUserProfile = async (updates: { displayName?: string; photoURL?: string }) => {
    const user = firebaseAuth.currentUser;
    if (!user) {
        throw new Error("No authenticated user found.");
    }

    const updateData: Record<string, string> = {};
    if (updates.displayName !== undefined) updateData.displayName = updates.displayName;
    if (updates.photoURL !== undefined) updateData.photoURL = updates.photoURL;

    if (Object.keys(updateData).length === 0) {
        throw new Error("No update fields provided.");
    }

    try {
        await updateProfile(user, updateData);
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

export const deleteUserAccount = async (user: User) => {
    try {
        await deleteUser(user);
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

export const resetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(firebaseAuth, email);
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

export const getFirestoreData = async (endpoint: any) => {
    try {
        const docSnap = await getDoc(endpoint);

        if (docSnap.exists()) {
            return docSnap.data();
        } else {
            throw new Error("Documento não encontrado");
        }
    } catch (error) {
        throw error;
    }
};

export const getListsByUserId = async (userId: string) => {
    try {
        const listsRef = collection(db, LIST_COLLECTION_REF);
        const q = query(listsRef, where("collaborators", "array-contains", userId));

        const querySnapshot = await getDocs(q);

        const unpinned: any[] = [];
        const pinned: any[] = [];

        querySnapshot.forEach((doc) => {
            const data = { id: doc.id, isPinned: false, ...doc.data() };

            if (data.isPinned) {
                pinned.push(data);
            } else {
                unpinned.push(data);
            }
        });

        return {
            lists: unpinned,
            pinned: pinned,
        };
    } catch (error) {
        console.error("Erro ao buscar listas:", error);
        throw error;
    }
};

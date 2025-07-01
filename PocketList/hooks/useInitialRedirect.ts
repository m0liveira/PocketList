import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/src/firebaseConfig";
import { router } from "expo-router";
import { setUserData } from "@/services/userService";
import { getUser } from "@/services/firebaseService";

export const useInitialRedirect = () => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const checkIntroAndAuth = async () => {
            try {
                const hasSeenIntro = await AsyncStorage.getItem("@has_seen_intro");

                if (!hasSeenIntro) {
                    router.replace("/screens/intro");
                    return;
                }

                setLoading(true);

                const unsubscribe = onAuthStateChanged(firebaseAuth, async (user) => {
                    if (user) {
                        setUserData(await getUser(user));
                        router.replace("/screens/home");
                    } else {
                        router.replace("/screens/login");
                    }
                });

                return unsubscribe;
            } catch (error) {
                console.error("Redirection error:", error);
                router.replace("/screens/login");
            } finally {
                setLoading(false);
            }
        };

        checkIntroAndAuth();
    }, []);

    return { loading };
};

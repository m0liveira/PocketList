
type UserData = Record<string, any>;

let currentUser: UserData | null = null;

export const setUserData = (user: UserData) => {
    currentUser = { ...(currentUser || {}), ...user };
};

export const getUserData = (): UserData | null => {
    return currentUser;
};

export const isUserLoggedIn = (): boolean => {
    return currentUser !== null;
};

export const clearUserData = () => {
    currentUser = null;
};

export const getUserNotifications = () => {
    return currentUser?.firestoreData?.notifications || { unread: [], read: [] };
};
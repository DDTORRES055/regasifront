import React, { useEffect, useState } from "react";
import Requests from "../Utilities/Requests";

const UserContext = React.createContext();
const { Provider, Consumer } = UserContext;

const UserProvider = ({ children }) => {
    const [user, setUser] = useState({package:{}});


    useEffect(() => {
        setTimeout(() => {
            setUser({userID : "Usuario", name: "Usuario", package:{}})
        }, 3000)
    }, [])

    const isAnUserAuthenticated = () => {
        return !!localStorage.getItem("Authorization");
    };

    const signUpUser = async (email, password, name) => {};

    const updateUserInfo = async (name, telegramID) => {};

    const signInUser = async (username, password) => {
        try {
            const response = await Requests.post("auth", { username, password });
            if (!response.data.access_token) return false;
            localStorage.setItem("Authorization", response.data.access_token);
            return true;
        } catch (error) {
            console.log("Error on signInUser");
            console.log("Error: ", error);
            return false;
        }
    };

    const signOutUser = async () => {
        localStorage.removeItem("Authorization");
        return true;
    };

    return (
        <Provider
            value={{
                user,
                signInUser,
                signUpUser,
                isAnUserAuthenticated,
                signOutUser,
            }}
        >
            {children}
        </Provider>
    );
};
export { UserProvider, Consumer as UserConsumer, UserContext };

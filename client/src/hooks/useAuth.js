import { useContext } from "react";

import { login, register } from "../api/authAPI"
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const {password: _, ...authData} = await login(email, password);

        changeAuthState(authData);

        return authData;

    }
    return loginHandler;
};

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (username, email, password) => {
        const {password: _, ...authData} = await register(username, email, password);
        console.log(authData);

        changeAuthState(authData);

        return authData;
    };
    
    return registerHandler;
};
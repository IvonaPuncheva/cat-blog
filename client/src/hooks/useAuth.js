import { useContext } from "react";

import { login, register } from "../api/authAPI"
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const {password: _, authData} = await login(email, password);

        changeAuthState(authData);

        return result;

    }
    return loginHandler;
};

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password) => {
        const {password: _, ...authData} = await register(email, password);

        changeAuthState(authData);

        return result;
    };
    
    return registerHandler;
};
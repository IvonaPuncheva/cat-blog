import { useContext } from "react";

import { login } from "../api/authAPI"
import { AuthContext } from "../context/AuthContext";

export const useLogin = () => {
    const { changeAuthState } = useContext(AuthContext);

    const loginHandler = async (email, password) => {
        const result = await login(email, password);

        changeAuthState(result);

        return result;

    }
    return loginHandler;
};

export const useRegister = () => {
    const { changeAuthState } = useContext(AuthContext);

    const registerHandler = async (email, password) => {
        const result = await registerHandler(email, password);

        changeAuthState(result);

        return result;
    };
    
    return registerHandler;
};
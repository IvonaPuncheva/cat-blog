import { useContext } from "react";

import { login, register } from "../api/authAPI"
import { useAuthContext } from "../context/AuthContext.jsx";

export const useLogin = () => {
    const { changeAuthState } = useAuthContext();

    const loginHandler = async (email, password) => {
        const {password: _, ...authData} = await login(email, password);

        changeAuthState(authData);

        return authData;

    }
    return loginHandler;
};

export const useRegister = () => {
    const { changeAuthState } = useAuthContext();

    const registerHandler = async (username, email, password) => {
        const {password: _, ...authData} = await register(username, email, password);
        console.log(authData);

        changeAuthState(authData);

        return authData;
    };
    
    return registerHandler;
};


// export const useCurrentUser = () => {
//     const { user } = useContext(AuthContext);
//     return user;
// };
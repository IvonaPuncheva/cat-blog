import { createContext, useContext } from "react"
import usePersistedState from "../hooks/usePersistedState";
import { useEffect } from "react";

export const AuthContext = createContext({
    userId: '',
    email: '',
    accessToken: '',
    isAuthenticated: false,
    changeAuthState: (authState = {}) => null,
    user: null,
  });


  export function AuthContextProvider (props) {
    const [authState, setAuthState] = usePersistedState('auth', {});
    
  const changeAuthState = (state) => {
    setAuthState(state);
    
  }
  // useEffect(() => {
  //   console.log('Current authState:', authState);
  // }, [authState]);
  
  const contextData = {
    user: authState,
    userId: authState._id,
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,
  };

    return (
        <AuthContext.Provider value={contextData}>
            {props.children}
        </AuthContext.Provider>
    );
};

export function useAuthContext(){
  const authData = useContext(AuthContext);

  return authData;
}
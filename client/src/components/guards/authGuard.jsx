import { useContext } from "react"
import { useAuthContext } from "../../context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard (props) {
    const { isAuthenticated } = useAuthContext();

    if(!isAuthenticated){
        return <Navigate to='/login' />
    }

    return <Outlet/>
    
}
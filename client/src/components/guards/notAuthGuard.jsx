import { useAuthContext } from "../../context/AuthContext.jsx";
import { Navigate, Outlet } from "react-router-dom";



export default function NotauthGuard(props) {
    const { isAuthenticated } = useAuthContext();

    if(isAuthenticated){
        return <Navigate to='/'/>
    }

    return <Outlet />
}
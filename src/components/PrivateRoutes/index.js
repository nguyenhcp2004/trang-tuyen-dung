import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";

const PrivateRoutes = () => {
    const token = getCookie("token");
    let isLogin = false;
    if(token) {
        isLogin = true;
    }
    return (
        <>
           {isLogin ? <Outlet /> : <Navigate to="/login" />}
        </>
    )
}

export default PrivateRoutes ;
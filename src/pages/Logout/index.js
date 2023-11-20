import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookies";
import { useEffect } from "react";
import { useDispatch } from 'react-redux';
import { checkAuthen } from "../../actions/authen";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    deleteAllCookies();
    
    useEffect(() => {
        dispatch(checkAuthen(false));
        navigate("/login");
    }, []);
   

    return (
        <>
        </>
    )
}

export default Logout;
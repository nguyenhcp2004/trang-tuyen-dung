import { getCookie } from "../helpers/cookies";

const token = getCookie("token");
let initState = false;
if(token){
    initState = true;
}

export const authenReducer = (state = initState, action) => {
    if(action.type === "CHECK_AUTHEN"){
        return action.status
    } else {
        return state;
    }
}
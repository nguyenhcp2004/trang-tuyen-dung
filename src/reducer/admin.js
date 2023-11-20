let initState = false;

export const adminReducer = (state = initState, action) => {
    if(action.type === "ADMIN_STATUS"){
        return action.status
    } else {
        return state;
    }
}
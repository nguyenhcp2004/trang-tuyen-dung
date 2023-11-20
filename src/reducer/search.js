let initState = {};

export const searchReducer = (state = initState, action) => {
    if(action.type === "INPUT_SEARCH"){
        let object = {
            city: action.city,
            tag: action.tag
        }
        return object;
    } else {
        return state;
    }
}
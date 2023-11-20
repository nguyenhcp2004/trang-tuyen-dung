import { combineReducers } from "redux";
import { authenReducer } from "./authen";
import {  searchReducer } from "./search";
import {  adminReducer } from "./admin";

export const allReducer = combineReducers({
    authenReducer,
    searchReducer,
    adminReducer
    //Thêm các reducer khác ở đây
});
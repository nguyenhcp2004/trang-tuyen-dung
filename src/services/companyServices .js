
import { get, patch, post } from "../util/request";

export const getListCompany = async () => {
    const data = await get(`company`);
    return data;
}

export const getCompany = async (id) => {
    const data = await get(`company/${id}`);
    return data;
}

export const updateCompany = async (id, options) => {
    const data = await patch (`company/${id}`, options )
    return data;
}

export const getUser = async (email, password) => {
    const data = await get(`company?email=${email}&password=${password}`);
    return data;
}

export const existUser = async (email) => {
    const data = await get(`company?email=${email}`);
    return data;
}

export const createUser = async (options) => {
    const data = await post(`company`, options);
    return data;
}



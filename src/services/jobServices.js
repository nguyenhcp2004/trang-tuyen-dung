import { get, patch, post, del } from "../util/request";

export const getListJob = async (tag, city) => {
    const data = await get(`jobs?tags_like=${tag}&city_like=${city}`);
    return data;
}

export const getJob = async (id) => {
    const data = await get(`jobs/${id}`);
    return data;
}

export const getListJobCompany = async (idCompany) => {
    const data = await get(`jobs/?idCompany=${idCompany}`);
    return data;
}

export const getJobOnStatus = async (idCompany) => {
    const data = await get(`jobs/?idCompany=${idCompany}&status=true`);
    return data;
}
export const getJobOffStatus = async (idCompany) => {
    const data = await get(`jobs/?idCompany=${idCompany}&status=false`);
    return data;
}

export const createJob = async (options) => {
    const data = await post(`jobs`, options);
    return data;
}

export const editJob = async (id, options) => {
    const data = await patch(`jobs/${id}`, options);
    return data;
}

export const deleteJob = async (id) => {
    const data = del(`jobs/${id}`);
    return data;
};


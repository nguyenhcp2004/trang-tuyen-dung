import { get, post, del, patch } from "../util/request";

export const createCv = async (options) => {
    const data = await post(`cv`, options);
    return data;
}

export const getCv = async (idCompany) => {
    const data = await get(`cv/?idCompany=${idCompany}`);
    return data;
}

export const getReadCv = async (idCompany) => {
    const data = await get(`cv/?idCompany=${idCompany}&statusRead=true`);
    return data;
}

export const deleteCv = async (id) => {
    const data = del(`cv/${id}`);
    return data;
};

export const getCvById = async (id) => {
    const data = await get(`cv/${id}`);
    return data;
}

export const editCv = async (id, options) => {
    const data = await patch(`cv/${id}`, options);
    return data;
}
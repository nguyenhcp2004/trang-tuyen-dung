import { get } from "../util/request";

export const getListTopic = async () => {
    const data = await get(`topics`);
    return data;
}

export const getTopic = async (id) => {
    const data = await get(`topics/${id}`);
    return data;
}
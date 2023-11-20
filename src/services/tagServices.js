import { get } from "../util/request";

export const getListTag = async () => {
    const data = await get(`tags`);
    return data;
}


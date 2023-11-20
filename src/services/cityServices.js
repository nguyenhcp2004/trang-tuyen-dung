import { get } from "../util/request";

export const getListCity = async () => {
    const data = await get(`city`);
    return data;
}




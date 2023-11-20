const SERVER = "https://db-trang-tuyen-dung.vercel.app/";

export const get = async (path) => {
    const response = await fetch(SERVER + path);
    const data = await response.json();
    return data;
}

export const post = async(path, options) => {
    const response = await fetch(SERVER + path, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(options)
    });
    const data = await response.json();
    return data;
}

export const del = async (path) => {
    const response = await fetch(SERVER + path, {
        method: "DELETE"
    });
    const data = await response.json();
    return data;
};

export const patch = async (path, options) => {
    const response = await fetch(SERVER + path, {
                method: "PATCH",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(options)
            });
           const data = await response.json();
           return data;
}
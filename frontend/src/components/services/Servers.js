import axios from "axios";

export const getServerCategories = (token) => {
    axios.defaults.headers.common["Authorization"] = "Token " + token;
    const promise = axios.get('api/server/categories');
    const dataPromise = promise.then((response) => response.data);
    return dataPromise;
}
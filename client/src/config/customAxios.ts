import axios from "axios";
import { BASE_URL } from "./apiUrls";
// import store from "../redux/store";

// console.log("hi", store);

axios.defaults.headers.common["Authorization"] =
    localStorage.getItem("raftLab") ?? null;

export const customAxios = axios.create({
    baseURL: BASE_URL,
});

customAxios.interceptors.request.use(
    (config) => {
        if (config?.data && config?.data instanceof FormData) {
            config.headers["Content-Type"] = "multipart/form-data";
        }
        const token = localStorage.getItem("raftLab") ?? null;
        config.headers.Authorization = "Bearer " + token;
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


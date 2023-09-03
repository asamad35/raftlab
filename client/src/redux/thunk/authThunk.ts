import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customAxios } from "../../config/customAxios";
import API_URLS from "../../config/apiUrls";

export const postSignup = createAsyncThunk("postSignup", async (payload: { name: string, password: string, email: string }) => {
    const { data } = await customAxios.post(API_URLS.postSignup, payload)
    if (data.data) {
        localStorage.setItem("raftLab", data.token);
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});

export const postLogin = createAsyncThunk("postLogout", async (payload: { password: string, email: string }) => {
    const { data } = await customAxios.post(API_URLS.postLogin, payload)
    if (data.data) {
        localStorage.setItem("raftLab", data.token + "");
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});


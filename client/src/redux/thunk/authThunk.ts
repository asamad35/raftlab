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

export const getNotFollowingUsers = createAsyncThunk("getNotFollowingUsers", async () => {
    const { data } = await customAxios.get(API_URLS.getNotFollowingUsers)
    if (data.data) {
        // localStorage.setItem("raftLab", data.token + "");
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});


export const postFollowAndUnfollow = createAsyncThunk("postFollowAndUnfollow", async (payload: { otherUserId: string }) => {
    const { data } = await customAxios.post(API_URLS.postFollowAndUnfollow, payload)
    if (data.data) {
        // localStorage.setItem("raftLab", data.token + "");
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});


export const getSearchUsers = createAsyncThunk("getSearchUsers", async (payload: { searchQuery: string }) => {
    const { data } = await customAxios.get(API_URLS.getSearchUsers + `?search=${payload.searchQuery}`)
    if (data.data) {
        // localStorage.setItem("raftLab", data.token + "");
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});


export const getVisitedUserDetails = createAsyncThunk("getVisitedUserDetails", async (payload: { userId: string }) => {
    const { data } = await customAxios.get(API_URLS.getVisitedUserDetails + `?userId=${payload.userId}`)
    if (data.data) {
        // localStorage.setItem("raftLab", data.token + "");
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});


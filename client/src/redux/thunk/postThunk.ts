import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { customAxios } from "../../config/customAxios";
import API_URLS from "../../config/apiUrls";
// import { PostInput } from "../../components/PostInput";
import { PostAction } from "../../components/Card";
import { PostInput } from "../../components/PostInput";

export const postCreatePost = createAsyncThunk("postCreatePost", async (payload: { formData: unknown, resetInputState: React.Dispatch<React.SetStateAction<PostInput>> | string, resetPreviewState: React.Dispatch<React.SetStateAction<string>> | string }) => {
    const { data } = await customAxios.post(API_URLS.postCreatePost, payload?.formData)
    if (data.data) {
        // do someething
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});

export const getUserFeed = createAsyncThunk("getUserFeed", async () => {
    const { data } = await customAxios.get(API_URLS.getUserFeed)
    if (data.data) {
        // do someething
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});

export const postUpdatePost = createAsyncThunk("postUpdatePost", async (payload: PostAction) => {
    const { data } = await customAxios.post(API_URLS.postUpdatePost, payload)
    if (data.data) {
        // do someething
    } else {
        toast.error(data.message);
        throw new Error();
    }
    return data;
});

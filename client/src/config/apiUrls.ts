console.log(import.meta.env.PROD, "ooooooooooooooooo");

export const BASE_URL =
    import.meta.env.VITE_SERVER_BASE_URL

console.log(import.meta.env.VITE_SERVER_BASE_URL, 'dwdwd')
const API_URLS = {
    postSignup: "auth/signup",
    postLogin: "auth/login",
    postGetUserData: "user/get-user-details",
    getUserPosts: "user/get-user-posts",
    getUserFeed: "user/get-user-feed",
    postCreatePost: "user/create-post",
    postUpdatePost: "user/update-post",
    postFollowAndUnfollow: "user/follow-and-unfollow",
    getNotFollowingUsers: "user/get-not-following-users",
    getSearchUsers: "user/get-search-users",
};
export default API_URLS
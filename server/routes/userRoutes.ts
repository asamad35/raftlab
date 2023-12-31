import express from "express";
import { isLoggedIn } from "../middlewares/userMiddleware";
import { getUserDetails, getUserPosts, createPost, updatePost, getuserFeed, followAndUnfollow, getNotFollowingUsers, getSearchUsers, getVisitedUserDetails, getAllUsers, updateUserProfile } from "../controllers/userController"

const router = express.Router();
router.route("/get-user-data").post(isLoggedIn, getUserDetails);
router.route("/get-user-posts").get(isLoggedIn, getUserPosts);
router.route("/create-post").post(isLoggedIn, createPost);
router.route("/update-post").post(isLoggedIn, updatePost);
router.route("/get-user-feed").get(isLoggedIn, getuserFeed);
router.route("/follow-and-unfollow").post(isLoggedIn, followAndUnfollow);
router.route("/get-not-following-users").get(isLoggedIn, getNotFollowingUsers);
router.route("/get-search-users").get(isLoggedIn, getSearchUsers);
router.route("/get-visited-user-details").get(isLoggedIn, getVisitedUserDetails);
router.route("/get-all-users").get(isLoggedIn, getAllUsers);
router.route("/update-user-profile").post(isLoggedIn, updateUserProfile);


export default router;

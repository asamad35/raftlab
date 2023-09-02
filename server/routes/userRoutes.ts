import express from "express";
import { isLoggedIn } from "../middlewares/userMiddleware";
import { getUserDetails, getUserPosts, createPost, updatePost, getuserFeed, followAndUnfollow } from "../controllers/userController"

const router = express.Router();
router.route("/get-user-data").post(isLoggedIn, getUserDetails);
router.route("/get-user-posts").get(isLoggedIn, getUserPosts);
router.route("/create-post").post(isLoggedIn, createPost);
router.route("/update-post").post(isLoggedIn, updatePost);
router.route("/get-user-feed").get(isLoggedIn, getuserFeed);
router.route("/follow-and-unfollow").post(isLoggedIn, followAndUnfollow);


export default router;

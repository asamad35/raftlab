import express from "express";
import {
    signup,
    login
}
    from "../controllers/userController"

const router = express.Router();

router.route("/signup").post(signup);
router.route("/login").post(login);
// router.route("/login-with-google").post(loginWithGoogle);
// router.route("/search-users").get(isLoggedIn, allUsers);

export default router;

import express from "express";
import {
    checkAuth,
    login,
    logout,
    signup,
    updateProfile,
} from "../controllers/auth.controller.js";
import {protectRoute} from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);
router.get("/check", protectRoute, checkAuth); // to check if user is authenticated or not
// we are going to call the checkAuth func whenever we reload our app

export default router;

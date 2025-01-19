import express from "express";
import { login, logout, register, updateUser } from "../Controllers/User.controller.js";
import isAuthenticate from "../Middlewares/isAunthenticate.js";
import { singleUpload } from "../Middlewares/multer.js";

 
const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticate,singleUpload,updateUser);

export default router;

import express from "express";
import { getComapanyById, getCompany, registerCompany, updateCompany } from "../Controllers/Company.controller.js";
import isAuthenticate from "../Middlewares/isAunthenticate.js";
import { singleUpload } from "../Middlewares/multer.js";

const router = express.Router();

router.route("/register").post(isAuthenticate, registerCompany);
router.route("/getCompanies").get(isAuthenticate,getCompany);
router.route("/getCompany/:id").get(isAuthenticate,getComapanyById);
router.route("/updateCompany/:id").put(isAuthenticate,singleUpload,updateCompany);

export default router;


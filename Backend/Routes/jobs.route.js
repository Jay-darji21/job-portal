import express from "express"
import isAunthenticate from "../Middlewares/isAunthenticate.js";
import { getAdminJob, getJob, jobById, postJob } from "../Controllers/Job.controller.js";

const jobRouter = express.Router();

jobRouter.route("/post").post(isAunthenticate,postJob);
jobRouter.route("/getJob").get(isAunthenticate,getJob);
jobRouter.route("/getAdminJob").get(isAunthenticate,getAdminJob);
jobRouter.route("/getJob/:id").get(isAunthenticate,jobById);

export default jobRouter;

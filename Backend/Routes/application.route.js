import express from 'express'
import { applyJob, getApplicants, getAppliedJob, updateStatus } from '../Controllers/Apllication.controller.js';
import isAunthenticate from '../Middlewares/isAunthenticate.js';

const router = express.Router();


router.route("/apply/:id").get(isAunthenticate, applyJob);
router.route("/appliedJob").get(isAunthenticate,getAppliedJob);
router.route("/getApplicants/:id").get(isAunthenticate,getApplicants);
router.route("/updateStatus/:id").post(isAunthenticate,updateStatus);

export default router;
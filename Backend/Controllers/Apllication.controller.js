import { Application } from "../Models/application.model.js";
import { Job } from "../Models/job.model.js";

export const applyJob = async (req,res)=>{
    
    // get the user id & job id
    const userId = req.id;
    const jobId = req.params.id;

    // Check if job id is not available
    if(!jobId){
        return res.status(404).json({
            message : "Job id is required.",
            success : false
        })
    }

    // Check if user already applied for this job
    const existingUser = await Application.findOne({job:jobId,applicant:userId});
    if(existingUser){
        return res.status(400).json({
            message : "You have already applied for this job.",
            success : false
        })
    }

    // Check if the job exist
    const job = await Job.findById(jobId);
    if(!job){
        return res.status(404).json({
            message : "Job not exist.",
            success : false
        })
    }

    // Create application
    const  newApplicant = await Application.create({
        job:jobId,
        applicant:userId
    });

    
    job.application.push(newApplicant._id);
    await job.save();
    return res.status(201).json({
        message : "Applied successfully.",
        // newApplicant,
        success : true
    })

};

// get the all applied jobs

export const getAppliedJob = async (req,res) => {
    try {
        const userId = req.id;
        const applications = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'company',
                options : {sort:{createdAt:1}}
            }
        })

        if(!applications){
            return res.status(404).json({
                message : "Applications not found.",
                success : false
            })
        }
        
        return res.status(200).json({
            applications,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}

// Admin will see that , How many users have applided for the job

export const getApplicants = async (req,res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId)
         .populate({
             path:'application',
             options:{sort:{createdAt:-1}},
             populate:{
                 path:'applicant'
             }
         });
        if(!job){
            return res.status(404).json({
                message:'Job not found.',
                success:false
            })
        };
        return res.status(200).json({
            job, 
            succees:true
        });
    } catch (error) {
        console.log(error);
    }
}


// Update the Application status
export const updateStatus = async (req,res) => {
    try {
        const {status} = req.body;
        const applicationId = req.params.id;

        if(!status){
            return res.status(400).json({
                message : "Status not found",
                success : true
            })
        }

        // find the applications
        const applications = await Application.findOne({_id:applicationId});

        if(!applications){
            return res.status(404).json({
                message : "Applicant not found",
                success : false
            })
        }

        applications.status = status.toLowerCase();
        await applications.save();

        return res.status(200).json({
            message : "Status updated successfully",
            success : true
        })
        
    } catch (error) {
        console.log(error)
    }
}
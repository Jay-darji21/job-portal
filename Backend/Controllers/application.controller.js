import { Application } from "../models/application.model.js";
import { Job } from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        
        console.log("Applying for job:", jobId, "by user:", userId);
        
        if (!jobId) {
            return res.status(400).json({
                message: "Job id is required.",
                success: false
            });
        }
        
        // check if the user has already applied for the job
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId });

        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // check if the job exists
        const job = await Job.findById(jobId);
        if (!job) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }
        
        // create a new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId,
        });

        job.applications.push(newApplication._id);
        await job.save();
        
        console.log("Job application successful:", newApplication._id);
        
        return res.status(201).json({
            message: "Job applied successfully.",
            application: newApplication,
            success: true
        });
    } catch (error) {
        console.error("Error applying for job:", error);
        return res.status(500).json({
            message: "Failed to apply for job. Please try again.",
            success: false
        });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id;
        
        console.log("Fetching applied jobs for user:", userId);
        
        const applications = await Application.find({ applicant: userId })
            .sort({ createdAt: -1 })
            .populate({
                path: 'job',
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: 'company',
                    options: { sort: { createdAt: -1 } },
                }
            });
        
        console.log("Found applications:", applications.length);
        
        return res.status(200).json({
            applications,
            success: true
        });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        return res.status(500).json({
            message: "Failed to fetch applied jobs. Please try again.",
            success: false,
            applications: []
        });
    }
}

// admin dekhega kitna user ne apply kiya hai
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        
        console.log("Fetching applicants for job:", jobId);
        
        const job = await Job.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: {
                path: 'applicant'
            }
        });
        
        if (!job) {
            return res.status(404).json({
                message: 'Job not found.',
                success: false
            });
        }
        
        console.log("Found applicants:", job.applications.length);
        
        return res.status(200).json({
            job, 
            success: true
        });
    } catch (error) {
        console.error("Error fetching applicants:", error);
        return res.status(500).json({
            message: "Failed to fetch applicants. Please try again.",
            success: false
        });
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;
        
        console.log("Updating application status:", applicationId, "to", status);
        
        if (!status) {
            return res.status(400).json({
                message: 'Status is required',
                success: false
            });
        }

        // find the application by application id
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(404).json({
                message: "Application not found.",
                success: false
            });
        }

        // update the status
        application.status = status.toLowerCase();
        await application.save();
        
        console.log("Status updated successfully");

        return res.status(200).json({
            message: "Status updated successfully.",
            application,
            success: true
        });
    } catch (error) {
        console.error("Error updating application status:", error);
        return res.status(500).json({
            message: "Failed to update application status. Please try again.",
            success: false
        });
    }
}
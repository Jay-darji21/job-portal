import { Job } from "../Models/job.model.js";

// Post the job
export const postJob = async (req,res) => {
    try {
        const {title, description, requirements, salary, location, jobType,experienceLevel, position, companyId} = req.body;
        const userId = req.id;
        if(!title || !description || !requirements || !salary || !location || !jobType || !position || !companyId || !experienceLevel){
            return res.status(400).json({
                message : "Something is missing",
                success : false
            })
        }

        const job = await Job.create({
            title,
            description,
            requirements:requirements.split(","),
            salary:Number(salary),
            location,
            experienceLevel : experienceLevel,
            jobType,
            position,
            company : companyId,
            created_by : userId
        })

        return res.status(201).json({
            message : "Job created successfully.",
            job
        })
    } catch (error) {
        console.log(error);
    }
}

// Get the all jobs for student

export const getJob = async (req,res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or:[
                {title : {$regex : keyword, $options:"i"}},
                {description : {$regex : keyword, $options:"i"}}
            ]
        }

        const job = await Job.find(query).populate({
            path:"company"
        }).populate({
            path:"created_by"
        });
        if(!job){
            return res.status(404).json({
                message : "Job not found",
                success : false
            })
        }

        return res.status(200).json({
            job,
            success : true
        })
    } catch (error) {
        console.log(error);
    }
}

// Get job by id for student

export const jobById = async (req,res) => {
    try {
        // User Id is Job Id
        const userId = req.params.id;
        const job = await Job.findById(userId).populate({
            path:"application"
        });

        if(!job){
            return res.status(404).json({
                message : "Job not found with this id",
                success : false
            });
        }

        return res.status(201).json({job,success:true});
    } catch (error) {
        console.log(error);
    }
}

// Get the jobs posted by the loggedin admin

export const getAdminJob = async (req,res) => {
    try {
        const adminId = req.id;
        const jobs = await Job.find({created_by:adminId}).populate({
            path:'company',
            createdAt:-1
        });
        if(!jobs){
            return res.status(404).json({
                message : "Job not found.",
                success : false
            })
        }
        return res.status(201).json({
            jobs,
            success:true
        })
    } catch (error) {
        console.log(error);
    }
}
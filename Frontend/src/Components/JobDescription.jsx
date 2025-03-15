import React, { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useParams } from "react-router-dom";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/Utils/constants";
import axios from "axios";
import { setSingleJob } from "@/redux/jobSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Navbar from "./Shared/Navbar";

function JobDescription() {
    const { singleJob } = useSelector(store => store.job);
    const { user } = useSelector(store => store.auth);
    const params = useParams();
    const jobId = params.id;
    const dispatch = useDispatch();

    console.log("Single job data:", singleJob);

    const isInitiallyApplied = singleJob?.application?.some(application => 
        application?.applicant === user?._id
    ) || false;
    
    const [isApplied, setIsApplied] = useState(isInitiallyApplied);

    const applyJobHandler = async () => {
      try {
        const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
            withCredentials: true
        });
        
        if (res.data.success) {
          setIsApplied(true);
          // Make sure application array exists before spreading
          const currentApplications = singleJob?.application || [];
          const updatedSingleJob = {
            ...singleJob,
            application: [...currentApplications, { applicant: user?._id }]
          };
          dispatch(setSingleJob(updatedSingleJob));
          toast.success(res.data.message);
        }
      } catch (error) {
        console.error("Error applying for job:", error);
        toast.error(error.response?.data?.message || "Failed to apply for job");
      }
    }

    useEffect(() => {
      const fetchSingleJob = async () => {
        try {
          console.log("Fetching job details for ID:", jobId);
          const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
              withCredentials: true,
          });
        
          if (res.data.success) {
            console.log("Job details fetched:", res.data.job);
            dispatch(setSingleJob(res.data.job));
            
            // Check if application array exists before using some()
            if (res.data.job?.application && Array.isArray(res.data.job.application)) {
              setIsApplied(res.data.job.application.some(
                application => application?.applicant === user?._id
              ));
            }
          }
        } catch (error) {
          console.error("Error fetching job details:", error);
          toast.error("Failed to load job details");
        }
      };
      
      fetchSingleJob();
    }, [jobId, dispatch, user?._id]);
    
    if (!singleJob) {
      return (
        <div>
          <Navbar />
          <div className="max-w-7xl mx-auto my-10 text-center">
            <p>Loading job details...</p>
          </div>
        </div>
      );
    }
    
    return (
      <div>
        <Navbar />
        <div className="max-w-7xl mx-auto my-10">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-bold text-xl">{singleJob?.title || "Job Title"}</h1>
              <div className="flex items-center gap-2 mt-4">
                <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
                  {singleJob?.position || 0} Positions
                </Badge>
                <Badge className={"text-[#F83009] font-bold"} variant={"ghost"}>
                  {singleJob?.jobType || "N/A"}
                </Badge>
                <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
                  {singleJob?.salary || 0} LPA
                </Badge>
              </div>
            </div>
            <Button 
              onClick={isApplied ? null : applyJobHandler} 
              disabled={isApplied || !user} 
              className={`rounded-lg ${isApplied ? 'bg-gray-600 cursor-not-allowed' : 'bg-[#7209b7] hover:bg-[#5f32ad]'}`}
            >
              {!user ? "Login to Apply" : isApplied ? "Already Applied" : "Apply Now"}
            </Button>
          </div>

          <h1 className="font-medium border-b-2 border-gray-300 py-4">Job description</h1>
          <div>
            <h1 className="font-bold my-1">Role : <span className="pl-4 font-normal text-gray-800">{singleJob?.title || "N/A"}</span></h1>
            <h1 className="font-bold my-1">Location : <span className="pl-4 font-normal text-gray-800">{singleJob?.location || "N/A"}</span></h1>
            <h1 className="font-bold my-1">Description : <span className="pl-4 font-normal text-gray-800">{singleJob?.description || "N/A"}</span></h1>
            <h1 className="font-bold my-1">Experience : <span className="pl-4 font-normal text-gray-800">{singleJob?.experienceLevel || 0} years</span></h1>
            <h1 className="font-bold my-1">Salary : <span className="pl-4 font-normal text-gray-800">{singleJob?.salary || 0} LPA</span></h1>
            <h1 className="font-bold my-1">Total Applicants : <span className="pl-4 font-normal text-gray-800">{singleJob?.application?.length || 0}</span></h1>
            <h1 className="font-bold my-1">Posted Date : <span className="pl-4 font-normal text-gray-800">{singleJob?.createdAt?.split("T")[0] || "N/A"}</span></h1>
          </div>
        </div>
      </div>
    );
}

export default JobDescription;

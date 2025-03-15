import { JOB_API_END_POINT } from "@/Utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAdminJob } from "@/redux/jobSlice";

const useGetAllAdminJobs = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        console.log("Fetching admin jobs...");
        const res = await axios.get(`${JOB_API_END_POINT}/getadminjobs`, {
          withCredentials: true,
        });
      
        if (res.data.success) {
          console.log("Admin jobs fetched successfully:", res.data.jobs);
          dispatch(setAdminJob(res.data.jobs || []));
        } else {
          console.log("No success in response:", res.data);
          dispatch(setAdminJob([]));
        }
      } catch (error) {
        console.error("Error fetching admin jobs:", error);
        dispatch(setAdminJob([]));
      }
    };
    
    fetchAllAdminJobs();
  }, [dispatch]);
};

export default useGetAllAdminJobs;


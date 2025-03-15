import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/Utils/constants";
import { setAllAppliedJobs } from "@/redux/jobSlice";

const useGetAppliedJobs = () => {
  const dispatch = useDispatch();
  
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        console.log("Fetching applied jobs...");
        const res = await axios.get(`${APPLICATION_API_END_POINT}/get`, {
          withCredentials: true,
        });

        if (res.data.success) {
          // Check if the response has applications property (new API) or application property (old API)
          const applications = res.data.applications || res.data.application || [];
          console.log("Fetched applied jobs:", applications);
          dispatch(setAllAppliedJobs(applications));
        } else {
          console.log("No success in response:", res.data);
          dispatch(setAllAppliedJobs([]));
        }
      } catch (error) {
        console.error("Error fetching applied jobs:", error);
        dispatch(setAllAppliedJobs([]));
      }
    };
    
    fetchAppliedJobs();
  }, [dispatch]);
};

export default useGetAppliedJobs;


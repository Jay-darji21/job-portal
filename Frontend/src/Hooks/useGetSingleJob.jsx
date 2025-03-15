import { setAllJobs, setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/Utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";

const useGetSingleJob = (jobId) =>  {
  const dispatch = useDispatch();
  useEffect(() => {
    const useFetchSingleJob = async () => {
      try {
        
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, {
            withCredentials: true,
        });
      

        if (res.data.success) {
          dispatch(setAllJobs(res.data.job));
        }
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
        }
      } catch (error) {
        console.log(error);
      }
    };
    useFetchSingleJob();
  }, [dispatch]);
}

export default useGetSingleJob;


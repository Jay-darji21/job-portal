import { JOB_API_END_POINT } from "@/Utils/constants";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setAdminJob } from "@/redux/jobSlice";

const useGetAllAdminJobs = () =>  {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAllAdminJobs = async () => {
      try {
        
        const res = await axios.get(`${JOB_API_END_POINT}/getAdminJob`, {
            withCredentials: true,
        });
      

        if (res.data.success) {
          dispatch(setAdminJob(res.data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllAdminJobs();
  }, [dispatch]);
}

export default useGetAllAdminJobs;


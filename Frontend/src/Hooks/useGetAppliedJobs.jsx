
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/Utils/constants";
import { setAllAppliedJobs } from "@/redux/jobSlice";




const useGetAppliedJobs = () =>  {
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        console.log("Call fetching jobs")
        const res = await axios.get(`${APPLICATION_API_END_POINT}/appliedJob`, {
            withCredentials: true,
        });
      

        if (res.data.success) {
          dispatch(setAllAppliedJobs(res.data.applications))
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchAppliedJobs();
  }, []);
}

export default useGetAppliedJobs;


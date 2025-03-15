import React, { useEffect, useState } from "react";
import Navbar from "../Shared/Navbar";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import AdminJobsTable from "./AdminJobsTable";
import useGetAllAdminJobs from "@/Hooks/useGetAllAdminJobs";
import { setSearchJobByText } from "@/redux/jobSlice";


function AdminJobs() {
  useGetAllAdminJobs();
  const navigate = useNavigate();
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(setSearchJobByText(input));
  }, [input, dispatch]);
  
  return (
    <div>
      <Navbar />

      <div className="max-w-6xl mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <Input 
            className="w-fit" 
            placeholder="Filter by Name" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button onClick={() => navigate("/admin/job/create")}>Post New Job</Button>
        </div>
        <AdminJobsTable/>
      </div>
    </div>
  );
}

export default AdminJobs;

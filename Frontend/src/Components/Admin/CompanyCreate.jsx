import React, { useState } from "react";
import Navbar from "../Shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/Utils/constants";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";

function CompanyCreate() {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState();
  const dispatch = useDispatch();

  const registerNewCompany = async () => {
    try {
      console.log(companyName);
      console.log("Comapny Name" , {companyName});
      console.log({COMPANY_API_END_POINT});
      const res = await axios.post(`${COMPANY_API_END_POINT}/register`, {companyName}, {
        headers:{
            'Content-Type':'application/json'
        },
        withCredentials:true
    });
      console.log("Check the succes")
      if (res?.data?.success) {
        dispatch(setSingleCompany(res.data.company))
        toast.success(res.data.message);
        const companyId = res?.data?.company?._id;
        navigate(`/admin/company/${companyId}`);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto">
        <div className="my-10">
          <h1 className="font-bold text-2xl">Your comapny name</h1>
          <p className="text-gray-500">
            What would you like to give your company name? You can change it
            later.
          </p>
        </div>
        <Label>Company Name</Label>
        <Input
          type="text"
          className="my-2"
          placeholder="Ex. Google , Microsoft"
          onChange={(e) => setCompanyName(e.target.value)}
        />

        <div className="flex items-center gap-2 my-10">
          <Button
            variant="outline"
            onClick={() => navigate("/admin/companies")}
          >
            Cancel
          </Button>
          <Button onClick={registerNewCompany}>Continue</Button>
        </div>
      </div>
    </div>
  );
}

export default CompanyCreate;

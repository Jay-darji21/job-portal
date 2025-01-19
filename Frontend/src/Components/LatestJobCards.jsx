import React from "react";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function LatestJobCards({ job }) {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/jobs/description/${job?._id}`)} className="rounded-md p-5 shadow-xl bg-white border border-gray-100 cursor-pointer">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">{job?.location}</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-gray-600 text-sm">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className={"text-blue-700 font-bold"} variant={"ghost"}>
          {job?.position} Positions
        </Badge>
        <Badge className={"text-[#F83009] font-bold"} variant={"ghost"}>
          {job?.jobType}
        </Badge>
        <Badge className={"text-[#7209b7] font-bold"} variant={"ghost"}>
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
}

export default LatestJobCards;

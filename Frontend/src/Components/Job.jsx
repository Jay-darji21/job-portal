import { Bookmark } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

function Job({job}) {
  const navigate = useNavigate();
  
  // const jobId = "oncokn";
  const daysAgoFunction = (mongodbTime) => {
    const createdAt = new Date(mongodbTime);
    const currentTime = new Date();
    const timeDifference = currentTime - createdAt;
    return Math.floor(timeDifference/(1000*24*60*60));
  }
  return (
    <div className="p-5 shadow-xl border border-gray-100 bg-white rounder-md">
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{daysAgoFunction(job?.createdAt)==0 ? "Today" : `${daysAgoFunction(job?.createdAt)} days ago`}</p>
        <Button className="rounded-full" size="icon" variant="outline">
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2">
        <Button className="p-6 rounded-full" variant="outline" size="icon">
          <Avatar>
            <AvatarImage src={job?.company?.logo}></AvatarImage>
          </Avatar>
        </Button>

        <div>
          <h1 className="text-xl font-medium ">{job?.company?.name}</h1>
          <p className="text-sm text-gray-500">{job?.location}</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>

      <div className='flex items-center gap-2 mt-4'>
        <Badge className={'text-blue-700 font-bold'} variant={'ghost'}>{job?.position} Positions</Badge>
        <Badge className={'text-[#F83009] font-bold'} variant={'ghost'}>{job?.jobType}</Badge>
        <Badge className={'text-[#7209b7] font-bold'} variant={'ghost'}>{job?.salary} LPA</Badge>
      </div>

      <div className="flex items-center gap-4 mt-3">
        <Button variant='outline' onClick={()=>navigate(`/jobs/description/${job?._id}`)}>Details</Button>
        <Button className='bg-[#7209b7]'>Save for later</Button>
      </div>
    </div>
  );
}

export default Job;

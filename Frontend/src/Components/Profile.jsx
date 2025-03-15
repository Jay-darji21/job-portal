import React, { useState } from "react";
import Navbar from "./Shared/Navbar";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { space } from "postcss/lib/list";
import AppliedJobTable from "./AppliedJobTable";
import UpdateProfileDialog from "./UpdateProfileDialog";
import { useSelector } from "react-redux";
import { applescript } from "globals";
import useGetAppliedJobs from "@/Hooks/useGetAppliedJobs";

function Profile() {
  const isResume = true;
  
  // const skills = ["HTML", "CSS", "JavScript", "ReactJS", "Mongo DB", "Express JS", "Node JS"]
  useGetAppliedJobs();
  const { user } = useSelector((store) => store.auth);
  const [open, openSet] = useState(false);

  console.log("User profile data:", user);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto my-5 bg-white border border-gray-200 rounded-2xl p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={user?.profile?.profilePhoto}
                alt="profile"
              />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p className="text-gray-600">{user?.profile?.bio || "No bio available"}</p>
            </div>
          </div>
          <Button
            onClick={() => openSet(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>

        <div className="my-5">
          <div className="flex items-center gap-4 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-4 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>

        <div className="my-4">
          <h1 className="font-bold text-lg ">Skills</h1>
          <div className="my-3 flex gap-2 items-center text-lg cursor-default">
            {user?.profile?.skills && user?.profile?.skills.length > 0 ? (
              user?.profile?.skills.map((item, index) => (
                <Badge key={index}>{item}</Badge>
              ))
            ) : (
              <span>No skills to display at this moment</span>
            )}
          </div>
        </div>

        <div>
          <h1>Resume</h1>
          {user?.profile?.resume ? (
            <a
              href={user?.profile?.resume}
              target="blank"
              className="text-blue-600 hover:underline cursor-pointer"
            >
              {user?.profile?.resumeOriginalName || "Download Resume"}
            </a>
          ) : (
            <span>No resume available</span>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        {/* Applied Job table */}
        <AppliedJobTable />
      </div>

      <UpdateProfileDialog open={open} setOpen={openSet} />
    </div>
  );
}

export default Profile;

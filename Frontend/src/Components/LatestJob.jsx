import React from "react";
import LatestJobCards from "./LatestJobCards";
import { useSelector } from "react-redux";

// const random = [1, 2, 3, 4, 5, 6, 7, 8];

function LatestJob() {
  const { allJobs=[] } = useSelector(store=>store.job);

  return (
    <div className="max-w-7xl mx-auto myy-20">
      <h1 className="text-4xl font-bold">
        <span className="text-[#6A38C2]">Latest & Top </span>Job openings
      </h1>
      <div className="grid grid-cols-3 gap-4 my-5">
        {!allJobs || allJobs.length === 0 ? (
          <span>No Job available at this moment</span>
        ) : (
          allJobs.slice(0, 6).map((job, index) => (
            <LatestJobCards
              key={job?._id}
              job={job}
              index={index}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default LatestJob;

import React from "react";

const Links = () => {
  return (
    <div className="flex items-center gap-8 ">
      <span className="text-sm font-medium transition-colors hover: text-primary">
        Task
      </span>
      <span className="text-sm font-medium transition-colors hover: text-primary">
        Calender
      </span>
      <span className="text-sm font-medium space-x-4 transition-colors hover: text-primary">
        Sellings
      </span>
    </div>
  );
};

export default Links;

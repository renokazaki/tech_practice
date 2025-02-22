import { Status } from "@/types/tasks";
import React from "react";

type statusProps = {
  status: Status;
};

const StatusIcon = ({ status }: statusProps) => {
  if (status === "pending") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-200" />
        <span>pending</span>
      </div>
    );
  } else if (status === "in progress") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-500" />
        <span>in progress</span>
      </div>
    );
  } else if (status === "done") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-indigo-900" />
        <span>done</span>
      </div>
    );
  }
};

export default StatusIcon;

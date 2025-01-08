import React from "react";
import { TasksStatus } from "./Form/schema";

type props = {
  status: TasksStatus;
};

const StatusIcon = (props: props) => {
  const { status } = props;

  if (status === "pending") {
    return (
      <div className="flex items-center gap-2">
        <span>pending</span>
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
      </div>
    );
  } else if (status === "in progress") {
    return (
      <div className="flex items-center gap-2">
        <span>in progress</span>
        <div className="w-2 h-2 rounded-full bg-blue-500" />
      </div>
    );
  } else if (status === "done") {
    return (
      <div className="flex items-center gap-2">
        <span>done</span>
        <div className="w-2 h-2 rounded-full bg-green-500" />
      </div>
    );
  }
};

export default StatusIcon;

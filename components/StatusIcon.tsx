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
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <span>pending</span>
      </div>
    );
  } else if (status === "in progress") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-blue-300" />
        <span>in progress</span>
      </div>
    );
  } else if (status === "done") {
    return (
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-green-500" />
        <span>done</span>
      </div>
    );
  }
};

export default StatusIcon;

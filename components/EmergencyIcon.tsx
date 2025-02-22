import { Emergency } from "@/types/tasks";
import React from "react";

type EmergencyProps = {
  emergency: Emergency;
};

const EmergencyIcon = ({ emergency }: EmergencyProps) => {
  if (emergency === "low") {
    return (
      <div className="flex items-center gap-2 text-emerald-600">
        <span>low</span>
      </div>
    );
  } else if (emergency === "middle") {
    return (
      <div className="flex items-center gap-2  text-yellow-500">
        <span>middle</span>
      </div>
    );
  } else if (emergency === "high") {
    return (
      <div className="flex items-center gap-2  text-red-700">
        <span>high</span>
      </div>
    );
  }
};

export default EmergencyIcon;

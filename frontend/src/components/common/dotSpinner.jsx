import React from "react";

const DotSpinner = ({ color }) => {
  return (
    <div className="flex justify-center items-center h-full space-x-2">
      <div
        className={`w-2.5 h-2.5 bg-${color} rounded-full animate-bounce [animation-delay:0s]`}
      ></div>
      <div
        className={`w-2.5 h-2.5 bg-${color} rounded-full animate-bounce [animation-delay:200ms]`}
      ></div>
      <div
        className={`w-2.5 h-2.5 bg-${color} rounded-full animate-bounce [animation-delay:400ms]`}
      ></div>
    </div>
  );
};

export default DotSpinner;

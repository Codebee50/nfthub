import React from "react";
import CircleSpinner from "./loaders/CircleSpinner";

const LongLoadableButton = ({
  label,
  onClick = () => {},
  isLoading = false,
  full=true
}) => {
  return (
    <button
      className={`bg-buttonblue btn-primary text-white py-[5.75px] px-[20px] ${full?"w-full":'w-max'} rounded-lg disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center`}
      onClick={onClick}
      disabled={isLoading}
    >
      {isLoading && <CircleSpinner />}
      {!isLoading && label}
    </button>
  );
};

export default LongLoadableButton;

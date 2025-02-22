import React from "react";
import CircleSpinner from "./loaders/CircleSpinner";

const IconButton = ({
  variant,
  label,
  icon: Icon = null,
  className = "",
  isLoading = false,
  onClick=()=>{}
}) => {
  return (
    <button
      className={`border border-buttonblue rounded-full py-[5.75px] px-[20px] flex flex-row items-center btn-primary disabled:opacity-40 disabled:cursor-not-allowed ${
        variant == "border"
          ? "bg-white text-buttonblue"
          : "bg-buttonblue text-white"
      } ${className}`}

      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading ? <CircleSpinner /> : Icon && <Icon />}

      {label}
    </button>
  );
};

export default IconButton;

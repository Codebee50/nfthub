import React from "react";

const IconButton = ({ variant, label, icon: Icon = null, className='' }) => {
  return (
    <button
      className={`border border-buttonblue rounded-full py-[5.75px] px-[20px] flex flex-row items-center btn-primary ${
        variant == "border"
          ? "bg-white text-buttonblue"
          : "bg-buttonblue text-white"
      } ${className}`}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default IconButton;

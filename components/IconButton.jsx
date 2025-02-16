import React from "react";
import { FiArrowDownRight } from "react-icons/fi";

const IconButton = ({variant, label, icon:Icon}) => {
  return (
    <button className={`border border-buttonblue rounded-full py-[5.75px] px-[20px] flex flex-row items-center ${variant=='border'? 'bg-white text-buttonblue': 'bg-buttonblue text-white'}`}>
      <Icon />
      {label}
    </button>
  );
};

export default IconButton;

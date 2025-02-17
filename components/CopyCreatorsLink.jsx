import React from "react";
import { FaRegCopy } from "react-icons/fa";

const CopyCreatorsLink = () => {
  return (
    <div className="flex flex-row items-center border rounded-full p-2 shadow-cus gap-1">
      <p className="text-textmuted text-sm">https://artversehub.com/creator/Kyrian</p>
      <FaRegCopy className="fill-buttonblue cursor-pointer" size={15} />
    </div>
  );
};

export default CopyCreatorsLink;

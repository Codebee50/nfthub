"use client";
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CopyCreatorsLink = ({username}) => {

  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.host}`;
    } else {
      return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
    }
  };

  const handleCopyClicked = async () => {
    const copyValue = `${getBaseUrl()}/creator/${username}`;
    try {
      await navigator.clipboard.writeText(copyValue);
      toast.success("Creators link copied successfully!");
    } catch (err) {
      toast.error("Failed to copy!");
    }
  };

  return (
    <div className="flex flex-row items-center border rounded-full p-2 shadow-cus gap-1">
      <p className="text-textmuted text-sm max-w-[200px] br-429:max-w-[150px] sm:max-w-[250px] truncate">
        {`${getBaseUrl()}/creator/${username}`}
      </p>

      <div onClick={handleCopyClicked}>
        <FaRegCopy className="fill-buttonblue cursor-pointer" size={15} />
      </div>
    </div>
  );
};

export default CopyCreatorsLink;

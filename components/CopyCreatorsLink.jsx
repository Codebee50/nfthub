"use client";
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

const CopyCreatorsLink = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const getBaseUrl = () => {
    if (typeof window !== "undefined") {
      return `${window.location.protocol}//${window.location.host}`;
    } else {
      return process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000";
    }
  };

  return (
    <div className="flex flex-row items-center border rounded-full p-2 shadow-cus gap-1">
      <p className="text-textmuted text-sm">
        {`${getBaseUrl()}/creator/${userInfo?.username}`}
      </p>
      <FaRegCopy className="fill-buttonblue cursor-pointer" size={15} />
    </div>
  );
};

export default CopyCreatorsLink;

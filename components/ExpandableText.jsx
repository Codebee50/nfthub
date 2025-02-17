"use client"

import React from "react";
import { useState } from "react";

const ExpandableText = ({ text, maxLength=100 }) => {

  const [isExpanded, setIsExpanded] = useState(false);

  const toggleReadMore = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="text-gray-800">
      <p>{isExpanded ? text : `${text.substring(0, maxLength)}...`}</p>
      <button
        onClick={toggleReadMore}
        className="font-semibold"
      >
        {isExpanded ? "See less" : "See more"}
      </button>
    </div>
  );
};

export default ExpandableText;

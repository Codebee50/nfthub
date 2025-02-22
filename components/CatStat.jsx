import React from "react";

const CatStat = ({ label, value }) => {
  return (
    <div className="flex flex-col" key={label}>
      <h3 className="font-semibold">{value}</h3>
      <p>{label}</p>
    </div>
  );
};

export default CatStat;

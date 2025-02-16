import React from "react";
import { FiArrowDownRight } from "react-icons/fi";
import { FiArrowUpLeft } from "react-icons/fi";

import IconButton from "./IconButton";

const SummaryTab = ({ label, balance, withdraw = false, deposit = true }) => {
  return (
    <div className="w-full bg-[rgb(248,249,250)] p-4 rounded-lg shadow-md flex flex-col">
      <p>{label}</p>
      <h3 className="text-[30px] font-medium mt-2">{balance}</h3>

      <div className="mt-10 flex flex-row items-center gap-2">
        {deposit && <IconButton label={"deposit"} icon={FiArrowDownRight} />}
        {withdraw && (
          <IconButton variant="border" label="Withdraw" icon={FiArrowUpLeft} />
        )}
      </div>
    </div>
  );
};

export default SummaryTab;

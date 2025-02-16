import React from "react";
import SummaryTab from "@/components/SummaryTab";
import cta from "@/public/cta.png";


import { FiArrowRight } from "react-icons/fi";
const AccountSummary = () => {
  return (
    <div className="w-full">
      <h3 className="text-[30px] font-[600]">Account summary</h3>
      <div className="flex flex-row items-center justify-between gap-2 mt-3">
        <SummaryTab
          label={"Account summary"}
          balance={"0.00 ETH"}
          withdraw={true}
        />

        <SummaryTab
          label={"Sales balance"}
          balance={"0.00 ETH"}
          deposit={false}
          withdraw={true}
        />
      </div>

      <div className="w-full rounded-lg bg-[#161c2d] flex flex-row gap-20 items-center mt-10 p-[1.5rem]">
        <img src={cta.src} alt="cta" className="w-[20%]" />
        <div className="flex flex-col">
          <h4 className="text-white text-[40px] font-semibold">
            Enhance Your <br />
            <span className="text-gradient-primary">
              Collection as You Mint
            </span>
          </h4>
          <div className="text-white hover:text-buttonblue flex flex-row items-center transition-all ease-in-out cursor-pointer gap-[2px] mt-5">
            <p>Mint NFT</p>
            <FiArrowRight size={10} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSummary;

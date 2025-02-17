import React from "react";
import SummaryTab from "@/components/SummaryTab";
import cta from "@/public/cta.png";


import { FiArrowRight } from "react-icons/fi";
import SectionHeaderText from "../SectionHeaderText";
const AccountSummary = () => {
  return (
    <div className="w-full">
      <SectionHeaderText label={"Account Summary"}/>
      <div className="flex flex-row items-center justify-between gap-2 mt-3 max-[980px]:flex-col">
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

      <div className="w-full rounded-lg bg-[#161c2d] flex flex-col br-768:flex-row gap-20 items-center mt-10 p-[1.5rem]">
        <img src={cta.src} alt="cta" className="br-768:w-[20%] w-full" />
        <div className="flex flex-col">
          <h4 className="text-white text-[40px] max-[800px]:text-[35px]  font-semibold">
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

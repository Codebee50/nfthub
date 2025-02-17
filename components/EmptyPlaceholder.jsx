import React from "react";
import officeDesk from "@/public/office-desk.svg";
import IconButton from "./IconButton";
const EmptyPlaceholder = () => {
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-[40%] flex flex-col items-center">
        <img src={officeDesk.src} alt="" className="max-w-full" />

        <h5 className="text-[20px] font-semibold">Empty collection</h5>
        <p className="text-textmuted text-center mt-5">We'll keep your collection here for you to revisit anytime.</p>

        <IconButton label={'Mint NFT'} className="mt-5"/>
      </div>
    </div>
  );
};

export default EmptyPlaceholder;

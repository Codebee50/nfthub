import React from "react";
import SectionHeaderText from "../SectionHeaderText";
import FormInput from "../FormInput";
import SelectInput from "../SelectInput";

const MintNft = () => {
  const categoryOptions = [
    {
      label: "Art",
      value: "art",
    },
    {
      label: "Gaming",
      value: "gaming",
    },
    {
      label: "Membership",
      value: "membership",
    },
    {
      label: "PFPs",
      value: "pfps",
    },
    {
      label: "Photography",
      value: "photography",
    },
    {
      label: "Other",
      value: "other",
    },
  ];
  return (
    <div className="w-full">
      <SectionHeaderText label={"Mint NFT"} />
      <div className="flex flex-col br-768:flex-row gap-10">
        <div className="w-full flex flex-col gap-4">
          <p>Upload your NFT here, Please click "Upload Image" Button.</p>

          <div className="bg-[#f8f9fc] rounded-md text-[#8492a6] p-2 text-center text-sm">
            Supports JPG, PNG and MP4 videos. Max file size : 10MB
          </div>

          <button className="bg-buttonblue btn-primary text-white py-[5.75px] px-[20px] w-full rounded-lg">
            Upload Image
          </button>
        </div>

        <div className="w-full flex flex-col gap-6">
          <FormInput placeholder={"Title:"} label="Art Title" />

          <div className="flex flex-row items-center gap-4 max-lg:flex-wrap  ">
            <SelectInput
              placeholder={"Select category"}
              label="Type:"
              optionList={categoryOptions}
            />
            <FormInput placeholder={"0.004ETH "} label="Rate(ETH)" />
          </div>

          <FormInput
            placeholder={"Description"}
            label="Description"
            type="textarea"
            bottomDescription="Minting fee: 0.2 ETH"
          />
        </div>
      </div>
    </div>
  );
};

export default MintNft;

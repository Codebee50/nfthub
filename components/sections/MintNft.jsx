"use client";

import React, { useEffect, useRef, useState } from "react";
import SectionHeaderText from "../SectionHeaderText";
import FormInput from "../FormInput";
import SelectInput from "../SelectInput";
import LongLoadableButton from "../LongLoadableButton";
import Image from "next/image";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import usePostRequest from "@/hooks/usePost";
import { handleGenericError } from "@/utils/errorHandler";

const MintNft = () => {
  const [filePreview, setFilePreview] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  const postRequest = usePostRequest();

  const [categoryList, setCategoryList] = useState([]);

  const [business, setBusiness] = useState(null);
  const { mutate: getBusiness, isLoading: isGettingBusiness } = useFetchRequest(
    makeApiUrl("/api/v1/business/"),
    (response) => {
      setBusiness(response.data);
    },
    (error) => {
      toast.error("Fatal: error getting business");
    }
  );

  const { mutate: getCategoryList, isLoading: isCategoryLoading } =
    useFetchRequest(
      makeApiUrl("/api/v1/product/category/"),
      (response) => {
        const transformed = response?.data.map((item) => ({
          value: `${item.id}`,
          label: item.name,
        }));
        console.log(transformed);
        setCategoryList(transformed);
      },
      (error) => {
        console.log("error", error);
        toast.error("Failed to fetch category list");
      }
    );

  const { mutate: mintNft, isLoading: isMinting } = postRequest(
    makeApiUrl("/api/v1/product/nft/upload/"),
    (response) => {
      toast.success("NFT uploaded successfully");
      if (formRef.current) formRef.current.reset();
      setFilePreview(null);
      setFile(null);
    },
    (error) => {
      toast.error(handleGenericError(error));
    },
    "multipart/form-data"
  );

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

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChanged = (e) => {
    const selectedFile = e.target.files[0];
    setFilePreview(selectedFile ? URL.createObjectURL(selectedFile) : null);
    setFile(selectedFile);
  };

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload an image");
      return;
    }

    const formData = new FormData(e.target);
    formData.append("image", file);

    if (!parseInt(formData.get("category"))) {
      toast.error("Invalid category");
      return;
    }

    const reqBody = {
      price: parseFloat(formData.get("price")),
      title: formData.get("title"),
      description: formData.get("description"),
      image: file,
      category: parseInt(formData.get("category")),
    };

    mintNft(reqBody);
  };

  useEffect(() => {
    getBusiness();
    getCategoryList();
  }, []);
  return (
    <div className="w-full">
      <SectionHeaderText label={"Mint NFT"} />
      <div className="flex flex-col br-768:flex-row gap-10">
        <div className="w-full flex flex-col gap-4">
          <p>Upload your NFT here, Please click "Upload Image" Button.</p>

          {filePreview ? (
            <div className="w-full rounded-lg overflow-hidden">
              <Image
                src={filePreview}
                width={400}
                height={400}
                alt="uploaded image"
              />
            </div>
          ) : (
            <div className="bg-[#f8f9fc] rounded-md text-[#8492a6] p-2 text-center text-sm">
              Supports JPG, PNG and MP4 videos. Max file size : 10MB
            </div>
          )}

          <button
            className="bg-buttonblue btn-primary text-white py-[5.75px] px-[20px] w-full rounded-lg"
            onClick={handleUploadClick}
          >
            Upload Image
          </button>
        </div>

        <form
          className="w-full flex flex-col gap-3"
          onSubmit={handleFormSubmitted}
          ref={formRef}
        >
          <FormInput placeholder={"Title:"} label="Art Title" name={"title"} />

          <input
            type="file"
            name="file"
            id="fileInput"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChanged}
            accept="image/*"
          />
          <div className="flex flex-row items-center gap-4 max-lg:flex-wrap  ">
            <SelectInput
              placeholder={"Select category"}
              label="Type:"
              optionList={categoryList}
              name={"category"}
            />
            <FormInput
              placeholder={"0.004ETH "}
              label="Rate(ETH)"
              name={"price"}
            />
          </div>

          <FormInput
            placeholder={"Description"}
            label="Description"
            type="textarea"
            bottomDescription={`Minting fee: ${business?.minting_fee} ETH`}
            name={"description"}
          />

          <LongLoadableButton
            label={"Mint NFT"}
            full={false}
            isLoading={isMinting}
          />
        </form>
      </div>
    </div>
  );
};

export default MintNft;

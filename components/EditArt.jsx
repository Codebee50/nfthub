"use client";

import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import HorLine from "./HorLine";
import FormInput from "./FormInput";
import SelectInput from "./SelectInput";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import LongLoadableButton from "./LongLoadableButton";
import usePatchRequest from "@/hooks/usePatch";
import { toast } from "react-toastify";

const EditArt = ({ art, children }) => {
  const isListedOptions = [
    {
      label: "LIST",
      value: "false",
    },
    {
      label: "UNLIST",
      value: "true",
    },
  ];
  const [categoryList, setCategoryList] = useState([]);
  const { mutate: getCategoryList, isLoading: isCategoryLoading } =
    useFetchRequest(
      makeApiUrl("/api/v1/product/category/"),
      (response) => {
        const transformed = response?.data.map((item) => ({
          value: `${item.id}`,
          label: item.name,
        }));
        setCategoryList(transformed);
      },
      (error) => {
        console.log("error", error);
        toast.error("Failed to fetch category list");
      }
    );

  const patchRequest = usePatchRequest();

  const { mutate, isLoading } = patchRequest(
    makeApiUrl(`/api/v1/product/nft/update/${art.id}/`),
    (response) => {
      toast.success("Art updated successfully");
    },
    (error) => {
      toast.error("Error updating art");
    }
  );
  useEffect(() => {
    getCategoryList();
  }, []);

  const handleFormSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    const reqBody = {
      title: formData.get("title"),
      price: formData.get("price"),
      is_listed: formData.get("is_listed") == "true" ? true : false,
      description: formData.get("description"),
    };
    mutate(reqBody);
  };
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="p-0 h-[90vh] overflow-y-scroll">
        <DialogHeader>
          <DialogTitle className="m-4">{art.title}</DialogTitle>
          <HorLine />
        </DialogHeader>
        <form className="p-4 flex flex-col items-center justify-center" onSubmit={handleFormSubmitted}>
          <div className="border border-[#d5d5d5] w-max bg-white rounded-md">
            <img src={art.image} className="w-[130px] m-2" alt="" />
          </div>

          <FormInput
            label="Name"
            initial={art.title}
            required={false}
            name={"title"}
          />
          <FormInput
            label="Price"
            initial={art.price}
            required={false}
            name={"price"}
          />
          <div className="w-full gap-3 flex flex-row items-center">
            <SelectInput
              name={"is_listed"}
              optionList={isListedOptions}
              label="Is listed"
              defaultValue={art.is_listed ? "true" : "false"}
            />
            <SelectInput
              name={"category"}
              optionList={categoryList}
              label="Category"
              defaultValue={`${art.category}`}
            />
          </div>
          <FormInput
            initial={art.status}
            label="Status"
            required={false}
            readOnly={true}
            className="bg-[#c9c9c9]"
          />

          <FormInput
            type="textarea"
            initial={art.description}
            label="Description"
            rows={3}
            required={false}
            name={"description"}
          />
          <HorLine />

          <div className="w-full p-4 flex items-end justify-end">
            <LongLoadableButton label={"Update art"} full={false} isLoading={isLoading}/>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditArt;

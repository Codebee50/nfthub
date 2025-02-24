import React from "react";
import SectionHeaderText from "../SectionHeaderText";
import FormInput from "../FormInput";
import LongLoadableButton from "../LongLoadableButton";
import usePostRequest from "@/hooks/usePost";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
const AdminCategory = () => {
  const postRequest = usePostRequest();
  const { mutate: createCategory, isLoading } = postRequest(
    makeApiUrl("/api/v1/product/category/"),
    (response) => {
      toast.success("Category created successfully");
    },
    (error) => {
      toast.error("Failed to create cateogory");
    }
  );

  const handleFormSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    createCategory(formData);
  };
  return (
    <div className="w-full">
      <SectionHeaderText label={"Manage categories"} />

      <form action="" className="w-full mt-5 flex flex-col gap-3" onSubmit={handleFormSubmitted}>
        <FormInput label="Name" name={"name"} />
        <FormInput label="Description" name={"description"} />
        <LongLoadableButton full={false} label={"Create category"} isLoading={isLoading} />
      </form>
    </div>
  );
};

export default AdminCategory;

import SectionHeaderText from "@/components/SectionHeaderText";
import React, { useEffect, useState } from "react";
import FormInput from "@/components/FormInput";
import LongLoadableButton from "@/components/LongLoadableButton";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import usePatchRequest from "@/hooks/usePatch";

const AdminSettings = () => {
  const patchRequest = usePatchRequest();
  const [businessDetails, setBusinessDetails] = useState({});
  const { mutate: getBusiness, isLoading: isGettingBusiness } = useFetchRequest(
    makeApiUrl("/api/v1/business/"),
    (response) => {
      setBusinessDetails(response.data);
    },
    (error) => {
      toast.error("Failed to get business details");
    }
  );

  const { mutate: updateBusiness, isLoading: isUpdatingBusiness } =
    patchRequest(
      makeApiUrl("/api/v1/business/edit/"),
      (response) => {
        toast.success("Business details updated successfully");
      },
      (error) => {
        toast.error("Failed to update business");
      }
    );

  useEffect(() => {
    getBusiness();
  }, []);

  const handleFormSubmitted = (e) => {
    e.preventDefault();

    const formData = new FormData(e.target);
    console.log(formData.get('email'))
    updateBusiness(formData);
  };
  return (
    <div className="w-full">
      <SectionHeaderText label={"Site Settings"} />

      <form className="mt-4" onSubmit={handleFormSubmitted}>
        <FormInput
          label={"Admin email"}
          required={false}
          placeholder={"Enter admin email"}
          initial={businessDetails?.email || null}
          name={"email"}
        />
        <FormInput
          label="Minting fee"
          required={false}
          placeholder={"Enter minting fee"}
          type="number"
          initial={parseFloat(businessDetails?.minting_fee) || null}
          name={"minting_fee"}
        />
        <FormInput
          label="Deposit address"
          required={false}
          placeholder={"Site deposit address"}
          initial={businessDetails?.deposit_address || null}
          name={"deposit_address"}
        />

        <LongLoadableButton
          full={false}
          label={"Submit"}
          isLoading={isUpdatingBusiness}
        />
      </form>
    </div>
  );
};

export default AdminSettings;

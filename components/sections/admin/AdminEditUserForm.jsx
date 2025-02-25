import React from "react";
import FormInput from "@/components/FormInput";
import LongLoadableButton from "@/components/LongLoadableButton";
import usePatchRequest from "@/hooks/usePatch";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";

const AdminEditUserForm = ({ user }) => {
  const patchRequest = usePatchRequest();

  const { mutate: updateWallet, isLoading: isUpdatingWallet } = patchRequest(
    makeApiUrl(`/api/v1/wallet/edit/${user.wallet.id}/`),
    (response) => {
      toast.success("Wallet updated successfully");
    },
    (error) => {
      toast.error("Error updating wallet");
    }
  );

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const updateWalletReqBody = {
      account_balance: formData.get("account_balance"),
      sales_balance: formData.get("sales_balance"),
    };

    updateWallet(updateWalletReqBody);
  };
  return (
    <form
      className="w-full flex flex-col overflow-y-scroll p-4"
      onSubmit={handleFormSubmitted}
    >
      <FormInput
        label="Sales balance"
        name={"sales_balance"}
        required={false}
        type="number"
        initial={user.wallet.sales_balance}
      />
      <FormInput
        label="Account balance"
        name={"account_balance"}
        required={false}
        type="number"
        initial={user.wallet.account_balance}
      />

      <LongLoadableButton label={"Submit"} isLoading={isUpdatingWallet} />
    </form>
  );
};

export default AdminEditUserForm;

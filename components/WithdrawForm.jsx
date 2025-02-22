import React from "react";
import FormInput from "./FormInput";
import LeftRightKeyValue from "./LeftRightKeyValue";
import HorLine from "./HorLine";
import LongLoadableButton from "./LongLoadableButton";
import usePostRequest from "@/hooks/usePost";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import { handleGenericError } from "@/utils/errorHandler";

const WithdrawForm = ({tab}) => {
  const postRequest = usePostRequest();
  const { isLoading, mutate: submitWithdrawalForm } = postRequest(
    makeApiUrl("/api/v1/wallet/withdraw/"),
    (response) => {
      toast.success(
        "Withdrawal successful!, you will be notified when the admin releases your funds"
      );
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqBody = {
      amount: formData.get("amount"),
      wallet_address: formData.get("wallet_address"),
      source: tab
    };
    submitWithdrawalForm(reqBody);
  };

  return (
    <form
      className="w-full flex flex-col overflow-y-scroll p-4"
      onSubmit={handleFormSubmitted}
    >
      <FormInput
        label="Network"
        name={"network"}
        required={false}
        initial={"Ethereum (ERC20)"}
        readOnly={true}
      />
      <FormInput
        label="Wallet address"
        name={"wallet_address"}
        required={true}
        placeholder={"Enter/Paste your wallet address"}
      />

      <FormInput
        label="Amount (ETH)"
        name={"amount"}
        required={true}
        placeholder={"Enter amount"}
        type="number"
      />

      <div className="mt-5 w-full">
        <HorLine />

        <div>
          <LongLoadableButton label={"Withdraw"} isLoading={isLoading} />
        </div>
      </div>
    </form>
  );
};

export default WithdrawForm;

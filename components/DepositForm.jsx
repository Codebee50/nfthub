import React, { useEffect, useState } from "react";
import FormInput from "./FormInput";
import LeftRightKeyValue from "./LeftRightKeyValue";
import HorLine from "./HorLine";
import LongLoadableButton from "./LongLoadableButton";
import usePostRequest from "@/hooks/usePost";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import { handleGenericError } from "@/utils/errorHandler";
import useFetchRequest from "@/hooks/useFetch";

const DepositForm = () => {
  const postRequest = usePostRequest();
  const { isLoading, mutate: submitDepositForm } = postRequest(
    makeApiUrl("/api/v1/wallet/deposit/"),
    (response) => {
      toast.success(
        "Deposit successful!, you will be notified when the admin confirms the deposit"
      );
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );

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

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const reqBody = {
      amount: formData.get("amount"),
      transaction_hash: formData.get("transaction_hash"),
    };
    submitDepositForm(reqBody);
  };

  useEffect(() => {
    getBusiness();
  }, []);

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
        name={"wallet-address"}
        required={false}
        initial={business?.deposit_address}
        readOnly={true}
        copyEnabled={true}
      />
      <FormInput
        label="Transaction hash"
        name={"transaction_hash"}
        required={true}
        placeholder={"0xB3F****370eb42"}
      />
      <FormInput
        label="Amount"
        name={"amount"}
        required={true}
        placeholder={"0.3"}
        type="number"
      />

      <div className="w-full flex flex-col gap-4">
        <LeftRightKeyValue
          left={"Expected arrival:"}
          right={"12 network confirmations"}
        />
        <LeftRightKeyValue left={"Minimum deposit:"} right={"0.00000001 ETH"} />
        <LeftRightKeyValue
          left={"Expected unlock:"}
          right={"12 network confirmations"}
        />

        <div className="">
          <h2 className="text-lg font-semibold text-gray-900">Notes:</h2>
          <ul className="list-disc list-inside text-gray-700 mt-2">
            <li>
              <span className="font-medium">Send only ETH</span> to this deposit
              address.
            </li>
            <li>
              Ensure the network is{" "}
              <span className="font-medium">Ethereum (ERC20)</span>.
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-5 w-full">
        <HorLine />

        <div>
          <LongLoadableButton
            label={"I have completed the deposit"}
            isLoading={isLoading}
          />
        </div>
      </div>
    </form>
  );
};

export default DepositForm;

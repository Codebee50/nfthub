import { makeApiUrl } from "@/contants/beRoute";
import usePostRequest from "@/hooks/usePost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CircleSpinner from "./loaders/CircleSpinner";
import { handleGenericError } from "@/utils/errorHandler";

const VerifyToggler = ({
  isVerifiedInitial = false,
  verifyUrl = "",
  declineUrl = "",
}) => {
  const [isVerified, setIsVerified] = useState(isVerifiedInitial);

  const postRequest = usePostRequest();

  const { mutate, isLoading } = postRequest(
    makeApiUrl(verifyUrl),
    (response) => {
      setIsVerified(true);
      toast.success("Verified successfully");
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );

  const { mutate: decline, isLoading: isDeclining } = postRequest(
    makeApiUrl(declineUrl),
    (response) => {
      setIsVerified(false);
      toast.success("Declined successfully");
    },
    (error) => {
      toast.error("Failed to decline");
    }
  );

  const handleVerifyClicked = () => {
    mutate();
  };

  const handleDeclineClicked = () => {
    decline();
  };

  if (isDeclining || isLoading) {
    return <CircleSpinner />;
  }

  return (
    <div>
      {isVerified ? (
        <p
          className="text-buttonblue cursor-pointer font-medium"
          onClick={handleDeclineClicked}
        >
          Decline
        </p>
      ) : (
        <button
          onClick={handleVerifyClicked}
          className="bg-buttonblue text-white px-2 py-1 rounded-sm text-sm cursor-pointer"
        >
          Verify
        </button>
      )}
    </div>
  );
};

export default VerifyToggler;

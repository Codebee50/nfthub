import { makeApiUrl } from "@/contants/beRoute";
import usePostRequest from "@/hooks/usePost";
import React, { useState } from "react";
import { toast } from "react-toastify";
import CircleSpinner from "./loaders/CircleSpinner";
import { handleGenericError } from "@/utils/errorHandler";
import { Checkbox } from "@/components/ui/checkbox"


const CheckRequestToggler = ({
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

  const handleCheckedChanged = (isChecked) => {
    if (isChecked) {
      mutate();
    } else {
      decline();
    }
  };

  if (isDeclining || isLoading) {
    return <CircleSpinner />;
  }

  return <Checkbox checked={isVerified} onCheckedChange={handleCheckedChanged} />;
};

export default CheckRequestToggler;

/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const usePostRequest = () => {
  return (url, onSuccess, onError, contentType="application/json") => {
    const mutation = useMutation({
      mutationFn: async (data, authorize = true) => {
        const accessToken = Cookies.get('userToken');

        const headers = {
          "Content-Type": contentType,
        };

        if (accessToken && authorize) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        return await axios.post(url, data, { headers });
      },
      onSuccess,
      onError,
    });

    const { mutate, isPending:isLoading, isSuccess, isError } = mutation;
    return {
      mutate,
      isLoading,
      isSuccess,
      isError,
    };
  };
};

export default usePostRequest;

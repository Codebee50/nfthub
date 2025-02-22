"use client";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setCredentials } from "@/features/auth/authSlice";

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const { data, error, isFetching } = useGetUserDetailsQuery("userDetails", {
    //perform refetch every 15 minutes
    pollingInterval: 900000,
  });

  console.log('the data', data)
  useEffect(() => {
    if (data) dispatch(setCredentials(data?.email ? data : null));


    if (error && error?.status === 401) {
      dispatch(setCredentials(null));
    }

  }, [data, dispatch, error]);

  return <header></header>;
};

export default Header;

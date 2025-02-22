"use client";

import React, { useEffect } from "react";
import FormInput from "@/components/FormInput";
import FloatingInput from "@/components/FloatingInput";
import { useRouter } from "next/navigation";
import usePostRequest from "@/hooks/usePost";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import { handleGenericError } from "@/utils/errorHandler";
import LongLoadableButton from "@/components/LongLoadableButton";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "next/navigation";
import { userLogin } from "@/features/auth/authActions";
const Page = () => {
  const router = useRouter();

  const postRequest = usePostRequest();
  const searchParams = useSearchParams();

  const { loading, userInfo, error, success, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const routeToHome = () => {
    router.push("/");
  };

  const getRoute = () => {
    const nextPage = searchParams.get("next");
    return nextPage ? nextPage : "/";
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (success) {
      toast.success("Login successful");
      router.push(getRoute());
    }
  }, [error, success]);

  useEffect(() => {
    console.log(userInfo);
    if (isAuthenticated && userInfo?.email) {
      router.push(getRoute());
    }
  }, [userInfo?.email]);

  const { mutate: submitLogin, isLoading } = postRequest(
    makeApiUrl("/api/v1/auth/login/"),
    (response) => {
      toast.success("Login successful");
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );
  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");
    dispatch(userLogin({ email, password }));
  };
  return (
    <section className="relative w-full h-[100vh]">
      <div className="bg-video-wrapper">
        <iframe src="https://player.vimeo.com/video/502163294?background=1&autoplay=1&loop=1&byline=0&title=0"></iframe>
      </div>
      <div className="bg-overlay bg-linear-gradient-2 flex flex-row items-center justify-center w-full">
        <form
          className="container-fluid bg-white w-full max-w-[350px] rounded-lg overflow-hidden flex flex-col items-center justify-center px-4 py-10"
          onSubmit={handleFormSubmitted}
        >
          <h3 className="font-semibold text-xl">Login</h3>

          <div className="w-full flex flex-col mt-5 gap-5">
            <FloatingInput text="Email Address:" type="email" name="email" />
            <FloatingInput text="Password" type="password" name="password" />
          </div>

          <div className="mt-3 w-full">
            <LongLoadableButton isLoading={isLoading} label={"Sign in"} />
          </div>

          <p className="text-textmuted mt-5 text-[0.85rem]">
            Don't have an account?{" "}
            <a href="/auth/register" className="text-textdark font-semibold">
              Sign up
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Page;

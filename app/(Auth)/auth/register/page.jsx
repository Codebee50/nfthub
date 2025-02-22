"use client";

import React from "react";
import FormInput from "@/components/FormInput";
import FloatingInput from "@/components/FloatingInput";
import { useRouter } from "next/navigation";
import usePostRequest from "@/hooks/usePost";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import { handleGenericError } from "@/utils/errorHandler";
import LongLoadableButton from "@/components/LongLoadableButton";

const page = () => {
  const postRequest = usePostRequest();
  const router = useRouter()

  const { mutate: submitSignupForm, isLoading } = postRequest(
    makeApiUrl("/api/v1/auth/register/"),
    (response) => {
      toast.success("Account created successfully. Please login to continue.");
      router.push("/auth/login");
      console.log(response);
    },
    (error) => {
      console.log(error);
      toast.error(handleGenericError(error));
    }
  );

  const handleFormSubmitted = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    submitSignupForm(formData);
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
          <h3 className="font-semibold text-xl">Register your account</h3>

          <div className="w-full flex flex-col mt-5 gap-5">
            <FloatingInput text="Username:" type="text" name="username" />
            <FloatingInput text="Email Address:" type="email" name="email" />
            <FloatingInput text="Password:" type="password" name="password" />
          </div>

          <div className="mt-3 w-full">
            <LongLoadableButton
              label={"Register"}
              isLoading={isLoading}
            />
          </div>

          <p className="text-textmuted mt-5 text-[0.85rem]">
            Already have an account?{" "}
            <a href="/auth/login" className="text-textdark font-semibold">
              login
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default page;

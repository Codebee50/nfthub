import React from "react";
import FormInput from "@/components/FormInput";
import FloatingInput from "@/components/FloatingInput";

const Page = () => {
  return (
    <section className="relative w-full h-[100vh]">
      <div className="bg-video-wrapper">
        <iframe src="https://player.vimeo.com/video/502163294?background=1&autoplay=1&loop=1&byline=0&title=0"></iframe>
      </div>
      <div className="bg-overlay bg-linear-gradient-2 flex flex-row items-center justify-center w-full">
        <form className="container-fluid bg-white w-full max-w-[350px] rounded-lg overflow-hidden flex flex-col items-center justify-center px-4 py-10">
          <h3 className="font-semibold text-xl">Login</h3>

          <div className="w-full flex flex-col mt-5 gap-5">
            <FloatingInput text="Email Address:" type="email" />
            <FloatingInput text="Password" type="password" />
          </div>

          <button className="bg-buttonblue btn-primary text-white py-[5.75px] px-[20px] w-full rounded-lg mt-9">
            Sign in
          </button>

          <p className="text-textmuted mt-5 text-[0.85rem]">Don't have an account? <a href="/auth/register" className="text-textdark font-semibold">Sign up</a></p>
        </form>
      </div>
    </section>
  );
};

export default Page;

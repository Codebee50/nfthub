"use client";
import React, { useEffect, useState } from "react";
import logo from "@/public/logo.png";
import Image from "next/image";
import hockeyanimal from "@/public/hockeyanimal.jpg";
import { IoSearchOutline } from "react-icons/io5";
import { CiBrightnessUp } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import NavPopOverItem from "./NavPopOverItem";
import { popoverItemList } from "@/contants/constants";
import { useSelector } from "react-redux";
import { IoLogInOutline } from "react-icons/io5";
import ImgDef from "./ImgDef";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import usePostRequest from "@/hooks/usePost";
import { handleGenericError } from "@/utils/errorHandler";
import { toast } from "react-toastify";
import Cookies from "js-cookie";
import CircleSpinner from "./loaders/CircleSpinner";
import { logout } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const TopNav = ({ transparent = false, variant = "dark" }) => {
  const { isAuthenticated, userInfo } = useSelector((state) => state.auth);
  const [accountBalance, setAccountBalance] = useState(0);

  const postRequest = usePostRequest();
  const dispatch = useDispatch();
  const router = useRouter()

  const { mutate: getUserBalance, isLoading: isGettingBalance } =
    useFetchRequest(
      makeApiUrl("/api/v1/wallet/balance/"),
      (response) => {
        console.log(response);
        setAccountBalance(response.data.data.account_balance);
      },
      (error) => {}
    );

  const { mutate: logoutUser, isLoading: isLoggingOut } = postRequest(
    makeApiUrl("/api/v1/auth/logout/"),
    (response) => {
      toast.success("Logout successful");
      dispatch(logout());
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );

  useEffect(() => {
    if (isAuthenticated) {
      getUserBalance();
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    const reqBody = {
      refresh_token: Cookies.get("refreshToken"),
    };

    logoutUser(reqBody);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const search = formData.get('search')
    router.push(`/explore/marketplace/?search=${search}`)
  };
  return (
    <nav
      className={`flex flex-row items-center justify-center w-[100vw] top-0 sticky ${
        transparent ? "bg-transparent" : "bg-white"
      } z-20`}
    >
      <div className="padded-section py-4 flex flex-row items-center justify-between">
        <a className="flex flex-row items-center gap-3" href="/">
          <img
            src={logo.src}
            alt="Artverse Marketplace"
            className="w-[35px] md:w-[40px]"
          />

          <h1 className="text-3xl font-medium  blue-orange-gradient text-transparent bg-clip-text">
            GenesisGallery
          </h1>
        </a>

        <div className="flex flex-row items-center gap-4">
          <Popover>
            <PopoverTrigger>
              <IoSearchOutline
                size={17}
                className="cursor-pointe"
                color={`${variant !== "dark" ? "#ffffff" : ""}`}
              />
            </PopoverTrigger>
            <PopoverContent className="p-0 w-max overflow-hidden" align="end">
              <form action="" onSubmit={handleSearchSubmit}>
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search..."
                  className="px-2 py-2 outline-none border-none text-sm"
                  required
                />
              </form>
            </PopoverContent>
          </Popover>

          {/* <CiBrightnessUp
            size={18}
            className="cursor-pointer"
            color={`${variant !== "dark" ? "#ffffff" : ""}`}
          /> */}

          {isAuthenticated ? (
            <Popover>
              <PopoverTrigger>
                <ImgDef
                  src={userInfo?.profile_photo}
                  alt="user"
                  className="w-[40px] h-[40px] rounded-full cursor-pointer"
                />
              </PopoverTrigger>
              <PopoverContent
                className="w-[240px] flex flex-col p-0 rounded-md overflow-hidden shadow-sm"
                align="end"
              >
                <div className="w-full relative bg-white pb-6">
                  <div className="w-full h-[70px] blue-orange-gradient"></div>

                  <ImgDef
                    src={userInfo?.profile_photo}
                    alt="user"
                    className="w-[60px] h-[60px] rounded-full ml-4 absolute bottom-0 shadow-md"
                  />
                </div>

                <div className="flex flex-col p-4">
                  <p className="font-light">
                    Balance:{" "}
                    <span className="text-buttonblue font-bold text-sm">
                      {parseFloat(accountBalance)} ETH
                    </span>
                  </p>

                  <div className="flex flex-col gap-2">
                    {popoverItemList.map((item, index) => {
                      return (
                        <NavPopOverItem
                          {...item}
                          key={`popoveritem-${index}`}
                        />
                      );
                    })}
                  </div>
                </div>

                <div className="w-full h-[0.3px] bg-[#EBECEC]"></div>

                <div className="px-4 py-3">
                  {isLoggingOut ? (
                    <CircleSpinner />
                  ) : (
                    <div onClick={handleLogout}>
                      <NavPopOverItem label="Logout" icon={IoMdLogOut} />
                    </div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
          ) : (
            <a
              href="/auth/login"
              className="bg-buttonblue rounded-full p-2 text-white"
            >
              <IoLogInOutline />
            </a>
          )}
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

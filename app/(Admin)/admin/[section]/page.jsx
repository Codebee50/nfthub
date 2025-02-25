"use client";

import TopNav from "@/components/TopNav";
import React, { useState } from "react";
import { useParams } from "next/navigation";
import AuthProtected from "@/components/AuthProtected";
import { useSelector } from "react-redux";
import Footer from "@/components/Footer";
import NavPopOverItem from "@/components/NavPopOverItem";
import { popoverItemList } from "@/contants/constants";
import ImgDef from "@/components/ImgDef";
import Home from "@/components/sections/admin/Home";
import { LuWallet } from "react-icons/lu";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import { FiUploadCloud, FiUser } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import AdminSettings from "@/components/sections/admin/AdminSettings";
import AdminDeposits from "@/components/sections/admin/AdminDeposits";
import AdminWithdrawal from "@/components/sections/admin/AdminWithdrawal";
import AdminArtUploads from "@/components/sections/admin/AdminArtUploads";
import AdminCategory from "@/components/sections/AdminCategory";
import { MdOutlineCategory } from "react-icons/md";
import AdminUserList from "@/components/sections/AdminUserList";

import { FiUsers } from "react-icons/fi";


const getSection = (currentSection) => {
  if (currentSection == "settings") return <AdminSettings />;

  if (currentSection == "deposits") return <AdminDeposits />;

  if (currentSection == "withdrawals") return <AdminWithdrawal />;

  if (currentSection == "art") return <AdminArtUploads />;

  if (currentSection == "category") return <AdminCategory />;

  if (currentSection == "users") return <AdminUserList />;

  return <AdminSettings />;
};

const adminRightPanelList = [
  {
    icon: FiUsers,
    label: "Users",
    link: "/admin/users",
  },
  {
    icon: LuWallet,
    label: "Deposits",
    link: "/admin/deposits",
  },
  {
    icon: PiHandWithdrawDuotone,
    label: "Withdrawals",
    link: "/admin/withdrawals",
  },
  {
    icon: FiUploadCloud,
    label: "Art uploads",
    link: "/admin/art",
  },
  {
    icon: IoChatbubbleOutline,
    label: "Chat",
    link: "/dashboard/account",
  },
  {
    icon: MdOutlineCategory,
    label: "Category",
    link: "/admin/category",
  },
  {
    icon: IoSettingsOutline,
    label: "Settings",
    link: "/admin/settings",
  },
];

const Page = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const params = useParams();
  const currentSection = params.section || "account";

  return (
    <AuthProtected adminRoute={true}>
      <section className="w-full flex flex-col items-center">
        <TopNav />

        <div className="padded-section mt-7 flex flex-col br-768:flex-row gap-5">
          <div className="br-768:w-[25%] rounded-md overflow-hidden shadow-sm">
            <div>
              <div className="h-24 bg-[#C3B7AF]">
                {userInfo?.cover_image && (
                  <img
                    src={userInfo?.cover_image}
                    alt=""
                    className="w-full h-full object-cover object-center"
                  />
                )}
              </div>

              <div className="relative flex flex-col items-center justify-center -mt-12">
                <ImgDef
                  src={userInfo?.profile_photo} // Replace with actual profile image
                  alt="Profile"
                  className="w-[80px] h-[80px] rounded-full border-4 border-white shadow-md"
                />

                <p className="text-[#B6BDC6] mt-2 text-[0.9rem]">{`@${userInfo?.username}`}</p>
              </div>
            </div>

            <div className="flex flex-col p-4">
              <div className="flex flex-col gap-2">
                {adminRightPanelList.map((item, index) => {
                  return (
                    <NavPopOverItem {...item} key={`popoveritem-${index}`} />
                  );
                })}
              </div>
            </div>
          </div>

          <div className="br-768:w-[75%] rounded-md overflow-hidden shadow-md p-5">
            {getSection(currentSection)}
          </div>
        </div>

        <Footer />
      </section>
    </AuthProtected>
  );
};

export default Page;

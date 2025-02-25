"use client";
import TopNav from "@/components/TopNav";
import React from "react";
import hockeyanimal from "@/public/hockeyanimal.jpg";
import NavPopOverItem from "@/components/NavPopOverItem";
import Footer from "@/components/Footer";
import { useParams } from "next/navigation";
import AccountSummary from "@/components/sections/AccountSummary";
import MintNft from "@/components/sections/MintNft";
import { popoverItemList } from "@/contants/constants";
import Collections from "@/components/sections/Collections";
import { useSelector } from "react-redux";
import Sales from "@/components/sections/Sales";
import AuthProtected from "@/components/AuthProtected";
import Settings from "@/components/sections/Settings";
import ImgDef from "@/components/ImgDef";

import AdminSettings from "@/components/sections/admin/AdminSettings";
import AdminDeposits from "@/components/sections/admin/AdminDeposits";
import AdminWithdrawal from "@/components/sections/admin/AdminWithdrawal";
import AdminArtUploads from "@/components/sections/admin/AdminArtUploads";
import AdminCategory from "@/components/sections/AdminCategory";
import AdminUserList from "@/components/sections/AdminUserList";

import { FiUsers } from "react-icons/fi";
import { LuWallet } from "react-icons/lu";
import { PiHandWithdrawDuotone } from "react-icons/pi";
import { FiUploadCloud, FiUser } from "react-icons/fi";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdOutlineCategory } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";

import { RiAdminLine } from "react-icons/ri";
import { MdOutlineAdminPanelSettings } from "react-icons/md";


const page = () => {
  const params = useParams();
  const currentSection = params.section || "account";

  const { userInfo } = useSelector((state) => state.auth);

  const getSection = (currentSection) => {
    if (currentSection == "account") return <AccountSummary />;

    if (currentSection === "mint") return <MintNft />;

    if (currentSection == "collection") return <Collections />;

    if (currentSection == "sales") return <Sales />;

    if (currentSection == "settings") return <Settings />;

    if (userInfo?.is_admin) {
      if (currentSection == "sitesettings") return <AdminSettings />;

      if (currentSection == "deposits") return <AdminDeposits />;

      if (currentSection == "withdrawals") return <AdminWithdrawal />;

      if (currentSection == "art") return <AdminArtUploads />;

      if (currentSection == "category") return <AdminCategory />;

      if (currentSection == "users") return <AdminUserList />;
    }

    return <AccountSummary />;
  };

  const adminRightPanelList = [
    {
      icon: MdOutlineAdminPanelSettings,
      label: "Admin page",
      link: '/admin/home/'
    }
  ]
  // const adminRightPanelList = [
  //   {
  //     icon: FiUsers,
  //     label: "Users",
  //     link: "/admin/users",
  //   },
  //   {
  //     icon: LuWallet,
  //     label: "Deposits",
  //     link: "/admin/deposits",
  //   },
  //   {
  //     icon: PiHandWithdrawDuotone,
  //     label: "Withdrawals",
  //     link: "/admin/withdrawals",
  //   },
  //   {
  //     icon: FiUploadCloud,
  //     label: "Art uploads",
  //     link: "/admin/art",
  //   },
  //   {
  //     icon: MdOutlineCategory,
  //     label: "Category",
  //     link: "/admin/category",
  //   },
  //   {
  //     icon: IoSettingsOutline,
  //     label: "Settings",
  //     link: "/dashboard/sitesettings",
  //   },
  // ];

  return (
    <AuthProtected>
      <section className="flex flex-col items-center">
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
                {[
                  ...(userInfo?.is_admin ? adminRightPanelList : []),
                  ...popoverItemList,
                ].map((item, index) => {
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

export default page;

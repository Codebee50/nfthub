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

const getSection = (currentSection) => {
  if (currentSection == "account") return <AccountSummary />;

  if (currentSection === "mint") return <MintNft />;

  if (currentSection == "collection") return <Collections />;

  if (currentSection == "sales") return <Sales />;

  if (currentSection == "settings") return <Settings />;

  return <AccountSummary />;
};

const page = () => {
  const params = useParams();
  const currentSection = params.section || "account";

  const { userInfo } = useSelector((state) => state.auth);

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
                {popoverItemList.map((item, index) => {
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

import React from "react";
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
import { LuWallet } from "react-icons/lu";
import { HiOutlineFolderAdd } from "react-icons/hi";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdOutlineShoppingCart } from "react-icons/md";
import { BiShoppingBag } from "react-icons/bi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { AiOutlineSwap } from "react-icons/ai";
import NavPopOverItem from "./NavPopOverItem";


const TopNav = ({transparent=false, variant='dark'}) => {
  const popoverItemList = [
    {
      icon: LuWallet,
      label: "Account summary",
    },
    {
      icon: HiOutlineFolderAdd,
      label: "Mint NFT",
    },
    {
      icon: AiOutlineFolderOpen,
      label: "Collection",
    },
    {
      icon: AiOutlineSwap,
      label: "Transactions",
    },
    {
      icon: MdOutlineShoppingCart,
      label: "Sales",
    },
    {
      icon: BiShoppingBag,
      label: "Market place",
    },
    {
      icon: IoSettingsOutline,
      label: "Settings",
    },
  ];
  return (
    <nav className={`flex flex-row items-center justify-center w-[100vw] top-0 sticky ${transparent? 'bg-transparent': 'bg-white'} z-20`}>
      <div className="padded-section py-4 flex flex-row items-center justify-between">
        <div className="flex flex-row items-center gap-3">
          <img src={logo.src} alt="Artverse Marketplace" className="w-[45px]" />

          <h1 className="text-3xl font-medium  blue-orange-gradient text-transparent bg-clip-text">
            Artverse.
          </h1>
        </div>

        <div className="flex flex-row items-center gap-4">
          <IoSearchOutline size={17} className="cursor-pointe" color={`${variant !== 'dark'? "#ffffff": ''}`} />
          <CiBrightnessUp size={18} className="cursor-pointer" color={`${variant !== 'dark'? "#ffffff": ''}`}/>

          <Popover>
            <PopoverTrigger>
              <img
                src={hockeyanimal.src}
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

                <img
                  src={hockeyanimal.src}
                  alt="user"
                  className="w-[60px] h-[60px] rounded-full ml-4 absolute bottom-0 shadow-md"
                />
              </div>

              <div className="flex flex-col p-4">
                <p className="font-light">
                  Balance:{" "}
                  <span className="text-blue-500 font-bold text-sm">
                    0.000000 ETH
                  </span>
                </p>

                <div className="flex flex-col gap-2">
                  {popoverItemList.map((item, index) => {
                    return (
                      <NavPopOverItem {...item} key={`popoveritem-${index}`} />
                    );
                  })}
                </div>
              </div>

              <div className="w-full h-[0.3px] bg-[#EBECEC]"></div>

              <div className="px-4 py-3">
                <NavPopOverItem label="Logout" icon={IoMdLogOut}/>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;

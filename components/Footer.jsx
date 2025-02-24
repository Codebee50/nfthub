import React from "react";
import logo from "@/public/logo.png";
import { MdKeyboardArrowRight } from "react-icons/md";

const Footer = () => {
  const footerItemList = [
    {
      header: "My Account",
      links: [
        {
          label: "Profile",
          link: "",
        },
        {
          label: "Collection",
          link: "",
        },
        {
          label: "Mint",
          link: "",
        },
      ],
    },

    {
      header: "Categories",
      links: [
        {
          label: "Art",
          link: "",
        },
        {
          label: "Gaming",
          link: "",
        },
        {
          label: "Membership",
          link: "",
        },
        {
          label: "PFPs",
          link: "",
        },
        {
          label: "Photography",
          link: "",
        },
        {
          label: "Other",
          link: "",
        },
      ],
    },
  ];
  return (
    <footer className="w-full bg-footerdark flex flex-col items-center text-footerlight mt-28">
      <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-4 justify-between w-full padded-section py-12 gap-10">
        <div className="flex flex-col w-full">
          <img src={logo.src} alt="Artverse Marketplace" className="w-[45px]" />

          <p className="mt-7 max-w-[600px]">
            Buy, sell and discover exclusive digital assets by the top artists
            of NFTs world.
          </p>
        </div>

        {footerItemList.map((item, index) => {
          return (
            <div className="flex flex-col w-full" key={`footer-item-${index}`}>
              <h3 className="text-white font-[500] text-[20px]">
                {item.header}
              </h3>
              <div className="flex flex-col mt-4 gap-3">
                {item.links.map((itemLink) => (
                  <div
                    key={itemLink.label}
                    className="flex flex-row items-center gap-1"
                  >
                    <MdKeyboardArrowRight />
                    <p>{itemLink.label}</p>
                  </div>
                ))}
              </div>
            </div>
          );
        })}

        <div className="flex flex-col w-full">
          <h3 className="text-white font-[500] text-[20px]">NewsLetter</h3>
          <p className="text-sm mt-4">
            Sign up and receive the latest tips via email.
          </p>

          <div className="flex flex-col mt-5">
            <p className="text-sm">
              Write your email <span className="text-red-700">*</span>
            </p>

            <form action="" className="mt-3 flex flex-col">
              <input
                type="text"
                placeholder="Your email:"
                className="py-[9px] px-[20px] bg-[#27314f] text-sm rounded-md outline-none"
              />
              <input
                type="submit"
                value="Subscribe"
                className="bg-[rgba(16, 102, 231, 0.1)] text-[#1066e7] text-sm mt-2 p-2"
              />
            </form>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-row flex-wrap items-center justify-between padded-section py-7 gap-5">
        <p>© 2018 - 2025 GenesisGallery</p>
        <p>Privacy Terms</p>
      </div>
    </footer>
  );
};

export default Footer;

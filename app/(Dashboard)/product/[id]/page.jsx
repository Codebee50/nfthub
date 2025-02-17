"use client";

import TopNav from "@/components/TopNav";
import { useParams } from "next/navigation";
import React from "react";
import { MdVerified } from "react-icons/md";

import { artList } from "@/contants/arts";
import { formatRate } from "@/contants/constants";
import axios from "axios";
import { useState, useEffect } from "react";
import IconButton from "@/components/IconButton";
import { IoMdCart } from "react-icons/io";
import TrendingMarquee from "@/components/TrendingMarquee";
import Footer from "@/components/Footer";


const Page = () => {
  const { id } = useParams();
  const art = artList.data.docs.find((item) => item._id == id);

  const [ethExchangeRate, setEthExchangeRate] = useState(0);

  const getEthPrice = async () => {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
    );
    console.log(response.status);
    if (response.status == 200) {
      setEthExchangeRate(response?.data?.ethereum?.usd || 0);

      return response?.data?.ethereum?.usd || 0;
    }
    return 0;
  };

  useEffect(() => {
    getEthPrice();
  }, []);

  return (
    <section className="w-full">
      <TopNav />

      <div className="flex items-center justify-center">
        <div className="padded-section w-full flex flex-col 768:flex-row gap-5 mt-5">
          <div className="w-full 768:w-[50%]">
            <img src={art.image} className="w-full rounded-lg overflow-hidden object-cover object-center" alt="" />
          </div>
          <div className="w-full 768:w-[50%]">
            <h1 className="text-gradient-primary font-bold text-[30px]">
              {art.name}
            </h1>

            <div className="flex flex-row items-center">
              <p className="font-semibold text-sm">
                Owned by: <span className="ml-3">{art.user.username}</span>
              </p>
              <MdVerified className="fill-buttonblue" />
            </div>

            <p className="text-textmuted mt-10">{art.description}</p>

            <div className="flex flex-col">
              <p className="font-semibold mt-8">Current bid</p>
              <h4 className="text-[24px] font-semibold">{art.price} ETH</h4>
              <p className="text-textmuted text-sm">{formatRate(ethExchangeRate * art.price)}</p>
            </div>

            <IconButton className="gap-2 mt-5" label={"Buy now"} icon={IoMdCart}/>
          </div>
        </div>
      </div>

      <TrendingMarquee label={`More from ${art.user.username}`} ethRate={ethExchangeRate}/>
      <TrendingMarquee label={`Related items`} ethRate={ethExchangeRate}/>
      <Footer/>
    </section>
  );
};

export default Page;

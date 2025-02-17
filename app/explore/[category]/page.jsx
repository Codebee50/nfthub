"use client";

import BottomNav from "@/components/BottomNav";
import TopNav from "@/components/TopNav";
import React, { useEffect, useState } from "react";
import artColver from "@/public/categories/art-cover.jpg";
import art from "@/public/cat-profile/art.png";
import ExpandableText from "@/components/ExpandableText";
import { artList } from "@/contants/arts";
import ArtItem from "@/components/ArtItem";
import axios from "axios";
import Footer from "@/components/Footer";

const Page = () => {
  const catStats = [
    {
      value: "6274 ETH",
      label: "Total Volume",
    },
    {
      value: "76%",
      label: "Listed",
    },
    {
      value: "634",
      label: "Owners",
    },
    {
      value: "19%",
      label: "Unique Owners",
    },
  ];

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
    <section className="w-full relative">
      <div className="w-full absolute h-[300px] top-0 z-10 bg-gradient-to-b from-black to-transparent">
        <TopNav transparent={true} variant="light" />
        <BottomNav variant="light" />
      </div>

      <div className="w-full h-[300px]">
        <img
          src={artColver.src}
          className="w-full h-full object-cover object-center"
          alt=""
        />
        <div className="w-full flex items-center justify-center -mt-12">
          <div className="w-[90%] relative">
            <div className="w-[120px] h-[120px] border-[5px] border-white bg-light z-10 absolute flex items-center  justify-center rounded-md">
              <img
                src={art.src}
                className="w-[90%] h-[90%] rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col mt-20 xl:mt-40 items-center justify-center">
        <div className="flex flex-col padded-section">
          <h3 className="font-[600] text-4xl">Arts</h3>

          <div className="flex flex-row items-center mt-3 gap-3">
            <div className="flex flex-row items-center">
              <p>
                Items <span className="font-semibold">2116</span>
              </p>
            </div>

            <div className="flex flex-row items-center">
              <p>
                Chain <span className="font-semibold">Ethereum</span>
              </p>
            </div>
          </div>

          <div className="w-full mt-5">
            <ExpandableText
              text={
                "Immerse yourself in the world of digital art with our NFT platform's dedicated art category. Discover and collect one-of-a-kind digital artworks created by talented artists from around the globe. From stunning paintings and sculptures to mesmerizing animations and immersive installations, experience the limitless possibilities of digital creativity.false"
              }
            />
          </div>

          <div className="flex flex-row items-center mt-4 gap-4 flex-wrap">
            {catStats.map((stat) => {
              return (
                <div className="flex flex-col" key={stat.label}>
                  <h3 className="font-semibold">{stat.value}</h3>
                  <p>{stat.label}</p>
                </div>
              );
            })}
          </div>

          <div className="w-full grid grid-cols-2 576:grid-cols-3 768:grid-cols-4 992:grid-cols-5 mt-16 lg:mt-28 gap-5">
            {artList.data.docs.map((art) => (
              <ArtItem key={art._id} {...art} ethRate={ethExchangeRate} />
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Page;

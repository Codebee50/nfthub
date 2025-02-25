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
import { useParams } from "next/navigation";
import useFetchRequest from "@/hooks/useFetch";
import { BASE_BE_URL, makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import PageLoader from "@/components/PageLoader";
import CatStat from "@/components/CatStat";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const [category, setCategory] = useState(null);
  const [nftList, setNftList] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  const catStats = [
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

  const params = useParams();

  let categoryId = params.category || 0;


  const apiUrl = search
    ? `/api/v1/product/nft/category/search/${categoryId}/?search=${search}`
    : `/api/v1/product/nft/category/search/${categoryId}/`;
  const { mutate, isLoading } = useFetchRequest(
    makeApiUrl(apiUrl),
    (response) => {
      setCategory(response?.data?.data?.category);
      setNftList(response?.data?.data?.nfts);
    },
    (error) => {
      console.log(error);
      toast.error("Error fetching products");
    }
  );

  useEffect(() => {
    getEthPrice();
    mutate();
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
          <h3 className="font-[600] text-4xl">{category?.name}</h3>

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
            <ExpandableText text={category?.description || ""} />
          </div>

          <div className="flex flex-row items-center mt-4 gap-4 flex-wrap">
            <CatStat
              label={"Total volume"}
              value={`${nftList.reduce(
                (acc, nft) => acc + parseFloat(nft.price),
                0
              )} ETH`} // Add initial value `0`
            />
            {catStats.map((stat, index) => {
              return (
                <CatStat
                  label={stat.label}
                  value={stat.value}
                  key={`stat-${index}`}
                />
              );
            })}
          </div>

          {isLoading ? (
            <PageLoader />
          ) : (
            <div className="w-full grid grid-cols-2 576:grid-cols-3 768:grid-cols-4 922:grid-cols-5 mt-16 lg:mt-28 gap-5 lg:gap-8 items-start justify-start">
              {nftList.map((art) => (
                <ArtItem
                  key={art.id}
                  name={art.title}
                  _id={art.id}
                  avatar={art.owner.profile_photo}
                  price={art.price}
                  image={`${art.image}`}
                  ethRate={ethExchangeRate}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Page;

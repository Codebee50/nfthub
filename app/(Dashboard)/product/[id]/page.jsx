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
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import usePostRequest from "@/hooks/usePost";
import { handleGenericError } from "@/utils/errorHandler";

const Page = () => {
  const { id } = useParams();
  const [art, setArt] = useState(null);
  const [moreFromUser, setMoreFromUser] = useState([]);
  const [relatedNft, setRelatedNft] = useState([]);

  const postRequest = usePostRequest();

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

  const { mutate: getArt, isLoading } = useFetchRequest(
    makeApiUrl(`/api/v1/product/nft/detail/${id}/`),
    (response) => {
      console.log("response", response);
      setArt(response.data);
    },
    (error) => {
      toast.error("Failed to get NFT");
    }
  );

  const { mutate: getMoreFrom, isLoading: isGettingMoreFrom } = useFetchRequest(
    makeApiUrl(`/api/v1/product/nft/user/${art?.owner?.id}/`),
    (response) => {
      setMoreFromUser(response.data);
    },
    (error) => {}
  );

  const { mutate: getRelated, isLoading: isGettingRelated } = useFetchRequest(
    makeApiUrl(`/api/v1/product/nft/related/${art?.id}/`),
    (response) => {
      setRelatedNft(response.data);
    },
    (error) => {}
  );

  const { mutate: buyNft, isLoading: isBuying } = postRequest(
    makeApiUrl("/api/v1/product/nft/buy/"),
    (response) => {
      toast.success("Congrats!!, You now own this nft");
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );

  const submitBuyRequest = () => {
    buyNft({
      id: id,
    });
  };
  useEffect(() => {
    getEthPrice();
    getArt();
  }, []);

  useEffect(() => {
    if (art?.id) {
      getMoreFrom();
      getRelated();
    }
  }, [art?.id]);

  return (
    <section className="w-full flex flex-col">
      <TopNav />

      <div className="flex items-center justify-center">
        <div className="padded-section w-full flex flex-col 768:flex-row gap-5 mt-5">
          <div className="w-full 768:w-[50%]">
            <img
              src={art?.image}
              className="w-full rounded-lg overflow-hidden object-cover object-center"
              alt=""
            />
          </div>
          <div className="w-full 768:w-[50%]">
            <h1 className="text-gradient-primary font-bold text-[30px]">
              {art?.name}
            </h1>

            <div className="flex flex-row items-center">
              <p className="font-semibold text-sm">
                Owned by: <span className="ml-3">{art?.owner?.username}</span>
              </p>
              {art?.owner?.is_verified && (
                <MdVerified className="fill-buttonblue" />
              )}
            </div>

            <p className="text-textmuted mt-10">{art?.description}</p>

            <div className="flex flex-col">
              <p className="font-semibold mt-8">Current bid</p>
              <h4 className="text-[24px] font-semibold">
                {parseFloat(art?.price)} ETH
              </h4>
              <p className="text-textmuted text-sm">
                {formatRate(ethExchangeRate * art?.price)}
              </p>
            </div>

            <IconButton
              className="gap-2 mt-5 w-max"
              label={"Buy now"}
              icon={IoMdCart}
              isLoading={isBuying}
              onClick={submitBuyRequest}
            />
          </div>
        </div>
      </div>

      <div className="w-full">
        <TrendingMarquee
          label={`More from ${art?.owner?.username}`}
          ethRate={ethExchangeRate}
          objectList={moreFromUser}
        />
      </div>

      <div className="w-full">
        <TrendingMarquee
          label={`Related items`}
          ethRate={ethExchangeRate}
          objectList={relatedNft}
        />
      </div>

      <Footer />
    </section>
  );
};

export default Page;

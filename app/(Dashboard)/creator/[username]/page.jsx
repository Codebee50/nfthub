"use client";

import ImgDef from "@/components/ImgDef";
import PageLoader from "@/components/PageLoader";
import TopNav from "@/components/TopNav";
import { makeApiUrl } from "@/contants/beRoute";
import useFetchRequest from "@/hooks/useFetch";
import { handleGenericError } from "@/utils/errorHandler";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdVerified } from "react-icons/md";
import CopyCreatorsLink from "@/components/CopyCreatorsLink";
import ArtItem from "@/components/ArtItem";
import axios from "axios";
import ExpandableText from "@/components/ExpandableText";

const Page = () => {
  const { username } = useParams();
  const [creator, setCreator] = useState(null);

  const { mutate: getCreator, isLoading } = useFetchRequest(
    makeApiUrl(`/api/v1/product/nft/creator/${username}/`),
    (response) => {
      console.log(response.data.data);
      setCreator(response.data.data);
    },
    (error) => {
      toast.error(handleGenericError(error));
    }
  );

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
    getCreator();
    getEthPrice();
  }, []);

  if (isLoading) {
    return <PageLoader />;
  }

  return (
    <section className="w-full flex flex-col items-center">
      <TopNav />

      <div className="padded-section">
        <div className="w-full flex flex-col items-center">
          <img
            src={creator?.user?.cover_image}
            alt=""
            className="w-full h-[200px] bg-slate-300 object-cover object-center rounded-md"
          />

          <ImgDef
            src={creator?.user?.profile_photo}
            className="w-[110px] h-[110px] rounded-full -mt-6 border-[3px] border-white object-cover object-center"
            alt={creator?.username}
          />
        </div>

        <div className="w-full flex flex-col items-center mt-5 gap-4">
          <div className="flex flex-row items-center gap-2">
            <p className="font-semibold text-xl">{creator?.user?.username}</p>
            <MdVerified className="fill-buttonblue" />
          </div>
          <CopyCreatorsLink username={creator?.user?.username} />
          <ExpandableText text={creator?.user?.bio || ""} />
        </div>

        <div className="w-full grid grid-cols-2 576:grid-cols-3 768:grid-cols-4 mt-16 lg:mt-28 gap-5 lg:gap-8 items-start justify-start">
          {creator?.nfts?.map((art) => (
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
      </div>
    </section>
  );
};

export default Page;

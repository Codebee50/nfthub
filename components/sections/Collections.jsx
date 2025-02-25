"use client";

import React, { useEffect, useState } from "react";
import SectionHeaderText from "../SectionHeaderText";
import CopyCreatorsLink from "../CopyCreatorsLink";
import EmptyPlaceholder from "../EmptyPlaceholder";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import PageLoader from "../PageLoader";
import { nftList } from "@/contants/constants";
import ArtItem from "../ArtItem";

import EditArt from "../EditArt";
import { useSelector } from "react-redux";

const Collections = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const [userNfts, setUserNfts] = useState([]);
  const { mutate: getUserNfts, isLoading } = useFetchRequest(
    makeApiUrl("/api/v1/product/nft/user/list/"),
    (response) => {
      setUserNfts(response.data);
      console.log(response.data);
    },
    (error) => {
      console.log(error);
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
    getUserNfts();
    getEthPrice();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row items-center justify-between max-br-429:flex-wrap">
        <SectionHeaderText label={"Collection"} />

        <CopyCreatorsLink username={userInfo?.username} />
      </div>

      {userNfts.length <= 0 ? (
        <div className="w-full">
          <EmptyPlaceholder />
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 items-start mt-5">
          {userNfts.map((nft) => {
            return (
              <EditArt key={nft.id} art={nft}>
                <ArtItem
                  image={nft.image}
                  name={nft.title}
                  _id={nft.id}
                  price={nft.price}
                  ethRate={ethExchangeRate}
                  avatar={nft.owner.profile_photo}
                  clickEvents={false}
                />
              </EditArt>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Collections;

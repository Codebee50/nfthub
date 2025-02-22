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

const Collections = () => {
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

  useEffect(() => {
    getUserNfts();
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex flex-row items-center justify-between">
        <SectionHeaderText label={"Collection"} />

        <CopyCreatorsLink />
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
                  ethRate={0}
                  avatar={nft.owner .profile_photo}
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

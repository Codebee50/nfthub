"use client";

import React, { useRef } from "react";
import { IoArrowForward } from "react-icons/io5";
import { artList } from "@/contants/arts";
import { useState } from "react";
import ArtItem from "./ArtItem";
import { useEffect } from "react";
import { nftList } from "@/contants/constants";

const TrendingMarquee = ({
  label = "",
  moreLink = "/explore/marketplace",
  ethRate=0,
  objectList = [],
}) => {
  const [offset, setOffset] = useState(0);
  const containerRef = useRef(null);
  const itemWidth = 200; // Adjust item width
  const speed = 2000; // 2 seconds interval
  const totalItems = objectList.length; // Adjust based on content

  useEffect(() => {
    const interval = setInterval(() => {
      setOffset((prev) => {
        const newOffset = prev - itemWidth;
        // Reset when reaching the duplicate set
        return newOffset <= -(totalItems * itemWidth) ? 0 : newOffset;
      });
    }, speed);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="flex flex-col w-full">
      <div className="w-full flex items-center justify-center mt-20">
        <div className="padded-section flex flex-row justify-center w-full">
          <div className="w-full flex flex-row items-center justify-between">
            <h3 className="font-bold text-textdark ">{label}</h3>

            <a
              className="flex flex-row items-center gap-1 text-sm"
              href={moreLink}
            >
              <p>See more</p>
              <IoArrowForward />
            </a>
          </div>
        </div>
      </div>

      <div className="relative w-full overflow-hidden mt-5">
        <div
          ref={containerRef}
          className="flex flex-row transition-transform duration-700 ease-in-out gap-3 w-full"
          style={{ transform: `translateX(${offset}px)` }}
        >
          {objectList.map((nft) => {
            return (
              <div className="min-w-[250px] relative" key={nft.id}>
                <ArtItem
                  image={nft.image}
                  name={nft.title}
                  _id={nft.id}
                  price={nft.price}
                  ethRate={ethRate}
                  avatar={nft.owner.profile_photo}
                />
              </div>
            );
          })}

          {/* {artList.data.docs.map((art, index) => (
            <div className="min-w-[250px] relative" key={art._id}>
              <ArtItem {...art} avatar={art.user.avatar} ethRate={ethRate} />
            </div>
          ))} */}
        </div>
      </div>
    </section>
  );
};

export default TrendingMarquee;

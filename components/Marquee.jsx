import React from "react";
import { nftList } from "@/contants/constants";

const Marquee = () => {
  return (
    <div className="slider overflow-hidden w-full flex justify-start m-auto">
      <div className="slide-track">
        {nftList.data.docs.map((item, index) => (
          <div className="slide mx-2 h-auto w-[360px] box-border" key={item.name}>
            <div className="card overflow-hidden rounded-md mb-3 shadow">
              <div className="relative overflow-hidden w-[250px] md:w-[300px]">
                <img
                  src={item.image}
                  alt=""
                  key={item.name}
                  className="h-[220px] w-full object-cover object-center rounded-md"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

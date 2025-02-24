import React from "react";
import { nftList } from "@/contants/constants";
import Image from "next/image";

const Marquee = ({objectList=[]}) => {
  return (
    <div className="slider overflow-hidden w-full flex justify-start m-auto">
      <div className="slide-track">
        {objectList.map((item, index) => (
          <a
            className="slide mx-2 h-auto min-w-[250px] box-border cursor-pointer"
            key={item.title}
            href={`/product/${item.id}/`}
          >
            <div className="card overflow-hidden rounded-md mb-3 shadow w-full">
              <div className="relative overflow-hidden h-auto w-full">
                {/* <img
                  src={item.image}
                  alt=""
                  key={item.name}
                  className="h-[220px] w-full object-cover object-center rounded-md"
                /> */}

                <Image src={item.image} width={500} height={220} alt={"Image"} className="h-[220px] object-cover object-center" />
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default Marquee;

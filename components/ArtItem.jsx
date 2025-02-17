import React from "react";

const formatRate = (value)=>{
    return value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

const ArtItem = ({ image, name, user, price, ethRate }) => {
  return (
    <div className="w-full rounded-xl overflow-hidden shadow-cus">
      <div className="w-full h-[200px] bg-slate-400 relative">
        <img
          src={image}
          className="w-full h-full object-cover object-center "
          alt=""
        />
      </div>
      <div className="w-full p-3">
        <div className="-mt-[18px] z-20 absolute ">
          <img
            src={user.avatar}
            className="w-[36px] h-[36px] rounded-full border-[3px] border-white "
            alt=""
          />
        </div>

        <div className="mt-5">
          <p className="font-semibold mt-3 text-textdark">{name}</p>
          <div className="flex flex-row items-center mt-2 font-semibold text-sm text-textdark">
            <p className="text-buttonblue font-semibold text-sm">{price}ETH</p>
            <p>(${formatRate(price * ethRate)})</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtItem;

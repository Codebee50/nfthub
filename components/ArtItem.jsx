import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import ImgDef from "./ImgDef";
import VerifyToggler from "./VerifyToggler";

const formatRate = (value) => {
  return value.toLocaleString("en-US", { style: "currency", currency: "USD" });
};

const ArtItem = ({
  image,
  name,
  user,
  avatar,
  price,
  ethRate,
  _id,
  clickEvents = true,
  actions = false,
  isAdminVerified = false,
}) => {
  const router = useRouter();

  const routeToDetail = () => {
    router.push(`/product/${_id}`);
  };
  return (
    <div
      className="flex flex-col w-full rounded-xl overflow-hidden shadow-cus cursor-pointer"
      onClick={clickEvents ? routeToDetail : null}
    >
      <div className="w-full max-h-[200px] overflow-hidden bg-transparent">
        <Image src={image} width={500} height={500} alt={name} />
      </div>
      <div className="w-full p-3">
        <div className="-mt-[18px] z-20 absolute">
          <ImgDef
            src={avatar}
            className="w-[36px] h-[36px] rounded-full border-[3px] border-white "
            alt=""
          />
        </div>

        <div className="mt-5 bg-white w-full">
          <p className="font-semibold mt-3 text-textdark text-start">{name}</p>
          <div className="flex flex-row items-center mt-2 font-semibold text-sm text-textdark">
            <p className="text-buttonblue font-semibold text-sm">
              {parseFloat(price)}ETH
            </p>
            <p>({formatRate(price * ethRate)})</p>
          </div>
        </div>

        {actions && (
          <div className="mt-4">
            <VerifyToggler
              isVerifiedInitial={isAdminVerified}
              declineUrl={`/api/v1/business/nft/decline/${_id}/`}
              verifyUrl={`/api/v1/business/nft/verify/${_id}/`}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ArtItem;

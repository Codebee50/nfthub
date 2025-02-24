import SectionHeaderText from "@/components/SectionHeaderText";
import { makeApiUrl } from "@/contants/beRoute";
import useFetchRequest from "@/hooks/useFetch";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ArtItem from "@/components/ArtItem";

const AdminArtUploads = () => {
  const [nftList, setNftList] = useState([]);
  const { mutate: getNfts, isLoading } = useFetchRequest(
    makeApiUrl("/api/v1/business/nft/all/"),
    (response) => {
      console.log(response);
      setNftList(response.data)
    },
    (error) => {
      toast.error("Failed to get nft list");
    }
  );


  useEffect(()=>{
    getNfts()
  },[])
  return (
    <div className="w-full">
      <SectionHeaderText label={"Art uploads"} />

      <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-5 mt-5">
        {nftList.map((nft) => {
          return (
            <ArtItem
              image={nft.image}
              name={nft.title}
              _id={nft.id}
              price={nft.price}
              ethRate={0}
              avatar={nft.owner.profile_photo}
              clickEvents={false}
              isAdminVerified={nft.is_admin_approved}
              actions={true}
              key={nft.id}
            />
          );
        })}
      </div>
    </div>
  );
};

export default AdminArtUploads;

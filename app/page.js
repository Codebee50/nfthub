"use client";
import BottomNav from "@/components/BottomNav";
import Marquee from "@/components/Marquee";
import TopNav from "@/components/TopNav";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import TrendingMarquee from "@/components/TrendingMarquee";
import axios from "axios";
import useFetchRequest from "@/hooks/useFetch";
import { makeApiUrl } from "@/contants/beRoute";
import { toast } from "react-toastify";
import PageLoader from "@/components/PageLoader";
import UserMessaging from "@/components/UserMessaging";

export default function Home() {
  // dep
  const [ethExchangeRate, setEthExchangeRate] = useState(0);
  const [categoryList, setCategoryList] = useState([]);
  const [nftList, setNftList] = useState([]);

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

  const { mutate: getCategories, isLoading: isFetchingCategories } =
    useFetchRequest(
      makeApiUrl("/api/v1/product/category/"),
      (response) => {
        setCategoryList(response.data);
        console.log(response);
      },
      (error) => {
        toast.error("Failed to fetch categories");
      }
    );

  const { mutate: getNfts, isLoading: isFetchingNfts } = useFetchRequest(
    makeApiUrl("/api/v1/product/nft/"),
    (response) => {
      setNftList(response.data);
    },
    (error) => {
      toast.error("Failed to fetch categories");
    }
  );

  useEffect(() => {
    getCategories();
    getEthPrice();
    getNfts();
  }, []);

  const halfLength = Math.ceil(nftList.length / 2);
  const firstHalf = nftList.length > 0 ? nftList.slice(0, halfLength) : [];
  const secondHalf = nftList.length > 0 ? nftList.slice(halfLength) : [];

  return (
    <section className="w-full flex flex-col">
      {/* <section className="fixed bottom-0 right-0 z-30 cursor-pointer">
        <UserMessaging />
      </section> */}
      <TopNav />
      <BottomNav />
      <div className="col-12">
        <Marquee objectList={firstHalf} />
      </div>
      <div className="col-12">
        <Marquee objectList={secondHalf} />
      </div>

      {isFetchingCategories || isFetchingNfts ? (
        <PageLoader />
      ) : (
        categoryList.map((category) => {
          const objects = nftList.filter(
            (item) => item.category == category.id
          );
          return (
            <TrendingMarquee
              label={`Trending in ${category.name}`}
              ethRate={ethExchangeRate}
              key={`cat-${category.name}`}
              objectList={objects}
            />
          );
        })
      )}
      {/* <TrendingMarquee label="Trending in arts" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Trending in games" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Membership" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Trending in PFPs" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Photography" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Others" ethRate={ethExchangeRate} /> */}
      <Footer />
    </section>
  );
}


"use client"
import BottomNav from "@/components/BottomNav";
import Marquee from "@/components/Marquee";
import TopNav from "@/components/TopNav";
import Image from "next/image";
import Footer from "@/components/Footer";
import { useEffect, useState } from "react";
import TrendingMarquee from "@/components/TrendingMarquee";
import axios from "axios";

export default function Home() {
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
    getEthPrice();
  }, []);
  return (
    <section className="w-full flex flex-col">
      <TopNav />
      <BottomNav />
      <div className="col-12">
        <Marquee />
      </div>
      <div className="col-12">
        <Marquee />
      </div>

      <TrendingMarquee label="Trending in arts" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Trending in games" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Membership" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Trending in PFPs" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Photography" ethRate={ethExchangeRate} />
      <TrendingMarquee label="Others" ethRate={ethExchangeRate} />
      <Footer />
    </section>
  );
}

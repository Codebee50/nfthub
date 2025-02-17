import BottomNav from "@/components/BottomNav";
import Marquee from "@/components/Marquee";
import TopNav from "@/components/TopNav";
import Image from "next/image";
import Footer from "@/components/Footer";
import TrendingMarquee from "@/components/TrendingMarquee";

export default function Home() {
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

      <TrendingMarquee label="Trending in arts" />
      <TrendingMarquee label="Trending in games" />
      <TrendingMarquee label="Membership"/>
      <TrendingMarquee label="Trending in PFPs" />
      <TrendingMarquee label="Photography" />
      <TrendingMarquee label="Others" />
      <Footer />
    </section>
  );
}

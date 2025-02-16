import BottomNav from "@/components/BottomNav";
import Marquee from "@/components/Marquee";
import TopNav from "@/components/TopNav";
import Image from "next/image";

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
    </section>
  );
}

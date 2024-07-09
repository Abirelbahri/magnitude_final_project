import Jeans from "@/components/landingPage/jeansCollection/Jeans";
import Ourblog from "@/components/landingPage/ourblog/Ourblog";
import Partners from "@/components/landingPage/partners/Partners";
import TodaysTrending from "@/components/landingPage/today'sTrending/TodaysTrending";
import NewArrival from "@/components/landingPage/newArrivals/newarrival";
import React from "react";
import Hero from "@/components/landingPage/heroSection/hero";
import Footer from "@/components/footer/Footer";

const page = () => {
  return (
    <>
      <Hero />
      <NewArrival />
      <Jeans/>
      <Ourblog/>
      <Partners />
      <Footer/>
    </>
  );
};

export default page;

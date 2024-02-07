import React from "react";
import Section from "../ui/section";
import HeroCTA from "../hero-cta";
import HeroTablet from "../hero-tablet";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <Section
      background="transparent"
      size="none"
      className="pl-8 pt-8 md:pl-10 md:pt-8 lg:pl-16 lg:pt-16"
    >
      <div className="grid md:grid-cols-2 items-start justify-center gap-8 h-full">
        <HeroCTA />
        <HeroTablet />
      </div>
    </Section>
  );
};

export default HomePage;

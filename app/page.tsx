import Hero from "./components/Hero";
import Categories from "./components/Categories";
import FeaturedServices from "./components/FeaturedServices";
import HowItWorks from "./components/HowItWorks";
import Testimonials from "./components/Testimonials";

export default function Home() {
  return (
    <>
      <Hero />
      <Categories />
      <FeaturedServices />
      <HowItWorks />
      <Testimonials />
    </>
  );
}

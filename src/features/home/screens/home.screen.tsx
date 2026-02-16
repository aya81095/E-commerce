import Slider from "../components/slider";
import TopFeatures from "../components/topFeatures";
import DealsCards from "../components/dealsCards";
import NewsLetter from "../components/newsLetter";
import OurCategories from "../components/ourCategories";
import FeaturedProducts from "../components/featuredProducts";
export default function HomeScreen() {
  return (
    <>
      <Slider />
      <TopFeatures />
      <OurCategories />
      <DealsCards />
      <FeaturedProducts />
      <NewsLetter />
    </>
  );
}
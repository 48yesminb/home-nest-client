import SliderBanner from "../components/SliderBanner";
import FeaturedProperties from "../components/FeaturedProperties";
import WhyChooseUs from "../components/WhyChooseUs";
import ExtraSectionOne from "../components/ExtraSectionOne";
import ExtraSectionTwo from "../components/ExtraSectionTwo";

function Home() {
  return (
    <div>
      {/*  1. Slider Section */}
      <section id="banner">
        <SliderBanner />
      </section>

      {/* 2. Featured Properties Section */}
      <section id="featured">
        <FeaturedProperties/>
      </section>

      {/* 3. Why Choose Us Section */}
      <section id="why-choose-us">
        <WhyChooseUs />
      </section>

      {/*  4. Extra Section One */}
      <section id="extra-one">
        <ExtraSectionOne />
      </section>

      {/*  5. Extra Section Two */}
      <section id="extra-two">
        <ExtraSectionTwo />
      </section>
    </div>
  );
}

export default Home;

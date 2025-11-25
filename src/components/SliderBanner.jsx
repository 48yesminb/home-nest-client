
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function SliderBanner() {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: true,
    fade: true,
    speed: 1000,
    customPaging: (i) => (
      <div className="w-4 h-4 rounded-full bg-white/50 hover:bg-white transition-all duration-300"></div>
    ),
    dotsClass: "slick-dots bottom-5 flex justify-center gap-2",
  };

  const slides = [
    {
      img: "https://i.ibb.co.com/qFYTqWPm/modern.jpg",
      text: "Find Your Dream Home With Us",
      btnText: "Explore Now",
    },
    {
      img: "https://i.ibb.co.com/YFSmPLrp/ID24318-Picture02.webp",
      text: "Luxury Apartments & Peaceful Living",
      btnText: "View Properties",
    },
    {
      img: "https://i.ibb.co/B55FG6xK/cozy.jpg",
      text: "Modern Designs for Modern Life",
      btnText: "Get Started",
    },
  ];

  return (
    <div className="relative">
      <Slider {...settings}>
        {slides.map((slide, idx) => (
          <div key={idx} className="relative group">
          
            <img
              src={slide.img}
              alt={`slide-${idx}`}
              className="w-full h-[70vh] md:h-[80vh] object-cover rounded-lg transition-transform duration-1000 group-hover:scale-105"
            />

          
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent flex flex-col items-center justify-center px-4 text-center">
          
              <h2 className="text-white text-3xl md:text-5xl font-bold mb-4 animate-fadeIn drop-shadow-lg">
                {slide.text}
              </h2>

              
              <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3 rounded-full shadow-lg transition-all duration-300">
                {slide.btnText}
              </button>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default SliderBanner;

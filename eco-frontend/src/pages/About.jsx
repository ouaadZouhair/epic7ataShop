import { Footer } from "../components/imports.jsx";
import bgP from "../../src/assets/thsirts2.jpg";
import thisrtImg from "../../src/assets/tshirts.jpg";
import quality from "../../src/assets/icons/1.svg";
import personalize from "../../src/assets/icons/2.svg";
import fabric from "../../src/assets/icons/3.svg";
import { FaStar } from "react-icons/fa6";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";


function About() {
  // Reusable card data
  const features = [
    {
      icon: quality,
      title: "Premium Quality",
      description:
        "We use advanced printing techniques to ensure vibrant colors and long-lasting designs. Our prints are resistant to fading, even after multiple washes, guaranteeing durability and premium quality.",
      bgColor: "bg-amber-300",
    },
    {
      icon: personalize,
      title: "Personalized Designs",
      description:
        "Upload your own design, logo, or artwork, and we’ll bring it to life on T-shirts, hoodies, mugs, and caps. Whether for personal use, gifts, or branding, we make customization easy and professional.",
      bgColor: "bg-blue-500",
    },
    {
      icon: fabric,
      title: "Comfortable Fabric",
      description:
        "Our products are made from soft, breathable, and high-quality fabrics. Designed for both comfort and durability, our T-shirts and hoodies provide a stylish fit that lasts.",
      bgColor: "bg-red-500",
    },
  ];

  // Testimonials data
  const testimonials = [1, 2, 3, 4, 5].map((item, i) => ({
    id: i,
    name: "Mohammed Zouhair Ouaad",
    review:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Perspiciatis aperiam veritatis dicta provident numquam eius? Ex ratione, blanditiis, aut assumenda error asperiores vel quisquam, libero quas doloribus quia beatae fugit.",
  }));

  return (
    <>
      {/* Hero Section */}
      <div
        style={{ backgroundImage: `url(${bgP})` }}
        className="w-full h-[400px] bg-top bg-cover bg-no-repeat flex justify-center items-center"
      >
        <h1 className="text-8xl font-bold text-gray-950 backdrop-blur-sm">
          About Us
        </h1>
      </div>

      {/* Our Story Section */}
      <section className="flex flex-col lg:flex-row-reverse justify-around items-center gap-8 my-10 mx-4 lg:mx-60">
        <div className="flex flex-col justify-center items-start gap-4 max-w-[520px]">
          <h1 className="text-blue-500 text-4xl font-medium">Our Story</h1>
          <p className="text-gray-800 text-xl font-normal leading-9 text-justify">
            Welcome to Epic7ata, a Moroccan brand born in 2024 with a passion for
            creativity and self-expression. We believe that what you wear and use
            should reflect who you are. That’s why we design unique t-shirts,
            hoodies, mugs, and caps that speak to individuality and style. But we
            don’t stop there—we give you the power to create! With our custom
            design feature, you can upload your own artwork and turn it into
            wearable art or everyday essentials. Whether you choose from our
            exclusive collections or craft something personal, Epic7ata is here
            to help you create, proud & live.
          </p>
        </div>
        <img
          src={thisrtImg}
          className="w-[380px] h-auto rounded-2xl shadow-md"
          alt="T-shirt design"
        />
      </section>

      {/* Features Section */}
      <section className="flex flex-col lg:flex-row justify-center items-center gap-10 my-5 mx-4">
        {features.map((feature, index) => (
          <div
            key={index}
            className={`${feature.bgColor} w-96 h-auto rounded-2xl px-8 py-10 shadow-sm hover:shadow-xl hover:scale-105 duration-150 flex flex-col items-center justify-start gap-1 cursor-pointer`}
          >
            <img
              src={feature.icon}
              className="w-32 h-32 mx-auto"
              alt={feature.title}
            />
            <p className="text-justify h-40 text-lg text-white">
              {feature.description}
            </p>
          </div>
        ))}
      </section>

      {/* Testimonials Section */}
      <section className="bg-blue-200/40 w-full h-auto p-6 my-5">
        <div className="flex flex-col items-center gap-2 w-full lg:w-[45%] mx-auto">
          <h1 className="text-4xl font-semibold">What Our Clients Say</h1>
          <p className="text-lg font-normal text-center w-[80%] text-gray-600">
            Discover why businesses choose our services and how we've helped them
            achieve their goals.
          </p>
          <div className="h-[6px] w-24 bg-blue-500 rounded-full"></div>
        </div>

        <Swiper
          modules={[ Autoplay]}
          spaceBetween={400}
          slidesPerView={1}
          autoplay={{ delay: 3500 }}
          loop
          initialSlide={3} // Set the initial slide to the second slide (index 1)
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="mySwiper flex justify-between items-center gap-3 mt-10"
        >
          {testimonials.map((testimonial) => (
            <SwiperSlide key={testimonial.id}>
              <div className="flex flex-col gap-3 w-full lg:w-[600px] h-[300px] bg-white rounded-xl p-5 mx-auto">
                <div className="flex items-center gap-3">
                  <div className="bg-blue-500 w-[70px] h-[70px] rounded-full"></div>
                  <h1 className="text-lg font-medium">{testimonial.name}</h1>
                </div>
                <div className="flex flex-col gap-1">
                  <span className="flex items-center gap-1 text-amber-400 w-28 text-xl">
                    {[...Array(4)].map((_, i) => (
                      <FaStar key={i} className="text-xl" />
                    ))}
                  </span>
                  <p className="text-lg italic font-light text-justify">"{testimonial.review}"</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      <Footer />
    </>
  );
}

export default About;
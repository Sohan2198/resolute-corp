import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import image1 from '../../../assets/images/Banner-1.jpg';
import image2 from '../../../assets/images/Banner-2.jpg';
import image3 from '../../../assets/images/Banner-3.jpg';
import final  from '../../../assets/images/HIL_Bronze.jpg';
import { Pagination, Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const SlideShow = () => {
  const images = [
    {
      src: image1,
      alt: 'Fueling Innovation',
      text: 'Fueling Innovation,<br />Empowering Tomorrow',
    },
    {
      src: image2,
      alt: 'Progress is Vitality',
      text: 'Progress<br />is vitality',
    },
    {
      src: image3,
      alt: 'Powering Possibilities',
      text: 'Powering Possibilities,<br />Shaping Futures',
      link: 'https://delhitoofans.com/',
    },
    {
      src: final,
      link: 'https://hyderabadtoofans.net/',
    },
  ];

  return (
    <div className="relative">
      <Swiper
        modules={[Pagination, Autoplay, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        autoplay={{
          enabled: true,
          delay: 4000,
          disableOnInteraction: false,
        }}
        loop={true}
        speed={6000}
        pagination={{ clickable: true }}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full md:h-[650px] h-[300px] object-cover image-fade"
              />
              <div className="absolute md:left-[9%] bottom-15 top-2/3 -translate-y-1/2 p-6 text-white">
                <h2
                  className="md:text-5xl mb-2 text-xl uppercase"
                  dangerouslySetInnerHTML={{ __html: image.text }}
                />
                {image.link && (
                  <Link
                    to={image.link}
                    target="_blank"
                    className="btn bg-white hover:bg-[#0A235C] text-[#0E4669] hover:text-white border border-[#0E4669] rounded-lg font-semibold px-3 py-1 duration-500 md:static uppercase"
                  >
                    Visit Now
                  </Link>
                )}
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="absolute top-1/2 left-0 z-10">
        <div className="swiper-button-prev bg-white flex items-center rounded-2xl">
          <IoIosArrowBack size={20} color="#0a235c" />
        </div>
      </div>
      <div className="absolute top-1/2 right-0 z-10">
        <div className="swiper-button-next bg-white flex items-center rounded-2xl">
          <IoIosArrowForward size={20} color="#0a235c" />
        </div>
      </div>
    </div>
  );
};

export default SlideShow;
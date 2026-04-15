import React, { useState, useMemo } from 'react';

import sanghi from '../assets/Portfolio/Sanghi-Cement.jpg';
import ShareSquare from '../assets/Portfolio/Share-Square.jpg';
import HDC from '../assets/Portfolio/HDC.jpg';
import DT from '../assets/Portfolio/Delhi-Toofan.jpg';
import Hyderabad from '../assets/Portfolio/Hyderabad-Toofans.jpg';
import portfolioBg from '../components/Image/Resolute-UI-Portfolio.jpg';
import AnimatedTitle from './Animation/AnimatedTitle';
import FadeUpComponent from './Animation/FadeUpComponent';
import { Helmet } from 'react-helmet';


const portfolioItems = [
  {
    imgSrc: sanghi,
    alt: "Sanghi-Cement",
    link: "https://www.sanghicement.com/",
    title: "Sanghi Industries Limited",
    description: "Sanghi Industries Limited, a company jointly promoted by the Sanghi Family and the Adani Group, is among India's leading cement companies. It has one of the largest single location cement plants in India. Equipped with multi-fuel technology, this fully integrated plant includes captive facilities viz. a Thermal Power Plant, all weather Port, Sea terminals at Gujarat & Mumbai and own vessels to cater to demand of its markets. The Company possesses one of the largest limestone reserves in the country. Due to the high quality of its mineral reserves and advanced manufacturing technology, it can produce superior grades of Cement while maintaining the lowest production cost. Its commitment to positive transformation has resulted in converting the arid landscape of the nearby area into a green and clean zone. The Company is recognized for its best practices in environment management & corporate citizenship and is committed to building the nation with goodness."
  },
  {
    imgSrc: ShareSquare,
    alt: "ShareSquare",
    link: "https://sharesquare.ae/",
    title: "ShareSquare",
    description: "ShareSquare isn't just about investing—it's about transforming how you experience real estate. It's a platform where luxury real estate meets accessible investing. We're redefining property ownership by offering fractional shares in premium UAE properties, making elite real estate opportunities available to everyone. At ShareSquare, you can diversify your portfolio, capitalize on property appreciation, and earn rental income with ease, no matter your investment size. Our platform guarantees a seamless, transparent, and secure investment experience. Powered by cutting-edge technology and market expertise, we connect you to exclusive properties and empower you with tools to optimize your returns. Whether you're a seasoned investor or new to real estate, ShareSquare promises a rewarding journey customized to your goals."
  },
  {
    imgSrc: HDC,
    alt: "HairDrama",
    link: "https://hairdramacompany.com/",
    title: "Hair Drama Co.",
    description: "Hair Drama Co. is a holistic hair fashion brand specializing in luxurious hair accessories for women and girls. Since its establishment in 2015, it has carved out a unique niche in the previously non-existent hair accessory space in India. With a focus on creating distinct, handmade hair accessories, the brand has quickly become a trendsetter in the industry. Hair Drama Co. is the first-ever Indian hair fashion brand to do licensing partnerships with Disney India, the popular Netflix show Emily in Paris, and the global sensation Barbie. With these collaborations Hair Drama Co. have brought beloved characters and iconic styles to life, offering customers exclusive and enchanting hair accessories that resonate with fans of all ages. Beyond aesthetics, Hair Drama Co. is committed to empowering women and girls to express their individuality and confidence through fashion. The brand's diverse range of products caters to various styles and occasions, ensuring that everyone can find something that complements their unique personality and enhances their natural beauty. Hair Drama Co. continues to innovate and expand its offerings while also remaining dedicated to setting new standards in hair fashion, inspiring creativity, and celebrating the art of self-expression."
  },
  {
    imgSrc: DT,
    alt: "Delhi Toofans",
    link: "https://delhitoofans.com/",
    title: "Delhi Toofans",
    description: "Meet the Delhi Toofans, India's electrifying volleyball squad that brings a storm to the court! This team is a powerhouse of fierce competition and sheer enthusiasm, setting the stage for thrilling matches that captivate audiences. The Toofans are more than just a volleyball team—they're igniting a movement that aims to elevate the sport's profile across the nation. Every game is a testament to their dedication and passion, as they strive to nurture homegrown talent and inspire a new generation of athletes. The Toofans are committed to creating a vibrant sports culture in India, one that celebrates the spirit of teamwork, perseverance, and excellence. With each spike, serve, and block, the Toofans are writing a new chapter in Indian volleyball. Their relentless energy and unwavering determination make them a force to be reckoned with on the court. Whether they're facing off against rivals or training hard for the next big match, the Toofans embody the essence of sportsmanship and dedication. Join the adventure with the Delhi Toofans, where every moment is charged with excitement and every match is a story of passion and commitment. Experience the thrill of volleyball like never before!"
  },
  {
    imgSrc: Hyderabad,
    alt: "Hyderabad Toofans",
    link: "https://hyderabadtoofans.net/",
    title: "Hyderabad Toofans",
    description: "Introducing the Hyderabad Toofans, a dynamic hockey team making waves in the Hockey India League—a thrilling competition making its triumphant return after a 7-year hiatus! With a blend of traditional flair and modern strategy, the Toofans aren't here to just compete, but they’re here to conquer. Each and every person part of the Hyderabad Toofans is fueled by a fierce determination and drive to elevate the sport to new heights, pushing the boundaries of the game and setting new standards of excellence. The Toofans are committed to nurturing homegrown talent and transforming them into world-class athletes destined to shine on the international stage. Every tackle, pass, and goal marks a step toward reigniting India’s passion for hockey. Embodying the very essence of sportsmanship and perseverance, the Toofans are here to rewrite the story of Indian hockey. Join the Hyderabad Toofans as they unleash a new era of hockey and captivate the nation like never before!"
  }
];

const PortfolioItem = React.memo(({ item, isHovered, onMouseEnter, onMouseLeave }) => {
  const textStyle = {
    overflow: 'hidden',
    display: '-webkit-box',
    WebkitLineClamp: isHovered ? 'unset' : 4,
    WebkitBoxOrient: 'vertical',
    transition: 'all 0.3s ease-in-out'
  };

  return (
    <div
      className='text-black bg-white hover:bg-[#0A235C] hover:text-white rounded-lg w-full'
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
     
      <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
        <img src={item.imgSrc} alt={item.alt} className="object-cover w-full mx-auto transition duration-300 ease-in rounded" />
      </a>
      <div className="p-5">
        <h2 className="text-2xl font-semibold mb-5"><FadeUpComponent>{item.title}</FadeUpComponent></h2>
        <div className="text-[16px] text-justify" style={textStyle}>
          <p className='mb-3'>{item.description}</p>
        </div>
      </div>
    </div>
  );
});

const Portfolio = () => {
  const [hovered, setHovered] = useState(null);

  const handleMouseEnter = (index) => setHovered(index);
  const handleMouseLeave = () => setHovered(null);

  const memoizedPortfolioItems = useMemo(() => portfolioItems.map((item, index) => (
    <PortfolioItem
      key={index}
      item={item}
      isHovered={hovered === index}
      onMouseEnter={() => handleMouseEnter(index)}
      onMouseLeave={handleMouseLeave}
    />
  )), [hovered]);

  return (
    <>
    <Helmet>
    <title>Resolutecorp | Investment Management and Financial Services</title>
    <meta name="description" content="Explore Resolute Group's diverse portfolios, including Sanghi Industries, ShareSquare, Hair Drama Co., and the dynamic sports teams – driving innovation and growth across sectors!"/>
    <meta name="keywords" content="Investment Management and Financial Services, investment firm, distinguished investment firm in India, global investment firm, investment management"/>
    <meta name="robots" content="index,follow"/>
    </Helmet>
    <section className="bg-[#F4F5F6]">
      <div className='pb-6'>
        <div className='bg-[#0E4669] text-white py-16 px-8 pt-6 h-410 md:p-6 lg:p-12'
          style={{
            backgroundImage: `url(${portfolioBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '250px'
          }}
        >
          <h2 className="text-4xl uppercase font-bold mb-3 text-center"><AnimatedTitle>Portfolio</AnimatedTitle></h2>
          <h4 className="text-center text-xl mb-5 font-semibold">Investments with Impact</h4>
        </div>

        <div className="flex flex-wrap justify-center gap-6 rounded-lg py-10 max-w-[1200px] mx-auto">
          {memoizedPortfolioItems.map(item => (
            <div className="w-full sm:w-1/2 lg:w-1/3 max-w-[350px]">
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
    </>
  );
};

export default Portfolio;
import React from 'react';
import { Link } from 'react-router-dom';
import AnimatedTitle from '../../shared/AnimatedTitle';

import portfolioBg from '../../../assets/images/Resolute-UI-Portfolio.jpg';
import Sanghi from '../../../assets/portfolio/sanghi-logo.jpg';
import shareSquare from '../../../assets/portfolio/shareSquare.jpg';
import HDC from '../../../assets/portfolio/hdc-logo.jpg';
import Delhi from '../../../assets/portfolio/dt-logo.jpg';
import Hyderabad from '../../../assets/portfolio/ht-logo.jpg';

const portfolioItems = [
  { image: Sanghi, alt: "Sanghi Industries Ltd. logo", link: "https://www.sanghicement.com/" },
  { image: shareSquare, alt: "ShareSquare logo", link: "https://sharesquare.ae/" },
  { image: HDC, alt: "HDC logo", link: "https://hairdramacompany.com/" },
  { image: Delhi, alt: "Delhi logo", link: "https://delhitoofans.com/" },
  { image: Hyderabad, alt: "Hyderabad logo", link: "https://hyderabadtoofans.net/" },
];

const PortfolioItem = ({ image, alt, link }) => (
  <div className="relative h-350 bg-cover bg-center rounded-lg overflow-hidden shadow-lg hover:shadow-sm transition duration-300 ease-in-out cursor-pointer transform hover:-translate-y-[50px]">
    <Link to={link} target="_blank" rel="noopener noreferrer">
      <img src={image} alt={alt} className="w-full h-full object-cover transition duration-300 ease-in-out" />
    </Link>
  </div>
);

const Comport = () => {
  return (
    <section className="bg-white">
      <div className="h-110 relative">
        <img src={portfolioBg} alt="Portfolio background" className="w-full object-cover" />
        <div className="text-overlay absolute top-1/2 left-0 right-0 text-center transform -translate-y-1/2 md:-translate-y-[55px]">
          <h2 className='text-4xl font-bold text-white md:top-[-100px]'>
            <AnimatedTitle>PORTFOLIO</AnimatedTitle>
          </h2>
        </div>
      </div>
      <div className="max-w-[1300px] mx-auto p-2 pt-5 md:p-3 lg:p-1">
        <div className="grid md:grid-cols-5 gap-12 justify-center relative md:top-[-100px] ">
          {portfolioItems.map((item, index) => (
            <PortfolioItem key={index} {...item} className =""/>
          ))}
        </div>
        <div className='grid justify-center items-center pt-5 pb-3 md:pb-10 md:top-[-15px] bottom-[-16px] md:mt-[-3.5rem] mb-[1rem]'>
          <Link 
            to='/portfolio' 
            className='bg-white hover:bg-[#0A235C] text-[#0E4669] hover:text-white font-bold py-3 px-4 border border-[#0E4669] rounded-lg mt-4 animated-button'
          >
            View More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Comport;
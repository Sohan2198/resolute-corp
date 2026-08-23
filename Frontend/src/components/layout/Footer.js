import React from 'react';
import { FaInstagram, FaFacebook, FaLinkedin, FaMapMarkerAlt } from "react-icons/fa"; // Updated import
import blogpost1 from '../../assets/images/blog/1.jpg';
import blogpost2 from '../../assets/images/blog/2.jpg';
import FadeUpComponent from '../shared/FadeUpComponent';

const Footer = () => {
  return (
    <>
      <section className='w-full bg-[#0f4769]'>
        <div className="max-w-[1300px] m-auto py-12 px-8 lg:grid-cols-1 gap-4 text-white">
          <div className="lg:flex lg:flex-wrap lg:justify-between">
            {/* About Us Section */}
            <div className="lg:w-1/2 xl:w-[35%] mb-4 lg:mb-0">
              <h6 className="uppercase mb-3 text-xl font-bold">
                <FadeUpComponent>ABOUT US</FadeUpComponent>
              </h6>
              <p className="text-[16px] mb-4">
                Resolute is a forward-thinking investment firm dedicated to strategic diversification
                and sustainable growth across dynamic sectors. We empower ventures that redefine industry
                standards and drive lasting financial impact.
              </p>
              <p className="text-sm">
                Any Queries: <span>+91 6353106274</span>
              </p>
            </div>

            {/* Portfolio Section */}
            <div className="lg:w-1/2 xl:w-[20%] mb-4 lg:mb-0">
              <h6 className="uppercase mb-3 text-xl font-bold">
                <FadeUpComponent>Portfolio</FadeUpComponent>
              </h6>
              <ul className="list-none text-[16px] mb-4">
                <li><a href='https://www.sanghicement.com/' target="_blank" rel='noopener noreferrer'>Sanghi Cement</a></li>
                <li><a href='https://sharesquare.ae/' target="_blank" rel='noopener noreferrer'>ShareSquare</a></li>
                <li><a href='https://www.hairdramacompany.com/' target="_blank" rel='noopener noreferrer'>Hair Drama Co.</a></li>
                <li><a href='https://delhitoofans.com/' target="_blank" rel='noopener noreferrer'>Delhi Toofans</a></li>
                <li><a href='https://hyderabadtoofans.net/' target="_blank" rel='noopener noreferrer'>Hyderabad Toofans</a></li>
              </ul>
            </div>

            {/* Recent Post Section */}
            <div className="lg:w-1/2 xl:w-[35%] mb-4 lg:mb-0">
              <h6 className="uppercase mb-3 text-xl font-bold">
                <FadeUpComponent>Recent post</FadeUpComponent>
              </h6>
              <div className="flex flex-wrap mb-4">
                <div className="w-1/4 xl:w-1/6 mb-4 xl:mb-0 pr-2">
                  <img src={blogpost1} alt="Recent Post 1" className="w-full h-full object-cover rounded " />
                </div>
                <div className="w-3/4 xl:w-5/6 mb-4 xl:mb-0 flex flex-col">
                  <a href="https://ddnews.gov.in/en/prime-volleyball-league-season-4-set-to-begin-in-october/" target="_blank" rel='noopener noreferrer' className="text-sm mr-1 font-semibold">
                    Prime Volleyball league season 4 set to begin in October
                  </a>
                  <span className="text-sm">Mar 25, 2025</span>
                </div>
              </div>
              <div className="flex flex-wrap mb-4">
                <div className="w-1/4 xl:w-1/6 mb-4 xl:mb-0 pr-2 object-cover">
                  <img src={blogpost2} alt="Recent Post 2" className="w-full h-full rounded" />
                </div>
                <div className="w-3/4 xl:w-5/6 mb-4 xl:mb-0 flex flex-col">
                  <a href="https://www.aninews.in/news/sports/hockey/hyderabad-toofans-bag-bronze-medal-in-the-mens-hockey-india-league-2025-2620260126203001/" target="_blank" rel='noopener noreferrer' className="text-sm mr-1 font-semibold">
                    Hyderabad Toofans bag bronze medal in the men's HIL 2025-26
                  </a>
                  <span className="text-sm">Jan 26, 2026</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Bottom Section */}
      <section className='bg-[#3379b6] w-full'>
        <div className='max-w-[1300px] m-auto py-2 lg:grid-cols-1'>
          <div className="lg:flex lg:justify-between lg:items-center m-4 text-white">
            <p className="text-sm font-bold">2026 ResoluteCorp, All rights reserved</p>
            <div className="flex lg:justify-end gap-2">
              {/* Social Media Links */}
              <a href="https://www.facebook.com/people/Resolute-Corp/61559078189329/" target="_blank" rel="noreferrer">
                <FaFacebook size={20} />
              </a>
              <a href="https://www.linkedin.com/company/resolutecorp/" target="_blank" rel="noreferrer">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/resolute.corp/" target="_blank" rel="noreferrer">
                <FaInstagram size={20} />
              </a>
              {/* Location Link */}
              <a
                href="https://www.google.com/maps/place/Resolute+Corp/@22.9929562,72.496642,771m/data=!3m2!1e3!4b1!4m6!3m5!1s0xa670e4a7610b008f:0xb4d0c70b8f1752f8!8m2!3d22.9929562!4d72.4992223!16s%2Fg%2F11wx9xs5w5?entry=ttu&g_ep=EgoyMDI1MDEwNy4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
                title="ResoluteCorp"
              >
                <FaMapMarkerAlt size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Footer;

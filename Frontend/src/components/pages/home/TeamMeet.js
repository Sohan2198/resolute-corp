import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import dc from '../../../assets/team/Dilip.jpg';
import amrita from '../../../assets/team/Amrita.jpg';
import vivek from '../../../assets/team/Vivek.jpg';
import manish from '../../../assets/team/Manish.jpg';
import saiprakash from '../../../assets/team/SaiPrakash.jpg';
import muath from '../../../assets/team/Muath.jpg';
import sanjeev from '../../../assets/team/Sanjeev.jpg';
import nikhil from '../../../assets/team/Nikhil.jpg';
import AnimatedTitle from '../../shared/AnimatedTitle';

const TeamMeet = () => {
    const data = [
        {
            name: `Vivek Pawar`,
            desig: 'CEO HairDramaCo.',
            img: vivek
        },
        {
            name: `Sai Prakash`,
            desig: 'CEO Resolute Sports',
            img: saiprakash
        },
        {
            name:`Nikhil Rungta`,
            desig:'Chief Investment Officer',
            img: nikhil
        },
        {
            name: `Muath Abdel Jalil`,
            desig: 'CEO ShareSquare',
            img: muath
        },
        {
            name: `Sanjeev Ludhani`,
            desig: 'Chief Digital Officer',
            img: sanjeev
        },
        {
            name: `Manish Kumar`,
            desig: 'Group General Counsel',
            img: manish
        },
        {
            name: `Dilip Chakraborty`,
            desig: 'Group Accounts and Taxation',
            img: dc
        },
        {
            name: `Amrita Desai`,
            desig: 'Group CHRO',
            img: amrita
        },
        
    ];

    return (
        <section className="w-full">
            <div className="max-w-[1300px] m-auto py-16 px-4">
                <h1 className="text-4xl uppercase font-bold text-center">
                    <AnimatedTitle>MEET THE TEAM</AnimatedTitle>
                </h1>
                <div className="mt-20 relative">
                    <style>
                        {`
                            .swiper-pagination-bullet {
                                background: #0a235c; 
                            }

                            .swiper-pagination-bullet-active {
                                background: #0a235c; 
                            }
                            .swiper-button-next:after, .swiper-button-prev:after {
                                display: none;
                            }
                        `}
                    </style>
                    <div className="absolute top-1/2 left-0 z-10">
                        <div className="swiper-button-prev bg-white flex items-center rounded-2xl">
                            <IoIosArrowBack size={24} color="#0a235c" />
                        </div>
                    </div>
                    <div className="absolute top-1/2 z-10 right-0">
                        <div className="swiper-button-next bg-white flex items-center rounded-2xl">
                            <IoIosArrowForward size={24} color="#0a235c" />
                        </div>
                    </div>
                    <Swiper
                        modules={[Pagination, Navigation]}
                        spaceBetween={30}
                        slidesPerView={1}
                        navigation={{
                            prevEl: '.swiper-button-prev',
                            nextEl: '.swiper-button-next',
                        }}
                        pagination={{ clickable: true }}
                        breakpoints={{
                            480: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 2,
                            },
                            1024: {
                                slidesPerView: 3,
                            },
                        }}
                        style={{
                            paddingBottom: '50px',
                        }}
                    >
                        {data.map((d, index) => (
                            <SwiperSlide key={index}>
                                <div className="bg-[#F4F5F6] text-black rounded-lg hover:bg-[#0a235c] hover:p-3 hover:text-white">
                                    <div className="rounded-t-xl flex justify-center items-center">
                                        <img src={d.img} alt={d.name} className="md:h-45 md:w-50 w-full h-full rounded" />
                                    </div>
                                    <div className="flex flex-col gap-4 p-5 justify-center items-center">
                                        <h5 className="text-2xl font-semibold">{d.name}</h5>
                                        <span className="font-bold">{d.desig}</span>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </ div>
        </section>
    );
};

export default TeamMeet;
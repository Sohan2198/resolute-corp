import React, { useState, useMemo } from 'react';
import portfolioBg from '../../../assets/images/Resolute-UI-Portfolio.jpg';
import AnimatedTitle from '../../shared/AnimatedTitle';

// Data and helper functions remain outside the component for performance.
const INSIGHTS_DATA = [
    {
        name: `Hair Drama Co. x Disney Cruella got featured in Elle Magazine! `,
        about: `Elle Magazine had a feature reminiscing the 90s and how it has come back in style 
                everywhere – where they featured one of the Collection from Hair Drama Co. X Disney Collaboration!`,
        author: `Elle Magazine`,
        date: `Oct 01, 2021`
    },
    {
        name: `Libero Anand — a game-changer with exceptional digs`,
        about: `The Delhi Toofans player, who feels the role has not been really acknowledged, 
                says things are slowly changing with the advent of the PVL; the 21-year-old.. <a href="https://www.thehindu.com/sport/other-sports/pvl-libero-anand-a-game-changer-with-exceptional-digs/article67988777.ece" target="_blank" class='text-red-600'>Read More</a>`,
        author: `The Hindu`,
        date: `Mar 24, 2024`
    },
    {
        name: `Hair Drama Co. got featured in Cosmopolitan Magazine!`,
        about: `Cosmopolitan India had a feature showcasing Best Hair Accessory Brands – 
                where they featured Hair Drama Co. as one of the brands to be on everyone's Radar! `,
        author: `Cosmopolitan Magazine!`,
        date: `Feb 13, 2020`
    },
    {
        name: `Delhi Toofans end Kolkata Thunderbolts campaign....`,
        about: `Delhi Toofans on Sunday picked up a dominant 15-9, 16-14, 17-15 win over the Kolkata Thunderbolts 
                in the third season of the RuPay Prime Volleyball League at the Jawaharlal Nehru Indoor....<a href="https://timesofindia.indiatimes.com/sports/more-sports/others/prime-volleyball-league-delhi-toofans-end-kolkata-thunderbolts-campaign-with-dominant-win/articleshow/108184196.cms" target="_blank" class='text-red-600'>Read More</a> `,
        author: `The Times Of India`,
        date: `Mar 03, 2024`
    },
    {
        name: `Prime Volleyball League: Delhi Toofans stun Bengaluru Torpedoes....`,
        about: `The new franchise on the block, the Delhi Toofans stunned the Bengaluru Torpedoes in the third season of 
                RuPay Prime Volleyball League on Sunday, picking up a 15-10, 15-13, 21-20...
                <a href="https://timesofindia.indiatimes.com/sports/more-sports/others/prime-volleyball-league-delhi-toofans-stun-bengaluru-torpedoes-get-dominant-win-to-get-off-the-mark/articleshow/107800814.cms" target="_blank" class='text-red-600'>Read More</a>`,
        author: `The Times Of India`,
        date: `Feb 18, 2024`
    },
    {
        name: `Prime Volleyball League: Delhi Toofans eliminate Defenders..`,
        about: `Chennai: Delhi Toofans reached the final of the Prime Volleyball League after a dramatic five-set win 
        (15-9, 10-15, 10-15, 15-12, 17-15) over Ahmedabad Defenders in the Eliminator at the Jawaharlal.... 
        <a href="https://www.onmanorama.com/sports/other-sports/2024/03/19/prime-volleyball-league-delhi-toofans-vs-ahmedabad-defenders.html" class='text-red-600' target="_blank">Read More</a>`,
        author: `Onmanorama`,
        date: `Mar 19, 2024`
    },
    {
        name: `Newcomers Delhi Toofans eyes title against table-toppers Calicut Heroes`,
        about: `Delhi Toofans, led by the ever-reliable Saqlain Tariq, defied expectations 
        by storming past the reigning champions Ahmedabad Defenders in the eliminator..
        <a href="https://sportstar.thehindu.com/volleyball/pro-volleyball-league-pvl-2024-final-delhi-toofans-vs-calicut-heroes-preview-news-squad-updates/article67972313.ece" class='text-red-600' target="_blank">Read More</a>`,
        author: `SportStar`,
        date: `Mar 20, 2024`
    },
    {
        name: `Fresh-faced Delhi Toofans trumps odds to enter title clash`,
        about: `Led by the seasoned Indian international Saqlain Tariq, who is also making his PVL debut, 
        the team defied all odds by entering the final,Successfully ...... 
        <a href="https://sportstar.thehindu.com/volleyball/pvl-2024-delhi-toofans-pro-volleyball-league-calicut-heroes-final-maiden-season/article67971123.ece" class='text-red-600' target="_blank"><span className="font-bold text-black underline">Read More</span></a>`,
        author: `SportStar`,
        date: `Mar 20, 2024`
    },
    {
        name: `Hyderabad Toofans eye success in new era of Hockey India League`,
        about: `Hyderabad Toofans, owned by Resolute Sports, is one of the eight franchises in the Hockey India League starting later this year. "We are thrilled to be part of the HIL. ...... 
        <a href="https://www.lokmattimes.com/other-sports/hyderabad-toofans-eye-success-in-new-era-of-hockey-india-league/" target="_blank" class='text-red-600'><span className="font-bold text-black underline">Read More</span></a>`,
        author: `Lokmat Times`,
        date: `Oct 06, 2024`
    },
    {
        name: `Hyderabad Toofans eye success in new era of Hockey India League`,
        about: `Hyderabad Toofans, owned by Resolute Sports, is one of the eight franchises in the Hockey
                India League starting later this year. "We are thrilled to be part of the HIL. ......
        <a href="https://www.punjabnewsexpress.com/news/news/hyderabad-toofans-eye-success-in-new-era-of-hockey-india-league-264945" target="_blank" class='text-red-600'><span className="font-bold text-black underline">Read More</span></a>`,
        author: `Punjab News Express`,
        date: `Oct 06, 2024`
    },
    {
        name: `SANGHI’S PUSH INTO NON-CRICKET SPORTS`,
        about:`India’s sports economy is undergoing a transformative shift, with Gujarat emerging as a frontrunner for global events such as the 2030 Commonwealth Games and the 2036 Olympics...
        <a href="https://timesofindia.indiatimes.com/city/ahmedabad/the-business-of-game-as-gujarat-eyes-olympic-glory-its-corporates-are-betting-big-on-leagues-athletes-and-infrastructure/articleshow/123627911.cms" class='text-red-600' target='_blank' >Read more</a>`,
        author: `Times of India`,
        date: `Sep 01, 2025`
    },
    {
        name: `Hyderabad Toofans updated squad after HIL auction: Full players list`,
        about: `The Hockey India League (HIL) Mini Auctions culminated in a pulsating session in New Delhi, with franchises finalising their squads behind closed doors. Over 100 men’s players entered the auction pool,
        <a href="https://sportstar.thehindu.com/hockey/hyderabad-toofans-hil-2026-full-squad/article70088030.ece" target="_blank" class='text-red-600'><span className="font-bold text-black underline">Read More</span></a>`,
        author: `Sportstar`,
        date: `Sep 24, 2025`
    },
    {
        name: `Delhi Toofans stun Kolkata Thunderbolts; Goa Guardians seal semifinal spot`,
        about: `Delhi Toofans edged out Kolkata Thunderbolts 18-16, 11-15, 12-15, 15-11, 15-12 in the Prime Volleyball League, helping Goa Guardians qualify for the semi-finals. 
        <a href="https://telanganatoday.com/delhi-toofans-stun-kolkata-thunderbolts-goa-guardians-seal-semifinal-spot" target="_blank" class='text-red-600'><span className="font-bold text-black underline">Read More</span></a>`,
        author: `Telangana Today`,
        date: `Oct 23, 2025`
    },
    {
        name: `PVL 2025: Delhi Toofans beat hosts Hyderabad Black Hawks in straight sets`,
        about: `Hyderabad (Telangana) [India], October 10 (ANI): Delhi Toofans won their first game of the season, defeating the Hyderabad Black Hawks 15-10, 16-14, 17-15 in the RR Kabel Prime,
        <a href="https://www.aninews.in/news/sports/others/pvl-2025-delhi-toofans-beat-hosts-hyderabad-black-hawks-in-straight-sets20251010231037/" target="_blank" class='text-red-600'><span className="font-bold text-black underline">Read More</span></a>`,
        author: `Ani News`,
        date: `Oct 10, 2025`
    },
    {
        name: `Hyderabad Toofans bag bronze medal in the men's Hockey India League 2025-26`,
        about: `Bhubaneswar (Odisha) [India], January 26 (ANI): Hyderabad Toofans clinched third place in the Men's Hero Hockey India League (HIL), defeating HIL GC 4-3 in a high-scoring thriller at the Kalinga Hockey Stadium on Monday. 
        <a href="https://www.aninews.in/news/sports/hockey/hyderabad-toofans-bag-bronze-medal-in-the-mens-hockey-india-league-2025-2620260126203001/" target="_blank" class='text-red-600'><span className="font-bold text-black underline">Read More</span></a>`,
        author: `Ani News`,
        date: `Jan 26, 2026`
    }
];

const parseDate = (dateString) => {
    const [month, day, year] = dateString.split(' ');
    const monthIndex = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].indexOf(month);
    return new Date(year, monthIndex, parseInt(day, 10));
};

const PressCard = ({ name, about, author, date }) => (
    <div className='bg-[#0E4669] text-white rounded-lg p-6 transition-all duration-300 hover:bg-[#0A235C] hover:shadow-[0_6px_16px_rgba(0,0,0,0.5)] hover:-translate-y-1 flex flex-col h-full'>
        <h5 className='text-lg font-semibold mb-2'>{name}</h5>
        <p className='text-sm mb-4 flex-grow' dangerouslySetInnerHTML={{ __html: about }} />
        <div className='flex justify-between text-xs opacity-80 mt-auto'>
            <span>By: {author}</span>
            <span>{date}</span>
        </div>
    </div>
);

function PressReleases() {
    // --- Pagination Logic ---
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;

    // 1. Sort the data once and memoize it.
    const sortedData = useMemo(() => {
        return [...INSIGHTS_DATA].sort((a, b) => parseDate(b.date) - parseDate(a.date));
    }, []);

    // 2. Calculate pagination variables based on the sorted data.
    const totalPages = Math.ceil(sortedData.length / ITEMS_PER_PAGE);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    
    // 3. Slice the data for the current page.
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        window.scrollTo(0, 400); // Optional: scroll to the top of the grid on page change
    };
    
    return (
        <section className="bg-[#F4F5F6]">
            {/* Header Section (unchanged) */}
            <div
                className="mx-auto p-4 pt-6 md:p-6 lg:p-12 bg-[#0E4669] text-white flex flex-col justify-center items-center"
                style={{
                    backgroundImage: `url(${portfolioBg})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '250px',
                }}
            >
                <h2 className="text-4xl uppercase font-bold mb-3 text-center">
                    <AnimatedTitle>Press Releases</AnimatedTitle>
                </h2>
                <h4 className="text-center text-xl mb-5 font-semibold">
                    Big moves, bold wins, and what's new across our brands.
                </h4>
            </div>

            {/* Insights Grid Section */}
            <div className='max-w-[1300px] mx-auto py-16 px-4'>
                <h1 className='text-4xl uppercase font-bold text-center text-[#0E4669] mb-12'>
                    <AnimatedTitle>Insights</AnimatedTitle>
                </h1>

                <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {/* Render only the items for the current page */}
                    {currentItems.map((item) => (
                        <PressCard key={item.name + item.date} {...item} />
                    ))}
                </div>

                {/* --- Pagination UI --- */}
                <div className='flex justify-center items-center mt-12'>
                    {/* Previous Button */}
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-1 bg-white text-[#0E4669] border border-[#0E4669] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Previous
                    </button>

                    {/* Page Number Buttons */}
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => handlePageChange(index + 1)}
                            className={`px-4 py-2 mx-1 border rounded-md ${
                                currentPage === index + 1
                                    ? 'bg-[#0E4669] text-white border-[#0E4669]'
                                    : 'bg-white text-[#0E4669] border-[#0E4669]'
                            }`}
                        >
                            {index + 1}
                        </button>
                    ))}

                    {/* Next Button */}
                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 mx-1 bg-white text-[#0E4669] border border-[#0E4669] rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
}

export default PressReleases;
import React from 'react'
import portfolioBg from '../components/Image/Resolute-UI-Portfolio.jpg'
import AnimatedTitle from './Animation/AnimatedTitle'
function EventsHighlights() {
  return (
    <section className=" bg-[#F4F5F6]">
        <div className='mx-auto p-4 pt-6 md:p-6 lg:p-12  bg-[#0E4669] text-white'
        style={{
          backgroundImage: `url(${portfolioBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height:'250px'
        }}
        >
            <h2 className="text-4xl uppercase font-bold mb-3 text-center"><AnimatedTitle>Events & Highlights</AnimatedTitle> </h2>
            <h4 className="text-center text-xl mb-5 font-semibold">Events, highlights, and what’s coming next.</h4>
        </div>
        <div className='mx-auto p-4 pt-6 md:p-6 lg:p-12  text-[#0E4669]'>
            <h2 className="text-4xl uppercase font-bold mb-3 text-center">Coming Soon</h2>
        </div>
    </section>
  )
}

export default EventsHighlights
import React from 'react'
import MissionVision from './MissionVision'
import WhatApart from './WhatApart'
import CoreValues from './CoreValues'
import portfolioBg from '../../../assets/images/Resolute-UI-Portfolio.jpg'
import AnimatedTitle from '../../shared/AnimatedTitle'
import { Helmet } from 'react-helmet'

const About = () => {
  return (
    <>
    <Helmet>
    <title>Global Investment Firm | Invest in Global Markets | Resolutecorp</title>
    <meta name="description" content="Resolute Group aims to create global investment opportunities through innovation and technology, delivering exceptional returns and sustainable growth."/>
    <meta name="keywords" content="Global investment firm, invest in global markets, investment firm, distinguished investment firm in India"/>
    <meta name="robots" content="index,follow"/>
    </Helmet>
    <section className=" bg-[#F4F5F6]">
        <div className='mx-auto p-4 pt-6 md:p-6 lg:p-12  bg-[#0E4669] text-white'
        style={{
          backgroundImage: `url(${portfolioBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height:'250px'
        }}
        >
            <h2 className="text-4xl uppercase font-bold mb-3 text-center"><AnimatedTitle>About Us</AnimatedTitle> </h2>
            <h4 className="text-center text-xl mb-5 font-semibold">Dedicated to transforming opportunities into successes</h4>
        </div>
        <MissionVision/>
    </section>
    <WhatApart/>
    <CoreValues/>
    </>
    
  )
}

export default About
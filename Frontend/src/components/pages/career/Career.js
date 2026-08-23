import React from 'react'
import portfolioBg from '../../../assets/images/Resolute-UI-Portfolio.jpg'
import CareerInfo from './CareerInfo'
import AnimatedTitle from '../../shared/AnimatedTitle'
import { Helmet } from 'react-helmet'
const Career = () => {
  return (
    <>
    <Helmet>
    <title>Resolutecorp | Career | Investment Firm in India</title>
    <meta name="description" content="Join our team of innovators and make a difference in the world!"/>
    <meta name="keywords" content="Career, investment firm, distinguished investment firm in India, global investment firm, investment management, financial services"/>
    <meta name="robots" content="index,follow"/>
    </Helmet>
    <section className='bg-[#F4F5F6] w-full'>
      <div className='m-auto '>
        <div className='p-4 pt-5 mb-5 md:p-6 lg:p-12  bg-[#0E4669] text-white'
        style={{
          backgroundImage: `url(${portfolioBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          height:'250px'
        }}
        >
          <h2 className="text-4xl uppercase font-bold mb-3 text-center"><AnimatedTitle>Career</AnimatedTitle></h2>
          <h4 className="text-center text-2xl mb-1 pb-1 font-semibold">Join our team of innovators and make a difference in the world!</h4>
          <p className='text-center mb-5'>We're always looking for talented individuals to help us drive our mission forward.</p>
        </div>
      </div>
      <CareerInfo/>
    </section>
    </>
  )
}

export default Career
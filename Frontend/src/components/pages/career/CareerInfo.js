import React from 'react';
import FadeUpComponent from '../../shared/FadeUpComponent';

const CareerInfo = () => {
  <style>
    {`
      .kch-d-flex.kch-justify-content-around.kch-align-items-center {
        display: none !important;
      }
      .kch-section.kch-header-section.kch-d-flex.kch-justify-content-center.kch-w-100.kch-pb-30.kch-position-sticky.kch-px-32 {
        display: none !important;
      }
      `}
  </style>
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-8 bg-white shadow-lg rounded-lg min-h-screen flex flex-col">
      <h2 className="text-center text-3xl font-semibold pb-4">
        <FadeUpComponent>Career Info</FadeUpComponent>
      </h2>
      <p className="text-center text-gray-600 pb-4">
        Fill in the details below or email us at{' '}
        <a href="mailto:contact@resolutecorp.in" className="text-blue-600 font-medium hover:underline">
          contact@resolutecorp.in
        </a>
      </p>
      {/* <div className="flex-grow"> */}
        {/* <iframe
          title="Career Info Form"
          className="w-full h-[95vh] border-none"
          src="https://forms.office.com/Pages/ResponsePage.aspx?id=Nuzr3ZxEQEeJ3Y8lwpCrElEh8u2_oLhFtowKYPoXBaNUOUY2VlhGRVo5NjRWVENKN00wQUVFWk1NMi4u&embed=true"
          allowFullScreen
        ></iframe> */}
        <div className='w-full h-screen'>
        <div className='m-auto h-full w-full'>
        <iframe
            src="https://resolute.keka.com/careers/jobdetails/"
            title="Career Page"
            className="w-full h-full border rounded-lg shadow-lg"
            frameBorder={0}
            loading="lazy"
          />
        </div>
        </div>
      {/* </div> */}
    </section>
  );
};

export default CareerInfo;

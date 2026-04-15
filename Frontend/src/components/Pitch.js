import React from 'react';

import portfolioBg from '../components/Image/Resolute-UI-Portfolio.jpg';
import AnimatedTitle from './Animation/AnimatedTitle';

const Pitch = () => {
  return (
    <section className="bg-[#F4F5F6]">
        <div
          className="p-4 pt-6 mb-6 md:p-6 lg:p-12 bg-[#0E4669] text-white"
          style={{
            backgroundImage: `url(${portfolioBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '250px',
          }}
        >
          <h2 className="text-4xl uppercase font-bold mb-4 text-center">
            <AnimatedTitle>Got a Game-Changer Idea?</AnimatedTitle>
          </h2>
          <h4 className="text-center text-xl mb-5 font-semibold">
            Join our team and turn opportunities into triumphs
          </h4>
        </div>

        <div className="bg-white mb-6 rounded shadow-md max-w-[1300px] m-auto">
        <div className="w-full overflow-hidden">
            <iframe
              title="Office Form"
              width="100%"
              height="600px"
              src="https://forms.office.com/Pages/ResponsePage.aspx?id=Nuzr3ZxEQEeJ3Y8lwpCrElEh8u2_oLhFtowKYPoXBaNUQVlHQkZOWExUQlU4TEQ3Sjk4VVFXTk5UOC4u&embed=true"
              style={{ border: 'none', display: 'block' }}
              allowFullScreen
              webkitallowfullscreen
              mozallowfullscreen
              msallowfullscreen
            ></iframe>
          </div>
        </div>
    </section>
  );
};

export default Pitch;

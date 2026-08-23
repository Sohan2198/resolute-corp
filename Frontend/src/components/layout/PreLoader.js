import React, { useEffect } from 'react'
import './preloader.css'
import { preLoaderAnim } from '../../animations';
import loadergif from '../../assets/images/Resolute-Loader.gif';

const PreLoader = () => {
    useEffect(()=>{
         preLoaderAnim();
    },[]);
  return (
    <div className='preloader fixed top-0 left-0 w-full h-full flex justify-center items-center opacity-100'>
        <div className="gif-container animate-pulse ">
           <img src={loadergif} alt='Loading....' className='md:w-full md:h-full w-[350px] h-[100px] object-cover object-center' />
        </div>
    </div>
  )
}

export default PreLoader;
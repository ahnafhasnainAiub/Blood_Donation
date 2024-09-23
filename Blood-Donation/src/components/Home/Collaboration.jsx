import React from 'react';
import Banner from './Banner';
import Slider from 'react-slick';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function Collaboration() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    centerMode: true, // Centers the current slide
    centerPadding: '20px', 
    responsive: [
      {
        breakpoint: 1024, // Tablets
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          centerPadding: '10px', 
        },
      },
      {
        breakpoint: 768, // Mobile devices
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: '5px', 
        },
      },
    ],
  };

  return (
    <div className='bg-white md:container md:mx-auto px-4'>
      <div className=' py-8'>
        <div className="font-bold text-center md:text-left text-2xl md:text-3xl mb-6">Our Collaboration</div>
        
        <div className="slider-container mt-10">
          <Slider {...settings} className="slick-slider ">
            <div className="px-5"> 
              <Banner name="NCC"/>
            </div>
            <div className="px-5"> 
              <Banner name="NSS"/>
            </div>
            <div className="px-5"> 
              <Banner name="YMCE"/>
            </div>
            <div className="px-5"> 
              <Banner name="DCC"/>
            </div>
            <div className="px-5"> 
              <Banner name="ECC"/>
            </div>
            <div className="px-5"> 
              <Banner name="ACC"/>
            </div>
            <div className="px-5"> 
              <Banner name="BCC"/>
            </div>
            <div className="px-5"> 
              <Banner name="DCC"/>
            </div>
            <div className="px-5"> 
              <Banner name="ECC"/>
            </div>
          </Slider>
        </div>
      </div>
    </div>
  );
}

export default Collaboration;

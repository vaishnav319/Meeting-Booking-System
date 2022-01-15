import React from 'react';
import HeroSlider from 'react-slick';
import { BiChevronRight, BiChevronLeft } from 'react-icons/bi';
import { PrevArrow, NextArrow } from './Arrow';
// Import css files
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const HeroCarousal = () => {
  const images = [
    'https://assets-global.website-files.com/5ce11396d0cadb67eb2cac0e/5faeca485f061f82a5bb5a29_Screen%20Shot%202020-11-13%20at%201.01.17%20PM.png',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=40',
    'https://blog.smarterservices.com/hubfs/SS%20Mentor%20Blog%20Graphic-1.jpg',
    'https://images.unsplash.com/photo-1616587894289-86480e533129?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=40',
  ];
  const settingsLg = {
    arrows: true,
    autoplay: true,
    centerMode: true,
    centerPadding: '150px',
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    nextArrow: (
      <div>
        <div className='next-slick-arrow bg-black  pr-5 bg-opacity-50 backdrop-filter rounded-lg  absolute'>
          <BiChevronRight />
        </div>
      </div>
    ),
    prevArrow: (
      <div>
        <div className='prev-slick-arrow bg-black pl-5 bg-opacity-50 backdrop-filter rounded-lg  absolute'>
          <BiChevronLeft />
        </div>
      </div>
    ),
  };
  return (
    <div className='w-auto'>
      <HeroSlider {...settingsLg}>
        {images.map((image) => (
          <div className='w-auto h-auto'>
            <img src={image} alt='testing' className='h-xl rounded-lg' />
          </div>
        ))}
      </HeroSlider>
    </div>
  );
};

export default HeroCarousal;

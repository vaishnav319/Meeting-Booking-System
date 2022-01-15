import React from 'react';
import { Link } from 'react-router-dom';
const HeroSection = () => {
  return (
    <div>
      <div className=''>
        <section className='container-1'>
          <div className='flex flex-col lg:flex-row md:flex-col-reverse  z-10 mt-16'>
            <div className='h-auto'>
              <img
                alt='test'
                className='px-1 h-lg  lg:h-xl lg:w-full md:w-2/3 md:mx-auto rounded-2xl shadow-2xl'
                src='https://melanininmedicinellc.com/wp-content/uploads/2020/05/Black-Men-Office-Video-Chat-768x768.jpg'
              />
            </div>
            <div className='lg:block h-auto max-w-lg md:max-w-xl md:mx-auto justify-evenly lg:my-auto p-5 md:flex md:justify-evenly'>
              <div>
                <h1 className=' text-3xl lg:text-4xl font-bold'>
                  Build a Community with{' '}
                  <span className='text-purple-800 text-3xl lg:text-4xl md:text-black'>
                    Acment
                  </span>
                </h1>
              </div>
              <div>
                <p className='text-xl lg:text-2xl lg:ml-0 md:ml-10 md:py-0'>
                  share the knowledge you have with others with live sessions by
                  booking here...
                  <div className='lg:px-5 p-2'>
                    <Link
                      to='/mentors'
                      className='p-1 shadow-2xl rounded-tr-3xl rounded-bl-3xl bg-purple-800 text-white lg:font-semibold lg:text-2xl text-sm'
                    >
                      Book a Meet{' '}
                    </Link>
                  </div>
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HeroSection;

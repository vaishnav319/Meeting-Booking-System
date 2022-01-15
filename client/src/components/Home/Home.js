import React from 'react';
import HeroCarousal from './HeroCarousal';
import { Link } from 'react-router-dom';
import Description from './Description';
import HeroSection from './HeroSection';
const Home = () => {
  return (
    <div
      style={{
        backgroundImage: 'url(/back.png)',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
        backgroundSize: 'cover',
      }}
    >
      <div>
        <HeroSection />
      </div>
      <div>
        <Description />
      </div>
      <div>
        <HeroCarousal />
      </div>
    </div>
  );
};

export default Home;

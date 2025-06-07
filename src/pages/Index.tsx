
import React, { useState, useEffect } from 'react';
import HeroSection from '../components/HeroSection';
import CandlestickChart from '../components/CandlestickChart';
import TechnicalIndicators from '../components/TechnicalIndicators';
import StorySection from '../components/StorySection';
import TimelineNavigation from '../components/TimelineNavigation';

const Index = () => {
  const [activeDecade, setActiveDecade] = useState('1950s');
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const decades = [
    { period: '1950s', title: 'The Cool Beginning', years: '1950-1959' },
    { period: '1970s', title: 'Industrial Growth', years: '1970-1979' },
    { period: '1990s', title: 'Urban Expansion', years: '1990-1999' },
    { period: '2010s', title: 'The Heat Intensifies', years: '2010-2019' },
    { period: '2020s', title: 'Breaking Points', years: '2020-Present' }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7]">
      <HeroSection scrollY={scrollY} />
      
      <TimelineNavigation 
        decades={decades}
        activeDecade={activeDecade}
        onDecadeChange={setActiveDecade}
      />

      <div className="container mx-auto px-4 py-8">
        <CandlestickChart activeDecade={activeDecade} />
        
        <TechnicalIndicators activeDecade={activeDecade} />
        
        {decades.map((decade, index) => (
          <StorySection
            key={decade.period}
            decade={decade}
            index={index}
            isActive={activeDecade === decade.period}
          />
        ))}
      </div>

      <footer className="bg-[#2c2c2c] text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">The Data Doesn't Lie</h3>
          <p className="text-lg opacity-80 max-w-2xl mx-auto">
            Chennai's climate story, told through the lens of financial technical analysis. 
            70 years of data reveals an undeniable trend - our city is heating up.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;

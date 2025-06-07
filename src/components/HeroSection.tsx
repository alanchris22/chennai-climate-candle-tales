
import React from 'react';
import { TrendingUp, Thermometer } from 'lucide-react';

interface HeroSectionProps {
  scrollY: number;
}

const HeroSection = ({ scrollY }: HeroSectionProps) => {
  const parallaxOffset = scrollY * 0.5;

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#d72638] via-[#ffb627] to-[#3366cc]">
      <div 
        className="absolute inset-0 opacity-20"
        style={{ transform: `translateY(${parallaxOffset}px)` }}
      >
        <div className="w-full h-full bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] animate-pulse"></div>
      </div>
      
      <div className="relative z-10 text-center text-white px-4">
        <div className="flex items-center justify-center mb-6">
          <Thermometer className="w-16 h-16 mr-4" />
          <TrendingUp className="w-16 h-16" />
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold mb-6 font-serif">
          The Climate<br />
          <span className="text-[#ffb627]">Candle</span>
        </h1>
        
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
          Chennai's 70-year temperature story told through the language of financial markets
        </p>
        
        <div className="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 border border-white/20">
          <span className="text-lg">Scroll to begin the journey</span>
          <div className="ml-4 w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

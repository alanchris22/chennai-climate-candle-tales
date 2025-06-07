
import React from 'react';
import { Button } from '@/components/ui/button';

interface Decade {
  period: string;
  title: string;
  years: string;
}

interface TimelineNavigationProps {
  decades: Decade[];
  activeDecade: string;
  onDecadeChange: (decade: string) => void;
}

const TimelineNavigation = ({ decades, activeDecade, onDecadeChange }: TimelineNavigationProps) => {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[#e0e0e0] py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#2c2c2c]">Climate Timeline</h2>
          
          <div className="flex gap-2 overflow-x-auto">
            {decades.map((decade) => (
              <Button
                key={decade.period}
                variant={activeDecade === decade.period ? "default" : "outline"}
                size="sm"
                onClick={() => onDecadeChange(decade.period)}
                className={`whitespace-nowrap ${
                  activeDecade === decade.period 
                    ? 'bg-[#d72638] hover:bg-[#d72638]/90 text-white' 
                    : 'border-[#d72638] text-[#d72638] hover:bg-[#d72638]/10'
                }`}
              >
                <div className="text-center">
                  <div className="font-bold">{decade.period}</div>
                  <div className="text-xs opacity-80">{decade.years}</div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineNavigation;

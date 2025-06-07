
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, Factory, Building, Thermometer, AlertTriangle } from 'lucide-react';

interface Decade {
  period: string;
  title: string;
  years: string;
}

interface StorySectionProps {
  decade: Decade;
  index: number;
  isActive: boolean;
}

const StorySection = ({ decade, index, isActive }: StorySectionProps) => {
  const getIcon = (period: string) => {
    switch (period) {
      case '1950s': return <Thermometer className="w-8 h-8" />;
      case '1970s': return <Factory className="w-8 h-8" />;
      case '1990s': return <Building className="w-8 h-8" />;
      case '2010s': return <TrendingUp className="w-8 h-8" />;
      case '2020s': return <AlertTriangle className="w-8 h-8" />;
      default: return <Thermometer className="w-8 h-8" />;
    }
  };

  const getStory = (period: string) => {
    const stories = {
      '1950s': {
        temperature: '26.8°C',
        change: 'Baseline',
        rsi: '45',
        story: 'In the 1950s, Chennai enjoyed relatively cooler temperatures. The city was smaller, with more green cover and less concrete. Our RSI shows neutral momentum - temperatures fluctuated naturally within historical ranges.',
        keyEvents: ['Madras Presidency era', 'Limited industrialization', 'Abundant water bodies']
      },
      '1970s': {
        temperature: '27.4°C',
        change: '+0.6°C',
        rsi: '52',
        story: 'The 1970s marked the beginning of industrial growth. Like a stock showing early momentum, Chennai\'s temperature RSI started climbing above 50. Factory emissions and urban development began their slow but steady impact.',
        keyEvents: ['Industrial corridor development', 'Port expansion', 'First major IT companies']
      },
      '1990s': {
        temperature: '28.1°C',
        change: '+1.3°C',
        rsi: '63',
        story: 'The 1990s economic liberalization was Chennai\'s "bull run" - but for temperatures. Our technical indicators show sustained upward momentum. The RSI approached overbought territory as concrete replaced green spaces.',
        keyEvents: ['IT boom begins', 'Massive construction', 'Water table depletion starts']
      },
      '2010s': {
        temperature: '29.2°C',
        change: '+2.4°C',
        rsi: '74',
        story: 'The 2010s show clear "overbought" conditions - RSI above 70. Like a overheated stock market, Chennai\'s climate entered dangerous territory. Bollinger Bands widened, showing increased volatility.',
        keyEvents: ['Metro construction', 'IT corridor expansion', '2015 Chennai floods paradox']
      },
      '2020s': {
        temperature: '30.1°C',
        change: '+3.3°C',
        rsi: '82',
        story: 'We\'re now in extreme overbought territory. The RSI at 82 signals a climate "bubble" - unsustainable heating that demands immediate intervention. Technical analysis suggests we\'re past critical resistance levels.',
        keyEvents: ['COVID lockdown brief cooling', 'Record heat waves', 'Climate emergency declared']
      }
    };
    
    return stories[period as keyof typeof stories] || stories['1950s'];
  };

  const story = getStory(decade.period);

  return (
    <div className={`py-12 transition-all duration-500 ${isActive ? 'opacity-100' : 'opacity-70'}`}>
      <Card className={`max-w-4xl mx-auto ${isActive ? 'ring-2 ring-[#d72638] shadow-xl' : 'shadow-lg'}`}>
        <CardContent className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Story Content */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="text-[#d72638]">
                  {getIcon(decade.period)}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-[#2c2c2c]">
                    {decade.title}
                  </h3>
                  <p className="text-[#666]">{decade.years}</p>
                </div>
              </div>
              
              <p className="text-lg text-[#2c2c2c] mb-6 leading-relaxed">
                {story.story}
              </p>
              
              <div className="space-y-2">
                <h4 className="font-semibold text-[#2c2c2c] mb-3">Key Events:</h4>
                {story.keyEvents.map((event, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-[#ffb627] rounded-full"></div>
                    <span className="text-sm text-[#666]">{event}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Technical Analysis Sidebar */}
            <div className="space-y-4">
              <div className="bg-[#f7f7f7] rounded-lg p-4">
                <h4 className="font-semibold text-[#2c2c2c] mb-3">Technical Analysis</h4>
                
                <div className="space-y-3">
                  <div>
                    <div className="text-sm text-[#666]">Avg Temperature</div>
                    <div className="text-xl font-bold text-[#d72638]">{story.temperature}</div>
                    <div className="text-sm text-[#666]">({story.change} from 1950s)</div>
                  </div>
                  
                  <div>
                    <div className="text-sm text-[#666]">Climate RSI</div>
                    <div className="text-xl font-bold text-[#2c2c2c]">{story.rsi}</div>
                    <div className={`text-sm ${parseInt(story.rsi) > 70 ? 'text-[#d72638]' : parseInt(story.rsi) < 30 ? 'text-[#3366cc]' : 'text-[#ffb627]'}`}>
                      {parseInt(story.rsi) > 70 ? 'Overbought' : parseInt(story.rsi) < 30 ? 'Oversold' : 'Neutral'}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-[#e0e0e0]">
                    <div className="text-sm text-[#666]">Market Signal</div>
                    <div className={`text-sm font-semibold ${parseInt(story.rsi) > 70 ? 'text-[#d72638]' : 'text-[#3366cc]'}`}>
                      {parseInt(story.rsi) > 70 ? '🔴 SELL (Cool Down!)' : '🟢 BUY (Sustainable)'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StorySection;

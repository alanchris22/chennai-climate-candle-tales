
import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface TechnicalIndicatorsProps {
  activeDecade: string;
}

const TechnicalIndicators = ({ activeDecade }: TechnicalIndicatorsProps) => {
  const rsiData = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      year: 2005 + i,
      rsi: 30 + Math.random() * 40 + (i * 1.5), // Trending upward RSI
      bollingerUpper: 32 + (i * 0.1),
      bollingerLower: 26 + (i * 0.1),
      bollingerMid: 29 + (i * 0.1)
    }));
  }, []);

  const currentRSI = rsiData[rsiData.length - 1]?.rsi || 70;
  const rsiSignal = currentRSI > 70 ? 'Overbought' : currentRSI < 30 ? 'Oversold' : 'Neutral';
  const rsiColor = currentRSI > 70 ? '#d72638' : currentRSI < 30 ? '#3366cc' : '#ffb627';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* RSI Chart */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#2c2c2c] mb-2">
            Temperature RSI (Relative Strength Index)
          </h3>
          <p className="text-sm text-[#666] mb-4">
            Measures momentum of temperature changes. Above 70 indicates "overheating"
          </p>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className={`w-3 h-3 rounded-full`} style={{ backgroundColor: rsiColor }}></div>
              <span className="font-semibold">{rsiSignal}</span>
              <span className="text-sm text-[#666]">({currentRSI.toFixed(1)})</span>
            </div>
            {currentRSI > 70 && <TrendingUp className="w-5 h-5 text-[#d72638]" />}
            {currentRSI < 30 && <TrendingDown className="w-5 h-5 text-[#3366cc]" />}
            {currentRSI >= 30 && currentRSI <= 70 && <Minus className="w-5 h-5 text-[#ffb627]" />}
          </div>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rsiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" stroke="#666" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 100]} stroke="#666" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              
              <ReferenceLine y={70} stroke="#d72638" strokeDasharray="3 3" label="Overbought" />
              <ReferenceLine y={30} stroke="#3366cc" strokeDasharray="3 3" label="Oversold" />
              <ReferenceLine y={50} stroke="#ccc" strokeDasharray="1 1" />
              
              <Line 
                type="monotone" 
                dataKey="rsi" 
                stroke="#d72638" 
                strokeWidth={3}
                dot={{ fill: '#d72638', strokeWidth: 0, r: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bollinger Bands */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="mb-4">
          <h3 className="text-xl font-bold text-[#2c2c2c] mb-2">
            Bollinger Bands on HWMA
          </h3>
          <p className="text-sm text-[#666] mb-4">
            Shows volatility bands around humidity-weighted moving average
          </p>
        </div>
        
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={rsiData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
              <XAxis dataKey="year" stroke="#666" tick={{ fontSize: 11 }} />
              <YAxis stroke="#666" tick={{ fontSize: 11 }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white',
                  border: '1px solid #e0e0e0',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
                formatter={(value, name) => [`${value}°C`, name]}
              />
              
              <Line 
                type="monotone" 
                dataKey="bollingerUpper" 
                stroke="#d72638" 
                strokeWidth={1}
                strokeDasharray="2 2"
                dot={false}
                name="Upper Band"
              />
              <Line 
                type="monotone" 
                dataKey="bollingerMid" 
                stroke="#ffb627" 
                strokeWidth={2}
                dot={false}
                name="HWMA"
              />
              <Line 
                type="monotone" 
                dataKey="bollingerLower" 
                stroke="#3366cc" 
                strokeWidth={1}
                strokeDasharray="2 2"
                dot={false}
                name="Lower Band"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        
        <div className="mt-4 grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-[#d72638]">
              {rsiData[rsiData.length - 1]?.bollingerUpper.toFixed(1)}°C
            </div>
            <div className="text-xs text-[#666]">Upper Band</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#ffb627]">
              {rsiData[rsiData.length - 1]?.bollingerMid.toFixed(1)}°C
            </div>
            <div className="text-xs text-[#666]">HWMA</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#3366cc]">
              {rsiData[rsiData.length - 1]?.bollingerLower.toFixed(1)}°C
            </div>
            <div className="text-xs text-[#666]">Lower Band</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalIndicators;

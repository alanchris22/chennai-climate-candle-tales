
import React, { useMemo } from 'react';
import { ComposedChart, Bar, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface CandlestickChartProps {
  activeDecade: string;
}

const CandlestickChart = ({ activeDecade }: CandlestickChartProps) => {
  // Mock data based on your Python script structure
  const mockData = useMemo(() => {
    const baseTemp = 28;
    const years = Array.from({ length: 70 }, (_, i) => 1955 + i);
    
    return years.map((year, index) => {
      const trend = index * 0.03; // 0.03°C per year trend
      const seasonal = Math.sin((index % 12) * Math.PI / 6) * 2;
      const noise = (Math.random() - 0.5) * 3;
      
      const avgTemp = baseTemp + trend + seasonal + noise;
      const humidity = 65 + (Math.random() - 0.5) * 10;
      
      return {
        year,
        temperature: Number(avgTemp.toFixed(1)),
        open: Number((avgTemp - 1 + Math.random()).toFixed(1)),
        high: Number((avgTemp + 2 + Math.random()).toFixed(1)),
        low: Number((avgTemp - 2 + Math.random()).toFixed(1)),
        close: Number((avgTemp + 1 + Math.random()).toFixed(1)),
        humidity: Number(humidity.toFixed(1)),
        hwma: Number((avgTemp + trend * 0.5).toFixed(1))
      };
    });
  }, []);

  const filteredData = useMemo(() => {
    const decadeRanges = {
      '1950s': [1950, 1959],
      '1970s': [1970, 1979],
      '1990s': [1990, 1999],
      '2010s': [2010, 2019],
      '2020s': [2020, 2025]
    };
    
    const [start, end] = decadeRanges[activeDecade as keyof typeof decadeRanges] || [1950, 2025];
    return mockData.filter(d => d.year >= start && d.year <= end);
  }, [mockData, activeDecade]);

  const CustomCandlestick = (props: any) => {
    const { payload, x, y, width } = props;
    if (!payload) return null;
    
    const { open, high, low, close } = payload;
    const isRising = close > open;
    const color = isRising ? '#d72638' : '#3366cc';
    const bodyHeight = Math.abs(close - open) * 10;
    const bodyY = y - Math.max(close, open) * 10;
    
    return (
      <g>
        {/* Wick */}
        <line
          x1={x + width / 2}
          y1={y - high * 10}
          x2={x + width / 2}
          y2={y - low * 10}
          stroke={color}
          strokeWidth={1}
        />
        {/* Body */}
        <rect
          x={x + 2}
          y={bodyY}
          width={width - 4}
          height={bodyHeight}
          fill={isRising ? color : 'white'}
          stroke={color}
          strokeWidth={1}
        />
      </g>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-[#2c2c2c] mb-2">
          Chennai Temperature Candlestick Chart - {activeDecade}
        </h2>
        <p className="text-[#666] text-sm">
          Each candle shows monthly temperature OHLC (Open, High, Low, Close). 
          Blue bars represent humidity levels.
        </p>
      </div>
      
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={filteredData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
            <XAxis 
              dataKey="year" 
              stroke="#666"
              tick={{ fontSize: 12 }}
            />
            <YAxis 
              yAxisId="temp"
              stroke="#666"
              tick={{ fontSize: 12 }}
              label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
            />
            <YAxis 
              yAxisId="humidity"
              orientation="right"
              stroke="#a2d5f2"
              tick={{ fontSize: 12 }}
              label={{ value: 'Humidity (%)', angle: 90, position: 'insideRight' }}
            />
            
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'white',
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                fontSize: '12px'
              }}
              formatter={(value, name) => [
                `${value}${name.includes('humidity') ? '%' : '°C'}`,
                name
              ]}
            />
            
            {/* Humidity bars */}
            <Bar 
              yAxisId="humidity"
              dataKey="humidity" 
              fill="#a2d5f2" 
              opacity={0.3}
              name="Humidity"
            />
            
            {/* HWMA line */}
            <Line 
              yAxisId="temp"
              type="monotone" 
              dataKey="hwma" 
              stroke="#ffb627" 
              strokeWidth={2}
              dot={false}
              name="HWMA (10-year)"
            />
            
            {/* Temperature trend line */}
            <Line 
              yAxisId="temp"
              type="monotone" 
              dataKey="temperature" 
              stroke="#d72638" 
              strokeWidth={3}
              dot={{ fill: '#d72638', strokeWidth: 0, r: 3 }}
              name="Avg Temperature"
            />
            
            <ReferenceLine yAxisId="temp" y={30} stroke="#ff6b6b" strokeDasharray="5 5" />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
      
      <div className="mt-4 flex items-center gap-6 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#d72638] rounded"></div>
          <span>Rising Temperature</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#3366cc] rounded"></div>
          <span>Cooling Period</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#a2d5f2] opacity-30 rounded"></div>
          <span>Humidity</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-1 bg-[#ffb627] rounded"></div>
          <span>10-Year HWMA</span>
        </div>
      </div>
    </div>
  );
};

export default CandlestickChart;

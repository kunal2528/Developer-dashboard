import { enqueueSnackbar } from 'notistack';
import React, { useState, useEffect } from 'react';
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import 'tailwindcss/tailwind.css';

const colorGradient = (color) => (
  <linearGradient id={`color${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
    <stop offset="95%" stopColor={color} stopOpacity={0}/>
  </linearGradient>
);

const TinyLineChart = ({ data }) => {
  const [startDate, setStartDate] = useState('2024-05-06');
  const [endDate, setEndDate] = useState('2024-05-10');
  
  const formatDate = (dateStr) => {
    const [day, month] = dateStr.split(' ');
    const monthIndex = new Date(Date.parse(month + " 1, 2024")).getMonth() + 1; 
    const formattedDate = new Date(`2024-${monthIndex.toString().padStart(2, '0')}-${day.padStart(2, '0')}`);
    return formattedDate;
  };

  const filteredData = data.filter(item => {
    const itemDate = formatDate(item.date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    return itemDate >= start && itemDate <= end;
  });

  useEffect(() => {
    if (new Date(endDate) <= new Date(startDate)) {
      setEndDate(new Date(new Date(startDate).setDate(new Date(startDate).getDate() + 2)).toISOString().split('T')[0]);
    }
    //eslint-disable-next-line
  }, [startDate]);

  const handleEndDate = (e) => {
    setEndDate(e.target.value);
    enqueueSnackbar('End date changed. Chart recreated.', { 
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });
  }

  return (
    <div className='h-full bg-gray-900 rounded-lg shadow-xl' id='daywise'>
      <div className="p-4 flex justify-between items-center border-b border-gray-700">
        <div>
          <h2 className="text-xl font-semibold text-white">Day Wise Activity </h2>
          <h4 className="text-xs font-semibold text-slate-400">4% more in may month</h4>
        </div>
        <div className="flex flex-col lg:flex-row items-center justify-center space-x-4">
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => {
              const newStartDate = e.target.value;
              setStartDate(newStartDate);
              setEndDate(new Date(new Date(newStartDate).setDate(new Date(newStartDate).getDate() + 2)).toISOString().split('T')[0]);
              enqueueSnackbar('Start date changed. Chart recreated.', { 
                variant: 'success',
                autoHideDuration: 3000,
                anchorOrigin: {
                  vertical: "top",
                  horizontal: "right",
                },
              });
            }} 
            className="bg-gray-700 text-white px-2 py-1 rounded"
            min="2024-05-06" 
            max="2024-07-19"
          />
          <span className="text-white">to</span>
          <input 
            type="date" 
            value={endDate} 
            onChange={(e)=>handleEndDate(e)} 
            className="bg-gray-700 text-white px-2 py-1 rounded"
            min="2024-05-06" 
            max="2024-07-19"
          />
        </div>
      </div>
      <div className="w-full h-72 mt-4 p-4">
        <ResponsiveContainer>
          <AreaChart data={filteredData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <defs>
              {colorGradient('#8884d8')}
              {colorGradient('#82ca9d')}
              {colorGradient('#ffc658')}
              {colorGradient('#d0ed57')}
            </defs>
            <XAxis dataKey="date" tick={{ fill: '#ffffff' }} />
            <Tooltip />
            <Area type="monotone" dataKey="rishi@devdynamics.ai" stroke="#8884d8" fillOpacity={1} fill="url(#color8884d8)" />
            <Area type="monotone" dataKey="ritik@devdynamics.ai" stroke="#82ca9d" fillOpacity={1} fill="url(#color82ca9d)" />
            <Area type="monotone" dataKey="avijit@devdynamics.ai" stroke="#ffc658" fillOpacity={1} fill="url(#colorffc658)" />
            <Area type="monotone" dataKey="arvind.shelke@devdynamics.ai" stroke="#d0ed57" fillOpacity={1} fill="url(#colorD0ed57)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default TinyLineChart;


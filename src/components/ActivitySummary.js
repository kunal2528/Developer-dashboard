import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const ActivitySummary = ({ data, activityMeta }) => {
  const totals = {
    'PR Open': 0,
    'PR Merged': 0,
    'Commits': 0,
    'PR Reviewed': 0,
    'PR Comments': 0,
    'Incident Alerts': 0,
    'Incidents Resolved': 0,
  };

  data.forEach((user) => {
    const activities = user.activities;
    Object.keys(activities).forEach((activityName) => {
      if (totals.hasOwnProperty(activityName)) {
        totals[activityName] += activities[activityName].value || 0;
      }
    });
  });

  const activityDetails = Object.keys(totals).map((key) => {
    const meta = activityMeta.find((meta) => meta.label === key);
    return {
      label: key,
      value: totals[key],
      color: meta ? meta.fillColor : '#000000',
    };
  });

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % activityDetails.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + activityDetails.length) % activityDetails.length
    );
  };

  const regularStatistics = [
    {val: '18%', type: 'up'},
    {val: '31%', type: 'down'},
    {val: '23%', type: 'down'},
    {val: '7%', type: 'up'},
    {val: '3%', type: 'down'},
    {val: '100%', type: 'down'},
    {val: '100%', type: 'down'},
  ]

  return (
    <div className="relative bg-slate-300 rounded-lg overflow-hidden shadow-2xl" style={{height: '400px'}} id='activitysummary'>
      <div className="flex justify-between items-center mb-4 bg-slate-900 p-2">
        <button
          onClick={handlePrev}
          className="font-bold text-slate-300 hover:scale-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m18.75 4.5-7.5 7.5 7.5 7.5m-6-15L5.25 12l7.5 7.5" />
          </svg>
        </button>

        <div>
          <h2 className="text-white font-semibold text-xl text-center">Activity Summary</h2>
          <h3 className="text-white text-xs font-normal text-center">(Total contribution of each activity)</h3>
        </div>

        <button
          onClick={handleNext}
          className="font-bold text-slate-300 hover:scale-150"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
            <path strokeLinecap="round" strokeLinejoin="round" d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5" />
          </svg>
        </button>
      </div>

      <div className="p-4">
        <div className="relative flex transition-transform duration-500 ease-in-out drop-shadow-2xl">
          {activityDetails.map((activity, index) => {
            const offset = (index - currentIndex + activityDetails.length) % activityDetails.length;
            const isActive = offset === 0;
            const transform = `translateX(${offset * 30}%) scale(${
              1 - offset * 0.1
            })`;
            const zIndex = 10 - offset;
            const gradientId = `gradient-${index}`;

            return (
              <div
                key={index}
                className={`absolute transition-all duration-1000 ease-in-out`}
                style={{
                  transform,
                  zIndex,
                  opacity: isActive ? 1 : 0.8,
                  marginLeft: offset * 20 + '%',
                  marginRight: offset * 20 + '%',
                }}
              >
                <div className="w-72 p-4 bg-gray-900 rounded-lg shadow-lg">
                  <div className="absolute inset-0 opacity-40 pointer-events-none">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={[
                          { value: 0 },
                          { value: activity.value },
                          { value: 100 },
                        ]}
                      >
                        <defs>
                          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor={activity.color} stopOpacity={0.8} />
                            <stop offset="95%" stopColor={activity.color} stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <Area
                          type="monotone"
                          dataKey="value"
                          stroke={activity.color}
                          fill={`url(#${gradientId})`}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="relative z-10 h-64 flex flex-col justify-between py-2">
                    <h3
                      className="text-xl font-bold mb-2 relative"
                      style={{ color: 'whitesmoke' }}
                    >
                      {activity.label}
                      <span
                        className="absolute -bottom-1 left-0 h-0.5"
                        style={{
                          width: '40%',
                          backgroundColor: activity.color,
                        }}
                      ></span>
                    </h3>
                    <div className="flex items-center justify-between">
                      <p
                        className="text-4xl font-semibold"
                        style={{ color: activity.color }}
                      >
                        {activity.value}
                      </p>
                      <p
                        className="text-sm font-lighter"
                        style={{ color: regularStatistics[index].type === 'down' ? 'red' : 'green', marginLeft: '10px' }}
                      >
                        {regularStatistics[index].type === 'down' ? 
                          <span className="text-red-500">↓</span> : <span className="text-green-500">↑</span>} {(regularStatistics[index].val)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ActivitySummary;

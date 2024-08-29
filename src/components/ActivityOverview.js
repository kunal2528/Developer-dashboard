import React, { useState } from 'react';
import { AreaChart, Area, ResponsiveContainer } from 'recharts';

const colorGradient = (color) => (
  <linearGradient id={`color${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
    <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
    <stop offset="95%" stopColor={color} stopOpacity={0}/>
  </linearGradient>
);

const ActivityOverview = ({ data }) => {
  const [selectedUserIndex, setSelectedUserIndex] = useState(0);

  const icons = ["https://cdn-icons-png.flaticon.com/128/1350/1350286.png", "https://cdn-icons-png.flaticon.com/128/5288/5288474.png", "https://cdn-icons-png.flaticon.com/128/2521/2521971.png", "https://cdn-icons-png.flaticon.com/128/3207/3207604.png", "https://cdn-icons-png.flaticon.com/128/3385/3385391.png", "https://cdn-icons-png.flaticon.com/128/16221/16221642.png", "https://cdn-icons-png.flaticon.com/128/6071/6071045.png"];

  const handleUserChange = (event) => {
    setSelectedUserIndex(Number(event.target.value));
  };

  const selectedUser = data[selectedUserIndex];
  const previousUser = selectedUserIndex > 0 ? data[selectedUserIndex - 1] : null;

  if (!selectedUser || !selectedUser.activities) {
    return <div>No activities found for the selected user.</div>;
  }

  const mockData = [
    { date: '2023-08-20', value: 10 },
    { date: '2023-08-21', value: 20 },
    { date: '2023-08-22', value: 30 },
    { date: '2023-08-23', value: 40 },
    { date: '2023-08-24', value: 50 },
  ];

  const adjustDataForChange = (data, increase) => {
    if (increase) {
      return data;
    } else {
      return data.slice().reverse();
    }
  };

  return (
    <div
      className="pb-4 bg-gray-900 text-white rounded-lg shadow-md"
      style={{ overflow: 'auto', maxHeight: '400px' }}
      id='overview'
    >
      <div className="flex justify-between items-center mb-4 sticky top-0 bg-gray-900 p-4">
        <h1 className="text-lg lg:text-xl font-bold">Employee Overview</h1>
        <div>
          <label htmlFor="userSelect" className="sr-only">Select User:</label>
          <select
            id="userSelect"
            value={selectedUserIndex}
            onChange={handleUserChange}
            className="mt-1 p-2 border border-gray-700 rounded-md bg-gray-800 text-white"
          >
            {data.map((user, index) => (
              <option key={index} value={index}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 px-4">
        {Object.entries(selectedUser.activities).map(([activityName, activityData], index) => {
          const previousValue = previousUser && previousUser.activities
            ? previousUser.activities[activityName]?.value || 0
            : 0;
          const currentValue = activityData.value;
          const change = currentValue - previousValue;
          const isIncreasing = change > 0;
          const adjustedData = adjustDataForChange(mockData, isIncreasing);

          return (
            <div key={activityName} className="p-4 bg-gray-800 rounded shadow-md hover:bg-gray-900 hover:scale-110">
              <div className='flex items-center mb-2'>
                <img src={icons[index]} alt="icon" width={30} />
                <h2 className="text-lg font-bold ml-2">{activityName}</h2>
              </div>
              <p className="text-sm">Count: {currentValue}</p>
              <p className="flex items-center text-sm">
                {change > 0 ? (
                  <span className="text-green-500 flex items-center ml-1">
                    ↑ {change} %
                  </span>
                ) : (
                  <span className="text-red-500 flex items-center ml-1">
                    ↓ {Math.abs(change)} %
                  </span>
                )}
              </p>
              
              <div className="mt-2">
                <ResponsiveContainer width="100%" height={100}>
                  <AreaChart data={adjustedData}>
                    <defs>
                      {colorGradient(activityData.color)}
                    </defs>
                    <Area
                      type="monotone"
                      dataKey="value"
                      stroke={activityData.color}
                      fill={`url(#color${activityData.color.replace('#', '')})`}
                      fillOpacity={1}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ActivityOverview;

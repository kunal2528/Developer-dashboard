// import React from 'react';
// import {
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer
// } from 'recharts';

// const CustomTooltip = ({ active, payload, label }) => {
//   if (active && payload && payload.length) {
//     return (
//       <div className="bg-white p-2 border rounded shadow-lg">
//         <p className="font-semibold">{`Activity: ${label}`}</p>
//         {payload.map((entry, index) => (
//           <p key={`tooltip-item-${index}`} style={{ color: entry.color }}>
//             {`${entry.name}: ${entry.value}`}
//           </p>
//         ))}
//       </div>
//     );
//   }

//   return null;
// };

// const GeneralLineChart = ({ data, highlightUser, activityMeta }) => {
//   const formattedData = activityMeta.map((activity, index) => {
//     return {
//       label: activity.label,
//       ...data.reduce((acc, user) => {
//         acc[user.name] = user.activities[activity.label]?.value || 0;
//         return acc;
//       }, []),
//       users: [data]
//     };
//   });

//   console.log(formattedData, data);

//   return (
//     <div className="w-96 h-96">
//       <ResponsiveContainer width="100%" height="100%">
//         <LineChart data={formattedData}>
//           <XAxis dataKey="label" />
//           <YAxis />
//           <Tooltip />
//           {/* <Tooltip content={<CustomTooltip />} /> */}
//           {data.map((user, index) => (
//             <Line
//               key={index}
//               type="monotone"
//               dataKey={user.name}
//               stroke={activityMeta[index].fillColor}
//               strokeOpacity={highlightUser === user.name ? 1 : 0.3}
//               strokeWidth={highlightUser === user.name ? 3 : 1}
//               name={user.name} 
//               dot={false}
//             />
//           ))}
//         </LineChart>
//       </ResponsiveContainer>
//     </div>
//   );
// };

// export default GeneralLineChart;

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-2 border rounded shadow-lg">
        <p className="font-semibold">{`Activity: ${label}`}</p>
        {payload.map((entry, index) => (
          <p key={`tooltip-item-${index}`} style={{ color: entry.stroke }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    );
  }

  return null;
};

const GeneralLineChart = ({ data, highlightUser, activityMeta }) => {
  const combinedData = [];
  const activityLabels = Array.from(new Set(data.flatMap(user => Object.keys(user.activities))));

  activityLabels.forEach(activityLabel => {
    const entry = { activity: activityLabel };
    data.forEach(user => {
      entry[user.name] = user.activities[activityLabel]?.value || 0;
    });
    combinedData.push(entry);
  });

  return (
    <div className="w-screen h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={combinedData}>
          <XAxis dataKey="activity" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          {data.map((user, index) => (
            <Line
              key={user.name}
              type="monotone"
              dataKey={user.name}
              stroke={activityMeta[index].fillColor}
              strokeOpacity={highlightUser === user.name ? 1 : 0.3}
              strokeWidth={highlightUser === user.name ? 3 : 1}
              name={user.name}
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GeneralLineChart;

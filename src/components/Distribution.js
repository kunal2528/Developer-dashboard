import React from 'react';
import { BarChart, Bar, PieChart, Pie, Tooltip, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', Improvements: 10, 'Feature Development': 20, Support: 10, Bugs: 20 },
  { name: 'Feb', Improvements: 30, 'Feature Development': 50, Support: 10, Bugs: 10 },
  { name: 'Mar', Improvements: 5, 'Feature Development': 8, Support: 15, Bugs: 15 },
  { name: 'Apr', Improvements: 10, 'Feature Development': 30, Support: 5, Bugs: 5 },
  { name: 'May', Improvements: 23, 'Feature Development': 40, Support: 5, Bugs: 5 },
];

const pieData = [
  { name: 'Improvements', value: 38, fill: '#3B82F6' },
  { name: 'Feature Development', value: 29, fill: '#10B981' },
  { name: 'Support', value: 20, fill: '#EC4899' },
  { name: 'Bugs', value: 13, fill: '#6366F1' },
];

const Distribution = () => {
  return (
    <div className="flex justify-center items-center border-2 p-4 rounded-lg shadow-xl hover:shadow-2xl bg-slate-200" id='distribution'>
      <div className="w-full max-w-4xl">
        <h2 className="text-2xl font-semibold mb-8 ml-9">Investment Distribution</h2>
        <div className="flex flex-col lg:flex-row items-center">
          <div className="w-full lg:w-2/3">
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Improvements" stackId="a" fill="#3B82F6" barSize={30} />
                <Bar dataKey="Feature Development" stackId="a" fill="#10B981" />
                <Bar dataKey="Support" stackId="a" fill="#EC4899" />
                <Bar dataKey="Bugs" stackId="a" fill="#6366F1" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="w-full lg:w-1/3">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={pieData} dataKey="value" nameKey="name" outerRadius={80} fill="#8884d8" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Distribution;

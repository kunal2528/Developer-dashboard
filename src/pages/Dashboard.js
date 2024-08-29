import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ActivitySummary from '../components/ActivitySummary';
import TinyLineChart from '../components/TinyLineChart';
import ActivityTable from '../components/ActivityTable';
import Banner from '../components/Banner';
import Distribution from '../components/Distribution';
import ActivityOverview from '../components/ActivityOverview';
import Tour from 'reactour'

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [rawData, setRawData] = useState();
  const [activityMeta, setActivityMeta] = useState([]);
  const [isTourOpen, setIsTourOpen] = useState(false);

  const formatDate = (dateString) => {
    const options = { day: 'numeric', month: 'long' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', options);
  };

  useEffect(() => {
    axios.get('/data/sample-data.json')
      .then((response) => {
        const apiData = response.data;
        setRawData(apiData.data);

        if (apiData && apiData.data && apiData.data.AuthorWorklog) {
          const { activityMeta, rows } = apiData.data.AuthorWorklog;
          
          if (rows && activityMeta) {
            const processedData = rows.map((row) => {
              const activities = row.totalActivity.reduce((acc, item) => {
                const activity = activityMeta.find(meta => meta.label === item.name);
                if (activity) {
                  acc[item.name] = {
                    value: parseInt(item.value, 10),
                    color: activity.fillColor
                  };
                }
                return acc;
              }, {});

              return { name: row.name, activities, activeDays: row.activeDays.days };
            });

            setData(processedData);
            setActivityMeta(activityMeta);
          } else {
            console.error('Missing rows or activityMeta:', apiData.data.AuthorWorklog);
          }
        } else {
          console.error('Unexpected data structure:', apiData);
        }
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const transformData = (rows) => {
    const dates = [];
    const userStats = {};
  
    rows.forEach((user) => {
      user.dayWiseActivity.forEach((activity) => {
        const formattedDate = formatDate(activity.date);
        if (!dates.includes(formattedDate)) {
          dates.push(formattedDate);
        }
        if (!userStats[formattedDate]) {
          userStats[formattedDate] = {};
        }
        const userDateStats = userStats[formattedDate];
        activity.items.children.forEach((item) => {
          if (!userDateStats[user.name]) {
            userDateStats[user.name] = 0;
          }
          userDateStats[user.name] += parseInt(item.count, 10);
        });
      });
    });
  
    return dates.map((date) => {
      const dateStats = { date };
      rows.forEach((user) => {
        dateStats[user.name] = userStats[date] && userStats[date][user.name] ? userStats[date][user.name] : 0;
      });
      return dateStats;
    });
  };
  
  const allInOneChart = transformData(rawData?.AuthorWorklog?.rows || []);

  const steps = [
    {
      selector: '#daywise',
      content: 'This chart represents day wise activity of all employees w.r.t date',
    },
    {
      selector: '#activitysummary',
      content: 'This summary represents total contribution of all employees for each activity.',
    },
    {
      selector: '#distribution',
      content: 'This chart represents activity distribution w.r.t period.',
    },
    {
      selector: '#overview',
      content: 'Here you will get employee overview of each employee w.r.t activities.',
    },
    {
      selector: '#activitytable',
      content: 'This table gives information of all employees.',
    },
  ]

  return (
    <div className="container p-6 max-w-full">
      <Tour
        steps={steps}
        isOpen={isTourOpen}
        onRequestClose={() => setIsTourOpen(false)} 
        rounded={10}
        accentColor="#060b27"
        nextButton="Next"
        prevButton="Back"
        lastStepNextButton="Finish"
        showNumber={true}
        showButtons={true}
        showNavigation={true}
        disableInteraction={false}
        disableDotsNavigation={false}
        disableKeyboardNavigation={false}
        disableFocusLock={false}
      />
      <Banner isTourOpen={isTourOpen} setIsTourOpen={setIsTourOpen} />
      <div className="flex flex-col lg:flex-row lg:justify-between gap-4">
        <div className="flex-1 lg:w-1/2">
          <TinyLineChart data={allInOneChart} />
        </div>
        <div className="flex-1 lg:w-1/2">
          <ActivitySummary data={data} activityMeta={activityMeta} />
        </div>
      </div>
      <div className='flex flex-col lg:flex-row lg:justify-between gap-4 mt-6 mb-6'>
        <div className="lg:w-[60%]">
          <Distribution />
        </div>
        <div className="lg:w-[40%]">
          <ActivityOverview data={data} />
        </div>
      </div>
      <ActivityTable rawData={rawData} data={data} activityMeta={activityMeta} />
    </div>
  );
};

export default Dashboard;

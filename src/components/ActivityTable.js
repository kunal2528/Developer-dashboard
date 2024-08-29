import React, { useState } from 'react';
import GeneralLineChart from './GeneralLineChart';
import DetailsModal from './DetailsModal';
import { enqueueSnackbar } from 'notistack';

const ActivityTable = ({ rawData, data, activityMeta }) => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(
        () => {
          console.log('Text copied to clipboard');
        },
        (err) => {
          console.error('Failed to copy text: ', err);
        }
      );
    } else {
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
    }
  };

  const handleCopy = (text) => {
    copyToClipboard(text);
    setCopied(true);
    enqueueSnackbar('Copied to clipboard.', { 
      variant: 'success',
      autoHideDuration: 3000,
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
    });

    setTimeout(() => setCopied(false), 2000);
  };

  const handleSeeDetails = (user) => {
    setSelectedUser(user);
    setIsModalOpen(user);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const usersAvatars = [
    "https://cdn-icons-png.freepik.com/256/1010/1010047.png?ga=GA1.1.428054423.1724698331&semt=ais_hybrid",
    "https://cdn-icons-png.freepik.com/256/3530/3530467.png?ga=GA1.1.428054423.1724698331&semt=ais_hybrid",
    "https://cdn-icons-png.freepik.com/256/818/818056.png?ga=GA1.1.428054423.1724698331&semt=ais_hybrid",
    "https://cdn-icons-png.freepik.com/256/435/435058.png?ga=GA1.1.428054423.1724698331&semt=ais_hybrid"
  ];

  const sortedData = [...data];
  if (sortConfig.key) {
    sortedData.sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }

  const requestSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  function formatEmail(email) {
    let namePart = email.split('@')[0];
    let firstName = namePart.split('.')[0];
    let formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    return formattedName;
  }

  return (
    <div className="relative rounded-lg mt-4 bg-gradient-to-t from-slate-700 to-slate-900 text-white px-4 pb-4 overflow-x-auto" id='activitytable'>
      <h1 className='text-2xl font-semibold text-center p-2'>Employee Details</h1>
      <span
        className="absolute top-10"
        style={{
          left: '50%',
          width: '20%',
          backgroundColor: 'white',
          transform: 'translateX(-50%)',
          height: '1px', 
        }}
      ></span>
      <table className="rounded-lg min-w-full">
        <thead>
          <tr className="flex w-full text-center items-center">
            <th className="py-2 px-4 w-1/5 cursor-pointer flex items-center justify-center">
              Name
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => requestSort('name')}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </th>
            <th className="py-2 px-4 w-2/5">Email</th>
            <th className="py-2 px-4 w-1/5 cursor-pointer flex items-center justify-center">
              Active Days
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6" onClick={() => requestSort('activeDays')}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15 12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9" />
              </svg>
            </th>
            <th className="py-2 px-4 w-1/5">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((user, index) => (
            <tr key={index} className="flex w-full border-t border-gray-700 text-center items-center">
              <td className="py-2 px-4 w-1/5 flex flex-col lg:flex-row items-center justify-center text-center">
                <img src={usersAvatars[index]} alt='avatar' className="w-10 h-10 rounded-full mr-0 lg:mr-2" />
                <div className='w-16 text-center lg:text-left'>
                  {formatEmail(user.name)}
                </div>
              </td>
              <td className="relative py-2 px-4 w-2/5 cursor-pointer" onClick={()=>handleCopy(user.name)}>
                <div className="relative group">
                  {user.name}
                  <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 hidden group-hover:block bg-gray-700 text-white text-md rounded py-1 px-2">
                    {copied ? 'Copied!' : 'Click to copy'}
                  </div>
                </div>
              </td>
              <td className="py-2 px-4 w-1/5">{user.activeDays}</td>
              <td className="py-2 px-4 w-1/5">
                <button 
                  className="bg-slate-100 text-black px-4 py-2 rounded hover:scale-110 hover:bg-black hover:text-slate-100" 
                  onClick={() => handleSeeDetails(user)}
                >
                  See Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isModalOpen && selectedUser && (
        <DetailsModal onClose={closeModal} isModalOpen={isModalOpen}>
          <div className="m-4 flex flex-col flex-wrap items-center justify-around">
            <GeneralLineChart 
              data={data}
              highlightUser={selectedUser.name}
              activityMeta={activityMeta}
            />
          </div>
        </DetailsModal>
      )}
    </div>
  );
};

export default ActivityTable;

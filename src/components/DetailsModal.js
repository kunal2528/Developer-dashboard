import React from 'react';

const DetailsModal = ({ onClose, children, isModalOpen }) => {
  function formatEmail(email) {
    let namePart = email.split('@')[0];
    let firstName = namePart.split('.')[0];
    let formattedName = firstName.charAt(0).toUpperCase() + firstName.slice(1);
    return formattedName;
  }
  
  return (
    <div className="fixed inset-0 bg-slate-900 flex flex-col bg-opacity-90 z-50 backdrop-blur-lg w-full h-full p-4">
      <h1 className='text-center text-3xl'>Employee Detail</h1>
      <h1 className='text-center text-sm text-slate-300'>Chart shows comparison of <span className='font-bold text-lg'>{formatEmail(isModalOpen.name)}</span> with other employees w.r.t activities</h1>
      <button 
        className="absolute top-4 right-8 hover:scale-125 text-white text-3xl"
        onClick={onClose}
      >
        &times;
      </button>
      <div className="flex items-center justify-center text-center rounded p-4 overflow-auto">
        {children}
      </div>
    </div>
  );
};

export default DetailsModal;

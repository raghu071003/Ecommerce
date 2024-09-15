import React from 'react';

const Notification = ({ message, type, onClose }) => {
  const getNotificationStyle = () => {
    switch (type) {
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      case 'info':
        return 'bg-blue-500 text-white';
      default:
        return 'bg-gray-800 text-white';
    }
  };

  return (
    <div className={`absolute top-14 right-0 m-4 p-4 rounded-lg shadow-lg ${getNotificationStyle()}`}>
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="text-xl font-bold leading-none text-white focus:outline-none"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;

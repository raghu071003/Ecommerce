import React, { useEffect } from 'react';

const Notification = ({ message = 'Item added to cart!', type = 'success', onClose }) => {
  // Automatically close the notification after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 seconds

    // Clear the timer if the component is unmounted or onClose is called
    return () => clearTimeout(timer);
  }, [onClose]);

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
    <div
      className={`fixed top-14 right-4 m-4 p-4 rounded-lg shadow-lg transform transition-transform duration-300 ease-in-out ${getNotificationStyle()}`}
      style={{ transform: 'translateX(0)' }}
    >
      <div className="flex justify-between items-center">
        <p>{message}</p>
        <button
          onClick={onClose}
          className="text-xl font-bold leading-none text-white focus:outline-none ml-4"
        >
          &times;
        </button>
      </div>
    </div>
  );
};

export default Notification;

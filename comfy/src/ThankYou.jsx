import React from 'react';
import { Link } from 'react-router-dom';

const ThankYou = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] ">
      <div className="bg-blue-50 p-8 rounded-lg shadow-lg text-center max-w-md ">
        <h1 className="text-3xl font-bold text-blue-500 mb-4">Thank You!</h1>
        <p className="text-lg text-gray-700 mb-4">Your payment was successful.</p>
        <p className="text-gray-600 mb-8">We appreciate your business and hope you enjoy your purchase.</p>
        <Link 
          to="/" 
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYou;

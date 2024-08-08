import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ecomContext } from './App';

const ProductPage = ({singleProduct}) => {
    const{handleCart,products}= useContext(ecomContext);


  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <img 
        src={singleProduct?.attributes?.image} 
        alt={singleProduct?.attributes?.title} 
        className="w-full h-64 object-cover rounded-lg"
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">{singleProduct?.attributes?.title}</h1>
        <h2 className="text-xl text-gray-600 mb-4">{singleProduct?.attributes?.company}</h2>
        <p className="text-gray-700 mb-4">{singleProduct?.attributes?.description}</p>
        <p className="text-lg text-gray-900 font-semibold mb-2">Price: ${singleProduct?.attributes?.price/100}</p>
        <p className="text-gray-600 mb-2">Category: {singleProduct?.attributes?.category}</p>
        {singleProduct?.attributes?.shipping && (
          <p className="text-green-600 mb-4">Free Shipping Available</p>
        )}
        
        <button onClick={(e)=>{handleCart(e,singleProduct)}} className=" py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductPage;

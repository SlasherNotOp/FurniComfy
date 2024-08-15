import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const OrderSummary = ({ReqeustForAmount,totalPrice,cart,SetToggleAddress,toggleAddress}) => {
    const subtotal = totalPrice;
    const shipping = 5.0;
    const tax = totalPrice/10;
    const total = subtotal + shipping + tax;


    const navigate=useNavigate();

   

   

    function toggleFunction(){

      SetToggleAddress(!toggleAddress)
        console.log(toggleAddress)

    }
    

 

  
    return (

      <>
      
        <div className={totalPrice==0?'hidden':"sdfs"}>
      <div className="w-full mx-auto bg-blue-50 p-4 rounded-lg shadow-lg">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-gray-800">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping</span>
            <span className="text-gray-800">${shipping.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Tax</span>
            <span className="text-gray-800">${tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg font-bold">
            <span>Order Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>
        <button onClick={()=>{toggleFunction()}} className="mt-6 w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
          {
            localStorage.getItem("jwt")?"PLACE ORDER":"PLEASE LOGIN"
          }
        </button>
      </div>
      </div>

      
      </>
    );
  };
  
  export default OrderSummary;

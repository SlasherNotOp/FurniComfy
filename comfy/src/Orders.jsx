import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ecomContext } from './App';

const Orders = () => {

  const{cart}=useContext(ecomContext);
  const [order,setOrder]=useState([]);

  useEffect(()=>{
    function getAllOrders(){

      axios.get("http://localhost:8080/api/user/get/order",
      {
        headers:{
          "Authorization":"Bearer "+localStorage.getItem("jwt")
        }
       }
      
      ).then((res)=>{
        
        setOrder(res.data)

      }).catch((err)=>{
        
      })

    }
    getAllOrders()
  },[cart])

  return (
    <div>
    
    <h1 className='text-[2rem] pt-[4rem]'>
     {/* {
      cart.length==0?" Cart Is Empty":"Shopping Cart"
    }  */}

    Orders
    
     </h1>
    <hr/>
    {
      localStorage.getItem("jwt")?
      <div className="flex w-full font-bold justify-evenly py-10">
          <h1 className='w-28'>Order Id</h1>
        <h1 className='w-28'>Full Name</h1>
        <h1 className='w-28'>Address</h1>
        <h1 className='w-28'>Total Products</h1>
        <h1 className='w-28'>Totoal Price</h1>
        </div>
      
      :
      
        <div className='flex justify-center py-28'>
        <Link to={"/sign-in"}> <h1 className='text-2xl bg-blue-500 p-2 font-bold text-white cursor-pointer rounded-xl '> Login To see Orders</h1></Link>

        </div>
      
    }

    

    {
      console.log(order)
      }
      {
      order.map((item,ind)=>{
        return(
          <div key={ind} className="flex w-full justify-evenly pb-5">
          <h1 className='w-28 '>{item.id}</h1>
        <h1 className='w-28'>{item.user.fullName}</h1>
        <h1 className='w-28' >{item.address}</h1>
        <h1 className='w-28'>{item.productId.length}</h1>
        <h1 className='w-28'>${item.price/100}</h1>
        </div>
        )
      })
    }
      
    </div>
  )
}

export default Orders

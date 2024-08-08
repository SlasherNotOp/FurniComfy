import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { ecomContext } from './App';


const Home = () => {

const {products,setCart ,cart,responseData, handleCart,handleClick,filterProduct,setFilterProduct}= useContext(ecomContext);



useEffect(()=>{
  setFilterProduct(products.filter((product)=>product.attributes.featured===true))
},[products])
  
if(filterProduct?.length!=0){
//console.log(filterProduct);
}








  return (
    <>
    

    <h1 className='text-[2rem] my-[1rem]'>Featured products</h1>
    <hr className='py-[1rem]'/>

      <div className='flex justify-between'>
      {  
        filterProduct.length!=0?(filterProduct.map((prod,ind)=>{
          return(
            <div key={ind} onClick={(e)=>{handleClick(e,prod)}} className='w-[32%] shadow-lg	rounded-2xl'>
            <Link to={"/products/"+prod.id} >
            <img src={prod.attributes.image} className="w-[90%] h-[12rem] object-cover rounded-2xl m-[1rem] "></img>
            <div className='py-2'>
            <h1 className='text-center w-[100%] text-[1.4rem]'>{prod.attributes.title}</h1>
            <p className='text-center'>${prod.attributes.price/100}</p>
            </div>

            </Link>
            <div className='flex justify-center items-center pb-2'>
              <button 
              onClick={(e)=>handleCart(e,prod)}
              className='bg-blue-500 text-white items-center mb-2 text-center p-2 rounded relative z-20 '
              >Add to Cart
              </button>
            </div>
            </div>

            
            
          );
        })):""
      }
        
      </div>

    </>
  )
}

export default Home;

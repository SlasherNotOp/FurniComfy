import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ecomContext } from './App';

const Products = () => {

  const {products,handleCart,handleClick}= useContext(ecomContext);
  console.log(products);

  return (
    <div>
      
      <div className='flex justify-between flex-wrap relative z-0'>
      {  
        products.length!=0?(products.map((prod,ind)=>{
          return(
            <div key={ind} onClick={(e)=>{handleClick(e,prod)}} className='w-[32%] shadow-lg	rounded-2xl'>
            <Link to={"/products/"+prod.id} >
            <img src={prod.attributes.image} className="w-[90%] h-[12rem] object-cover rounded-2xl m-[1rem] "></img>
            <div className='py-2'>
            <h1 className='text-center w-[100%] text-[1.4rem]'>{prod.attributes.title}</h1>
            <p className='text-center'>${prod.attributes.price/100}</p>
            </div>

            </Link>
            <div className='flex justify-center items-center pb-4'>
              <button 
              onClick={(e)=>handleCart(e,prod)}
              className='bg-blue-500 mb-2 text-white items-center text-center p-2 rounded relative z-20 '
              >Add to Cart
              </button>
            </div>
            </div>
            
          );
        })):""
      }
        
      </div>

    </div>
  )
}

export default Products

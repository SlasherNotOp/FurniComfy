import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ecomContext } from './App';
import OrderSummary from './OrderSummary';

const Cart = () => {

  const{cart,setCart,deleteItemFromCart}=useContext(ecomContext);
  const [totalPrice,setTotalPrice]=useState(0);

  

  console.log(cart);

  useEffect(() => {
    const calculateTotalPrice = () => {
      const total = cart.reduce((sum, item) => {
        return sum + ((item.attributes.price/100) * item.quantity);
      }, 0);
      setTotalPrice(total);
    };

    calculateTotalPrice();
  }, [cart]);

  console.log(cart);

  
  function increaseQuantity(id){
    setCart( cart.map((singleC)=>{
      if(singleC.id===id){
        return {...singleC, quantity:singleC.quantity+1};
      }
      return singleC;
    }))

    toast.success("Added quantity")
  }

  function decreaseQuantity(id){
    toast.success("Reduce quantity")
    setCart( cart.map((singleC)=>{
      if(singleC.id===id){
        return {...singleC, quantity:singleC.quantity-1};
      }
      return singleC;
    }))
  }
  
  



  return (
  <div className='w-[80vw]'>

    <h1 className='text-[2rem] pt-[4rem]'>Shopping Cart</h1>
    <hr/>
    <div className='w-[100%] flex '>
    <main className='flex w-[60%] flex-wrap'>
      
        {cart.map((item,index)=>{
          
          return(<>
          
         
          
          <div key={index} className='w-[100%] flex justify-between m-[1rem] my-10'>
          

            <div><img className='w-[10rem] h-[10rem] rounded-xl object-cover'
            src={item.attributes.image}></img></div>
            <div className=''>
              <h3 className='w-24'>{item.attributes.title}</h3>
              <p>{item.attributes.company}</p>

              </div>
            <div className=''><span>Amount</span>
            

            <p>
            
            <button disabled={item.quantity==1?true:false}
                      onClick={() => decreaseQuantity(item.id)}
                      className='text-green-600  cursor-pointer px-2'
                    >
                      -
                    </button>
            {item.quantity}
            <button
                      onClick={() => increaseQuantity(item.id)}
                      className='text-green-600  cursor-pointer px-2'
                    >
                      +
                    </button>
            </p> <span onClick={()=>{deleteItemFromCart(item.id)}} className='text-blue-600 hover:underline cursor-pointer '>Delete</span> </div>
           
            <div><p>${ item.attributes.price/100}</p></div>
            
            

            

          </div>
          
          
          <hr className='w-full '/>

          </>);
        })}

          

      
      
      </main>

      
      <div className='p-10 w-1/3 '>
      <div className='' >
      {/* total cash <span>{totalPrice}</span> */}
      <OrderSummary totalPrice={totalPrice} cart={cart}/>
      </div>
      
       </div>


    


      </div>
  </div>
  )
}

export default Cart;

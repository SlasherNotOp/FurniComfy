import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import { ecomContext } from './App';
import OrderSummary from './OrderSummary';

const Cart = () => {

  const{cart,setCart,deleteItemFromCart}=useContext(ecomContext);
  const [totalPrice,setTotalPrice]=useState(0);


  let listofObj=[];

  cart.map((item)=>{

      listofObj.push({"id":item.id,"quantity":item.quantity});
      
  })


  function ReqeustForAmount(address){

    console.log(address)

    if(!localStorage.getItem("jwt")){
        console.log("login required")
        navigate("/sign-in")
        return;

    }

    

    console.log(listofObj)

    
    const paymentCartRequest=listofObj;

    const params={
      paymentCartRequest:paymentCartRequest
    }


    

      function ordersumm(){
         axios.post("http://localhost:8080/api/payment/get/"+address,
         paymentCartRequest
         ,{
          headers:{
            "Authorization":"Bearer "+localStorage.getItem("jwt")
          }
         }
      
      
    ).then((res)=>{
      console.log(res)
      // forSavingOrder()

      

      


      window.location.href=res.data.paymentLinkUrl

    


    }).catch((err)=>{
      console.log(err)

    })
      }

      ordersumm()

    
}

  

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
  
  
  
const[toggleAddress,SetToggleAddress]= useState(false);
const[address,setAddress]=useState();

function actualFunction(e){



  e.preventDefault();

  ReqeustForAmount(address);
  

}



  return (
    <>
  <div className= { toggleAddress?"hidden":'w-[80vw] '}>

    <h1 className='text-[2rem] pt-[4rem]'>{
      cart.length==0?" Cart Is Empty":"Shopping Cart"
    } </h1>
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
      {/* /////////////////////////////////////////// */}
      <OrderSummary ReqeustForAmount={ReqeustForAmount} totalPrice={totalPrice} cart={cart}  toggleAddress={toggleAddress} SetToggleAddress={SetToggleAddress}/>
      </div>
      
       </div>


    


      </div>
  </div>


  <div className= { toggleAddress?"flex items-center justify-center h-[80vh]":"hidden"}>
  <div className="w-full max-w-md p-8 bg-blue-100 rounded-lg shadow-md">
    <form onSubmit={(e)=>{actualFunction(e)}} className="space-y-4">
      <div>
        <input
          type="text"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
          placeholder="Address"
          className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
      </div>
      <button
        type="submit"
        className="w-full px-4 py-2 text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Submit
      </button>
    </form>
  </div>
</div>



  </>
  )
}

export default Cart;

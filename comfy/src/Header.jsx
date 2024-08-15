import React, { useContext, useEffect } from "react";
import { Link, Navigate, NavLink, useNavigate } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { FaMoon } from "react-icons/fa";
import { ecomContext } from "./App";
import { Bounce, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Header = () => {

  const {cart,jwtToken,setJwtToken,setResponseData,responseData}=useContext(ecomContext);

  
const navigate=useNavigate();

  // useEffect(()=>{
  //   console.log(jwtToken)
  // },[cart])

  function timeoutFun(){

    // console.log("reeeeeee")
    // window.location.href="/"
    // navigate("/")
  
    
  }

useEffect(()=>{

  // setJwtToken("");
    

},[])




function clearFunction(){

  localStorage.clear();
  setResponseData({});
  setJwtToken("");
  
 
  
  

}
  

  return (
    <>
      <div className="">
      <ToastContainer
position="top-center"
autoClose={2000}
hideProgressBar={false}
newestOnTop
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>


        <div className="h-[2rem] bg-[#222831] pr-[15rem] flex justify-end gap-[1rem] items-center w-[100%] text-white ">
            
           {
          

              localStorage.getItem("jwt") ?<><p>Hello User</p> <span className="cursor-pointer  text-blue-500 border-blue-500 border hover:text-blue-600 hover:border-blue-600 px-4 rounded-lg transition duration-300 ease-in-out shadow-md focus:outline-dashed focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 " onClick={
              ()=>{

                clearFunction();

              // window.location.href =("/")
              // navigate("/")
              
              }
            }>Logout</span></>:
            <>
            <span><Link to={"/sign-in"}>Sign in/Guest</Link></span>
            <span><Link to={"/sign-up"}>Create Account</Link></span>
            </>
         

            
           }

            

              
           
            
            
            

            


        </div>
        <div className="flex justify-between px-[15rem] bg-blue-100">
            <h2 className=" bg-blue-500 my-2 rounded-xl text-3xl font-semibold text-blue-100 px-4 py-1">
            C</h2>
            <ul className="flex p-[1rem] gap-[1rem]">

            <li>
               <NavLink 
               className={({ isActive }) =>
               isActive ? "bg-[#222831] text-white py-2 px-3 rounded" : "hover:bg-[#748299]  hover:text-white hover:py-2 px-3 rounded"
            }

                to={"/"}>Home</NavLink>
            </li>
            <li>
               <NavLink 
               className={({ isActive }) =>
              isActive ? "bg-[#222831] text-white py-2 px-3 rounded" : "hover:bg-[#748299]  hover:text-white hover:py-2 px-3 rounded"
            }
               to={"/about"}>About</NavLink>
            </li>
            <li>
               <NavLink className={({ isActive }) =>
              isActive ? "bg-[#222831] text-white py-2 px-3 rounded" : "hover:bg-[#748299] delay-100 hover:text-white hover:py-2 px-3 rounded"
            } to={"/products"}>Products</NavLink>
            </li>
            <li>
               <NavLink className={({ isActive }) =>
              isActive ? "bg-[#222831] text-white py-2 px-3 rounded" : "hover:bg-[#748299]  hover:text-white hover:py-2 px-3 rounded"
            } to={"/cart"}>Cart</NavLink>
            </li>
            <li>
               <NavLink className={({ isActive }) =>
              isActive ? "bg-[#222831] text-white py-2 px-3 rounded" : "hover:bg-[#748299]  hover:text-white hover:py-2 px-3 rounded"
            } to={"/order"}>Orders</NavLink>
            </li>


            </ul>

            <div className="flex p-[1rem] gap-[1rem] relative">
            <FaMoon className="text-xl"/>
            <NavLink to={"/cart"}><PiShoppingCartLight className="text-xl" /></NavLink>
             <h3 className="absolute right-0 top-[10%] px-[0.5rem] bg-blue-500 rounded-xl text-xs text-white" >{cart.length}</h3>
            </div>
        </div>
      </div>
    </>
  );
};

export default Header;

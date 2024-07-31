import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import { PiShoppingCartLight } from "react-icons/pi";
import { FaMoon } from "react-icons/fa";
import { ecomContext } from "./App";

const Header = () => {

  const {cart}=useContext(ecomContext);

  return (
    <>
      <div className="w-[100vw]">
        <div className="h-[2rem] bg-[#222831] pr-[15rem] flex justify-end gap-[1rem] items-center w-[100%] text-white ">
            <span><Link to={"/"}>Sign in/Guest</Link></span>
            <span><Link to={"/"}>Create Account</Link></span>
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
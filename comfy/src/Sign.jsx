import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { FaEyeSlash } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import {  useNavigate } from 'react-router-dom';
import { ecomContext } from './App';

const Sign = () => {
    const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [showPassword,SetShowPassword]=useState(true);

const{ responseData,setResponseData,jwtToken, setJwtToken }=useContext(ecomContext);





const navigate=useNavigate();

const [errorDesc,setErrorDesc]=useState();

const handleSubmit = async(e) => {
  e.preventDefault();
  // Handle sign-in logic here
  console.log('Email:', email);
  console.log('Password:', password);

    await sendData();

};



const sendData= async()=>{
     await axios.post("http://localhost:8080/api/auth/signin",{
        email,
        password
    }).then((res)=>{
        
        setResponseData(res);
        if(res.data.errorDesc!=null){
             setErrorDesc(res.data.errorDesc);
        }else{
            setErrorDesc("");
            
             loginFunction();
        }
    })
}




function loginFunction(){

  if(responseData!=null){

    localStorage.setItem("jwt",responseData.data.jwt)
  }
    
  window.location.href="/"
  // navigate("/")

}



return (
  <div className="flex items-center justify-center h-[80vh]">
    <div className="w-full max-w-md p-8 space-y-6 bg-blue-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        <div className='relative ' >
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
             type={ showPassword?"password":"text"}
             
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <span className='w-full block h-4 text-[#e01515]'>{errorDesc} </span>
          <div className=' cursor-pointer px-10'>
          {
            showPassword?
          <FaEyeSlash onClick={()=>{SetShowPassword(!showPassword)}} className='absolute top-9 right-4'/>
          :<IoMdEye onClick={()=>{SetShowPassword(!showPassword)}} className='absolute top-9 right-4'/>
          }
          </div>
          
          
        </div>
        <button
          type="submit"
          className="w-full px-4 py-2  text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Sign In
        </button>
      </form>
    </div>
  </div>
  )
}

export default Sign

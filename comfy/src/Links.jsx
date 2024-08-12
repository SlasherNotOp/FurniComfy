import { BrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Header from "./Header";
import Home from "./Home";
import About from "./About"
import Products from "./Products"
import Cart from './Cart'

import SingleProduct from "./SingleProduct";
import Sign from "./Sign";
import SignUp from "./SignUp";
import ProductPage from "./ProductPage";
import Success from "./Success";

function Links() {
  return (
    <>
      <BrowserRouter>
      <Header/>
        <div className="mx-[15rem] ">
        <Routes>
        <Route path="/" element={<Home/>} ></Route>
        <Route path="/about" element={<About/>} ></Route>
        <Route path="/products" element={<Products/>} ></Route>
        <Route path="/products/:id" element={<SingleProduct/>}></Route>
        <Route path="/cart" element={<Cart/>} ></Route>
        <Route path="/sign-in" element={<Sign/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>
        <Route path="/temp" element={<ProductPage/>}/>
        <Route path="/payment/success/:userId" element={<Success/>}/>

        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}
export default Links;

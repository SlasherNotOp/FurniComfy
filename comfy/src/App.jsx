import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import Links from "./Links";

export const ecomContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart]=useState([]);
  const [singleProduct,setSingleProduct]=useState({});

  const [responseData,setResponseData]=useState({});
  const [jwtToken, setJwtToken]=useState("");

  const [filterProduct,setFilterProduct]=useState([]);



 
  function checkCart(cartProductId){
    const newCart= cart.map((singleCart)=>{
      
      if(singleCart.id===cartProductId){
        return singleCart.Qunatity=singleCart.Qunatity+1;
      }


    })
    
    return newCart;
   
  }

  



  function handleCart(e,product){
    
    



    if(cart.includes(product)){
      toast.warning('Already in the cart')

      console.log("check")
      checkCart(product.id);
      

    }else{
    setCart([...cart,product]);
    //////////////////////////////////////////////
    toast.success('Added to cart');
    
  }
  
  
    console.log(cart);
  }
 // console.log(cart);

       useEffect(() => {
        async function fetchData (){
        const response= await fetch("http://localhost:8080/api/product/get");
        const result=await response.json();
        console.log(result);
        
        
        setProducts(result);

        // setJwtToken( localStorage.getItem("jwt"))
        
      }
      fetchData()

      
      }, []);
      // console.log(jwtToken)


      function handleClick(e,prod){
        setSingleProduct(prod);
        //console.log(prod.id);
      }


      function deleteItemFromCart(cartIdDelete){

       setCart(cart.filter(sc=>sc.id!=cartIdDelete))
       toast.error("Deleted from cart")
      }

      // useEffect(()=>{

      //   if(responseData!=null){
      //     console.log("api call")
      //     setJwtToken(responseData.data.jwt);
      //   }


      // },[responseData])
      

  return (
    <>
      <ecomContext.Provider value={{jwtToken,filterProduct,setFilterProduct, setJwtToken, responseData,setResponseData, products,deleteItemFromCart, setProducts, cart, setCart, handleCart,handleClick,singleProduct,setSingleProduct}}>
        <Links />
       


      </ecomContext.Provider>
    </>
  );
}

export default App;

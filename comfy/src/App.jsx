import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";
import Links from "./Links";

export const ecomContext = createContext();

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart]=useState([]);
  const [singleProduct,setSingleProduct]=useState({});


 
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
      console.log("check")
      checkCart(product.id);

    }else{
    setCart([...cart,product]);
  }
  
  
    console.log(cart);
  }
 // console.log(cart);

       useEffect(() => {
        async function fetchData (){
        const response= await fetch("https://strapi-store-server.onrender.com/api/products");
        const result=await response.json();
        //console.log(result.data);
        const quantityCollect= quantityAddFunction(result.data);
        // console.log(quantityCollect);
        setProducts(result.data);
        
      }
      fetchData()

      function quantityAddFunction(quantities){
        quantities.map((q)=>{
          return q.Qunatity=1;
        })
      }

        

      }, []);


      function handleClick(e,prod){
        setSingleProduct(prod);
        //console.log(prod.id);
      }


      function deleteItemFromCart(cartIdDelete){
       setCart(cart.filter(sc=>sc.id!=cartIdDelete))

      }

  return (
    <>
      <ecomContext.Provider value={{ products,deleteItemFromCart, setProducts, cart, setCart, handleCart,handleClick,singleProduct,setSingleProduct}}>
        <Links />
      </ecomContext.Provider>
    </>
  );
}

export default App;

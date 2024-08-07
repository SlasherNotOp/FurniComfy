import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ecomContext } from './App';


const SingleProduct = () => {

  const {singleProduct,cart}= useContext(ecomContext);
  const {id}=useParams();

  console.log(cart);

  if(singleProduct?.length!=0){
  console.log(singleProduct);
  }
    

  return (
    <div>
    <h1>ia an single product id is {id}</h1>
    
   
    
    {
      singleProduct.length!=0?(
        <h2>{singleProduct.attributes.title}</h2>
      ):""
    }
    
      
    </div>
  )
}

export default SingleProduct;

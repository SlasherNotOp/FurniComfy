import React, { useContext } from 'react'
import { useParams } from 'react-router-dom';
import { ecomContext } from './App';
import ProductPage from './ProductPage';


const SingleProduct = () => {

  const {singleProduct,cart}= useContext(ecomContext);
  const {id}=useParams();

  console.log(cart);

  if(singleProduct?.length!=0){
  console.log(singleProduct);
  }
    

  return (
    
    <ProductPage singleProduct={singleProduct}/>
    
  )
}

export default SingleProduct;

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { ecomContext } from './App';

const FilterDivC = () => {



  const{products, setProducts}=useContext(ecomContext);
  
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [company, setCompany] = useState('all');
  const [sort, setSort] = useState('a-z');
  const [price, setPrice] = useState(1000);
  const [freeShipping, setFreeShipping] = useState(false);
  const [apiGetCategory,SetApiGetCategory]=useState();
  const [apiGetCompany,SetApiGetCompany]=useState();


  function apiFunctionGet(){
    // Add search logic here
    const params={
      search:search,
      category:category,
      company:company,
      sort:sort
    }


     axios.get("http://localhost:8080/api/product/get",
      { params: params }
    ).then((res)=>{
      setProducts(res.data)
    });

  }


  const handleSearch = () => {
    apiFunctionGet()


  };
  
  useEffect(()=>{

    axios.get("http://localhost:8080/api/product/get/category")
    .then((res)=>{
        SetApiGetCategory(res.data)
    })

    axios.get("http://localhost:8080/api/product/get/company")
    .then((res)=>{
      console.log(res.data)
        SetApiGetCompany(res.data)
    })

    


  },[])

  








  const handleReset = () => {
    setSearch('');
    setCategory('all');
    setCompany('all');
    setSort('a-z');
    setPrice(1000);
    setFreeShipping(false);

    apiFunctionGet();
    
  };

  return (
    <div className="bg-blue-50 p-6 rounded-lg max-w-screen-lg mx-auto mt-20">
      <div className="flex flex-wrap -mx-3 mb-4">
        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
          <label htmlFor="search" className="block text-gray-700 mb-2">Search Product</label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-3 py-2 border rounded"
            placeholder="Search Product"
          />
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
          <label htmlFor="category" className="block text-gray-700 mb-2">Select Category</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option>all</option>
            {
                apiGetCategory!=null?apiGetCategory.map((categoryItem,inx)=>{
                    return(
                        <option key={inx}>{categoryItem}</option>

                    );

                }):""

            }
            {/* Add more options as needed */}
          </select>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
          <label htmlFor="company" className="block text-gray-700 mb-2">Select Company</label>
          <select
            id="company"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option>all</option>

            {
                apiGetCompany!=null?apiGetCompany.map((companyItem,ind)=>{
                    return(
                        <option key={ind}>{companyItem}</option>

                    );

                }):""

            }

            {/* Add more options as needed */}
          </select>
        </div>
        <div className="w-full sm:w-1/2 lg:w-1/4 px-3 mb-4">
          <label htmlFor="sort" className="block text-gray-700 mb-2">Sort By</label>
          <select
            id="sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          >
            <option>a-z</option>
            <option>high</option>
            <option>low</option>
            
            {/* Add more options as needed */}
          </select>
        </div>
      </div>
      <div className="flex   mb-4 items-center">
        <div className="w-full lg:w-3/12 px-3 mb-4 lg:mb-0">
          <label htmlFor="price" className="block text-gray-700 mb-2">Select Price</label>
          <input
            type="range"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full "
            min="0"
            max="1000"
            step="10"
            
          />
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>$0</span>
            <span>${price}.00</span>
          </div>
        </div>
        <div className="w-full lg:w-3/12 px-3 flex items-center mb-4 lg:mb-0">
          <input
            type="checkbox"
            id="free-shipping"
            checked={freeShipping}
            onChange={(e) => setFreeShipping(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="free-shipping" className="text-gray-700">Free Shipping</label>
        </div>
      
      <div className="flex w-6/12 ">
        <button
          onClick={handleSearch}
          className="bg-blue-500 w-1/2 text-white px-4 py-2 rounded mr-2"
        >
          SEARCH
        </button>
        <button
          onClick={handleReset}
          className="bg-pink-500 w-1/2 text-white px-4 py-2 rounded"
        >
          RESET
        </button>
      </div>
      </div>
      
    </div>
  )
}

export default FilterDivC

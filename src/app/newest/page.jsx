"use client";
import React, { useEffect,useState } from 'react'
import Filters from '@/components/Products/Filters'
import ProductsList from '@/components/Products/ProductsList'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewestProducts } from '@/redux/features/home/homeThunk'
const newestPage = () => {
  const { newest, max_price } = useSelector((state) => state.home);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNewestProducts({
      category: selectedCategory, 
      low_price: minPrice, 
      max_price: maxPrice 
    }));
  }, [dispatch,selectedCategory, minPrice, maxPrice]);

  const newestCategories = ["men", "women"];
  return (
    <div className='flex flex-col md:flex-row pt-6 gap-4 md:gap-0 bg-gray-100'>
      <Filters
        categories={newestCategories}
        max_price={max_price}
        onCategorySelect={setSelectedCategory}
        onPriceChange={(min, max) => {
          setMinPrice(min);
          setMaxPrice(max);
        }}
      />
      <div className='flex-1'>
        <ProductsList products={newest} />
      </div>
    </div>
  )
}

export default newestPage
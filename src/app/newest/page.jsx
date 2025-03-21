"use client";
import React, { useEffect, useState } from 'react'
import Filters from '@/components/Products/Filters'
import { useDispatch, useSelector } from 'react-redux'
import { fetchNewestProducts } from '@/redux/features/home/homeThunk'
import dynamic from "next/dynamic";
import { useSearchParams } from 'next/navigation';
const ProductsList = dynamic(() => import("@/components/Products/ProductsList"));

const newestPage = () => {
  const { newest, max_price, loading } = useSelector((state) => state.home);
    const searchParams = useSearchParams();
  const categoryQuery = searchParams.get("category") || "";
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchNewestProducts({
      category:  categoryQuery,
      low_price: minPrice,
      max_price: maxPrice
    }));
  }, [dispatch, categoryQuery, minPrice, maxPrice]);

  const newestCategories = ["men", "women"];
  return (
    <div className='flex flex-col md:flex-row py-10 gap-4 md:gap-0 bg-gray-100'>
      <Filters
        categories={newestCategories}
        max_price={max_price}
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
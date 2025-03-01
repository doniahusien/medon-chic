import React from 'react'
import Filters from '@/components/Products/Filters'
import ProductsList from '@/components/Products/ProductsList'
import { newest } from '../../../public/data/products'
const newestPage = () => {
    const newestCategories = ["Men Products", "Women Products"];
  return (
    <div className='flex flex-col md:flex-row pt-6 gap-4 md:gap-0 bg-gray-100'>
    <Filters  categories={newestCategories} />
    <div className='flex-1'>
        <ProductsList products={newest} />
    </div>
</div>
  )
}

export default newestPage
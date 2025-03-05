"use client"
import React, { useState } from "react";

const ProductDetails = ({ product ,sizes}) => {
  const [selectedSize, setSelectedSize] = useState(null);

  return (
    <div className="p-5 space-y-4 w-full md:w-3/4 lg:w-1/3 mx-auto">

      <h2 className="text-lg">{product.name}</h2>

      <div className="flex items-center gap-10 text-xl text-gray-600">
        <span className=" text-yellow-500">⭐ {product.rate}</span>
        <span>{product.reviews} Reviews</span>
      </div>

      <div className="mt-2 flex items-center gap-2">
        <span className="text-red-600 text-2xl">₹{product.price_after_discount}</span>
        <span className="text-gray-500 line-through">₹{product.price}</span>
        <span className="text-green-600 text-sm">
          Save ₹{product.price - product.price_after_discount} ({product.discount}%)
        </span>
      </div>

      <div className="mt-4">
        <div className="flex gap-2">
          {sizes.map((size) => (
            <button
              key={size}
              className={`border px-4 py-1 rounded hover:text-white hover:bg-black cursor-pointer  transition-all duration-700 ease-in-out ${
                selectedSize === size ? "bg-black text-white" : "border-black"
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>
        {selectedSize && (
          <p className="text-base text-gray-700 mt-2 ">
            Your body measurements for {selectedSize} are Bust: X in, Waist: Y in, Hip: Z in.
          </p>
        )}
      </div>

      <div className="pt-5">
        <button className="w-full border border-black bg-black text-white py-2 rounded hover:text-black hover:bg-white cursor-pointer  transition-all duration-700 ease-in-out">
          ADD TO SHOP
        </button>
        <button className="w-full border border-black bg-black text-white py-2 rounded mt-2 hover:text-black hover:bg-white cursor-pointer  transition-all duration-700 ease-in-out">
          BUY NOW
        </button>
      </div>


      <p className="text-gray-600 text-sm mt-2">
        Free Shipping on orders above ₹1500. Will ship within 3-6 days.
      </p>

      {/* Description */}
      <div className="mt-4 rounded">
        <h3 className="bg-gray-200 px-2 py-3">Description</h3>
        <p className="text-sm mt-2 pl-2">{product.description}</p>
      </div>
    </div>
  );
};

export default ProductDetails;

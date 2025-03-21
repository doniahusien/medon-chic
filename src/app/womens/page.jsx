"use client";

import React, { useEffect, useState } from "react";
import Filters from "@/components/Products/Filters";
import { useDispatch, useSelector } from "react-redux";
import { fetchWomenProducts } from "@/redux/features/home/homeThunk";
import { setCurrentPage } from "@/redux/features/home/homeSlice";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const ProductsList = dynamic(() => import("@/components/Products/ProductsList"));

const WomensPage = () => {
    const dispatch = useDispatch();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();


    const categoryQuery = searchParams.get("category") || "";

    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState("");

    const { women, max_price, loading, error, currentPage, totalPages, nextPageUrl, prevPageUrl } = useSelector(
        (state) => state.home
    );

    useEffect(() => {
        dispatch(fetchWomenProducts({
            page: currentPage,
            category: categoryQuery,
            low_price: minPrice,
            max_price: maxPrice
        }));
    }, [dispatch, currentPage, categoryQuery, minPrice, maxPrice]);

    // Function to update category in URL
    const handleCategoryChange = (newCategory) => {
        const params = new URLSearchParams(searchParams);
        if (newCategory) {
            params.set("category", newCategory);
        } else {
            params.delete("category");
        }
        router.push(`${pathname}?${params.toString()}`, { scroll: false });
    };

    const womenCategories = [
        "Women Top Wear",
        "Women Hoodie",
        "Women Dresses",
        "Women Suit",
        "Women Jacket",
    ];

    return (
        <div className="flex flex-col md:flex-row py-10 gap-4 md:gap-0 bg-gray-100">
            <Filters
                categories={womenCategories}
                max_price={max_price}
                onCategorySelect={handleCategoryChange}
                onPriceChange={(min, max) => {
                    setMinPrice(min);
                    setMaxPrice(max);
                }}
            />
            <div className="flex-1">
                {loading ? (
                    <div className="flex justify-center items-center h-full">
                        <div className="w-12 h-12 border-4 border-gray-300 border-t-red-500 rounded-full animate-spin"></div>
                    </div>) : error ? (
                        <p className="text-center text-red-500">{error}</p>
                    ) : (
                    <>
                        <ProductsList products={women} />
                        <div className="flex justify-center items-center gap-4 mt-6">
                            {prevPageUrl && (
                                <button
                                    onClick={() => dispatch(setCurrentPage(currentPage - 1))}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Previous
                                </button>
                            )}
                            <span className="text-gray-700 text-lg">Page {currentPage} of {totalPages}</span>
                            {nextPageUrl && (
                                <button
                                    onClick={() => dispatch(setCurrentPage(currentPage + 1))}
                                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                                >
                                    Next
                                </button>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default WomensPage;

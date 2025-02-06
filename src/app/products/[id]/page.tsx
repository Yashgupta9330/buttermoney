"use client";

import { useState, useEffect } from "react";
import { Minus, Plus, Star } from "lucide-react"; 
import { useRouter, useParams } from "next/navigation";
import { Product } from "@/utils/types";

export default function ProductDetail() {
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<Product>(); 
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const params = useParams(); 
  const productId = params.id;

  useEffect(() => {
    if (productId) {
      fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data); 
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
          setLoading(false);
        });
    }
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      console.log("Product added to cart:", product.title, quantity);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex justify-center items-center text-white">Loading...</div>;
  }

  if (!product) {
    return <div className="bg-black min-h-screen flex justify-center items-center text-white">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-between px-6 py-8">
      {/* Back Button */}
      <div className="absolute top-4 left-4">
        <button
          className="text-2xl text-gray-300 hover:text-white"
          onClick={() => router.back()}
        >
          ←
        </button>
      </div>

      {/* Product Image */}
      <div className="flex justify-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-72 h-72 object-cover rounded-full shadow-lg"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col items-center text-center mt-6">
        {/* Title & Rating */}
        <div className="flex items-center">
         <div className="flex flex-col">
          <h1 className="text-2xl font-bold mb-2">{product.title}</h1>
          <p className="text-gray-400 text-sm mb-4">{product.description}</p>
         </div>
          <div className="flex items-center text-yellow-400 ml-2">
            <Star className="text-lg" />
            <span className="ml-1">{product.rating}</span>
          </div>
        </div>
       
      </div>

      {/* Price & Quantity Selector */}
      <div className="flex items-center justify-between w-full px-4 mt-4">
        {/* Quantity Selector */}
        <div className="flex items-center bg-gray-800 px-4 py-2 rounded-full">
          <button
            className="text-yellow-400 text-lg"
            onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
          >
            <Minus />
          </button>
          <span className="mx-3 text-white text-lg">{quantity}</span>
          <button
            className="text-yellow-400 text-lg"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <Plus />
          </button>
        </div>

        {/* Price */}
        <p className="text-2xl font-semibold text-white">${product.price}</p>
      </div>

      {/* Add to Cart Button */}
      <div className="w-full flex justify-center mt-8">
        <button
          onClick={handleAddToCart}
          className="bg-yellow-400 text-black text-xl font-semibold px-8 py-4 rounded-full shadow-lg hover:bg-yellow-500 transition"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

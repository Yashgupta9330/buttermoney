"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, Minus, Plus, Star } from "lucide-react"; 
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

  if (loading) {
    return <div className="min-h-screen bg-black flex justify-center items-center text-white">Loading...</div>;
  }

  if (!product) {
    return <div className="bg-black min-h-screen flex justify-center items-center text-white">Product not found</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-5 flex flex-col">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="text-white mb-4 flex items-center gap-1"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>

      {/* Product Image */}
      <div className="mb-6">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full aspect-square object-cover rounded-lg"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <h1 className="text-xl font-medium">{product.title}</h1>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm">{product.rating}</span>
          </div>
        </div>

        <p className="text-gray-400 text-sm">{product.description}</p>
      </div>

      {/* Quantity and Price */}
      <div className="flex items-center justify-between mt-6">
        <div className="flex items-center gap-4">
          <button
            onClick={() => quantity > 1 && setQuantity(q => q - 1)}
            className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity(q => q + 1)}
            className="w-8 h-8 rounded-full bg-zinc-900 flex items-center justify-center"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-lg font-medium">${product.price}</span>
      </div>

      {/* Add to Cart Button */}
      <button className="w-full py-4 bg-yellow-400 text-black rounded-xl font-medium mt-6">
        Add to cart
      </button>
    </div>
  );
}
"use client";
import { useEffect, useState } from "react";
import ProductCard from "./product-card";
import { Product } from "@/utils/types";
import { useRouter } from "next/navigation";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const categories = ["Donuts", "Ice Cream", "Bomboloni"];
  const [activeCategory, setActiveCategory] = useState("Donuts");
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();
        setProducts(data.products); 
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-3xl md:text-4xl font-semibold mb-6">Product List</h1>
      <div className="flex gap-4 mb-6">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              activeCategory === category ? "bg-yellow-400 text-black" : "text-gray-400 hover:text-white"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2">
        {products &&
          products.map((product) => (
            <div
              className="cursor-pointer"
              key={product.id}
              onClick={() => router.push(`/products/${product.id}`)}  
            >
            <ProductCard key={product.id} product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}



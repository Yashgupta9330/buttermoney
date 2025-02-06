"use client"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/utils/types";
import ProductCard from "./product-card";
import { categories } from "@/utils/constants";

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>("Donuts");
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
    <div className="min-h-screen bg-black p-5">
      <h1 className="text-white text-2xl font-medium mb-4">Product List</h1>
      <div className="flex gap-3 mb-6">
        {categories.map((category:string) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm ${
              activeCategory === category 
                ? "bg-yellow-400 text-black" 
                : "bg-zinc-900 text-gray-400"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-3">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/products/${product.id}`)}
            className="bg-zinc-900 rounded-xl p-4 cursor-pointer"
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}
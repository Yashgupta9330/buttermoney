import { Star } from "lucide-react";
import { Product } from "@/utils/types";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, images, rating, description, price } = product;

  return (
    <>
    <div className="w-full aspect-square mb-3 rounded-lg overflow-hidden">
    <img
      src={images[0]}
      alt={title}
      className="w-full h-full object-cover"
    />
  </div>
  
  <div className="flex-1 flex flex-col min-h-0">
    <div className="flex items-center gap-1 mb-1">
      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      <span className="text-white text-sm">{rating}</span>
    </div>
    
    <h3 className="text-white font-medium text-sm mb-1 line-clamp-1">
      {title}
    </h3>
    
    <p className="text-gray-400 text-xs line-clamp-1 mb-2">
      {description}
    </p>
    
    <div className="flex items-center justify-between mt-auto">
      <span className="text-white font-medium">
        ${price}
      </span>
      <button className="w-6 h-6 flex items-center justify-center text-yellow-400 text-lg hover:bg-zinc-800 rounded-lg">
        +
      </button>
    </div>
  </div>
  </>
  );
}
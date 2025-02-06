import { Product } from "@/utils/types"
import { Star } from "lucide-react"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { title, images, rating, description, price } = product;

  return (
    <div className="bg-zinc-900 rounded-xl p-3 w-[180px]">
      <div className="w-full aspect-square rounded-lg overflow-hidden mb-3">
        <img src={images[0] || "/placeholder.svg"} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="flex items-center gap-1 mb-1">
        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        <span className="text-sm text-white">{rating}</span>
      </div>
      <h3 className="font-medium text-white mb-1">{title}</h3>
      <p className="text-sm text-gray-400 mb-2 truncate">{description}</p>
      <div className="flex items-center justify-between">
        <span className="font-medium text-white">${price}</span>
        <button className="w-6 h-6 rounded-lg bg-transparent text-yellow-400 flex items-center justify-center hover:bg-zinc-800 transition-colors">
          +
        </button>
      </div>
    </div>
  )
}

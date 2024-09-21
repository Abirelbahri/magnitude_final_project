import { Product } from "@/lib/models/ProductModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "./Rating";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="relative group rounded-xl overflow-hidden border border-gray-700 bg-black hover:shadow-lg transition-shadow duration-300">
      <Link href={`/store/product/${product.slug}`}>
        <Image
          src={product.image}
          alt={product.name}
          width={300}
          height={400}
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <p className="text-white text-sm font-bold mb-2">{product.name}</p>
          <div className="flex items-center justify-between text-white">
            <p className="text-md font-bold text-green-400">${product.price}</p>
            <Rating value={product.rating} caption={`(${product.numReviews})`} />
          </div>
        </div>
      </Link>
    </div>
  );
}

import { Product } from "@/lib/models/ProductModel";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Rating } from "./Rating";

export default function ProductItem({ product }: { product: Product }) {
  return (
    <div className="card bg-[#070707] border-white rounded-3xl border-[1px] overflow-hidden group">
      <figure className="bg-gradient-to-b from-zinc-900 via-[#292929] to-[#070707] relative overflow-hidden">
        <Link href={`/store/product/${product.slug}`}>
          <Image
            src={product.image}
            alt={product.name}
            width={300}
            height={200}
            className="object-cover w-full transition-transform duration-500 ease-in-out group-hover:scale-110"
          />
        </Link>
      </figure>
      <div className="card-body bg-[#070707] text-center p-4">
        <Link href={`/store/product/${product.slug}`}>
          <p className="text-xs font-bold text-center text-white mb-2">
            {product.name}
          </p>
        </Link>
        <div className="card-actions flex items-center justify-between w-full text-white">
          <p className="text-sm font-bold text-green-700">${product.price}</p>
          <Rating value={product.rating} caption={`(${product.numReviews})`} />
        </div>
      </div>
    </div>
  );
}

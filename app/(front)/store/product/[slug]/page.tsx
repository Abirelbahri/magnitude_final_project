import AddToCart from '@/components/products/AddToCart'
import { convertDocToObj } from '@/lib/utils'
import productService from '@/lib/services/productService'
import Image from 'next/image'
import Link from 'next/link'
import { Rating } from '@/components/products/Rating'

const data = [
  {
    title: "Return & Refund Policy",
    content:
      "We offer refund and/or exchange within the first 30 days of your purchase, if 30 days have passed since your purchase, you will not be offered a refund and/or exchange of any kind.",
  },
  {
    title: "Delivery Options",
    content:
      "Delivery options include standard shipping, express shipping, same-day delivery, and in-store pickup. Each delivery option offers different delivery speeds and costs, so customers can choose the option that best fits their needs.",
  },
  {
    title: "Product Information",
    content:
      "This hoodie is made of high-quality materials that will keep you warm and comfortable all season long. The fabric is thick and soft, and the stitching is durable. Plus, the hood is lined with fleece for extra warmth.",
  },
];

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return { title: 'Product not found' }
  }
  return {
    title: product.name,
    description: product.description,
  }
}

export default async function ProductDetails({
  params,
}: {
  params: { slug: string }
}) {
  const product = await productService.getBySlug(params.slug)
  if (!product) {
    return <div>Product not found</div>
  }
  return (
    <>
      <div className="my-4">
        <Link href="/store" className="text-blue-500 hover:underline">
          Back to products
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-black p-6 rounded-xl border border-gray-700">
        {/* Product Image */}
        <div className="flex justify-center items-center bg-gradient-to-b from-zinc-900 via-[#292929] to-[#070707] p-4 rounded-lg border border-gray-700">
          <Image
            src={product.image}
            alt={product.name}
            width={600}
            height={600}
            sizes="100vw"
            className="rounded-lg"
          />
        </div>

        {/* Product Details */}
        <div className="text-white">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <Rating
            value={product.rating}
            caption={`${product.numReviews} ratings`}
          />
          <div className="mt-2 mb-4 text-gray-400">{product.brand}</div>
          <div className="border-t border-gray-700 my-4"></div>
          <h2 className="font-bold text-lg">Description:</h2>
          <p className="text-gray-400 mb-6">{product.description}</p>

          {/* Product Card */}
          <div className="bg-black p-4 border border-gray-700 rounded-lg">
            <div className="flex justify-between mb-2">
              <span className="font-bold">Price</span>
              <span>${product.price}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="font-bold">Status</span>
              <span>{product.countInStock > 0 ? "In stock" : "Unavailable"}</span>
            </div>
            {product.countInStock > 0 && (
              <div className="mt-4">
                <AddToCart
                  item={{
                    ...convertDocToObj(product),
                    qty: 0,
                    color: "",
                    size: "",
                  }}
                />
              </div>
            )}
          </div>

          {/* Product Information Sections */}
          <div className="mt-6 space-y-4">
            {data.map((item, index) => (
              <div className="border border-gray-700 rounded-lg overflow-hidden" key={index}>
                <input
                  type="checkbox"
                  id={`accordion-${index}`}
                  className="hidden peer"
                  defaultChecked={index === 0}
                />
                <label htmlFor={`accordion-${index}`} className="block p-3 cursor-pointer bg-black text-white hover:bg-gray-800 font-medium">
                  {item.title}
                </label>
                <div className="p-4 bg-gray-900 text-gray-400 peer-checked:block hidden">
                  {item.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

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
    <div className="my-2 ">
      <Link href="/store" className="font-semibold underline underline-offset-1 hover:text-white">Back to products</Link>
    </div>
    <div className="grid grid-cols-2 rounded-3xl">
      <div className="pr-8 pb-3">
        <Image
          src={product.image}
          alt={product.name}
          width={600}
          height={600}
          sizes="100vw"
          className="h-full rounded-3xl items-center justify-center border border-cyan-50 bg-gradient-to-b from-zinc-900 via-[#292929] to-[#070707]"
        ></Image>
{/*         <div className="flex items-center justify-center gap-7 py-4">
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-[30%] h-[38vh] rounded-3xl items-center justify-center border p-3  border-cyan-50 bg-gradient-to-b from-zinc-900 via-[#292929] to-[#070707]"
          ></Image>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-[30%] h-[38vh] rounded-3xl items-center justify-center border p-3  border-cyan-50 bg-gradient-to-b from-zinc-900 via-[#292929] to-[#070707]"
          ></Image>
          <Image
            src={product.image}
            alt={product.name}
            width={200}
            height={200}
            className="w-[30%] h-[38vh] rounded-3xl items-center justify-center border p-3  border-cyan-50 bg-gradient-to-b from-zinc-900 via-[#292929] to-[#070707]"
          ></Image>
        </div> */}
      </div>
      <div className="p-4">
        <ul className="space-y-4">
          <li>
            <h1 className="font-bold text-2xl py-2">{product.name}</h1>
          </li>
          <li>
            <Rating
              value={product.rating}
              caption={`${product.numReviews} ratings`}
            />
          </li>
          <li>{product.brand}</li>
          <li>
            <div className="divider"></div>
          </li>
          <li className="font-bold">
            Description:{" "}
            <p className="py-2 font-light">{product.description}</p>
          </li>
        </ul>
        <div className="divider"></div>
        <div className="card shadow-xl mt-3 md:mt-0">
          <div className="card-body">
            <div className="mb-2 font-bold flex justify-between">
              <div>Price</div>
              <div>${product.price}</div>
            </div>
            <div className="mb-2 font-bold flex justify-between">
              <div>Status</div>
              <div>
                {product.countInStock > 0 ? "In stock" : "Unavailable"}
              </div>
            </div>
            {product.countInStock !== 0 && (
              <div className="card-actions justify-center">
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
        </div>
        <div className="divider"></div>
        {data.map((item, index) => (
          <div className="collapse collapse-arrow" key={index}>
            <input
              type="radio"
              name="my-accordion-2"
              defaultChecked={index === 0}
              aria-label="ee"
            />
            <div className="collapse-title text-md font-medium underline">
              {item.title}
            </div>
            <div className="collapse-content text-xs font-extralight">
              <p>{item.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </>
  )
}

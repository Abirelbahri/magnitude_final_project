'use client'
import Loading from '@/components/dashboardfeatures/loading/loading'
import { Product } from '@/lib/models/ProductModel'
import { formatId } from '@/lib/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import useSWR from 'swr'
import useSWRMutation from 'swr/mutation'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function Products() {
  const { data: products, error } = useSWR(`/api/admin/products`)
  const router = useRouter()

  const { trigger: deleteProduct } = useSWRMutation(
    `/api/admin/products`,
    async (url, { arg }: { arg: { productId: string } }) => {
      const toastId = toast.loading('Deleting product...')
      const res = await fetch(`${url}/${arg.productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      res.ok
        ? toast.success('Product Deleted successfully', {
            id: toastId,
          })
        : toast.error(data.message, {
            id: toastId,
          })
    }
  )

  const { trigger: createProduct, isMutating: isCreating } = useSWRMutation(
    `/api/admin/products`,
    async (url) => {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (!res.ok) return toast.error(data.message)

      toast.success('Product Created Successfully')
      router.push(`/admin/products/${data.product._id}`)
    }
  )

  if (error) return 'An error has occurred.'
  if (!products) return <Loading/>

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl text-white">Products</h1>
        <button
          disabled={isCreating}
          onClick={() => createProduct()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
        >
          {isCreating && <span className="loading loading-spinner"></span>}
          Create
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-gray-700 bg-black text-white">
          <thead className='bg-[#292929]'>
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">ID</th>
              <th className="px-4 py-2 border-b border-gray-700">Name</th>
              <th className="px-4 py-2 border-b border-gray-700">Price</th>
              <th className="px-4 py-2 border-b border-gray-700">Category</th>
              <th className="px-4 py-2 border-b border-gray-700">Stock</th>
              <th className="px-4 py-2 border-b border-gray-700">Rating</th>
              <th className="px-4 py-2 border-b border-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr key={product._id} className="hover:bg-gray-800">
                <td className="px-4 py-2 border-b border-gray-700">{formatId(product._id!)}</td>
                <td className="px-4 py-2 border-b border-gray-700">{product.name}</td>
                <td className="px-4 py-2 border-b border-gray-700">${product.price}</td>
                <td className="px-4 py-2 border-b border-gray-700">{product.category}</td>
                <td className="px-4 py-2 border-b border-gray-700">{product.countInStock}</td>
                <td className="px-4 py-2 border-b border-gray-700">{product.rating}</td>
                <td className="px-4 py-2 border-b border-gray-700 flex space-x-2">
                  <Link
                    href={`/admin/products/${product._id}`}
                    className="p-2 bg-gray-600 text-white rounded hover:bg-gray-500 transition"
                    aria-label={`Edit product ${product.name}`}
                  >
                    <FaEdit />
                  </Link>
                  <button
                    onClick={() => deleteProduct({ productId: product._id! })}
                    type="button"
                    className="p-2 bg-red-600 text-white rounded hover:bg-red-500 transition"
                    aria-label={`Delete product ${product.name}`}
                  >
                    <MdDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

'use client'
import Loading from '@/components/dashboardfeatures/loading/loading'
import { Order } from '@/lib/models/OrderModel'
import Link from 'next/link'
import useSWR from 'swr'

export default function Orders() {
  const { data: orders, error } = useSWR(`/api/admin/orders`)
  if (error) return 'An error has occurred.'
  if (!orders) return <Loading/>

  return (
    <div className="p-4">
      <h1 className="py-4 text-2xl text-white">Orders</h1>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left border border-gray-700 bg-black">
          <thead className='bg-[#292929] text-white'>
            <tr>
              <th className="px-4 py-2 border-b border-gray-700">ID</th>
              <th className="px-4 py-2 border-b border-gray-700">USER</th>
              <th className="px-4 py-2 border-b border-gray-700">DATE</th>
              <th className="px-4 py-2 border-b border-gray-700">TOTAL</th>
              <th className="px-4 py-2 border-b border-gray-700">PAID</th>
              <th className="px-4 py-2 border-b border-gray-700">DELIVERED</th>
              <th className="px-4 py-2 border-b border-gray-700">ACTION</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id} className="hover:bg-gray-800">
                <td className="px-4 py-2 border-b border-gray-700">..{order._id.substring(20, 24)}</td>
                <td className="px-4 py-2 border-b border-gray-700">{order.user?.name || 'Deleted user'}</td>
                <td className="px-4 py-2 border-b border-gray-700">{order.createdAt.substring(0, 10)}</td>
                <td className="px-4 py-2 border-b border-gray-700">${order.totalPrice}</td>
                
                {/* Paid Badge */}
                <td className="px-4 py-2 border-b border-gray-700">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.isPaid ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {order.isPaid && order.paidAt
                      ? `${order.paidAt.substring(0, 10)}`
                      : 'Not paid'}
                  </span>
                </td>

                {/* Delivered Badge */}
                <td className="px-4 py-2 border-b border-gray-700">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    order.isDelivered ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                  }`}>
                    {order.isDelivered && order.deliveredAt
                      ? `${order.deliveredAt.substring(0, 10)}`
                      : 'Not delivered'}
                  </span>
                </td>

                <td className="px-4 py-2 border-b border-gray-700">
                  <Link href={`/store/order/${order._id}`} className="text-blue-500 hover:underline">
                    Details
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

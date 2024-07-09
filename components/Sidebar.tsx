'use client'

import useLayoutService from '@/lib/hooks/useLayout'
import Link from 'next/link'
import useSWR from 'swr'
import Loading from './dashboardfeatures/loading/loading'

const Sidebar = () => {
  const { toggleDrawer } = useLayoutService()
  const { data: categories, error } = useSWR('/api/products/categories')

  if (error) return error.message
  if (!categories) return <Loading/>

  return (
    <ul className="menu p-4 w-80 min-h-full text-base-content bg-[#070707]">
      <li>
        <h2 className="text-xl uppercase font-bold">Categories</h2>
      </li>
      {categories.map((category: string) => (
        <li key={category}>
          <Link href={`/store/search?category=${category}`} onClick={toggleDrawer}>
            {category}
          </Link>
        </li>
      ))}
    </ul>
  )
}

export default Sidebar

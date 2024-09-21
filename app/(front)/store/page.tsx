import ProductItem from "@/components/products/ProductItem";
import { Rating } from "@/components/products/Rating";
import productServices from "@/lib/services/productService";
import Link from "next/link";

const sortOrders = ["Newest", "Lowest", "Highest", "Rating"];
const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [5, 4, 3, 2, 1];

export async function generateMetadata({
  searchParams: { q = "all", category = "all", price = "all", rating = "all" },
}) {
  if (
    (q !== "all" && q !== "") ||
    category !== "all" ||
    rating !== "all" ||
    price !== "all"
  ) {
    return {
      title: `Search ${q !== "all" ? q : ""}
          ${category !== "all" ? ` : Category ${category}` : ""}
          ${price !== "all" ? ` : Price ${price}` : ""}
          ${rating !== "all" ? ` : Rating ${rating}` : ""}`,
    };
  } else {
    return {
      title: "Search Products",
    };
  }
}

export default async function SearchPage({
  searchParams: {
    q = "all",
    category = "all",
    price = "all",
    rating = "all",
    sort = "newest",
    page = "1",
  },
}) {
// Adjusting the getFilterUrl function to accept optional parameters
const getFilterUrl = ({
  c,
  s,
  p,
  r,
  pg,
}: {
  c?: string; // Making all properties optional
  s?: string;
  p?: string;
  r?: string;
  pg?: string;
}) => {
  const params = { q, category, price, rating, sort, page };
  if (c) params.category = c;
  if (p) params.price = p;
  if (r) params.rating = r;
  if (pg) params.page = pg;
  if (s) params.sort = s;
  return `/store?${new URLSearchParams(params).toString()}`;
};


  const categories = await productServices.getCategories();
  const { countProducts, products, pages } = await productServices.getByQuery({
    category,
    q,
    price,
    rating,
    page,
    sort,
  });

  return (
    <div className="grid md:grid-cols-4 gap-6 p-6 bg-black text-white">
      <aside className="space-y-6 bg-black p-4 border border-gray-700">
        {/* Categories Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Categories</h2>
          <ul className="space-y-1">
            <li>
              <Link
                className={`text-sm block ${
                  "all" === category ? "font-bold text-blue-500" : "text-gray-400"
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                All Categories
              </Link>
            </li>
            {categories.map((c) => (
              <li key={c}>
                <Link
                  className={`text-sm block ${
                    c === category ? "font-bold text-blue-500" : "text-gray-400"
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Price Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Price</h2>
          <ul className="space-y-1">
            <li>
              <Link
                className={`text-sm block ${
                  "all" === price ? "font-bold text-blue-500" : "text-gray-400"
                }`}
                href={getFilterUrl({ p: "all" })}
              >
                All Prices
              </Link>
            </li>
            {prices.map((p) => (
              <li key={p.value}>
                <Link
                  href={getFilterUrl({ p: p.value })}
                  className={`text-sm block ${
                    p.value === price ? "font-bold text-blue-500" : "text-gray-400"
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        {/* Rating Section */}
        <section>
          <h2 className="text-lg font-semibold mb-3">Customer Review</h2>
          <ul className="space-y-1">
            <li>
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`text-sm block ${
                  "all" === rating ? "font-bold text-blue-500" : "text-gray-400"
                }`}
              >
                All Reviews
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`text-sm block ${
                    `${r}` === rating ? "font-bold text-blue-500" : "text-gray-400"
                  }`}
                >
                  <Rating caption={" & up"} value={r} />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </aside>

      <main className="md:col-span-3 space-y-6">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 bg-black border border-gray-700">
          <div className="text-gray-400">
            {products.length === 0 ? "No" : countProducts} Results
            {q !== "all" && ` : ${q}`}
            {category !== "all" && ` : ${category}`}
            {price !== "all" && ` : Price ${price}`}
            {rating !== "all" && ` : Rating ${rating} & up`}
            {["all", category, rating, price].includes("all") ? null : (
              <Link className="ml-2 text-blue-500 underline" href="/store">
                Clear Filters
              </Link>
            )}
          </div>
          <div className="flex items-center space-x-2">
            <span>Sort by:</span>
            {sortOrders.map((order) => (
              <Link
                key={order}
                href={getFilterUrl({ s: order })}
                className={`text-sm font-medium ${
                  sort === order ? "text-blue-500" : "text-gray-400"
                }`}
              >
                {order}
              </Link>
            ))}
          </div>
        </div>

        {/* Products Section */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductItem key={product.slug} product={product} />
          ))}
        </div>

        {/* Pagination Section */}
        {pages > 1 && (
          <div className="flex justify-center mt-6">
            {Array.from({ length: pages }, (_, index) => (
              <Link
                key={index}
                className={`mx-1 px-3 py-1 rounded-md border border-gray-700 ${
                  Number(page) === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-black text-gray-400"
                }`}
                href={getFilterUrl({ pg: `${index + 1}` })}
              >
                {index + 1}
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

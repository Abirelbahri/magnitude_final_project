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
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
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
}: {
  searchParams: {
    q: string;
    category: string;
    price: string;
    rating: string;
    sort: string;
    page: string;
  };
}) {
  const getFilterUrl = ({
    c,
    s,
    p,
    r,
    pg,
  }: {
    c?: string;
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
    <div className="grid md:grid-cols-5 gap-5 p-4">
      <div>
        <div className="text-sm font-semibold pb-3">Categories</div>
        <div>
          <ul>
            <li>
              <Link
                className={`link link-hover text-white font-bold text-xs ${
                  "all" === category ? "link-primary" : ""
                }`}
                href={getFilterUrl({ c: "all" })}
              >
                All Categories
              </Link>
            </li>
            {categories.map((c: string) => (
              <li key={c}>
                <Link
                  className={`link link-hover  text-sm${
                    c === category ? "link-primary" : ""
                  }`}
                  href={getFilterUrl({ c })}
                >
                  {c}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xl font-semibold pb-3 pt-5">Price</div>
          <ul>
            <li>
              <Link
                className={`link link-hover text-white font-bold text-xs ${
                  "all" === price ? "link-primary" : ""
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
                  className={`link link-hover text-sm ${
                    p.value === price ? "link-primary" : ""
                  }`}
                >
                  {p.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-xl font-semibold pb-3 pt-5">Customer Review</div>
          <ul>
            <li>
              <Link
                href={getFilterUrl({ r: "all" })}
                className={`link link-hover text-white font-bold text-xs ${
                  "all" === rating ? "link-primary" : ""
                }`}
              >
                All Reviews
              </Link>
            </li>
            {ratings.map((r) => (
              <li key={r}>
                <Link
                  href={getFilterUrl({ r: `${r}` })}
                  className={`link link-hover ${
                    `${r}` === rating ? "link-primary" : ""
                  }`}
                >
                  <Rating caption={" & up"} value={r}></Rating>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="md:col-span-4">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            {products.length === 0 ? "No" : countProducts} Results
            {q !== "all" && q !== "" && ` : ${q}`}
            {category !== "all" && ` : ${category}`}
            {price !== "all" && ` : Price ${price}`}
            {rating !== "all" && ` : Rating ${rating} & up`}
            &nbsp;
            {(q !== "all" && q !== "") ||
            category !== "all" ||
            rating !== "all" ||
            price !== "all" ? (
              <Link className="btn btn-sm btn-ghost ml-2" href="/store">
                Clear
              </Link>
            ) : null}
          </div>
          <div className="flex items-center space-x-2">
            <span>Sort by:</span>
            {sortOrders.map((order) => (
              <Link
                key={order}
                href={getFilterUrl({ s: order })}
                className={`link link-hover ${
                  sort === order
                    ? "text-gray-300 font-semibold"
                    : "text-gray-600"
                }`}
              >
                {order}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {products.map((product) => (
              <ProductItem key={product.slug} product={product} />
            ))}
          </div>
          <div className="join flex justify-center mt-4">
            {products.length > 0 &&
              Array.from(Array(pages).keys()).map((p) => (
                <Link
                  key={p}
                  className={`join-item btn ${
                    Number(page) === p + 1 ? "btn-active" : ""
                  }`}
                  href={getFilterUrl({ pg: `${p + 1}` })}
                >
                  {p + 1}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}

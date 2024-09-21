"use client";
import Link from "next/link";
import { Bar, Doughnut, Line, Pie } from "react-chartjs-2";
import useSWR from "swr";
import { formatNumber } from "@/lib/utils";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement,
} from "chart.js";
import Loading from "@/components/dashboardfeatures/loading/loading";
import { IoIosArrowDroprightCircle } from "react-icons/io";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement,
  ArcElement
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
      labels: {
        color: "white", // Adjusts legend text color
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "white", // Adjusts x-axis text color
      },
    },
    y: {
      ticks: {
        color: "white", // Adjusts y-axis text color
      },
    },
  },
};

const Dashboard = () => {
  const { data: summary, error } = useSWR(`/api/admin/orders/summary`);

  if (error) return error.message;
  if (!summary) return <Loading />;

  const salesData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Sales",
        data: summary.salesData.map(
          (x: { totalSales: number }) => x.totalSales
        ),
        borderColor: "#22C55E", // Adjusted color to green
        backgroundColor: "rgba(34, 197, 94, 0.3)", // Slight transparency for fill
      },
    ],
  };
  const ordersData = {
    labels: summary.salesData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        fill: true,
        label: "Orders",
        data: summary.salesData.map(
          (x: { totalOrders: number }) => x.totalOrders
        ),
        borderColor: "#3B82F6", // Adjusted color to blue
        backgroundColor: "rgba(59, 130, 246, 0.3)",
      },
    ],
  };
  const productsData = {
    labels: summary.productsData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: "Category",
        data: summary.productsData.map(
          (x: { totalProducts: number }) => x.totalProducts
        ),
        backgroundColor: [
          "#F87171",
          "#60A5FA",
          "#FBBF24",
          "#34D399",
          "#A78BFA",
          "#F59E0B",
        ],
        borderColor: [
          "#EF4444",
          "#3B82F6",
          "#F59E0B",
          "#10B981",
          "#8B5CF6",
          "#D97706",
        ],
        borderWidth: 1,
      },
    ],
  };
  const usersData = {
    labels: summary.usersData.map((x: { _id: string }) => x._id),
    datasets: [
      {
        label: "Users",
        borderColor: "#3B82F6", // Blue
        backgroundColor: "rgba(59, 130, 246, 0.5)",
        data: summary.usersData.map(
          (x: { totalUsers: number }) => x.totalUsers
        ),
      },
    ],
  };

  return (
    <div className="p-4 min-h-screen bg-black text-white">
      <div className="my-2 grid gap-6 md:grid-cols-4">
        <div className="stat p-4  border border-gray-700 rounded-xl shadow-md">
          <div className="stat-title text-gray-300 font-semibold">Sales</div>
          <div className="stat-value text-green-500">
            ${formatNumber(summary.ordersPrice)}
          </div>
        </div>
        <div className="stat p-4 border border-gray-700 rounded-xl shadow-md">
          <div className="stat-title text-gray-300 font-semibold">Orders</div>
          <div className="stat-value text-blue-400">{summary.ordersCount}</div>
          <div className="stat-desc text-gray-400 hover:underline">
            <Link href="/admin/orders">
              <div className="flex items-center cursor-pointer">
                View orders
                <IoIosArrowDroprightCircle className="ml-1 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
        <div className="stat p-4 border border-gray-700 rounded-xl shadow-md">
          <div className="stat-title text-gray-300 font-semibold">Products</div>
          <div className="stat-value text-yellow-400">
            {summary.productsCount}
          </div>
          <div className="stat-desc text-gray-400 hover:underline">
            <Link href="/admin/products">
              <div className="flex items-center cursor-pointer">
                View products
                <IoIosArrowDroprightCircle className="ml-1 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
        <div className="stat p-4 border border-gray-700 rounded-xl shadow-md">
          <div className="stat-title text-gray-300 font-semibold">Users</div>
          <div className="stat-value text-red-400">{summary.usersCount}</div>
          <div className="stat-desc text-gray-400 hover:underline">
            <Link href="/admin/users">
              <div className="flex items-center cursor-pointer">
                View Users
                <IoIosArrowDroprightCircle className="ml-1 h-5 w-5" />
              </div>
            </Link>
          </div>
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="border border-gray-700 rounded-xl p-4 shadow-md">
          <h2 className="text-lg py-1">Sales Report</h2>
          <Line data={salesData} options={options} />
        </div>
        <div className="border border-gray-700 rounded-xl p-4 shadow-md">
          <h2 className="text-lg py-1">Orders Report</h2>
          <Line data={ordersData} options={options} />
        </div>
      </div>
      <div className="grid md:grid-cols-2 gap-6 my-6">
        <div className="border border-gray-700 rounded-xl p-4 shadow-md">
          <h2 className="text-lg py-1">Products Report</h2>
          <div className="flex items-center justify-center h-64 w-full">
            <Pie data={productsData} options={options} />
          </div>
        </div>
        <div className="border border-gray-700 rounded-xl p-4 shadow-md">
          <h2 className="text-lg py-1">Users Report</h2>
          <Bar data={usersData} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

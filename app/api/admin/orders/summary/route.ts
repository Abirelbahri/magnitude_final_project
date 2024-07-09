import dbConnect from "@/lib/dbConnect";
import { auth } from "@/lib/auth";
import OrderModel from "@/lib/models/OrderModel";
import UserModel from "@/lib/models/UserModel";
import ProductModel from "@/lib/models/ProductModel";

export const GET = auth(async (req: any) => {
  if (!req.auth || !req.auth.user?.isAdmin) {
    return new Response(JSON.stringify({ message: "unauthorized" }), {
      status: 401,
    });
  }

  await dbConnect();

  try {
    const ordersCount = await OrderModel.countDocuments();
    const productsCount = await ProductModel.countDocuments();
    const usersCount = await UserModel.countDocuments();

    const ordersPriceGroup = await OrderModel.aggregate([
      {
        $group: {
          _id: null,
          sales: { $sum: "$totalPrice" },// sum fiha lmouchkil
        },
      },
    ]);
    const ordersPrice =
      ordersPriceGroup.length > 0 ? Math.round(ordersPriceGroup[0].sales * 100 )/ 100 : 0;
      //changed the function for the Price mathemathecally
    const salesData = await OrderModel.aggregate([
      {
        $match: { createdAt: { $type: "date" } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d %H", date: "$createdAt" } },
          totalOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const usersData = await UserModel.aggregate([
      {
        $match: { createdAt: { $type: "date" } },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d %H", date: "$createdAt" } },
          totalUsers: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const productsData = await ProductModel.aggregate([
      {
        $group: {
          _id: "$category",
          totalProducts: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return new Response(
      JSON.stringify({
        ordersCount,
        productsCount,
        usersCount,
        ordersPrice,
        salesData,
        productsData,
        usersData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching data:", error);
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error",
          error: error.message,
        }),
        { status: 500 }
      );
    } else {
      return new Response(
        JSON.stringify({
          message: "Internal Server Error",
          error: "An unknown error occurred",
        }),
        { status: 500 }
      );
    }
  }
}) as any;

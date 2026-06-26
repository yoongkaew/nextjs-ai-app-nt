// src/services/admin.ts
// Service layer for the admin dashboard (Prisma / MariaDB).
// All Decimal values are converted to number here so results are safe to
// pass across the Server -> Client component boundary.
import { connection } from "next/server";
import prisma from "@/lib/prisma";

export type OrderStatus = "delivered" | "received" | "processing";

export type DashboardStats = {
  productCount: number;
  orderCount: number;
  customerCount: number;
  totalRevenue: number;
  statusBreakdown: Record<OrderStatus, number>;
};

export type RecentOrder = {
  id: number;
  date: Date | null;
  status: OrderStatus | null;
  totalAmount: number;
  customerName: string;
};

export type AdminProductRow = {
  id: number;
  name: string;
  price: number;
  categoryName: string;
  orderCount: number;
};

export type AdminOrderRow = {
  id: number;
  date: Date | null;
  status: OrderStatus | null;
  totalAmount: number;
  customerName: string;
  itemCount: number;
};

/**
 * Dashboard KPI summary. Every figure is computed in the database
 * (count / aggregate / groupBy) rather than by loading rows into Node —
 * five independent queries run concurrently via Promise.all.
 */
export async function getDashboardStats(): Promise<DashboardStats> {
  // ข้อมูลแอดมินเป็น dynamic ต่อ request — หยุด prerender ก่อนแตะ DB
  // (cacheComponents เปิดอยู่ จึงต้องบอก Next.js ผ่าน connection())
  await connection();

  const [productCount, orderCount, customerCount, revenue, statusGroups] =
    await Promise.all([
      prisma.products.count(),
      prisma.orders.count(),
      prisma.customers.count(),
      prisma.orders.aggregate({ _sum: { total_amount: true } }),
      prisma.orders.groupBy({
        by: ["status"],
        _count: { _all: true },
      }),
    ]);

  const statusBreakdown: Record<OrderStatus, number> = {
    delivered: 0,
    received: 0,
    processing: 0,
  };
  for (const group of statusGroups) {
    if (group.status) {
      statusBreakdown[group.status] = group._count._all;
    }
  }

  return {
    productCount,
    orderCount,
    customerCount,
    totalRevenue: Number(revenue._sum.total_amount ?? 0),
    statusBreakdown,
  };
}

/** Most recent orders for the dashboard activity feed. */
export async function getRecentOrders(limit = 5): Promise<RecentOrder[]> {
  await connection();

  const orders = await prisma.orders.findMany({
    take: limit,
    orderBy: { date: "desc" },
    select: {
      id: true,
      date: true,
      status: true,
      total_amount: true,
      customers: { select: { name: true } },
    },
  });

  return orders.map((order) => ({
    id: order.id,
    date: order.date,
    status: order.status,
    totalAmount: Number(order.total_amount ?? 0),
    customerName: order.customers?.name ?? "ไม่ระบุลูกค้า",
  }));
}

/** Full product list for the management table. */
export async function getAdminProducts(): Promise<AdminProductRow[]> {
  await connection();

  const products = await prisma.products.findMany({
    orderBy: { id: "asc" },
    select: {
      id: true,
      name: true,
      price: true,
      categories: { select: { name: true } },
      _count: { select: { order_items: true } },
    },
  });

  return products.map((product) => ({
    id: product.id,
    name: product.name ?? "ไม่ระบุชื่อสินค้า",
    price: Number(product.price ?? 0),
    categoryName: product.categories?.name ?? "ไม่ระบุหมวดหมู่",
    orderCount: product._count.order_items,
  }));
}

/** Full order list for the management table. */
export async function getAdminOrders(): Promise<AdminOrderRow[]> {
  await connection();

  const orders = await prisma.orders.findMany({
    orderBy: { date: "desc" },
    select: {
      id: true,
      date: true,
      status: true,
      total_amount: true,
      customers: { select: { name: true } },
      _count: { select: { order_items: true } },
    },
  });

  return orders.map((order) => ({
    id: order.id,
    date: order.date,
    status: order.status,
    totalAmount: Number(order.total_amount ?? 0),
    customerName: order.customers?.name ?? "ไม่ระบุลูกค้า",
    itemCount: order._count.order_items,
  }));
}

import type { Metadata } from "next";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAdminOrders } from "@/services/admin";
import { formatTHB, formatNumber, formatDate } from "@/lib/format";
import { OrderStatusBadge } from "../components/order-status-badge";

export const metadata: Metadata = {
  title: "คำสั่งซื้อ — แผงควบคุมผู้ดูแล",
};

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="font-heading text-3xl tracking-tight text-primary">
          คำสั่งซื้อ
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          ทั้งหมด {formatNumber(orders.length)} รายการ
        </p>
      </header>

      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ลูกค้า</TableHead>
              <TableHead>วันที่</TableHead>
              <TableHead className="text-right">จำนวนสินค้า</TableHead>
              <TableHead>สถานะ</TableHead>
              <TableHead className="text-right">ยอดรวม</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-muted-foreground py-8 text-center"
                >
                  ยังไม่มีคำสั่งซื้อ
                </TableCell>
              </TableRow>
            ) : (
              orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono text-xs">{order.id}</TableCell>
                  <TableCell className="font-medium">
                    {order.customerName}
                  </TableCell>
                  <TableCell>{formatDate(order.date)}</TableCell>
                  <TableCell className="text-right">
                    {formatNumber(order.itemCount)}
                  </TableCell>
                  <TableCell>
                    <OrderStatusBadge status={order.status} />
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatTHB(order.totalAmount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

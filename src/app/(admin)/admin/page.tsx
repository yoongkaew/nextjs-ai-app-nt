import type { Metadata } from "next";
import { Suspense } from "react";
import { Package, ShoppingCart, Users, Banknote } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDashboardStats, getRecentOrders } from "@/services/admin";
import { formatTHB, formatNumber, formatDate } from "@/lib/format";
import { OrderStatusBadge } from "./components/order-status-badge";

export const metadata: Metadata = {
  title: "ภาพรวม — แผงควบคุมผู้ดูแล",
};

export default function AdminDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <header>
        <h1 className="font-heading text-3xl tracking-tight text-primary">
          ภาพรวม
        </h1>
        <p className="text-muted-foreground mt-1 text-sm">
          สรุปข้อมูลร้านค้าแบบเรียลไทม์
        </p>
      </header>

      {/* KPI + สถานะ ใช้ข้อมูล dynamic จาก DB → อยู่ใน Suspense */}
      <Suspense fallback={<StatsSkeleton />}>
        <StatsSection />
      </Suspense>

      <section className="flex flex-col gap-4">
        <h2 className="font-heading text-xl tracking-tight text-primary">
          คำสั่งซื้อล่าสุด
        </h2>
        <Suspense fallback={<RecentOrdersSkeleton />}>
          <RecentOrdersSection />
        </Suspense>
      </section>
    </div>
  );
}

async function StatsSection() {
  const stats = await getDashboardStats();

  const cards = [
    {
      label: "รายได้รวม",
      value: formatTHB(stats.totalRevenue),
      icon: Banknote,
    },
    {
      label: "คำสั่งซื้อ",
      value: formatNumber(stats.orderCount),
      icon: ShoppingCart,
    },
    {
      label: "สินค้า",
      value: formatNumber(stats.productCount),
      icon: Package,
    },
    {
      label: "ลูกค้า",
      value: formatNumber(stats.customerCount),
      icon: Users,
    },
  ];

  return (
    <>
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="flex flex-col gap-3 border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <span className="text-caption text-muted-foreground uppercase tracking-[0.08em]">
                {label}
              </span>
              <Icon className="size-4 text-tertiary" />
            </div>
            <span className="font-heading text-2xl text-foreground">
              {value}
            </span>
          </div>
        ))}
      </section>

      <section className="flex flex-wrap gap-3">
        <StatusPill label="กำลังดำเนินการ" count={stats.statusBreakdown.processing} />
        <StatusPill label="จัดส่งแล้ว" count={stats.statusBreakdown.delivered} />
        <StatusPill label="รับสินค้าแล้ว" count={stats.statusBreakdown.received} />
      </section>
    </>
  );
}

async function RecentOrdersSection() {
  const recentOrders = await getRecentOrders(5);

  return (
    <div className="border border-border bg-card">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>ลูกค้า</TableHead>
            <TableHead>วันที่</TableHead>
            <TableHead>สถานะ</TableHead>
            <TableHead className="text-right">ยอดรวม</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentOrders.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={5}
                className="text-muted-foreground py-8 text-center"
              >
                ยังไม่มีคำสั่งซื้อ
              </TableCell>
            </TableRow>
          ) : (
            recentOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-mono text-xs">{order.id}</TableCell>
                <TableCell>{order.customerName}</TableCell>
                <TableCell>{formatDate(order.date)}</TableCell>
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
  );
}

function StatusPill({ label, count }: { label: string; count: number }) {
  return (
    <div className="flex items-baseline gap-2 border border-border bg-card px-4 py-2">
      <span className="font-heading text-lg text-foreground">{count}</span>
      <span className="text-caption text-muted-foreground">{label}</span>
    </div>
  );
}

function StatsSkeleton() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className="h-[104px] animate-pulse border border-border bg-card"
        />
      ))}
    </section>
  );
}

function RecentOrdersSkeleton() {
  return (
    <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
      กำลังโหลดคำสั่งซื้อ…
    </div>
  );
}

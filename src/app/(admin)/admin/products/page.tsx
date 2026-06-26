import type { Metadata } from "next";
import { Suspense } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getAdminProducts } from "@/services/admin";
import { formatTHB, formatNumber } from "@/lib/format";

export const metadata: Metadata = {
  title: "สินค้า — แผงควบคุมผู้ดูแล",
};

export default function AdminProductsPage() {
  return (
    <div className="flex flex-col gap-6">
      <header className="flex items-end justify-between gap-4">
        <div>
          <h1 className="font-heading text-3xl tracking-tight text-primary">
            สินค้า
          </h1>
        </div>
      </header>

      {/* ข้อมูลจาก DB เป็น dynamic (cacheComponents) จึงต้องอยู่ใน Suspense */}
      <Suspense fallback={<ProductsSkeleton />}>
        <ProductsSection />
      </Suspense>
    </div>
  );
}

async function ProductsSection() {
  const products = await getAdminProducts();

  return (
    <>
      <p className="text-muted-foreground text-sm">
        ทั้งหมด {formatNumber(products.length)} รายการ
      </p>

      <div className="border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>ชื่อสินค้า</TableHead>
              <TableHead>หมวดหมู่</TableHead>
              <TableHead className="text-right">ราคา</TableHead>
              <TableHead className="text-right">ขายแล้ว</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-muted-foreground py-8 text-center"
                >
                  ยังไม่มีสินค้า
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-mono text-xs">
                    {product.id}
                  </TableCell>
                  <TableCell className="font-medium">{product.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{product.categoryName}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatTHB(product.price)}
                  </TableCell>
                  <TableCell className="text-right">
                    {formatNumber(product.orderCount)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

function ProductsSkeleton() {
  return (
    <div className="border border-border bg-card p-8 text-center text-sm text-muted-foreground">
      กำลังโหลดสินค้า…
    </div>
  );
}

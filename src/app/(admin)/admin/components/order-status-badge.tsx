import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/services/admin";

const STATUS_CONFIG: Record<
  OrderStatus,
  { label: string; variant: "default" | "secondary" | "outline" }
> = {
  delivered: { label: "จัดส่งแล้ว", variant: "default" },
  received: { label: "รับสินค้าแล้ว", variant: "secondary" },
  processing: { label: "กำลังดำเนินการ", variant: "outline" },
};

export function OrderStatusBadge({ status }: { status: OrderStatus | null }) {
  if (!status) {
    return <Badge variant="ghost">ไม่ระบุ</Badge>;
  }
  const { label, variant } = STATUS_CONFIG[status];
  return <Badge variant={variant}>{label}</Badge>;
}

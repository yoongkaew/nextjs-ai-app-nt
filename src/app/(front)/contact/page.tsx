import type { Metadata } from "next";
import { Clock, Mail, Phone } from "lucide-react";

import { Separator } from "@/components/ui/separator";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = {
  title: "ติดต่อเรา",
  description: "ติดต่อทีมงานของเรา ส่งข้อความถึงเราได้ที่นี่",
};

const contactInfo = [
  { icon: Mail, label: "Email", value: "support@example.com" },
  { icon: Phone, label: "เบอร์โทร", value: "02-123-4567" },
  { icon: Clock, label: "เวลาทำการ", value: "จันทร์ - ศุกร์ 09:00 - 18:00 น." },
];

// http://localhost:3000/contact
export default function ContactPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">ติดต่อเรา</h1>
        <p className="text-muted-foreground">
          มีคำถามหรือข้อเสนอแนะ? กรอกแบบฟอร์มด้านล่างแล้วเราจะติดต่อกลับโดยเร็วที่สุด
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-[1fr_1.6fr] md:gap-12">
        {/* คอลัมน์ซ้าย — ข้อมูลติดต่อ */}
        <div className="space-y-6">
          <ul className="space-y-4">
            {contactInfo.map(({ icon: Icon, label, value }) => (
              <li key={label} className="flex items-center gap-3">
                <span className="bg-muted text-muted-foreground flex size-10 shrink-0 items-center justify-center rounded-md">
                  <Icon className="size-5" />
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-muted-foreground text-sm">{value}</span>
                </span>
              </li>
            ))}
          </ul>

          <Separator />

          <p className="text-muted-foreground text-sm leading-relaxed">
            ทีมงานของเรายินดีให้บริการและตอบทุกคำถามของคุณ
            โดยปกติเราจะตอบกลับภายใน 1-2 วันทำการ
          </p>
        </div>

        {/* คอลัมน์ขวา — ฟอร์ม */}
        <div>
          <ContactForm />
        </div>
      </div>
    </main>
  );
}

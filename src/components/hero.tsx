import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-(--breakpoint-xl) px-6 sm:px-8">
      {/* Specimen header row — mono metadata, editorial rhythm */}
      <div className="flex items-baseline justify-between border-b border-border py-6">
        <span className="text-mono text-muted-foreground">No. 001 — Specimen</span>
        <span className="text-mono text-muted-foreground">EB Garamond / Manrope</span>
      </div>

      <div className="grid grid-cols-1 gap-12 py-20 md:grid-cols-12 md:gap-8 md:py-32">
        {/* Left: oversized editorial headline */}
        <div className="md:col-span-8">
          <p className="text-eyebrow text-tertiary">Typography-forward commerce</p>
          <h1 className="text-hero mt-6">
            Letterforms
            <br />
            that carry the
            <br />
            <span className="italic text-tertiary">entire</span> layout.
          </h1>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Button asChild size="lg">
              <Link href="/product">
                เลือกซื้อสินค้า <ArrowUpRight className="size-5!" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/course">ดูคอร์สเรียน</Link>
            </Button>
          </div>
        </div>

        {/* Right: glyph specimen + supporting copy */}
        <div className="flex flex-col justify-between border-t border-border pt-8 md:col-span-4 md:border-t-0 md:border-l md:pt-0 md:pl-8">
          <div
            aria-hidden
            className="font-heading text-[10rem] leading-none text-primary/90 select-none md:text-[12rem]"
          >
            Aa
          </div>
          <p className="text-body-lg mt-8 max-w-sm text-muted-foreground">
            ระบบดีไซน์แบบ editorial ที่ให้ตัวอักษรเป็นพระเอก
            ผิวสัมผัสเรียบแบน ไร้เงา ขอบคม สื่อถึงงานพิมพ์ชั้นดี
          </p>
        </div>
      </div>

      {/* Weight ramp — specimen-sheet detail */}
      <div className="flex flex-wrap items-baseline gap-x-8 gap-y-2 border-y border-border py-6">
        <span className="font-sans text-2xl font-light">Light</span>
        <span className="font-sans text-2xl font-normal">Regular</span>
        <span className="font-sans text-2xl font-medium">Medium</span>
        <span className="font-sans text-2xl font-semibold">SemiBold</span>
        <span className="font-sans text-2xl font-bold">Bold</span>
        <span className="font-heading text-2xl italic">Italic</span>
      </div>
    </section>
  );
}

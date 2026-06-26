import Link from "next/link";
import { Suspense } from "react";
import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";

// http://localhost:3000/about

async function ApiVersion() {
  let version: string | null = null;
  try {
    const response = await fetch("https://api.codingthailand.com/api/version", {
      next: { revalidate: 3600 },
    });
    const apiInfo = await response.json();
    version = apiInfo.data.version;
  } catch {
    version = null;
  }

  if (version === null) {
    return <span className="text-muted-foreground">unavailable</span>;
  }
  return <span className="text-foreground">v{version}</span>;
}

const principles = [
  {
    no: "01",
    title: "ตัวอักษรคือพระเอก",
    body: "ทุกการตัดสินใจด้านเลย์เอาต์ล้วนรับใช้รูปทรงของตัวอักษร ลำดับชั้น น้ำหนัก และระยะห่างคือโครงสร้างหลักของงาน",
  },
  {
    no: "02",
    title: "เรียบแบน ไร้เงา",
    body: "ไม่มีเงา ไม่มีไล่เฉดสี ไม่มีลวดลายประดับ ลำดับความสำคัญเกิดจากสเกลและจังหวะของพื้นที่เท่านั้น",
  },
  {
    no: "03",
    title: "ขอบคมแบบงานพิมพ์",
    body: "มุมฉาก 0px ทุกพื้นผิว สะท้อนความแม่นยำของงานพิมพ์ดั้งเดิม ไม่มีการมนมุมในที่ใดเลย",
  },
  {
    no: "04",
    title: "โทนอุ่น อ่านสบาย",
    body: "พื้นหลังครีมอุ่นตา ระยะบรรทัด 1.75 เท่าในเนื้อหา สร้างจังหวะการอ่านแบบสิ่งพิมพ์ชั้นดี",
  },
];

const stats = [
  { value: "2018", label: "ก่อตั้ง" },
  { value: "12k+", label: "ผู้เรียน" },
  { value: "48", label: "หลักสูตร" },
  { value: "2", label: "ตระกูลฟอนต์" },
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-(--breakpoint-xl) px-6 sm:px-8">
      {/* Specimen header row */}
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-border py-6">
        <span className="text-mono text-muted-foreground">No. 002 — About</span>
        <span className="text-mono text-muted-foreground">Manifesto</span>
      </div>

      {/* Hero statement */}
      <section className="grid grid-cols-1 gap-8 py-16 sm:py-20 lg:grid-cols-12 lg:gap-12 lg:py-28">
        <div className="lg:col-span-8">
          <p className="text-eyebrow text-tertiary">เกี่ยวกับเรา</p>
          <h1 className="text-hero mt-6">
            เราออกแบบ
            <br />
            ด้วย <span className="italic text-tertiary">ตัวอักษร</span>
            <br />
            เป็นหัวใจ
          </h1>
        </div>
        <div className="flex items-end lg:col-span-4">
          <p className="text-body-lg text-muted-foreground">
            TypeGallery คือสตูดิโอและร้านค้าที่เชื่อว่างานออกแบบที่ดี
            เริ่มจากการให้เกียรติตัวอักษร — เราคัดสรรสินค้าและหลักสูตร
            ภายใต้ระบบดีไซน์แบบ editorial ที่เรียบ คม และอบอุ่น
          </p>
        </div>
      </section>

      {/* Stats specimen row */}
      <section className="grid grid-cols-2 gap-px border-y border-border bg-border sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-background px-2 py-8 text-center sm:py-10">
            <p className="font-heading text-5xl leading-none sm:text-6xl">
              {stat.value}
            </p>
            <p className="text-eyebrow mt-3 text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </section>

      {/* Manifesto body — editorial two columns */}
      <section className="grid grid-cols-1 gap-x-12 gap-y-8 py-16 sm:py-20 md:grid-cols-12 lg:py-28">
        <div className="md:col-span-4">
          <h2 className="text-h2">ปรัชญาการออกแบบ</h2>
        </div>
        <div className="space-y-6 md:col-span-8 md:columns-2 md:gap-12 md:space-y-0 [&>p]:mb-6">
          <p className="text-body text-foreground/80">
            เราหลีกเลี่ยงสิ่งที่แย่งความสนใจจากตัวอักษร ไม่มีไล่เฉดสี
            ไม่มีลวดลาย ไม่มีกราฟิกประดับ พื้นที่ว่างและจังหวะของบรรทัด
            คือเครื่องมือหลักในการสื่อสารลำดับชั้นของเนื้อหา
          </p>
          <p className="text-body text-foreground/80">
            การจับคู่ฟอนต์ระหว่าง serif (EB Garamond) และ sans-serif (Manrope)
            เป็นความตั้งใจ เราจำกัดไว้เพียงสองตระกูล เพื่อรักษาความกลมกลืน
            และใช้ตัวเอียงหรือ small-caps สำหรับการเน้น แทนการใช้สีหรือน้ำหนัก
          </p>
          <p className="text-body text-foreground/80">
            ทุกพื้นผิวมีขอบคม โทนสีครีมอุ่นตาปรากฏสม่ำเสมอ และสีขาวบริสุทธิ์
            จะใช้เฉพาะบนการ์ดที่ยกระดับขึ้นมาเท่านั้น นี่คือมรดกจากงานพิมพ์
            ที่เราพยายามถ่ายทอดสู่หน้าจอ
          </p>
        </div>
      </section>

      {/* Principles grid — responsive 1 / 2 / 4 */}
      <section className="border-t border-border py-16 sm:py-20 lg:py-28">
        <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4">
          {principles.map((p) => (
            <article
              key={p.no}
              className="group flex flex-col bg-background p-8 transition-colors hover:bg-secondary"
            >
              <span className="text-mono text-tertiary">{p.no}</span>
              <h3 className="text-h3 mt-6">{p.title}</h3>
              <p className="text-body mt-3 text-muted-foreground">{p.body}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Pull quote specimen */}
      <section className="border-t border-border py-16 sm:py-20 lg:py-28">
        <blockquote className="mx-auto max-w-4xl text-center">
          <p className="font-heading text-3xl italic leading-snug sm:text-4xl md:text-5xl md:leading-tight">
            “Readability and typographic craft must be evident at every scale.”
          </p>
          <footer className="text-eyebrow mt-8 text-muted-foreground">
            — TypeGallery Design System
          </footer>
        </blockquote>
      </section>

      {/* CTA + meta strip */}
      <section className="border-t border-border py-16 sm:py-20 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-h2 max-w-xl">พร้อมเริ่มต้นกับเราหรือยัง?</h2>
            <p className="text-body-lg mt-4 max-w-md text-muted-foreground">
              สำรวจสินค้าและหลักสูตรที่ออกแบบมาอย่างพิถีพิถัน
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button asChild size="lg">
              <Link href="/product">
                ดูสินค้า <ArrowUpRight className="size-5!" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/course">ดูหลักสูตร</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-2 border-t border-border pt-6">
          <span className="text-mono text-muted-foreground">
            API:{" "}
            <Suspense
              fallback={<span className="text-muted-foreground/60">loading…</span>}
            >
              <ApiVersion />
            </Suspense>
          </span>
          <Link
            href="/"
            className="text-mono text-tertiary underline-offset-4 hover:underline"
          >
            ← กลับหน้าหลัก
          </Link>
        </div>
      </section>
    </div>
  );
}

import Link from "next/link";
import { connection } from "next/server";

const columns = [
  {
    title: "ร้านค้า",
    links: [
      { label: "สินค้าทั้งหมด", href: "/product" },
      { label: "หลักสูตร", href: "/course" },
      { label: "ตะกร้าสินค้า", href: "/cart" },
    ],
  },
  {
    title: "บริษัท",
    links: [
      { label: "เกี่ยวกับเรา", href: "/about" },
      { label: "ติดต่อเรา", href: "/contact" },
    ],
  },
  {
    title: "บัญชี",
    links: [
      { label: "เข้าสู่ระบบ", href: "/login" },
      { label: "สมัครสมาชิก", href: "/signup" },
    ],
  },
];

export default async function SiteFooter() {
  // Reading the current time requires an uncached/request data source in Next 16.
  await connection();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface-inverse text-secondary">
      <div className="mx-auto max-w-(--breakpoint-xl) px-6 py-20 sm:px-8 sm:py-24">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
          {/* Wordmark + statement specimen */}
          <div className="md:col-span-5">
            <p className="font-heading text-5xl leading-none">
              TypeGallery<span className="text-tertiary">.</span>
            </p>
            <p className="text-body mt-6 max-w-sm text-secondary/70">
              ระบบดีไซน์แบบ editorial ที่ยึดตัวอักษรเป็นหัวใจ
              ผิวเรียบแบน ขอบคม โทนสีอุ่น
            </p>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav className="md:col-span-2" key={col.title}>
              <p className="text-eyebrow text-secondary/50">{col.title}</p>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body text-secondary/80 transition-colors hover:text-tertiary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-20 flex flex-col gap-3 border-t border-secondary/15 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-mono text-secondary/50">
            codingthailand@gmail.com
          </span>
          <span className="text-mono text-secondary/50">
            © {year} TypeGallery — EB Garamond / Manrope
          </span>
        </div>
      </div>
    </footer>
  );
}

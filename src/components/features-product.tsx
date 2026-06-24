import CartButton from "@/app/(front)/components/CartButton";
import Image from "next/image";
import type { ProductCardItem } from "@/services/product";

export type { ProductCardItem } from "@/services/product";

type Props = {
  products: ProductCardItem[];
};

function getProductImage(product: ProductCardItem) {
  return product.imageName
    ? `/product-image/${product.imageName}`
    : "/product-image/nopic.png";
}

const priceFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  maximumFractionDigits: 0,
});

const FeaturesProduct = ({ products }: Props) => {
  return (
    <section className="mx-auto flex max-w-(--breakpoint-xl) flex-col px-6 py-20 sm:px-8 sm:py-28">
      <div className="flex items-end justify-between border-b border-border pb-6">
        <div>
          <p className="text-eyebrow text-tertiary">Catalogue</p>
          <h2 className="text-h1 mt-3">สินค้าทั้งหมด</h2>
        </div>
        <span className="text-mono hidden text-muted-foreground sm:block">
          {products.length} items
        </span>
      </div>

      {products.length === 0 ? (
        <div className="mt-12 border border-dashed border-border px-6 py-16 text-center text-body text-muted-foreground">
          ยังไม่มีสินค้าในฐานข้อมูล
        </div>
      ) : (
      <div className="mt-12 grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <article className="group flex bg-card p-8 transition-colors hover:bg-secondary" key={product.id}>
            <div className="flex w-full flex-col">
              <div className="relative mb-6 aspect-4/5 w-full overflow-hidden bg-muted">
                <Image
                  alt={product.name}
                  className="object-cover"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  src={getProductImage(product)}
                />
              </div>

              <div className="flex items-center justify-between gap-4 border-b border-border pb-3">
                <span className="text-mono text-muted-foreground">
                  #{String(product.id).padStart(3, "0")}
                </span>
                <span className="text-eyebrow text-muted-foreground">
                  {product.categoryName}
                </span>
              </div>
              <h3 className="text-h3 mt-4">{product.name}</h3>
              <p className="text-body mt-2 line-clamp-2 min-h-12 text-muted-foreground">
                {product.description}
              </p>
              <p className="font-heading mt-4 text-3xl">
                {priceFormatter.format(product.price)}
              </p>
              <div className="mt-6">
                <CartButton product={product} />
              </div>
            </div>
          </article>
        ))}
      </div>
      )}
    </section>
  );
};

export default FeaturesProduct;

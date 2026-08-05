import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const grades = [
  "Premium",
  "Natural",
  "Special",
  "Longberry",
  "Peaberry",
  "Honey",
  "Wine",
  "Luwak Liar",
];

export function Products() {
  return (
    <section className="bg-primary/5 px-6 py-24">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl md:order-2">
          <Image
            src="/images/products-bags.jpeg"
            alt="Kemasan biji kopi Rassa Coffee Gayo"
            fill
            sizes="(min-width: 768px) 40vw, 90vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-5 md:order-1">
          <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
            Produk B2B
          </span>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
            Kopi Gayo, Arabika &amp; Robusta
          </h2>
          <p className="text-balance leading-relaxed text-foreground/70">
            Rassa Coffee memasok biji kopi pilihan dataran tinggi Gayo,
            Takengon, dalam berbagai grade untuk kebutuhan kafe, resto, dan
            mitra bisnis Anda — diproses oleh tangan-tangan profesional agar
            hasil olahan kopi sempurna dan konsisten.
          </p>

          <div className="flex flex-wrap gap-2">
            {grades.map((grade) => (
              <span
                key={grade}
                className="rounded-full border border-primary/20 bg-background px-3 py-1 text-sm text-primary"
              >
                {grade}
              </span>
            ))}
          </div>

          <div>
            <Button asChild size="lg" className="mt-2 rounded-full px-8 text-base">
              <Link href="/contact">Hubungi untuk Kerja Sama B2B</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

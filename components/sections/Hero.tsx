import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden">
      <Image
        src="/images/hero-interior.jpeg"
        alt="Suasana kedai Rassa Coffee di Kutacane"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/70 to-primary/90" />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 px-6 py-24 text-center sm:gap-8">
        <span className="rounded-full border border-accent/50 bg-accent/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-accent">
          Coffee Shop &amp; B2B Supplier
        </span>

        <h1 className="text-4xl font-semibold leading-tight tracking-tight text-background sm:text-5xl md:text-6xl">
          Kopi Premium,
          <br />
          Cerita Kutacane
        </h1>

        <p className="max-w-xl text-balance text-base leading-relaxed text-background/80 sm:text-lg">
          Rassa Coffee menghadirkan biji kopi pilihan dari dataran tinggi Aceh
          Tenggara — diseduh dengan hati di kedai kami, dan dipasok dengan
          standar kualitas terbaik untuk mitra bisnis.
        </p>

        <div className="mt-2 flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-accent px-8 text-base text-accent-foreground hover:bg-accent/90"
          >
            <Link href="/menu">Lihat Menu</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-background bg-transparent px-8 text-base text-background hover:bg-background hover:text-primary"
          >
            <Link href="/contact">Kunjungi Kami</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

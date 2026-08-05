import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Award, Handshake, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "About | Rassa Coffee",
  description:
    "Kisah Rassa Coffee, coffee shop & B2B supplier kopi premium sejak 2016 di Kutacane, Aceh Tenggara.",
};

const values = [
  {
    icon: MapPin,
    title: "Akar Dataran Tinggi Gayo, Takengon",
    description:
      "Biji kopi Arabika dan Robusta kami dipilih dari dataran tinggi Gayo, Takengon, diproses dengan standar mutu premium, natural, hingga honey dan wine process.",
  },
  {
    icon: Award,
    title: "Dari Mobil Kopi ke Gallery",
    description:
      "Sejak berkeliling dengan mobil kopi di tahun 2016 hingga kini menjadi gallery kopi, racikan tangan berpengalaman kami tetap konsisten dan penuh karakter.",
  },
  {
    icon: Handshake,
    title: "Untuk Kedai & Bisnis Anda",
    description:
      "Selain melayani pelanggan yang datang duduk, kami memasok biji dan bubuk kopi untuk kafe, resto, dan mitra bisnis lain.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-primary/10 bg-gradient-to-b from-primary/10 via-background to-background px-6 py-20 text-center">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Sejak 2016
        </span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Kisah Rassa Coffee
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-foreground/70">
          Dari sebuah mobil kopi yang berkeliling Kutacane, kini tumbuh
          menjadi sebuah gallery kopi — coffee shop sekaligus mitra pasokan
          kopi premium untuk bisnis Anda.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-16">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
            <Image
              src="/images/about-interior.jpeg"
              alt="Suasana kedai Rassa Coffee di Kutacane"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col justify-center gap-5">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Perjalanan Kami
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
              Dari Mobil Kopi, Menjadi Gallery
            </h2>
            <p className="text-balance leading-relaxed text-foreground/70">
              Rassa Coffee lahir pada 2016, bermula dari sebuah mobil kopi
              yang berkeliling menyapa warga Kutacane — menghadirkan
              secangkir kopi hangat dari satu sudut jalan ke sudut jalan
              lain. Dari perjalanan itulah nama Rassa mulai dikenal dan
              dicintai.
            </p>
            <p className="text-balance leading-relaxed text-foreground/70">
              Bertahun-tahun berjalan, semangat yang sama membawa Rassa
              Coffee tumbuh menjadi sebuah gallery kopi yang kini berdiri di
              Kutacane — tempat singgah yang nyaman untuk menikmati biji
              kopi pilihan dari dataran tinggi Gayo, Takengon, diseduh
              dengan resep dan racikan khas yang sama sejak awal.
            </p>
            <p className="text-balance leading-relaxed text-foreground/70">
              Seiring waktu, Rassa Coffee juga tumbuh sebagai mitra B2B —
              memasok kebutuhan kopi berkualitas untuk kafe, resto, dan
              pelaku bisnis yang menginginkan cita rasa premium yang konsisten.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-primary/5 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="text-center">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Nilai Kami
            </span>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Yang Kami Pegang Teguh
            </h2>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <div
                key={title}
                className="rounded-2xl border border-primary/10 bg-background p-6"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="mt-4 font-medium text-primary">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground/70">
                  {description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-20 text-center">
        <h2 className="text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
          Datang dan Rasakan Langsung
        </h2>
        <p className="mx-auto mt-4 max-w-md text-balance leading-relaxed text-foreground/70">
          Mampir ke kedai kami di Kutacane, atau hubungi kami untuk kebutuhan
          pasokan kopi bisnis Anda.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="rounded-full px-8 text-base">
            <Link href="/menu">Lihat Menu</Link>
          </Button>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="rounded-full border-primary px-8 text-base text-primary hover:bg-primary hover:text-primary-foreground"
          >
            <Link href="/contact">Kunjungi Kami</Link>
          </Button>
        </div>
      </section>
    </main>
  );
}

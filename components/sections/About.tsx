import Image from "next/image";
import { Coffee, Handshake, Leaf } from "lucide-react";

const highlights = [
  {
    icon: Leaf,
    title: "Biji Kopi Pilihan",
    description:
      "Bersumber dari dataran tinggi Aceh Tenggara, diolah dengan standar mutu terjaga.",
  },
  {
    icon: Coffee,
    title: "Diseduh dengan Hati",
    description:
      "Setiap cangkir disajikan di kedai kami dengan resep dan racikan khas Rassa.",
  },
  {
    icon: Handshake,
    title: "Mitra B2B Terpercaya",
    description:
      "Memasok kebutuhan kopi kualitas premium untuk kafe, resto, dan bisnis Anda.",
  },
];

export function About() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col justify-center gap-5">
            <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Cerita Kami
            </span>
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-primary sm:text-4xl">
              Dari Kutacane, untuk Pecinta Kopi
            </h2>
            <p className="text-balance leading-relaxed text-foreground/70">
              Rassa Coffee lahir dari kecintaan pada kopi asli Aceh Tenggara.
              Kami merawat setiap proses — dari biji hingga cangkir — agar
              kehangatan dan cita rasa khas Kutacane sampai ke meja Anda,
              baik sebagai tempat singgah yang cozy maupun sebagai mitra
              pasokan kopi untuk bisnis Anda.
            </p>
          </div>

          <div className="relative aspect-[4/5] overflow-hidden rounded-3xl md:aspect-auto">
            <Image
              src="/images/about-owner.jpeg"
              alt="Rassa Coffee - biji kopi pilihan untuk mitra B2B"
              fill
              sizes="(min-width: 768px) 40vw, 90vw"
              className="object-cover"
            />
          </div>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-3">
          {highlights.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="flex gap-4 rounded-2xl border border-primary/10 bg-primary/5 p-5"
            >
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-medium text-primary">{title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-foreground/70">
                  {description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import type { Metadata } from "next";
import Link from "next/link";
import { Globe, MapPin, MessageCircle, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact | Rassa Coffee",
  description:
    "Hubungi Rassa Coffee di Kutacane, Aceh Tenggara - untuk kunjungan ke kedai, pesan antar, maupun kerja sama pasokan kopi B2B.",
};

const contactCards = [
  {
    icon: MapPin,
    title: "Alamat",
    lines: ["Kutacane, Aceh Tenggara", "Aceh, Indonesia"],
    actions: [
      {
        label: "Buka di Google Maps",
        href: "https://www.google.com/maps/search/Rassa+Coffee+Kutacane+Aceh+Tenggara",
      },
    ],
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+62 821-9763-8118", "+62 823-0444-3031"],
    actions: [
      { label: "Chat via WhatsApp", href: "https://wa.me/6282197638118" },
    ],
  },
  {
    icon: Truck,
    title: "Pesan Antar",
    lines: ["+62 822-5255-0984"],
    actions: [
      { label: "Chat untuk Pesan Antar", href: "https://wa.me/6282252550984" },
    ],
  },
  {
    icon: Globe,
    title: "Website",
    lines: ["www.rassacoffee.com"],
    actions: [
      { label: "Kunjungi Website", href: "https://www.rassacoffee.com" },
    ],
  },
];

export default function ContactPage() {
  return (
    <main className="bg-background">
      <section className="border-b border-primary/10 bg-gradient-to-b from-primary/10 via-background to-background px-6 py-20 text-center">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Hubungi Kami
        </span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Kunjungi Kami
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-foreground/70">
          Mampir ke kedai kami di Kutacane, pesan antar untuk dinikmati di
          rumah, atau hubungi kami untuk kerja sama pasokan kopi bisnis Anda.
        </p>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {contactCards.map(({ icon: Icon, title, lines, actions }) => (
            <div
              key={title}
              className="flex flex-col items-start gap-4 rounded-2xl border border-primary/10 bg-primary/5 p-6"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Icon className="h-5 w-5" />
              </div>
              <div>
                <h2 className="font-medium text-primary">{title}</h2>
                <div className="mt-1 space-y-0.5 text-sm text-foreground/70">
                  {lines.map((line) => (
                    <p key={line}>{line}</p>
                  ))}
                </div>
              </div>
              <div className="mt-auto flex flex-col gap-1">
                {actions.map(({ label, href }) => (
                  <Link
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-primary underline-offset-4 hover:underline"
                  >
                    {label} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-16 grid max-w-4xl gap-6 sm:grid-cols-2">
          <div className="rounded-3xl border border-primary/10 bg-primary/5 p-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-primary">
              Mau Pesan Antar?
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-balance leading-relaxed text-foreground/70">
              Nikmati kopi Rassa Coffee tanpa perlu keluar rumah — chat nomor
              pesan antar kami dan pesanan siap diantar.
            </p>
            <Button
              asChild
              size="lg"
              className="mt-6 rounded-full px-8 text-base"
            >
              <Link
                href="https://wa.me/6282252550984"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat Pesan Antar
              </Link>
            </Button>
          </div>

          <div className="rounded-3xl border border-primary/10 bg-primary/5 p-10 text-center">
            <h2 className="text-2xl font-semibold tracking-tight text-primary">
              Butuh Pasokan Kopi Bisnis?
            </h2>
            <p className="mx-auto mt-3 max-w-sm text-balance leading-relaxed text-foreground/70">
              Kami melayani kerja sama B2B untuk kafe, resto, dan bisnis lain
              yang membutuhkan kopi premium dari Rassa Coffee.
            </p>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="mt-6 rounded-full border-primary px-8 text-base text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Link
                href="https://wa.me/6282197638118"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat WhatsApp Sekarang
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

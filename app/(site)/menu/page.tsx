import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { whatsapp } from "@/lib/whatsapp";
import { formatRp } from "@/lib/menu-data";
import { getMenu } from "@/lib/menu-service";

export const metadata: Metadata = {
  title: "Menu | Rassa Coffee",
  description:
    "Daftar menu Rassa Coffee - kopi, teh, cokelat, dan makanan ringan di Kutacane, Aceh Tenggara.",
};

// Menu bisa diubah dari /admin/menu - revalidate tiap 60 detik supaya
// perubahan tampil tanpa perlu deploy ulang.
export const revalidate = 60;

function PriceTag({ label, value }: { label?: string; value: number }) {
  return (
    <span className="whitespace-nowrap rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
      {label ? `${label} ${formatRp(value)}` : formatRp(value)}
    </span>
  );
}

export default async function MenuPage() {
  const menu = await getMenu();

  return (
    <main className="bg-background">
      <section className="border-b border-primary/10 bg-gradient-to-b from-primary/10 via-background to-background px-6 py-20 text-center">
        <span className="text-sm font-medium uppercase tracking-[0.2em] text-accent">
          Menu Kami
        </span>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-primary sm:text-5xl">
          Setiap Cangkir, Cerita Rasa
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-balance leading-relaxed text-foreground/70">
          Kopi, teh, cokelat, hingga camilan ringan — diracik langsung di
          kedai kami di Kutacane, Aceh Tenggara.
        </p>
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto max-w-4xl space-y-14">
          {menu.map(({ category, items }) => (
            <div key={category}>
              <h2 className="text-2xl font-semibold tracking-tight text-primary">
                {category}
              </h2>
              <div className="mt-6 divide-y divide-primary/10 rounded-2xl border border-primary/10 bg-primary/5">
                {items.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <span className="font-medium text-foreground">
                      {item.name}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {item.hot !== undefined && (
                        <PriceTag label="Hot" value={item.hot} />
                      )}
                      {item.iced !== undefined && (
                        <PriceTag label="Iced" value={item.iced} />
                      )}
                      {item.price !== undefined && (
                        <PriceTag value={item.price} />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-2xl rounded-3xl border border-primary/10 bg-primary/5 p-10 text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-primary">
            Mau Pesan Antar?
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-balance leading-relaxed text-foreground/70">
            Nikmati menu Rassa Coffee tanpa perlu keluar rumah — chat kami
            dengan format pesanan yang sudah siap, tinggal isi.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full px-8 text-base">
            <Link href={whatsapp.orderLink} target="_blank" rel="noopener noreferrer">
              Chat Pesan Antar
            </Link>
          </Button>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="mx-auto max-w-4xl">
          <p className="mb-4 text-center text-sm text-foreground/60">
            Papan menu asli di kedai Rassa Coffee
          </p>
          <div className="overflow-hidden rounded-2xl border border-primary/10">
            <Image
              src="/images/menu-board.jpeg"
              alt="Papan menu Rassa Coffee"
              width={1600}
              height={411}
              className="w-full object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}

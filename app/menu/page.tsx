import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Menu | Rassa Coffee",
  description:
    "Daftar menu Rassa Coffee - kopi, teh, cokelat, dan makanan ringan di Kutacane, Aceh Tenggara.",
};

type MenuItem = {
  name: string;
  hot?: number;
  iced?: number;
  price?: number;
};

type MenuCategory = {
  category: string;
  items: MenuItem[];
};

const menu: MenuCategory[] = [
  {
    category: "Kopi",
    items: [
      { name: "Espresso", hot: 12000 },
      { name: "Dopio", hot: 12000 },
      { name: "Americano", hot: 13000, iced: 15000 },
      { name: "Cappuccino", hot: 13000, iced: 15000 },
      { name: "Sanger Espresso", hot: 12000, iced: 15000 },
      { name: "Sanger Espresso Mini", hot: 12000 },
      { name: "Coffee Latte", hot: 15000, iced: 17000 },
      { name: "Mokacino", hot: 13000, iced: 15000 },
      { name: "Long Black", hot: 13000, iced: 15000 },
      { name: "Tubruk", hot: 10000 },
      { name: "Black Coffee", hot: 5000 },
      { name: "V60", hot: 30000 },
      { name: "Vietnam Drip", hot: 15000 },
      { name: "Pren Fresh", hot: 15000 },
      { name: "Moka Pot", hot: 20000 },
      { name: "Cold Brew", price: 25000 },
      { name: "Mocktail", iced: 20000 },
    ],
  },
  {
    category: "Tea & Chocolate",
    items: [
      { name: "Green Tea", hot: 8000, iced: 10000 },
      { name: "Thai Tea", hot: 8000, iced: 10000 },
      { name: "Green Tea Latte", hot: 13000, iced: 15000 },
      { name: "Thai Tea Latte", hot: 13000, iced: 15000 },
      { name: "Lemon Tea", hot: 8000, iced: 10000 },
      { name: "Matcha", hot: 10000, iced: 10000 },
      { name: "Matcha Latte", hot: 13000, iced: 15000 },
      { name: "Chocolate", hot: 8000, iced: 10000 },
      { name: "Teh Tarik", hot: 10000, iced: 15000 },
    ],
  },
  {
    category: "Makanan",
    items: [
      { name: "Nasi Goreng", price: 15000 },
      { name: "Mie Rassa", price: 15000 },
      { name: "Kentang Goreng", price: 10000 },
      { name: "Piscok", price: 10000 },
    ],
  },
];

function formatRp(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

function PriceTag({ label, value }: { label?: string; value: number }) {
  return (
    <span className="whitespace-nowrap rounded-full bg-primary/5 px-3 py-1 text-sm font-medium text-primary">
      {label ? `${label} ${formatRp(value)}` : formatRp(value)}
    </span>
  );
}

export default function MenuPage() {
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
            Nikmati menu Rassa Coffee tanpa perlu keluar rumah — chat nomor
            pesan antar kami.
          </p>
          <Button asChild size="lg" className="mt-6 rounded-full px-8 text-base">
            <Link
              href="https://wa.me/6282252550984"
              target="_blank"
              rel="noopener noreferrer"
            >
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

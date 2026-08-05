export type MenuItem = {
  name: string;
  hot?: number;
  iced?: number;
  price?: number;
};

export type MenuCategory = {
  category: string;
  items: MenuItem[];
};

export const menu: MenuCategory[] = [
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

export function formatRp(value: number) {
  return `Rp ${value.toLocaleString("id-ID")}`;
}

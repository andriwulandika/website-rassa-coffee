-- Rassa Coffee - Admin/Kasir schema
-- Jalankan file ini di Supabase Dashboard > SQL Editor (New Query > paste > Run)

create extension if not exists "pgcrypto";

create table if not exists transactions (
  id uuid primary key default gen_random_uuid(),
  total_amount integer not null,
  created_at timestamptz not null default now()
);

create table if not exists transaction_items (
  id uuid primary key default gen_random_uuid(),
  transaction_id uuid not null references transactions(id) on delete cascade,
  item_name text not null,
  variant text,
  unit_price integer not null,
  quantity integer not null,
  subtotal integer not null,
  created_at timestamptz not null default now()
);

create index if not exists transaction_items_transaction_id_idx
  on transaction_items(transaction_id);
create index if not exists transactions_created_at_idx
  on transactions(created_at);

create table if not exists menu_items (
  id uuid primary key default gen_random_uuid(),
  category text not null,
  name text not null,
  hot_price integer,
  iced_price integer,
  single_price integer,
  created_at timestamptz not null default now()
);

create index if not exists menu_items_category_idx
  on menu_items(category, created_at);

-- Row Level Security: tolak semua akses publik/anon. Aplikasi hanya
-- mengakses tabel ini lewat server (Server Actions) memakai
-- SUPABASE_SERVICE_ROLE_KEY, yang otomatis melewati RLS.
alter table transactions enable row level security;
alter table transaction_items enable row level security;
alter table menu_items enable row level security;

-- Seed menu awal (sama seperti yang sudah tampil di halaman /menu).
-- Hanya jalan sekali - dilewati kalau menu_items sudah ada isinya,
-- jadi aman kalau file ini dijalankan ulang.
insert into menu_items (category, name, hot_price, iced_price, single_price)
select * from (values
  ('Kopi', 'Espresso', 12000, null, null),
  ('Kopi', 'Dopio', 12000, null, null),
  ('Kopi', 'Americano', 13000, 15000, null),
  ('Kopi', 'Cappuccino', 13000, 15000, null),
  ('Kopi', 'Sanger Espresso', 12000, 15000, null),
  ('Kopi', 'Sanger Espresso Mini', 12000, null, null),
  ('Kopi', 'Coffee Latte', 15000, 17000, null),
  ('Kopi', 'Mokacino', 13000, 15000, null),
  ('Kopi', 'Long Black', 13000, 15000, null),
  ('Kopi', 'Tubruk', 10000, null, null),
  ('Kopi', 'Black Coffee', 5000, null, null),
  ('Kopi', 'V60', 30000, null, null),
  ('Kopi', 'Vietnam Drip', 15000, null, null),
  ('Kopi', 'Pren Fresh', 15000, null, null),
  ('Kopi', 'Moka Pot', 20000, null, null),
  ('Kopi', 'Cold Brew', null, null, 25000),
  ('Kopi', 'Mocktail', null, 20000, null),
  ('Tea & Chocolate', 'Green Tea', 8000, 10000, null),
  ('Tea & Chocolate', 'Thai Tea', 8000, 10000, null),
  ('Tea & Chocolate', 'Green Tea Latte', 13000, 15000, null),
  ('Tea & Chocolate', 'Thai Tea Latte', 13000, 15000, null),
  ('Tea & Chocolate', 'Lemon Tea', 8000, 10000, null),
  ('Tea & Chocolate', 'Matcha', 10000, 10000, null),
  ('Tea & Chocolate', 'Matcha Latte', 13000, 15000, null),
  ('Tea & Chocolate', 'Chocolate', 8000, 10000, null),
  ('Tea & Chocolate', 'Teh Tarik', 10000, 15000, null),
  ('Makanan', 'Nasi Goreng', null, null, 15000),
  ('Makanan', 'Mie Rassa', null, null, 15000),
  ('Makanan', 'Kentang Goreng', null, null, 10000),
  ('Makanan', 'Piscok', null, null, 10000)
) as seed(category, name, hot_price, iced_price, single_price)
where not exists (select 1 from menu_items limit 1);

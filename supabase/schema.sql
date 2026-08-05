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

-- Row Level Security: tolak semua akses publik/anon. Aplikasi hanya
-- mengakses tabel ini lewat server (Server Actions) memakai
-- SUPABASE_SERVICE_ROLE_KEY, yang otomatis melewati RLS.
alter table transactions enable row level security;
alter table transaction_items enable row level security;

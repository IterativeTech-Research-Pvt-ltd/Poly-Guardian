-- Poly-Guardian admin database schema.
-- Run this once in your Supabase project:  Dashboard -> SQL Editor -> New query -> paste -> Run.

create table if not exists farmers (
  id         uuid primary key default gen_random_uuid(),
  name       text not null,
  village    text,
  phone      text,
  created_at timestamptz not null default now()
);

create table if not exists scans (
  id         uuid primary key default gen_random_uuid(),
  farmer_id  uuid references farmers(id) on delete cascade,
  kind       text not null,          -- 'leaf' | 'pest'
  crop       text,                   -- crop name (leaf scans)
  result     text,                   -- disease name (leaf) or pest name (pest)
  severity   text,                   -- severity (leaf) or density (pest)
  confidence integer,                -- confidence % (leaf) or density % (pest)
  lang       text,                   -- en | hinglish | hi | mr
  season     text,                   -- Rabi | Kharif | Zaid
  created_at timestamptz not null default now()
);

create index if not exists scans_farmer_idx on scans (farmer_id);
create index if not exists scans_season_idx on scans (season);

-- The backend uses the service_role key, which bypasses Row Level Security,
-- so no RLS policies are needed. Farmers never talk to Supabase directly —
-- only your Express server does.
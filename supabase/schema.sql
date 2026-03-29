
-- SDK56 schema with RLS Scheme A (anon + authenticated can insert)
create extension if not exists pgcrypto;
create extension if not exists "uuid-ossp";

create table if not exists places (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  address text,
  lat double precision not null,
  lng double precision not null,
  type text check (type in ('park','museum','mall','indoor','library','zoo','farm','other')) default 'other',
  nursing_room boolean default false,
  changing_table boolean default false,
  stroller_ok text check (stroller_ok in ('yes','partial','no')) default 'partial',
  elevator boolean default false,
  ramp boolean default false,
  noise text check (noise in ('quiet','medium','loud')) default 'medium',
  shade text check (shade in ('good','some','none')) default 'some',
  family_restroom boolean default false,
  score int default 0,
  last_verified_at date
);

create table if not exists submissions (
  id uuid primary key default gen_random_uuid(),
  place_id uuid references places(id) on delete cascade,
  user_id uuid,
  nursing_room boolean,
  changing_table boolean,
  stroller_ok text check (stroller_ok in ('yes','partial','no')),
  elevator boolean,
  ramp boolean,
  noise text check (noise in ('quiet','medium','loud')),
  shade text check (shade in ('good','some','none')),
  family_restroom boolean,
  photo_urls text[],
  visited_at date,
  created_at timestamptz default now()
);

alter table places enable row level security;
alter table submissions enable row level security;

drop policy if exists "read places" on places;
drop policy if exists "read submissions" on submissions;
drop policy if exists "insert submissions" on submissions;
drop policy if exists "insert submissions (anon & authed)" on submissions;

create policy "read places" on places for select using (true);
create policy "read submissions" on submissions for select using (true);

create policy "insert submissions (anon & authed)" on submissions
for insert to anon, authenticated
with check (true);

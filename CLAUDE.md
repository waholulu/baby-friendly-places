# Baby-Friendly Places — Starter v4

## Project Overview

React Native / Expo mobile app (v0.4.1) for discovering and rating baby-friendly locations (parks, museums, malls, libraries, etc.). Parents can browse nearby places, filter by amenities, view details, and submit community checklists about a place's facilities.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Expo SDK 54, React 18.3, React Native 0.76 |
| Language | TypeScript 5.6 |
| Navigation | expo-router 3.5 (file-based routing) |
| Backend | Supabase (PostgreSQL + Row-Level Security) |

## Key Commands

```bash
npm i                   # install dependencies
npx expo start -c       # start dev server (clear cache)
npm run android         # run on Android emulator/device
npm run ios             # run on iOS simulator/device
npm run web             # run as web app
npm run doctor          # verify Expo environment setup
```

## Environment Variables

Copy `.env.example` to `.env` and fill in:

```bash
EXPO_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Database Setup

Run in Supabase SQL Editor:

1. `supabase/schema.sql` — creates `places` and `submissions` tables with RLS
2. `supabase/seed.sql` — (optional) loads 10 sample locations in Jersey City / NYC

**RLS rules:** Anyone can read both tables; anonymous users can insert into `submissions`.

## Architecture

```
app/
  _layout.tsx         # root Stack navigator
  index.tsx           # home screen — place list with filters
  map.tsx             # map screen (STUB — returns null)
  place/[id].tsx      # place detail screen + Google Maps link
  submit.tsx          # checklist submission form (minimal UI)

components/
  PlaceCard.tsx       # card: name, type, score, amenity tags
  Filters.tsx         # toggle bar: nursing_room | stroller | quiet

lib/
  supabase.ts         # Supabase client (reads EXPO_PUBLIC_ env vars)
  scoring.ts          # calcScore() — returns 0–100 from amenity booleans

supabase/
  schema.sql          # table definitions + RLS policies
  seed.sql            # 10 sample places
```

## Scoring Algorithm (`lib/scoring.ts`)

`calcScore(place)` sums three categories, capped at 100:

| Category | Field | Points |
|----------|-------|--------|
| Facilities | nursing_room | +30 |
| | changing_table | +15 |
| | family_restroom | +10 |
| Accessibility | stroller_ok = yes | +20 |
| | stroller_ok = partial | +10 |
| | elevator | +10 |
| | ramp | +5 |
| Environment | noise = quiet | +15 |
| | noise = medium | +8 |
| | shade = good | +10 |
| | shade = some | +5 |

## Known Stubs / Incomplete Areas

- **`app/map.tsx`** — placeholder, returns null; map not implemented
- **`app/submit.tsx`** — basic form with Chinese-language labels; no image picker wired up
- **No authentication** — all access is anonymous via Supabase anon key
- **No tests** — no test framework or test files configured

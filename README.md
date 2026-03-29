
# Baby‑Friendly Places — Starter v4 (Expo SDK 56)

Clean starter aligned with Expo SDK 56 (React 19, RN 0.81, expo-router 6).

## 0) Requirements
- Node 18+
- Expo Go (latest) on your phone (SDK 56 compatible)

## 1) Supabase
- In Supabase **SQL Editor**, run `supabase/schema.sql` (RLS Scheme A: anon & authenticated can insert).
- (Optional) Run `supabase/seed.sql` to add 10 sample places.

## 2) .env
Copy `.env.example` to `.env` and fill:
```
EXPO_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
EXPO_PUBLIC_SUPABASE_ANON_KEY=YOUR-ANON-KEY
```

## 3) Install + start
```bash
npm i
npx expo start -c
```
If any missing deps are reported, run:
```bash
npx expo install
```

## Notes
- Entry file is `index.js` which loads `expo-router/entry`.
- App config has **no** hardcoded `sdkVersion` to avoid mismatch.
- Use `npm run doctor` to verify environment.

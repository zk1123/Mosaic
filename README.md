# Mosaic

Paste a wallet, get its onchain personality. Paste your own, and act on it in one tap.

Built for the Monad Metropolis hackathon — targeting the Privy bounty (integration
beyond authentication) on the Onchain Finance & Trading track.

## Stack

- Next.js 14 (App Router) + TypeScript
- Privy — embedded wallet, session signers, policy engine
- Zerion API — wallet transaction/portfolio history (multi-chain read)
- Kuru — Monad-native swap execution
- `@kuru-labs/kuru-sdk` + `ethers` v5

## Working across two machines (Linux Mint + Debian 13 / KDE)

This repo is set up so both machines end up with an identical `node_modules`
resolution. To keep it that way:

1. **Node version**: an `.nvmrc` pins the version (`20.16.0`). On each machine:
   ```bash
   nvm install
   nvm use
   ```
   If you don't have `nvm` on one of the machines yet, install it first —
   don't rely on whatever system Node ships with Mint vs. Debian, since
   those can drift.

2. **Always commit `package-lock.json`.** It's intentionally *not* in
   `.gitignore`. This is what actually pins exact dependency versions
   across both machines — `package.json` alone only pins ranges. After
   `npm install` on the machine you set up first, commit the lockfile
   before pulling on the second machine.

3. **On the second machine**, don't run a bare `npm install` from scratch —
   run `npm ci` instead. It installs exactly what's in the lockfile and
   fails loudly if `package.json` and the lockfile disagree, instead of
   silently resolving slightly different versions.

4. **Never commit `.env.local`.** Copy `.env.local.example` to `.env.local`
   on *each* machine separately and fill in real keys there. Secrets
   should never be the thing that makes a `git pull` "fix" your local env.

## Setup

```bash
nvm use
npm ci
cp .env.local.example .env.local   # then fill in real keys
npm run dev
```

## Structure

```
app/
  page.tsx                  Landing — Mode 1 lookup + Mode 2 login
  profile/[address]/        Mode 1 — public, read-only wallet profile
  dashboard/                Mode 2 — Privy-gated, own wallet + trade
  api/
    wallet-data/            Server-side Nansen fetch
    narrate/                Server-side LLM narration call
    recommend/              Personality category -> suggested trade
lib/
  zerion.ts                 Zerion API client (server-only)
  scoring.ts                Metrics -> personality classification (the
                             one piece of real product logic in the repo)
  kuru.ts                   Kuru SDK wrapper — pools + swap execution
  privy-session.ts          Session signer + policy engine config
components/
  ProfileCard.tsx           Shared by both modes
  SessionGrantModal.tsx     Grants scoped trade session, visible revoke
  TradeConfirm.tsx          One-tap execute confirmation
```

## Build order (do not build top-to-bottom through the file tree — build
in this order instead, riskiest integrations first)

1. Privy session signer + policy engine (`lib/privy-session.ts`) — prove
   grant -> sign -> policy-blocks-out-of-scope-call works before anything
   else. This is the actual bounty requirement.
2. Kuru integration (`lib/kuru.ts`) — prove a real swap lands on Monad
   testnet.
3. Zerion pipeline (`lib/zerion.ts`) — confirm real response shape,
   replace the placeholder types.
4. Scoring rules + LLM narration (`lib/scoring.ts`, `app/api/narrate`).
5. Wire Mode 1 end-to-end, then gate Mode 2 behind Privy.
6. Trade-recommendation rules + one-tap execute (`TradeConfirm.tsx`).
7. UI pass (forest green / halftone vintage identity) + buffer.

Every `TODO(Day N)` comment in the codebase corresponds to this order —
search for `TODO(Day` to find what's still a stub.

## Known unknowns to resolve early, not late

- Exact Zerion response envelope shape (`lib/zerion.ts` has a best-guess
  type, not a verified one).
- Exact Privy session-signer/policy-engine API surface for the SDK
  version actually installed (`lib/privy-session.ts` is scaffolding, not
  verified against live docs).
- `@kuru-labs/kuru-sdk` export names may have moved since this scaffold
  was written — confirm against the version npm actually resolves.

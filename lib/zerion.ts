// Server-side only. ZERION_API_KEY must never be exposed to the client —
// this file should only ever be imported from app/api/** route handlers.
//
// Zerion auth: HTTP Basic Auth with the API key as the username, empty
// password. Confirm this against the live docs on Day 1 — this is
// written from the general REST pattern documented publicly, not yet
// verified against a real key/response.

const ZERION_BASE_URL = "https://api.zerion.io/v1";

export interface RawWalletTx {
  chain: string;
  hash: string;
  minedAt: string;
  type: string; // e.g. "trade", "send", "receive"
  valueUsd: number | null;
  // TODO(Day 1): fill this out against the real
  // /wallets/{address}/transactions/ response shape once a live key
  // is wired up — this is a best-guess shape, not a verified contract.
}

function authHeader() {
  const apiKey = process.env.ZERION_API_KEY;
  if (!apiKey) {
    throw new Error("ZERION_API_KEY is not set");
  }
  // Basic auth: "apiKey:" (empty password), base64-encoded.
  return "Basic " + Buffer.from(`${apiKey}:`).toString("base64");
}

export async function fetchWalletTransactions(
  address: string
): Promise<RawWalletTx[]> {
  const res = await fetch(
    `${ZERION_BASE_URL}/wallets/${address}/transactions/?currency=usd`,
    {
      headers: {
        accept: "application/json",
        authorization: authHeader(),
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Zerion fetch failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  // TODO: confirm actual response envelope (data.data? an array directly?)
  // once hitting this against a real key — do this first thing on Day 1.
  return data;
}

export async function fetchWalletPortfolio(address: string) {
  const res = await fetch(
    `${ZERION_BASE_URL}/wallets/${address}/portfolio/?currency=usd`,
    {
      headers: {
        accept: "application/json",
        authorization: authHeader(),
      },
    }
  );

  if (!res.ok) {
    throw new Error(`Zerion portfolio fetch failed: ${res.status} ${res.statusText}`);
  }

  return res.json();
}

// Server-side only. NANSEN_API_KEY must never be exposed to the client —
// this file should only ever be imported from app/api/** route handlers.

const NANSEN_BASE_URL = "https://api.nansen.ai/api/beta";

type NansenChain = "all" | "ethereum" | "arbitrum" | "optimism" | "monad" | string;

export interface RawWalletTx {
  chain: string;
  hash: string;
  blockTimestamp: string;
  valueUsd: number;
  label?: string | null;
  // TODO(Day 1): fill this out against the real /profiler/address/transactions
  // response shape once a live API key is wired up — this is a best-guess
  // shape based on the docs, not a verified contract.
}

export async function fetchWalletTransactions(
  address: string,
  chain: NansenChain = "all"
): Promise<RawWalletTx[]> {
  const apiKey = process.env.NANSEN_API_KEY;
  if (!apiKey) {
    throw new Error("NANSEN_API_KEY is not set");
  }

  const res = await fetch(`${NANSEN_BASE_URL}/profiler/address/transactions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      apiKey,
    },
    body: JSON.stringify({
      parameters: {
        chain,
        walletAddresses: [address],
        hideSpamToken: true,
      },
      pagination: { page: 1, recordsPerPage: 100 },
    }),
  });

  if (!res.ok) {
    throw new Error(`Nansen fetch failed: ${res.status} ${res.statusText}`);
  }

  const data = await res.json();
  // TODO: confirm actual response envelope (data.result? data.items?) once
  // hitting this against a real key — do this first thing on Day 1.
  return data;
}

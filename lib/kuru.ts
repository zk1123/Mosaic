import * as KuruSdk from "@kuru-labs/kuru-sdk";
import { ethers } from "ethers";

// TODO(Day 2): this is the first integration to actually prove end-to-end
// against Monad testnet — do this before building anything on top of it.
// Confirm exact export names against the installed @kuru-labs/kuru-sdk
// version; the package has moved fast and names may have shifted since
// this file was written.

export function getProvider() {
  const rpcUrl = process.env.NEXT_PUBLIC_MONAD_RPC_URL;
  if (!rpcUrl) throw new Error("NEXT_PUBLIC_MONAD_RPC_URL is not set");
  return new ethers.providers.JsonRpcProvider(rpcUrl);
}

export async function findPools(tokenIn: string, tokenOut: string) {
  const kuruApi = process.env.KURU_API_URL;
  if (!kuruApi) throw new Error("KURU_API_URL is not set");

  const poolFetcher = new KuruSdk.PoolFetcher(kuruApi);
  return poolFetcher.getAllPools(tokenIn, tokenOut);
}

// Placeholder for the session-signed execute path — this is where the
// Privy session signer hands off a signer object instead of a raw
// private-key wallet. Do not build this against a private-key signer
// and swap it later; wire it against Privy's session signer from the start.
export async function executeSwap(_params: {
  signer: ethers.Signer;
  tokenIn: string;
  tokenOut: string;
  amountIn: string;
}) {
  throw new Error("TODO(Day 5): wire against Privy session signer + Kuru order execution");
}

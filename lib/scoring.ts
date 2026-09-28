import type { RawWalletTx } from "./nansen";

// This is Mosaic's actual product logic. Everything else in lib/ is
// integration glue — this file is the part worth being deliberate about.
// Keep it as simple threshold rules for the hackathon; do NOT reach for
// an ML model here, there's no time budget for it and it adds a
// hard-to-demo failure mode.

export interface WalletMetrics {
  txCount: number;
  avgHoldTimeDays: number;
  distinctProtocols: number;
  netBuyerRatio: number; // 0 = pure seller, 1 = pure buyer
  memecoinExposureRatio: number; // 0-1
}

export type PersonalityCategory =
  | "cautious-accumulator"
  | "degen-yield-chaser"
  | "blue-chip-holder"
  | "active-trader"
  | "dormant-whale";

export function computeMetrics(txs: RawWalletTx[]): WalletMetrics {
  // TODO(Day 3): replace with real aggregation once the Nansen response
  // shape is confirmed. Placeholder keeps the rest of the pipeline typed
  // and runnable before real data is wired in.
  return {
    txCount: txs.length,
    avgHoldTimeDays: 0,
    distinctProtocols: 0,
    netBuyerRatio: 0.5,
    memecoinExposureRatio: 0,
  };
}

export function classifyPersonality(metrics: WalletMetrics): PersonalityCategory {
  // Deliberately simple threshold rules — tune these numbers once real
  // wallets are being scored, don't add more categories under time
  // pressure, resist the urge to make this "smarter."
  if (metrics.txCount === 0) return "dormant-whale";
  if (metrics.memecoinExposureRatio > 0.5) return "degen-yield-chaser";
  if (metrics.avgHoldTimeDays > 180) return "blue-chip-holder";
  if (metrics.txCount > 100) return "active-trader";
  return "cautious-accumulator";
}

import { NextRequest, NextResponse } from "next/server";
import type { PersonalityCategory } from "@/lib/scoring";

// Small rules table, not a model — same philosophy as scoring.ts.
// TODO(Day 6): fill in real trade suggestions once Kuru pool data is live.
const RECOMMENDATIONS: Record<PersonalityCategory, string> = {
  "cautious-accumulator": "TODO: suggest a small, low-slippage accumulation trade",
  "degen-yield-chaser": "TODO: suggest a capped, high-volatility pair",
  "blue-chip-holder": "TODO: suggest a blue-chip rebalance",
  "active-trader": "TODO: suggest a momentum trade",
  "dormant-whale": "TODO: suggest a re-engagement trade",
};

export async function POST(req: NextRequest) {
  const { category } = (await req.json()) as { category: PersonalityCategory };
  return NextResponse.json({ recommendation: RECOMMENDATIONS[category] });
}

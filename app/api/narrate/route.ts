import { NextRequest, NextResponse } from "next/server";
import type { WalletMetrics, PersonalityCategory } from "@/lib/scoring";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as {
    metrics: WalletMetrics;
    category: PersonalityCategory;
  };

  // TODO(Day 4): wire the real LLM call. Keep the prompt short and pass
  // the computed metrics + category in explicitly — the model should be
  // narrating numbers you already trust, not inferring the category itself.
  const apiKey = process.env.NARRATION_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "NARRATION_API_KEY is not set" },
      { status: 500 }
    );
  }

  return NextResponse.json({
    text: `TODO: narrate ${body.category} from metrics ${JSON.stringify(body.metrics)}`,
  });
}

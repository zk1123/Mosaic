import { NextRequest, NextResponse } from "next/server";
import { fetchWalletTransactions } from "@/lib/zerion";

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address");
  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 });
  }

  try {
    const txs = await fetchWalletTransactions(address);
    return NextResponse.json({ txs });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "wallet data fetch failed" }, { status: 502 });
  }
}

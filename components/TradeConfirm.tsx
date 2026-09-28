"use client";

// TODO(Day 6): wire against /api/recommend for the suggested trade, and
// lib/kuru.ts executeSwap for the actual one-tap execution through the
// Privy session signer. Left minimal on purpose — don't build this UI
// out further until the session-signer + Kuru paths are both proven.

interface TradeConfirmProps {
  recommendation: string;
  onConfirm: () => void;
}

export function TradeConfirm({ recommendation, onConfirm }: TradeConfirmProps) {
  return (
    <div style={{ border: "1px solid #1B4332", padding: "1rem", marginTop: "1rem" }}>
      <p>{recommendation}</p>
      <button onClick={onConfirm}>Execute (one-tap)</button>
    </div>
  );
}

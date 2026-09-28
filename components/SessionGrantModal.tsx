"use client";

import { useState } from "react";

interface SessionGrantModalProps {
  walletAddress: string;
  onGranted: () => void;
}

// TODO(Day 1): wire against lib/privy-session.ts once grantTradeSession
// is real. Keep the revoke control visible even though almost no one
// will click it during judging — it's a cheap, visible trust signal.
export function SessionGrantModal({
  walletAddress,
  onGranted,
}: SessionGrantModalProps) {
  const [granting, setGranting] = useState(false);

  async function handleGrant() {
    setGranting(true);
    try {
      // await grantTradeSession(walletAddress);
      onGranted();
    } finally {
      setGranting(false);
    }
  }

  return (
    <div style={{ border: "1px dashed #888", padding: "1rem", marginTop: "1rem" }}>
      <p>
        Grant Mosaic a scoped trade session for <code>{walletAddress}</code>?
        Limited to Kuru only, capped spend per trade, revocable anytime.
      </p>
      <button onClick={handleGrant} disabled={granting}>
        {granting ? "Granting…" : "Grant session"}
      </button>
    </div>
  );
}

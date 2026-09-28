"use client";

import { useEffect, useState } from "react";

interface ProfileCardProps {
  address: string;
  mode: "read-only" | "own";
}

export function ProfileCard({ address, mode }: ProfileCardProps) {
  const [narrative, setNarrative] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      try {
        // TODO(Day 3-4): this should call wallet-data -> compute metrics
        // -> classify -> narrate, in sequence. Left as a single TODO call
        // here rather than three separate half-wired fetches.
        const res = await fetch(`/api/wallet-data?address=${address}`);
        const data = await res.json();
        if (!cancelled) {
          setNarrative(
            data.error ? `Error: ${data.error}` : "TODO: run scoring + narration pipeline"
          );
        }
      } catch (err) {
        if (!cancelled) setNarrative("Failed to load profile.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [address]);

  return (
    <div style={{ border: "1px solid #ccc", padding: "1rem", marginTop: "1rem" }}>
      <p style={{ fontFamily: "monospace" }}>{address}</p>
      <p style={{ fontSize: "0.8rem", opacity: 0.6 }}>
        {mode === "own" ? "Your wallet" : "Read-only lookup"}
      </p>
      {loading ? <p>Loading profile…</p> : <p>{narrative}</p>}
    </div>
  );
}

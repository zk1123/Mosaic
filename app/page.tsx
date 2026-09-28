"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";

export default function Home() {
  const [address, setAddress] = useState("");
  const router = useRouter();
  const { login, authenticated } = usePrivy();

  function goToProfile() {
    if (!address) return;
    router.push(`/profile/${address}`);
  }

  return (
    <main style={{ padding: "4rem 2rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>Mosaic</h1>
      <p>Paste a wallet, get its onchain personality.</p>

      {/* Mode 1 — public, read-only lookup */}
      <section style={{ marginTop: "2rem" }}>
        <h2>Look up any wallet</h2>
        <input
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="0x..."
          style={{ width: "100%", padding: "0.5rem" }}
        />
        <button onClick={goToProfile} style={{ marginTop: "0.5rem" }}>
          Profile this wallet
        </button>
      </section>

      {/* Mode 2 — Privy-gated, own wallet + trade */}
      <section style={{ marginTop: "3rem" }}>
        <h2>Your own wallet</h2>
        {authenticated ? (
          <button onClick={() => router.push("/dashboard")}>
            Go to your dashboard
          </button>
        ) : (
          <button onClick={login}>Log in with Privy</button>
        )}
      </section>
    </main>
  );
}

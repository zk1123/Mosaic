"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { ProfileCard } from "@/components/ProfileCard";
import { SessionGrantModal } from "@/components/SessionGrantModal";
import { useState } from "react";

export default function DashboardPage() {
  const { authenticated, user, ready } = usePrivy();
  const router = useRouter();
  const [sessionGranted, setSessionGranted] = useState(false);

  if (!ready) return null;
  if (!authenticated) {
    router.push("/");
    return null;
  }

  const walletAddress = user?.wallet?.address;
  if (!walletAddress) {
    return <p>No embedded wallet found on this account.</p>;
  }

  return (
    <main style={{ padding: "4rem 2rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>Your Dashboard</h1>
      <ProfileCard address={walletAddress} mode="own" />

      {!sessionGranted ? (
        <SessionGrantModal
          walletAddress={walletAddress}
          onGranted={() => setSessionGranted(true)}
        />
      ) : (
        <p>Trade session active. TODO(Day 6): trade recommendation + execute UI.</p>
      )}
    </main>
  );
}

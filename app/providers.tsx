"use client";

import { PrivyProvider } from "@privy-io/react-auth";

// TODO(Day 1): confirm exact chain config shape against the Privy SDK version
// actually installed — this is the field that's most likely to have shifted
// between SDK minor versions. Cross-check against dashboard.privy.io docs
// before wiring the session-signer + policy engine work on top of this.
const monadChain = {
  id: Number(process.env.NEXT_PUBLIC_MONAD_CHAIN_ID ?? 10143),
  name: "Monad Testnet",
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_MONAD_RPC_URL ?? ""] },
  },
};

export function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID;

  if (!appId) {
    // Fail loudly in dev rather than silently rendering a broken login button.
    console.warn(
      "NEXT_PUBLIC_PRIVY_APP_ID is not set — copy .env.local.example to .env.local"
    );
  }

  return (
    <PrivyProvider
      appId={appId ?? ""}
      config={{
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
        defaultChain: monadChain as any,
        supportedChains: [monadChain as any],
        appearance: {
          theme: "dark",
          // TODO: swap in the halftone/forest-green identity once the
          // visual pass (Day 7) starts.
          accentColor: "#1B4332",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}

// TODO(Day 1 — highest priority in the whole repo): this file is a
// best-guess shape for Privy's session signer + policy engine config,
// written from the general pattern (scoped delegated signing + policy
// constraints on top of an embedded wallet) rather than a verified API
// against a specific SDK version. Confirm the exact method names and
// policy schema against the Privy dashboard/docs for the SDK version
// pinned in package.json before building anything on top of this file.
//
// Goal for Day 1: get a bare-bones "grant a session -> sign a dummy tx ->
// policy blocks an out-of-scope call" loop working. Nothing else in the
// repo matters if this doesn't work, since it's the Privy bounty's
// beyond-auth requirement.

export interface SessionPolicyConfig {
  /** Contracts this session is allowed to call — Kuru's router only. */
  allowedContracts: string[];
  /** Max spend per trade, in the token's smallest unit as a string. */
  maxSpendPerTradeWei: string;
  /** Session lifetime in seconds. Keep short for the demo; revocable. */
  ttlSeconds: number;
}

export const DEFAULT_SESSION_POLICY: SessionPolicyConfig = {
  allowedContracts: [
    // TODO: fill in Kuru's router/orderbook contract address for testnet
  ],
  maxSpendPerTradeWei: "0", // TODO: set a sane cap once trade sizing is decided
  ttlSeconds: 60 * 60 * 24, // 24h — revisit once you decide the demo flow
};

// Placeholder — replace with the real Privy session-signer grant call.
// Keep this as the single place the app asks "does this wallet have an
// active session?" so revocation UX (see plan) has one source of truth.
export async function grantTradeSession(
  _walletAddress: string,
  _policy: SessionPolicyConfig = DEFAULT_SESSION_POLICY
) {
  throw new Error("TODO(Day 1): wire against Privy's session signer API");
}

export async function revokeTradeSession(_walletAddress: string) {
  throw new Error("TODO(Day 1): wire against Privy's session signer API");
}

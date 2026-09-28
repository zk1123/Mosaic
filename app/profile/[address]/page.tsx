import { ProfileCard } from "@/components/ProfileCard";

export default function ProfilePage({
  params,
}: {
  params: { address: string };
}) {
  return (
    <main style={{ padding: "4rem 2rem", maxWidth: 640, margin: "0 auto" }}>
      <h1>Wallet Profile</h1>
      <ProfileCard address={params.address} mode="read-only" />
    </main>
  );
}

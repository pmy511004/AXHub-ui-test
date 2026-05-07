import { Suspense } from "react";
import DiscoveryPageB from "@/components/version-b/DiscoveryPageB";

export default function DiscoveryPage() {
  return (
    <Suspense>
      <DiscoveryPageB />
    </Suspense>
  );
}

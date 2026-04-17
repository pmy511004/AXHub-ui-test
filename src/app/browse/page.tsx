import { Suspense } from "react";
import BrowsePageB from "@/components/version-b/BrowsePageB";

export default function BrowsePage() {
  return (
    <Suspense>
      <BrowsePageB />
    </Suspense>
  );
}

import { Suspense } from "react";
import MakePageB from "@/components/version-b/MakePageB";

export default function MakePage() {
  return (
    <Suspense>
      <MakePageB />
    </Suspense>
  );
}

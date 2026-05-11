import { Suspense } from "react";
import AdminConsolePageB from "@/components/version-b/AdminConsolePageB";

export default function AdminConsolePage() {
  return (
    <Suspense>
      <AdminConsolePageB />
    </Suspense>
  );
}

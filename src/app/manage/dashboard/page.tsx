"use client";

import { useEffect } from "react";
import HomePageB from "@/components/version-b/HomePageB";
import { setAuthed } from "@/lib/auth";

export default function ManageDashboardPage() {
  useEffect(() => {
    setAuthed(true);
  }, []);
  return <HomePageB initialSidebarMode="admin" initialAdminMenu="대시보드" />;
}

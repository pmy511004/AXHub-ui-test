"use client";

import { useEffect } from "react";
import HomePageB from "@/components/version-b/HomePageB";
import { setAuthed } from "@/lib/auth";

export default function ManageMembersPage() {
  useEffect(() => {
    setAuthed(true);
  }, []);
  return <HomePageB initialSidebarMode="admin" initialAdminMenu="멤버 • 그룹" />;
}

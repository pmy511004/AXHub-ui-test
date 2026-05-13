"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import HomePageB from "@/components/version-b/HomePageB";
import { isAuthed } from "@/lib/auth";

export default function Home() {
  const router = useRouter();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (!isAuthed()) {
      router.replace("/login");
      return;
    }
    setChecked(true);
  }, [router]);

  if (!checked) {
    return <div className="min-h-screen w-full bg-[#130321]" />;
  }
  return <HomePageB />;
}

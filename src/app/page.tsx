"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalSidebar from "@/components/shared/GlobalSidebar";
import SubSidebar from "@/components/shared/SubSidebar";
import Header from "@/components/shared/Header";
import MainContentA from "@/components/version-a/MainContent";
import MainContentB from "@/components/version-b/MainContent";

type Version = "A" | "B";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [version, setVersion] = useState<Version>("A");

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      {/* A/B Version Toggle */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 rounded-xl bg-gray-900 px-5 py-2.5 text-sm text-white shadow-lg">
        <span className="font-semibold">Version</span>
        <button
          onClick={() => setVersion("A")}
          className={`rounded-lg px-4 py-1.5 font-medium transition-colors ${
            version === "A" ? "bg-primary-500" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          A
        </button>
        <button
          onClick={() => setVersion("B")}
          className={`rounded-lg px-4 py-1.5 font-medium transition-colors ${
            version === "B" ? "bg-primary-500" : "bg-gray-700 hover:bg-gray-600"
          }`}
        >
          B
        </button>
      </div>

      <GlobalSidebar
        activePage="둘러보기"
        onNavClick={(label) => {
          if (label === "둘러보기") {
            setSidebarOpen((prev) => !prev);
          } else {
            window.location.href = label === "만들기" ? "/make" : label === "관리자" ? "/admin" : "#";
          }
        }}
      />

      {sidebarOpen && (
        <SubSidebar
          onClose={() => setSidebarOpen(false)}
          showIcons={version === "A"}
          borderColor={version === "B" ? "border-gray-100" : "border-gray-200"}
          collapsePosition={version === "A" ? "header" : "center"}
        />
      )}

      <main className="flex flex-1 flex-col h-full min-w-0">
        <Header borderColor={version === "B" ? "border-gray-100" : "border-gray-200"} />
        {version === "A" ? <MainContentA /> : <MainContentB />}
      </main>
    </div>
  );
}

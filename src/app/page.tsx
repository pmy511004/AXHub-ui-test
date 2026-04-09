"use client";

import { useState } from "react";
import GlobalSidebar from "@/components/shared/GlobalSidebar";
import SubSidebar from "@/components/shared/SubSidebar";
import Header from "@/components/shared/Header";
import MainContent from "@/components/version-a/MainContent";

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
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
          showIcons={true}
          collapsePosition="center"
        />
      )}

      <main className="flex flex-1 flex-col h-full min-w-0">
        <Header />
        <MainContent />
      </main>
    </div>
  );
}

"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalSidebar from "@/components/shared/GlobalSidebar";
import { adminNavItems } from "@/components/shared/data";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <GlobalSidebar
        activePage="관리자"
        onNavClick={(label) => {
          if (label === "관리자") {
            setSidebarOpen((prev) => !prev);
          } else {
            window.location.href = label === "둘러보기" ? "/" : label === "만들기" ? "/make" : "#";
          }
        }}
      />

      {/* Sub Sidebar */}
      {sidebarOpen && (
        <aside className="relative flex h-full w-[200px] shrink-0 flex-col border-r border-gray-200 bg-white">
          {/* Header */}
          <div className="flex h-[68px] flex-col items-start justify-center gap-1 p-3">
            <h2 className="text-base font-semibold text-gray-900 leading-6 tracking-[-0.16px]">
              관리자
            </h2>
            <p className="text-xs font-normal text-gray-500 leading-[1.3] tracking-[-0.12px]">
              모든 기업데이터를 관리하세요
            </p>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-2 px-3 py-4">
            {adminNavItems.map((item, index) => (
              <button
                key={index}
                className={`flex w-full items-center rounded-lg px-4 py-2 text-left text-sm tracking-[-0.14px] leading-6 ${
                  item.active
                    ? "bg-primary-50 font-semibold text-gray-900"
                    : "font-normal text-gray-500 hover:bg-[rgba(24,24,27,0.03)]"
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Collapse Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="absolute right-[-13px] top-1/2 -translate-y-1/2 flex h-10 w-6 items-center justify-center rounded-full border border-gray-100 bg-white shadow-[0px_3px_3px_0px_rgba(0,0,0,0.15)]"
          >
            <Image
              src="/icons/caret-left.svg"
              alt="닫기"
              width={6}
              height={10}
            />
          </button>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col h-full min-w-0">
        {/* Header */}
        <header className="flex h-[72px] shrink-0 items-center border-b border-gray-100 bg-white px-5 py-4 shadow-[0px_2px_2px_0px_rgba(0,0,0,0.04)]">
          <h1 className="text-[22px] font-bold text-black leading-[1.3] tracking-[-0.22px]">
            전체 앱 관리
          </h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 bg-gray-50" />
      </main>
    </div>
  );
}

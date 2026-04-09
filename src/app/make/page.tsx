"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalSidebar from "@/components/shared/GlobalSidebar";
import { makeNavItems } from "@/components/shared/data";

export default function MakePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <GlobalSidebar
        activePage="만들기"
        onNavClick={(label) => {
          if (label === "만들기") {
            setSidebarOpen((prev) => !prev);
          } else {
            window.location.href = label === "둘러보기" ? "/" : label === "관리자" ? "/admin" : "#";
          }
        }}
      />

      {/* Sub Sidebar */}
      {sidebarOpen && (
        <aside className="relative flex h-full w-[200px] shrink-0 flex-col border-r border-gray-200 bg-white">
          {/* Header */}
          <div className="flex h-[68px] flex-col items-start justify-center gap-1 p-3">
            <h2 className="text-base font-semibold text-gray-900 leading-6 tracking-[-0.16px]">
              만들기
            </h2>
            <p className="text-xs font-normal text-gray-500 leading-[1.3] tracking-[-0.12px]">
              여기에서 내 앱을 만드세요
            </p>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-2 px-3 py-4">
            {makeNavItems.map((item, index) => {
              const icons = [
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM200,176a8,8,0,0,1,0,16H56a8,8,0,0,1-8-8V72a8,8,0,0,1,16,0v62.92l34.88-29.07a8,8,0,0,1,9.56-.51l43,28.69,43.41-36.18a8,8,0,0,1,10.24,12.3l-48,40a8,8,0,0,1-9.56.51l-43-28.69L64,155.75V176Z"/></svg>,
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M232,88V200.89A15.13,15.13,0,0,1,216.89,216H40a16,16,0,0,1-16-16V64A16,16,0,0,1,40,48H93.33a16.12,16.12,0,0,1,9.6,3.2L130.67,72H216A16,16,0,0,1,232,88Z"/></svg>,
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M208,32H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM184,136H136v48a8,8,0,0,1-16,0V136H72a8,8,0,0,1,0-16h48V72a8,8,0,0,1,16,0v48h48a8,8,0,0,1,0,16Z"/></svg>,
              ];
              return (
                <button
                  key={index}
                  className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm tracking-[-0.14px] leading-6 ${
                    item.active
                      ? "bg-primary-50 font-semibold text-gray-900"
                      : "font-normal text-gray-500 hover:bg-[rgba(24,24,27,0.03)]"
                  }`}
                >
                  {icons[index]}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col h-full min-w-0">
        {/* Header */}
        <header className="flex h-[72px] shrink-0 items-center justify-between bg-white px-5 py-4">
          <h1 className="text-[22px] font-bold text-black leading-[1.3] tracking-[-0.22px]">
            내 활동
          </h1>

          <button className="flex h-10 items-center gap-1.5 rounded-[10px] bg-primary-500 px-5 text-sm font-semibold text-white tracking-[-0.14px] transition-colors hover:bg-[#5c2985]">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <path d="M9 3v12M3 9h12" />
            </svg>
            앱 만들기
          </button>
        </header>

        {/* Content Area */}
        <div className="flex-1 bg-white" />
      </main>
    </div>
  );
}

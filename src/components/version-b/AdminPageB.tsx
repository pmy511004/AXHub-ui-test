"use client";

import { useState } from "react";
import Image from "next/image";
import PageSidebar from "./PageSidebar";
import NotificationButton from "./NotificationButton";
import { useDarkMode } from "@/hooks/useDarkMode";

// 피그마 versionB-2 (node 2530:1480) — /admin 페이지 Version B 전체 레이아웃
export default function AdminPageB() {
  const [activeTeam, setActiveTeam] = useState<"JO" | "DE">("JO");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();

  return (
    <div
      className={`flex h-screen w-full items-start overflow-hidden${darkMode ? " dark-mode" : ""}`}
      style={{
        backgroundColor: darkMode ? "#0C0A12" : "#130321",
        "--page-primary": darkMode ? "#6E4A94" : "#2D64FA",
      } as React.CSSProperties}
      data-node-id="2530:1480"
    >
      {/* L. Global Nav (팀 프로필 셀렉터) */}
      <div className="flex h-full w-[68px] shrink-0 flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center gap-4 px-3 py-4">
          {(["JO", "DE"] as const).map((team) => {
            const isActive = activeTeam === team;
            return (
              <button
                key={team}
                type="button"
                onClick={() => setActiveTeam(team)}
                className={`relative flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#2D64FA] p-1 transition-shadow ${isActive ? "shadow-[0px_0px_0px_1px_white]" : ""}`}
                aria-label={`팀 ${team}`}
              >
                <p className="flex-1 text-center text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">{team}</p>
                {!isActive && <span className="pointer-events-none absolute inset-0 rounded-xl bg-[rgba(24,24,27,0.48)]" />}
              </button>
            );
          })}
          <button type="button" aria-label="팀 추가" className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex w-full flex-col items-center gap-2 px-3 py-4">
          <button type="button" onClick={() => setDarkMode(!darkMode)} className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10" aria-label={darkMode ? "라이트모드로 전환" : "다크모드로 전환"}>
            <Image src={darkMode ? "/icons/version-b/nav-sun.svg" : "/icons/version-b/nav-moon.svg"} alt="" width={24} height={24} />
          </button>
          <NotificationButton />
          <div className="relative">
            <button type="button" onClick={() => setProfileOpen(!profileOpen)} className="relative size-10 overflow-hidden rounded-full transition-opacity hover:opacity-80" aria-label="프로필">
              <Image src="/icons/version-b/profile-new.png" alt="" fill sizes="40px" className="rounded-full object-cover" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute bottom-0 left-[calc(100%+8px)] z-50 w-[220px] rounded-2xl bg-white p-3 shadow-lg" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 rounded-2xl px-3 py-2">
                      <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">박민영</p>
                      <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">minion@jocodingax.ai</p>
                    </div>
                    <div className="h-px w-full bg-[#e4e4e7]" />
                    <div className="flex flex-col">
                      <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]">내 정보</button>
                      <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]">로그아웃</button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* M + R. Sidebar + Main area (통합) */}
      <div className="flex h-full flex-1 min-w-0 items-start overflow-hidden">
        <PageSidebar activeMenu="배포 신청" />
        {/* Right: Main content */}
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto bg-white px-14 py-6 pb-[224px]">
          <div className="mx-auto flex w-full flex-col gap-6 min-[1281px]:max-w-[1280px]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
          {/* Header */}
          <div className="flex shrink-0 items-center justify-between">
            <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
              전체 앱 현황
            </h1>
            <div className="flex h-10 w-[240px] items-center gap-1.5 overflow-hidden rounded-xl bg-gray-100 px-4 py-3">
              <div className="flex items-center">
                <div className="relative size-5 overflow-hidden">
                  <Image src="/icons/version-b/search.svg" alt="" fill sizes="20px" />
                </div>
              </div>
              <div className="flex flex-1 items-center overflow-hidden">
                <p className="whitespace-nowrap text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-300">
                  앱 찾기
                </p>
              </div>
            </div>
          </div>
          {/* Content */}
          <div className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

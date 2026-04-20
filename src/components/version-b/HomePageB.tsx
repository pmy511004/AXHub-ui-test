"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TeamColumn from "./TeamColumn";

export default function HomePageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#3F1C5C", "--page-primary": "#6D319D" } as React.CSSProperties}
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} bgColor="#2f1546" />

      {/* L. Global Nav */}
      <div className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between">
        <div className="flex w-full flex-col items-start">
          {!sidebarExpanded && (
            <div className="flex w-full flex-col items-center justify-center px-5 py-4">
              <div
                className="flex size-11 items-center justify-center overflow-hidden rounded-xl border border-white p-1"
                style={{ backgroundColor: "#6d319d", boxShadow: "0px 0px 0px 1px #6d319d" }}
              >
                <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
                  JO
                </p>
              </div>
            </div>
          )}

          <nav className={`flex w-full flex-col items-center gap-4 px-5 ${sidebarExpanded ? "py-4" : ""}`}>
            {/* 홈 (active) */}
            <Link
              href="/"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-home-active.svg" alt="홈" fill sizes="44px" />
              </div>
              <p className="text-center text-xs font-semibold leading-[1.3] tracking-[-0.12px]" style={{ color: "#ffffff" }}>
                홈
              </p>
            </Link>

            {/* 만들기 (inactive) */}
            <Link
              href="/make"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-make-inactive.svg" alt="만들기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                프로젝트
              </p>
            </Link>

            {/* 둘러보기 (inactive) */}
            <Link
              href="/browse"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-store.svg" alt="둘러보기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                스토어
              </p>
            </Link>

            {/* 관리하기 (inactive) */}
            <Link
              href="/admin"
              className="flex w-[44px] flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-admin.svg" alt="관리하기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                설정
              </p>
            </Link>
          </nav>
        </div>

        {/* 하단: 검색/알림/프로필 */}
        <div className="flex w-full items-center justify-center px-3 py-4">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200"
              aria-label={sidebarExpanded ? "사이드바 접기" : "사이드바 펼치기"}
            >
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg p-1">
                {sidebarExpanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#18181B" fillOpacity="0.48" viewBox="0 0 256 256">
                    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H88V56H216V200Z" />
                  </svg>
                ) : (
                  <Image src="/icons/version-b/toggle-panel.svg" alt="" width={24} height={24} />
                )}
              </span>
            </button>

            <button
              type="button"
              className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200"
              aria-label="알림"
            >
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg p-1">
                <Image src="/icons/version-b/bell.svg" alt="" width={18} height={20} />
              </span>
            </button>

            <button
              type="button"
              className="relative size-11 overflow-hidden rounded-xl"
              aria-label="프로필"
            >
              <Image src="/icons/version-b/profile.png" alt="" fill sizes="44px" className="object-cover" />
            </button>
          </div>
        </div>
      </div>

      {/* M + R. Sidebar + Main area */}
      <div className="flex h-full flex-1 min-w-0 items-start overflow-hidden pr-2 py-2">
        {/* Left sidebar */}
        <div className="flex h-full w-[200px] shrink-0 flex-col">
          <div className="flex h-[44px] items-center overflow-hidden rounded-tl-xl border-r px-3" style={{ backgroundColor: "#f6f6f6", borderColor: "#f6f6f6" }}>
            <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-[1.5] tracking-[-0.16px] text-black">
              조코딩AX파트너스
            </p>
          </div>
          <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-bl-xl border-r" style={{ backgroundColor: "#f6f6f6", borderColor: "#f6f6f6" }}>
            <nav className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col items-stretch gap-2 overflow-y-auto px-2 py-2">
              {/* 홈 (active) */}
              <button type="button" className="menu-active flex w-full items-center gap-2 rounded-lg px-3 py-2">
                <Image src="/icons/version-b/home-menu-home.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#6D319D]">홈</span>
              </button>

              {/* 이용중인 앱 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/home-menu-using-apps.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">이용중인 앱</span>
              </button>

              {/* 섹션 헤더: 요청내역 */}
              <div className="flex w-full items-center px-3 pt-4 rounded-lg">
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px]" style={{ color: "#a1a1aa" }}>요청내역</span>
              </div>

              {/* 앱 신청 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/home-menu-app-request.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">앱 신청</span>
              </button>

              {/* 공유데이터 신청 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/home-menu-data-request.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">공유데이터 신청</span>
              </button>
            </nav>
          </div>
        </div>

        {/* Right: Main content */}
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6">
          <div className="mx-auto flex w-full flex-col gap-6 min-[1281px]:max-w-[1280px]">
          {/* Header */}
          <div className="flex shrink-0 items-center">
            <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
              좋은 오후예요, 박민영 님
            </h1>
          </div>
          <div className="flex-1" />
          </div>
        </div>
      </div>
    </div>
  );
}

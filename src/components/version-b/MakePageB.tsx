"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TeamColumn from "./TeamColumn";

// 피그마 versionB (node 2471:1262) — /make 페이지 Version B 전체 레이아웃
//
// 레이어 루트
//   L. Global Nav (2471:1278, w-76)
//   M. Middle column (2474:1570)
//      └ toggle icon (2474:1880) + Aside SNB (2474:1552, w-168)
//   R. Main area (2484:1893)
//      └ Header (2484:1894, h-76) + Content card (2484:1908)
export default function MakePageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#3F1C5C", "--page-primary": "#E765BE" } as React.CSSProperties}
      data-node-id="2471:1262"
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} bgColor="#2f1546" />

      {/* L. Global Nav ─ 2471:1278 */}
      <div
        className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between"
        data-node-id="2471:1278"
      >
        {/* 상단: 팀 아이콘 + 네비 */}
        <div className="flex w-full flex-col items-start" data-node-id="2471:1531">
          {/* Team icon "JO" ─ collapsed only */}
          {!sidebarExpanded && (<div
            className="flex w-full flex-col items-center justify-center px-5 py-4"
            data-node-id="2471:1521"
          >
            <div
              className="flex size-11 items-center justify-center overflow-hidden rounded-xl border border-white bg-[#E765BE] p-1 shadow-[0px_0px_0px_1px_#6d319d]"
              data-node-id="2471:1522"
            >
              <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
                JO
              </p>
            </div>
          </div>
          )}

          {/* Nav items ─ 2471:1279 */}
          <nav
            className={`flex w-full flex-col items-center gap-4 px-5 ${sidebarExpanded ? "py-4" : ""}`}
            data-node-id="2471:1279"
          >
            {/* 홈 (inactive) */}
            <Link
              href="/"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-home.svg" alt="홈" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                홈
              </p>
            </Link>

            {/* 만들기 (active) ─ 2471:1515 */}
            <Link
              href="/make"
              className="flex w-[44px] flex-col items-center gap-1"
              data-node-id="2471:1515"
            >
              <div className="relative size-11" data-node-id="2471:1519">
                <Image
                  src="/icons/version-b/nav-make.svg"
                  alt="만들기"
                  fill
                  sizes="44px"
                />
              </div>
              <p className="text-center text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">
                프로젝트
              </p>
            </Link>

            {/* 둘러보기 ─ 2471:1533 */}
            <Link
              href="/browse"
              className="flex flex-col items-center gap-1"
              data-node-id="2471:1533"
            >
              <div className="relative size-11" data-node-id="2471:1537">
                <Image
                  src="/icons/version-b/nav-store.svg"
                  alt="둘러보기"
                  fill
                  sizes="44px"
                />
              </div>
              <p
                className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                스토어
              </p>
            </Link>

            {/* 관리하기 ─ 2471:1539 */}
            <Link
              href="/admin"
              className="flex w-[44px] flex-col items-center gap-1"
              data-node-id="2471:1539"
            >
              <div className="relative size-11" data-node-id="2471:1543">
                <Image
                  src="/icons/version-b/nav-admin.svg"
                  alt="관리하기"
                  fill
                  sizes="44px"
                />
              </div>
              <p
                className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                설정
              </p>
            </Link>
          </nav>
        </div>

        {/* 하단: 검색/알림/프로필 카드 ─ 2471:1532 */}
        <div
          className="flex w-full items-center justify-center px-3 py-4"
          data-node-id="2471:1532"
        >
          <div
            className="flex flex-col items-center gap-1 overflow-hidden rounded-2xl bg-white/20 p-1"
            data-node-id="2471:1283"
          >
            {/* 사이드바 토글 */}
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

            {/* 알림 ─ 2471:1545 */}
            <button
              type="button"
              className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200"
              aria-label="알림"
              data-node-id="2471:1545"
            >
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg p-1">
                <Image
                  src="/icons/version-b/bell.svg"
                  alt=""
                  width={18}
                  height={20}
                />
              </span>
            </button>

            {/* 프로필 ─ 2471:1286 */}
            <button
              type="button"
              className="relative size-11 overflow-hidden rounded-xl"
              aria-label="프로필"
              data-node-id="2471:1286"
            >
              <Image
                src="/icons/version-b/profile.png"
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* M + R. Sidebar + Main area (통합) */}
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
              <button type="button" className="menu-active flex w-full items-center gap-2 rounded-lg px-3 py-2">
                <Image src="/icons/version-b/make-menu-create-active.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#E765BE]">앱 만들기</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/make-menu-template-v2.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">템플릿</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Right: Main content */}
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6 gap-6">
          {/* Header */}
          <div className="flex h-10 shrink-0 items-center">
            <h1
              className="font-bold tracking-[-0.22px] text-black"
              style={{ fontSize: "22px", lineHeight: "1.3" }}
            >
              앱 만들기
            </h1>
          </div>
          {/* Content */}
          <div className="flex-1" />
        </div>
      </div>
    </div>
  );
}

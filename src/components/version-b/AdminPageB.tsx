"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TeamColumn from "./TeamColumn";

// 피그마 versionB-2 (node 2530:1480) — /admin 페이지 Version B 전체 레이아웃
export default function AdminPageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#f4f4f5", "--page-primary": "#18181B" } as React.CSSProperties}
      data-node-id="2530:1480"
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} />

      {/* L. Global Nav ─ 2530:1481 */}
      <div className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between">
        {/* 상단: 팀 아이콘 + 네비 */}
        <div className="flex w-full flex-col items-start">
          {/* Team icon "JO" — collapsed only */}
          {!sidebarExpanded && (
            <div className="flex w-full flex-col items-center justify-center px-5 py-4">
              <div className="flex size-11 items-center justify-center overflow-hidden rounded-xl border border-white bg-primary-500 p-1 shadow-[0px_0px_0px_1px_#6d319d]">
                <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
                  JO
                </p>
              </div>
            </div>
          )}

          {/* Nav items */}
          <nav className="flex w-full flex-col items-center gap-4 px-5 py-4">
            {/* 만들기 (inactive) */}
            <Link href="/make" className="flex flex-col items-center gap-1">
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-make-inactive.svg" alt="만들기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(24,24,27,0.48)" }}>
                만들기
              </p>
            </Link>

            {/* 둘러보기 (inactive) */}
            <Link href="/" className="flex flex-col items-center gap-1">
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-store.svg" alt="둘러보기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(24,24,27,0.48)" }}>
                둘러보기
              </p>
            </Link>

            {/* 관리하기 (active) */}
            <Link href="/admin" className="flex w-[44px] flex-col items-center gap-1">
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-admin-active.svg" alt="관리하기" fill sizes="44px" />
              </div>
              <p className="text-center text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-gray-900">
                관리하기
              </p>
            </Link>
          </nav>
        </div>

        {/* 하단: 검색/알림/프로필 카드 */}
        <div className="flex w-full items-center justify-center px-3 py-4">
          <div className="flex flex-col items-center gap-1 overflow-hidden rounded-2xl bg-white p-1">
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
            <button type="button" className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200" aria-label="알림">
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg p-1">
                <Image src="/icons/version-b/bell.svg" alt="" width={18} height={20} />
              </span>
            </button>
            <button type="button" className="relative size-11 overflow-hidden rounded-xl" aria-label="프로필">
              <Image src="/icons/version-b/profile.png" alt="" fill sizes="44px" className="object-cover" />
            </button>
          </div>
        </div>
      </div>

      {/* M. Middle column ─ 2530:1506 */}
      <div className="flex h-full min-h-0 flex-col items-start">
        {/* Search icon */}
        <div className="flex w-full flex-col items-start justify-center py-4">
          <button
            type="button"
            className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-white p-1"
            aria-label="검색"
          >
            <Image src="/icons/version-b/search.svg" alt="" width={20} height={20} />
          </button>
        </div>

        {/* Aside wrapper */}
        <div className="flex min-h-0 flex-1 items-center py-4">
          {/* Aside SideNavBar ─ 2530:1512 */}
          <aside className="sidebar-enter relative flex h-full w-[200px] shrink-0 flex-col overflow-hidden rounded-xl border-r border-gray-100 bg-white">
            {/* Header */}
            <div className="flex w-full flex-col items-start gap-1 px-3 py-4 shrink-0">
              <h2 className="font-semibold tracking-[-0.18px] text-black" style={{ fontSize: "18px", lineHeight: "1.4" }}>
                관리하기
              </h2>
              <p className="font-normal tracking-[-0.14px] text-gray-500" style={{ fontSize: "14px", lineHeight: "1.5" }}>
                모든 데이터를 관리하세요
              </p>
            </div>

            {/* Nav (scrollable) */}
            <nav className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col items-stretch gap-2 overflow-y-auto px-2 pb-5">
              {/* 섹션 헤더: 조코딩파트너스 */}
              <div className="flex w-full items-center px-3 rounded-lg">
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px]" style={{ color: "#a1a1aa" }}>
                  조코딩파트너스
                </span>
              </div>

              {/* 전체 앱 현황 (active) */}
              <button type="button" className="menu-active flex w-full items-center gap-2 rounded-lg px-3 py-2">
                <Image src="/icons/version-b/admin-menu-apps.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181B]">
                  전체 앱 현황
                </span>
              </button>

              {/* API 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-api.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  API 관리
                </span>
              </button>

              {/* 멤버 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-members.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  멤버 관리
                </span>
              </button>

              {/* 역할 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-roles.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  역할 관리
                </span>
              </button>

              {/* 권한 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-permissions.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  권한 관리
                </span>
              </button>

              {/* 게이트웨이 로그 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-gateway.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  게이트웨이 로그
                </span>
              </button>

              {/* 공유 데이터 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-shared-data.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  공유 데이터 관리
                </span>
              </button>

              {/* 카테고리 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-categories.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  카테고리 관리
                </span>
              </button>

              {/* 기업 정보 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-company-info.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  기업 정보 관리
                </span>
              </button>

              {/* 섹션 헤더: 모든 기업 */}
              <div className="flex w-full items-center px-3 pt-4 rounded-lg">
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px]" style={{ color: "#a1a1aa" }}>
                  모든 기업
                </span>
              </div>

              {/* 기업 생성 • 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-company-mgmt.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  기업 생성 • 관리
                </span>
              </button>

              {/* 클러스터 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-cluster.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  클러스터 관리
                </span>
              </button>

              {/* 테이블 관리 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-tables.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  테이블 관리
                </span>
              </button>

              {/* 전체 비용 분석 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100">
                <Image src="/icons/version-b/admin-menu-costs.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  전체 비용 분석
                </span>
              </button>
            </nav>

            {/* ScrollShadow ─ 2530:1896 */}
            <div className="pointer-events-none absolute bottom-0 left-0 h-[39px] w-full rounded-b-xl" style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />
          </aside>
        </div>
      </div>

      {/* R. Main area ─ 2530:1552 */}
      <div className="flex h-full flex-1 min-w-0 flex-col">
        {/* Header */}
        <header className="flex h-[76px] w-full shrink-0 items-center justify-between px-5 py-4">
          <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
            전체 앱 현황
          </h1>

          {/* 검색 인풋 */}
          <div className="flex h-10 w-[240px] items-center gap-1.5 overflow-hidden rounded-xl bg-white px-4 py-3">
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
        </header>

        {/* Content area */}
        <div className="flex flex-1 items-start overflow-hidden px-5 py-4">
          <div className="content-card h-full min-w-0 flex-1 rounded-xl border-r border-gray-100 bg-white" />
        </div>
      </div>
    </div>
  );
}

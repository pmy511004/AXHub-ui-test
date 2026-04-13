"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TeamColumn from "./TeamColumn";
import HotNewAppsContent from "./HotNewAppsContent";
import HotNewAppsContentV2 from "./HotNewAppsContentV2";
import AppStoreContent from "./AppStoreContent";

// 피그마 versionB-2 (node 2504:1034) — / (둘러보기) 페이지 Version B 전체 레이아웃
//
// 레이어 루트
//   L. Global Nav (2504:1035, w-76) — 둘러보기가 활성
//   M. Middle column (2504:1060)
//      └ toggle icon (2504:1061) + Aside SNB (2504:1066, w-168, 5 메뉴)
//   R. Main area (2504:1086)
//      └ Header (2504:1087, h-76) "내가 이용중인 앱" + 검색 인풋 (2504:1141, w-240)
//      └ Content card (2504:1092)
export default function BrowsePageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("내가 이용중인 앱");
  const [contentVersion, setContentVersion] = useState<1 | 2>(1);

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#f4f4f5", "--page-primary": "#FBB03B" } as React.CSSProperties}
      data-node-id="2504:1034"
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} />

      {/* L. Global Nav ─ 2504:1035 */}
      <div
        className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between"
        data-node-id="2504:1035"
      >
        {/* 상단: 팀 아이콘 + 네비 */}
        <div className="flex w-full flex-col items-start" data-node-id="2504:1036">
          {/* Team icon "JO" ─ collapsed only */}
          {!sidebarExpanded && (
            <div
              className="flex w-full flex-col items-center justify-center px-5 py-4"
              data-node-id="2504:1037"
            >
              <div
                className="flex size-11 items-center justify-center overflow-hidden rounded-xl border border-white bg-primary-500 p-1 shadow-[0px_0px_0px_1px_#6d319d]"
                data-node-id="2504:1038"
              >
                <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
                  JO
                </p>
              </div>
            </div>
          )}

          {/* Nav items ─ 2504:1040 */}
          <nav
            className={`flex w-full flex-col items-center gap-4 px-5 ${sidebarExpanded ? "py-4" : ""}`}
            data-node-id="2504:1040"
          >
            {/* 만들기 (inactive) ─ 2504:1045 */}
            <Link
              href="/make"
              className="flex flex-col items-center gap-1"
              data-node-id="2504:1045"
            >
              <div className="relative size-11" data-node-id="2504:1046">
                <Image
                  src="/icons/version-b/nav-make-inactive.svg"
                  alt="만들기"
                  fill
                  sizes="44px"
                />
              </div>
              <p
                className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]"
                style={{ color: "rgba(24,24,27,0.48)" }}
              >
                만들기
              </p>
            </Link>

            {/* 둘러보기 (active) ─ 2504:1041 */}
            <Link
              href="/"
              className="flex w-[44px] flex-col items-center gap-1"
              data-node-id="2504:1041"
            >
              <div className="relative size-11" data-node-id="2504:1042">
                <Image
                  src="/icons/version-b/nav-browse-active.svg"
                  alt="둘러보기"
                  fill
                  sizes="44px"
                />
              </div>
              <p className="text-center text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-gray-900">
                둘러보기
              </p>
            </Link>

            {/* 관리하기 ─ 2504:1049 */}
            <Link
              href="/admin"
              className="flex w-[44px] flex-col items-center gap-1"
              data-node-id="2504:1049"
            >
              <div className="relative size-11" data-node-id="2504:1050">
                <Image
                  src="/icons/version-b/nav-admin.svg"
                  alt="관리하기"
                  fill
                  sizes="44px"
                />
              </div>
              <p
                className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]"
                style={{ color: "rgba(24,24,27,0.48)" }}
              >
                관리하기
              </p>
            </Link>
          </nav>
        </div>

        {/* 하단: 검색/알림/프로필 카드 ─ 2504:1053 */}
        <div
          className="flex w-full items-center justify-center px-3 py-4"
          data-node-id="2504:1053"
        >
          <div
            className="flex flex-col items-center gap-1 overflow-hidden rounded-2xl bg-white p-1"
            data-node-id="2504:1054"
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

            {/* 알림 ─ 2504:1057 */}
            <button
              type="button"
              className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200"
              aria-label="알림"
              data-node-id="2504:1057"
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

            {/* 프로필 ─ 2504:1059 */}
            <button
              type="button"
              className="relative size-11 overflow-hidden rounded-xl"
              aria-label="프로필"
              data-node-id="2504:1059"
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

      {/* M. Middle column */}
      <div className="flex h-full flex-col gap-4 items-start py-4 shrink-0 w-[200px]">
        {/* Team name header card */}
        <div className="flex h-[44px] w-full shrink-0 items-center overflow-hidden rounded-xl border-r border-gray-100 bg-white px-3">
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-[1.5] tracking-[-0.16px] text-black">
            조코딩AX파트너스
          </p>
        </div>
        {/* Menu card */}
        <div className="flex flex-1 min-h-0 w-full flex-col overflow-hidden rounded-xl border-r border-gray-100 bg-white">
          <nav className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col items-stretch gap-2 overflow-y-auto px-2 py-2">
              {/* 내가 이용중인 앱 ─ 2530:1517 */}
              <button
                type="button"
                onClick={() => setActiveMenu("내가 이용중인 앱")}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "내가 이용중인 앱" ? "menu-active" : "hover:bg-gray-100"}`}
                data-node-id="2530:1517"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-my-apps.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-my-apps.svg)",
                    color: activeMenu === "내가 이용중인 앱" ? "#FBB03B" : "rgba(24,24,27,0.16)",
                  }}
                />
                <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "내가 이용중인 앱" ? "font-semibold text-[#FBB03B]" : "font-normal text-gray-900"}`}>
                  내가 이용중인 앱
                </span>
              </button>

              {/* 인기 • 신규 앱 ─ 2530:1521 */}
              <button
                type="button"
                onClick={() => setActiveMenu("인기 • 신규 앱")}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "인기 • 신규 앱" ? "menu-active" : "hover:bg-gray-100"}`}
                data-node-id="2530:1521"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-hot-apps.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-hot-apps.svg)",
                    color: activeMenu === "인기 • 신규 앱" ? "#FBB03B" : "rgba(24,24,27,0.16)",
                  }}
                />
                <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#FBB03B]" : "font-normal text-gray-900"}`}>
                  인기 • 신규 앱
                </span>
              </button>

              {/* 섹션 헤더: 스토어 ─ 2530:1454 */}
              <div
                className="flex w-full items-center px-3 pt-4 rounded-lg"
                data-node-id="2530:1454"
              >
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px]" style={{ color: "#a1a1aa" }}>
                  스토어
                </span>
              </div>

              {/* 앱 ─ 2530:1527 */}
              <button
                type="button"
                onClick={() => setActiveMenu("앱")}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "앱" ? "menu-active" : "hover:bg-gray-100"}`}
                data-node-id="2530:1527"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-store-app.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-store-app.svg)",
                    color: activeMenu === "앱" ? "#FBB03B" : "rgba(24,24,27,0.16)",
                  }}
                />
                <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "앱" ? "font-semibold text-[#FBB03B]" : "font-normal text-gray-900"}`}>
                  앱
                </span>
              </button>

              {/* API ─ 2530:1531 */}
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                data-node-id="2530:1531"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-store-api.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-store-api.svg)",
                    color: "rgba(24,24,27,0.16)",
                  }}
                />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  API
                </span>
              </button>

              {/* 공유 데이터 ─ 2530:1535 */}
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                data-node-id="2530:1535"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-shared-data.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-shared-data.svg)",
                    color: "rgba(24,24,27,0.16)",
                  }}
                />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  공유 데이터
                </span>
              </button>

              {/* 섹션 헤더: 요청내역 ─ 2530:1464 */}
              <div
                className="flex w-full items-center px-3 pt-4 rounded-lg"
                data-node-id="2530:1464"
              >
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px]" style={{ color: "#a1a1aa" }}>
                  요청내역
                </span>
              </div>

              {/* 앱 사용 ─ 2530:1541 */}
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                data-node-id="2530:1541"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-req-app.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-req-app.svg)",
                    color: "rgba(24,24,27,0.16)",
                  }}
                />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  앱 사용
                </span>
              </button>

              {/* 공유데이터 사용 ─ 2530:1545 */}
              <button
                type="button"
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                data-node-id="2530:1545"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-req-shared.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-req-shared.svg)",
                    color: "rgba(24,24,27,0.16)",
                  }}
                />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  공유데이터 사용
                </span>
              </button>
            </nav>
        </div>
      </div>

      {/* R. Main area ─ 2504:1086 */}
      {activeMenu === "인기 • 신규 앱" ? (
        <>
          {contentVersion === 1 ? <HotNewAppsContent /> : <HotNewAppsContentV2 />}
          {/* 플로팅 버전 토글 (임시) */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full bg-white p-1 shadow-lg">
            <button
              type="button"
              onClick={() => setContentVersion(1)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{
                backgroundColor: contentVersion === 1 ? "#fbb03b" : "transparent",
                color: contentVersion === 1 ? "white" : "#a1a1aa",
              }}
            >
              V1
            </button>
            <button
              type="button"
              onClick={() => setContentVersion(2)}
              className="rounded-full px-3 py-1.5 text-xs font-semibold transition-colors"
              style={{
                backgroundColor: contentVersion === 2 ? "#fbb03b" : "transparent",
                color: contentVersion === 2 ? "white" : "#a1a1aa",
              }}
            >
              V2
            </button>
          </div>
        </>
      ) : activeMenu === "앱" ? (
        <AppStoreContent />
      ) : (
        <div className="flex h-full flex-1 min-w-0 items-start overflow-hidden px-5 py-4">
          <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-xl border-r border-gray-100 bg-white p-8 gap-10">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between">
              <h1
                className="font-bold tracking-[-0.22px] text-black"
                style={{ fontSize: "22px", lineHeight: "1.3" }}
              >
                내가 이용중인 앱
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
      )}
    </div>
  );
}

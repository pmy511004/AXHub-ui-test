
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import TeamColumn from "./TeamColumn";
import NewUpdateChartContent from "./NewUpdateChartContent";
import PopularChartContent from "./PopularChartContent";
import AppStoreContentV2 from "./AppStoreContentV2";
import AppDetailView from "./AppDetailView";

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
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "홈", activeIcon: "/icons/version-b/nav-home-active-new.svg", inactiveIcon: "/icons/version-b/nav-home-inactive.svg" },
    { href: "/make", label: "프로젝트", activeIcon: "/icons/version-b/nav-project-active.svg", inactiveIcon: "/icons/version-b/nav-project-inactive.svg" },
    { href: "/browse", label: "스토어", activeIcon: "/icons/version-b/nav-store-active.svg", inactiveIcon: "/icons/version-b/nav-store-new.svg" },
    { href: "/admin", label: "설정", activeIcon: "/icons/version-b/nav-settings-active.svg", inactiveIcon: "/icons/version-b/nav-settings-new.svg" },
  ];
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTeamProfile, setShowTeamProfile] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("인기 • 신규 앱");
  const [selectedApp, setSelectedApp] = useState<{ name: string; category: string; isAdmin?: boolean; status?: string } | null>(null);
  const [hotAppsExpanded, setHotAppsExpanded] = useState(true);
  const [activeSubMenu, setActiveSubMenu] = useState<string>("인기 차트");

  const tabToMenu: Record<string, { menu: string; sub: string }> = {
    "popular": { menu: "인기 • 신규 앱", sub: "인기 차트" },
    "new-update": { menu: "인기 • 신규 앱", sub: "신규/업데이트 차트" },
    "app-store": { menu: "앱", sub: "" },
  };

  const menuToTab = (menu: string, sub: string): string => {
    if (menu === "앱") return "app-store";
    if (sub === "신규/업데이트 차트") return "new-update";
    return "popular";
  };

  // URL → state 동기화 (초기 진입 및 뒤로가기)
  useEffect(() => {
    const appName = searchParams.get("app");
    const category = searchParams.get("category");
    const tab = searchParams.get("tab");

    if (appName && category) {
      const status = searchParams.get("status") || undefined;
      setSelectedApp({ name: appName, category, isAdmin: appName === "경비 정산 자동화", status });
    } else {
      setSelectedApp(null);
    }

    if (tab && tabToMenu[tab]) {
      setActiveMenu(tabToMenu[tab].menu);
      if (tabToMenu[tab].sub) setActiveSubMenu(tabToMenu[tab].sub);
    }
  }, [searchParams]);

  // 탭 변경 시 URL 업데이트
  const navigateTab = (menu: string, sub: string) => {
    setActiveMenu(menu);
    if (sub) setActiveSubMenu(sub);
    const tab = menuToTab(menu, sub);
    router.push(`/browse?tab=${tab}`);
  };

  // 앱 선택 시 URL 변경
  const selectApp = (name: string, category: string, status?: string) => {
    const params = new URLSearchParams();
    params.set("app", name);
    params.set("category", category);
    params.set("tab", menuToTab(activeMenu, activeSubMenu));
    if (status) params.set("status", status);
    router.push(`/browse?${params.toString()}`);
  };

  // 뒤로가기 (앱 상세 → 목록)
  const deselectApp = () => {
    const tab = menuToTab(activeMenu, activeSubMenu);
    router.push(`/browse?tab=${tab}`);
  };



  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#3F1C5C", "--page-primary": "#B88539" } as React.CSSProperties}
      data-node-id="2504:1034"
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} bgColor="#2f1546" />

      {/* L. Global Nav */}
      <div className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between">
        <div className="flex w-full flex-col items-start">
          <div className="flex w-full flex-col items-center justify-center px-5 py-4">
            <div className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#6d319d] p-1">
              <p className="flex-1 text-center text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">JO</p>
            </div>
          </div>
          <nav className="flex w-full flex-col items-center gap-4 px-5">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
                  <div className={`relative size-11 rounded-xl transition-colors ${isActive ? "" : "hover:bg-white/10"}`}>
                    <Image src={isActive ? item.activeIcon : item.inactiveIcon} alt={item.label} fill sizes="44px" />
                  </div>
                  <p className={`whitespace-nowrap text-center text-xs leading-[1.3] tracking-[-0.12px] ${isActive ? "font-semibold text-white" : "font-normal text-white/70"}`}>{item.label}</p>
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="flex w-full flex-col items-center gap-2 py-4">
          <div className="relative">
            <button type="button" onClick={() => setSettingsOpen(!settingsOpen)} className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10" aria-label="설정">
              <Image src="/icons/version-b/nav-search.svg" alt="" width={24} height={24} />
            </button>
            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
                <div className="absolute bottom-0 left-[calc(100%+8px)] z-50 w-[220px] rounded-xl bg-white p-5 shadow-lg" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-normal text-[#3f3f46]">다크모드</span>
                      <button type="button" onClick={() => setDarkMode(!darkMode)} className={`relative h-6 w-10 rounded-full transition-colors ${darkMode ? "bg-[#5B3D7A]" : "bg-[#d4d4d8]"}`}>
                        <span className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-all ${darkMode ? "left-[19px]" : "left-[3px]"}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-normal text-[#3f3f46]">팀 프로필 표시</span>
                      <button type="button" onClick={() => setShowTeamProfile(!showTeamProfile)} className={`relative h-6 w-10 rounded-full transition-colors ${showTeamProfile ? "bg-[#5B3D7A]" : "bg-[#d4d4d8]"}`}>
                        <span className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-all ${showTeamProfile ? "left-[19px]" : "left-[3px]"}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <button type="button" className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10" aria-label="알림">
            <Image src="/icons/version-b/nav-bell.svg" alt="" width={44} height={44} />
          </button>
          <div className="relative">
            <button type="button" onClick={() => setProfileOpen(!profileOpen)} className="relative size-11 overflow-hidden rounded-xl transition-opacity hover:opacity-80" aria-label="프로필">
              <Image src="/icons/version-b/profile-new.png" alt="" fill sizes="44px" className="rounded-xl object-cover" />
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

      {/* M. Middle column — 사이드바가 각 콘텐츠에 통합되므로 숨김 */}
      <div className="hidden flex h-full flex-col gap-4 items-start py-4 shrink-0 w-[200px]">
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
                    color: activeMenu === "내가 이용중인 앱" ? "#B88539" : "rgba(24,24,27,0.48)",
                  }}
                />
                <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "내가 이용중인 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>
                  내가 이용중인 앱
                </span>
              </button>

              {/* 인기 • 신규 앱 (토글) */}
              <div className="flex flex-col">
                <button
                  type="button"
                  onClick={() => { setHotAppsExpanded((v) => !v); navigateTab("인기 • 신규 앱", activeSubMenu); }}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "인기 • 신규 앱" ? "menu-active" : "hover:bg-gray-100"}`}
                  data-node-id="2530:1521"
                >
                  <span
                    className="menu-icon"
                    style={{
                      maskImage: "url(/icons/version-b/menu-hot-apps.svg)",
                      WebkitMaskImage: "url(/icons/version-b/menu-hot-apps.svg)",
                      color: activeMenu === "인기 • 신규 앱" ? "#B88539" : "rgba(24,24,27,0.48)",
                    }}
                  />
                  <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>
                    인기 • 신규 앱
                  </span>
                  <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`ml-auto shrink-0 transition-transform duration-200 ${hotAppsExpanded ? "rotate-90" : ""}`}>
                    <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
                {hotAppsExpanded && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigateTab("인기 • 신규 앱", "인기 차트")}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeSubMenu === "인기 차트" && activeMenu === "인기 • 신규 앱" ? "bg-black/[0.03]" : "hover:bg-gray-100"}`}
                    >
                      <span className="size-[18px] shrink-0" />
                      <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeSubMenu === "인기 차트" && activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>
                        인기 차트
                      </span>
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateTab("인기 • 신규 앱", "신규/업데이트 차트")}
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeSubMenu === "신규/업데이트 차트" && activeMenu === "인기 • 신규 앱" ? "bg-black/[0.03]" : "hover:bg-gray-100"}`}
                    >
                      <span className="size-[18px] shrink-0" />
                      <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeSubMenu === "신규/업데이트 차트" && activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>
                        신규/업데이트 차트
                      </span>
                    </button>
                  </>
                )}
              </div>

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
                onClick={() => navigateTab("앱", "")}
                className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "앱" ? "menu-active" : "hover:bg-gray-100"}`}
                data-node-id="2530:1527"
              >
                <span
                  className="menu-icon"
                  style={{
                    maskImage: "url(/icons/version-b/menu-store-app.svg)",
                    WebkitMaskImage: "url(/icons/version-b/menu-store-app.svg)",
                    color: activeMenu === "앱" ? "#B88539" : "rgba(24,24,27,0.48)",
                  }}
                />
                <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>
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
                    color: "rgba(24,24,27,0.48)",
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
                    color: "rgba(24,24,27,0.48)",
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
                    color: "rgba(24,24,27,0.48)",
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
                    color: "rgba(24,24,27,0.48)",
                  }}
                />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">
                  공유데이터 사용
                </span>
              </button>
            </nav>
        </div>
      </div>

      {/* R. Main area ─ 통합 사이드바 + 콘텐츠 */}
      {selectedApp ? (
        <div className="flex h-full flex-1 min-w-0 items-start overflow-hidden pr-2 py-2">
          <div className="flex h-full w-[200px] shrink-0 flex-col">
            <div className="flex h-[44px] items-center overflow-hidden rounded-tl-xl border-r px-3" style={{ backgroundColor: "#f6f6f6", borderColor: "#f6f6f6" }}>
              <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-[1.5] tracking-[-0.16px] text-black">
                조코딩AX파트너스
              </p>
            </div>
            <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-bl-xl border-r" style={{ backgroundColor: "#f6f6f6", borderColor: "#f6f6f6" }}>
              <nav className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col items-stretch gap-2 overflow-y-auto px-2 py-2">
                <div className="flex flex-col">
                  <button type="button" onClick={() => { setHotAppsExpanded((v) => !v); }} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "인기 • 신규 앱" ? "menu-active" : "hover:bg-gray-200"}`}>
                    <Image src={activeMenu === "인기 • 신규 앱" ? "/icons/version-b/browse-menu-hot-apps.svg" : "/icons/version-b/browse-menu-hot-apps-inactive.svg"} alt="" width={18} height={18} />
                    <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>인기 • 신규 앱</span>
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`ml-auto shrink-0 transition-transform duration-200 ${hotAppsExpanded ? "rotate-90" : ""}`}>
                      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {hotAppsExpanded && (
                    <>
                      <button type="button" onClick={() => navigateTab("인기 • 신규 앱", "인기 차트")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeSubMenu === "인기 차트" && activeMenu === "인기 • 신규 앱" ? "bg-black/[0.03]" : "hover:bg-gray-200"}`}>
                        <span className="size-[18px] shrink-0" />
                        <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeSubMenu === "인기 차트" && activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>인기 차트</span>
                      </button>
                      <button type="button" onClick={() => navigateTab("인기 • 신규 앱", "신규/업데이트 차트")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeSubMenu === "신규/업데이트 차트" && activeMenu === "인기 • 신규 앱" ? "bg-black/[0.03]" : "hover:bg-gray-200"}`}>
                        <span className="size-[18px] shrink-0" />
                        <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeSubMenu === "신규/업데이트 차트" && activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>신규/업데이트 차트</span>
                      </button>
                    </>
                  )}
                </div>
                <button type="button" onClick={() => navigateTab("앱", "")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "앱" ? "menu-active" : "hover:bg-gray-200"}`}>
                  <Image src={activeMenu === "앱" ? "/icons/version-b/browse-menu-app-store-active.svg" : "/icons/version-b/browse-menu-app-store.svg"} alt="" width={18} height={18} />
                  <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>앱 스토어</span>
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                  <Image src="/icons/version-b/browse-menu-api-store.svg" alt="" width={18} height={18} />
                  <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">API 스토어</span>
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                  <Image src="/icons/version-b/browse-menu-shared-data.svg" alt="" width={18} height={18} />
                  <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">공유 데이터</span>
                </button>
              </nav>
            </div>
          </div>
          <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6 gap-6">
            <AppDetailView
              appName={selectedApp.name}
              category={selectedApp.category}
              fromMenu={activeMenu === "인기 • 신규 앱" ? activeSubMenu : "앱 스토어"}
              onBack={deselectApp}
              isAdmin={selectedApp.isAdmin}
              appStatus={selectedApp.status}
            />
          </div>
        </div>
      ) : (
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
                <div className="flex flex-col">
                  <button type="button" onClick={() => { setHotAppsExpanded((v) => !v); navigateTab("인기 • 신규 앱", activeSubMenu); }} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "인기 • 신규 앱" ? "menu-active" : "hover:bg-gray-200"}`}>
                    <Image src={activeMenu === "인기 • 신규 앱" ? "/icons/version-b/browse-menu-hot-apps.svg" : "/icons/version-b/browse-menu-hot-apps-inactive.svg"} alt="" width={18} height={18} />
                    <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>인기 • 신규 앱</span>
                    <svg width="16" height="16" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" className={`ml-auto shrink-0 transition-transform duration-200 ${hotAppsExpanded ? "rotate-90" : ""}`}>
                      <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#a1a1aa" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {hotAppsExpanded && (
                    <>
                      <button type="button" onClick={() => navigateTab("인기 • 신규 앱", "인기 차트")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeSubMenu === "인기 차트" && activeMenu === "인기 • 신규 앱" ? "bg-black/[0.03]" : "hover:bg-gray-200"}`}>
                        <span className="size-[18px] shrink-0" />
                        <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeSubMenu === "인기 차트" && activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>인기 차트</span>
                      </button>
                      <button type="button" onClick={() => navigateTab("인기 • 신규 앱", "신규/업데이트 차트")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeSubMenu === "신규/업데이트 차트" && activeMenu === "인기 • 신규 앱" ? "bg-black/[0.03]" : "hover:bg-gray-200"}`}>
                        <span className="size-[18px] shrink-0" />
                        <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeSubMenu === "신규/업데이트 차트" && activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>신규/업데이트 차트</span>
                      </button>
                    </>
                  )}
                </div>
                <button type="button" onClick={() => navigateTab("앱", "")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "앱" ? "menu-active" : "hover:bg-gray-200"}`}>
                  <Image src={activeMenu === "앱" ? "/icons/version-b/browse-menu-app-store-active.svg" : "/icons/version-b/browse-menu-app-store.svg"} alt="" width={18} height={18} />
                  <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "앱" ? "font-semibold text-[#B88539]" : "font-normal text-gray-900"}`}>앱 스토어</span>
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                  <Image src="/icons/version-b/browse-menu-api-store.svg" alt="" width={18} height={18} />
                  <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">API 스토어</span>
                </button>
                <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                  <Image src="/icons/version-b/browse-menu-shared-data.svg" alt="" width={18} height={18} />
                  <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">공유 데이터</span>
                </button>
              </nav>
            </div>
          </div>
          {/* Right: Main content */}
          {activeMenu === "인기 • 신규 앱" ? (
            activeSubMenu === "인기 차트" ? (
              <PopularChartContent onAppClick={(name: string, category: string, status?: string) => selectApp(name, category, status)} />
            ) : (
              <NewUpdateChartContent onAppClick={(name: string, category: string) => selectApp(name, category)} />
            )
          ) : activeMenu === "앱" ? (
            <AppStoreContentV2 activeMenu={activeMenu} setActiveMenu={setActiveMenu} onAppClick={(name, category) => selectApp(name, category)} />
          ) : (
            <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6 gap-6">
              <div className="flex shrink-0 items-center justify-between">
                <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
                  내가 이용중인 앱
                </h1>
                <div className="flex h-10 w-[240px] items-center gap-1.5 overflow-hidden rounded-xl px-4 py-3" style={{ backgroundColor: "#f4f4f5" }}>
                  <div className="flex items-center">
                    <div className="relative size-5 overflow-hidden">
                      <Image src="/icons/version-b/search.svg" alt="" fill sizes="20px" />
                    </div>
                  </div>
                  <div className="flex flex-1 items-center overflow-hidden">
                    <p className="whitespace-nowrap text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-300">앱 찾기</p>
                  </div>
                </div>
              </div>
              <div className="flex-1" />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

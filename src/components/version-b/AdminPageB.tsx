"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TeamColumn from "./TeamColumn";

// 피그마 versionB-2 (node 2530:1480) — /admin 페이지 Version B 전체 레이아웃
export default function AdminPageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTeamProfile, setShowTeamProfile] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "홈", activeIcon: "/icons/version-b/nav-home-active-new.svg", inactiveIcon: "/icons/version-b/nav-home-inactive.svg" },
    { href: "/make", label: "프로젝트", activeIcon: "/icons/version-b/nav-project-active.svg", inactiveIcon: "/icons/version-b/nav-project-inactive.svg" },
    { href: "/browse", label: "스토어", activeIcon: "/icons/version-b/nav-store-active.svg", inactiveIcon: "/icons/version-b/nav-store-new.svg" },
    { href: "/admin", label: "설정", activeIcon: "/icons/version-b/nav-settings-active.svg", inactiveIcon: "/icons/version-b/nav-settings-new.svg" },
  ];

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#3F1C5C", "--page-primary": "#4A78B8" } as React.CSSProperties}
      data-node-id="2530:1480"
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
                <Image src="/icons/version-b/admin-menu-apps.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#4A78B8]">전체 앱 현황</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-api.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">API 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-members.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">멤버 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-roles.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">역할 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-permissions.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">권한 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-gateway.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">게이트웨이 로그</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-shared-data.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">공유 데이터 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-categories.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">카테고리 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-company-info.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">기업 정보 관리</span>
              </button>
              <div className="flex w-full items-center px-3 pt-4 rounded-lg">
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px]" style={{ color: "#a1a1aa" }}>모든 기업</span>
              </div>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-company-mgmt.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">기업 생성 • 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-cluster.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">클러스터 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-tables.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">테이블 관리</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/admin-menu-costs.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">전체 비용 분석</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Right: Main content */}
        <div className="flex h-full min-w-0 flex-1 flex-col overflow-hidden rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6">
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

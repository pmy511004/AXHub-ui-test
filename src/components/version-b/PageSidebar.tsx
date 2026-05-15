"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type AdminActiveMenu = "대시보드" | "멤버 • 그룹" | "환경설정";

type ActiveMenu =
  | "홈"
  | "디스커버리"
  | "검색"
  | "앱 만들기"
  | "내가 사용하는 앱"
  | "신청 내역"
  | "배포 신청"
  | AdminActiveMenu;
type ViewMode = "user" | "admin";

interface Props {
  activeMenu: ActiveMenu;
  initialMode?: ViewMode;
  mode?: ViewMode;
  onModeChange?: (mode: ViewMode) => void;
  onAdminMenuChange?: (menu: AdminActiveMenu) => void;
}

type Item = { label: ActiveMenu; icon: string; href: string; badge?: number };

const userTopItems: Item[] = [
  { label: "홈", icon: "/icons/version-b/snb-home.svg", href: "/" },
  { label: "디스커버리", icon: "/icons/version-b/snb-discovery.svg", href: "/discovery" },
  { label: "검색", icon: "/icons/version-b/snb-search.svg", href: "#" },
  { label: "앱 만들기", icon: "/icons/version-b/snb-app.svg", href: "/make" },
];

const userMenuSection: Item[] = [
  { label: "내가 사용하는 앱", icon: "/icons/version-b/snb-collection.svg", href: "#" },
];

const adminItems: { label: AdminActiveMenu; icon: string }[] = [
  { label: "대시보드", icon: "/icons/version-b/snb-dashboard.svg" },
  { label: "멤버 • 그룹", icon: "/icons/version-b/snb-member.svg" },
  { label: "환경설정", icon: "/icons/version-b/snb-settings.svg" },
];

export default function PageSidebar({
  activeMenu,
  initialMode = "user",
  mode: modeProp,
  onModeChange,
  onAdminMenuChange,
}: Props) {
  const [internalMode, setInternalMode] = useState<ViewMode>(initialMode);
  const mode = modeProp ?? internalMode;
  const setMode = (next: ViewMode) => {
    if (modeProp === undefined) setInternalMode(next);
    onModeChange?.(next);
  };
  const renderItem = (item: Item) => {
    const isActive = activeMenu === item.label;
    return (
      <Link
        key={item.label}
        href={item.href}
        className="flex h-[37px] w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-black/[0.03]"
      >
        <span
          className={`menu-icon${isActive ? " menu-active-accent" : ""}`}
          style={{
            maskImage: `url(${item.icon})`,
            WebkitMaskImage: `url(${item.icon})`,
            ...(isActive ? {} : { color: "#d4d4d8" }),
          }}
        />
        <span
          className={`flex-1 whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${
            isActive ? "font-semibold menu-active-accent" : "font-normal text-[#18181b]"
          }`}
        >
          {item.label}
        </span>
        {item.badge !== undefined && (
          <span className="flex size-5 shrink-0 items-center justify-center rounded-[20px] bg-[#ef1026] text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">
            {item.badge}
          </span>
        )}
      </Link>
    );
  };

  return (
    <div className="flex h-full w-[200px] shrink-0 flex-col">
      {/* 헤더 */}
      <button
        type="button"
        className="flex h-[60px] w-full items-center justify-between overflow-hidden bg-[#f6f6f6] px-5 py-3 transition-colors hover:bg-[#ececec]"
      >
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">
          조코딩AX파트너스
        </p>
        <Image
          src="/icons/version-b/team-chevron-down.svg"
          alt=""
          width={20}
          height={20}
          className="shrink-0"
        />
      </button>
      {/* 본문 */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden bg-[#f6f6f6]">
        <nav className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col items-stretch gap-2 overflow-y-auto px-2 py-2">
          {mode === "admin" ? (
            adminItems.map((item) => {
              const isActive = activeMenu === item.label;
              return (
                <button
                  key={item.label}
                  type="button"
                  onClick={() => onAdminMenuChange?.(item.label)}
                  className="flex h-[37px] w-full items-center gap-2 rounded-lg px-3 py-2 transition-colors hover:bg-black/[0.03]"
                >
                  <span
                    className={`menu-icon${isActive ? " menu-active-accent" : ""}`}
                    style={{
                      maskImage: `url(${item.icon})`,
                      WebkitMaskImage: `url(${item.icon})`,
                      ...(isActive ? {} : { color: "#d4d4d8" }),
                    }}
                  />
                  <span
                    className={`flex-1 whitespace-nowrap text-left text-sm leading-[1.5] tracking-[-0.14px] ${
                      isActive ? "font-semibold menu-active-accent" : "font-normal text-[#18181b]"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })
          ) : (
            <>
              {userTopItems.map(renderItem)}

              {/* 섹션 헤더: 컬렉션 */}
              <div className="flex w-full items-center pt-4 px-3">
                <span className="whitespace-nowrap text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#71717a]">
                  컬렉션
                </span>
              </div>

              {userMenuSection.map(renderItem)}
            </>
          )}
        </nav>
      </div>

      {/* 하단: 사용자 / 관리자 전환 */}
      <div className="bg-[#f6f6f6] p-3">
        <div className="relative flex w-full items-center gap-[2px] overflow-hidden rounded-full bg-[#e4e4e7] px-2 py-1">
          {(["user", "admin"] as const).map((key) => {
            const label = key === "user" ? "사용자" : "관리자";
            const isActive = mode === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className="relative flex flex-1 items-center justify-center px-3 py-2"
                aria-pressed={isActive}
              >
                {isActive && (
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-y-0 -left-1 -right-1 rounded-full bg-white"
                  />
                )}
                <span
                  className={`relative text-xs leading-[1.3] tracking-[-0.12px] ${
                    isActive
                      ? "font-semibold text-black"
                      : "font-medium text-[#71717a]"
                  }`}
                >
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

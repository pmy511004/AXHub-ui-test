"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

type ActiveMenu = "홈" | "디스커버리" | "신청 내역" | "앱 만들기" | "배포 신청";
type ViewMode = "user" | "admin";

interface Props {
  activeMenu: ActiveMenu;
  initialMode?: ViewMode;
}

type Item = { label: ActiveMenu; icon: string; href: string; badge?: number };

const topItems: Item[] = [
  { label: "홈", icon: "/icons/version-b/snb-home.svg", href: "/" },
  { label: "디스커버리", icon: "/icons/version-b/snb-discovery.svg", href: "/discovery" },
  { label: "신청 내역", icon: "/icons/version-b/snb-request.svg", href: "#", badge: 2 },
];

const menuSection: Item[] = [
  { label: "앱 만들기", icon: "/icons/version-b/snb-app.svg", href: "/make" },
  { label: "배포 신청", icon: "/icons/version-b/snb-app.svg", href: "/admin" },
];

export default function PageSidebar({ activeMenu, initialMode = "user" }: Props) {
  const [mode, setMode] = useState<ViewMode>(initialMode);
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
          {topItems.map(renderItem)}

          {/* 섹션 헤더: 메뉴 */}
          <div className="flex w-full items-center pt-4 px-3">
            <span className="whitespace-nowrap text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#71717a]">
              메뉴
            </span>
          </div>

          {menuSection.map(renderItem)}
        </nav>
      </div>

      {/* 하단: 사용자 / 관리자 전환 */}
      <div className="overflow-hidden bg-[#f6f6f6] px-3 pb-3 pt-2">
        <div className="flex h-9 items-center rounded-lg bg-[rgba(24,24,27,0.06)] p-0.5">
          {(["user", "admin"] as const).map((key, i) => {
            const label = key === "user" ? "사용자" : "관리자";
            const isActive = mode === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setMode(key)}
                className={`flex h-8 flex-1 items-center justify-center rounded-md text-xs font-semibold leading-[1.3] tracking-[-0.12px] transition-colors ${
                  isActive
                    ? "bg-white text-[#18181b] shadow-[0px_1px_2px_rgba(0,0,0,0.06)]"
                    : "text-[#71717a]"
                }`}
                aria-pressed={isActive}
                style={i === 0 ? { marginRight: 0 } : undefined}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

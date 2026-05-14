"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
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
  const toggleRef = useRef<HTMLDivElement | null>(null);
  const [toggleWidth, setToggleWidth] = useState(0);
  const [mounted, setMounted] = useState(false);

  useLayoutEffect(() => {
    const el = toggleRef.current;
    if (!el) return;
    setToggleWidth(el.offsetWidth);
    const observer = new ResizeObserver(() => {
      setToggleWidth(el.offsetWidth);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);
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
      <div className="bg-[#f6f6f6] p-3">
        <div
          ref={toggleRef}
          className="relative flex w-full items-center gap-[2px] overflow-hidden rounded-full bg-[#e4e4e7] px-2 py-1"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute inset-y-1 rounded-full bg-white"
            style={{
              width: toggleWidth / 2,
              transform: `translateX(${mode === "user" ? 0 : toggleWidth / 2}px)`,
              transition: mounted
                ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                : "none",
            }}
          />
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
                <span
                  className={`relative text-xs leading-[1.3] tracking-[-0.12px] transition-colors duration-200 ${
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

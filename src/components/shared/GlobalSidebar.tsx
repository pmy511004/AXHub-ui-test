"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { sidebarNavItems } from "./data";
import ProfileMenu from "./ProfileMenu";

interface GlobalSidebarProps {
  activePage?: string;
  onNavClick?: (label: string) => void;
}

export default function GlobalSidebar({ activePage = "둘러보기", onNavClick }: GlobalSidebarProps) {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const handleProfileAction = (action: string) => {
    if (action === "expand") {
      setExpanded(!expanded);
    }
    setProfileMenuOpen(false);
  };

  if (expanded) {
    return (
      <div className="relative flex shrink-0">
        {/* 좌측: 팀 목록 */}
        <div className="flex h-full w-[76px] flex-col items-center justify-between bg-gray-900">
          <div className="flex flex-col items-center gap-5 px-5 py-4">
            {/* Team JO */}
            <div className="relative flex size-9 items-center justify-center rounded-lg border border-gray-900/90 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.8)] overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/icons/side-team-profile.png')" }}>
              <span className="relative text-base font-bold text-white leading-6 tracking-[-0.16px]">JO</span>
            </div>
            {/* Team DE */}
            <div className="relative flex size-9 items-center justify-center rounded-lg border border-gray-900/90 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/icons/side-team-profile.png')" }}>
              <div className="absolute inset-0 bg-black/40" />
              <span className="relative text-base font-bold text-white leading-6 tracking-[-0.16px]">DE</span>
            </div>
            {/* Add button */}
            <button className="flex size-9 items-center justify-center rounded-lg">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.48)" strokeWidth="1.5" strokeLinecap="round">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          </div>
        </div>

        {/* 우측: 네비게이션 */}
        <aside className="relative flex h-full w-[76px] flex-col items-center justify-between bg-[#27272a] shrink-0">
          <div className="flex w-full flex-col items-center">
            <nav className="flex w-full flex-col items-center gap-5 px-5 py-4">
              {sidebarNavItems.map((item) => {
                const isActive = item.label === activePage;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={(e) => {
                      if (onNavClick) {
                        e.preventDefault();
                        onNavClick(item.label);
                      }
                    }}
                    className="flex w-[42px] cursor-pointer flex-col items-center"
                  >
                    <div className={`flex size-9 items-center justify-center overflow-hidden rounded-lg ${isActive && item.activeIcon?.endsWith(".png") ? "" : "p-1"}`}>
                      <Image
                        src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                        alt={item.label}
                        width={isActive && item.activeIcon?.endsWith(".png") ? (item.activeIconSize ?? 36) : 20}
                        height={isActive && item.activeIcon?.endsWith(".png") ? (item.activeIconSize ?? 36) : 20}
                      />
                    </div>
                    <span
                      className={`text-xs text-center tracking-[-0.12px] leading-[1.3] whitespace-nowrap ${
                        isActive ? "font-semibold text-white" : "font-normal text-white/48"
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex flex-col items-center gap-3 px-5 py-4">
            <button
              onClick={() => { setExpanded(!expanded); }}
              className="flex size-9 items-center justify-center overflow-hidden rounded-lg p-1"
            >
              <Image src={expanded ? "/icons/side-fold.png" : "/icons/side-expand.png"} alt={expanded ? "접기" : "펼치기"} width={24} height={24} className="opacity-100" />
            </button>
            <button className="flex size-9 items-center justify-center overflow-hidden rounded-lg p-1">
              <Image src="/icons/side-search.svg" alt="검색" width={20} height={20} />
            </button>
            <button className="flex size-9 items-center justify-center overflow-hidden rounded-lg p-1">
              <Image src="/icons/side-bell.svg" alt="알림" width={20} height={20} />
            </button>
            <button
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              className="size-8 overflow-hidden rounded-full"
            >
              <Image src="/icons/side-user-profile.png" alt="프로필" width={32} height={32} className="size-full object-cover rounded-full" />
            </button>
          </div>

          {profileMenuOpen && (
            <ProfileMenu
              onClose={() => setProfileMenuOpen(false)}
              onAction={handleProfileAction}
              isExpanded={expanded}
            />
          )}
        </aside>
      </div>
    );
  }

  return (
    <aside className="relative flex h-full w-[76px] flex-col items-center justify-between bg-gray-900 shrink-0">
      <div className="flex w-full flex-col items-center">
        <div className="flex h-[72px] w-full items-center justify-center border-b border-white/16 px-5">
          <div className="relative flex size-9 items-center justify-center rounded-lg border border-gray-900/90 shadow-[0px_0px_0px_1px_rgba(255,255,255,0.8)] overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/icons/side-team-profile.png')" }}>
            <span className="relative text-base font-bold text-white leading-6 tracking-[-0.16px]">JO</span>
          </div>
        </div>

        <nav className="flex w-full flex-col items-center gap-5 px-5 py-4">
          {sidebarNavItems.map((item) => {
            const isActive = item.label === activePage;
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  if (onNavClick) {
                    e.preventDefault();
                    onNavClick(item.label);
                  }
                }}
                className="flex w-[42px] cursor-pointer flex-col items-center"
              >
                <div className={`flex size-9 items-center justify-center overflow-hidden rounded-lg ${isActive && item.activeIcon?.endsWith(".png") ? "" : "p-1"}`}>
                  <Image
                    src={isActive && item.activeIcon ? item.activeIcon : item.icon}
                    alt={item.label}
                    width={isActive && item.activeIcon?.endsWith(".png") ? (item.activeIconSize ?? 36) : 20}
                    height={isActive && item.activeIcon?.endsWith(".png") ? (item.activeIconSize ?? 36) : 20}
                  />
                </div>
                <span
                  className={`text-xs text-center tracking-[-0.12px] leading-[1.3] whitespace-nowrap ${
                    isActive ? "font-semibold text-white" : "font-normal text-white/48"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="flex flex-col items-center gap-3 px-5 py-4">
        <button
          onClick={() => { setExpanded(!expanded); }}
          className="flex size-9 items-center justify-center overflow-hidden rounded-lg p-1"
        >
          <Image src={expanded ? "/icons/side-fold.png" : "/icons/side-expand.png"} alt={expanded ? "접기" : "펼치기"} width={24} height={24} className="opacity-100" />
        </button>
        <button className="flex size-9 items-center justify-center overflow-hidden rounded-lg p-1">
          <Image src="/icons/side-search.svg" alt="검색" width={20} height={20} />
        </button>
        <button className="flex size-9 items-center justify-center overflow-hidden rounded-lg p-1">
          <Image src="/icons/side-bell.svg" alt="알림" width={20} height={20} />
        </button>
        <button
          onClick={() => setProfileMenuOpen(!profileMenuOpen)}
          className="size-8 overflow-hidden rounded-full"
        >
          <Image src="/icons/side-user-profile.png" alt="프로필" width={32} height={32} className="size-full object-cover rounded-full" />
        </button>
      </div>

      {profileMenuOpen && (
        <ProfileMenu
          onClose={() => setProfileMenuOpen(false)}
          onAction={handleProfileAction}
          isExpanded={expanded}
        />
      )}
    </aside>
  );
}

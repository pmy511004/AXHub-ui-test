"use client";

import Link from "next/link";

type ActiveMenu = "홈" | "디스커버리" | "신청 내역" | "앱 만들기" | "배포 신청";

interface Props {
  activeMenu: ActiveMenu;
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

export default function PageSidebar({ activeMenu }: Props) {
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
      <div className="flex h-[60px] items-center overflow-hidden rounded-tl-xl bg-[#f6f6f6] px-3">
        <p className="overflow-hidden text-ellipsis whitespace-nowrap text-lg font-bold leading-[1.4] tracking-[-0.18px] text-[#18181b]">
          조코딩AX파트너스
        </p>
      </div>
      {/* 본문 */}
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-bl-xl bg-[#f6f6f6]">
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
    </div>
  );
}

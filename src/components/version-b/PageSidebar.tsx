"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export type AdminActiveMenu =
  | "AXHub 시작하기"
  | "대시보드"
  | "멤버 • 그룹"
  | "환경설정";

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
  hideStartGuide?: boolean;
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

const adminTopItems: { label: AdminActiveMenu; icon: string }[] = [
  { label: "AXHub 시작하기", icon: "/icons/version-b/snb-axhub-start.svg" },
];

const adminBottomItems: { label: AdminActiveMenu; icon: string }[] = [
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
  hideStartGuide = false,
}: Props) {
  const [internalMode, setInternalMode] = useState<ViewMode>(initialMode);
  const mode = modeProp ?? internalMode;
  const [tooltipDismissed, setTooltipDismissed] = useState(false);
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
        className="flex h-[60px] w-full items-center justify-between overflow-hidden bg-surface px-5 py-3 transition-colors hover:bg-[#ececec]"
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
      <div className="flex flex-1 min-h-0 flex-col overflow-hidden bg-surface">
        <nav className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col items-stretch gap-2 overflow-y-auto px-2 py-2">
          {mode === "admin" ? (
            <>
              {/* 상단 그룹: AXHub 시작하기 — 가이드 완료 후엔 숨김 */}
              {!hideStartGuide && (
                <>
                  {adminTopItems.map((item) => {
                    const isActive = activeMenu === item.label;
                    return (
                      <button
                        key={item.label}
                        type="button"
                        onClick={() => onAdminMenuChange?.(item.label)}
                        className="flex h-[37px] w-full items-center gap-2 rounded-lg bg-white px-3 py-2 shadow-[0px_1px_1px_rgba(0,0,0,0.05)] transition-transform duration-200 ease-out hover:scale-[1.04]"
                      >
                        <span
                          className="menu-icon"
                          style={{
                            maskImage: `url(${item.icon})`,
                            WebkitMaskImage: `url(${item.icon})`,
                            color: isActive ? "#2d64fa" : "#d4d4d8",
                          }}
                        />
                        <span
                          className="flex-1 whitespace-nowrap text-left text-sm leading-[1.5] tracking-[-0.14px]"
                          style={
                            isActive
                              ? { color: "#2d64fa", fontWeight: 600 }
                              : { color: "#18181b", fontWeight: 400 }
                          }
                        >
                          {item.label}
                        </span>
                      </button>
                    );
                  })}

                  {/* 그룹 간 간격 */}
                  <div className="h-1 shrink-0" />
                </>
              )}

              {/* 하단 그룹: 대시보드 / 멤버•그룹 / 환경설정 */}
              {adminBottomItems.map((item) => {
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
              })}
            </>
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
      <div className="relative bg-surface p-3">
        {/* 시작 가이드 툴팁 (사용자 모드에서만 표시, Figma 5037:8812) */}
        {mode === "user" && !tooltipDismissed && (
          <div
            className="absolute bottom-full left-[102px] z-40 flex flex-col items-start gap-1"
            data-node-id="5037:8812"
          >
            {/* 본체 (Figma 5069:9971 — 좌측 텍스트 블록 + 우측 X 닫기 버튼) */}
            <div
              className="flex w-fit items-start gap-3 whitespace-nowrap rounded-lg bg-[#2d64fa] p-5"
              style={{ filter: "drop-shadow(0px 0px 20px rgba(0,0,0,0.1))" }}
              data-node-id="5069:9971"
            >
              <div className="flex flex-col items-start gap-1" data-node-id="5069:9972">
                <div
                  className="flex flex-col justify-center text-base font-bold leading-[1.5] tracking-[-0.16px] text-white"
                  data-node-id="5069:9973"
                >
                  <p>안녕하세요 관리자님,</p>
                  <p>시작 가이드를 준비했습니다!</p>
                </div>
                <div
                  className="flex flex-col justify-center text-sm font-normal leading-[1.5] tracking-[-0.14px] text-white/70"
                  data-node-id="5069:9974"
                >
                  <p>관리자 페이지를 열어주세요</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setTooltipDismissed(true)}
                aria-label="가이드 닫기"
                className="block size-6 shrink-0 transition-opacity hover:opacity-100"
                data-node-id="5069:9975"
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="block"
                  aria-hidden
                >
                  <path
                    d="M17.8242 16.9752C17.8799 17.031 17.9241 17.0971 17.9543 17.17C17.9845 17.2428 18 17.3209 18 17.3997C18 17.4785 17.9845 17.5566 17.9543 17.6294C17.9241 17.7023 17.8799 17.7684 17.8242 17.8242C17.7684 17.8799 17.7023 17.9241 17.6294 17.9543C17.5566 17.9845 17.4785 18 17.3997 18C17.3209 18 17.2428 17.9845 17.17 17.9543C17.0971 17.9241 17.031 17.8799 16.9752 17.8242L12 12.8482L7.02478 17.8242C6.9122 17.9368 6.75951 18 6.6003 18C6.44109 18 6.2884 17.9368 6.17582 17.8242C6.06325 17.7116 6 17.5589 6 17.3997C6 17.2405 6.06325 17.0878 6.17582 16.9752L11.1518 12L6.17582 7.02478C6.06325 6.9122 6 6.75951 6 6.6003C6 6.44109 6.06325 6.2884 6.17582 6.17582C6.2884 6.06325 6.44109 6 6.6003 6C6.75951 6 6.9122 6.06325 7.02478 6.17582L12 11.1518L16.9752 6.17582C17.0878 6.06325 17.2405 6 17.3997 6C17.5589 6 17.7116 6.06325 17.8242 6.17582C17.9368 6.2884 18 6.44109 18 6.6003C18 6.75951 17.9368 6.9122 17.8242 7.02478L12.8482 12L17.8242 16.9752Z"
                    fill="white"
                    fillOpacity="0.7"
                  />
                </svg>
              </button>
            </div>
            {/* 아래로 향한 화살표 + 잔상 진동 애니메이션 (관리자 탭 중앙) */}
            <div className="pointer-events-none relative h-4 w-full" data-node-id="5037:8816">
              {/* 잔상 2 (가장 흐림, 더 늦게 따라옴) */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-[30.5px] top-0"
                style={{
                  animation:
                    "tooltipArrowBounce 1.2s ease-in-out 0.24s infinite",
                }}
              >
                <Image
                  src="/icons/version-b/tooltip-arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="-scale-y-100 opacity-20"
                />
              </span>
              {/* 잔상 1 (중간 농도) */}
              <span
                aria-hidden
                className="pointer-events-none absolute left-[30.5px] top-0"
                style={{
                  animation:
                    "tooltipArrowBounce 1.2s ease-in-out 0.12s infinite",
                }}
              >
                <Image
                  src="/icons/version-b/tooltip-arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="-scale-y-100 opacity-40"
                />
              </span>
              {/* 메인 화살표 */}
              <span
                className="pointer-events-none absolute left-[30.5px] top-0"
                style={{
                  animation: "tooltipArrowBounce 1.2s ease-in-out infinite",
                }}
              >
                <Image
                  src="/icons/version-b/tooltip-arrow.svg"
                  alt=""
                  width={16}
                  height={16}
                  className="-scale-y-100"
                />
              </span>
            </div>
          </div>
        )}

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

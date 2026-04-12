"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";

// 인기 앱 순위 색상 (1~3위 골드 계열, 4위 이후 회색)
const rankColors = ["#e09a34", "#fbbb45", "#fddc8a", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa"];

// 순위 변동 데이터 (양수=상승, 음수=하락, 0=변동없음)
const rankChanges = [0, 2, -1, 1, 0, 3, -2, 0, 1, -1];

// 앱 미리보기 설명
const popularDescriptions = [
  "경비 정산을 자동화하여 업무 시간을 절약해보세요",
  "팀 일정을 한눈에 관리하는 스마트 캘린더",
  "실시간 매출 데이터를 대시보드로 확인하세요",
  "사내 문서를 쉽게 검색하고 공유할 수 있어요",
  "프로젝트 진행 상황을 실시간으로 추적하세요",
  "회의실 예약을 간편하게 관리하세요",
  "고객 피드백을 자동으로 분류하고 분석해요",
  "재고 관리를 실시간으로 모니터링하세요",
  "전자 결재를 빠르고 편리하게 처리하세요",
  "팀 커뮤니케이션을 한 곳에서 관리하세요",
];

const newDescriptions = [
  "AI 기반 문서 요약으로 업무 효율을 높여보세요",
  "스마트 출퇴근 관리로 근태를 간편하게",
  "데이터 시각화를 드래그 앤 드롭으로 만드세요",
  "사내 교육 콘텐츠를 맞춤 추천해드려요",
  "업무 자동화 봇을 쉽게 만들어보세요",
  "팀 OKR 관리를 체계적으로 진행하세요",
  "비용 분석 리포트를 자동으로 생성해요",
  "사내 위키를 쉽게 작성하고 검색하세요",
  "API 모니터링을 실시간으로 확인하세요",
  "스마트 알림으로 중요 업무를 놓치지 마세요",
];

interface AppItem {
  name: string;
  category: string;
  users: string;
}

const popularApps: AppItem[] = [
  { name: "앱 이름", category: "카테고리명", users: "101명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "101명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "101명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "101명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "101명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "89명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "76명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "64명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "52명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "41명 사용중" },
];

const newApps: AppItem[] = [
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중" },
];

function RankChange({ change }: { change: number }) {
  if (change === 0) return null;
  const isUp = change > 0;
  return (
    <span
      className="text-[10px] font-semibold leading-none"
      style={{ color: isUp ? "#22c55e" : "#ef4444" }}
    >
      {isUp ? `▲${change}` : `▼${Math.abs(change)}`}
    </span>
  );
}

export default function HotNewAppsContent() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [tooltip, setTooltip] = useState<{ text: string; x: number; y: number; visible: boolean } | null>(null);
  const tooltipTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const activeRowRef = useRef<EventTarget | null>(null);

  const showTooltip = useCallback((e: React.MouseEvent, text: string) => {
    if (tooltipTimerRef.current) clearTimeout(tooltipTimerRef.current);
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }

    activeRowRef.current = e.currentTarget;
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = { text, x: rect.left + 48, y: rect.top - 16 };

    // 행 간 이동 (hideTimer가 대기중) 또는 이미 보이는 상태면 즉시 교체
    const isTransition = hideTimerRef.current !== null;
    if (isTransition) {
      setTooltip({ ...pos, visible: true });
      return;
    }

    setTooltip({ ...pos, visible: false });
    tooltipTimerRef.current = setTimeout(() => {
      setTooltip((prev) => prev ? { ...prev, ...pos, visible: true } : null);
    }, 300);
  }, []);

  const hideTooltip = useCallback(() => {
    if (tooltipTimerRef.current) {
      clearTimeout(tooltipTimerRef.current);
      tooltipTimerRef.current = null;
    }
    activeRowRef.current = null;
    setTooltip((prev) => prev ? { ...prev, visible: false } : null);
    hideTimerRef.current = setTimeout(() => {
      setTooltip(null);
    }, 300);
  }, []);

  const handleScroll = () => {
    if (!scrollContainerRef.current || !bannerRef.current) return;
    const scrollTop = scrollContainerRef.current.scrollTop;
    const parallaxOffset = scrollTop * 0.3;
    bannerRef.current.style.transform = `translateY(${parallaxOffset}px)`;
  };

  return (
    <div className="flex h-full flex-1 min-w-0 flex-col">
      {/* Header */}
      <header className="flex h-[76px] w-full shrink-0 items-center justify-between px-5 py-4">
        <h1
          className="font-bold tracking-[-0.22px] text-black"
          style={{ fontSize: "22px", lineHeight: "1.3" }}
        >
          인기 • 신규 앱
        </h1>
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
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex h-full min-w-0 flex-1 flex-col gap-8 overflow-y-auto rounded-2xl border-r border-gray-100 bg-white p-8"
        >
          {/* Banner ─ 2587:1493 (패럴랙스) */}
          <div className="relative w-full shrink-0 overflow-visible" style={{ height: 180 }}>
            <div
              ref={bannerRef}
              className="relative flex w-full items-center gap-2.5 rounded-2xl p-10"
              style={{ height: 180, willChange: "transform" }}
              data-node-id="2587:1493"
            >
              {/* 배경 클리핑 래퍼 */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <Image
                  src="/icons/version-b/banner-bg.png"
                  alt=""
                  fill
                  sizes="900px"
                  className="pointer-events-none object-cover"
                />
              </div>
              {/* 텍스트 영역 */}
              <div className="relative z-10 flex flex-1 flex-col gap-2 items-start justify-center" data-node-id="2620:402">
                <div className="text-[28px] font-bold leading-[1.35] text-white" data-node-id="2572:1776">
                  <p>회계팀 김사원이</p>
                  <p>커피 한 잔 할 여유를 만들었대요!</p>
                </div>
                <p
                  className="text-[18px] font-normal leading-[1.4] tracking-[-0.18px] whitespace-nowrap"
                  style={{ color: "rgba(255,255,255,0.7)" }}
                  data-node-id="2614:2028"
                >
                  동료들이 만든 앱을 구경해보세요
                </p>
              </div>
              {/* 일러스트 */}
              <div className="absolute bottom-0 right-[40px] z-10 h-[234px] w-[351.5px]" data-node-id="2620:400">
                <Image
                  src="/icons/version-b/banner-illust.png"
                  alt=""
                  fill
                  sizes="352px"
                  className="pointer-events-none object-cover"
                />
              </div>
            </div>
          </div>

          {/* Two columns */}
          <div className="flex min-h-0 flex-1 gap-8">
            {/* 왼쪽: 지금 인기있는 앱 */}
            <div className="flex min-h-0 flex-1 flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-bold leading-[1.3] tracking-[-0.22px] text-black">
                  지금 인기있는 앱
                </h2>
                <button
                  type="button"
                  className="flex items-center gap-1 text-base font-medium leading-[1.5] tracking-[-0.16px]"
                  style={{ color: "#a1a1aa" }}
                >
                  전체보기
                  <span className="relative size-[18px] overflow-hidden">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.22 3.22C6.51 2.93 6.99 2.93 7.28 3.22L12.91 8.84C13.2 9.14 13.2 9.61 12.91 9.91L7.28 15.53C6.99 15.82 6.51 15.82 6.22 15.53C5.93 15.24 5.93 14.76 6.22 14.47L11.31 9.37L6.22 4.28C5.93 3.99 5.93 3.51 6.22 3.22Z" fill="#a1a1aa"/>
                    </svg>
                  </span>
                </button>
              </div>

              <div className="sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
                {popularApps.map((app, i) => (
                  <div
                    key={i}
                    className="app-row flex items-center gap-5 py-4"
                    onMouseEnter={(e) => showTooltip(e, popularDescriptions[i])}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="flex flex-1 items-center gap-3">
                      {/* 순위 번호 + 변동 */}
                      <div className="flex w-9 shrink-0 flex-col items-center gap-0.5">
                        <span
                          className="rank-enter flex h-[45px] items-center justify-center text-center text-[32px] font-bold leading-[1.2]"
                          style={{
                            color: rankColors[i] ?? "#a1a1aa",
                            animationDelay: `${i * 80}ms`,
                          }}
                        >
                          {i + 1}
                        </span>
                        <RankChange change={rankChanges[i]} />
                      </div>
                      <div className="app-icon size-[52px] shrink-0 rounded-xl bg-[#d8d8d8]" />
                      <div className="flex h-[52px] flex-col gap-2">
                        <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.18px] text-black">
                          {app.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-500">
                          <span>{app.category}</span>
                          <span className="inline-block size-1 rounded-full bg-gray-500" />
                          <span>{app.users}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="relative shrink-0 overflow-hidden rounded-lg px-3.5 text-sm font-medium leading-[1.5] tracking-[-0.14px] transition-colors"
                      style={{ backgroundColor: "#fff8e6", color: "#fbb03b", height: 32 }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fdefc5"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff8e6"; }}
                    >
                      사용신청
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 세로 구분선 (그라데이션) */}
            <div
              className="w-px shrink-0 self-stretch"
              style={{
                background: "linear-gradient(to bottom, transparent 0%, #e4e4e7 15%, #e4e4e7 85%, transparent 100%)",
              }}
            />

            {/* 오른쪽: 새로 나온 앱 */}
            <div className="flex min-h-0 flex-1 flex-col gap-5">
              <div className="flex items-center justify-between">
                <h2 className="text-[22px] font-bold leading-[1.3] tracking-[-0.22px] text-black">
                  새로 나온 앱
                </h2>
                <button
                  type="button"
                  className="flex items-center gap-1 text-base font-medium leading-[1.5] tracking-[-0.16px]"
                  style={{ color: "#a1a1aa" }}
                >
                  전체보기
                  <span className="relative size-[18px] overflow-hidden">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6.22 3.22C6.51 2.93 6.99 2.93 7.28 3.22L12.91 8.84C13.2 9.14 13.2 9.61 12.91 9.91L7.28 15.53C6.99 15.82 6.51 15.82 6.22 15.53C5.93 15.24 5.93 14.76 6.22 14.47L11.31 9.37L6.22 4.28C5.93 3.99 5.93 3.51 6.22 3.22Z" fill="#a1a1aa"/>
                    </svg>
                  </span>
                </button>
              </div>

              <div className="sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
                {newApps.map((app, i) => (
                  <div
                    key={i}
                    className="app-row flex items-center gap-5 py-4"
                    onMouseEnter={(e) => showTooltip(e, newDescriptions[i])}
                    onMouseLeave={hideTooltip}
                  >
                    <div className="flex flex-1 items-center gap-3 pl-1">
                      <div className="app-icon size-[52px] shrink-0 rounded-xl bg-[#d8d8d8]" />
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          <span className="new-badge-pulse flex h-5 items-center justify-center rounded-lg bg-[#f5475c] px-1.5 text-[10px] font-semibold leading-[1.4] tracking-[-0.1px] text-white">
                            NEW
                          </span>
                          <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.18px] text-black">
                            {app.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-500">
                          <span>{app.category}</span>
                          <span className="inline-block size-1 rounded-full bg-gray-500" />
                          <span>{app.users}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-lg px-3.5 text-sm font-medium leading-[1.5] tracking-[-0.14px] transition-colors"
                      style={{ backgroundColor: "#fff8e6", color: "#fbb03b", height: 32 }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#fdefc5"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#fff8e6"; }}
                    >
                      사용신청
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Fixed 툴팁 */}
      {tooltip && (
        <div
          className={`app-tooltip-box ${tooltip.visible ? "visible" : ""}`}
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}

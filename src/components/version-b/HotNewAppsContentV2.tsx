"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";

// 인기 앱 순위 색상 (1~3위 골드 계열, 4위 이후 회색)
const rankColors = ["#fbb03b", "#fbbb45", "#fccb5f", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa", "#a1a1aa"];

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
  { name: "경비 정산 자동화", category: "경영재무", users: "312명 사용중" },
  { name: "스마트 캘린더", category: "협업도구", users: "287명 사용중" },
  { name: "매출 대시보드", category: "데이터분석", users: "245명 사용중" },
  { name: "사내 문서 검색", category: "생산성", users: "198명 사용중" },
  { name: "프로젝트 트래커", category: "프로젝트관리", users: "176명 사용중" },
  { name: "회의실 예약", category: "사내시설", users: "153명 사용중" },
  { name: "피드백 분석기", category: "고객관리", users: "132명 사용중" },
  { name: "재고 모니터링", category: "물류관리", users: "98명 사용중" },
  { name: "전자 결재", category: "경영재무", users: "87명 사용중" },
  { name: "팀 메신저", category: "커뮤니케이션", users: "76명 사용중" },
];

const newApps: AppItem[] = [
  { name: "AI 문서 요약", category: "생산성", users: "24명 사용중" },
  { name: "스마트 출퇴근", category: "인사관리", users: "18명 사용중" },
  { name: "데이터 시각화", category: "데이터분석", users: "15명 사용중" },
  { name: "맞춤 교육 추천", category: "교육", users: "12명 사용중" },
  { name: "업무 자동화 봇", category: "자동화", users: "9명 사용중" },
  { name: "OKR 관리", category: "프로젝트관리", users: "7명 사용중" },
  { name: "비용 리포트", category: "경영재무", users: "5명 사용중" },
  { name: "사내 위키", category: "협업도구", users: "3명 사용중" },
  { name: "API 모니터링", category: "개발도구", users: "2명 사용중" },
  { name: "스마트 알림", category: "생산성", users: "1명 사용중" },
];

function RankChange({ change }: { change: number }) {
  if (change === 0) return (
    <span className="text-[10px] font-semibold leading-none" style={{ color: "#71717a" }}>-</span>
  );
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

interface Props {
  onAppClick?: (name: string, category: string) => void;
}

export default function HotNewAppsContentV2({ onAppClick }: Props = {}) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const bannerRef = useRef<HTMLDivElement>(null);
  const [bannerSlide, setBannerSlide] = useState(0);
  const [bannerTransition, setBannerTransition] = useState(true);
  const bannerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bannerCount = 2;

  // 3번째 슬라이드(복제 배너1)에 도달하면 트랜지션 없이 0으로 리셋
  useEffect(() => {
    if (bannerSlide === bannerCount) {
      const timer = setTimeout(() => {
        setBannerTransition(false);
        setBannerSlide(0);
        // 리셋 후 다음 프레임에서 트랜지션 복원
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setBannerTransition(true);
          });
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [bannerSlide]);

  useEffect(() => {
    bannerTimerRef.current = setInterval(() => {
      setBannerSlide((prev) => prev + 1);
    }, 10000);
    return () => {
      if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
    };
  }, []);

  const bannerIndex = bannerSlide % bannerCount;

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
    <>
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="flex h-full min-w-0 flex-1 flex-col gap-6 overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6"
      >
          {/* Banner 캐러셀 (슬라이드) */}
          <div className="relative w-full shrink-0" style={{ height: 212 }}>
            <div
              ref={bannerRef}
              className="relative w-full rounded-2xl"
              style={{ height: 212, willChange: "transform", overflowX: "clip", overflowY: "visible", paddingTop: 16, paddingBottom: 16 } as React.CSSProperties}
            >
              {/* 슬라이드 트랙 (3장: 배너1, 배너2, 배너1 복제) */}
              <div
                className={`flex h-full ${bannerTransition ? "transition-transform duration-500 ease-in-out" : ""}`}
                style={{ width: "300%", transform: `translateX(-${bannerSlide * (100 / 3)}%)` }}
              >
                {/* 배너 1 */}
                <div className="relative flex h-full w-1/3 shrink-0 items-center gap-2.5 p-10" data-node-id="2587:1493">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <Image src="/icons/version-b/banner-bg.png" alt="" fill sizes="900px" className="pointer-events-none object-cover" />
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col gap-2 items-start justify-center">
                    <div className="text-[28px] font-bold leading-[1.35] text-white">
                      <p>회계팀 김사원이</p>
                      <p>커피 한 잔 할 여유를 만들었대요!</p>
                    </div>
                    <p className="text-[18px] font-normal leading-[1.4] tracking-[-0.18px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.7)" }}>
                      동료들이 만든 앱을 구경해보세요
                    </p>
                  </div>
                  <div className="absolute bottom-0 right-[40px] z-10 h-[234px] w-[351.5px]">
                    <Image src="/icons/version-b/banner-illust.png" alt="" fill sizes="352px" className="pointer-events-none object-cover" />
                  </div>
                </div>

                {/* 배너 2 */}
                <div className="relative flex h-full w-1/3 shrink-0 items-center gap-2.5 p-10" data-node-id="2632:394">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <Image src="/icons/version-b/banner2-bg.png" alt="" fill sizes="900px" className="pointer-events-none object-cover" />
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col gap-2 items-start justify-center">
                    <div className="text-[28px] font-bold leading-[1.35] text-white">
                      <p>디자이너 최허브님이</p>
                      <p>야근없는 저녁을 만들었대요!</p>
                    </div>
                    <p className="text-[18px] font-normal leading-[1.4] tracking-[-0.18px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.7)" }}>
                      동료들이 만든 앱을 구경해보세요
                    </p>
                  </div>
                  <div className="absolute bottom-0 right-[40px] z-10 h-[220px] w-[328.5px]">
                    <Image src="/icons/version-b/banner2-illust.png" alt="" fill sizes="329px" className="pointer-events-none object-cover" />
                  </div>
                </div>

                {/* 배너 1 복제 (무한 루프용) */}
                <div className="relative flex h-full w-1/3 shrink-0 items-center gap-2.5 p-10">
                  <div className="absolute inset-0 overflow-hidden rounded-2xl">
                    <Image src="/icons/version-b/banner-bg.png" alt="" fill sizes="900px" className="pointer-events-none object-cover" />
                  </div>
                  <div className="relative z-10 flex flex-1 flex-col gap-2 items-start justify-center">
                    <div className="text-[28px] font-bold leading-[1.35] text-white">
                      <p>회계팀 김사원이</p>
                      <p>커피 한 잔 할 여유를 만들었대요!</p>
                    </div>
                    <p className="text-[18px] font-normal leading-[1.4] tracking-[-0.18px] whitespace-nowrap" style={{ color: "rgba(255,255,255,0.7)" }}>
                      동료들이 만든 앱을 구경해보세요
                    </p>
                  </div>
                  <div className="absolute bottom-0 right-[40px] z-10 h-[234px] w-[351.5px]">
                    <Image src="/icons/version-b/banner-illust.png" alt="" fill sizes="352px" className="pointer-events-none object-cover" />
                  </div>
                </div>
              </div>
            </div>

            {/* Dot indicator (overflow 밖에 배치) */}
            <div className="absolute bottom-7 left-1/2 z-20 flex -translate-x-1/2 gap-1.5">
              {[0, 1].map((i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`배너 ${i + 1}`}
                  onClick={() => {
                    setBannerTransition(true);
                    setBannerSlide(i);
                    if (bannerTimerRef.current) clearInterval(bannerTimerRef.current);
                    bannerTimerRef.current = setInterval(() => {
                      setBannerSlide((prev) => prev + 1);
                    }, 10000);
                  }}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: bannerIndex === i ? 20 : 6,
                    height: 6,
                    backgroundColor: bannerIndex === i ? "white" : "rgba(255,255,255,0.4)",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Two columns */}
          <div className="flex min-h-0 flex-1 gap-10">
            {/* 왼쪽: 오늘의 인기 앱 */}
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
              <div className="flex shrink-0 items-end justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold leading-[1.5] tracking-[-0.14px]" style={{ color: "#fbb03b" }}>BEST</span>
                  <h2 className="text-[24px] font-bold leading-[1.2] text-black">
                    오늘의 인기 앱
                  </h2>
                </div>
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

              <div className="app-card-grid sidebar-scroll grid min-h-0 flex-1 content-start gap-6 overflow-y-auto pt-4">
                {popularApps.map((app, i) => {
                  const rankColor = rankColors[i] ?? "#a1a1aa";
                  return (
                    <div
                      key={i}
                      className="app-row flex cursor-pointer flex-col gap-2"
                      onClick={() => onAppClick?.(app.name, app.category)}
                      onMouseEnter={(e) => showTooltip(e, popularDescriptions[i])}
                      onMouseLeave={hideTooltip}
                    >
                      {/* Icon with padding */}
                      <div className="flex w-full items-center p-2">
                        <div className="app-icon aspect-square flex-1 rounded-2xl bg-[#e4e4e7]" />
                      </div>
                      {/* Rank + Info */}
                      <div className="flex items-center gap-1">
                        <div className="flex w-9 shrink-0 flex-col items-center gap-0.5">
                          <span
                            className="text-[32px] font-bold leading-[1.2]"
                            style={{ color: rankColor }}
                          >
                            {i + 1}
                          </span>
                          <RankChange change={rankChanges[i]} />
                        </div>
                        <div className="flex w-[100px] flex-col gap-1">
                          <p className="truncate text-base font-semibold leading-[1.5] tracking-[-0.16px] text-black">
                            {app.name}
                          </p>
                          <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">
                            {app.category}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 오른쪽: 따끈따끈 신규 앱 */}
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden">
              <div className="flex shrink-0 items-end justify-between">
                <div className="flex flex-col gap-1">
                  <span className="text-sm font-bold leading-[1.5] tracking-[-0.14px]" style={{ color: "#fbb03b" }}>NEW</span>
                  <h2 className="text-[24px] font-bold leading-[1.2] text-black">
                    따끈따끈 신규 앱
                  </h2>
                </div>
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

              <div className="app-card-grid sidebar-scroll grid min-h-0 flex-1 content-start gap-6 overflow-y-auto pt-4">
                {newApps.slice(0, 6).map((app, i) => (
                  <div
                    key={i}
                    className="app-row flex cursor-pointer flex-col gap-2"
                    onClick={() => onAppClick?.(app.name, app.category)}
                    onMouseEnter={(e) => showTooltip(e, newDescriptions[i])}
                    onMouseLeave={hideTooltip}
                  >
                    {/* Icon + NEW badge */}
                    <div className="relative flex w-full items-center overflow-visible p-2">
                      <div className="app-icon aspect-square flex-1 rounded-2xl bg-[#e4e4e7]" />
                      <span className="new-badge-pulse absolute right-0 top-0 flex h-5 origin-top-right items-center justify-center rounded-lg bg-[#f5475c] px-1.5 text-[10px] font-semibold leading-[1.4] tracking-[-0.1px] text-white 2xl:scale-150">
                        NEW
                      </span>
                    </div>
                    {/* Info */}
                    <div className="flex flex-col gap-1 px-2">
                      <p className="truncate text-base font-semibold leading-[1.5] tracking-[-0.16px] text-black">
                        {app.name}
                      </p>
                      <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">
                        {app.category}
                      </p>
                    </div>
                  </div>
                ))}
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
    </>
  );
}

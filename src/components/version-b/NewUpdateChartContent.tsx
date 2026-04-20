"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface Props {
  onAppClick?: (name: string, category: string) => void;
}

const newApps = [
  { name: "AI 문서 요약", category: "생산성", recommends: 24 },
  { name: "스마트 출퇴근", category: "인사관리", recommends: 18 },
  { name: "데이터 시각화", category: "데이터분석", recommends: 15 },
  { name: "맞춤 교육 추천", category: "교육", recommends: 12 },
  { name: "업무 자동화 봇", category: "자동화", recommends: 9 },
  { name: "OKR 관리", category: "프로젝트관리", recommends: 7 },
];

const updatedApps = [
  { name: "경비 정산 자동화", category: "경영재무", recommends: 312 },
  { name: "스마트 캘린더", category: "협업도구", recommends: 287 },
  { name: "매출 대시보드", category: "데이터분석", recommends: 245 },
  { name: "사내 문서 검색", category: "생산성", recommends: 198 },
  { name: "프로젝트 트래커", category: "프로젝트관리", recommends: 176 },
  { name: "회의실 예약", category: "사내시설", recommends: 153 },
  { name: "전자 결재", category: "경영재무", recommends: 121 },
  { name: "팀 메신저", category: "커뮤니케이션", recommends: 118 },
  { name: "고객 CRM", category: "고객관리", recommends: 98 },
];

function AppCard({
  app,
  onAppClick,
}: {
  app: { name: string; category: string; recommends: number };
  onAppClick?: (name: string, category: string) => void;
}) {
  return (
    <div
      className="flex w-full cursor-pointer gap-3 p-2"
      onClick={() => onAppClick?.(app.name, app.category)}
    >
      {/* App icon placeholder */}
      <div className="h-[104px] w-[104px] shrink-0 rounded-xl bg-[#e4e4e7]" />
      {/* Info */}
      <div className="flex flex-1 flex-col gap-3">
        <div className="flex flex-col gap-1 py-0.5">
          <p className="truncate text-sm font-semibold text-black">{app.name}</p>
          <p className="text-xs font-normal text-gray-500">{app.category}</p>
          <div className="flex flex-row items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 12 12">
              <path
                d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z"
                fill="#FBB03B"
              />
            </svg>
            <span className="text-xs font-normal text-black">{app.recommends}</span>
          </div>
        </div>
        <button
          type="button"
          className="self-start rounded-xl bg-[#f6f6f6] px-3 py-1.5 text-xs font-semibold text-[#FBB03B]"
          onClick={(e) => {
            e.stopPropagation();
            onAppClick?.(app.name, app.category);
          }}
        >
          사용신청
        </button>
      </div>
    </div>
  );
}

export default function NewUpdateChartContent({ onAppClick }: Props = {}) {
  const [bannerSlide, setBannerSlide] = useState(0);
  const [bannerTransition, setBannerTransition] = useState(true);
  const bannerTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const bannerCount = 2;

  useEffect(() => {
    if (bannerSlide === bannerCount) {
      const timer = setTimeout(() => {
        setBannerTransition(false);
        setBannerSlide(0);
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

  return (
    <div className="flex h-full min-w-0 flex-1 items-start justify-center overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6">
      <div className="mx-auto flex w-full flex-col gap-8 min-[1281px]:max-w-[1280px]">
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between">
          <h1 className="font-bold text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
            신규/업데이트 차트
          </h1>
          <div
            className="flex h-10 w-[240px] items-center gap-1.5 overflow-hidden rounded-xl px-4 py-3"
            style={{ backgroundColor: "#f4f4f5" }}
          >
            <div className="relative size-5 shrink-0 overflow-hidden">
              <Image src="/icons/version-b/search.svg" alt="" fill sizes="20px" />
            </div>
            <p className="whitespace-nowrap text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-300">
              앱, 개발자 검색
            </p>
          </div>
        </div>

        {/* Banner 캐러셀 */}
        <div className="relative w-full shrink-0" style={{ height: 212 }}>
          <div
            className="relative w-full rounded-2xl"
            style={{ height: 212, willChange: "transform", overflowX: "clip", overflowY: "visible", paddingTop: 16, paddingBottom: 16 } as React.CSSProperties}
          >
            <div
              className={`flex h-full ${bannerTransition ? "transition-transform duration-500 ease-in-out" : ""}`}
              style={{ width: "300%", transform: `translateX(-${bannerSlide * (100 / 3)}%)` }}
            >
              {/* 배너 1 */}
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
              {/* 배너 2 */}
              <div className="relative flex h-full w-1/3 shrink-0 items-center gap-2.5 p-10">
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
          {/* Dot indicator */}
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

        {/* 새로 나온 앱 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold leading-[1.5] tracking-[-0.14px] text-[#FBB03B]">NEW</span>
            <h2 className="font-medium text-black" style={{ fontSize: "20px", lineHeight: "1.3" }}>
              새로 나온 앱
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 min-[1441px]:grid-cols-4">
            {newApps.map((app) => (
              <AppCard key={app.name} app={app} onAppClick={onAppClick} />
            ))}
          </div>
        </div>

        <hr className="border-0 border-t border-gray-200" />

        {/* 업데이트된 앱 */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold leading-[1.5] tracking-[-0.14px] text-[#FBB03B]">UPDATE</span>
            <h2 className="font-medium text-black" style={{ fontSize: "20px", lineHeight: "1.3" }}>
              업데이트된 앱
            </h2>
          </div>
          <div className="grid grid-cols-3 gap-x-8 gap-y-6 min-[1441px]:grid-cols-4">
            {updatedApps.map((app) => (
              <AppCard key={app.name} app={app} onAppClick={onAppClick} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

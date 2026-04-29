"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import TeamColumn from "./TeamColumn";

function FadeInSection({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.unobserve(el); } },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="transition-all duration-700 ease-out"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export default function HomePageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [appsExpanded, setAppsExpanded] = useState(false);
  const [homeView, setHomeView] = useState<"data" | "empty">("data");
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [guideModalStep, setGuideModalStep] = useState<"os-select" | "mac" | "windows" | "final">("os-select");
  const [guideModalClosing, setGuideModalClosing] = useState(false);
  const [selectedOS, setSelectedOS] = useState<"mac" | "windows">("mac");
  const openGuideModal = () => { setGuideModalStep("os-select"); setGuideModalOpen(true); };
  const closeGuideModal = () => {
    setGuideModalClosing(true);
    setTimeout(() => { setGuideModalOpen(false); setGuideModalClosing(false); setGuideModalStep("os-select"); }, 250);
  };

  const myApps = [
    "경비 정산", "스마트 캘린더", "매출 대시보드", "문서 검색", "프로젝트 트래커",
    "회의실 예약", "전자 결재", "고객 CRM", "워크플로우", "AI 요약",
    "팀 메신저", "데이터 시각화",
  ];

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#3F1C5C", "--page-primary": "#6D319D" } as React.CSSProperties}
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} bgColor="#2f1546" />

      {/* L. Global Nav */}
      <div className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between">
        <div className="flex w-full flex-col items-start">
          {!sidebarExpanded && (
            <div className="flex w-full flex-col items-center justify-center px-5 py-4">
              <div
                className="flex size-11 items-center justify-center overflow-hidden rounded-xl border border-white p-1"
                style={{ backgroundColor: "#6d319d", boxShadow: "0px 0px 0px 1px #6d319d" }}
              >
                <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
                  JO
                </p>
              </div>
            </div>
          )}

          <nav className={`flex w-full flex-col items-center gap-4 px-5 ${sidebarExpanded ? "py-4" : ""}`}>
            {/* 홈 (active) */}
            <Link
              href="/"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-home-active.svg" alt="홈" fill sizes="44px" />
              </div>
              <p className="text-center text-xs font-semibold leading-[1.3] tracking-[-0.12px]" style={{ color: "#ffffff" }}>
                홈
              </p>
            </Link>

            {/* 만들기 (inactive) */}
            <Link
              href="/make"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-make-inactive.svg" alt="만들기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                프로젝트
              </p>
            </Link>

            {/* 둘러보기 (inactive) */}
            <Link
              href="/browse"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-store.svg" alt="둘러보기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                스토어
              </p>
            </Link>

            {/* 관리하기 (inactive) */}
            <Link
              href="/admin"
              className="flex w-[44px] flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-admin.svg" alt="관리하기" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                설정
              </p>
            </Link>
          </nav>
        </div>

        {/* 하단: 검색/알림/프로필 */}
        <div className="flex w-full items-center justify-center px-3 py-4">
          <div className="flex flex-col items-center gap-2">
            <button
              type="button"
              onClick={() => setSidebarExpanded(!sidebarExpanded)}
              className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200"
              aria-label={sidebarExpanded ? "사이드바 접기" : "사이드바 펼치기"}
            >
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg p-1">
                {sidebarExpanded ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#18181B" fillOpacity="0.48" viewBox="0 0 256 256">
                    <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40Zm0,160H88V56H216V200Z" />
                  </svg>
                ) : (
                  <Image src="/icons/version-b/toggle-panel.svg" alt="" width={24} height={24} />
                )}
              </span>
            </button>

            <button
              type="button"
              className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200"
              aria-label="알림"
            >
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg p-1">
                <Image src="/icons/version-b/bell.svg" alt="" width={18} height={20} />
              </span>
            </button>

            <button
              type="button"
              className="relative size-11 overflow-hidden rounded-xl"
              aria-label="프로필"
            >
              <Image src="/icons/version-b/profile.png" alt="" fill sizes="44px" className="object-cover" />
            </button>
          </div>
        </div>
      </div>

      {/* M + R. Sidebar + Main area */}
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
              {/* 홈 (active) */}
              <button type="button" className="menu-active flex w-full items-center gap-2 rounded-lg px-3 py-2">
                <Image src="/icons/version-b/home-menu-home.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#6D319D]">홈</span>
              </button>

              {/* 섹션 헤더: 요청내역 */}
              <div className="flex w-full items-center px-3 pt-4 rounded-lg">
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px]" style={{ color: "#a1a1aa" }}>요청내역</span>
              </div>

              {/* 앱 신청 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/home-menu-app-request.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">앱 신청</span>
                <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white">2</span>
              </button>

              {/* 공유데이터 신청 */}
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/home-menu-data-request.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">공유데이터 신청</span>
              </button>
            </nav>
            <div className="flex-1" />
            <div className="p-5">
              <button type="button" onClick={openGuideModal} className="flex h-[37px] w-full items-center justify-center rounded-lg border border-[#d4d4d8] px-3 py-2 text-xs font-semibold text-[#52525b] transition-colors hover:bg-[#f0f0f0]">
                클로드코드 세팅하기
              </button>
            </div>
          </div>
        </div>

        {/* Right: Main content */}
        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-[#f6f6f6] bg-white px-6 pb-20 pt-10">
          {homeView === "empty" ? (
            /* 데이터 X 화면 */
            <div className="mx-auto flex w-full flex-col gap-[60px] min-[1281px]:max-w-[1280px]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
              {/* 상단 히어로 */}
              <div className="relative flex h-[500px] flex-col items-center justify-center gap-10">
                <Image src="/icons/version-b/home-bg-empty.png" alt="" width={948} height={584} className="pointer-events-none absolute left-0 -top-[120px] w-full object-cover" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <h1 className="text-center text-[32px] font-bold leading-[1.4] text-[#18181b]">
                    안녕하세요 박민영 님!
                    <br />
                    업무 자동화를 어떻게 시작할까요?
                  </h1>
                  <p className="text-center text-base font-normal text-[#18181b]">원하는 방법으로 빠르게 시작해 보세요</p>
                </div>
                <div className="relative z-10 flex gap-2">
                  <button type="button" className="flex h-12 w-[169px] items-center justify-center rounded-xl bg-[#6D319D] text-base font-semibold text-white transition-opacity hover:opacity-90">
                    내가 앱 만들기
                  </button>
                  <button type="button" className="flex h-12 items-center justify-center rounded-xl bg-white/50 px-6 text-base font-semibold text-[#18181b] transition-colors hover:bg-white/70">
                    동료가 만든 앱 쓰기
                  </button>
                </div>
              </div>

              {/* 빠른 메뉴 */}
              <div className="mb-5 flex flex-col gap-5">
                <span className="text-lg font-medium text-black">빠른 메뉴</span>
                <div className="flex gap-5">
                  <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgba(109,49,157,0.2)] p-5 transition-opacity hover:opacity-80">
                    <Image src="/icons/version-b/quick-menu-guide.svg" alt="" width={20} height={20} />
                    <span className="text-base font-semibold text-[#6D319D]">개발가이드 보기</span>
                  </button>
                  <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgba(231,101,190,0.2)] p-5 transition-opacity hover:opacity-80">
                    <Image src="/icons/version-b/quick-menu-create.svg" alt="" width={20} height={20} />
                    <span className="text-base font-semibold text-[#E765BE]">앱 만들기</span>
                  </button>
                  <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgba(251,176,59,0.2)] p-5 transition-opacity hover:opacity-80">
                    <Image src="/icons/version-b/quick-menu-manage.svg" alt="" width={20} height={20} />
                    <span className="text-base font-semibold text-[#FBB03B]">내가 만든 앱 관리하기</span>
                  </button>
                </div>
              </div>

              {/* 새로 나온 앱 / 동료들이 많이 찾는 앱 (빈 상태) */}
              <div className="flex gap-5">
                <div className="flex flex-1 flex-col gap-5">
                  <div className="flex items-end">
                    <span className="flex-1 text-lg font-medium text-black">새로 나온 앱</span>
                    <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#a1a1aa] hover:text-[#71717a]">
                      더보기
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 5L10 9L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                  <div className="flex h-[374px] flex-col items-center justify-center rounded-[20px] bg-[#f9f9f9] p-5">
                    <p className="text-center text-sm font-normal leading-[1.5] text-[#a1a1aa]">
                      여기서 동료들이 만든 앱을
                      <br />
                      보여드릴게요
                    </p>
                  </div>
                </div>
                <div className="flex flex-[2] flex-col gap-5">
                  <div className="flex items-end">
                    <span className="flex-1 text-lg font-medium text-black">지금 동료들이 많이 찾는 앱</span>
                    <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#a1a1aa] hover:text-[#71717a]">
                      더보기
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 5L10 9L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                  </div>
                  <div className="flex h-[374px] flex-col items-center justify-center rounded-[20px] bg-[#f9f9f9] p-5">
                    <p className="text-center text-sm font-normal leading-[1.5] text-[#a1a1aa]">
                      여기서 가장 인기있는 앱을
                      <br />
                      보여드릴게요
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
          <>
          <div className="mx-auto flex w-full flex-col gap-[60px] min-[1281px]:max-w-[1280px]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
          {/* Header */}
          <FadeInSection>
          <div className="flex items-end">
            <h1 className="flex-1 text-2xl font-bold text-[#18181b]">
              안녕하세요, 박민영 님
            </h1>
            <span className="text-xl font-medium text-[#18181b]">
              2026년 4월 16일 목요일
            </span>
          </div>

          </FadeInSection>

          {/* 박민영 님의 업무공간 */}
          <FadeInSection delay={100}>
          <div className="flex flex-col items-center gap-5">
            <span className="w-full text-lg font-medium text-black">박민영 님의 업무공간</span>
            <div
              className="w-full overflow-hidden rounded-[20px] p-2 transition-[max-height] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
              style={{ maxHeight: appsExpanded ? "1000px" : "145px" }}
            >
              <div className="grid grid-cols-7 gap-6">
                {myApps.map((name, i) => (
                  <div key={i} className="group/app flex cursor-pointer flex-col items-center gap-2 p-2">
                    <div className="size-[97px] rounded-xl bg-[#e4e4e7] transition-all duration-300 ease-out group-hover/app:scale-105 group-hover/app:shadow-lg" />
                    <span className="truncate text-sm font-normal text-[#18181b]">{name}</span>
                  </div>
                ))}
              </div>
            </div>
            {myApps.length > 7 && (
              <button
                type="button"
                onClick={() => setAppsExpanded(!appsExpanded)}
                className="flex h-8 w-[77px] items-center justify-center rounded-lg border border-[#e4e4e7] bg-white text-sm font-normal text-[#18181b] transition-colors hover:bg-gray-50"
              >
                {appsExpanded ? "접기" : "펼치기"}
              </button>
            )}
          </div>

          </FadeInSection>

          {/* 빠른 메뉴 */}
          <FadeInSection delay={200}>
          <div className="mb-5 flex flex-col gap-5">
            <span className="text-lg font-medium text-black">빠른 메뉴</span>
            <div className="flex gap-5">
              <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgba(109,49,157,0.2)] p-5 transition-opacity hover:opacity-80">
                <Image src="/icons/version-b/quick-menu-guide.svg" alt="" width={20} height={20} />
                <span className="text-base font-semibold text-[#6D319D]">개발가이드 보기</span>
              </button>
              <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgba(231,101,190,0.2)] p-5 transition-opacity hover:opacity-80">
                <Image src="/icons/version-b/quick-menu-create.svg" alt="" width={20} height={20} />
                <span className="text-base font-semibold text-[#E765BE]">앱 만들기</span>
              </button>
              <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgba(251,176,59,0.2)] p-5 transition-opacity hover:opacity-80">
                <Image src="/icons/version-b/quick-menu-manage.svg" alt="" width={20} height={20} />
                <span className="text-base font-semibold text-[#FBB03B]">내가 만든 앱 관리하기</span>
              </button>
            </div>
          </div>

          </FadeInSection>

          {/* 새로 나온 앱 / 지금 동료들이 많이 찾는 앱 */}
          <FadeInSection delay={300}>
          <div className="flex gap-5">
            {/* 새로 나온 앱 */}
            <div className="flex flex-1 flex-col gap-5">
              <div className="flex items-end">
                <span className="flex-1 text-lg font-medium text-black">새로 나온 앱</span>
                <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#a1a1aa] hover:text-[#71717a]">
                  더보기
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 5L10 9L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              <div className="flex h-[374px] flex-col rounded-[20px] bg-[#f9f9f9] p-5">
                <div className="group relative flex-1 min-h-0">
                  <div className="h-full overflow-y-auto pb-5 [scrollbar-width:none] group-hover:[scrollbar-width:thin] group-hover:[scrollbar-color:rgba(0,0,0,0.15)_transparent]">
                    {[
                      { name: "스마트 리포트", category: "데이터분석", stars: 0 },
                      { name: "AI 문서 작성기", category: "생산성", stars: 1 },
                      { name: "팀 피드백 허브", category: "협업도구", stars: 3 },
                      { name: "자동 번역 봇", category: "생산성", stars: 2 },
                      { name: "프로젝트 타임라인", category: "프로젝트관리", stars: 5 },
                      { name: "디자인 에셋 관리", category: "디자인", stars: 4 },
                      { name: "스마트 온보딩", category: "인사관리", stars: 1 },
                      { name: "API 테스트 도구", category: "개발도구", stars: 7 },
                      { name: "실시간 번역", category: "커뮤니케이션", stars: 2 },
                      { name: "보안 대시보드", category: "보안", stars: 6 },
                    ].map((app, i) => (
                      <div key={i} className="flex cursor-pointer items-start gap-3 py-3">
                        <div className="size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                        <div className="flex flex-col gap-1 py-0.5">
                          <span className="text-base font-semibold text-black">{app.name}</span>
                          <span className="text-sm font-normal text-[#71717a]">{app.category}</span>
                          <div className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FBB03B" /></svg>
                            <span className="text-xs font-normal text-black">{app.stars}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f9f9f9] to-transparent" />
                </div>
              </div>
            </div>

            {/* 지금 동료들이 많이 찾는 앱 */}
            <div className="flex flex-[2] flex-col gap-5">
              <div className="flex items-end">
                <span className="flex-1 text-lg font-medium text-black">지금 동료들이 많이 찾는 앱</span>
                <button type="button" className="flex items-center gap-1 text-sm font-semibold text-[#a1a1aa] hover:text-[#71717a]">
                  더보기
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M7 5L10 9L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
              </div>
              <div className="flex h-[374px] flex-col rounded-[20px] bg-[#f9f9f9] p-5">
                <div className="group relative flex-1 min-h-0">
                  <div className="h-full overflow-y-auto pb-5 [scrollbar-width:none] group-hover:[scrollbar-width:thin] group-hover:[scrollbar-color:rgba(0,0,0,0.15)_transparent]">
                    {[
                      { name: "경비 정산 자동화", category: "경영재무", stars: 0 },
                      { name: "스마트 캘린더", category: "협업도구", stars: 1 },
                      { name: "매출 대시보드", category: "데이터분석", stars: 3 },
                      { name: "사내 문서 검색", category: "생산성", stars: 2 },
                      { name: "프로젝트 트래커", category: "프로젝트관리", stars: 5 },
                      { name: "회의실 예약", category: "사내시설", stars: 4 },
                      { name: "전자 결재", category: "경영재무", stars: 1 },
                      { name: "고객 CRM", category: "고객관리", stars: 7 },
                      { name: "워크플로우 빌더", category: "자동화", stars: 2 },
                      { name: "AI 문서 요약", category: "생산성", stars: 6 },
                    ].map((app, i) => (
                      <div key={i} className="flex cursor-pointer items-start gap-3 py-3">
                        <div className="size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                        <div className="flex flex-col gap-1 py-0.5">
                          <span className="text-base font-semibold text-black">{app.name}</span>
                          <span className="text-sm font-normal text-[#71717a]">{app.category}</span>
                          <div className="flex items-center gap-1">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FBB03B" /></svg>
                            <span className="text-xs font-normal text-black">{app.stars}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#f9f9f9] to-transparent" />
                </div>
              </div>
            </div>
          </div>
          </FadeInSection>
          </div>
          </>
          )}
          {/* 초기 시작 가이드 모달 */}
          {guideModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-br-2xl rounded-tr-2xl bg-white/50 transition-opacity duration-250" style={{ opacity: guideModalClosing ? 0 : 1 }} onClick={closeGuideModal}>
              <div className="flex h-[724px] w-[546px] flex-col overflow-hidden rounded-2xl bg-white" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: guideModalClosing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out" }} onClick={(e) => e.stopPropagation()}>
                {guideModalStep === "os-select" ? (
                  /* 첫 번째 모달: OS 선택 */
                  <div key="os-select" className="flex h-full w-full flex-col items-center justify-center gap-10 p-10" style={{ animation: "slideRight 0.35s ease-out" }}>
                    <div className="relative flex flex-col items-center justify-center gap-5 py-10">
                      <Image src="/icons/version-b/home-bg-initial.png" alt="" width={466} height={287} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <h2 className="relative z-10 text-center text-2xl font-bold leading-[1.4] text-[#18181b]">
                        AXHub에 오신 걸 환영합니다
                        <br />
                        ClaudeCode 세팅부터 시작해 보세요
                      </h2>
                      <p className="relative z-10 text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]/70">
                        어떤 PC 환경을 사용 중이신가요?
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 px-10">
                      <button type="button" onClick={() => { setSelectedOS("mac"); setGuideModalStep("mac"); }} className="flex w-full items-center justify-center rounded-xl border border-[#e4e4e7] bg-white p-4 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f9f9f9]">
                        Mac OS
                      </button>
                      <button type="button" onClick={() => { setSelectedOS("windows"); setGuideModalStep("windows"); }} className="flex w-full items-center justify-center rounded-xl border border-[#e4e4e7] bg-white p-4 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f9f9f9]">
                        Windows OS
                      </button>
                    </div>
                  </div>
                ) : guideModalStep === "mac" ? (
                  /* Mac OS 가이드 (4단계) */
                  <div key="mac" className="flex h-full w-full flex-col justify-between p-10" style={{ animation: "slideLeft 0.35s ease-out" }}>
                    <div className="relative w-full">
                      <div className="absolute left-[13px] top-[14px] bottom-[14px] w-px bg-[#d4d4d8]" />
                      {/* Step 1: 터미널 열기 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">1</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">터미널 열기</h3>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                              <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Cmd</span>
                              <span>+</span>
                              <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Space</span>
                              <span>를 눌러 Spotlight를 열어주세요</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                              <span className="font-bold">Terminal</span>
                              <span>을 입력하고</span>
                              <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                              <span>를 눌러주세요</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Step 2: 플러그인 설치 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">2</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 플러그인 설치하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 터미널에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin marketplace add jocoding-ax-partners/axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin marketplace add jocoding-ax-partners/axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>한 번 더, 아래 코드를 복사 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin install jocoding-ax-partners@axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin install jocoding-ax-partners@axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Step 3: 클로드코드 열기 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">3</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 열기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span className="font-bold">Claude</span>
                            <span>를 입력하고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                        </div>
                      </div>
                      {/* Step 4: 초기화 */}
                      <div className="relative flex gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">4</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">AXHub 사용을 위해 초기화하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 클로드코드에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">/axhub-init</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("/axhub-init")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-end gap-2">
                      <button type="button" onClick={() => setGuideModalStep("os-select")} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={() => setGuideModalStep("final")} className="flex h-9 items-center justify-center rounded-lg bg-[#6D319D] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        다음
                      </button>
                    </div>
                  </div>
                ) : guideModalStep === "windows" ? (
                  /* Windows OS 가이드 (3단계) */
                  <div key="windows" className="flex h-full w-full flex-col items-end gap-8 p-10" style={{ animation: "slideLeft 0.35s ease-out" }}>
                    <div className="relative w-full">
                      <div className="absolute left-[13px] top-[14px] bottom-[14px] w-px bg-[#d4d4d8]" />
                      {/* Step 1: 플러그인 설치 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">1</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 플러그인 설치하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 터미널에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin marketplace add jocoding-ax-partners/axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin marketplace add jocoding-ax-partners/axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>한 번 더, 아래 코드를 복사 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin install jocoding-ax-partners@axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin install jocoding-ax-partners@axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Step 2: 클로드코드 열기 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">2</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 열기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span className="font-bold">Claude</span>
                            <span>를 입력하고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                        </div>
                      </div>
                      {/* Step 3: 초기화 */}
                      <div className="relative flex gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">3</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">AXHub 사용을 위해 초기화하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 클로드코드에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">/axhub-init</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("/axhub-init")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1" />
                    <div className="flex w-full items-center justify-end gap-2">
                      <button type="button" onClick={() => setGuideModalStep("os-select")} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={() => setGuideModalStep("final")} className="flex h-9 items-center justify-center rounded-lg bg-[#6D319D] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        다음
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 마지막 모달 */
                  <div key="final" className="flex h-full w-full flex-col items-end gap-8 p-10" style={{ animation: "slideLeft 0.35s ease-out" }}>
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5 w-full">
                      <Image src="/icons/version-b/home-bg-initial.png" alt="" width={466} height={287} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <h2 className="relative z-10 text-center text-2xl font-bold leading-[1.2] text-[#18181b]">
                        이제 ClaudeCode에서
                        <br />
                        바이브코딩으로 앱을 만들어 보세요
                      </h2>
                      <p className="relative z-10 text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]/70">
                        사내 구성원이 만든 모든 앱은 AXHub에서 사용할 수 있어요
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => setGuideModalStep(selectedOS)} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={closeGuideModal} className="flex h-9 items-center justify-center rounded-lg bg-[#6D319D] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        시작
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 임시 뷰 토글 버튼 */}
          <div className="fixed bottom-6 right-6 z-50 flex gap-2">
            {(["data", "empty"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => { setHomeView(v); if (v === "empty") openGuideModal(); }}
                className={`rounded-lg px-3 py-2 text-xs font-semibold shadow-lg transition-colors ${homeView === v ? "bg-[#6D319D] text-white" : "bg-white text-[#18181b] border border-[#e4e4e7] hover:bg-[#f6f6f6]"}`}
              >
                {v === "data" ? "데이터 O" : "데이터 X"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

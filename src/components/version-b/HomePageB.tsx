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
  const [homeView, setHomeView] = useState<"initial" | "data" | "empty">("data");
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [guideModalClosing, setGuideModalClosing] = useState(false);
  const closeGuideModal = () => {
    setGuideModalClosing(true);
    setTimeout(() => { setGuideModalOpen(false); setGuideModalClosing(false); }, 250);
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
          </div>
        </div>

        {/* Right: Main content */}
        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-[#f6f6f6] bg-white px-6 py-10">
          {homeView === "initial" ? (
            /* 초기 화면 */
            <div className="flex flex-1 flex-col items-center justify-center pb-[15%]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
              <div className="relative flex w-full flex-col items-center gap-10 py-[140px]">
                <Image src="/icons/version-b/home-bg-initial.png" alt="" width={948} height={584} className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 object-cover" />
                <div className="relative z-10 flex flex-col items-center gap-3">
                  <h1 className="text-center text-[32px] font-bold leading-[1.4] text-[#18181b]">
                    사내 자동화 앱으로
                    <br />
                    박민영 님의 업무공간을 채워보세요
                  </h1>
                  <p className="text-center text-base font-normal text-[#18181b]/70">
                    사내 모든 앱의 탐색부터 모니터링까지 AXHub에서
                  </p>
                </div>
                <button type="button" onClick={() => setGuideModalOpen(true)} className="relative z-10 rounded-xl bg-[#6D319D] px-20 py-3 text-base font-semibold text-white transition-opacity hover:opacity-90">
                  AXHub 시작하기
                </button>
                <div className="relative z-10 flex items-center gap-5">
                  <button type="button" className="group flex items-center text-sm font-semibold text-[#18181b]/70 transition-colors hover:text-[#18181b]">
                    앱 만들고 배포하기
                    <Image src="/icons/version-b/arrow-outward.svg" alt="" width={18} height={18} className="opacity-70 transition-opacity group-hover:opacity-100" />
                  </button>
                  <button type="button" className="group flex items-center text-sm font-semibold text-[#18181b]/70 transition-colors hover:text-[#18181b]">
                    내 직무를 위한 가이드
                    <Image src="/icons/version-b/arrow-outward.svg" alt="" width={18} height={18} className="opacity-70 transition-opacity group-hover:opacity-100" />
                  </button>
                </div>
              </div>
            </div>
          ) : homeView === "empty" ? (
            /* 데이터 X 화면 */
            <div className="flex flex-1 flex-col items-center justify-center pb-[10%]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
              <Image src="/icons/version-b/empty-folder.svg" alt="" width={100} height={97} />
              <p className="mt-5 text-base font-normal text-[#a1a1aa]">아직 등록된 앱이 없어요</p>
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
          <div className="flex flex-col gap-5">
            <span className="text-lg font-medium text-black">빠른 메뉴</span>
            <div className="flex gap-5">
              <button type="button" className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[rgba(109,49,157,0.2)] p-5 transition-opacity hover:opacity-80">
                <Image src="/icons/version-b/quick-menu-guide.svg" alt="" width={20} height={20} />
                <span className="text-base font-semibold text-[#6D319D]">시작가이드 보기</span>
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
            <div className="absolute inset-0 z-50 flex items-center justify-center rounded-br-2xl rounded-tr-2xl bg-white/50 transition-opacity duration-250" style={{ opacity: guideModalClosing ? 0 : 1 }} onClick={closeGuideModal}>
              <div className="flex w-[540px] max-h-[90%] overflow-y-auto flex-col gap-8 rounded-2xl bg-white p-5" style={{ boxShadow: "0 0 24px rgba(0,0,0,0.08)", backdropFilter: "blur(20px)", animation: guideModalClosing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out" }} onClick={(e) => e.stopPropagation()}>
                {/* Step 1 */}
                <div className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">1</span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-xl font-bold text-black leading-[1.3]">터미널 열기</h3>
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-1 text-base text-[#71717a]">
                        <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium text-[#18181b]">Cmd</span>
                        <span className="font-medium">+</span>
                        <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium text-[#18181b]">Space</span>
                        <span className="font-normal">를 눌러 Spotlight를 열어주세요</span>
                      </div>
                      <div className="flex items-center gap-1 text-base text-[#71717a]">
                        <span className="font-bold text-[#71717a]">Terminal</span>
                        <span className="font-normal">을 입력하고</span>
                        <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium text-[#18181b]">Enter</span>
                        <span className="font-normal">를 눌러주세요</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">2</span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-xl font-bold text-black leading-[1.3]">클로드코드 플러그인 설치하기</h3>
                    <div className="flex items-center gap-1 text-base text-[#71717a]">
                      <span className="font-normal">아래 코드를 복사 후, 터미널에 붙여넣고</span>
                      <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium text-[#18181b]">Enter</span>
                      <span className="font-normal">를 눌러주세요</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] p-3">
                      <span className="flex-1 text-sm font-normal text-[#71717a]">claude plugin marketplace add jocoding-ax-partners/axhub</span>
                      <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin marketplace add jocoding-ax-partners/axhub")}>
                        <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={24} height={24} />
                      </button>
                    </div>
                    <div className="flex items-center gap-1 text-base text-[#71717a]">
                      <span className="font-normal">한 번 더, 아래 코드를 복사 붙여넣고</span>
                      <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium text-[#18181b]">Enter</span>
                      <span className="font-normal">를 눌러주세요</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] p-3">
                      <span className="flex-1 text-sm font-normal text-[#71717a]">claude plugin install jocoding-ax-partners@axhub</span>
                      <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin install jocoding-ax-partners@axhub")}>
                        <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={24} height={24} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">3</span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-xl font-bold text-black leading-[1.3]">클로드코드 열기</h3>
                    <div className="flex items-center gap-1 text-base text-[#71717a]">
                      <span className="font-bold text-[#71717a]">Claude</span>
                      <span className="font-normal">를 입력하고</span>
                      <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium text-[#18181b]">Enter</span>
                      <span className="font-normal">를 눌러주세요</span>
                    </div>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex gap-3">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#6D319D]">4</span>
                  <div className="flex flex-1 flex-col gap-3">
                    <h3 className="text-xl font-bold text-black leading-[1.3]">AXHub 사용을 위해 초기화하기</h3>
                    <div className="flex items-center gap-1 text-base text-[#71717a]">
                      <span className="font-normal">아래 코드를 복사 후, 클로드코드에 붙여넣고</span>
                      <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium text-[#18181b]">Enter</span>
                      <span className="font-normal">를 눌러주세요</span>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] p-3">
                      <span className="flex-1 text-sm font-normal text-[#71717a]">/axhub-init</span>
                      <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("/axhub-init")}>
                        <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={24} height={24} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* 확인 버튼 */}
                <div className="flex justify-end">
                  <button type="button" onClick={closeGuideModal} className="rounded-lg bg-[#6D319D] px-8 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 임시 뷰 토글 버튼 */}
          <div className="fixed bottom-6 right-6 z-50 flex gap-2">
            {(["initial", "data", "empty"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => setHomeView(v)}
                className={`rounded-lg px-3 py-2 text-xs font-semibold shadow-lg transition-colors ${homeView === v ? "bg-[#6D319D] text-white" : "bg-white text-[#18181b] border border-[#e4e4e7] hover:bg-[#f6f6f6]"}`}
              >
                {v === "initial" ? "초기" : v === "data" ? "데이터 O" : "데이터 X"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

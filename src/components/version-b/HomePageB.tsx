"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import TeamColumn from "./TeamColumn";

export default function HomePageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [appsExpanded, setAppsExpanded] = useState(false);
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [guideModalStep, setGuideModalStep] = useState<"os-select" | "mac" | "windows" | "final">("os-select");
  const [guideModalClosing, setGuideModalClosing] = useState(false);
  const [selectedOS, setSelectedOS] = useState<"mac" | "windows">("mac");
  const [guideDirection, setGuideDirection] = useState<"forward" | "back">("forward");
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "홈", activeIcon: "/icons/version-b/nav-home-active-new.svg", inactiveIcon: "/icons/version-b/nav-home-inactive.svg" },
    { href: "/make", label: "프로젝트", activeIcon: "/icons/version-b/nav-project-active.svg", inactiveIcon: "/icons/version-b/nav-project-inactive.svg" },
    { href: "/browse", label: "스토어", activeIcon: "/icons/version-b/nav-store-active.svg", inactiveIcon: "/icons/version-b/nav-store-new.svg" },
    { href: "/admin", label: "설정", activeIcon: "/icons/version-b/nav-settings-active.svg", inactiveIcon: "/icons/version-b/nav-settings-new.svg" },
  ];
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [showTeamProfile, setShowTeamProfile] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);
  const openGuideModal = () => { setGuideModalStep("os-select"); setGuideModalOpen(true); };
  const closeGuideModal = () => {
    setGuideModalClosing(true);
    setTimeout(() => { setGuideModalOpen(false); setGuideModalClosing(false); setGuideModalStep("os-select"); }, 250);
  };

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#3F1C5C", "--page-primary": "#5B3D7A" } as React.CSSProperties}
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} bgColor="#2f1546" />

      {/* L. Global Nav */}
      <div className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between">
        <div className="flex w-full flex-col items-start">
          {/* 팀 아이콘 */}
          <div className="flex w-full flex-col items-center justify-center px-5 py-4">
            <div className="flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#6d319d] p-1">
              <p className="flex-1 text-center text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">JO</p>
            </div>
          </div>

          {/* 네비 메뉴 */}
          <nav className="flex w-full flex-col items-center gap-4 px-5">
            {navItems.map((item) => {
              const isActive = item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);
              return (
                <Link key={item.href} href={item.href} className="flex flex-col items-center gap-1">
                  <div className={`relative size-11 rounded-xl transition-colors ${isActive ? "" : "hover:bg-white/10"}`}>
                    <Image src={isActive ? item.activeIcon : item.inactiveIcon} alt={item.label} fill sizes="44px" />
                  </div>
                  <p className={`whitespace-nowrap text-center text-xs leading-[1.3] tracking-[-0.12px] ${isActive ? "font-semibold text-white" : "font-normal text-white/70"}`}>{item.label}</p>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* 하단: 검색(+설정팝오버)/알림/프로필 */}
        <div className="flex w-full flex-col items-center gap-2 py-4">
          {/* 검색 아이콘 + 설정 팝오버 */}
          <div className="relative">
            <button type="button" onClick={() => setSettingsOpen(!settingsOpen)} className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10" aria-label="설정">
              <Image src="/icons/version-b/nav-search.svg" alt="" width={24} height={24} />
            </button>
            {settingsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setSettingsOpen(false)} />
                <div className="absolute bottom-0 left-[calc(100%+8px)] z-50 w-[220px] rounded-xl bg-white p-5 shadow-lg" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col gap-5">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-normal text-[#3f3f46]">다크모드</span>
                      <button type="button" onClick={() => setDarkMode(!darkMode)} className={`relative h-6 w-10 rounded-full transition-colors ${darkMode ? "bg-[#5B3D7A]" : "bg-[#d4d4d8]"}`}>
                        <span className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-all ${darkMode ? "left-[19px]" : "left-[3px]"}`} />
                      </button>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-base font-normal text-[#3f3f46]">팀 프로필 표시</span>
                      <button type="button" onClick={() => setShowTeamProfile(!showTeamProfile)} className={`relative h-6 w-10 rounded-full transition-colors ${showTeamProfile ? "bg-[#5B3D7A]" : "bg-[#d4d4d8]"}`}>
                        <span className={`absolute top-[3px] h-[18px] w-[18px] rounded-full bg-white transition-all ${showTeamProfile ? "left-[19px]" : "left-[3px]"}`} />
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          <button type="button" className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10" aria-label="알림">
            <Image src="/icons/version-b/nav-bell.svg" alt="" width={44} height={44} />
          </button>

          <div className="relative">
            <button type="button" onClick={() => setProfileOpen(!profileOpen)} className="relative size-11 overflow-hidden rounded-xl transition-opacity hover:opacity-80" aria-label="프로필">
              <Image src="/icons/version-b/profile-new.png" alt="" fill sizes="44px" className="rounded-xl object-cover" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div className="absolute bottom-0 left-[calc(100%+8px)] z-50 w-[220px] rounded-2xl bg-white p-3 shadow-lg" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)" }}>
                  <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 rounded-2xl px-3 py-2">
                      <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">박민영</p>
                      <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">minion@jocodingax.ai</p>
                    </div>
                    <div className="h-px w-full bg-[#e4e4e7]" />
                    <div className="flex flex-col">
                      <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]">내 정보</button>
                      <button type="button" className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]">로그아웃</button>
                    </div>
                  </div>
                </div>
              </>
            )}
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
                <span className="whitespace-nowrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">홈</span>
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
        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden rounded-br-2xl rounded-tr-2xl border-r border-[#f6f6f6] bg-white">
          {/* 새 홈 디자인: 단일 스크롤 영역 */}
          <div className="mx-auto flex w-full flex-col gap-[80px] p-10 min-[1441px]:max-w-[1280px]">

            {/* 1. 헤더 섹션 */}
            <div className="flex flex-col gap-10">
              {/* 날짜 */}
              <p className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">2026년 4월 16일 목요일</p>

              {/* 인사말 */}
              <div>
                <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">안녕하세요,</p>
                <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">박민영 님</p>
              </div>

              {/* 설명 + 버튼 행 */}
              <div className="flex items-center gap-10">
                <div className="flex flex-1 flex-col">
                  <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#71717a]">
                    오늘 스토어에 새로운 앱 2개가 올라왔어요
                  </p>
                  <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#71717a]">
                    민영님이 사용 중인 앱 중에 업데이트된 앱이 1개 있어요
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    className="rounded-full border border-[#e4e4e7] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                  >
                    개발 가이드
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full bg-[#5B3D7A] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
                  >
                    앱 만들기
                  </button>
                </div>
              </div>
            </div>

            {/* 2. 통계 행: 4개 컬럼 */}
            <div className="flex border-y border-[#e4e4e7]">
              {[
                { label: "사용 중인 앱", value: "12" },
                { label: "내가 만든 앱", value: "3" },
                { label: "최근 업데이트", value: "5" },
                { label: "팀 멤버", value: "8" },
              ].map((stat, i) => (
                <div key={stat.label} className="flex flex-1 items-start">
                  {i > 0 && <div className="w-px self-stretch bg-[#e4e4e7]" />}
                  <div className="flex flex-1 flex-col gap-2 p-7">
                    <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{stat.label}</p>
                    <p className="text-[32px] font-semibold leading-[1.2] text-[#3f3f46]">{stat.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* 3. 워크스페이스 섹션 */}
            <div className="flex flex-col gap-5">
              {/* 섹션 헤더 */}
              <div className="flex flex-col gap-1">
                <p className="text-sm font-normal text-[#5B3D7A]">WORKSPACE</p>
                <p className="text-2xl font-semibold text-black">민영님의 업무공간</p>
              </div>

              {/* 앱 그리드 */}
              {(() => {
                const gradients = [
                  "linear-gradient(135deg, #9B7AB8, #5B3D7A)",
                  "linear-gradient(135deg, #DBA869, #B88539)",
                  "linear-gradient(135deg, #D68FBB, #B86397)",
                  "linear-gradient(135deg, #7AA3D4, #4A78B8)",
                ];
                const allApps = [
                  "경비 정산", "스마트 캘린더", "매출 대시보드", "문서 검색", "프로젝트 트래커", "회의실 예약", "전자 결재",
                  "고객 CRM", "워크플로우", "AI 요약", "팀 메신저", "데이터 시각화", "재고 관리", "출장 예약", "HR 봇", "전자 서명", "피드백 허브",
                ].map((name, i) => ({ name, gradient: gradients[i % gradients.length] }));
                const rows: typeof allApps[] = [];
                for (let i = 0; i < allApps.length; i += 7) rows.push(allApps.slice(i, i + 7));
                // 1줄 높이: 96px(아이콘) + 8px(gap) + 21px(텍스트) + 16px(패딩) ≈ 141px
                return (
                  <div className="overflow-hidden transition-[max-height] duration-500 ease-in-out" style={{ maxHeight: appsExpanded ? `${rows.length * 165}px` : "141px" }}>
                    <div className="flex flex-col gap-6">
                      {rows.map((row, ri) => (
                        <div key={ri} className="flex gap-6">
                          {row.map((app, i) => (
                            <div key={i} className="group flex flex-1 cursor-pointer flex-col items-center gap-2 p-2">
                              <div className="size-[96px] rounded-[12px] transition-transform duration-200 ease-out group-hover:scale-110" style={{ background: app.gradient }} />
                              <p className="text-center text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a] transition-colors duration-200 group-hover:text-[#18181b]">{app.name}</p>
                            </div>
                          ))}
                          {row.length < 7 && Array.from({ length: 7 - row.length }).map((_, j) => (
                            <div key={`empty-${j}`} className="flex-1 p-2" />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })()}

              {/* 펼치기/접기 버튼 */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={() => setAppsExpanded(!appsExpanded)}
                  className="h-8 rounded-full border border-[#e4e4e7] px-5 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                >
                  {appsExpanded ? "접기" : "펼치기"}
                </button>
              </div>
            </div>

            {/* 4. 하단 섹션: NEW + TRENDING 나란히 */}
            <div className="flex gap-[60px]">
              {/* NEW 섹션 (40%) */}
              <div className="flex w-[40%] shrink-0 flex-col gap-6">
                {/* 헤더 */}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-normal text-[#5B3D7A]">NEW</p>
                  <p className="text-2xl font-semibold text-black">새로 나온 앱</p>
                </div>

                {/* 앱 목록 5개 */}
                <div>
                  {[
                    { name: "HR 봇", category: "인사관리" },
                    { name: "리포트 자동화", category: "데이터분석" },
                    { name: "재고 관리", category: "물류관리" },
                    { name: "출장 예약", category: "경영재무" },
                    { name: "피드백 허브", category: "협업도구" },
                  ].map((app, i) => (
                    <div key={i} className="flex cursor-pointer items-center gap-4 border-t border-[#f6f6f6] py-4">
                      <div className="size-[52px] shrink-0 rounded-lg bg-[#e4e4e7]" />
                      <div className="flex flex-1 flex-col gap-1">
                        <p className="text-base font-semibold tracking-[-0.16px] text-black">{app.name}</p>
                        <p className="text-sm font-normal tracking-[-0.14px] text-[#71717a]">{app.category}</p>
                      </div>
                      <Image src="/icons/version-b/arrow-right-sm.svg" alt="" width={14} height={14} className="shrink-0" />
                    </div>
                  ))}
                </div>
              </div>

              {/* TRENDING 섹션 (60%) */}
              <div className="flex w-[60%] flex-col gap-6">
                {/* 헤더 */}
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-normal text-[#5B3D7A]">TRENDING</p>
                  <p className="text-2xl font-semibold text-black">지금 동료들이 많이 찾는 앱</p>
                </div>

                {/* 랭킹 목록 5개 */}
                <div>
                  {[
                    { name: "경비 정산 자동화", category: "경영재무", users: "120" },
                    { name: "스마트 캘린더", category: "협업도구", users: "115" },
                    { name: "매출 대시보드", category: "데이터분석", users: "110" },
                    { name: "프로젝트 트래커", category: "프로젝트관리", users: "90" },
                    { name: "AI 문서 요약", category: "AI도구", users: "88" },
                  ].map((app, i) => (
                    <div key={i} className="flex cursor-pointer items-center gap-5 border-t border-[#f6f6f6] py-4">
                      <p
                        className="w-10 text-[28px] font-bold"
                        style={{ color: i < 3 ? "#18181b" : "#a1a1aa" }}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </p>
                      <div className="flex flex-1 items-center gap-4">
                        <div className="size-[52px] shrink-0 rounded-lg bg-[#e4e4e7]" />
                        <div className="flex w-[168px] flex-col gap-1">
                          <p className="text-base font-semibold text-black">{app.name}</p>
                          <p className="text-sm font-normal text-[#71717a]">{app.category}</p>
                        </div>
                      </div>
                      <div className="flex w-[60px] items-center gap-1">
                        <Image src="/icons/version-b/thumb-up.svg" alt="" width={16} height={16} className="shrink-0" />
                        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{app.users}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* 초기 시작 가이드 모달 */}
          {guideModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden rounded-br-2xl rounded-tr-2xl bg-white/50 transition-opacity duration-250" style={{ opacity: guideModalClosing ? 0 : 1 }} onClick={closeGuideModal}>
              <div className="flex h-[724px] w-[546px] flex-col overflow-hidden rounded-2xl bg-white" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: guideModalClosing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out" }} onClick={(e) => e.stopPropagation()}>
                {guideModalStep === "os-select" ? (
                  /* 첫 번째 모달: OS 선택 */
                  <div key="os-select" className="flex h-full w-full flex-col items-center justify-center gap-10 p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideRight"} 0.35s ease-out` }}>
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
                      <button type="button" onClick={() => { setSelectedOS("mac"); setGuideDirection("forward"); setGuideModalStep("mac"); }} className="flex w-full items-center justify-center rounded-xl border border-[#e4e4e7] bg-white p-4 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f9f9f9]">
                        Mac OS
                      </button>
                      <button type="button" onClick={() => { setSelectedOS("windows"); setGuideDirection("forward"); setGuideModalStep("windows"); }} className="flex w-full items-center justify-center rounded-xl border border-[#e4e4e7] bg-white p-4 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f9f9f9]">
                        Windows OS
                      </button>
                    </div>
                  </div>
                ) : guideModalStep === "mac" ? (
                  /* Mac OS 가이드 (4단계) */
                  <div key="mac" className="flex h-full w-full flex-col justify-between p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideLeft"} 0.35s ease-out` }}>
                    <div className="relative w-full">
                      <div className="absolute left-[13px] top-[14px] bottom-[14px] w-px bg-[#d4d4d8]" />
                      {/* Step 1: 터미널 열기 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#5B3D7A]">1</span>
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
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#5B3D7A]">2</span>
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
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#5B3D7A]">3</span>
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
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#5B3D7A]">4</span>
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
                      <button type="button" onClick={() => { setGuideDirection("back"); setGuideModalStep("os-select"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={() => { setGuideDirection("forward"); setGuideModalStep("final"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#5B3D7A] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        다음
                      </button>
                    </div>
                  </div>
                ) : guideModalStep === "windows" ? (
                  /* Windows OS 가이드 (3단계) */
                  <div key="windows" className="flex h-full w-full flex-col items-end gap-8 p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideLeft"} 0.35s ease-out` }}>
                    <div className="relative w-full">
                      <div className="absolute left-[13px] top-[14px] bottom-[14px] w-px bg-[#d4d4d8]" />
                      {/* Step 1: 플러그인 설치 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#5B3D7A]">1</span>
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
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#5B3D7A]">2</span>
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
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#5B3D7A]">3</span>
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
                      <button type="button" onClick={() => { setGuideDirection("back"); setGuideModalStep("os-select"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={() => { setGuideDirection("forward"); setGuideModalStep("final"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#5B3D7A] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        다음
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 마지막 모달 */
                  <div key="final" className="flex h-full w-full flex-col items-end gap-8 p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideLeft"} 0.35s ease-out` }}>
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
                      <button type="button" onClick={() => { setGuideDirection("back"); setGuideModalStep(selectedOS); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={closeGuideModal} className="flex h-9 items-center justify-center rounded-lg bg-[#5B3D7A] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        시작
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

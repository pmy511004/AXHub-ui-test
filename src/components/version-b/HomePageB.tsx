"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import PageSidebar from "./PageSidebar";
import NotificationButton from "./NotificationButton";
import { useDarkMode } from "@/hooks/useDarkMode";

export default function HomePageB() {
  const [appsExpanded, setAppsExpanded] = useState(false);
  const [viewVersion, setViewVersion] = useState<"first-time" | "in-use">("first-time");
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [guideModalStep, setGuideModalStep] = useState<"os-select" | "mac" | "windows" | "final">("os-select");
  const [guideModalClosing, setGuideModalClosing] = useState(false);
  const [selectedOS, setSelectedOS] = useState<"mac" | "windows">("mac");
  const [guideDirection, setGuideDirection] = useState<"forward" | "back">("forward");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode] = useDarkMode();
  const [makeAppModalOpen, setMakeAppModalOpen] = useState(false);
  const [makeAppModalClosing, setMakeAppModalClosing] = useState(false);
  const [makeAppName, setMakeAppName] = useState("");
  const [makeAppCategory, setMakeAppCategory] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryOptions = ["인사관리", "데이터분석", "물류관리", "경영재무", "협업도구", "프로젝트관리", "AI도구"];
  const closeMakeAppModal = () => {
    setMakeAppModalClosing(true);
    setTimeout(() => {
      setMakeAppModalOpen(false);
      setMakeAppModalClosing(false);
      setCategoryDropdownOpen(false);
    }, 250);
  };
  const isMakeAppValid = makeAppName.trim() !== "" && makeAppCategory !== "";

  useEffect(() => {
    if (viewVersion === "first-time") {
      setGuideModalStep("os-select");
      setGuideModalOpen(true);
    } else {
      setGuideModalOpen(false);
    }
  }, [viewVersion]);
  const closeGuideModal = () => {
    setGuideModalClosing(true);
    setTimeout(() => { setGuideModalOpen(false); setGuideModalClosing(false); setGuideModalStep("os-select"); }, 250);
  };

  return (
    <div
      className={`flex h-screen w-full items-start overflow-hidden${darkMode ? " dark-mode" : ""}`}
      style={{
        backgroundColor: darkMode ? "#0C0A12" : "#130321",
        "--page-primary": darkMode ? "#6E4A94" : "#5B3D7A",
      } as React.CSSProperties}
    >
      {/* L. Sidebar */}
      <PageSidebar activeMenu="홈" />

      {/* R. Header + Main */}
      <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-white">
        {/* Header (60px) */}
        <div
          className="flex h-[60px] shrink-0 items-center justify-between border-b border-[rgba(82,82,91,0.08)] bg-white px-5"
          data-node-id="4940:6702"
        >
          <div className="flex items-center" data-node-id="4940:6703">
            <span
              className="px-1 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]"
              data-node-id="4940:6705"
            >
              홈
            </span>
          </div>
          <div className="flex h-full items-center gap-3">
            <button
              type="button"
              aria-label="검색"
              className="flex size-8 items-center justify-center rounded-full transition-colors hover:bg-[#f4f4f5]"
            >
              <Image
                src="/icons/version-b/header-search.svg"
                alt=""
                width={32}
                height={32}
              />
            </button>
            <NotificationButton variant="header" />
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex size-8 items-center justify-center rounded-full bg-[#5B3D7A] p-2 transition-opacity hover:opacity-80"
                aria-label="프로필"
                data-node-id="4940:6970"
              >
                <span className="text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">
                  민영
                </span>
              </button>
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div
                    className="absolute right-0 top-[calc(100%+8px)] z-50 w-[220px] rounded-2xl bg-white p-3"
                    style={{
                      boxShadow:
                        "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1 rounded-2xl px-3 py-2">
                        <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">
                          박민영
                        </p>
                        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                          minion@jocodingax.ai
                        </p>
                      </div>
                      <div className="h-px w-full bg-[#e4e4e7]" />
                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]"
                        >
                          내 정보
                        </button>
                        <button
                          type="button"
                          className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]"
                        >
                          로그아웃
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main scrollable */}
        <div className="relative flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white">
          {viewVersion === "first-time" ? (
            /* 최초접속 버전 */
            <div className="relative flex min-h-full w-full flex-1 items-center justify-center overflow-hidden px-10 py-10">
              {/* 배경 이미지 (하단 중앙) */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[997px] max-w-none -translate-x-1/2">
                <Image
                  src="/icons/version-b/home-bg-firsttime.png"
                  alt=""
                  fill
                  sizes="997px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* 컨텐츠 */}
              <div className="relative z-10 flex w-full flex-col items-center justify-center gap-10">
                <div className="flex w-full flex-col items-center gap-3">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">안녕하세요 박민영 님</p>
                    <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">업무 자동화를 어떻게 시작할까요?</p>
                  </div>
                  <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[rgba(24,24,27,0.48)]">
                    원하는 방법으로 빠르게 시작해 보세요
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full bg-[#5B3D7A] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
                  >
                    내가 앱 만들기
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full border border-[#e4e4e7] bg-white px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                  >
                    동료가 만든 앱 쓰기
                  </button>
                </div>
              </div>
            </div>
          ) : (
          /* 사용 중 버전: 단일 스크롤 영역 */
          <div className="mx-auto flex w-full flex-col gap-[80px] px-10 py-10 pb-[240px] min-[1441px]:max-w-[1280px]">

            {/* 1. 헤더 섹션 */}
            <div className="flex flex-col gap-10">
              {/* 날짜 */}
              <p className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">2026년 4월 16일 목요일</p>

              {/* 인사말 + 버튼 행 */}
              <div className="flex items-end gap-10">
                <div className="flex-1">
                  <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">안녕하세요,</p>
                  <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">박민영 님</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full bg-[#18181b] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
                  >
                    개발 가이드
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full border border-[#e4e4e7] bg-white px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                  >
                    의견 보내기
                  </button>
                </div>
              </div>
            </div>

            {/* 2. 내 업무공간 섹션 */}
            <div className="flex flex-col gap-5">
              {/* 섹션 헤더 */}
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold leading-[1.2] text-black">내 업무공간</p>
                <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">사용 중인 앱을 모았어요</p>
              </div>

              {/* 앱 그리드 */}
              {(() => {
                const gradients = [
                  "linear-gradient(135deg, #9B7AB8, #5B3D7A)",
                  "linear-gradient(135deg, #DBA869, #5B3D7A)",
                  "linear-gradient(135deg, #D68FBB, #5B3D7A)",
                  "linear-gradient(135deg, #7AA3D4, #5B3D7A)",
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

            {/* 4. 내가 개발한 앱 섹션 */}
            <div className="flex flex-col gap-5">
              {/* 섹션 헤더 + 앱 만들기 버튼 */}
              <div className="flex items-center gap-5">
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-2xl font-semibold leading-[1.2] text-black">내가 개발한 앱</p>
                  <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">관리자 권한을 갖고 있는 앱이에요</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMakeAppModalOpen(true)}
                  className="flex h-9 shrink-0 items-center justify-center rounded-full bg-[#18181b] px-5 py-3 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                >
                  앱 만들기
                </button>
              </div>

              {/* 앱 목록 */}
              <div className="flex flex-col gap-2">
                {[
                  { name: "경비 정산 자동화", category: "경영재무", status: "운영중", gradient: "linear-gradient(135deg, #9B7AB8, #5B3D7A)" },
                  { name: "스마트 캘린더", category: "협업도구", status: "개발중", gradient: "linear-gradient(135deg, #DBA869, #5B3D7A)" },
                ].map((app, i) => {
                  const isLive = app.status === "운영중";
                  return (
                    <div key={i} className="flex cursor-pointer items-center gap-3 rounded-2xl p-3 transition-colors hover:bg-[#f9f9f9]">
                      <div
                        className="size-12 shrink-0 rounded-[12px]"
                        style={{ background: app.gradient }}
                      />
                      <div className="flex flex-1 items-center gap-2">
                        <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-black">{app.name}</p>
                        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">{app.category}</p>
                      </div>
                      <span
                        className="flex shrink-0 items-center justify-center rounded-full px-3 py-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px]"
                        style={{
                          backgroundColor: isLive ? "#e9faf1" : "#fffbe1",
                          color: isLive ? "#1fa24e" : "#f6c205",
                        }}
                      >
                        {app.status}
                      </span>
                      <Image
                        src="/icons/version-b/arrow-right-sm.svg"
                        alt=""
                        width={16}
                        height={16}
                        className="shrink-0"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          )}

          {/* 버전 토글 (우측 하단 플로팅) */}
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-[#e4e4e7] bg-white p-1" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px 14px 28px rgba(0,0,0,0.04)" }}>
            <button
              type="button"
              onClick={() => setViewVersion("first-time")}
              className={`flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] transition-colors ${viewVersion === "first-time" ? "bg-[#5B3D7A] text-white" : "text-[#71717a] hover:text-[#18181b]"}`}
            >
              최초접속
            </button>
            <button
              type="button"
              onClick={() => setViewVersion("in-use")}
              className={`flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] transition-colors ${viewVersion === "in-use" ? "bg-[#5B3D7A] text-white" : "text-[#71717a] hover:text-[#18181b]"}`}
            >
              사용 중
            </button>
          </div>

          {/* 앱 만들기 모달 */}
          {makeAppModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-250"
              style={{ opacity: makeAppModalClosing ? 0 : 1 }}
              onClick={closeMakeAppModal}
            >
              <div
                className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                  backdropFilter: "blur(20px)",
                  animation: makeAppModalClosing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 제목 */}
                <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">앱 만들기</p>

                {/* 앱 이름 */}
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor="make-app-name" className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                    앱 이름
                  </label>
                  <input
                    id="make-app-name"
                    type="text"
                    value={makeAppName}
                    onChange={(e) => setMakeAppName(e.target.value)}
                    placeholder="이름 입력"
                    className="min-h-12 w-full rounded-full border border-[#e4e4e7] bg-white px-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#5B3D7A] focus:outline-none"
                  />
                </div>

                {/* 카테고리 */}
                <div className="relative flex w-full flex-col gap-2">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">카테고리</p>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen((v) => !v)}
                    className="flex min-h-12 w-full items-center justify-between rounded-full border border-[#e4e4e7] bg-white pl-4 pr-4 text-left transition-colors hover:border-[#d4d4d8] focus:border-[#5B3D7A] focus:outline-none"
                  >
                    <span
                      className={`text-base font-normal leading-[1.5] tracking-[-0.16px] ${
                        makeAppCategory ? "text-[#18181b]" : "text-[#a1a1aa]"
                      }`}
                    >
                      {makeAppCategory || "카테고리 선택"}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`shrink-0 transition-transform duration-200 ${categoryDropdownOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {categoryDropdownOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 max-h-[200px] overflow-y-auto rounded-2xl border border-[#e4e4e7] bg-white p-2 shadow-lg">
                      {categoryOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setMakeAppCategory(option);
                            setCategoryDropdownOpen(false);
                          }}
                          className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] transition-colors hover:bg-[#f4f4f5] ${
                            makeAppCategory === option ? "text-[#5B3D7A]" : "text-[#18181b]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 액션 버튼 */}
                <div className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={closeMakeAppModal}
                    className="flex h-9 items-center justify-center rounded-full bg-[#f6f6f6] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    disabled={!isMakeAppValid}
                    onClick={() => { if (isMakeAppValid) closeMakeAppModal(); }}
                    className="relative flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                  >
                    만들기
                    {!isMakeAppValid && <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 초기 시작 가이드 모달 */}
          {guideModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-white/50 transition-opacity duration-250" style={{ opacity: guideModalClosing ? 0 : 1 }} onClick={closeGuideModal}>
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

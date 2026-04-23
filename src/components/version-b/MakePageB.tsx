"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import TeamColumn from "./TeamColumn";

// 피그마 versionB (node 2471:1262) — /make 페이지 Version B 전체 레이아웃
//
// 레이어 루트
//   L. Global Nav (2471:1278, w-76)
//   M. Middle column (2474:1570)
//      └ toggle icon (2474:1880) + Aside SNB (2474:1552, w-168)
//   R. Main area (2484:1893)
//      └ Header (2484:1894, h-76) + Content card (2484:1908)
export default function MakePageB() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const view = searchParams.get("view");
  const isArchive = view === "archive";
  const isCreate = view === "create";
  const [sidebarExpanded, setSidebarExpanded] = useState(false);
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("최근 생성순");
  const [isEmpty, setIsEmpty] = useState(false);
  const [useMethod, setUseMethod] = useState<"direct" | "approval" | null>(null);
  const [createStep, setCreateStep] = useState(1);
  const [appName, setAppName] = useState("");
  const [deployMethod, setDeployMethod] = useState<"docker" | "compose" | null>(null);
  const [podSize, setPodSize] = useState<"small" | "medium" | "large" | "xlarge" | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const step1Valid = appName.trim() !== "" && selectedCategory !== "" && useMethod !== null;
  const [accessId, setAccessId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const step2Valid = deployMethod !== null && podSize !== null && accessId.trim() !== "" && selectedDomain !== "";

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#3F1C5C", "--page-primary": "#E765BE" } as React.CSSProperties}
      data-node-id="2471:1262"
    >
      {/* Team Column */}
      <TeamColumn expanded={sidebarExpanded} bgColor="#2f1546" />

      {/* L. Global Nav ─ 2471:1278 */}
      <div
        className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between"
        data-node-id="2471:1278"
      >
        {/* 상단: 팀 아이콘 + 네비 */}
        <div className="flex w-full flex-col items-start" data-node-id="2471:1531">
          {/* Team icon "JO" ─ collapsed only */}
          {!sidebarExpanded && (<div
            className="flex w-full flex-col items-center justify-center px-5 py-4"
            data-node-id="2471:1521"
          >
            <div
              className="flex size-11 items-center justify-center overflow-hidden rounded-xl border border-white bg-[#E765BE] p-1 shadow-[0px_0px_0px_1px_#6d319d]"
              data-node-id="2471:1522"
            >
              <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
                JO
              </p>
            </div>
          </div>
          )}

          {/* Nav items ─ 2471:1279 */}
          <nav
            className={`flex w-full flex-col items-center gap-4 px-5 ${sidebarExpanded ? "py-4" : ""}`}
            data-node-id="2471:1279"
          >
            {/* 홈 (inactive) */}
            <Link
              href="/"
              className="flex flex-col items-center gap-1"
            >
              <div className="relative size-11">
                <Image src="/icons/version-b/nav-home.svg" alt="홈" fill sizes="44px" />
              </div>
              <p className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: "rgba(255,255,255,0.7)" }}>
                홈
              </p>
            </Link>

            {/* 만들기 (active) ─ 2471:1515 */}
            <Link
              href="/make"
              className="flex w-[44px] flex-col items-center gap-1"
              data-node-id="2471:1515"
            >
              <div className="relative size-11" data-node-id="2471:1519">
                <Image
                  src="/icons/version-b/nav-make.svg"
                  alt="만들기"
                  fill
                  sizes="44px"
                />
              </div>
              <p className="text-center text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">
                프로젝트
              </p>
            </Link>

            {/* 둘러보기 ─ 2471:1533 */}
            <Link
              href="/browse"
              className="flex flex-col items-center gap-1"
              data-node-id="2471:1533"
            >
              <div className="relative size-11" data-node-id="2471:1537">
                <Image
                  src="/icons/version-b/nav-store.svg"
                  alt="둘러보기"
                  fill
                  sizes="44px"
                />
              </div>
              <p
                className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                스토어
              </p>
            </Link>

            {/* 관리하기 ─ 2471:1539 */}
            <Link
              href="/admin"
              className="flex w-[44px] flex-col items-center gap-1"
              data-node-id="2471:1539"
            >
              <div className="relative size-11" data-node-id="2471:1543">
                <Image
                  src="/icons/version-b/nav-admin.svg"
                  alt="관리하기"
                  fill
                  sizes="44px"
                />
              </div>
              <p
                className="whitespace-nowrap text-center text-xs font-normal leading-[1.3] tracking-[-0.12px]"
                style={{ color: "rgba(255,255,255,0.7)" }}
              >
                설정
              </p>
            </Link>
          </nav>
        </div>

        {/* 하단: 검색/알림/프로필 카드 ─ 2471:1532 */}
        <div
          className="flex w-full items-center justify-center px-3 py-4"
          data-node-id="2471:1532"
        >
          <div
            className="flex flex-col items-center gap-2"
            data-node-id="2471:1283"
          >
            {/* 사이드바 토글 */}
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

            {/* 알림 ─ 2471:1545 */}
            <button
              type="button"
              className="relative size-11 rounded-xl bg-gray-100 hover:bg-gray-200"
              aria-label="알림"
              data-node-id="2471:1545"
            >
              <span className="absolute left-1/2 top-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center overflow-hidden rounded-lg p-1">
                <Image
                  src="/icons/version-b/bell.svg"
                  alt=""
                  width={18}
                  height={20}
                />
              </span>
            </button>

            {/* 프로필 ─ 2471:1286 */}
            <button
              type="button"
              className="relative size-11 overflow-hidden rounded-xl"
              aria-label="프로필"
              data-node-id="2471:1286"
            >
              <Image
                src="/icons/version-b/profile.png"
                alt=""
                fill
                sizes="44px"
                className="object-cover"
              />
            </button>
          </div>
        </div>
      </div>

      {/* M + R. Sidebar + Main area (통합) */}
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
              <button type="button" className="menu-active flex w-full items-center gap-2 rounded-lg px-3 py-2">
                <Image src="/icons/version-b/make-menu-project.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#E765BE]">내 프로젝트</span>
              </button>
              <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
                <Image src="/icons/version-b/make-menu-insight-v2.svg" alt="" width={18} height={18} />
                <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">인사이트</span>
              </button>
            </nav>
          </div>
        </div>
        {/* Right: Main content */}
        <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6">
          {/* 예시 보기 모달 */}
          {exampleOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center rounded-br-2xl rounded-tr-2xl bg-white/50" onClick={() => setExampleOpen(false)}>
              <div className="flex w-[510px] flex-col gap-5 rounded-2xl bg-white px-5 py-8" style={{ boxShadow: "0 0 24px rgba(0,0,0,0.08)" }} onClick={(e) => e.stopPropagation()}>
                <h3 className="text-xl font-semibold text-black">이렇게 작성해보세요</h3>
                <div className="flex flex-col gap-2">
                  <p className="text-base font-medium text-[#71717a]">• 어느 직무의 동료가 보더라도 이해할 수 있도록 쉬운 단어 사용하기</p>
                  <p className="text-base font-medium text-[#71717a]">• 앱을 이용하면 얻을 수 있는 업무 자동화 경험 소개하기</p>
                </div>
                <div className="flex flex-col gap-2 rounded-xl bg-[#f4f4f5] p-5">
                  <p className="text-base font-semibold text-[#3f3f46]">예시) 명함 생성 서비스</p>
                  <p className="text-base font-normal leading-[1.5] text-[#71717a]">
                    이름, 전화번호, 이메일 등 나의 기본 정보를 입력하고 생성 버튼을
                    누르면 3초만에 3D 명함 애니메이션부터 png 파일까지 만들어줘요.
                    파일을 다운로드받고 Gmail 서명 등록 버튼을 누르면 메일 시그니처로 바로 사용할 수 있어요.
                  </p>
                </div>
                <div className="flex justify-end">
                  <button type="button" onClick={() => setExampleOpen(false)} className="rounded-lg bg-[#E765BE] px-8 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            key={view || "project"}
            className="mx-auto flex w-full flex-1 flex-col gap-6 min-[1281px]:max-w-[1280px] animate-[fadeSlideIn_0.4s_ease-out]"
            style={{ animation: "fadeSlideIn 0.4s ease-out" }}
          >
          {/* Header */}
          {isArchive || isCreate ? (
            <>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm">
                <button type="button" onClick={() => router.push("/make")} className="font-medium text-[#71717a] underline decoration-[#d4d4d8]">내 프로젝트</button>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="font-semibold text-[#18181b]">{isArchive ? "앱 보관함" : "앱 만들기"}</span>
              </div>
              <div className="flex shrink-0 items-center">
                <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
                  {isArchive ? "앱 보관함" : "앱 만들기"}
                </h1>
              </div>
            </>
          ) : (
            <div className="flex shrink-0 items-center">
              <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
                내 프로젝트
              </h1>
            </div>
          )}

          {isCreate ? (
            /* 앱 만들기 폼 */
            <div className="flex items-start gap-4">
              {/* Step sidebar */}
              <div className="sticky top-6 flex w-[237px] shrink-0 flex-col rounded-xl bg-[#f9f9f9] p-2">
                <button type="button" onClick={() => setCreateStep(1)} className="flex items-center gap-2 rounded-lg p-3 transition-colors hover:bg-[#f0f0f0]">
                  <span className={`flex size-5 items-center justify-center rounded-full text-sm font-semibold ${createStep === 1 ? "bg-[rgba(231,101,190,0.2)] text-[#E765BE]" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>1</span>
                  <span className={`flex-1 text-left text-base font-semibold ${createStep === 1 ? "text-[#E765BE]" : "text-[#71717a]"}`}>기본 정보</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${step1Valid ? "bg-[#E765BE] text-white" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>{step1Valid ? "완료" : "미완료"}</span>
                </button>
                <button type="button" onClick={() => setCreateStep(2)} className="flex items-center gap-2 rounded-lg p-3 transition-colors hover:bg-[#f0f0f0]">
                  <span className={`flex size-5 items-center justify-center rounded-full text-sm font-semibold ${createStep === 2 ? "bg-[rgba(231,101,190,0.2)] text-[#E765BE]" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>2</span>
                  <span className={`flex-1 text-left text-base font-semibold ${createStep === 2 ? "text-[#E765BE]" : "text-[#71717a]"}`}>배포 설정</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${step2Valid ? "bg-[#E765BE] text-white" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>{step2Valid ? "완료" : "미완료"}</span>
                </button>
              </div>

              {/* Form area */}
              <div className="flex min-w-0 flex-1 flex-col items-end gap-4">
                {createStep === 1 ? (
                  <>
                    <div className="flex w-full flex-col gap-5 rounded-xl border border-[#e4e4e7] p-5">
                      <h2 className="text-lg font-medium text-black">기본 정보</h2>
                      <div className="flex gap-5 pb-5">
                        <div className="flex flex-1 flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <p className="text-base font-semibold text-black">앱 아이콘<span className="text-[#ef1026]">*</span></p>
                            <p className="text-sm leading-[1.3] tracking-[-0.14px]">
                              <span className="font-semibold text-[#1571F3]">앱 아이콘 가이드</span>
                              <span className="font-normal text-[#71717a]"> 를 보고, png 파일로 올려주세요</span>
                            </p>
                          </div>
                          <div className="flex size-[102px] items-center justify-center rounded-xl border border-dashed border-[#d4d4d8]">
                            <span className="text-xs font-medium text-[#a1a1aa]">600 x 600px</span>
                          </div>
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                          <div className="flex flex-col gap-1">
                            <p className="text-base font-semibold text-black">다크모드 앱 아이콘</p>
                            <p className="text-sm font-normal leading-[1.3] tracking-[-0.14px] text-[#71717a]">다크모드에서 아이콘이 잘 보이지 않는다면 올려주세요</p>
                          </div>
                          <div className="flex size-[102px] items-center justify-center rounded-xl border border-dashed border-[#d4d4d8]">
                            <span className="text-xs font-medium text-[#a1a1aa]">600 x 600px</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-5 pb-5">
                        <div className="flex flex-1 flex-col gap-3">
                          <p className="text-base font-semibold text-black">앱 이름<span className="text-[#ef1026]">*</span></p>
                          <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="이름 입력" className="min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none" />
                        </div>
                        <div className="flex flex-1 flex-col gap-3">
                          <p className="text-base font-semibold text-black">카테고리<span className="text-[#ef1026]">*</span></p>
                          <div className="relative">
                            <button
                              type="button"
                              onClick={() => setCategoryOpen(!categoryOpen)}
                              className={`flex min-h-[48px] w-full items-center rounded-xl border bg-white px-4 text-base ${selectedCategory ? "border-[#e4e4e7] text-[#18181b]" : "border-[#e4e4e7] text-[#a1a1aa]"}`}
                            >
                              <span className="flex-1 text-left">{selectedCategory || "카테고리 선택"}</span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 8L10 12L14 8" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            {categoryOpen && (
                              <div className="absolute left-0 right-0 top-[52px] z-20 flex flex-col overflow-hidden rounded-xl border border-[#e4e4e7] bg-white p-2 shadow-lg">
                                {["경영재무", "협업도구", "데이터분석", "생산성", "개발도구"].map((cat) => (
                                  <button
                                    key={cat}
                                    type="button"
                                    onClick={() => { setSelectedCategory(cat); setCategoryOpen(false); }}
                                    className={`px-4 py-2.5 text-left text-base transition-colors hover:bg-[#f6f6f6] ${selectedCategory === cat ? "font-semibold text-[#E765BE]" : "font-normal text-[#18181b]"}`}
                                  >
                                    {cat}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-3 pb-5">
                        <div className="flex items-center">
                          <p className="flex-1 text-base font-semibold text-black">상세 설명</p>
                          <button type="button" onClick={() => setExampleOpen(true)} className="rounded-lg bg-[#f6f6f6] px-3 py-2 text-xs font-semibold text-[#3f3f46] transition-colors hover:bg-[#ececec]">예시 보기</button>
                        </div>
                        <textarea placeholder="사용자가 서비스에서 무엇을 경험할 수 있는 지 구체적으로 적어주세요" className="min-h-[96px] resize-none rounded-xl border border-[#e4e4e7] bg-white p-4 text-base text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none" />
                      </div>
                      <div className="flex flex-col gap-3 pb-5">
                        <p className="text-base font-semibold text-black">앱 사용방법<span className="text-[#ef1026]">*</span></p>
                        <div className="flex gap-3">
                          <button type="button" onClick={() => setUseMethod(useMethod === "direct" ? null : "direct")} className={`flex shrink-0 flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${useMethod === "direct" ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">바로 사용</span>
                            <span className="text-sm font-normal leading-[1.3] text-[#71717a]">모든 동료가 승인없이 바로 사용할 수 있어요</span>
                          </button>
                          <button type="button" onClick={() => setUseMethod(useMethod === "approval" ? null : "approval")} className={`flex shrink-0 flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${useMethod === "approval" ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">승인 후 사용</span>
                            <span className="text-sm font-normal leading-[1.3] text-[#71717a]">관리자 승인을 받은 동료만 사용할 수 있어요</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => step1Valid && setCreateStep(2)}
                      className={`flex h-9 items-center rounded-lg px-4 text-sm font-semibold transition-colors ${step1Valid ? "bg-[#E765BE] text-white hover:opacity-90" : "bg-[#e4e4e7] text-[#a1a1aa] cursor-not-allowed"}`}
                    >
                      다음
                    </button>
                  </>
                ) : (
                  <>
                    <div className="flex w-full flex-col gap-5 rounded-xl border border-[#e4e4e7] p-5">
                      <h2 className="text-lg font-medium text-black">배포 설정</h2>

                      {/* 배포 방식 */}
                      <div className="flex flex-col gap-3 pb-5">
                        <p className="text-base font-semibold text-black">배포 방식<span className="text-[#ef1026]">*</span></p>
                        <div className="flex gap-3">
                          <button type="button" onClick={() => setDeployMethod(deployMethod === "docker" ? null : "docker")} className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${deployMethod === "docker" ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">Docker</span>
                            <span className="text-sm font-normal text-[#71717a]">Dockerfile 기반 빌드 후 K8s 배포</span>
                          </button>
                          <button type="button" onClick={() => setDeployMethod(deployMethod === "compose" ? null : "compose")} className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${deployMethod === "compose" ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">Docker Compose</span>
                            <span className="text-sm font-normal text-[#71717a]">docker-compose.yml 기반 배포</span>
                          </button>
                        </div>
                      </div>

                      {/* Pod 사양 */}
                      <div className="flex flex-col gap-3 pb-5">
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold text-black">Pod 사양<span className="text-[#ef1026]">*</span></p>
                          <p className="text-sm font-normal text-[#71717a]">앱이 사용할 CPU/메모리 크기를 선택합니다. 나중에 변경할 수 있어요.</p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                          {([
                            { key: "small" as const, name: "Small", desc: "가벼운 작업용", cpu: "250 ~ 1000m", mem: "384 ~ 768Mi" },
                            { key: "medium" as const, name: "Medium", desc: "표준 기본값", cpu: "500 ~ 2000m", mem: "768 ~ 1536Mi" },
                            { key: "large" as const, name: "Large", desc: "트래픽이 많은 앱용", cpu: "1000 ~ 3000m", mem: "1536 ~ 2560Mi" },
                            { key: "xlarge" as const, name: "XLarge", desc: "고부하 전용", cpu: "2000 ~ 4000m", mem: "3 ~ 5Gi" },
                          ]).map((pod) => (
                            <button key={pod.key} type="button" onClick={() => setPodSize(podSize === pod.key ? null : pod.key)} className={`flex w-[calc(50%-6px)] flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${podSize === pod.key ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                              <div className="flex items-center gap-2">
                                <span className="text-base font-semibold text-[#3f3f46]">{pod.name}</span>
                                <span className="text-sm font-normal text-[#18181b]">{pod.desc}</span>
                              </div>
                              <div className="flex w-full items-center gap-5 border-t border-[#e4e4e7] pt-3 text-xs text-[#71717a]">
                                <span><span className="font-semibold">CPU</span><span className="font-normal">  {pod.cpu}</span></span>
                                <span><span className="font-semibold">메모리</span><span className="font-normal">  {pod.mem}</span></span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 접속 주소 */}
                      <div className="flex flex-col gap-3 pb-5">
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold text-black">접속 주소<span className="text-[#ef1026]">*</span></p>
                          <p className="text-sm font-normal text-[#71717a]">url 가장 앞에 쓰일 고유 ID를 만들어주세요</p>
                        </div>
                        <div className="flex gap-3">
                          <input type="text" value={accessId} onChange={(e) => setAccessId(e.target.value)} placeholder="3~63자의 영문 소문자, 숫자,-만 가능해요" className="min-h-[48px] flex-[6] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none" />
                          <div className="relative flex-[4]">
                            <select value={selectedDomain} onChange={(e) => { setSelectedDomain(e.target.value); e.target.style.color = e.target.value ? "#18181b" : "#a1a1aa"; }} className="min-h-[48px] w-full appearance-none rounded-xl border border-[#e4e4e7] bg-white px-4 pr-12 text-base text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none">
                              <option value="">도메인 선택</option>
                              <option>.jocodingax.ai</option>
                              <option>.axhub.dev</option>
                            </select>
                            <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 8L10 12L14 8" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* 안내 카드 */}
                    <div className="flex w-full flex-col gap-2 rounded-xl bg-[#f4f4f5] p-5">
                      <p className="text-base font-semibold text-[#3f3f46]">생성하면, 우선 초안 상태로 저장돼요! </p>
                      <p className="text-sm font-normal text-[#71717a]">실제로 동료들이 볼 수 있는 <span className="font-bold">스토어</span>에 입점하려면, <span className="font-bold">내 프로젝트</span>에서 남은 단계를 완료해주세요</p>
                    </div>

                    <button
                      type="button"
                      className={`flex h-9 items-center rounded-lg px-4 text-sm font-semibold transition-colors ${step1Valid && step2Valid ? "bg-[#E765BE] text-white hover:opacity-90" : "bg-[#e4e4e7] text-[#a1a1aa] cursor-not-allowed"}`}
                    >
                      생성
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
          <>
          {/* Action bar */}
          <div className="flex items-end border-b border-[#e4e4e7] pb-4">
            {isArchive ? (
              <>
                <div className="flex flex-1 items-center gap-2">
                  <span className="text-sm font-normal text-[#71717a]">보관된 앱</span>
                  <span className="text-sm font-semibold text-[#71717a]">{isEmpty ? "0개" : "2개"}</span>
                </div>
                <div className="relative">
                  <button type="button" onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-1 text-sm font-semibold text-[#18181b]">
                    {sortBy}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 7.5L9 10.5L12 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-8 z-20 flex min-w-[140px] flex-col overflow-hidden rounded-lg border border-[#e4e4e7] bg-white shadow-lg">
                      {["최근 생성순", "최근 수정순", "API 호출순"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => { setSortBy(option); setSortOpen(false); }}
                          className={`px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#f6f6f6] ${sortBy === option ? "font-semibold text-[#E765BE]" : "font-normal text-[#18181b]"}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-1 items-center gap-2">
                  <button type="button" onClick={() => router.push("/make?view=archive")} className="flex h-9 items-center gap-2 rounded-lg border border-[#e4e4e7] bg-white px-4 text-sm font-normal text-[#18181b] transition-colors hover:bg-gray-50">
                    앱 보관함
                  </button>
                  <button type="button" onClick={() => router.push("/make?view=create")} className="flex h-9 items-center gap-2 rounded-lg bg-[#E765BE] px-4 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 3.75V14.25M3.75 9H14.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    앱 만들기
                  </button>
                </div>
                <div className="relative">
                  <button type="button" onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-1 text-sm font-semibold text-[#18181b]">
                    {sortBy}
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6 7.5L9 10.5L12 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {sortOpen && (
                    <div className="absolute right-0 top-8 z-20 flex min-w-[140px] flex-col overflow-hidden rounded-lg border border-[#e4e4e7] bg-white shadow-lg">
                      {["최근 생성순", "최근 수정순", "API 호출순"].map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => { setSortBy(option); setSortOpen(false); }}
                          className={`px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#f6f6f6] ${sortBy === option ? "font-semibold text-[#E765BE]" : "font-normal text-[#18181b]"}`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Project cards / Archive / Empty state */}
          {isArchive ? (
            isEmpty ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-5 pb-[10%]">
                <Image src="/icons/version-b/empty-archive.svg" alt="" width={100} height={74} />
                <p className="text-base font-normal text-[#a1a1aa]">아직 보관된 앱이 없어요</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-6 min-[993px]:grid-cols-2 min-[1281px]:grid-cols-3">
                {[
                  { name: "사내 문서 검색", category: "생산성", stars: 0, date: "26.04.22" },
                  { name: "팀 메신저", category: "커뮤니케이션", stars: 0, date: "26.04.20" },
                ].map((app, i) => (
                  <div key={i} className="flex cursor-pointer flex-col gap-4 rounded-2xl bg-[#f9f9f9] p-5">
                    <div className="flex items-start gap-4">
                      <div className="size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                      <div className="flex flex-col gap-1">
                        <span className="text-base font-semibold text-black">{app.name}</span>
                        <span className="text-sm font-normal text-[#71717a]">{app.category}</span>
                        <div className="flex items-center gap-1">
                          <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FBB03B" /></svg>
                          <span className="text-xs font-normal text-black">{app.stars}</span>
                        </div>
                      </div>
                    </div>
                    <div className="h-px bg-[#e4e4e7]" />
                    <div className="flex items-center">
                      <span className="flex-1 text-sm font-normal text-[#71717a]">{app.date} 보관</span>
                      <button type="button" className="rounded-lg bg-[#E765BE] px-3 py-1 text-xs font-semibold text-white transition-opacity hover:opacity-90">
                        보관 해제
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : isEmpty ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-5 pb-[20%]">
              <Image src="/icons/version-b/empty-folder.svg" alt="" width={100} height={97} />
              <p className="text-base font-normal text-[#a1a1aa]">앱을 만들고 출시해보세요</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6 min-[993px]:grid-cols-2 min-[1281px]:grid-cols-3">
              {[
                { name: "경비 정산 자동화", category: "경영재무", stars: 0, status: "draft" as const, progress: 2, total: 4, date: "" },
                { name: "스마트 캘린더", category: "협업도구", stars: 0, status: "active" as const, progress: 0, total: 0, date: "26.04.12" },
                { name: "매출 대시보드", category: "데이터분석", stars: 0, status: "active" as const, progress: 0, total: 0, date: "26.04.12" },
                { name: "프로젝트 트래커", category: "프로젝트관리", stars: 0, status: "active" as const, progress: 0, total: 0, date: "26.04.12" },
              ].map((app, i) => (
                <div key={i} className="flex cursor-pointer flex-col gap-4 rounded-2xl bg-[#f9f9f9] p-5">
                  <div className="flex items-start gap-4">
                    <div className="size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                    <div className="flex flex-col gap-1">
                      <span className="text-base font-semibold text-black">{app.name}</span>
                      <span className="text-sm font-normal text-[#71717a]">{app.category}</span>
                      <div className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FBB03B" /></svg>
                        <span className="text-xs font-normal text-black">{app.stars}</span>
                      </div>
                    </div>
                  </div>
                  <div className="h-px bg-[#e4e4e7]" />
                  {app.status === "draft" ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-[#71717a]">남은 단계</span>
                        <span className="text-sm font-semibold text-[#71717a]">{app.progress}/{app.total}</span>
                      </div>
                      <div className="relative h-1.5 flex-1 rounded-full bg-[#e4e4e7]">
                        <div className="absolute left-0 top-0 h-full rounded-full bg-[#A1A1AA]" style={{ width: `${(app.progress / app.total) * 100}%` }} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <div className="flex flex-1 items-center gap-1">
                        <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><circle cx="9" cy="9" r="8" fill="#E765BE" /><path d="M5.5 9L8 11.5L12.5 6.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        <span className="text-sm font-medium text-[#E765BE]">앱 활성중</span>
                      </div>
                      <span className="text-sm font-medium text-[#71717a]">{app.date}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          </>
          )}

          {/* 임시 토글 버튼 (앱 만들기 뷰에서는 숨김) */}
          {!isCreate && (
            <button
              type="button"
              onClick={() => setIsEmpty(!isEmpty)}
              className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
            >
              {isEmpty ? "데이터 있을 때" : "데이터 없을 때"}
            </button>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import AppDetailView from "./AppDetailView";
import PageSidebar from "./PageSidebar";
import NotificationButton from "./NotificationButton";
import { useDarkMode } from "@/hooks/useDarkMode";

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
  const isCreate = view === "create";
  const isDetail = view === "detail";
  const detailApp = searchParams.get("app") || "";
  const detailCategory = searchParams.get("category") || "";
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("최근 생성순");
  const [isEmpty, setIsEmpty] = useState(false);
  const [activeTab, setActiveTab] = useState<"전체" | "배포전" | "활성중" | "보관됨">("전체");
  const [useMethod, setUseMethod] = useState<"direct" | "approval" | null>(null);
  const [createStep, setCreateStep] = useState(1);
  const [appName, setAppName] = useState("");
  const [deployMethod, setDeployMethod] = useState<"docker" | "compose" | null>(null);
  const [podSize, setPodSize] = useState<"small" | "medium" | "large" | "xlarge" | null>(null);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const [exampleOpen, setExampleOpen] = useState(false);
  const [exampleClosing, setExampleClosing] = useState(false);
  const closeExample = () => {
    setExampleClosing(true);
    setTimeout(() => { setExampleOpen(false); setExampleClosing(false); }, 250);
  };
  const [selectedCategory, setSelectedCategory] = useState("");
  const step1Valid = appName.trim() !== "" && selectedCategory !== "" && useMethod !== null;
  const [accessId, setAccessId] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("");
  const [domainOpen, setDomainOpen] = useState(false);
  const step2Valid = deployMethod !== null && podSize !== null && accessId.trim() !== "" && selectedDomain !== "";

  return (
    <div
      className={`flex h-screen w-full items-start overflow-hidden${darkMode ? " dark-mode" : ""}`}
      style={{
        backgroundColor: darkMode ? "#0E1014" : "#F6F7F9",
        "--page-primary": darkMode ? "#4B7BFF" : "#2D64FA",
      } as React.CSSProperties}
      data-node-id="2471:1262"
    >
      {/* L. Sidebar */}
      <PageSidebar activeMenu="앱 만들기" />

      {/* R. Header + Main (홈 스타일 셸) */}
      <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-white">
        {/* Header (60px) */}
        <div className="flex h-[60px] shrink-0 items-center justify-between border-b border-[rgba(82,82,91,0.08)] bg-white px-5">
          <div className="flex items-center">
            <span className="px-1 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">
              앱 만들기
            </span>
          </div>
          <div className="flex h-full items-center gap-3">
            <button
              type="button"
              onClick={() => setDarkMode(!darkMode)}
              aria-label={darkMode ? "라이트모드로 전환" : "다크모드로 전환"}
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-[#f4f4f5]"
            >
              <Image src="/icons/version-b/header-search.svg" alt="" width={32} height={32} />
            </button>
            <NotificationButton variant="header" />
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex size-9 items-center justify-center rounded-full bg-[#2D64FA] p-2 transition-opacity hover:opacity-80"
                aria-label="프로필"
              >
                <span className="whitespace-nowrap text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">민영</span>
              </button>
              {profileOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                  <div className="absolute right-0 top-[calc(100%+8px)] z-50 w-[220px] rounded-2xl bg-white p-3" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)" }}>
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

        {/* Main scrollable */}
        <div className="no-scrollbar relative flex min-w-0 flex-1 flex-col overflow-y-auto bg-white px-14 py-10 pb-[240px]">
          {/* 예시 보기 모달 */}
          {exampleOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center bg-white/50 transition-opacity duration-250" style={{ opacity: exampleClosing ? 0 : 1 }} onClick={closeExample}>
              <div className="flex w-[510px] flex-col gap-5 rounded-2xl bg-white px-5 py-8" style={{ boxShadow: "0 0 24px rgba(0,0,0,0.08)", animation: exampleClosing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out" }} onClick={(e) => e.stopPropagation()}>
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
                  <button type="button" onClick={closeExample} className="rounded-lg bg-[#2D64FA] px-8 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90">
                    확인
                  </button>
                </div>
              </div>
            </div>
          )}
          <div
            key={view || "project"}
            className="mx-auto flex w-full flex-1 flex-col gap-6 min-[1281px]:max-w-[1280px]"
            style={{ animation: "pageFadeIn 0.35s cubic-bezier(0.4, 0, 0.2, 1)" }}
          >
          {/* Header */}
          {isCreate ? (
            <>
              {/* Breadcrumbs */}
              <div className="flex items-center gap-2 text-sm">
                <button type="button" onClick={() => router.push("/make")} className="font-medium text-[#71717a] underline decoration-[#d4d4d8]">내 프로젝트</button>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                <span className="font-semibold text-[#18181b]">앱 만들기</span>
              </div>
              <div className="flex shrink-0 items-center">
                <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
                  앱 만들기
                </h1>
              </div>
            </>
          ) : null}

          {isDetail ? (
            <AppDetailView
              appName={detailApp}
              category={detailCategory}
              fromMenu="내 프로젝트"
              onBack={() => router.push("/make")}
              isAdmin
            />
          ) : isCreate ? (
            /* 앱 만들기 폼 */
            <div className="flex items-start gap-4">
              {/* Step sidebar */}
              <div className="sticky top-6 flex w-[237px] shrink-0 flex-col rounded-xl bg-surface p-2">
                <button type="button" onClick={() => setCreateStep(1)} className="flex items-center gap-2 rounded-lg p-3 transition-colors hover:bg-[#f0f0f0]">
                  <span className={`flex size-5 items-center justify-center rounded-full text-sm font-semibold ${createStep === 1 ? "bg-[rgba(231,101,190,0.2)] text-[#2D64FA]" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>1</span>
                  <span className={`flex-1 text-left text-base font-semibold ${createStep === 1 ? "text-[#2D64FA]" : "text-[#71717a]"}`}>기본 정보</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${step1Valid ? "bg-[#2D64FA] text-white" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>{step1Valid ? "완료" : "미완료"}</span>
                </button>
                <button type="button" onClick={() => setCreateStep(2)} className="flex items-center gap-2 rounded-lg p-3 transition-colors hover:bg-[#f0f0f0]">
                  <span className={`flex size-5 items-center justify-center rounded-full text-sm font-semibold ${createStep === 2 ? "bg-[rgba(231,101,190,0.2)] text-[#2D64FA]" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>2</span>
                  <span className={`flex-1 text-left text-base font-semibold ${createStep === 2 ? "text-[#2D64FA]" : "text-[#71717a]"}`}>배포 설정</span>
                  <span className={`rounded-full px-3 py-1 text-sm font-semibold ${step2Valid ? "bg-[#2D64FA] text-white" : "bg-[#e4e4e7] text-[#a1a1aa]"}`}>{step2Valid ? "완료" : "미완료"}</span>
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
                          <input type="text" value={appName} onChange={(e) => setAppName(e.target.value)} placeholder="이름 입력" className="min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#2D64FA] focus:outline-none" />
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
                                    className={`px-4 py-2.5 text-left text-base transition-colors hover:bg-[#f6f6f6] ${selectedCategory === cat ? "font-semibold text-[#2D64FA]" : "font-normal text-[#18181b]"}`}
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
                        <textarea placeholder="어떤 업무를 자동화할 수 있는 지 동료들에게 설명해주세요" className="min-h-[96px] resize-none rounded-xl border border-[#e4e4e7] bg-white p-4 text-base text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#2D64FA] focus:outline-none" />
                      </div>
                      <div className="flex flex-col gap-3 pb-5">
                        <p className="text-base font-semibold text-black">앱 사용방법<span className="text-[#ef1026]">*</span></p>
                        <div className="flex gap-3">
                          <button type="button" onClick={() => setUseMethod(useMethod === "direct" ? null : "direct")} className={`flex shrink-0 flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${useMethod === "direct" ? "border-[#2D64FA] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">바로 사용</span>
                            <span className="text-sm font-normal leading-[1.3] text-[#71717a]">모든 동료가 승인없이 바로 사용할 수 있어요</span>
                          </button>
                          <button type="button" onClick={() => setUseMethod(useMethod === "approval" ? null : "approval")} className={`flex shrink-0 flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${useMethod === "approval" ? "border-[#2D64FA] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">승인 후 사용</span>
                            <span className="text-sm font-normal leading-[1.3] text-[#71717a]">관리자 승인을 받은 동료만 사용할 수 있어요</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => step1Valid && setCreateStep(2)}
                      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-[#2D64FA] px-5 py-3 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white ${step1Valid ? "transition-opacity hover:opacity-90" : "cursor-not-allowed"}`}
                    >
                      다음
                      {!step1Valid && <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />}
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
                          <button type="button" onClick={() => setDeployMethod(deployMethod === "docker" ? null : "docker")} className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${deployMethod === "docker" ? "border-[#2D64FA] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">Docker</span>
                            <span className="text-sm font-normal text-[#71717a]">Dockerfile 기반 빌드 후 K8s 배포</span>
                          </button>
                          <button type="button" onClick={() => setDeployMethod(deployMethod === "compose" ? null : "compose")} className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${deployMethod === "compose" ? "border-[#2D64FA] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                            <span className="text-base font-semibold text-[#3f3f46]">Docker Compose</span>
                            <span className="text-sm font-normal text-[#71717a]">docker-compose.yml 기반 배포</span>
                          </button>
                        </div>
                      </div>

                      {/* Pod 사양 (표 형식) */}
                      <div className="flex flex-col gap-3 pb-5">
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold text-black">Pod 사양<span className="text-[#ef1026]">*</span></p>
                          <p className="text-sm font-normal text-[#71717a]">앱이 사용할 CPU/메모리 크기를 선택합니다. 나중에 변경할 수 있어요.</p>
                        </div>
                        <div className="flex w-full flex-col items-center rounded-[20px] bg-[#f6f6f6] p-1">
                          {/* Table header */}
                          <div className="flex w-full items-center gap-4 px-4 py-2.5">
                            <div className="size-6 shrink-0" />
                            <div className="w-20 shrink-0">
                              <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">사양</p>
                            </div>
                            <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">설명</p>
                            <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">CPU</p>
                            <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">메모리</p>
                          </div>
                          {/* Table body */}
                          <div className="flex w-full flex-col items-start justify-center overflow-hidden rounded-2xl bg-white">
                            {([
                              { key: "small" as const, name: "Small", desc: "가벼운 작업용", cpu: "250 ~ 1000m", mem: "384 ~ 768Mi" },
                              { key: "medium" as const, name: "Medium", desc: "표준 기본값", cpu: "500 ~ 2000m", mem: "768 ~ 1536Mi" },
                              { key: "large" as const, name: "Large", desc: "트래픽이 많은 앱용", cpu: "1000 ~ 3000m", mem: "1536 ~ 2560Mi" },
                              { key: "xlarge" as const, name: "XLarge", desc: "고부하 전용", cpu: "2000 ~ 4000m", mem: "3 ~ 5Gi" },
                            ]).map((pod, i, arr) => {
                              const isSelected = podSize === pod.key;
                              const isLast = i === arr.length - 1;
                              return (
                                <button
                                  key={pod.key}
                                  type="button"
                                  onClick={() => setPodSize(isSelected ? null : pod.key)}
                                  className="relative flex h-14 w-full items-center gap-4 px-4 py-3 text-left transition-colors hover:bg-[#fafafa]"
                                >
                                  {!isLast && <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#e4e4e7] opacity-50" />}
                                  <div className="flex shrink-0 items-center justify-center p-0.5">
                                    <div className={`flex size-5 items-center justify-center rounded-full border-[1.5px] ${isSelected ? "border-[#2D64FA] bg-[#2D64FA]" : "border-[#d4d4d8] bg-transparent"}`}>
                                      {isSelected && <span className="size-2 rounded-full bg-white" />}
                                    </div>
                                  </div>
                                  <div className="w-20 shrink-0">
                                    <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">{pod.name}</p>
                                  </div>
                                  <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">{pod.desc}</p>
                                  <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">{pod.cpu}</p>
                                  <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">{pod.mem}</p>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* 접속 주소 */}
                      <div className="flex flex-col gap-3 pb-5">
                        <div className="flex flex-col gap-1">
                          <p className="text-base font-semibold text-black">접속 주소<span className="text-[#ef1026]">*</span></p>
                          <p className="text-sm font-normal text-[#71717a]">url 가장 앞에 쓰일 고유 ID를 만들어주세요</p>
                        </div>
                        <div className="flex gap-3">
                          <input type="text" value={accessId} onChange={(e) => setAccessId(e.target.value)} placeholder="3~63자의 영문 소문자, 숫자,-만 가능해요" className="min-h-[48px] flex-[6] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#2D64FA] focus:outline-none" />
                          <div className="relative flex-[4]">
                            <button
                              type="button"
                              onClick={() => setDomainOpen(!domainOpen)}
                              className={`flex min-h-[48px] w-full items-center rounded-xl border bg-white px-4 text-base ${selectedDomain ? "border-[#e4e4e7] text-[#18181b]" : "border-[#e4e4e7] text-[#a1a1aa]"}`}
                            >
                              <span className="flex-1 text-left">{selectedDomain || "도메인 선택"}</span>
                              <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M6 8L10 12L14 8" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            </button>
                            {domainOpen && (
                              <div className="absolute left-0 right-0 top-[52px] z-20 flex flex-col overflow-hidden rounded-xl border border-[#e4e4e7] bg-white p-2 shadow-lg">
                                {[".jocodingax.ai", ".axhub.dev"].map((domain) => (
                                  <button
                                    key={domain}
                                    type="button"
                                    onClick={() => { setSelectedDomain(domain); setDomainOpen(false); }}
                                    className={`px-4 py-2.5 text-left text-base transition-colors hover:bg-[#f6f6f6] ${selectedDomain === domain ? "font-semibold text-[#2D64FA]" : "font-normal text-[#18181b]"}`}
                                  >
                                    {domain}
                                  </button>
                                ))}
                              </div>
                            )}
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
                      className={`relative flex items-center justify-center overflow-hidden rounded-full bg-[#2D64FA] px-5 py-3 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white ${step1Valid && step2Valid ? "transition-opacity hover:opacity-90" : "cursor-not-allowed"}`}
                    >
                      생성
                      {!(step1Valid && step2Valid) && <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
          <div className="flex flex-col gap-[80px]">
            {/* 새 헤더 (피그마) */}
            <div className="flex flex-col gap-10">
              <p className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#2D64FA]">내 프로젝트</p>
              <div>
                <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">아이디어를</p>
                <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">앱으로 만들기.</p>
              </div>
              <div className="flex items-center gap-10">
                <div className="flex flex-1 flex-col">
                  <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#71717a]">
                    자연어로 설명하면 Claude Code가 동작하는 앱으로 만들어요
                  </p>
                  <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#71717a]">
                    코드 없이도 누구나 만들 수 있어요
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => router.push("/make?view=create")}
                  className="flex h-12 shrink-0 items-center gap-2 rounded-full bg-[#2D64FA] px-6 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path d="M9 3.75V14.25M3.75 9H14.25" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  앱 만들기
                </button>
              </div>
            </div>

            {/* 리스트 섹션 (탭 + 카드) */}
            <div className="flex flex-col gap-5">
          {/* Tabs + 정렬 */}
          <div className="flex items-center justify-between border-b border-[rgba(82,82,91,0.08)]">
            <div className="flex items-center">
              {(["전체", "배포전", "활성중", "보관됨"] as const).map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center justify-center px-5 py-2 text-sm tracking-[-0.14px] transition-colors ${
                    activeTab === tab
                      ? "border-b-[2.5px] border-[#2D64FA] font-semibold text-black"
                      : "font-normal text-[#a1a1aa] hover:text-[#71717a]"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="relative">
              <button type="button" onClick={() => setSortOpen(!sortOpen)} className="flex items-center gap-1 text-sm font-medium text-[#3f3f46]">
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
                      className={`px-4 py-2.5 text-left text-sm transition-colors hover:bg-[#f6f6f6] ${sortBy === option ? "font-semibold text-[#2D64FA]" : "font-normal text-[#18181b]"}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* 카드 그리드 */}
          {(() => {
            const allApps = [
              { name: "리포트 빌더", category: "개발자", stars: 0, status: "draft" as const, progress: 2, total: 4 },
              { name: "회의록 자동화", category: "구성원 (보기권한)", stars: 12, status: "active" as const, progress: 0, total: 0 },
              { name: "AI 문서 요약 봇", category: "구성원 (편집권한)", stars: 24, status: "active" as const, progress: 0, total: 0 },
              { name: "주간 KPI 알림", category: "관리자", stars: 4, status: "archived" as const, progress: 0, total: 0 },
            ];
            const filtered = allApps.filter((a) => {
              if (activeTab === "전체") return true;
              if (activeTab === "배포전") return a.status === "draft";
              if (activeTab === "활성중") return a.status === "active";
              return a.status === "archived";
            });

            if (isEmpty || filtered.length === 0) {
              const isArchivedEmpty = activeTab === "보관됨";
              return (
                <div className="flex h-[330px] w-full flex-col items-center justify-center gap-5">
                  {isArchivedEmpty ? (
                    <Image src="/icons/version-b/empty-archived.svg" alt="" width={90} height={67} />
                  ) : (
                    <Image src="/icons/version-b/empty-projects.svg" alt="" width={90} height={87} />
                  )}
                  <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">
                    {isArchivedEmpty ? "아직 보관된 앱이 없어요" : "앱을 만들고 출시해보세요"}
                  </p>
                </div>
              );
            }

            return (
              <div className="grid grid-cols-1 gap-5 min-[700px]:grid-cols-2 min-[993px]:grid-cols-3 min-[1441px]:grid-cols-4">
                {filtered.map((app, i) => {
                  const isArchivedCard = app.status === "archived";
                  const chipBase = "relative flex items-center gap-1 rounded-full bg-[rgba(24,24,27,0.03)] px-2 py-1";
                  const chipText = "text-sm font-semibold leading-[1.3] tracking-[-0.14px]";
                  return (
                    <div
                      key={i}
                      onClick={() => router.push(`/make?view=detail&app=${encodeURIComponent(app.name)}&category=${encodeURIComponent(app.category)}`)}
                      className={`flex cursor-pointer flex-col gap-5 rounded-2xl p-5 transition-transform duration-200 ease-out hover:scale-[1.03] ${
                        isArchivedCard
                          ? "bg-surface"
                          : "border border-[#e4e4e7] bg-white"
                      }`}
                    >
                      {/* 상단: 아이콘 + 상태 영역 */}
                      {app.status === "draft" ? (
                        <div className="flex w-full items-start gap-5">
                          <div className="size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                          <div className="flex min-w-0 flex-1 flex-col items-end justify-between self-stretch">
                            <div className={chipBase}>
                              <Image src="/icons/version-b/chip-loader.svg" alt="" width={16} height={16} />
                              <span className={`${chipText} text-[#2D64FA]`}>배포전</span>
                            </div>
                            <div className="flex w-full items-center gap-2">
                              <div className="relative h-3 flex-1">
                                <div className="absolute left-0 right-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#e4e4e7]" />
                                <div
                                  className="absolute left-0 top-1/2 h-1.5 -translate-y-1/2 rounded-full bg-[#2D64FA]"
                                  style={{ width: `${(app.progress / app.total) * 100}%` }}
                                />
                              </div>
                              <p className="shrink-0 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">{app.progress}/{app.total}</p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="flex w-full items-start justify-between">
                          <div className="size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                          {app.status === "active" ? (
                            <div className={chipBase}>
                              <Image src="/icons/version-b/chip-check.svg" alt="" width={16} height={16} />
                              <span className={`${chipText} text-[#1fa24e]`}>활성중</span>
                            </div>
                          ) : (
                            <div className={chipBase}>
                              <Image src="/icons/version-b/archived.svg" alt="" width={16} height={16} />
                              <span className={`${chipText} text-[#71717a]`}>보관됨</span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* 하단: 이름 + 역할 + 좋아요 */}
                      <div className="flex w-full flex-col gap-1">
                        <p className="text-lg font-semibold leading-[1.32] tracking-[-0.18px] text-black">{app.name}</p>
                        <div className="flex w-full items-center gap-1">
                          <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{app.category}</p>
                          <div className="flex shrink-0 items-center gap-1">
                            <Image src="/icons/version-b/thumb-up.svg" alt="" width={16} height={16} />
                            <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-black">{app.stars}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })()}
            </div>
          </div>
          )}

          {/* 임시 토글 버튼 (앱 만들기 뷰에서는 숨김) */}
          {!isCreate && !isDetail && (
            <button
              type="button"
              onClick={() => setIsEmpty(!isEmpty)}
              className="fixed bottom-6 right-6 z-50 rounded-lg bg-[#2D64FA] px-4 py-2 text-sm font-semibold text-white shadow-lg transition-opacity hover:opacity-90"
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

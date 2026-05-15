"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

type AppDetailStatus = "not-using" | "using" | "admin";

interface AppDetailDiscoveryViewProps {
  appName: string;
  category: string;
  appStatus?: AppDetailStatus;
  isRecommended?: boolean;
  onToggleRecommend?: () => void;
  onHeaderVisibilityChange?: (visible: boolean) => void;
}

type SectionId = "about" | "data-flow" | "permissions" | "overview" | "review";

const TOC: { id: SectionId; label: string }[] = [
  { id: "about", label: "앱 소개" },
  { id: "overview", label: "한 눈에 보기" },
  { id: "data-flow", label: "데이터 사용 관계" },
  { id: "permissions", label: "권한 및 데이터" },
  { id: "review", label: "동료들이 남긴 한마디" },
];

const upstreamApps = [
  { name: "사용량 로거", category: "백엔드", color: "#7AA3D4" },
  { name: "토큰 메트릭", category: "데이터", color: "#FBBB45" },
];

const reviews = [
  {
    name: "박민영",
    time: "1시간 전",
    text: "셋업이 정말 단순합니다. 토큰 키만 넣으면 자동으로 멤버 매핑까지 돼서 다음 날 바로 리포트가 도착했어요",
    avatar: "/icons/version-b/profile-new.png",
  },
  {
    name: "송재희",
    time: "1일 전",
    text: "팀별 한도와 슬랙 알림이 잘 동작해서 비용 통제가 한결 수월해졌습니다. 월 리포트 PDF도 깔끔하게 정리돼서 보고용으로 그대로 쓰고 있어요",
    avatar: "/icons/version-b/profile-peach.png",
  },
  {
    name: "안준성",
    time: "20일 전",
    text: "프로젝트·언어별 필터링이 가능해서 어디에서 토큰을 많이 쓰는지 한눈에 보입니다. 도입한 첫 주에 비용 30% 절감 효과가 있었어요",
    avatar: "/icons/version-b/profile-blue.png",
  },
];

export default function AppDetailDiscoveryView({
  appName,
  category,
  appStatus = "not-using",
  isRecommended = false,
  onToggleRecommend,
  onHeaderVisibilityChange,
}: AppDetailDiscoveryViewProps) {
  const [thumbAnimKey, setThumbAnimKey] = useState(0);
  const handleRecommend = () => {
    if (!isRecommended) {
      setThumbAnimKey((k) => k + 1);
    }
    onToggleRecommend?.();
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState<SectionId>("about");
  const buttonRefs = useRef<Record<SectionId, HTMLButtonElement | null>>({
    about: null,
    "data-flow": null,
    permissions: null,
    overview: null,
    review: null,
  });
  const [indicatorTop, setIndicatorTop] = useState(0);
  const [reviewInput, setReviewInput] = useState("");
  const [reviewExpanded, setReviewExpanded] = useState(false);
  const reviewTextareaRef = useRef<HTMLTextAreaElement>(null);
  const router = useRouter();

  const isPrivateApp = appName === "매출 대시보드" || appName === "AI 문서 요약";
  const isInlineLockApp = appName === "AI 문서 요약";

  const goToAdminConsole = () => {
    const params = new URLSearchParams();
    params.set("app", appName);
    params.set("category", category);
    router.push(`/discovery/admin-console?${params.toString()}`);
  };

  useEffect(() => {
    const el = reviewTextareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
    const lineHeight = parseFloat(getComputedStyle(el).lineHeight) || 24;
    setReviewExpanded(el.scrollHeight > lineHeight + 2);
  }, [reviewInput]);

  useLayoutEffect(() => {
    const btn = buttonRefs.current[activeSection];
    if (!btn) return;
    setIndicatorTop(btn.offsetTop + (btn.offsetHeight - 21) / 2);
  }, [activeSection]);

  useEffect(() => {
    const container = scrollRef.current;
    const header = headerRef.current;
    if (!container || !header || !onHeaderVisibilityChange) return;
    const observer = new IntersectionObserver(
      ([entry]) => onHeaderVisibilityChange(entry.isIntersecting),
      { root: container, threshold: 0 },
    );
    observer.observe(header);
    return () => observer.disconnect();
  }, [onHeaderVisibilityChange]);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible) setActiveSection(visible.target.id as SectionId);
      },
      { root: container, rootMargin: "-30% 0px -60% 0px", threshold: 0 },
    );
    TOC.forEach(({ id }) => {
      const el = container.querySelector(`#${id}`);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id: SectionId) => {
    const container = scrollRef.current;
    const el = container?.querySelector(`#${id}`) as HTMLElement | null;
    if (el && container) {
      container.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={scrollRef}
      className="flex h-full flex-1 min-h-0 flex-col overflow-y-auto rounded-br-2xl border-r border-[#f6f6f6] bg-white"
      style={{ animation: "fadeSlideIn 0.35s ease-out" }}
    >
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[60px] px-14 pt-10 pb-[120px]">
        {/* 헤더: 아이콘 + 이름 + 설명 + 받기 버튼 */}
        <div ref={headerRef} className="flex w-full items-start gap-[60px] py-5">
          {/* 좌측: 아이콘 + 텍스트 */}
          <div className="flex min-w-0 flex-1 items-start gap-7">
            <div
              className="size-[120px] shrink-0 rounded-[20px]"
              style={{ backgroundImage: "linear-gradient(135deg, #9B7AB8 0%, #2D64FA 100%)" }}
            />
            <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
              <div className="flex w-full items-center gap-2">
                {isPrivateApp && (
                  <Image
                    src="/icons/version-b/private-lock-gray.svg"
                    alt=""
                    width={24}
                    height={24}
                    aria-hidden="true"
                  />
                )}
                <p className="text-[40px] font-bold leading-[1.2] text-black">{appName}</p>
              </div>
              <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">
                팀원별·프로젝트별 Claude Code 사용량을 집계하고, 토큰·요청 수·비용을 한눈에 비교합니다.
              </p>
              <div className="flex items-center gap-2 pt-4 text-sm leading-[1.5] tracking-[-0.14px]">
                <span className="font-semibold text-[#2D64FA]">{category}</span>
                <span className="font-normal text-[#a1a1aa]">•</span>
                <span className="font-normal text-[#a1a1aa]">안승원</span>
                <span className="font-normal text-[#a1a1aa]">•</span>
                <span className="font-normal text-[#a1a1aa]">최근 업데이트 2026.04.29</span>
              </div>
            </div>
          </div>
          {/* 우측: 액션 버튼 영역 (status 별로 다른 구성) */}
          <div className={`flex w-[200px] shrink-0 flex-col justify-end gap-2 self-stretch pb-2 ${appStatus === "admin" ? "items-end" : "items-center"}`}>
            {appStatus === "admin" && (
              <button
                type="button"
                onClick={goToAdminConsole}
                className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#1571F3] transition-colors hover:bg-[#1571F3]/5"
              >
                관리 콘솔로 이동
                <ArrowRightIcon size={16} />
              </button>
            )}
            <button
              type="button"
              className="app-detail-primary-cta flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-[#18181b] px-8 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
            >
              {appStatus === "using" || appStatus === "admin" ? "앱 열기" : "받기"}
            </button>
            {appStatus === "using" || appStatus === "admin" ? (
              <div className="flex w-full items-start gap-2">
                <button
                  type="button"
                  onClick={handleRecommend}
                  aria-pressed={isRecommended}
                  className={`discovery-rec-btn flex h-12 min-w-0 flex-1 items-center justify-center gap-1 overflow-hidden whitespace-nowrap rounded-[40px] border px-8 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors ${
                    isRecommended
                      ? "discovery-rec-btn-active border-transparent bg-[rgba(251,176,59,0.2)] hover:bg-[rgba(251,176,59,0.28)]"
                      : "border-[#e4e4e7] bg-white hover:bg-[#f6f7f9]"
                  }`}
                >
                  <span key={thumbAnimKey} className="thumb-bounce inline-flex">
                    <ThumbsUpIcon size={16} active={isRecommended} />
                  </span>
                  추천
                </button>
                <button
                  type="button"
                  className="discovery-cancel-btn flex h-12 min-w-0 flex-1 items-center justify-center overflow-hidden whitespace-nowrap rounded-[40px] bg-[#f6f6f6] px-8 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                >
                  사용해제
                </button>
              </div>
            ) : (
              <p className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                {isInlineLockApp ? "바로 사용" : "승인 필요"}
              </p>
            )}
          </div>
        </div>

        {/* 통계: 사용자 / 추천 / 댓글 / 발행일 */}
        <div className="app-detail-stat-bar flex w-full items-stretch border-y border-[#e4e4e7] bg-white">
          <StatCell label="사용자" value="14" />
          <StatDivider />
          <StatCell label="추천" value="8" />
          <StatDivider />
          <StatCell label="댓글" value="3" />
          <StatDivider />
          <StatCell label="발행일" value="26.04.07" labelColor="#a1a1aa" />
        </div>

        {/* 본문: 좌측 섹션 + 우측 TOC */}
        <div className="flex w-full items-start gap-[60px]">
          <div className="flex min-w-0 flex-1 flex-col gap-20">
            {/* ABOUT */}
            <section id="about" className="flex w-full scroll-mt-10 flex-col gap-5">
              <SectionHeader tag="ABOUT" title="앱 소개" />
              <div className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">
                <p>
                  Claude Code를 사용하는 팀원들의 일일 토큰 소비량과 요청 수를 자동으로 집계합니다. 계정·프로젝트·언어별로 필터링해서
                  어디에 비용이 쓰이는지, 어떤 팀이 빠르게 도입하고 있는지 한눈에 파악할 수 있어요.
                </p>
                <p>&nbsp;</p>
                <ul className="list-disc pl-6">
                  <li>일·주·월 단위 사용량 집계와 추세 비교</li>
                  <li>팀별 한도 설정과 80% 도달 시 자동 슬랙 알림</li>
                  <li>월간 비용 리포트 PDF 자동 생성·메일 발송</li>
                  <li>Anthropic Console 토큰 키 단방향 검증 (Read-only)</li>
                </ul>
              </div>
            </section>

            {/* OVERVIEW */}
            <section id="overview" className="flex w-full scroll-mt-10 flex-col gap-5">
              <SectionHeader tag="OVERVIEW" title="한 눈에 보기" />
              <div className="app-detail-info-card flex flex-col gap-5 rounded-[20px] border border-[rgba(82,82,91,0.08)] p-7">
                <KeyValueRow label="접근" value={isPrivateApp ? "비공개 (초대받은 사용자만)" : "공개 (승인없이 누구나)"} />
                <KeyValueRow label="심사" value="심사 완료" />
                <KeyValueRow label="카테고리" value={category} />
                <KeyValueRow label="발행팀" value="안승원" />
                <KeyValueRow label="라이선스" value="사내 전용" />
                <KeyValueRow label="최근 업데이트" value="2026. 04. 29" />
              </div>
            </section>

            {/* DATA FLOW */}
            <section id="data-flow" className="flex w-full scroll-mt-10 flex-col gap-5">
              <SectionHeader tag="DATA FLOW" title="데이터 사용 관계" />
              <div className="flex w-full items-start gap-5">
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <div className="flex flex-col">
                    <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">업스트림 앱</p>
                    <p className="text-sm leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                      <span className="font-semibold">{appName}</span>
                      <span className="font-normal">가 아래 앱 데이터를 쓰고 있어요</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    {upstreamApps.map((app) => (
                      <div
                        key={app.name}
                        className="flex w-full items-center gap-3 rounded-2xl bg-[#f6f7f9] p-3"
                      >
                        <div
                          className="size-8 shrink-0 rounded-lg"
                          style={{ backgroundColor: app.color }}
                        />
                        <div className="flex min-w-0 flex-col gap-1">
                          <p className="truncate text-sm font-medium leading-[1.5] tracking-[-0.14px] text-black">
                            {app.name}
                          </p>
                          <p className="truncate text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">
                            {app.category}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex min-w-0 flex-1 flex-col gap-4">
                  <div className="flex flex-col">
                    <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">다운스트림 앱</p>
                    <p className="text-sm leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                      <span className="font-normal">아래 앱이 </span>
                      <span className="font-semibold">{appName}</span>
                      <span className="font-normal"> 데이터를 쓰고 있어요</span>
                    </p>
                  </div>
                  <div className="flex h-[134px] w-full items-center justify-center rounded-2xl bg-[#f6f7f9] p-3">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Image
                        src="/icons/version-b/empty-stack.svg"
                        alt=""
                        width={52}
                        height={48}
                        aria-hidden="true"
                        className="empty-stack-light"
                      />
                      <Image
                        src="/icons/version-b/empty-stack-dark.svg"
                        alt=""
                        width={52}
                        height={48}
                        aria-hidden="true"
                        className="empty-stack-dark"
                      />
                      <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                        연결된 앱이 없어요
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* PERMISSIONS */}
            <section id="permissions" className="flex w-full scroll-mt-10 flex-col gap-5">
              <SectionHeader tag="PERMISSIONS" title="권한 및 데이터" subtitle="앱 실행 시 적용되는 기본 접근 조건입니다" />
              <div className="app-detail-info-card flex flex-col gap-5 rounded-[20px] border border-[rgba(82,82,91,0.08)] p-7">
                <KeyValueRow label="인증 방식" value="선택 인증" />
                <KeyValueRow label="DB Schema" value="jocodingax_ai_ccrank" />
                <KeyValueRow label="공유 테이블" value="0" />
                <KeyValueRow label="API 호출" value="818,271" />
                <KeyValueRow label="데이터 스코프" value="read, write" />
              </div>
            </section>

            {/* REVIEW */}
            <section id="review" className="flex w-full scroll-mt-10 flex-col gap-5">
              <SectionHeader tag="REVIEW" title="동료들이 남긴 한마디" subtitle={`${reviews.length}개`} />
              {appStatus === "using" && (
                <div className={`review-input-container flex w-full min-h-12 ${reviewExpanded ? "items-end" : "items-center"} gap-4 overflow-hidden rounded-[28px] border border-[#e4e4e7] bg-[#fafafa] px-4 py-3 transition-colors focus-within:border-[#18181b]`}>
                  <div className={`flex min-w-0 flex-1 ${reviewExpanded ? "items-end" : "items-center"} gap-2.5 overflow-hidden pl-2`}>
                    <textarea
                      ref={reviewTextareaRef}
                      rows={1}
                      value={reviewInput}
                      onChange={(e) => setReviewInput(e.target.value.slice(0, 500))}
                      placeholder="이 앱에 대한 한 마디를 남겨주세요"
                      maxLength={500}
                      className="min-w-0 flex-1 resize-none overflow-hidden bg-transparent p-0 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] outline-none placeholder:text-[#71717a]"
                    />
                    <p className="shrink-0 whitespace-nowrap text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                      {reviewInput.length}/500
                    </p>
                  </div>
                  <button
                    type="button"
                    aria-label="댓글 등록"
                    disabled={reviewInput.length === 0}
                    className="review-send-btn group relative size-8 shrink-0 overflow-hidden rounded-full bg-[#18181b] transition-opacity hover:opacity-90 disabled:hover:opacity-100"
                  >
                    <SendIcon />
                    <span
                      aria-hidden="true"
                      className="review-send-overlay pointer-events-none absolute inset-0 rounded-full bg-white/70 transition-opacity group-enabled:opacity-0"
                    />
                  </button>
                </div>
              )}
              <div className="flex w-full flex-col">
                {reviews.map((r) => (
                  <div
                    key={r.name}
                    className="app-detail-review-card flex w-full items-start gap-3 border-b border-[rgba(82,82,91,0.08)] py-5"
                  >
                    <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
                      <Image src={r.avatar} alt="" fill sizes="32px" className="object-cover" />
                    </div>
                    <div className="flex min-w-0 flex-1 flex-col gap-2">
                      <div className="flex items-end gap-2">
                        <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">{r.name}</p>
                        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{r.time}</p>
                      </div>
                      <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{r.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 우측 TOC */}
          <nav className="sticky top-0 flex w-[220px] shrink-0 flex-col self-start py-5">
            {/* ON THIS PAGE 헤더 */}
            <div className="flex items-center px-5 py-2">
              <p className="text-sm font-bold leading-[1.5] tracking-[-0.14px] text-[#2D64FA]">
                ON THIS PAGE
              </p>
            </div>
            {/* 메뉴 (좌측 가이드 라인 + 슬라이딩 인디케이터 + 아이템들) */}
            <div className="relative flex flex-col">
              <span
                aria-hidden="true"
                className="app-detail-toc-rail pointer-events-none absolute bottom-2 left-0.5 top-2 w-px bg-[#e4e4e7]"
              />
              <span
                aria-hidden="true"
                className="app-detail-toc-indicator pointer-events-none absolute left-0 top-0 h-[21px] w-1 rounded-full bg-[#2D64FA] transition-transform duration-300 ease-out"
                style={{ transform: `translateY(${indicatorTop}px)` }}
              />
              {TOC.map((item) => {
                const isActive = activeSection === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    ref={(el) => {
                      buttonRefs.current[item.id] = el;
                    }}
                    onClick={() => scrollToSection(item.id)}
                    className="group relative flex w-full items-center gap-4 py-2 text-left"
                  >
                    <span aria-hidden="true" className="h-[21px] w-1 shrink-0" />
                    <span
                      className={`text-sm leading-[1.5] tracking-[-0.14px] transition-colors duration-200 ${
                        isActive
                          ? "font-semibold text-[#18181b]"
                          : "font-normal text-[#a1a1aa] group-hover:text-[#3f3f46]"
                      }`}
                    >
                      {item.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}

function StatCell({ label, value, labelColor = "#71717a" }: { label: string; value: string; labelColor?: string }) {
  return (
    <div className="flex h-[120px] min-w-0 flex-1 flex-col items-start justify-center gap-2 overflow-hidden p-7">
      <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px]" style={{ color: labelColor }}>
        {label}
      </p>
      <p className="text-[32px] font-semibold leading-[1.2] text-[#3f3f46]">{value}</p>
    </div>
  );
}

function StatDivider() {
  return <div className="app-detail-stat-divider w-px shrink-0 self-stretch bg-[#e4e4e7]" aria-hidden="true" />;
}

function SectionHeader({ tag, title, subtitle }: { tag: string; title: string; subtitle?: string }) {
  return (
    <div className="flex w-full flex-col gap-1">
      <p className="text-sm font-bold leading-[1.5] tracking-[-0.14px] text-[#2D64FA]">{tag}</p>
      <p className="text-[22px] font-bold leading-[1.3] tracking-[-0.22px] text-[#3f3f46]">{title}</p>
      {subtitle && (
        <p className="pt-2 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">{subtitle}</p>
      )}
    </div>
  );
}

function ThumbsUpIcon({ size = 16, active = false }: { size?: number; active?: boolean }) {
  if (active) {
    return (
      <svg width={size} height={size} viewBox="0 0 12 13" fill="none" aria-hidden="true">
        <path
          d="M8.04488 13C7.84184 13 7.62472 12.9867 7.39219 12.9575L0 11.6999V5.84963L2.90466 4.26227C2.90466 4.26227 5.23941 0.00651752 5.23963 0.00651752C6.83972 -0.0757481 7.96338 0.612662 7.45772 2.53326C7.30459 3.11482 7.10122 3.89954 7.10122 3.89954H9.40725C10.2148 3.89954 10.9177 4.20651 11.3875 4.7299C11.9015 5.30281 12.1018 6.10075 11.9511 6.97709L11.9497 6.98154C11.809 7.7655 11.4317 9.81839 10.9774 10.9553C10.7442 11.5374 10.1592 13 8.04488 13Z"
          fill="#FBB03B"
        />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 12 13" fill="none" aria-hidden="true">
      <path
        d="M5.53809 0.5C6.13821 0.507455 6.55644 0.652274 6.79199 0.878906C7.02918 1.10715 7.20207 1.5423 6.97461 2.40625C6.89788 2.69767 6.80829 3.03963 6.73828 3.30859C6.70326 3.44314 6.67285 3.55985 6.65137 3.64258C6.64067 3.68377 6.63183 3.7167 6.62598 3.73926C6.62312 3.75028 6.62066 3.75878 6.61914 3.76465C6.61844 3.76736 6.61855 3.76999 6.61816 3.77148L6.61719 3.77344V3.77441L6.45508 4.39941H9.40723C10.0867 4.39941 10.6496 4.65578 11.0156 5.06348C11.411 5.50419 11.5874 6.14072 11.458 6.89258V6.89355C11.3143 7.69417 10.9441 9.69004 10.5127 10.7695C10.3971 11.0581 10.2237 11.4825 9.86328 11.8418C9.51838 12.1857 8.97112 12.5 8.04492 12.5C7.86384 12.5 7.66713 12.4877 7.4541 12.4609H7.45312L0.5 11.2773V6.14551L3.14453 4.70117L3.27246 4.63086L3.34375 4.50195L3.34961 4.49023C3.35401 4.48221 3.36069 4.47047 3.36914 4.45508C3.38621 4.42396 3.41152 4.37835 3.44336 4.32031C3.5072 4.20394 3.59857 4.03738 3.70801 3.83789L5.31348 0.912109C5.40241 0.750019 5.47813 0.609249 5.53809 0.5Z"
        stroke="currentColor"
      />
    </svg>
  );
}

function ArrowRightIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12.5 10.5" fill="none" aria-hidden="true">
      <path
        d="M6.71973 0.21967C7.01262 -0.0732233 7.48738 -0.0732233 7.78027 0.21967L12.2803 4.71967C12.3114 4.75084 12.3388 4.78442 12.3633 4.81928C12.3946 4.86386 12.4212 4.91184 12.4424 4.96283C12.4631 5.01284 12.4779 5.06453 12.4873 5.11713C12.495 5.16023 12.5 5.20463 12.5 5.24994C12.5 5.29538 12.4941 5.33954 12.4863 5.38276C12.4855 5.38729 12.4853 5.39191 12.4844 5.39643C12.4804 5.4162 12.4732 5.43487 12.4678 5.45404C12.46 5.48156 12.4534 5.50942 12.4424 5.53608C12.4213 5.58703 12.3936 5.63409 12.3623 5.67865C12.3376 5.71376 12.3117 5.74884 12.2803 5.78022L7.78027 10.2802C7.4874 10.573 7.0126 10.573 6.71973 10.2802C6.42686 9.98736 6.42693 9.51257 6.71973 9.21967L9.93945 5.99994H0.75C0.335849 5.99994 0.000102031 5.66407 0 5.24994C0 4.83573 0.335786 4.49994 0.75 4.49994H9.93945L6.71973 1.28022C6.42686 0.987355 6.42693 0.512571 6.71973 0.21967Z"
        fill="currentColor"
      />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="absolute inset-0">
      <path
        d="M22.9606 10.6592C22.9606 10.6592 22.9606 10.6659 22.9606 10.6692L19.0631 23.5249C19.0041 23.7337 18.8827 23.9194 18.7151 24.0572C18.5475 24.195 18.3418 24.2783 18.1255 24.2958C18.0947 24.2985 18.0639 24.2998 18.0331 24.2998C17.8305 24.3004 17.6319 24.2431 17.4608 24.1345C17.2897 24.0259 17.1532 23.8706 17.0674 23.687L14.6298 18.6838C14.6054 18.6336 14.5973 18.5771 14.6065 18.5221C14.6158 18.4671 14.6419 18.4164 14.6814 18.377L18.5602 14.4977C18.6564 14.3964 18.7093 14.2615 18.7075 14.1218C18.7057 13.982 18.6494 13.8485 18.5506 13.7497C18.4518 13.6509 18.3183 13.5946 18.1786 13.5928C18.0389 13.5911 17.904 13.6439 17.8028 13.7402L13.9219 17.6195C13.8825 17.6589 13.8318 17.6851 13.7768 17.6943C13.7219 17.7036 13.6654 17.6955 13.6152 17.6711L8.60802 15.2338C8.41221 15.1398 8.24958 14.9886 8.14166 14.8001C8.03374 14.6116 7.98564 14.3948 8.00372 14.1783C8.0218 13.9619 8.10522 13.756 8.24292 13.5881C8.38062 13.4201 8.56609 13.298 8.77477 13.2378L21.6286 9.33975H21.6387C21.8217 9.28832 22.0151 9.28652 22.199 9.33452C22.383 9.38253 22.5508 9.47861 22.6854 9.61291C22.82 9.74721 22.9164 9.9149 22.9647 10.0988C23.0131 10.2826 23.0117 10.4761 22.9606 10.6592Z"
        fill="#F6F7F9"
      />
    </svg>
  );
}

function KeyValueRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex w-full items-center gap-5">
      <p className="w-[84px] shrink-0 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#71717a]">
        {label}
      </p>
      <p className="min-w-0 flex-1 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">
        {value}
      </p>
    </div>
  );
}

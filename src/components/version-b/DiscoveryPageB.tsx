"use client";

import { Fragment, useState, useEffect, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import PageSidebar from "./PageSidebar";
import AppDetailView from "./AppDetailView";
import NotificationButton from "./NotificationButton";
import { useDarkMode } from "@/hooks/useDarkMode";

type ViewMode = "스토어" | "그리드" | "리스트";
type RequestMode = "instant" | "approval";

const REQUEST_MODAL_COPY: Record<RequestMode, { title1: string; title2: string; confirmLabel: string; thumbGradient: string }> = {
  instant: {
    title1: "이 앱은 승인없이 바로 사용할 수 있어요",
    title2: "사용할까요?",
    confirmLabel: "받기",
    thumbGradient: "linear-gradient(135deg, #9B7AB8 0%, #5B3D7A 100%)",
  },
  approval: {
    title1: "이 앱은 관리자의 승인이 필요해요",
    title2: "신청할까요?",
    confirmLabel: "신청",
    thumbGradient: "linear-gradient(135deg, #D68FBB 0%, #B86397 100%)",
  },
};

// 앱 이름 기반 모드 결정 (deterministic, 같은 앱은 항상 같은 모드)
const pickRequestMode = (name: string): RequestMode => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = (hash * 31 + name.charCodeAt(i)) | 0;
  return hash % 2 === 0 ? "instant" : "approval";
};

const TOAST_COPY: Record<RequestMode, { title: string; desc: string }> = {
  instant: {
    title: "받기를 완료했어요!",
    desc: "이제 앱을 사용해 보세요",
  },
  approval: {
    title: "관리자에게 앱 신청을 보냈어요!",
    desc: "신청이 승인되면 알려드릴게요",
  },
};

const CANCEL_TOAST_COPY: Record<RequestMode, { title: string }> = {
  instant: { title: "앱 받기를 취소했어요" },
  approval: { title: "앱 신청을 취소했어요" },
};

const popularApps = [
  { name: "경비 정산 자동화", category: "공용", recommends: 312, comments: 822, desc: "출장 영수증을 사진으로 찍으면 자동으로 정리해주는 앱이에요" },
  { name: "스마트 캘린더", category: "업무", recommends: 287, comments: 654, desc: "팀 일정과 회의실 예약을 한 번에 관리할 수 있어요" },
  { name: "매출 대시보드", category: "데이터", recommends: 245, comments: 412, desc: "실시간 매출 데이터를 한눈에 확인할 수 있는 대시보드예요" },
  { name: "AI 문서 요약", category: "업무", recommends: 231, comments: 389, desc: "긴 문서를 3줄로 요약해주는 AI 도구입니다" },
  { name: "회의록 자동화", category: "업무", recommends: 218, comments: 356, desc: "회의 음성을 텍스트로 변환하고 요약해줘요" },
  { name: "사내 위키", category: "공용", recommends: 198, comments: 312, desc: "팀의 지식을 한 곳에 모으는 위키 도구예요" },
  { name: "출장비 정산", category: "경영재무", recommends: 182, comments: 298, desc: "출장 영수증과 카드 사용 내역을 자동으로 정리합니다" },
  { name: "데이터 시각화", category: "데이터", recommends: 165, comments: 271, desc: "복잡한 데이터를 한눈에 보이는 차트로 변환해요" },
  { name: "API 모니터링", category: "개발", recommends: 148, comments: 234, desc: "API 호출 상태를 실시간으로 모니터링합니다" },
  { name: "휴가 신청 봇", category: "공용", recommends: 132, comments: 201, desc: "Slack에서 바로 휴가 신청과 결재가 가능해요" },
];

const newApps = [
  { name: "AI 문서 요약", category: "업무", creator: "박민영", color: "#7AA3D4", desc: "긴 문서를 3줄로 요약해주는 AI 도구입니다" },
  { name: "회의록 자동화", category: "업무", creator: "송재희", color: "#FBBB45", desc: "회의 음성을 텍스트로 변환하고 요약해줘요" },
  { name: "출장비 정산", category: "경영재무", creator: "안승원", color: "#1fa24e", desc: "출장 영수증과 카드 사용 내역을 자동으로 정리합니다" },
  { name: "디자인 토큰 매니저", category: "디자인", creator: "이지은", color: "#E765BE", desc: "Figma와 코드의 디자인 토큰을 자동으로 동기화해요" },
  { name: "코드 리뷰 어시스턴트", category: "개발", creator: "김도현", color: "#5B3D7A", desc: "PR을 분석해 리뷰 코멘트를 자동으로 제안합니다" },
  { name: "마케팅 캠페인 트래커", category: "마케팅", creator: "정수빈", color: "#FF7A45", desc: "캠페인 성과를 실시간으로 추적하고 리포트해요" },
  { name: "팀 무드 체크", category: "공용", creator: "최유나", color: "#34A8E5", desc: "매주 팀원들의 컨디션을 익명으로 수집합니다" },
  { name: "보안 점검 도구", category: "보안", creator: "한승호", color: "#EF4444", desc: "취약점을 자동으로 스캔하고 리포트를 만들어요" },
  { name: "고객 피드백 분석", category: "데이터", creator: "윤하늘", color: "#22C55E", desc: "VOC 데이터를 카테고리별로 자동 분류합니다" },
  { name: "온보딩 가이드 봇", category: "HR", creator: "강민준", color: "#9F63CF", desc: "신규 입사자에게 단계별 안내를 제공해요" },
];

export default function DiscoveryPageB() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [activeTeam, setActiveTeam] = useState<"JO" | "DE">("JO");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();
  const [selectedApp, setSelectedApp] = useState<{ name: string; category: string; isAdmin?: boolean; status?: string } | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("스토어");
  const [requestApp, setRequestApp] = useState<{ name: string; category: string; mode: RequestMode } | null>(null);
  const [toastMode, setToastMode] = useState<RequestMode | null>(null);
  const [cancelToastMode, setCancelToastMode] = useState<RequestMode | null>(null);

  const handleInstantRequest = (name: string, category: string) => {
    setRequestApp({ name, category, mode: "instant" });
  };

  const handleApprovalRequest = (name: string, category: string) => {
    setRequestApp({ name, category, mode: "approval" });
  };

  const handleConfirmRequest = () => {
    if (!requestApp) return;
    const mode = requestApp.mode;
    setRequestApp(null);
    setToastMode(mode);
  };

  // 토스트 자동 닫힘
  useEffect(() => {
    if (!toastMode) return;
    const t = setTimeout(() => setToastMode(null), 4500);
    return () => clearTimeout(t);
  }, [toastMode]);

  // 취소 토스트 자동 닫힘
  useEffect(() => {
    if (!cancelToastMode) return;
    const t = setTimeout(() => setCancelToastMode(null), 4500);
    return () => clearTimeout(t);
  }, [cancelToastMode]);

  const handleToastCancel = () => {
    if (toastMode) setCancelToastMode(toastMode);
  };

  // URL → state 동기화 (초기 진입 및 뒤로가기)
  useEffect(() => {
    const appName = searchParams.get("app");
    const category = searchParams.get("category");

    if (appName && category) {
      const status = searchParams.get("status") || undefined;
      setSelectedApp({ name: appName, category, isAdmin: appName === "경비 정산 자동화", status });
    } else {
      setSelectedApp(null);
    }
  }, [searchParams]);

  // 앱 선택 시 URL 변경
  const selectApp = (name: string, category: string, status?: string) => {
    const params = new URLSearchParams();
    params.set("app", name);
    params.set("category", category);
    if (status) params.set("status", status);
    router.push(`/discovery?${params.toString()}`);
  };

  // 뒤로가기 (앱 상세 → 목록)
  const deselectApp = () => {
    router.push(`/discovery`);
  };

  return (
    <div
      className={`flex h-screen w-full items-start overflow-hidden${darkMode ? " dark-mode" : ""}`}
      style={{
        backgroundColor: darkMode ? "#0C0A12" : "#130321",
        "--page-primary": darkMode ? "#6E4A94" : "#5B3D7A",
      } as React.CSSProperties}
      data-node-id="2504:1034"
    >
      {/* L. Global Nav (팀 프로필 셀렉터) */}
      <div className="flex h-full w-[76px] shrink-0 flex-col items-center justify-between">
        <div className="flex w-full flex-col items-center gap-4 px-3 py-4">
          {(["JO", "DE"] as const).map((team) => {
            const isActive = activeTeam === team;
            return (
              <button
                key={team}
                type="button"
                onClick={() => setActiveTeam(team)}
                className={`relative flex size-11 items-center justify-center overflow-hidden rounded-xl bg-[#5B3D7A] p-1 transition-shadow ${isActive ? "shadow-[0px_0px_0px_1px_white]" : ""}`}
                aria-label={`팀 ${team}`}
              >
                <p className="flex-1 text-center text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">{team}</p>
                {!isActive && <span className="pointer-events-none absolute inset-0 rounded-xl bg-[rgba(24,24,27,0.48)]" />}
              </button>
            );
          })}
          <button type="button" aria-label="팀 추가" className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 5v14M5 12h14" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>
        <div className="flex w-full flex-col items-center gap-2 px-3 py-4">
          <button type="button" onClick={() => setDarkMode(!darkMode)} className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10" aria-label={darkMode ? "라이트모드로 전환" : "다크모드로 전환"}>
            <Image src={darkMode ? "/icons/version-b/nav-sun.svg" : "/icons/version-b/nav-moon.svg"} alt="" width={24} height={24} />
          </button>
          <NotificationButton />
          <div className="relative">
            <button type="button" onClick={() => setProfileOpen(!profileOpen)} className="relative size-10 overflow-hidden rounded-full transition-opacity hover:opacity-80" aria-label="프로필">
              <Image src="/icons/version-b/profile-new.png" alt="" fill sizes="40px" className="rounded-full object-cover" />
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
        <PageSidebar activeMenu="디스커버리" />
        {selectedApp ? (
          <div className="relative flex h-full min-w-0 flex-1 flex-col">
            {/* 헤더 (브레드크럼) */}
            <div className="flex h-[60px] w-full shrink-0 items-center overflow-hidden rounded-tr-2xl border-b border-[rgba(82,82,91,0.08)] bg-white px-5">
              <Breadcrumb
                crumbs={[
                  { label: "디스커버리", onClick: deselectApp },
                  { label: selectedApp.name },
                ]}
              />
            </div>
            {/* 본문 */}
            <div className="flex h-full flex-1 min-h-0 flex-col gap-6 overflow-y-auto rounded-br-2xl border-r border-gray-100 bg-white p-6">
              <AppDetailView
                appName={selectedApp.name}
                category={selectedApp.category}
                fromMenu="디스커버리"
                onBack={deselectApp}
                isAdmin={selectedApp.isAdmin}
                appStatus={selectedApp.status}
              />
            </div>
          </div>
        ) : (
          <DiscoveryContent
            viewMode={viewMode}
            setViewMode={setViewMode}
            onAppClick={selectApp}
            onInstantRequest={handleInstantRequest}
            onApprovalRequest={handleApprovalRequest}
          />
        )}
      </div>

      {/* 받기/신청 모달 */}
      {requestApp && (
        <RequestModal
          app={requestApp}
          mode={requestApp.mode}
          onCancel={() => setRequestApp(null)}
          onConfirm={handleConfirmRequest}
        />
      )}

      {/* 취소 알림 토스트 (위에 표시) */}
      <CancelToast mode={cancelToastMode} topOffset={40} />

      {/* 받기/신청 완료 토스트 (취소 토스트 표시 시 아래로 이동) */}
      <Toast
        mode={toastMode}
        onCancel={handleToastCancel}
        topOffset={cancelToastMode ? 112 : 40}
        canceled={cancelToastMode !== null}
      />
    </div>
  );
}

interface RequestModalProps {
  app: { name: string; category: string };
  mode: RequestMode;
  onCancel: () => void;
  onConfirm: () => void;
}

function RequestModal({ app, mode, onCancel, onConfirm }: RequestModalProps) {
  const copy = REQUEST_MODAL_COPY[mode];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
      onClick={onCancel}
    >
      <div
        className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          animation: "modalScaleIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* 타이틀 */}
        <div className="w-full">
          <p className="text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">{copy.title1}</p>
          <p className="text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">{copy.title2}</p>
        </div>

        {/* 앱 정보 카드 */}
        <div className="flex w-full flex-col items-start justify-center gap-5 rounded-[20px] bg-[#f9f9f9] p-5">
          <div className="flex w-full items-center gap-5">
            <div
              className="size-16 shrink-0 rounded-xl"
              style={{ backgroundImage: copy.thumbGradient }}
            />
            <div className="flex min-w-0 flex-1 flex-col gap-1 py-0.5">
              <p className="truncate text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">{app.name}</p>
              <p className="truncate text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">{app.category}</p>
            </div>
          </div>
          <div className="h-px w-full bg-[#e4e4e7]" />
          <div className="flex w-full flex-col items-start gap-1">
            <p className="w-full text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">조직 : 조코딩AX파트너스</p>
            <p className="w-full text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">계정 : 박민영, minion@jocodingax.ai</p>
          </div>
        </div>

        {/* 버튼 */}
        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#f6f6f6] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
          >
            {copy.confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}

function Toast({ mode, onCancel, topOffset, canceled }: { mode: RequestMode | null; onCancel: () => void; topOffset: number; canceled: boolean }) {
  // 토스트가 닫혀도 슬라이드 아웃 동안 마지막 콘텐츠를 유지하기 위해 ref/state로 캐싱
  const [lastMode, setLastMode] = useState<RequestMode | null>(mode);
  useEffect(() => {
    if (mode) setLastMode(mode);
  }, [mode]);

  const copy = lastMode ? TOAST_COPY[lastMode] : null;
  const visible = mode !== null;

  return (
    <div
      className={`fixed right-10 z-50 transition-all duration-[400ms] ease-out ${
        visible ? "pointer-events-auto translate-x-0" : "pointer-events-none translate-x-[calc(100%+40px)]"
      }`}
      style={{ top: `${topOffset}px` }}
    >
      <div
        className="flex w-[400px] items-center gap-3 overflow-hidden rounded-2xl bg-white px-4"
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          minHeight: "56px",
        }}
      >
        <div className="flex shrink-0 items-center py-3.5">
          <Image src="/icons/version-b/check-circle.svg" alt="" width={22} height={22} />
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center py-[11.5px]">
          <p className={`w-full text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#1fa24e] transition-all ${canceled ? "line-through opacity-60" : ""}`}>
            {copy?.title}
          </p>
          <p className={`w-full text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a] transition-all ${canceled ? "line-through opacity-60" : ""}`}>
            {copy?.desc}
          </p>
        </div>
        <button
          type="button"
          onClick={onCancel}
          disabled={canceled}
          className="flex h-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[#e4e4e7] bg-white px-5 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#f4f4f5] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          취소
        </button>
      </div>
    </div>
  );
}

function CancelToast({ mode, topOffset }: { mode: RequestMode | null; topOffset: number }) {
  const [lastMode, setLastMode] = useState<RequestMode | null>(mode);
  useEffect(() => {
    if (mode) setLastMode(mode);
  }, [mode]);

  const copy = lastMode ? CANCEL_TOAST_COPY[lastMode] : null;
  const visible = mode !== null;

  return (
    <div
      className={`fixed right-10 z-50 transition-all duration-[400ms] ease-out ${
        visible ? "translate-x-0" : "pointer-events-none translate-x-[calc(100%+40px)]"
      }`}
      style={{ top: `${topOffset}px` }}
    >
      <div
        className="flex w-[400px] items-center gap-3 overflow-hidden rounded-2xl bg-white px-4"
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          minHeight: "56px",
        }}
      >
        <div className="flex shrink-0 items-center py-3.5">
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <circle cx="11" cy="11" r="9" fill="#A1A1AA" />
            <path d="M7 11h8" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          </svg>
        </div>
        <div className="flex min-w-0 flex-1 flex-col items-start justify-center py-[11.5px]">
          <p className="w-full text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">{copy?.title}</p>
        </div>
      </div>
    </div>
  );
}

interface Crumb {
  label: string;
  onClick?: () => void;
}

function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <div className="flex items-center gap-1" data-node-id="4430:2092">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <Fragment key={i}>
            {!isLast && crumb.onClick ? (
              <button
                type="button"
                onClick={crumb.onClick}
                className="group flex shrink-0 items-center px-1"
              >
                <span className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a] transition-colors group-hover:text-[#18181b]">
                  {crumb.label}
                </span>
              </button>
            ) : (
              <div className="flex shrink-0 items-center px-1">
                <span
                  className={`overflow-hidden text-ellipsis whitespace-nowrap text-base leading-[1.5] tracking-[-0.16px] ${
                    isLast ? "font-semibold text-[#18181b]" : "font-normal text-[#71717a]"
                  }`}
                >
                  {crumb.label}
                </span>
              </div>
            )}
            {!isLast && (
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="shrink-0"
                aria-hidden="true"
              >
                <path
                  d="M6 3L11 8L6 13"
                  stroke="#71717a"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

interface DiscoveryContentProps {
  viewMode: ViewMode;
  setViewMode: (m: ViewMode) => void;
  onAppClick: (name: string, category: string, status?: string) => void;
  onInstantRequest: (name: string, category: string) => void;
  onApprovalRequest: (name: string, category: string) => void;
}

function DiscoveryContent({ viewMode, setViewMode, onAppClick, onInstantRequest, onApprovalRequest }: DiscoveryContentProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setShowScrollTop(el.scrollTop > 200);
  };

  const scrollToTop = () => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 탭 전환 시 스크롤 위치 + 버튼 상태 리셋
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setShowScrollTop(false);
  }, [viewMode]);

  return (
    <div className="relative flex h-full min-w-0 flex-1 flex-col">
      {/* 헤더 */}
      <div className="flex h-[60px] w-full shrink-0 items-center overflow-hidden rounded-tr-2xl border-b border-[rgba(82,82,91,0.08)] bg-white px-5">
        <Breadcrumb crumbs={[{ label: "디스커버리" }]} />
      </div>

      {/* 본문 (스크롤 컨테이너) */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="no-scrollbar flex w-full flex-1 min-h-0 flex-col overflow-x-hidden overflow-y-auto rounded-br-2xl border-r border-[#f6f6f6] bg-white"
      >
        {/* 콘텐츠 max-width 래퍼 (1441px+ 양옆 여백) */}
        <div className="mx-auto flex w-full flex-col gap-[60px] px-10 pt-10 pb-[120px] min-[1441px]:max-w-[1360px]">
        {/* 1. 타이틀 + 설명 + 탭 */}
        <div className="flex w-full shrink-0 flex-col gap-10">
          <div className="flex flex-col">
            <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">조코딩AX파트너스 사람들이</p>
            <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">지금 쓰는 앱.</p>
          </div>
          <div className="flex w-full items-center gap-10">
            <div className="flex flex-1 flex-col">
              <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#71717a]">38개의 앱이 등록되어 있어요</p>
              <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#71717a]">동료들이 만든 앱으로 업무를 더 빠르게 만드세요</p>
            </div>
            {/* 탭 토글 (슬라이딩 애니메이션) */}
            {(() => {
              const tabs = ["스토어", "그리드", "리스트"] as const;
              const activeIndex = tabs.indexOf(viewMode);
              return (
                <div className="relative flex shrink-0 items-center rounded-full bg-[#18181B] p-2">
                  {/* 슬라이딩 인디케이터 */}
                  <span
                    className="pointer-events-none absolute bottom-1 left-1 top-1 w-[98px] rounded-full bg-white transition-transform duration-300 ease-out"
                    style={{ transform: `translateX(${activeIndex * 90}px)` }}
                  />
                  {tabs.map((mode) => {
                    const isActive = viewMode === mode;
                    return (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setViewMode(mode)}
                        className="relative z-10 flex w-[90px] items-center justify-center px-3 py-2"
                      >
                        <span
                          className={`text-base leading-[1.5] tracking-[-0.16px] transition-colors duration-300 ${
                            isActive ? "font-semibold text-[#18181B]" : "font-medium text-white/60"
                          }`}
                        >
                          {mode}
                        </span>
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </div>

        {viewMode === "스토어" && (
        <div key="store" className="flex w-full shrink-0 flex-col gap-[60px]" style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
        {/* 2. 배너 */}
        <DiscoveryBanner onAppClick={onAppClick} />

        {/* 3. 인기 TOP10 */}
        <CarouselSection
          subtitle="동료들이 가장 많이 쓰는 앱"
          title="인기 TOP10"
          renderCard={(i) => {
            if (i === 9) {
              return <EmptyPopularCard key={i} rank={10} />;
            }
            const app = popularApps[i];
            return (
              <PopularCard
                key={i}
                rank={i + 1}
                app={app}
                onClick={() => onAppClick(app.name, app.category)}
                onRequest={() => {
                  const mode = pickRequestMode(app.name);
                  if (mode === "instant") onInstantRequest(app.name, app.category);
                  else onApprovalRequest(app.name, app.category);
                }}
              />
            );
          }}
          count={10}
        />

        {/* 4. 새로운 발견 */}
        <CarouselSection
          subtitle="최근 2주간 새로 나온 앱"
          title="새로운 발견"
          renderCard={(i) => {
            const app = newApps[i];
            return (
              <NewCard
                key={i}
                index={i}
                app={app}
                onClick={() => onAppClick(app.name, app.category)}
                onRequest={() => {
                  const mode = pickRequestMode(app.name);
                  if (mode === "instant") onInstantRequest(app.name, app.category);
                  else onApprovalRequest(app.name, app.category);
                }}
              />
            );
          }}
          count={10}
        />
        </div>
        )}

        {viewMode === "그리드" && (
          <div key="grid" className="w-full shrink-0" style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
            <GridView onAppClick={onAppClick} onInstantRequest={onInstantRequest} onApprovalRequest={onApprovalRequest} />
          </div>
        )}

        {viewMode === "리스트" && (
          <div key="list" className="w-full shrink-0" style={{ animation: "fadeSlideIn 0.35s ease-out" }}>
            <ListView onAppClick={onAppClick} onInstantRequest={onInstantRequest} onApprovalRequest={onApprovalRequest} />
          </div>
        )}
        </div>
      </div>

      {/* 스크롤 탑 플로팅 버튼 */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="맨 위로"
        data-node-id="4453:2448"
        className={`scroll-top-btn absolute bottom-6 left-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-[#18181b] p-2 text-white shadow-lg transition-all duration-200 hover:bg-[#27272a] ${
          showScrollTop
            ? "pointer-events-auto -translate-x-1/2 translate-y-0 opacity-100"
            : "pointer-events-none -translate-x-1/2 translate-y-2 opacity-0"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M16.0672 9.19219C16.0091 9.2503 15.9402 9.2964 15.8643 9.32785C15.7885 9.3593 15.7071 9.37549 15.625 9.37549C15.5429 9.37549 15.4615 9.3593 15.3857 9.32785C15.3098 9.2964 15.2409 9.2503 15.1828 9.19219L10.625 4.63359V16.875C10.625 17.0408 10.5592 17.1997 10.4419 17.3169C10.3247 17.4342 10.1658 17.5 10 17.5C9.83424 17.5 9.67527 17.4342 9.55806 17.3169C9.44085 17.1997 9.375 17.0408 9.375 16.875V4.63359L4.81719 9.19219C4.69991 9.30946 4.54085 9.37535 4.375 9.37535C4.20915 9.37535 4.05009 9.30946 3.93281 9.19219C3.81554 9.07491 3.74965 8.91585 3.74965 8.75C3.74965 8.58415 3.81554 8.42509 3.93281 8.30781L9.55781 2.68281C9.61586 2.6247 9.68479 2.5786 9.76066 2.54715C9.83654 2.5157 9.91787 2.49951 10 2.49951C10.0821 2.49951 10.1635 2.5157 10.2393 2.54715C10.3152 2.5786 10.3841 2.6247 10.4422 2.68281L16.0672 8.30781C16.1253 8.36586 16.1714 8.43479 16.2029 8.51066C16.2343 8.58654 16.2505 8.66787 16.2505 8.75C16.2505 8.83213 16.2343 8.91346 16.2029 8.98934C16.1714 9.06521 16.1253 9.13414 16.0672 9.19219Z" fill="currentColor" />
        </svg>
      </button>
    </div>
  );
}

const bannerApps = [
  { name: "경비 정산 자동화", category: "공용", desc: "송재희 님이 개발한 앱이 동료 135명에게 추천받았어요" },
  { name: "스마트 캘린더", category: "업무", desc: "이지은 님이 개발한 앱이 동료 121명에게 추천받았어요" },
  { name: "매출 대시보드", category: "데이터", desc: "박지훈 님이 개발한 앱이 동료 108명에게 추천받았어요" },
];

interface DiscoveryBannerProps {
  onAppClick: (name: string, category: string, status?: string) => void;
}

function DiscoveryBanner({ onAppClick }: DiscoveryBannerProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = bannerApps[activeIndex];

  // 5초마다 자동 전환 (수동 클릭 시 타이머 리셋)
  useEffect(() => {
    const t = setTimeout(() => {
      setActiveIndex((i) => (i + 1) % bannerApps.length);
    }, 5000);
    return () => clearTimeout(t);
  }, [activeIndex]);

  return (
    <div className="relative flex w-full shrink-0 items-center gap-5 overflow-hidden rounded-2xl bg-[#f6f6f6] p-10">
      {/* 장식 ellipse (피그마 자산) — stop-color는 globals.css에서 다크모드 분기 */}
      <svg
        width="800"
        height="300"
        viewBox="0 0 800 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="pointer-events-none absolute"
        style={{ right: "-369px", bottom: "-102px", maxWidth: "none" }}
        data-node-id="4181:1629"
        aria-hidden="true"
      >
        <ellipse cx="400" cy="150" rx="400" ry="150" fill="url(#banner-ellipse-gradient)" fillOpacity="0.2" />
        <defs>
          <radialGradient
            id="banner-ellipse-gradient"
            cx="0"
            cy="0"
            r="1"
            gradientUnits="userSpaceOnUse"
            gradientTransform="translate(400 150) rotate(90) scale(150 400)"
          >
            <stop className="banner-ellipse-center" />
            <stop offset="1" className="banner-ellipse-outer" />
          </radialGradient>
        </defs>
      </svg>
      {/* 좌측: 라벨 + 이름/설명 + 버튼 */}
      <div className="relative flex min-w-0 flex-1 flex-col items-start gap-10">
        <div key={activeIndex} className="flex w-full flex-col items-start gap-5" style={{ animation: "fadeSlideIn 0.3s ease-out" }}>
          <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#5B3D7A]">
            가장 많이 추천받은 앱 {activeIndex + 1}위
          </p>
          <div className="flex w-full flex-col items-start gap-2">
            <p className="w-full text-[32px] font-bold leading-[1.2] text-[#3f3f46]">{active.name}</p>
            <p className="w-full text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">{active.desc}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onAppClick(active.name, active.category)}
          className="inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-full px-6 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--page-primary)" }}
          data-node-id="4374:1958"
        >
          보러가기
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="shrink-0" aria-hidden="true">
            <path
              d="M12.773 9.39797L7.14797 15.023C7.09571 15.0752 7.03366 15.1167 6.96538 15.145C6.8971 15.1733 6.82391 15.1878 6.75 15.1878C6.67609 15.1878 6.6029 15.1733 6.53462 15.145C6.46634 15.1167 6.40429 15.0752 6.35203 15.023C6.29977 14.9707 6.25831 14.9087 6.23003 14.8404C6.20174 14.7721 6.18719 14.6989 6.18719 14.625C6.18719 14.5511 6.20174 14.4779 6.23003 14.4096C6.25831 14.3413 6.29977 14.2793 6.35203 14.227L11.5798 9L6.35203 3.77297C6.24648 3.66742 6.18719 3.52427 6.18719 3.375C6.18719 3.22573 6.24648 3.08258 6.35203 2.97703C6.45758 2.87148 6.60073 2.81219 6.75 2.81219C6.89927 2.81219 7.04242 2.87148 7.14797 2.97703L12.773 8.60203C12.8253 8.65427 12.8668 8.71631 12.8951 8.7846C12.9234 8.85288 12.9379 8.92608 12.9379 9C12.9379 9.07392 12.9234 9.14712 12.8951 9.2154C12.8668 9.28369 12.8253 9.34573 12.773 9.39797Z"
              fill="currentColor"
              data-node-id="4374:1961"
            />
          </svg>
        </button>
      </div>
      {/* 우측: 3개 앱 이름 리스트 */}
      <div className="relative flex w-[200px] shrink-0 flex-col items-start justify-center gap-5">
        {bannerApps.map((b, i) => (
          <button
            key={b.name}
            type="button"
            onClick={() => setActiveIndex(i)}
            className={`w-full overflow-hidden truncate text-left text-2xl font-bold leading-[1.2] transition-colors ${
              i === activeIndex ? "text-[#18181b]" : "text-[rgba(24,24,27,0.28)] hover:text-[rgba(24,24,27,0.5)]"
            }`}
          >
            {b.name}
          </button>
        ))}
      </div>
    </div>
  );
}

type AppStatus = "승인 필요" | "바로 사용" | "사용중" | "승인중";

const gridApps: { name: string; category: string; recommends: number; comments: number; desc: string; status: AppStatus }[] = [
  { name: "경비 정산 자동화", category: "백엔드", recommends: 312, comments: 822, desc: "출장 영수증을 사진으로 찍으면 OCR이 자동으로 항목을 분류하고 회계 시스템에 등록해주는 앱이에요", status: "승인 필요" },
  { name: "스마트 캘린더", category: "백엔드", recommends: 287, comments: 654, desc: "팀 일정과 회의실 예약을 한 번에 관리할 수 있어요", status: "바로 사용" },
  { name: "매출 대시보드", category: "디자인", recommends: 245, comments: 412, desc: "실시간 매출 데이터와 채널별 전환율을 한눈에 비교할 수 있는 대시보드를 제공합니다", status: "사용중" },
  { name: "AI 문서 요약", category: "개발도구", recommends: 198, comments: 380, desc: "긴 문서를 3줄로 요약해주는 AI 도구입니다", status: "승인중" },
  { name: "회의록 자동화", category: "자동화", recommends: 176, comments: 312, desc: "회의 음성을 자동으로 텍스트화하고 결정사항·할 일을 분리해 정리해드립니다", status: "바로 사용" },
  { name: "출장비 정산", category: "경영재무", recommends: 153, comments: 289, desc: "출장 영수증과 카드 사용 내역 자동 정리", status: "승인 필요" },
  { name: "데이터 시각화", category: "디자인", recommends: 132, comments: 250, desc: "복잡한 데이터를 한눈에 보이는 차트로 변환해요", status: "사용중" },
  { name: "사내 위키", category: "백엔드", recommends: 121, comments: 220, desc: "팀의 지식과 의사결정 기록을 한 곳에 모으고 검색까지 빠르게 할 수 있는 위키 도구예요", status: "바로 사용" },
  { name: "API 모니터링", category: "보안", recommends: 118, comments: 198, desc: "API 호출 상태를 실시간으로 모니터링합니다", status: "승인 필요" },
  { name: "보안 점검 도구", category: "보안", recommends: 105, comments: 175, desc: "취약점을 자동으로 스캔하고 우선순위별로 정리한 리포트를 슬랙으로 전송해줍니다", status: "사용중" },
  { name: "마케팅 캠페인", category: "마케팅", recommends: 98, comments: 156, desc: "캠페인 효과를 실시간으로 추적합니다", status: "바로 사용" },
  { name: "디자인 리뷰", category: "디자인", recommends: 92, comments: 134, desc: "디자인 시안을 팀과 함께 리뷰하는 도구", status: "승인중" },
];

const gridCategories = [
  { name: "전체", count: 38 },
  { name: "백엔드", count: 12 },
  { name: "디자인", count: 8 },
  { name: "경영재무", count: 1 },
  { name: "자동화", count: 3 },
  { name: "개발도구", count: 4 },
  { name: "보안", count: 5 },
  { name: "마케팅", count: 5 },
];

function CategoryTabs({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[value];
    if (!el) return;
    setIndicatorStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [value]);

  return (
    <div className="no-scrollbar relative flex w-full items-start gap-2 overflow-x-auto">
      {gridCategories.map((cat) => {
        const isActive = value === cat.name;
        return (
          <button
            key={cat.name}
            ref={(el) => {
              tabRefs.current[cat.name] = el;
            }}
            type="button"
            onClick={() => onChange(cat.name)}
            className="flex shrink-0 items-center gap-1 whitespace-nowrap border-b-2 border-transparent px-3 py-2"
          >
            <span
              className={`text-sm leading-[1.5] tracking-[-0.14px] transition-colors ${
                isActive ? "font-semibold text-[#5B3D7A]" : "font-normal text-[rgba(24,24,27,0.9)]"
              }`}
            >
              {cat.name}
            </span>
            <span
              className={`text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors ${
                isActive ? "text-[#5B3D7A]" : "text-[rgba(24,24,27,0.48)]"
              }`}
            >
              {cat.count}
            </span>
          </button>
        );
      })}
      <span
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-0 h-[2px] rounded-full"
        style={{
          width: indicatorStyle.width,
          transform: `translateX(${indicatorStyle.left}px)`,
          backgroundColor: "var(--page-primary)",
          transition:
            "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
    </div>
  );
}

function SearchBar({ value, onChange }: { value: string; onChange: (next: string) => void }) {
  return (
    <div className="flex w-full items-center gap-4 overflow-hidden rounded-full bg-[#f4f4f5] p-4" data-node-id="4181:1572">
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="shrink-0">
        <circle cx="9" cy="9" r="6" stroke="#71717a" strokeWidth="1.5" />
        <path d="M14 14L17 17" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="앱, 개발자를 검색하세요"
        className="min-w-0 flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] outline-none placeholder:text-[#a1a1aa]"
      />
      {value.length > 0 && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="검색어 지우기"
          className="flex shrink-0 items-center justify-center transition-opacity hover:opacity-80"
          data-node-id="4410:2063"
        >
          <Image src="/icons/version-b/search-clear.svg" alt="" width={24} height={24} />
        </button>
      )}
    </div>
  );
}

interface GridViewProps {
  onAppClick: (name: string, category: string, status?: string) => void;
  onInstantRequest: (name: string, category: string) => void;
  onApprovalRequest: (name: string, category: string) => void;
}

const SORT_OPTIONS = ["최신순", "오래된순", "추천순", "사용자순"] as const;
type SortOption = typeof SORT_OPTIONS[number];

function GridView({ onAppClick, onInstantRequest, onApprovalRequest }: GridViewProps) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortOption, setSortOption] = useState<SortOption>("최신순");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = activeCategory === "전체" ? gridApps : gridApps.filter((a) => a.category === activeCategory);

  return (
    <div className="flex w-full shrink-0 flex-col gap-5">
      {/* 검색 + 카테고리 그룹 */}
      <div className="flex w-full flex-col gap-3">
        {/* 검색 입력 */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* 카테고리 탭 */}
        <CategoryTabs value={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* 필터 + 그리드 그룹 */}
      <div className="flex w-full flex-col items-end gap-5">
        {/* 필터 칩 + 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className="filter-btn flex h-9 items-center justify-center gap-1 rounded-[10px] bg-[#f6f6f6] px-3 transition-colors hover:bg-[#ececec]"
          >
            <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#18181b]">
              {sortOption}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setSortOpen(false)} />
              <div
                className="absolute right-0 top-[calc(100%+4px)] z-40 flex w-[120px] flex-col overflow-hidden rounded-xl bg-white p-1"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)" }}
              >
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = sortOption === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSortOption(opt);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-[#f4f4f5] ${
                        isSelected ? "font-semibold text-[#5B3D7A]" : "font-normal text-[#3f3f46]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* 카드 그리드 */}
        <div className="grid w-full grid-cols-1 gap-5 min-[700px]:grid-cols-2 min-[993px]:grid-cols-3">
        {filteredApps.map((app) => {
          const handleNavigate = () => onAppClick(app.name, app.category);
          const handleRequest = (e: React.MouseEvent) => {
            e.stopPropagation();
            const mode = pickRequestMode(app.name);
            if (mode === "instant") onInstantRequest(app.name, app.category);
            else onApprovalRequest(app.name, app.category);
          };
          return (
          <div
            key={app.name}
            role="button"
            tabIndex={0}
            onClick={handleNavigate}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleNavigate();
              }
            }}
            className="flex cursor-pointer flex-col items-start justify-center gap-5 rounded-2xl bg-[#f9f9f9] p-5 text-left transition-transform duration-200 ease-out hover:scale-[1.03]"
          >
            <div className="flex w-full items-end gap-5">
              <div className="size-[80px] shrink-0 rounded-[12px] bg-[#e4e4e7]" />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">{app.category}</p>
                <p className="truncate text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-black">{app.name}</p>
              </div>
            </div>
            <p className="line-clamp-2 h-10 w-full text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{app.desc}</p>
            <div className="flex w-full items-end justify-between">
              <div className="flex h-5 items-center gap-4">
                <div className="flex items-center gap-1">
                  <Image src="/icons/version-b/thumb-up.svg" alt="" width={16} height={16} />
                  <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{app.recommends}</p>
                </div>
                <div className="flex items-center gap-1">
                  <Image src="/icons/version-b/person.svg" alt="" width={16} height={16} />
                  <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{app.comments}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRequest}
                className="flex h-8 w-[65px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
              >
                받기
              </button>
            </div>
          </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}

interface ListViewProps {
  onAppClick: (name: string, category: string, status?: string) => void;
  onInstantRequest: (name: string, category: string) => void;
  onApprovalRequest: (name: string, category: string) => void;
}

function ListView({ onAppClick, onInstantRequest, onApprovalRequest }: ListViewProps) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortOption, setSortOption] = useState<SortOption>("최신순");
  const [sortOpen, setSortOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredApps = activeCategory === "전체" ? gridApps : gridApps.filter((a) => a.category === activeCategory);

  return (
    <div className="flex w-full shrink-0 flex-col gap-5">
      {/* 검색 + 카테고리 그룹 */}
      <div className="flex w-full flex-col gap-3">
        {/* 검색 입력 */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* 카테고리 탭 */}
        <CategoryTabs value={activeCategory} onChange={setActiveCategory} />
      </div>

      {/* 필터 + 리스트 그룹 */}
      <div className="flex w-full flex-col items-end gap-5">
        {/* 필터 칩 + 드롭다운 */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setSortOpen((v) => !v)}
            className="filter-btn flex h-9 items-center justify-center gap-1 rounded-[10px] bg-[#f6f6f6] px-3 transition-colors hover:bg-[#ececec]"
          >
            <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#18181b]">
              {sortOption}
            </span>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`}
            >
              <path d="M5 7.5L10 12.5L15 7.5" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          {sortOpen && (
            <>
              <div className="fixed inset-0 z-30" onClick={() => setSortOpen(false)} />
              <div
                className="absolute right-0 top-[calc(100%+4px)] z-40 flex w-[120px] flex-col overflow-hidden rounded-xl bg-white p-1"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)" }}
              >
                {SORT_OPTIONS.map((opt) => {
                  const isSelected = sortOption === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setSortOption(opt);
                        setSortOpen(false);
                      }}
                      className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-sm leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-[#f4f4f5] ${
                        isSelected ? "font-semibold text-[#5B3D7A]" : "font-normal text-[#3f3f46]"
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </div>

        {/* 리스트 */}
        <div className="flex w-full flex-col gap-2">
          {filteredApps.map((app) => (
            <ListRow
              key={app.name}
              app={app}
              onClick={() => onAppClick(app.name, app.category, app.status)}
              onInstantRequest={() => onInstantRequest(app.name, app.category)}
              onApprovalRequest={() => onApprovalRequest(app.name, app.category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface ListRowProps {
  app: typeof gridApps[number];
  onClick: () => void;
  onInstantRequest: () => void;
  onApprovalRequest: () => void;
}

function ListRow({ app, onClick, onInstantRequest, onApprovalRequest }: ListRowProps) {
  const isOpen = app.status === "사용중" || app.status === "승인중";
  const buttonLabel = isOpen ? "열기" : "받기";
  const isDisabled = app.status === "승인중";
  const isInstant = app.status === "바로 사용";
  const isApproval = app.status === "승인 필요";

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isInstant) {
      onInstantRequest();
    } else if (isApproval) {
      onApprovalRequest();
    } else {
      onClick();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex h-24 w-full cursor-pointer items-center gap-5 rounded-2xl bg-[#f9f9f9] p-5 text-left transition-all duration-200 ease-out hover:scale-[1.01] hover:bg-[#f4f4f5]"
    >
      <div className="size-12 shrink-0 rounded-xl bg-[#e4e4e7]" />
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex items-center gap-2">
          <p className="truncate text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-black">{app.name}</p>
          <p className="shrink-0 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">{app.category}</p>
        </div>
        <p className="line-clamp-1 h-5 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{app.desc}</p>
      </div>
      <div className="flex shrink-0 items-center gap-5">
        <div className="flex items-center gap-1">
          <Image src="/icons/version-b/thumb-up.svg" alt="" width={16} height={16} />
          <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{app.recommends}</p>
        </div>
        <div className="flex items-center gap-1">
          <Image src="/icons/version-b/person.svg" alt="" width={16} height={16} />
          <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{app.comments}</p>
        </div>
        <div className="flex flex-col items-center justify-center gap-2">
          <button
            type="button"
            onClick={handleActionClick}
            disabled={isDisabled}
            className={`relative flex h-8 w-[65px] items-center justify-center overflow-hidden rounded-full text-sm font-semibold leading-[1.5] tracking-[-0.14px] transition-opacity ${
              isOpen ? "bg-[rgba(91,61,122,0.2)] text-[#5B3D7A] hover:opacity-80" : "bg-[#5B3D7A] text-white hover:opacity-90"
            } ${isDisabled ? "cursor-not-allowed" : ""}`}
          >
            {buttonLabel}
            {isDisabled && <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />}
          </button>
          <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{app.status}</p>
        </div>
      </div>
    </div>
  );
}

interface CarouselSectionProps {
  subtitle: string;
  title: string;
  renderCard: (index: number) => React.ReactNode;
  count: number;
}

function CarouselSection({ subtitle, title, renderCard, count }: CarouselSectionProps) {
  const PAGE_SIZE = 3;
  const totalSlides = Math.max(1, Math.ceil(count / PAGE_SIZE));
  const [slideIndex, setSlideIndex] = useState(0);

  const canPrev = slideIndex > 0;
  const canNext = slideIndex < totalSlides - 1;

  return (
    <div className="flex w-full shrink-0 flex-col gap-7">
      <div className="flex w-full items-end gap-1">
        <div className="flex flex-1 flex-col gap-1">
          <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">{subtitle}</p>
          <p className="text-[28px] font-semibold leading-[1.2] text-black">{title}</p>
        </div>
        <div className="flex shrink-0 items-end gap-2">
          <button
            type="button"
            aria-label="이전"
            onClick={() => canPrev && setSlideIndex((i) => i - 1)}
            disabled={!canPrev}
            className="pagination-arrow flex size-8 items-center justify-center overflow-hidden rounded-full border border-[#e4e4e7] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M11 4L6 9L11 14" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            aria-label="다음"
            onClick={() => canNext && setSlideIndex((i) => i + 1)}
            disabled={!canNext}
            className="pagination-arrow flex size-8 items-center justify-center overflow-hidden rounded-full border border-[#e4e4e7] transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M7 4L12 9L7 14" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>
      </div>
      <div className="w-full" style={{ overflowX: "clip", overflowY: "visible" }}>
        <div
          className="flex w-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${slideIndex * 100}%)` }}
        >
          {Array.from({ length: totalSlides }, (_, slideIdx) => {
            const slideStart = slideIdx * PAGE_SIZE;
            const slideEnd = Math.min(slideStart + PAGE_SIZE, count);
            return (
              <div
                key={slideIdx}
                className="grid w-full shrink-0 grid-cols-1 gap-5 min-[700px]:grid-cols-2 min-[993px]:grid-cols-3"
              >
                {Array.from({ length: slideEnd - slideStart }, (_, i) => renderCard(slideStart + i))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

interface PopularCardProps {
  rank: number;
  app: typeof popularApps[number];
  onClick: () => void;
  onRequest: () => void;
}

function PopularCard({ rank, app, onClick, onRequest }: PopularCardProps) {
  const handleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRequest();
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex cursor-pointer flex-col items-start justify-center gap-5 rounded-2xl bg-[#f9f9f9] p-5 text-left transition-transform duration-200 ease-out hover:scale-[1.03]"
    >
      <div className="flex w-full flex-col gap-2">
        <p className="text-[28px] font-bold leading-[1.2] text-[#5B3D7A]">{String(rank).padStart(2, "0")}</p>
        <div className="flex w-full items-center gap-5">
          <div className="size-[90px] shrink-0 rounded-xl bg-[#e4e4e7]" />
          <div className="flex min-w-0 flex-1 flex-col gap-2">
            <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">{app.category}</p>
            <p className="truncate text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-black">{app.name}</p>
            <p className="line-clamp-2 h-10 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{app.desc}</p>
          </div>
        </div>
      </div>
      <div className="flex w-full items-end justify-between">
        <div className="flex h-5 items-center gap-4">
          <div className="flex items-center gap-1">
            <Image src="/icons/version-b/thumb-up.svg" alt="" width={16} height={16} />
            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{app.recommends}</p>
          </div>
          <div className="flex items-center gap-1">
            <Image src="/icons/version-b/person.svg" alt="" width={16} height={16} />
            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{app.comments}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleRequest}
          className="flex h-8 w-[65px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
        >
          받기
        </button>
      </div>
    </div>
  );
}

function EmptyPopularCard({ rank }: { rank: number }) {
  return (
    <div
      className="flex h-full flex-col items-start rounded-2xl bg-[#f9f9f9] p-5"
      data-node-id="4400:1980"
    >
      <p className="text-[28px] font-bold leading-[1.2] text-[#a1a1aa]">{String(rank).padStart(2, "0")}</p>
      <div className="flex w-full flex-1 flex-col items-center justify-center gap-5">
        <Image src="/icons/version-b/empty-stack.svg" alt="" width={66} height={60} className="empty-stack-light" />
        <Image src="/icons/version-b/empty-stack-dark.svg" alt="" width={66} height={60} className="empty-stack-dark" />
        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">아직 앱이 없어요</p>
      </div>
    </div>
  );
}

interface NewCardProps {
  app: typeof newApps[number];
  index: number;
  onClick: () => void;
  onRequest: () => void;
}

const PROFILE_ICONS = [
  "/icons/version-b/profile-blue.png",
  "/icons/version-b/profile-peach.png",
  "/icons/version-b/profile-green.png",
] as const;

function NewCard({ app, index, onClick, onRequest }: NewCardProps) {
  const profileSrc = PROFILE_ICONS[index % PROFILE_ICONS.length];
  const handleRequest = (e: React.MouseEvent) => {
    e.stopPropagation();
    onRequest();
  };
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className="flex cursor-pointer flex-col items-start justify-center gap-5 rounded-2xl bg-[#f9f9f9] p-5 text-left transition-transform duration-200 ease-out hover:scale-[1.03]"
    >
      <div className="flex w-full items-center gap-5">
        <div className="size-[90px] shrink-0 rounded-xl bg-[#e4e4e7]" />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">{app.category}</p>
          <p className="truncate text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-black">{app.name}</p>
          <p className="line-clamp-2 h-10 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{app.desc}</p>
        </div>
      </div>
      <div className="flex w-full items-end justify-between">
        <div className="flex flex-1 items-center gap-2">
          <Image src={profileSrc} alt="" width={20} height={20} className="size-5 shrink-0 rounded-full" />
          <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">{app.creator}</p>
        </div>
        <button
          type="button"
          onClick={handleRequest}
          className="flex h-8 w-[65px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
        >
          받기
        </button>
      </div>
    </div>
  );
}

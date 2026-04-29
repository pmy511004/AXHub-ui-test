"use client";

import { useState } from "react";
import Image from "next/image";

interface AppDetailViewProps {
  appName: string;
  category: string;
  onBack: () => void;
  fromMenu: string;
  isAdmin?: boolean;
  appStatus?: string;
}


const comments = [
  { name: "박민영", time: "1시간 전", text: "이 앱을 도입한 이후로 팀 전체의 업무 프로세스가 확 달라졌어요. 특히 반복 작업이 자동화되면서 하루에 2시간 정도 절약되는 것 같습니다. 다른 팀에도 적극 추천하고 있어요!", likes: 2, replies: 0, liked: false, isMine: true },
  { name: "송재희", time: "2시간 전", text: "사용하기 정말 편하고, 팀원들 사이에서 반응이 좋아요. 대시보드에서 한눈에 현황을 파악할 수 있어서 회의 시간도 줄었습니다. 다만 엑셀 내보내기 기능이 추가되면 더 좋겠어요.", likes: 3, replies: 0, liked: true },
  { name: "김태호", time: "3시간 전", text: "이 앱 덕분에 업무 효율이 많이 올라갔습니다. 특히 알림 기능과 일정 관리가 잘 연동되어 있어서 중요한 마감을 놓치는 일이 없어졌어요. 강력 추천합니다!", likes: 5, replies: 1, liked: true },
  { name: "이수진", time: "4시간 전", text: "UI가 직관적이고 사용하기 편합니다. 처음 접하는 동료도 별도 교육 없이 바로 적응할 수 있었어요. 다만 로딩 속도가 데이터가 많을 때 조금 느린 것 같아 개선되면 좋겠습니다.", likes: 1, replies: 2, liked: false },
  { name: "정현우", time: "5시간 전", text: "팀원들과 실시간으로 협업할 수 있어서 좋습니다. 코멘트 기능과 태스크 할당이 매끄러워서 이메일로 소통하던 시절과는 비교가 안 돼요. 프로젝트 관리에 필수 앱입니다.", likes: 4, replies: 0, liked: true },
  { name: "최예린", time: "6시간 전", text: "기능이 다양하고 좋습니다. 특히 데이터 분석 기능으로 월별 리포트를 자동 생성할 수 있어서 보고서 작성 시간이 크게 줄었어요. 커스텀 차트 기능도 유용합니다.", likes: 2, replies: 1, liked: false },
  { name: "한지민", time: "7시간 전", text: "매일 출근하면 가장 먼저 켜는 앱이 되었어요. 하루 업무를 계획하고 추적하는 데 이만한 도구가 없습니다. 모바일에서도 완벽하게 동작해서 외근 중에도 편하게 사용합니다.", likes: 7, replies: 10, liked: true },
  { name: "오승현", time: "8시간 전", text: "최근 업데이트에서 검색 기능이 강화되어서 과거 데이터를 찾기 쉬워졌어요. 필터링 옵션도 다양해져서 원하는 정보를 빠르게 찾을 수 있습니다. 꾸준한 개선에 감사드려요.", likes: 0, replies: 0, liked: false },
  { name: "윤서아", time: "9시간 전", text: "다크모드가 지원되면 야간 작업 시 눈이 편할 것 같아요. 그 외에는 전반적으로 만족합니다. 특히 단축키 지원이 잘 되어 있어서 파워 유저에게 추천합니다.", likes: 3, replies: 1, liked: false },
  { name: "강민수", time: "10시간 전", text: "알림 설정을 세밀하게 조정할 수 있어서 좋아요. 중요한 건만 푸시 알림으로 받고, 나머지는 요약으로 확인하고 있습니다. 덕분에 업무 집중도가 높아졌어요.", likes: 1, replies: 0, liked: false },
  { name: "임하늘", time: "11시간 전", text: "사용법이 간단해서 온보딩 교육 없이도 신규 입사자가 바로 쓸 수 있었습니다. 인터페이스가 깔끔하고 기능 배치가 논리적이에요. 관리자 대시보드도 잘 만들어져 있습니다.", likes: 6, replies: 2, liked: true },
  { name: "서준혁", time: "12시간 전", text: "API 연동이 잘 되어있어서 기존에 사용하던 Slack, Notion과 함께 사용하기 좋습니다. 웹훅 설정도 간편하고, 자동화 시나리오를 구성하기 편해서 개발팀에서 특히 좋아합니다.", likes: 2, replies: 0, liked: false },
];

export default function AppDetailView({ appName, category, onBack, fromMenu, isAdmin, appStatus }: AppDetailViewProps) {
  const primaryColor = isAdmin ? "#E765BE" : "#FBB03B";
  const [activeTab, setActiveTab] = useState("앱");
  const [expanded, setExpanded] = useState(false);
  const [gitStep, setGitStep] = useState<"login" | "install" | "repo" | "connected">("login");
  const [selectedRepo, setSelectedRepo] = useState<string | null>(null);
  const [branchName, setBranchName] = useState("");
  const [namingModalOpen, setNamingModalOpen] = useState(false);
  const [envModalOpen, setEnvModalOpen] = useState(false);
  const [envAddModalOpen, setEnvAddModalOpen] = useState(false);
  const [envEditIndex, setEnvEditIndex] = useState<number | null>(null);
  const [envDeleteIndex, setEnvDeleteIndex] = useState<number | null>(null);
  const [memberAddModalOpen, setMemberAddModalOpen] = useState(false);
  const [memberAddMode, setMemberAddMode] = useState<"user" | "role">("user");
  const [memberDropdownOpen, setMemberDropdownOpen] = useState(false);
  const [selectedMemberUser, setSelectedMemberUser] = useState<string | null>(null);
  const [selectedMemberRole, setSelectedMemberRole] = useState<string | null>(null);
  const [members, setMembers] = useState<{ name: string; email: string; permission: string; addedAt: string }[]>([]);
  const [memberSearch, setMemberSearch] = useState("");
  const [memberDeleteIndex, setMemberDeleteIndex] = useState<number | null>(null);
  const [memberDropdownSearch, setMemberDropdownSearch] = useState("");
  const [envKey, setEnvKey] = useState("");
  const [envValue, setEnvValue] = useState("");
  const [envType, setEnvType] = useState<string | null>(null);
  const [envVars, setEnvVars] = useState<{ key: string; value: string; type: string }[]>([]);
  const [guideComplete, setGuideComplete] = useState(false);
  const [guideDismissed, setGuideDismissed] = useState(false);
  const [guideHidden, setGuideHidden] = useState(false);
  const [modalComment, setModalComment] = useState<number | null>(null);
  const [deployStarted, setDeployStarted] = useState(false);
  const [deployDetailId, setDeployDetailId] = useState<number | null>(null);
  const [deployExpanded, setDeployExpanded] = useState(false);
  const [deployFilterOpen, setDeployFilterOpen] = useState(false);
  const [deployFilter, setDeployFilter] = useState("전체 상태");
  const [ciFilterOpen, setCiFilterOpen] = useState(false);
  const [ciFilter, setCiFilter] = useState("전체 활동");
  const [statTooltip, setStatTooltip] = useState<string | null>(null);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  return (
    <div className="mx-auto flex w-full flex-col gap-6 pb-[100px] min-[1281px]:max-w-[1280px]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
      {/* 댓글 상세 모달 */}
      {modalComment !== null && (() => {
        const c = comments[modalComment];
        return (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => setModalComment(null)}>
            <div
              className="flex max-h-[80vh] w-full max-w-[480px] flex-col gap-3 overflow-y-auto rounded-2xl bg-[#f6f6f6] p-5 shadow-[0px_8px_32px_rgba(0,0,0,0.12)]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center gap-2.5">
                <span className="flex-1 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">{c.name}</span>
                <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{c.time}</span>
              </div>
              <div className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">
                <p>{c.text}</p>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Breadcrumbs */}
      <div className="flex items-center gap-1 text-sm">
        <button
          type="button"
          onClick={onBack}
          className="px-1 font-medium leading-[1.5] tracking-[-0.14px] underline decoration-[#d4d4d8]"
          style={{ color: "#71717a" }}
        >
          {fromMenu}
        </button>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M4.5 2.5L7.5 6L4.5 9.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="px-1 font-medium leading-[1.5] tracking-[-0.14px] text-[#18181b] underline decoration-[#d4d4d8]">
          {appName}
        </span>
      </div>


      {/* Setup Guide Banner (admin only) */}
      {isAdmin && !guideHidden && (() => {
        const gitConnected = gitStep === "connected";
        const envDone = envVars.length > 0;
        const isEnvTab = activeTab === "환경변수" || gitConnected;
        const isDeployTab = activeTab === "배포" || envDone;

        // Steps: 1(앱만들기) 2(Git연결) 3(환경변수등록) 4(배포하기) → 앱공개
        const step1 = "done";
        const step2 = guideComplete || isEnvTab || isDeployTab ? "done" : "active";
        const step3 = guideComplete || isDeployTab ? "done" : isEnvTab ? "active" : "future";
        const step4 = guideComplete ? "done" : isDeployTab ? "active" : "future";
        const appPublished = guideComplete;

        const guideTitle = guideComplete
          ? "앱이 스토어에 성공적으로 올라갔어요!"
          : isDeployTab
            ? "동료들이 앱에 접속할 수 있도록 배포해주세요"
            : isEnvTab
              ? "API Key, 설정값을 읽어올 수 있도록 환경변수를 등록해주세요"
              : "푸시할 때마다 자동 배포되도록 GitHub 저장소를 연결해주세요";
        const guideSubtitle = guideComplete
          ? "앱의 성격에 따라 테이블, 환경변수를 설정해 주세요"
          : (() => { const r = [step2, step3, step4].filter(s => s !== "done").length; return `${r}단계만 더 완료하면 앱이 공개돼요!`; })();
        const fillWidth = guideComplete ? "504px" : isDeployTab ? "375px" : isEnvTab ? "250px" : "125px";

        const chipClass = (state: string) =>
          state === "done" || state === "active" ? "bg-[#E765BE]" : "relative overflow-hidden bg-[#E765BE]";
        const chipOverlay = (state: string) =>
          state === "future";
        const labelClass = (state: string) =>
          state === "active" ? "font-semibold text-[#E765BE]"
            : state === "done" ? "font-medium text-[rgba(231,101,190,0.5)]"
            : "font-medium text-[#a1a1aa]";

        const steps = [
          { num: "1", label: "앱 만들기", state: step1, tab: "앱" as const },
          { num: "2", label: "Git 연결하기", state: step2, tab: "Git 연동" as const },
          { num: "3", label: "환경변수 등록", state: step3, tab: "환경변수" as const },
          { num: "4", label: "배포하기", state: step4, tab: "배포" as const },
        ];

        return (
          <div className="mx-auto flex w-[600px] flex-col gap-2">
            {/* 다시보지 않기 + 닫기 (완료 상태에서만) */}
            {guideComplete && (
              <div className="flex items-center gap-2">
                <div className="flex flex-1 items-center gap-1">
                  <button type="button" onClick={() => setGuideDismissed(!guideDismissed)} className="flex size-6 items-center justify-center p-[3px]">
                    {guideDismissed ? (
                      <span className="flex size-full items-center justify-center rounded border-[1.5px] border-[#E765BE] bg-[#E765BE]">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M2.917 7L5.833 9.917L11.083 4.083" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    ) : (
                      <span className="block size-full rounded border-[1.5px] border-[#a1a1aa]" />
                    )}
                  </button>
                  <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#71717a]">다시보지 않기</span>
                </div>
                <button type="button" onClick={() => setGuideHidden(true)} className="flex size-6 items-center justify-center text-[#71717a] transition-colors hover:text-[#18181b]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
            <div className="flex h-[177px] flex-col gap-6 rounded-2xl bg-[#f9f9f9] p-6">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-1">
                  <span className="flex-1 text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">{guideTitle}</span>
                  {guideComplete ? (
                    <span className="shrink-0 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#E765BE]">스토어에서 보기</span>
                  ) : isEnvTab && !isDeployTab ? (
                    <button type="button" className="flex shrink-0 items-center rounded-lg border border-[#e4e4e7] px-3 py-1.5 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#71717a] transition-colors hover:bg-gray-50">건너뛰기</button>
                  ) : null}
                </div>
                <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{guideSubtitle}</p>
              </div>
              {/* Step progress */}
              <div className="relative flex items-start justify-between">
                <div className="absolute left-[25px] right-[25px] top-[9px] h-1.5 rounded-full bg-[#e4e4e7]" />
                <div className="absolute left-[26px] top-[9px] h-1.5 overflow-hidden rounded-full bg-[#E765BE] transition-all duration-500" style={{ width: fillWidth }}>
                  <div className="absolute inset-0" style={{
                    background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 70%, transparent 100%)",
                    animation: "guideShimmer 2s ease-in-out infinite",
                  }} />
                </div>
                {steps.map((step) => (
                  <button key={step.num} type="button" onClick={() => { setGuideComplete(false); setActiveTab(step.tab); }} className="group relative z-10 flex w-[65px] flex-col items-center gap-3 transition hover:scale-110">
                    <span className={`flex size-6 items-center justify-center rounded-full ${chipClass(step.state)} text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition group-hover:bg-[#d454a8]`}>{step.num}{chipOverlay(step.state) && <span className="absolute inset-0 rounded-full bg-white/70" />}</span>
                    <span className={`whitespace-nowrap text-xs leading-[1.3] tracking-[-0.12px] ${labelClass(step.state)} transition group-hover:text-[#E765BE]`}>{step.label}</span>
                  </button>
                ))}
                {/* 앱 공개 */}
                <button type="button" onClick={() => setGuideComplete(true)} className="group relative z-10 flex flex-col items-center transition hover:scale-110">
                  <span
                    className={`flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition ${appPublished ? "bg-[#E765BE]" : "relative overflow-hidden bg-[#E765BE] group-hover:brightness-90"}`}
                  >앱 공개{!appPublished && <span className="absolute inset-0 rounded-full bg-white/70" />}</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* 섹션 1: 앱 제목 */}
      <div className="flex items-center gap-4 py-5">
        {appName === "매출 대시보드" && (
          <button
            type="button"
            className="flex items-center gap-1 self-start rounded-lg px-3 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#1571F3] underline underline-offset-4 transition-opacity hover:opacity-80"
          >
            관리화면으로 이동하기
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path d="M3.5 8H12.5M12.5 8L8.5 4M12.5 8L8.5 12" stroke="#1571F3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
        <div className="p-3">
          <div className="size-24 rounded-2xl bg-[#e4e4e7]" />
        </div>
        <div className="flex flex-1 flex-col justify-between self-stretch">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <h2 className="flex-1 text-[28px] font-bold leading-[1.2] text-black">
                {appName}
              </h2>
              {isAdmin && (
                <div className="relative shrink-0">
                  <button type="button" onClick={() => setAdminMenuOpen(!adminMenuOpen)}>
                    <Image src="/icons/version-b/app-more-24.svg" alt="" width={24} height={24} />
                  </button>
                  {adminMenuOpen && (
                    <div className="absolute right-0 top-full z-20 mt-1 flex min-w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
                      <button type="button" onClick={() => setAdminMenuOpen(false)} className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50" style={{ color: "#3f3f46" }}>정보 수정</button>
                      <button type="button" onClick={() => setAdminMenuOpen(false)} className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50" style={{ color: "#3f3f46" }}>앱 보관</button>
                      <button type="button" onClick={() => setAdminMenuOpen(false)} className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50" style={{ color: "#f5475c" }}>앱 삭제</button>
                    </div>
                  )}
                </div>
              )}
            </div>
            <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-500">
              {category}
            </p>
          </div>
          <div className="flex items-start gap-2">
            {isAdmin ? (
              <span className="relative flex h-8 items-center justify-center overflow-hidden rounded-xl bg-[#E765BE] px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white">
                배포 전
                <span className="absolute inset-0 rounded-xl bg-white/70" />
              </span>
            ) : appStatus === "열기" ? (
              <div className="flex items-start gap-2">
                <button
                  type="button"
                  className="flex h-8 items-center justify-center overflow-hidden rounded-xl px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-85"
                  style={{ backgroundColor: primaryColor }}
                >
                  열기
                </button>
                <button
                  type="button"
                  className="flex h-8 items-center justify-center overflow-hidden rounded-xl bg-[#f6f6f6] px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                >
                  사용 해제
                </button>
              </div>
            ) : appStatus === "승인 대기" ? (
              <button
                type="button"
                className="flex h-8 items-center justify-center overflow-hidden rounded-xl px-4 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#6D319D] bg-[#F4ECFA] hover:bg-[#EEE3F7] transition-colors"
              >
                대기
              </button>
            ) : (
              <button
                type="button"
                className="flex h-8 items-center justify-center overflow-hidden rounded-xl px-4 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#FBB03B] bg-[rgba(251,176,59,0.1)] hover:bg-[rgba(251,176,59,0.2)] transition-colors"
              >
                받기
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 섹션 2: Tab Bar */}
      {isAdmin && (
        <div className="flex items-center border-b border-[rgba(82,82,91,0.08)]">
          {["앱", "Git 연동", "배포", "운영", "테이블", "환경변수", "데이터 접근", "멤버", "설정"].map((tab) => {
            const hasWarning = (tab === "Git 연동" && gitStep !== "connected") || tab === "배포" || tab === "환경변수";
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-1 px-5 py-2 text-base leading-[1.5] tracking-[-0.16px] transition-colors ${
                  isActive
                    ? "font-semibold text-black border-b-[2.5px] border-[#E765BE]"
                    : "font-normal text-[#a1a1aa] hover:text-[#71717a]"
                }`}
              >
                {tab}
                {hasWarning && (
                  <span className="inline-flex size-[18px] items-center justify-center rounded-full bg-[#F5475C] text-[10px] font-bold text-white">!</span>
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* 섹션 3: 상세내용 */}
      {activeTab === "앱" ? (
        <div className="flex flex-col">
          {/* Info Table */}
          <div className="flex items-start border-b border-[rgba(82,82,91,0.08)] pb-10">
            <div className="flex flex-1 flex-col items-center gap-5 px-10 py-5">
              <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">개발자</span>
              <div className="flex flex-col items-center gap-1">
                <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#18181b]">안승원</span>
                <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">sw.an@jocodingax.ai</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
              <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">생성일</span>
              <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#18181b]">2026.04.07</span>
            </div>
            <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
              <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">사용자 수</span>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#a1a1aa]">0</span>
                <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">명</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
              <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">추천 수</span>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#a1a1aa]">0</span>
                <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">개</span>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
              <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">댓글 수</span>
              <div className="flex flex-col items-center">
                <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#a1a1aa]">0</span>
                <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">개</span>
              </div>
            </div>
          </div>

          {/* 앱 설명 */}
          <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-10">
            <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">앱 설명</h3>
            <div className="flex items-end justify-between">
              <div
                className={`flex-1 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] overflow-hidden ${expanded ? "" : "h-[100px]"}`}
              >
                <p>여기에는 앱에 대한 설명 내용이 들어갑니다.</p>
                <p>최대 5줄까지 들어가고 그 이상 길어질 경우, 더보기 버튼으로 접고 펼칠 수 있습니다.</p>
                <p>설명 텍스트 영역의 height는 고정 100px 입니다.</p>
                <p>여기에는 앱에 대한 설명 내용이 들어갑니다.</p>
                <p className="overflow-hidden text-ellipsis whitespace-nowrap">최대 5줄까지 들어가고 그 이상 길어질 경우, 더보기 버튼으로 접고 펼칠 수 있습니다.</p>
              </div>
              <button
                type="button"
                onClick={() => setExpanded(!expanded)}
                className="shrink-0 px-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#E765BE]"
              >
                {expanded ? "접기" : "더보기"}
              </button>
            </div>
          </div>

          {/* 동료들이 남긴 한마디 (비관리자만) */}
          {!isAdmin && (
            <div className="flex flex-col gap-6 border-b border-[rgba(82,82,91,0.08)] py-10">
              <div className="flex flex-col gap-5">
                <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">동료들이 남긴 한마디</h3>
                <div className="relative">
                <div className="sidebar-scroll grid h-[390px] grid-cols-2 gap-5 overflow-y-auto pb-10 2xl:grid-cols-3">
                  {comments.slice(0, 12).map((c, i) => (
                    <div key={i} className="flex h-[140px] cursor-pointer flex-col gap-3 rounded-2xl bg-[#f6f6f6] p-5" onClick={() => setModalComment(i)}>
                      <div className="flex items-center gap-2.5">
                        {c.isMine && (
                          <span className="flex h-6 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white" style={{ backgroundColor: primaryColor }}>
                            내 댓글
                          </span>
                        )}
                        <span className="flex-1 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">{c.name}</span>
                        <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">{c.time}</span>
                        {c.isMine && (
                          <Image src="/icons/version-b/comment-more.svg" alt="" width={18} height={18} />
                        )}
                      </div>
                      <div className="flex-1 overflow-hidden font-normal leading-[1.5] tracking-[-0.15px] text-[#18181b]" style={{ fontSize: "15px" }}>
                        <p className="line-clamp-3">{c.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[40px] bg-gradient-to-t from-white to-transparent" />
                </div>
              </div>
              <div className="flex min-h-[48px] items-center gap-1.5 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
                <span className="flex-1 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">이 앱에 대한 한 마디를 남겨주세요</span>
                <Image src="/icons/version-b/comment-send.svg" alt="" width={20} height={20} />
              </div>
            </div>
          )}

          {/* 정보 */}
          <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-10">
            <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">정보</h3>
            <div className="flex flex-wrap gap-x-5 gap-y-10">
              <div className="flex w-[464px] flex-col gap-1">
                <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">DB Schema</span>
                <span className="truncate text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">jocodingax_ai_jocoding_ax</span>
              </div>
              <div className="flex w-[464px] flex-col gap-1">
                <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">앱 사용방법</span>
                <span className="truncate text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">승인 후 사용</span>
              </div>
              <div className="flex w-[464px] flex-col gap-1">
                <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">데이터 스코프</span>
                <span className="truncate text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">read, write</span>
              </div>
              <div className="flex w-[464px] flex-col gap-1">
                <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">최종 수정일</span>
                <span className="truncate text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">2026.04.12</span>
              </div>
            </div>
          </div>
        </div>
      ) : activeTab === "Git 연동" ? (
        <div className="flex flex-col gap-6">
          {/* 권장 네이밍 구조 모달 */}
          {namingModalOpen && (
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => setNamingModalOpen(false)}>
              <div
                className="flex w-[480px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: "modalScaleIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">브랜치명은 보통 이렇게 작성해요</p>
                <div className="flex w-full flex-col gap-4 overflow-hidden rounded-xl bg-[#f4f4f5] p-5 text-base leading-[1.5] tracking-[-0.16px]">
                  {[
                    { name: "main/master", desc: "제품으로 출시 가능한 브랜치" },
                    { name: "develop", desc: "다음 버전 개발을 진행하는 브랜치" },
                    { name: "feature", desc: "기능 단위로 개발하는 브랜치" },
                    { name: "release", desc: "배포를 준비하는 브랜치" },
                    { name: "hotfix", desc: "긴급 수정을 위한 브랜치" },
                  ].map((item) => (
                    <div key={item.name} className="flex items-center gap-4">
                      <span className="w-[92px] shrink-0 font-semibold text-[#3f3f46]">{item.name}</span>
                      <span className="font-normal text-[#71717a]">{item.desc}</span>
                    </div>
                  ))}
                </div>
                <div className="flex w-full flex-col gap-2 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  <p>• 영어 소문자를 사용해요</p>
                  <p>• 구분이 필요할 때는 공백 대신 - , / 를 사용해요</p>
                  <p>• 공백, 특수문자, 40자 이상은 사용할 수 없어요</p>
                  <p>• 구분하기 쉽도록 기능이나 이슈 내용을 짧고 명확하게 작성해요</p>
                </div>
                <button type="button" onClick={() => setNamingModalOpen(false)} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                  확인
                </button>
              </div>
            </div>
          )}
          {/* GitHub 연결 안내 카드 */}
          <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
            <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#3f3f46]">GitHub 연결</p>
            <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">GitHub 저장소를 연결하면, 앱을 업데이트하고 Push할 때마다 자동으로 배포돼요</p>
          </div>
          {gitStep === "login" ? (
            /* 로그인 섹션 */
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">먼저 로그인을 해주세요</p>
                <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">저장소 내용은 읽지 않으며 계정 식별 정보만 사용할게요</p>
              </div>
              <button type="button" onClick={() => setGitStep("install")} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                GitHub 로그인
              </button>
            </div>
          ) : gitStep === "install" ? (
            /* 앱 설치 섹션 */
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">계정에 앱을 설치해주세요</p>
                <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">Github 계정에 앱이 설치되어 있지 않아요</p>
              </div>
              <div className="flex w-[350px] flex-col items-center gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
                <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#3f3f46]">minion</p>
                <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">개인 • 앱 미설치</p>
              </div>
              <div className="flex items-start gap-2">
                <button type="button" onClick={() => setGitStep("login")} className="flex h-9 items-center justify-center rounded-lg border border-[#d4d4d8] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a] transition-colors hover:bg-gray-50">
                  다른 아이디로 로그인
                </button>
                <button type="button" onClick={() => setGitStep("repo")} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                  이 계정에 앱 설치
                </button>
              </div>
            </div>
          ) : gitStep === "repo" ? (
            /* 저장소 선택 섹션 */
            <div className="flex flex-col gap-6 py-5">
              <div className="flex items-end gap-6">
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">저장소를 선택하고 브랜치명을 적어주세요</p>
                  <p className="text-base leading-[1.5] tracking-[-0.16px]">
                    <span className="font-normal text-[#71717a]">브랜치명 작성이 처음이신가요?  </span>
                    <button type="button" onClick={() => setNamingModalOpen(true)} className="font-semibold text-[#1571F3] underline-offset-2 hover:underline">권장 네이밍 구조</button>
                    <span className="font-normal text-[#71717a]">를 참고하세요</span>
                  </p>
                </div>
                <div className="flex h-10 w-[240px] shrink-0 items-center gap-1.5 overflow-hidden rounded-xl bg-[#f4f4f5] px-4 py-3">
                  <Image src="/icons/version-b/search.svg" alt="" width={20} height={20} />
                  <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">저장소 이름으로 검색</span>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                {["minion/AXHub-test", "minion/AXHub-test2", "minion/AXHub-test3"].map((repo) => (
                  <button key={repo} type="button" onClick={() => setSelectedRepo(selectedRepo === repo ? null : repo)} className={`flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors ${selectedRepo === repo ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                    <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">{repo}</p>
                    <div className="flex items-start gap-2 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                      <span className="font-semibold">기본 브랜치</span>
                      <span className="font-normal">main • Public</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="flex flex-col gap-3">
                <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-black">브랜치명</p>
                <input
                  type="text"
                  value={branchName}
                  onChange={(e) => setBranchName(e.target.value)}
                  placeholder="main, master..."
                  className="min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none"
                />
              </div>
              <button
                type="button"
                disabled={!selectedRepo || !branchName.trim()}
                onClick={() => setGitStep("connected")}
                className="relative flex h-9 w-fit items-center justify-center overflow-hidden rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
              >
                저장소 연결
                {(!selectedRepo || !branchName.trim()) && <span className="absolute inset-0 rounded-lg bg-white/70" />}
              </button>
            </div>
          ) : (
            /* 연결 완료 섹션 */
            <div className="flex flex-col items-center gap-6 py-10">
              <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">GitHub 저장소가 연결되었습니다!</p>
                <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">연결된 저장소 정보를 확인하세요</p>
              </div>
              <div className="flex w-[350px] flex-col items-center gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
                <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#E765BE]">{selectedRepo}</p>
                <div className="flex items-center justify-center gap-2 text-base leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  <span className="font-semibold">브랜치</span>
                  <span className="font-normal">{branchName}</span>
                </div>
              </div>
              <button type="button" onClick={() => { setGitStep("repo"); }} className="flex h-9 items-center justify-center rounded-lg border border-[#d4d4d8] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a] transition-colors hover:bg-gray-50">
                연결 끊기
              </button>
            </div>
          )}
        </div>
      ) : activeTab === "환경변수" ? (
        <div className="flex flex-col gap-6">
          {/* 환경변수가 필요한 경우 모달 */}
          {envModalOpen && (
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => setEnvModalOpen(false)}>
              <div
                className="flex w-[480px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: "modalScaleIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">이런 경우에 환경변수 등록이 필요해요</p>
                <div className="flex w-full flex-col gap-5 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
                  {[
                    { title: "개발 / 테스트 / 운영 환경이 나뉠 때", desc: "개발과 운영 서버의 주소, 데이터가 달라요" },
                    { title: "외부 서비스를 붙일 때", desc: "로그인, 결제, 지도 등의 API 키가 필요해요" },
                    { title: "보안 정보가 있을 때", desc: "비밀번호, 토큰을 코드에 직접 넣으면 위험해요" },
                    { title: "기능을 켜고 끄고 싶을 때", desc: "특정 기능을 ON/OFF 하거나 A/B 테스트가 필요해요" },
                    { title: "배포 환경이 달라질 때", desc: "로컬, 서버, 클라우드 등 환경이 달라져요" },
                  ].map((item) => (
                    <div key={item.title} className="flex flex-col gap-1">
                      <p className="text-base leading-[1.5] tracking-[-0.16px]">
                        <span className="font-normal text-[#3f3f46]">• </span>
                        <span className="font-semibold text-[#3f3f46]">{item.title}</span>
                      </p>
                      <p className="pl-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={() => setEnvModalOpen(false)} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                  확인
                </button>
              </div>
            </div>
          )}
          {/* 환경변수 등록 안내 카드 */}
          <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
            <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#3f3f46]">환경변수 등록</p>
            <div className="text-base leading-[1.5] tracking-[-0.16px] text-[#71717a]">
              <p>앱이 어떤 환경에서든 잘 실행되도록 상황에 따라 바뀌는 설정을 따로 관리해요</p>
              <p className="font-bold">환경변수를 변경했다면, 재배포 해야 앱에 적용돼요</p>
            </div>
          </div>
          {envVars.length === 0 ? (
          /* CTA 섹션 (빈 상태) */
          <div className="flex flex-col items-center gap-6 py-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">환경변수를 등록해 주세요</p>
              <div className="text-base leading-[1.5] tracking-[-0.16px]">
                <p className="font-normal text-[#71717a]">앱의 성격에 따라 환경변수 등록이 필요하지 않을 수 있어요</p>
                <p>
                  <button type="button" onClick={() => setEnvModalOpen(true)} className="font-semibold text-[#1571F3] underline-offset-2 hover:underline">환경변수가 필요한 경우</button>
                  <span className="font-normal text-[#71717a]">를 참고하세요</span>
                </p>
              </div>
            </div>
            <button type="button" onClick={() => { setEnvKey(""); setEnvValue(""); setEnvType(null); setEnvAddModalOpen(true); }} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
              환경변수 추가
            </button>
          </div>
          ) : (
          /* 테이블 뷰 (환경변수 추가된 상태) */
          <div className="flex flex-col gap-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-[240px] items-center gap-1.5 overflow-hidden rounded-xl bg-[#f4f4f5] px-4 py-3">
                <Image src="/icons/version-b/search.svg" alt="" width={20} height={20} />
                <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">키 이름으로 검색</span>
              </div>
              <button type="button" onClick={() => { setEnvKey(""); setEnvValue(""); setEnvType(null); setEnvAddModalOpen(true); }} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                환경변수 추가
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border-[0.5px] border-[#e4e4e7]">
              {/* 테이블 헤더 */}
              <div className="flex bg-[#f6f6f6]">
                <div className="flex flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">키</span></div>
                <div className="flex flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">값</span></div>
                <div className="flex w-[156px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">단계</span></div>
                <div className="flex w-[156px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">작업</span></div>
              </div>
              {/* 테이블 바디 */}
              {envVars.map((env, i) => (
                <div key={i} className="flex bg-white">
                  <div className="flex h-[60px] flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">{env.key}</span></div>
                  <div className="flex h-[60px] flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">********</span></div>
                  <div className="flex h-[60px] w-[156px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">{env.type}</span></div>
                  <div className="flex h-[60px] w-[156px] items-center gap-2.5 border-[0.5px] border-[#e4e4e7] px-4 py-3">
                    <button type="button" onClick={() => { setEnvEditIndex(i); setEnvKey(env.key); setEnvValue(env.value); setEnvType(env.type); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">수정</button>
                    <button type="button" onClick={() => setEnvDeleteIndex(i)} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#f5475c] transition-colors hover:bg-[#ececec]">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          {/* 환경변수 추가 모달 */}
          {envAddModalOpen && (
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => setEnvAddModalOpen(false)}>
              <div
                className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: "modalScaleIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">환경변수 추가하기</p>
                {/* 키(이름) */}
                <div className="flex w-full flex-col gap-3">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">키(이름)<span className="text-[#ef1026]">*</span></p>
                  <div className="flex flex-col gap-2">
                    <input type="text" value={envKey} onChange={(e) => setEnvKey(e.target.value)} placeholder="DB_URL..." className="min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none" />
                    <p className="text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]"><span className="font-semibold">대문자 + 언더스코어</span><span className="font-normal"> 형태로 사용하며, 바로 알아볼 수 있는 이름을 붙여주세요</span></p>
                  </div>
                </div>
                {/* 값 */}
                <div className="flex w-full flex-col gap-3">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">값<span className="text-[#ef1026]">*</span></p>
                  <div className="flex flex-col gap-2">
                    <input type="text" value={envValue} onChange={(e) => setEnvValue(e.target.value)} placeholder="********" className="min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none" />
                    <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">실제로 들어가는 값으로 발급받거나 생성한 값을 넣어주세요</p>
                  </div>
                </div>
                {/* 환경 */}
                <div className="flex w-full flex-col gap-3">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">환경<span className="text-[#ef1026]">*</span></p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      {[
                        { key: "Runtime", desc: "앱이 실행될 때 사용" },
                        { key: "Build", desc: "앱을 만들 때 사용" },
                        { key: "Both", desc: "두 경우 모두 사용" },
                      ].map((env) => (
                        <button key={env.key} type="button" onClick={() => setEnvType(envType === env.key ? null : env.key)} className={`flex flex-1 flex-col gap-2 rounded-xl border p-4 text-left transition-colors ${envType === env.key ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                          <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">{env.key}</span>
                          <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{env.desc}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">앱을 만들 때 고정되는 값인 지, 실행할 때마다 바뀌는 값인 지 구분해주세요</p>
                  </div>
                </div>
                {/* 버튼 */}
                <div className="flex items-start gap-2">
                  <button type="button" onClick={() => setEnvAddModalOpen(false)} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">
                    닫기
                  </button>
                  <button
                    type="button"
                    disabled={!envKey.trim() || !envValue.trim() || !envType}
                    onClick={() => { setEnvVars([...envVars, { key: envKey, value: envValue, type: envType! }]); setEnvAddModalOpen(false); }}
                    className="relative flex h-9 items-center justify-center overflow-hidden rounded-lg px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity"
                    style={{ background: "#E765BE" }}
                  >
                    추가
                    {(!envKey.trim() || !envValue.trim() || !envType) && <span className="absolute inset-0 rounded-lg bg-white/70" />}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* 환경변수 수정 모달 */}
          {envEditIndex !== null && (
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => { setEnvEditIndex(null); setEnvKey(""); setEnvValue(""); setEnvType(null); }}>
              <div
                className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: "modalScaleIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">환경변수 수정하기</p>
                {/* 키(이름) */}
                <div className="flex w-full flex-col gap-3">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">키(이름)<span className="text-[#ef1026]">*</span></p>
                  <div className="flex flex-col gap-2">
                    <input type="text" value={envKey} onChange={(e) => setEnvKey(e.target.value)} placeholder="DB_URL..." className="min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none" />
                    <p className="text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]"><span className="font-semibold">대문자 + 언더스코어</span><span className="font-normal"> 형태로 사용하며, 바로 알아볼 수 있는 이름을 붙여주세요</span></p>
                  </div>
                </div>
                {/* 값 */}
                <div className="flex w-full flex-col gap-3">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">값<span className="text-[#ef1026]">*</span></p>
                  <div className="flex flex-col gap-2">
                    <input type="text" value={envValue} onChange={(e) => setEnvValue(e.target.value)} placeholder="********" className="min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#E765BE] focus:outline-none" />
                    <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">실제로 들어가는 값으로 발급받거나 생성한 값을 넣어주세요</p>
                  </div>
                </div>
                {/* 환경 */}
                <div className="flex w-full flex-col gap-3">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">환경<span className="text-[#ef1026]">*</span></p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      {[
                        { key: "Runtime", desc: "앱이 실행될 때 사용" },
                        { key: "Build", desc: "앱을 만들 때 사용" },
                        { key: "Both", desc: "두 경우 모두 사용" },
                      ].map((env) => (
                        <button key={env.key} type="button" onClick={() => setEnvType(envType === env.key ? null : env.key)} className={`flex flex-1 flex-col gap-2 rounded-xl border p-4 text-left transition-colors ${envType === env.key ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                          <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">{env.key}</span>
                          <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{env.desc}</span>
                        </button>
                      ))}
                    </div>
                    <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">앱을 만들 때 고정되는 값인 지, 실행할 때마다 바뀌는 값인 지 구분해주세요</p>
                  </div>
                </div>
                {/* 버튼 */}
                <div className="flex items-start gap-2">
                  <button type="button" onClick={() => { setEnvEditIndex(null); setEnvKey(""); setEnvValue(""); setEnvType(null); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">
                    닫기
                  </button>
                  <button
                    type="button"
                    disabled={!envKey.trim() || !envValue.trim() || !envType}
                    onClick={() => { const updated = [...envVars]; updated[envEditIndex] = { key: envKey, value: envValue, type: envType! }; setEnvVars(updated); setEnvEditIndex(null); setEnvKey(""); setEnvValue(""); setEnvType(null); }}
                    className="relative flex h-9 items-center justify-center overflow-hidden rounded-lg px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                    style={{ background: "#E765BE" }}
                  >
                    저장
                    {(!envKey.trim() || !envValue.trim() || !envType) && <span className="absolute inset-0 rounded-lg bg-white/70" />}
                  </button>
                </div>
              </div>
            </div>
          )}
          {/* 환경변수 삭제 확인 모달 */}
          {envDeleteIndex !== null && (
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => setEnvDeleteIndex(null)}>
              <div
                className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: "modalScaleIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex w-full flex-col gap-2">
                  <p className="text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">이 환경변수를 정말 삭제할까요?</p>
                  <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">이 작업은 되돌릴 수 없어요</p>
                </div>
                <div className="flex items-start gap-2">
                  <button type="button" onClick={() => setEnvDeleteIndex(null)} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">
                    닫기
                  </button>
                  <button
                    type="button"
                    onClick={() => { setEnvVars(envVars.filter((_, j) => j !== envDeleteIndex)); setEnvDeleteIndex(null); }}
                    className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === "배포" ? (
        <div className="flex flex-col gap-6">
          {/* 배포하기 안내 카드 (상세 페이지에서는 숨김) */}
          {!(gitStep === "connected" && deployStarted && deployDetailId !== null) && (
            <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
              <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#3f3f46]">배포하기</p>
              <div className="text-base leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                <p>문제없이 배포 가능한 상태인 지 자동으로 검사하고, 앱을 배포해요</p>
                <p>배포 진행 상태와 결과, CI 기록을 관리할 수 있어요</p>
              </div>
            </div>
          )}
          {/* CTA 섹션 */}
          {gitStep === "connected" && deployStarted ? (
            deployDetailId !== null ? (
            <>
              {/* 배포 상세 페이지 */}
              <div className="flex flex-col gap-6">
                {/* 목록으로 돌아가기 (sticky) */}
                <button data-deploy-detail type="button" onClick={() => setDeployDetailId(null)} className="sticky -top-6 z-10 -mx-6 flex items-center gap-2 px-6 py-4 backdrop-blur-[4px]" style={{ backgroundColor: "rgba(255,255,255,0.38)" }}>
                  <span className="flex items-center justify-center rounded-full border border-[#e4e4e7] bg-white p-2">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M12.5 15.833L7.5 10L12.5 4.167" stroke="#3f3f46" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </span>
                  <span className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">목록으로 돌아가기</span>
                </button>

                {/* 배포 제목 + 실패 사유 */}
                <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-5">
                  <h2 className="text-2xl font-semibold leading-[1.2] text-[#18181b]">배포 #{deployDetailId}-6a74632</h2>
                  <div className="flex flex-col gap-2 rounded-xl bg-[#fee8ea] p-5">
                    <div className="flex items-center gap-1.5">
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z" fill="#f5475c" />
                        <path d="M10 7v4" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                        <circle cx="10" cy="13.5" r="0.75" fill="white" />
                      </svg>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#f5475c]">실패 사유</span>
                    </div>
                    <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#18181b]">nextjs 프리셋을 사용하지만 next.config에 <code className="rounded bg-[rgba(245,71,92,0.1)] px-1 py-0.5 font-mono text-base">output: &apos;standalone&apos;</code> 설정이 없습니다.</p>
                  </div>
                </div>

                {/* 정보 */}
                <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-5">
                  <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">정보</h3>
                  <div className="flex flex-wrap gap-x-5 gap-y-10">
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">상태</span>
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#f5475c]" />
                        <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#f5475c]">Failed</span>
                      </div>
                    </div>
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">브랜치</span>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">main</span>
                    </div>
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">시작 시각</span>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">2026.04.28 13:30:06</span>
                    </div>
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">완료 시각</span>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">2026.04.28 13:30:09</span>
                    </div>
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">실패 시각</span>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">2026.04.28 13:30:09</span>
                    </div>
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">배포 시각</span>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">-</span>
                    </div>
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">프레임워크</span>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">-</span>
                    </div>
                    <div className="flex w-[464px] flex-col gap-1">
                      <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">커밋 메시지</span>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">-</span>
                    </div>
                  </div>
                </div>

                {/* 배포 단계 */}
                <div className="flex flex-col gap-6 border-b border-[rgba(82,82,91,0.08)] py-5">
                  <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">배포 단계</h3>
                  <div className="w-fit overflow-hidden rounded-xl border-[0.5px] border-[#e4e4e7]">
                    <div className="flex bg-[#f6f6f6]">
                      <div className="flex w-[140px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">단계</span></div>
                      <div className="flex w-[140px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">결과</span></div>
                      <div className="flex w-[140px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">소요 시간</span></div>
                    </div>
                    {[
                      { step: "Git 연결", result: "완료", color: "#1fa24e", time: "0.5초" },
                      { step: "GitHub 인증", result: "완료", color: "#1fa24e", time: "0.25초" },
                      { step: "프로젝트 설정", result: "완료", color: "#1fa24e", time: "2초" },
                      { step: "환경 준비", result: "완료", color: "#1fa24e", time: "1초" },
                      { step: "CI 검증", result: "실패", color: "#f5475c", time: "0.3초" },
                    ].map((s) => (
                      <div key={s.step} className="flex bg-white">
                        <div className="flex h-[60px] w-[140px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{s.step}</span></div>
                        <div className="flex h-[60px] w-[140px] items-center gap-1.5 border-[0.5px] border-[#e4e4e7] px-4 py-3">
                          <span className="size-2 rounded-full" style={{ backgroundColor: s.color }} />
                          <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px]" style={{ color: s.color }}>{s.result}</span>
                        </div>
                        <div className="flex h-[60px] w-[140px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{s.time}</span></div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 이 배포의 CI */}
                <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-5">
                  <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">이 배포의 CI</h3>
                  <div className="flex h-[150px] flex-col items-center justify-center gap-2.5">
                    <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">최근 20건 중 이 배포에 연결된 CI 이력이 없어요</span>
                    <div className="flex items-center gap-1">
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#1571F3]">전체 CI 이력 보기</span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M6.75 3.75L12.25 9L6.75 14.25" stroke="#1571F3" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                  </div>
                </div>

                {/* 빌드 로그 */}
                <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-5">
                  <h3 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">빌드 로그</h3>
                  <div className="flex h-[150px] items-center justify-center">
                    <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">아직 빌드 로그가 없어요</span>
                  </div>
                </div>
              </div>
            </>
            ) : (
            <>
              {/* 현재 배포 상태 */}
              <div className="flex flex-col gap-6 py-5">
                <div className="flex items-center gap-6">
                  <span className="flex-1 text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">현재 배포 상태</span>
                  <button type="button" onClick={() => {}} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">수동 배포</button>
                </div>
                {/* 배포 정보 카드 */}
                <div className="flex flex-col gap-5 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
                  <p className="text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-[#3f3f46]">#420-6a74632</p>
                  <div className="flex flex-col gap-3">
                    {/* 상태 */}
                    <div className="flex items-center gap-1">
                      <span className="w-[66px] px-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">상태</span>
                      <div className="flex items-center gap-1.5">
                        <span className="size-2 rounded-full bg-[#f6c205]" />
                        <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#f6c205]">Pending</span>
                      </div>
                    </div>
                    {/* 시간 */}
                    <div className="flex items-center gap-1">
                      <span className="w-[66px] px-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">시간</span>
                      <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">2026.04.28 13:30:06</span>
                    </div>
                    {/* 도메인 */}
                    <div className="flex items-center gap-1">
                      <span className="w-[66px] px-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">도메인</span>
                      <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">https://jocodingax-ai-jocoding-ax.jocodingax.ai</span>
                      <button type="button" className="flex size-6 shrink-0 items-center justify-center rounded-md text-[#a1a1aa] transition-colors hover:bg-[#e4e4e7] hover:text-[#71717a]">
                        <svg width="18" height="18" viewBox="0 0 256 256" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path d="M224,104a8,8,0,0,1-16,0V59.31l-98.34,98.35a8,8,0,0,1-11.32-11.32L196.69,48H152a8,8,0,0,1,0-16h64a8,8,0,0,1,8,8Zm-40,24a8,8,0,0,0-8,8v72H48V80h72a8,8,0,0,0,0-16H48A16,16,0,0,0,32,80V208a16,16,0,0,0,16,16H176a16,16,0,0,0,16-16V136A8,8,0,0,0,184,128Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* 배포 이력 */}
              <div className="flex flex-col items-center gap-6 py-5">
                <div className="flex w-full items-end gap-6">
                  <div className="flex flex-1 items-start gap-2">
                    <span className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">배포 이력</span>
                    <span className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#E765BE]">10건</span>
                  </div>
                  <div className="relative">
                    <button type="button" onClick={() => setDeployFilterOpen(!deployFilterOpen)} className="flex items-center gap-1">
                      <span className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b]">{deployFilter}</span>
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: "rotate(90deg)" }}><path d="M6.75 3.75L11.25 9L6.75 14.25" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </button>
                    {deployFilterOpen && (
                      <div className="absolute right-0 top-full z-20 mt-1 flex min-w-[140px] flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
                        {["전체 상태", "Pending", "Building", "Running", "Failed", "Stopped"].map((f) => (
                          <button key={f} type="button" onClick={() => { setDeployFilter(f); setDeployFilterOpen(false); }} className={`flex items-center gap-2 px-4 py-2.5 text-left text-sm leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50 ${deployFilter === f ? "font-semibold text-[#E765BE]" : "font-normal text-[#3f3f46]"}`}>
                            {f !== "전체 상태" && <span className="size-2 rounded-full" style={{ backgroundColor: f === "Pending" ? "#f6c205" : f === "Building" ? "#3d8df7" : f === "Running" ? "#1fa24e" : f === "Failed" ? "#f5475c" : "#71717a" }} />}
                            {f}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                {/* 테이블 */}
                <div className="w-full overflow-hidden rounded-xl border-[0.5px] border-[#e4e4e7] transition-[max-height] duration-500 ease-in-out" style={{ maxHeight: deployExpanded ? "660px" : "348px" }}>
                  <div className="flex bg-[#f6f6f6]">
                    <div className="flex w-[70px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">#</span></div>
                    <div className="flex w-[140px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">커밋</span></div>
                    <div className="flex w-[110px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">상태</span></div>
                    <div className="flex flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">메시지</span></div>
                    <div className="flex w-[122px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">시간</span></div>
                    <div className="flex w-[112px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">작업</span></div>
                  </div>
                  {(() => {
                    const allRows = [
                      { id: 420, commit: "6a74632", status: "Pending", color: "#f6c205", msg: "nextjs 프리셋을 사용하지만 어쩌구저쩌구 어쩌구저쩌구" },
                      { id: 419, commit: "6a74632", status: "Building", color: "#3d8df7", msg: "nextjs 프리셋을 사용하지만 어쩌구저쩌구 어쩌구저쩌구" },
                      { id: 418, commit: "6a74632", status: "Running", color: "#1fa24e", msg: "nextjs 프리셋을 사용하지만 어쩌구저쩌구 어쩌구저쩌구" },
                      { id: 417, commit: "6a74632", status: "Failed", color: "#f5475c", msg: "nextjs 프리셋을 사용하지만 어쩌구저쩌구 어쩌구저쩌구" },
                      { id: 416, commit: "6a74632", status: "Stopped", color: "#71717a", msg: "nextjs 프리셋을 사용하지만 어쩌구저쩌구 어쩌구저쩌구" },
                      { id: 415, commit: "3b12a9f", status: "Running", color: "#1fa24e", msg: "API 엔드포인트 수정 및 에러 핸들링 개선" },
                      { id: 414, commit: "a8f2c1d", status: "Running", color: "#1fa24e", msg: "사용자 인증 로직 리팩토링" },
                      { id: 413, commit: "e5d7b3a", status: "Failed", color: "#f5475c", msg: "데이터베이스 마이그레이션 스크립트 추가" },
                      { id: 412, commit: "c9e4f2b", status: "Running", color: "#1fa24e", msg: "캐시 무효화 로직 추가 및 성능 최적화" },
                      { id: 411, commit: "1a3d5e7", status: "Running", color: "#1fa24e", msg: "초기 프로젝트 세팅 및 CI/CD 파이프라인 구성" },
                    ];
                    const filtered = deployFilter === "전체 상태" ? allRows : allRows.filter(r => r.status === deployFilter);
                    return filtered.map((row, idx) => (
                      <div key={row.id} className="flex bg-white">
                        <div className="flex h-[60px] w-[70px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{row.id}</span></div>
                        <div className="flex h-[60px] w-[140px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{row.commit}</span></div>
                        <div className="flex h-[60px] w-[110px] items-center gap-1.5 border-[0.5px] border-[#e4e4e7] px-4 py-3">
                          <span className="size-2 rounded-full" style={{ backgroundColor: row.color }} />
                          <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px]" style={{ color: row.color }}>{row.status}</span>
                        </div>
                        <div className="flex h-[60px] flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="truncate text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{row.msg}</span></div>
                        <div className="flex h-[60px] w-[122px] items-center justify-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">00/00 00:00</span></div>
                        <div className="flex h-[60px] w-[112px] items-center justify-center border-[0.5px] border-[#e4e4e7] px-4 py-3">
                          <button type="button" onClick={() => { setDeployDetailId(row.id); requestAnimationFrame(() => { const el = document.querySelector('[data-deploy-detail]'); el?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }); }} className="flex h-9 shrink-0 items-center justify-center whitespace-nowrap rounded-lg bg-[#f6f6f6] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">상세보기</button>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
                <button type="button" onClick={() => setDeployExpanded(!deployExpanded)} className="flex h-8 items-center justify-center rounded-lg border border-[#e4e4e7] bg-white px-5 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-gray-50">{deployExpanded ? "접기" : "펼치기"}</button>
              </div>

              {/* CI 이력 */}
              <div className="flex flex-col gap-6 py-5">
                <div className="flex items-start gap-2">
                  <span className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">CI 이력</span>
                  <span className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#E765BE]">0건</span>
                </div>
                {/* 통계 카드 3열 */}
                <div className="flex gap-3">
                  {[
                    { label: "최근 30일 배포 성공률", value: "0.0%", tooltip: "배포 시도 중 성공한 비율로\n안정적으로 운영되고 있는 지 판단하는 지표예요" },
                    { label: "평균 실행 시간", value: "0초", tooltip: "배포 완료까지 걸리는 시간으로\n속도가 느리다면 개선이 필요할 수 있어요" },
                    { label: "캐시 적중률", value: "0.0%", tooltip: "얼마나 빠르고 효율적으로 처리하고 있는 지\n빌드 최적화 상태를 보여줘요" },
                  ].map((stat) => (
                    <div key={stat.label} className="flex flex-1 flex-col items-center gap-4 rounded-xl border border-[#e4e4e7] p-4">
                      <div className="flex items-center gap-1">
                        <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{stat.label}</span>
                        <div className="relative flex shrink-0 items-center justify-center">
                          <button type="button" onClick={() => setStatTooltip(statTooltip === stat.label ? null : stat.label)}>
                            <svg width="20" height="20" viewBox="0 0 256 256" fill="#a1a1aa" xmlns="http://www.w3.org/2000/svg">
                              <path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,168a12,12,0,1,1,12-12A12,12,0,0,1,128,192Zm8-48.72V144a8,8,0,0,1-16,0v-8a8,8,0,0,1,8-8,20,20,0,1,0-20-20,8,8,0,0,1-16,0,36,36,0,1,1,44,35.28Z" />
                            </svg>
                          </button>
                          {statTooltip === stat.label && (
                            <div className="absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-pre-line rounded-lg bg-[#27272a] px-2.5 py-1.5 font-medium leading-[1.3] tracking-[-0.13px] text-white shadow-[0px_2px_8px_rgba(0,0,0,0.06),0px_-6px_12px_rgba(0,0,0,0.03),0px_14px_28px_rgba(0,0,0,0.04)] backdrop-blur-[20px]" style={{ width: "max-content", fontSize: "13px" }}>
                              {stat.tooltip}
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="text-[32px] font-bold leading-[1.2] text-[#d4d4d8]">{stat.value}</span>
                    </div>
                  ))}
                </div>
                {/* 전체 활동 필터 */}
                <div className="relative flex items-center justify-end">
                  <button type="button" onClick={() => setCiFilterOpen(!ciFilterOpen)} className="flex items-center gap-1">
                    <span className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b]">{ciFilter}</span>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" style={{ transform: "rotate(90deg)" }}><path d="M6.75 3.75L11.25 9L6.75 14.25" stroke="#18181b" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  </button>
                  {ciFilterOpen && (
                    <div className="absolute right-0 top-full z-20 mt-1 flex min-w-[140px] flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
                      {["전체 활동", "자동 배포", "수동 배포"].map((f) => (
                        <button key={f} type="button" onClick={() => { setCiFilter(f); setCiFilterOpen(false); }} className={`px-4 py-2.5 text-left text-sm leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50 ${ciFilter === f ? "font-semibold text-[#E765BE]" : "font-normal text-[#3f3f46]"}`}>
                          {f}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {/* 빈 상태 */}
                <div className="flex h-[197px] items-center justify-center py-10">
                  <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">아직 CI 실행 기록이 없어요</span>
                </div>
              </div>
            </>
            )
          ) : (
          <div className="flex flex-col items-center gap-6 py-10">
            {gitStep === "connected" ? (
              <>
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">배포를 시작해 주세요</p>
                  <div className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                    <p>Git에서 push하여 자동 배포하거나</p>
                    <p>아래 버튼으로 수동 배포할 수 있어요</p>
                  </div>
                </div>
                <button type="button" onClick={() => setDeployStarted(true)} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                  수동 배포
                </button>
              </>
            ) : (
              <>
                <div className="flex flex-col items-center gap-2 text-center">
                  <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">아직 Git 연동이 완료되지 않았어요</p>
                  <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">앱을 배포하려면 먼저 GitHub 저장소를 연결해 주세요</p>
                </div>
                <button type="button" onClick={() => setActiveTab("Git 연동")} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                  Git 연동
                </button>
              </>
            )}
          </div>
          )}
        </div>
      ) : activeTab === "멤버" ? (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
            <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#3f3f46]">멤버 관리</p>
            <p className="text-base leading-[1.5] tracking-[-0.16px] text-[#71717a]">앱 관리페이지에 접근할 수 있는 멤버를 설정해요</p>
          </div>
          {members.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-10">
            <div className="flex flex-col items-center gap-2 text-center">
              <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">접근할 수 있는 멤버를 추가하세요</p>
              <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">아직은 멤버가 아무도 없어요</p>
            </div>
            <button type="button" onClick={() => { setMemberAddModalOpen(true); setMemberAddMode("user"); setSelectedMemberUser(null); setSelectedMemberRole(null); setMemberDropdownOpen(false); }} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
              멤버 추가
            </button>
          </div>
          ) : (
          <div className="flex flex-col gap-6 py-5">
            <div className="flex items-center justify-between">
              <div className="flex h-10 w-[240px] items-center gap-1.5 rounded-xl bg-[#f4f4f5] px-4 py-3">
                <svg className="size-5 shrink-0 text-[#a1a1aa]" fill="none" viewBox="0 0 20 20"><circle cx="9" cy="9" r="5.5" stroke="currentColor" strokeWidth="1.5" /><path d="M13.5 13.5L16.5 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>
                <input type="text" value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} placeholder="이름으로 검색" className="flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:outline-none" />
              </div>
              <button type="button" onClick={() => { setMemberAddModalOpen(true); setMemberAddMode("user"); setSelectedMemberUser(null); setSelectedMemberRole(null); setMemberDropdownOpen(false); }} className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-4 py-2 text-sm font-bold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                멤버 추가
              </button>
            </div>
            <div className="overflow-hidden rounded-xl border-[0.5px] border-[#e4e4e7]">
              {/* 테이블 헤더 */}
              <div className="flex bg-[#f6f6f6]">
                <div className="flex w-[120px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">이름</span></div>
                <div className="flex flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">이메일</span></div>
                <div className="flex flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">권한</span></div>
                <div className="flex w-[114px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">추가일</span></div>
                <div className="flex w-[89px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">작업</span></div>
              </div>
              {/* 테이블 바디 */}
              {members.filter((m) => !memberSearch || m.name.includes(memberSearch)).map((m, i) => (
                <div key={i} className="flex bg-white">
                  <div className="flex h-[60px] w-[120px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{m.name}</span></div>
                  <div className="flex h-[60px] flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{m.email}</span></div>
                  <div className="flex h-[60px] flex-1 items-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="truncate text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{m.permission}</span></div>
                  <div className="flex h-[60px] w-[114px] items-center justify-center border-[0.5px] border-[#e4e4e7] px-4 py-3"><span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{m.addedAt}</span></div>
                  <div className="flex h-[60px] w-[89px] items-center justify-center border-[0.5px] border-[#e4e4e7] px-4 py-3">
                    <button type="button" onClick={() => setMemberDeleteIndex(i)} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#f5475c] transition-colors hover:bg-[#ececec]">삭제</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          )}
          {/* 멤버 추가 모달 */}
          {memberAddModalOpen && (() => {
            const mockUsers = [
              { name: "김민영", email: "minyoung@jocodingax.ai" },
              { name: "이서준", email: "seojun@jocodingax.ai" },
              { name: "박지현", email: "jihyun@jocodingax.ai" },
              { name: "최유진", email: "yujin@jocodingax.ai" },
              { name: "정하늘", email: "haneul@jocodingax.ai" },
            ];
            const roleUsers: Record<string, { name: string; email: string }[]> = {
              "개발팀": [{ name: "강수빈", email: "sui@jocodingax.ai" }, { name: "한도윤", email: "doyun@jocodingax.ai" }],
              "디자인팀": [{ name: "오예린", email: "yerin@jocodingax.ai" }, { name: "송민서", email: "minseo@jocodingax.ai" }],
              "기획팀": [{ name: "윤지우", email: "jiwoo@jocodingax.ai" }],
              "마케팅팀": [{ name: "임채원", email: "chaewon@jocodingax.ai" }, { name: "홍서아", email: "seoa@jocodingax.ai" }],
              "운영팀": [{ name: "배준호", email: "junho@jocodingax.ai" }],
            };
            const mockRoles = Object.keys(roleUsers);
            const isUserMode = memberAddMode === "user";
            const isSelected = isUserMode ? !!selectedMemberUser : !!selectedMemberRole;
            const today = new Date().toISOString().slice(0, 10).replace(/-/g, ".");
            const handleAdd = () => {
              if (isUserMode && selectedMemberUser) {
                const match = selectedMemberUser.match(/^(.+?) \((.+?)\)$/);
                if (match) {
                  const exists = members.some((m) => m.email === match[2]);
                  if (!exists) setMembers([...members, { name: match[1], email: match[2], permission: "read, write", addedAt: today }]);
                }
              } else if (!isUserMode && selectedMemberRole) {
                const users = roleUsers[selectedMemberRole] || [];
                const newMembers = users.filter((u) => !members.some((m) => m.email === u.email)).map((u) => ({ name: u.name, email: u.email, permission: "read, write", addedAt: today }));
                if (newMembers.length > 0) setMembers([...members, ...newMembers]);
              }
              setMemberAddModalOpen(false);
            };
            return (
              <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => setMemberAddModalOpen(false)}>
                <div
                  className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                  style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: "modalScaleIn 0.3s ease-out" }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">멤버 추가하기</p>
                  {/* 모드 선택 */}
                  <div className="flex w-full gap-2">
                    <button type="button" onClick={() => { setMemberAddMode("user"); setSelectedMemberUser(null); setSelectedMemberRole(null); setMemberDropdownOpen(false); }} className={`flex flex-1 flex-col gap-2 rounded-xl border p-4 text-left transition-colors ${isUserMode ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">개인 사용자별</span>
                      <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">특정 사내 구성원 찾기</span>
                    </button>
                    <button type="button" onClick={() => { setMemberAddMode("role"); setSelectedMemberUser(null); setSelectedMemberRole(null); setMemberDropdownOpen(false); }} className={`flex flex-1 flex-col gap-2 rounded-xl border p-4 text-left transition-colors ${!isUserMode ? "border-[#E765BE] bg-[#fdf2f8]" : "border-[#e4e4e7] bg-white hover:border-[#d4d4d8]"}`}>
                      <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">전체 역할별</span>
                      <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">직무, 부서별로 한 번에 찾기</span>
                    </button>
                  </div>
                  {/* 드롭다운 */}
                  <div className="relative w-full">
                    <div className="flex h-12 w-full cursor-pointer items-center justify-between rounded-xl border border-[#e4e4e7] bg-white px-4" onClick={() => { if (!memberDropdownOpen) { setMemberDropdownOpen(true); setMemberDropdownSearch(""); } }}>
                      {memberDropdownOpen ? (
                        <input type="text" autoFocus value={memberDropdownSearch} onChange={(e) => setMemberDropdownSearch(e.target.value)} placeholder={isUserMode ? "이름 또는 이메일로 검색" : "역할 검색"} className="flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:outline-none" onBlur={() => setTimeout(() => setMemberDropdownOpen(false), 150)} />
                      ) : (
                        <span className={`text-base leading-[1.5] tracking-[-0.16px] ${(isUserMode ? selectedMemberUser : selectedMemberRole) ? "font-normal text-[#18181b]" : "font-normal text-[#a1a1aa]"}`}>
                          {isUserMode ? (selectedMemberUser ?? "사용자 선택") : (selectedMemberRole ?? "역할 선택")}
                        </span>
                      )}
                      <svg className={`size-5 shrink-0 text-[#a1a1aa] transition-transform ${memberDropdownOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 20 20"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                    </div>
                    {memberDropdownOpen && (() => {
                      const query = memberDropdownSearch.toLowerCase();
                      const filteredUsers = mockUsers.filter((u) => u.name.toLowerCase().includes(query) || u.email.toLowerCase().includes(query));
                      const filteredRoles = mockRoles.filter((r) => r.toLowerCase().includes(query));
                      return (
                        <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 rounded-xl border border-[#e4e4e7] bg-white shadow-lg">
                          <div className="max-h-[200px] overflow-y-auto py-1">
                            {isUserMode ? (filteredUsers.length > 0 ? filteredUsers.map((u) => (
                              <button key={u.email} type="button" onClick={() => { setSelectedMemberUser(`${u.name} (${u.email})`); setMemberDropdownOpen(false); setMemberDropdownSearch(""); }} className="flex w-full flex-col px-4 py-2.5 text-left transition-colors hover:bg-gray-50">
                                <span className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b]">{u.name}</span>
                                <span className="text-xs leading-[1.3] tracking-[-0.12px] text-[#71717a]">{u.email}</span>
                              </button>
                            )) : (
                              <p className="px-4 py-3 text-sm text-[#a1a1aa]">검색 결과가 없어요</p>
                            )) : (filteredRoles.length > 0 ? filteredRoles.map((role) => (
                              <button key={role} type="button" onClick={() => { setSelectedMemberRole(role); setMemberDropdownOpen(false); setMemberDropdownSearch(""); }} className="flex w-full px-4 py-2.5 text-left text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-gray-50">
                                {role}
                              </button>
                            )) : (
                              <p className="px-4 py-3 text-sm text-[#a1a1aa]">검색 결과가 없어요</p>
                            ))}
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                  {/* 버튼 */}
                  <div className="flex items-start gap-2">
                    <button type="button" onClick={() => setMemberAddModalOpen(false)} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">
                      닫기
                    </button>
                    <button
                      type="button"
                      disabled={!isSelected}
                      onClick={handleAdd}
                      className="relative flex h-9 items-center justify-center overflow-hidden rounded-lg bg-[#E765BE] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                    >
                      추가
                      {!isSelected && <span className="absolute inset-0 rounded-lg bg-white/70" />}
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
          {/* 멤버 삭제 확인 모달 */}
          {memberDeleteIndex !== null && (
            <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => setMemberDeleteIndex(null)}>
              <div
                className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: "modalScaleIn 0.3s ease-out" }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex w-full flex-col gap-2">
                  <p className="text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">이 멤버를 정말 삭제할까요?</p>
                  <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">이 멤버는 더 이상 관리페이지에 접근할 수 없게 돼요</p>
                </div>
                <div className="flex items-start gap-2">
                  <button type="button" onClick={() => setMemberDeleteIndex(null)} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">
                    닫기
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMembers(members.filter((_, j) => j !== memberDeleteIndex)); setMemberDeleteIndex(null); }}
                    className="flex h-9 items-center justify-center rounded-lg bg-[#E765BE] px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">{activeTab} 페이지 준비 중입니다</p>
        </div>
      )}
    </div>
  );
}

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
  { name: "박민영", time: "1시간 전", text: "댓글 카드 높이는 166px 고정입니다. 댓글의 내용이 길어질 경우 \"...\"로 보여지고 카드를 클릭하면 상세 모달로 볼 수 있습니다.", likes: 2, replies: 0, liked: false, isMine: true },
  { name: "송재희", time: "2시간 전", text: "상단 좌측부터 최신순으로 정렬됩니다. 자신이 남긴 댓글일 경우, 수정과 삭제가 가능합니다.", likes: 3, replies: 0, liked: true },
  { name: "김태호", time: "3시간 전", text: "이 앱 덕분에 업무 효율이 많이 올라갔습니다. 추천합니다!", likes: 5, replies: 1, liked: true },
  { name: "이수진", time: "4시간 전", text: "UI가 직관적이고 사용하기 편합니다. 다만 로딩 속도가 조금 느린 것 같아요.", likes: 1, replies: 2, liked: false },
  { name: "정현우", time: "5시간 전", text: "팀원들과 공유하기 좋은 앱이네요. 협업할 때 유용하게 쓰고 있습니다.", likes: 4, replies: 0, liked: true },
  { name: "최예린", time: "6시간 전", text: "기능이 다양하고 좋습니다. 특히 데이터 분석 기능이 마음에 듭니다.", likes: 2, replies: 1, liked: false },
  { name: "한지민", time: "7시간 전", text: "매일 사용하는 필수 앱이 되었어요. 감사합니다!", likes: 7, replies: 10, liked: true },
  { name: "오승현", time: "8시간 전", text: "업데이트 후 새로운 기능이 추가되어서 더 좋아졌습니다.", likes: 0, replies: 0, liked: false },
  { name: "윤서아", time: "9시간 전", text: "다크모드 지원이 되면 더 좋을 것 같습니다. 그 외에는 만족합니다.", likes: 3, replies: 1, liked: false },
  { name: "강민수", time: "10시간 전", text: "알림 기능이 정확하게 작동해서 중요한 일정을 놓치지 않게 되었어요.", likes: 1, replies: 0, liked: false },
  { name: "임하늘", time: "11시간 전", text: "사용법이 간단해서 온보딩 없이도 바로 쓸 수 있었습니다.", likes: 6, replies: 2, liked: true },
  { name: "서준혁", time: "12시간 전", text: "API 연동이 잘 되어있어서 다른 툴과 함께 사용하기 좋습니다.", likes: 2, replies: 0, liked: false },
  { name: "배수연", time: "1일 전", text: "모바일에서도 잘 작동합니다. 반응형 지원 감사합니다.", likes: 4, replies: 1, liked: true },
  { name: "조민재", time: "1일 전", text: "처음엔 어색했는데 쓰다보니 없으면 안 되는 앱이 되었어요.", likes: 0, replies: 0, liked: false },
  { name: "신예진", time: "2일 전", text: "다른 팀에도 추천했습니다. 반응이 좋더라고요!", likes: 8, replies: 4, liked: true },
  { name: "황도윤", time: "2일 전", text: "정기적으로 업데이트되는 점이 신뢰가 갑니다.", likes: 1, replies: 0, liked: false },
  { name: "문서현", time: "3일 전", text: "보고서 작성할 때 정말 유용하게 쓰고 있습니다. 감사합니다.", likes: 3, replies: 1, liked: true },
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
  const [envKey, setEnvKey] = useState("");
  const [envValue, setEnvValue] = useState("");
  const [envType, setEnvType] = useState<string | null>(null);
  const [envVars, setEnvVars] = useState<{ key: string; value: string; type: string }[]>([]);
  const [guideComplete, setGuideComplete] = useState(false);
  const [guideDismissed, setGuideDismissed] = useState(false);
  const [guideHidden, setGuideHidden] = useState(false);
  const [modalMoreOpen, setModalMoreOpen] = useState(false);
  const [modalComment, setModalComment] = useState<number | null>(null);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likedSet, setLikedSet] = useState<Set<number>>(() => {
    const set = new Set<number>();
    comments.forEach((c, i) => { if (c.liked) set.add(i); });
    return set;
  });

  return (
    <div className="mx-auto flex w-full flex-col gap-6 pb-[100px] min-[1281px]:max-w-[1280px]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
      {/* 댓글 상세 모달 */}
      {modalComment !== null && (() => {
        const c = comments[modalComment];
        const repliesMap: Record<number, { name: string; time: string; text: string }[]> = {
          6: [ // 한지민 — 답글 10개 (스크롤 테스트)
            { name: "안승원", time: "1시간 전", text: "정말 유용한 앱이에요! 저도 매일 쓰고 있습니다." },
            { name: "박민영", time: "2시간 전", text: "동의합니다. 업무 효율이 확 올라갔어요." },
            { name: "김태호", time: "3시간 전", text: "우리 팀에서도 필수 앱으로 지정했어요." },
            { name: "이수진", time: "4시간 전", text: "기능 업데이트도 자주 되어서 좋습니다." },
            { name: "정현우", time: "5시간 전", text: "모바일에서도 잘 작동하나요?" },
            { name: "안승원", time: "5시간 전", text: "네, 모바일에서도 완벽하게 작동합니다." },
            { name: "최예린", time: "6시간 전", text: "다크모드도 지원되면 더 좋겠어요." },
            { name: "송재희", time: "7시간 전", text: "알림 기능이 특히 편리합니다." },
            { name: "오승현", time: "8시간 전", text: "API 연동 문서도 잘 되어있어서 개발하기 좋아요." },
            { name: "강민수", time: "9시간 전", text: "추천합니다! 팀 전체가 만족하고 있어요." },
          ],
        };
        const defaultReplies = [
          { name: "안승원", time: "3시간 전", text: "어쩌구저쩌구 답글을 남겼습니다" },
          { name: "안승원", time: "3시간 전", text: "어쩌구저쩌구 답글을 남겼습니다" },
        ];
        const replies = c.isMine ? [] : (repliesMap[modalComment] ?? defaultReplies);
        return (
          <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20" onClick={() => { setModalComment(null); setReplyText(""); setModalMoreOpen(false); }}>
            <div
              className="flex max-h-[80vh] w-full max-w-[480px] flex-col gap-3 rounded-2xl bg-[#f6f6f6] p-5 shadow-[0px_8px_32px_rgba(0,0,0,0.12)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* 원본 댓글 (고정) */}
              <div className="flex shrink-0 flex-col gap-3">
                <div className="flex items-center gap-2.5">
                  {c.isMine && (
                    <span className="flex h-6 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white" style={{ backgroundColor: primaryColor }}>
                      내 댓글
                    </span>
                  )}
                  <span className="flex-1 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">{c.name}</span>
                  <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">{c.time}</span>
                </div>
                <div className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">
                  <p>{c.text}</p>
                </div>
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-1">
                    <button
                      type="button"
                      className="flex items-center gap-1"
                      onClick={() => setLikedSet((prev) => {
                        const next = new Set(prev);
                        if (next.has(modalComment)) next.delete(modalComment); else next.add(modalComment);
                        return next;
                      })}
                    >
                      <Image src={likedSet.has(modalComment) ? "/icons/version-b/comment-heart-active.svg" : "/icons/version-b/comment-heart.svg"} alt="" width={18} height={18} />
                      <span className="min-w-5 text-left text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-gray-500">{c.likes + (likedSet.has(modalComment) !== c.liked ? (likedSet.has(modalComment) ? 1 : -1) : 0)}</span>
                    </button>
                    <div className="flex items-center gap-1">
                      <Image src="/icons/version-b/comment-reply.svg" alt="" width={18} height={18} />
                      <span className="min-w-5 text-left text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-gray-500">{c.isMine ? c.replies : replies.length}</span>
                    </div>
                  </div>
                  {c.isMine && (
                    <div className="relative">
                      <button type="button" onClick={() => setModalMoreOpen(!modalMoreOpen)}>
                        <Image src="/icons/version-b/comment-more.svg" alt="" width={18} height={18} />
                      </button>
                      {modalMoreOpen && (
                        <div className="absolute right-0 top-full z-20 mt-1 flex min-w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
                          <button type="button" onClick={() => setModalMoreOpen(false)} className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50" style={{ color: "#3f3f46" }}>수정</button>
                          <button type="button" onClick={() => setModalMoreOpen(false)} className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50" style={{ color: "#f5475c" }}>삭제</button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* 구분선 */}
              <div className="h-px shrink-0 bg-[#e4e4e7]" />

              {/* 답글 목록 (스크롤) */}
              <div className="sidebar-scroll flex min-h-0 flex-1 flex-col overflow-y-auto">
                {replies.length === 0 ? (
                  <div className="flex items-center justify-center py-6">
                    <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-400">아직 답글이 없습니다</span>
                  </div>
                ) : replies.map((r, ri) => (
                  <div key={ri} className="flex flex-col gap-1 py-3">
                    <div className="flex items-center gap-2.5">
                      <span className="flex-1 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b]">{r.name}</span>
                      <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">{r.time}</span>
                    </div>
                    <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">{r.text}</p>
                  </div>
                ))}
              </div>

              {/* 답글 입력란 (고정) */}
              <div className="flex shrink-0 min-h-[48px] items-center gap-1.5 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
                <input
                  type="text"
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="답글 남기기"
                  className="flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] outline-none placeholder:text-gray-500"
                />
                <Image
                  src={replyText.trim() ? "/icons/version-b/comment-send-active.svg" : "/icons/version-b/comment-send.svg"}
                  alt=""
                  width={20}
                  height={20}
                />
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
          state === "done" || state === "active" ? "bg-[#E765BE]" : "";
        const chipBg = (state: string) =>
          state === "future"
            ? { background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), #E765BE" }
            : undefined;
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
                  ) : isEnvTab ? (
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
                    <span className={`flex size-6 items-center justify-center rounded-full ${chipClass(step.state)} text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition group-hover:bg-[#d454a8]`} style={chipBg(step.state)}>{step.num}</span>
                    <span className={`whitespace-nowrap text-xs leading-[1.3] tracking-[-0.12px] ${labelClass(step.state)} transition group-hover:text-[#E765BE]`}>{step.label}</span>
                  </button>
                ))}
                {/* 앱 공개 */}
                <button type="button" onClick={() => setGuideComplete(true)} className="group relative z-10 flex flex-col items-center transition hover:scale-110">
                  <span
                    className={`flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition ${appPublished ? "bg-[#E765BE]" : "group-hover:brightness-90"}`}
                    style={!appPublished ? { background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), #E765BE" } : undefined}
                  >앱 공개</span>
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
              <span className="flex h-8 items-center justify-center overflow-hidden rounded-xl px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.48), rgba(255,255,255,0.48)), #E765BE" }}>
                배포 전
              </span>
            ) : appStatus === "열기" ? (
              <button
                type="button"
                className="flex h-8 items-center justify-center overflow-hidden rounded-xl px-4 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition-opacity hover:opacity-85"
                style={{ backgroundColor: primaryColor }}
              >
                열기
              </button>
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
          {["앱", "Git 연동", "배포", "테이블", "환경변수", "데이터 접근", "공유 테이블", "설정"].map((tab) => {
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
          <div className="flex items-start border-b border-[rgba(82,82,91,0.08)] pb-5">
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
          <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-5">
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

          {/* 정보 */}
          <div className="flex flex-col gap-5 border-b border-[rgba(82,82,91,0.08)] py-5">
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
                className={`flex h-9 w-fit items-center justify-center rounded-lg px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] transition-colors ${
                  selectedRepo && branchName.trim()
                    ? "bg-[#E765BE] text-white hover:opacity-90"
                    : "bg-[#e4e4e7] text-[#a1a1aa]"
                }`}
              >
                저장소 연결
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
                    <button type="button" className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46] transition-colors hover:bg-[#ececec]">수정</button>
                    <button type="button" onClick={() => setEnvVars(envVars.filter((_, j) => j !== i))} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-4 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#f5475c] transition-colors hover:bg-[#ececec]">삭제</button>
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
                    className="flex h-9 items-center justify-center rounded-lg px-8 py-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity"
                    style={{
                      background: envKey.trim() && envValue.trim() && envType
                        ? "#E765BE"
                        : "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), #E765BE",
                    }}
                  >
                    추가
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

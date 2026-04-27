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
  const [guideDismissed, setGuideDismissed] = useState(false);
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
    <div className="mx-auto flex w-full flex-col gap-6 pb-6 min-[1281px]:max-w-[1280px]" style={{ animation: "fadeSlideIn 0.4s ease-out" }}>
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
      {isAdmin && (() => {
        const isDeployTab = activeTab === "배포";
        const isEnvTab = activeTab === "환경변수";
        const isTableTab = activeTab === "테이블";
        const allRequired = isEnvTab;
        const step3Active = isDeployTab;
        const tableComplete = isTableTab || isEnvTab;

        const guideTitle = isEnvTab
          ? "앱이 스토어에 성공적으로 올라갔어요!"
          : isDeployTab
            ? "동료들이 앱에 접속할 수 있도록 배포해주세요"
            : "푸시할 때마다 자동 배포되도록 GitHub 저장소를 연결해주세요";
        const guideSubtitle = isEnvTab
          ? "앱의 성격에 따라 테이블, 환경변수를 설정해 주세요"
          : isDeployTab
            ? "1단계만 더 완료하면 앱이 공개돼요!"
            : "2단계만 더 완료하면 앱이 공개돼요!";
        const fillWidth = isEnvTab ? "300px" : isDeployTab ? "200px" : "100px";

        // Step states: "done" | "active" | "future"
        const step1 = "done";
        const step2 = (isDeployTab || allRequired) ? "done" : "active";
        const step3State = allRequired ? "done" : step3Active ? "active" : "future";
        const appPublished = allRequired;

        const chipStyle = (state: string) => {
          if (state === "done" || state === "active") return "bg-[#E765BE]";
          return "";
        };
        const chipBg = (state: string) =>
          state === "future"
            ? { background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), #E765BE" }
            : undefined;
        const labelClass = (state: string) => {
          if (state === "active") return "font-semibold text-[#E765BE]";
          if (state === "done") return "font-medium text-[rgba(231,101,190,0.5)]";
          return "font-medium text-[#a1a1aa]";
        };

        return (
          <div className="mx-auto flex w-[600px] flex-col gap-2">
            {isEnvTab && (
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
                <button type="button" className="flex size-6 items-center justify-center text-[#71717a] transition-colors hover:text-[#18181b]">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            )}
          <div className="flex flex-col gap-6 rounded-2xl bg-[#f9f9f9] p-6">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <span className="flex-1 text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">{guideTitle}</span>
                {isEnvTab ? (
                  <span className="shrink-0 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#E765BE]">스토어에서 보기</span>
                ) : (
                  <button type="button" className="flex h-7 shrink-0 items-center rounded-lg bg-[#E765BE] px-3 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition-opacity hover:opacity-90">바로가기</button>
                )}
              </div>
              <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{guideSubtitle}</p>
            </div>
            {/* Step progress */}
            <div className="relative flex items-start gap-10">
              <div className="absolute left-[25px] top-[9px] h-1.5 w-[504px] rounded-full bg-[#e4e4e7]" />
              <div className="absolute left-[26px] top-[9px] h-1.5 overflow-hidden rounded-full bg-[#E765BE] transition-all duration-500" style={{ width: fillWidth }}>
                <div className="absolute inset-0" style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 70%, transparent 100%)",
                  animation: "guideShimmer 2s ease-in-out infinite",
                }} />
              </div>
              {/* Step 1 */}
              <button type="button" onClick={() => setActiveTab("앱")} className="group relative z-10 flex w-[52px] flex-col items-center gap-3 transition hover:scale-110">
                <span className={`flex size-6 items-center justify-center rounded-full ${chipStyle(step1)} text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition group-hover:bg-[#d454a8]`}>1</span>
                <span className={`text-xs leading-[1.3] tracking-[-0.12px] ${labelClass(step1)} transition group-hover:text-[#E765BE]`}>앱 만들기</span>
              </button>
              {/* Step 2 */}
              <button type="button" onClick={() => setActiveTab("Git 연동")} className="group relative z-10 flex flex-col items-center gap-3 transition hover:scale-110">
                <span className={`flex size-6 items-center justify-center rounded-full ${chipStyle(step2)} text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition group-hover:bg-[#d454a8]`}>2</span>
                <span className={`whitespace-nowrap text-xs leading-[1.3] tracking-[-0.12px] ${labelClass(step2)} transition group-hover:text-[#d454a8]`}>Git 연결하기</span>
              </button>
              {/* Step 3 */}
              <button type="button" onClick={() => setActiveTab("배포")} className="group relative z-10 flex w-[48px] flex-col items-center gap-3 transition hover:scale-110">
                <span className={`flex size-6 items-center justify-center rounded-full ${chipStyle(step3State)} text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white transition group-hover:bg-[#d454a8]`} style={chipBg(step3State)}>3</span>
                <span className={`text-xs leading-[1.3] tracking-[-0.12px] ${labelClass(step3State)} transition group-hover:text-[#E765BE]`}>배포하기</span>
              </button>
              {/* 앱 공개 */}
              <div className="relative z-10 flex flex-col items-center">
                <span
                  className={`flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white ${appPublished ? "bg-[#E765BE]" : ""}`}
                  style={!appPublished ? { background: "linear-gradient(90deg, rgba(255,255,255,0.7), rgba(255,255,255,0.7)), #E765BE" } : undefined}
                >앱 공개</span>
              </div>
              {/* 테이블 생성 */}
              <button type="button" onClick={() => setActiveTab("테이블")} className="group relative z-10 flex w-16 flex-col items-center gap-3 transition hover:scale-110">
                {tableComplete ? (
                  <>
                    <span className="flex h-6 items-center justify-center rounded-full bg-[#1fa24e] px-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">완료</span>
                    <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#1fa24e]">테이블 생성</span>
                  </>
                ) : (
                  <>
                    <span className="flex h-6 items-center justify-center rounded-full bg-[#e4e4e7] px-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#71717a] transition group-hover:bg-[#d4d4d8]">선택</span>
                    <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa] transition group-hover:text-[#71717a]">테이블 생성</span>
                  </>
                )}
              </button>
              {/* 환경변수 등록 */}
              <button type="button" onClick={() => setActiveTab("환경변수")} className="group relative z-10 flex w-[76px] flex-col items-center gap-3 transition hover:scale-110">
                <span className="flex h-6 items-center justify-center rounded-full bg-[#e4e4e7] px-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#71717a] transition group-hover:bg-[#d4d4d8]">선택</span>
                <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa] transition group-hover:text-[#71717a]">환경변수 등록</span>
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
              <span className="flex h-8 items-center justify-center overflow-hidden rounded-xl px-4 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white" style={{ background: "linear-gradient(90deg, rgba(255,255,255,0.48), rgba(255,255,255,0.48)), #E765BE" }}>
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
          {["앱", "Git 연동", "배포", "테이블", "환경변수", "데이터 접근", "멤버", "설정"].map((tab) => {
            const hasWarning = tab === "Git 연동" || tab === "배포";
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`relative flex items-center gap-1 px-5 py-2 text-sm leading-[1.5] tracking-[-0.14px] transition-colors ${
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
      ) : (
        <div className="flex items-center justify-center py-20">
          <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">{activeTab} 페이지 준비 중입니다</p>
        </div>
      )}
    </div>
  );
}

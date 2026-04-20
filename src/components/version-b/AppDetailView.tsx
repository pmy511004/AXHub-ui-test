"use client";

import { useState, useRef } from "react";
import Image from "next/image";

interface AppDetailViewProps {
  appName: string;
  category: string;
  onBack: () => void;
  fromMenu: string;
  isAdmin?: boolean;
}

const adminTabs = ["앱", "테이블", "배포", "로그", "연동", "SSO", "설정"];

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

export default function AppDetailView({ appName, category, onBack, fromMenu, isAdmin }: AppDetailViewProps) {
  const [expanded, setExpanded] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [moreMenuOpen, setMoreMenuOpen] = useState<number | null>(null);
  const [modalMoreOpen, setModalMoreOpen] = useState(false);
  const [modalComment, setModalComment] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("앱");
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [likedSet, setLikedSet] = useState<Set<number>>(() => {
    const set = new Set<number>();
    comments.forEach((c, i) => { if (c.liked) set.add(i); });
    return set;
  });
  const [isRecommended, setIsRecommended] = useState(false);
  const [recommendCount, setRecommendCount] = useState(123);
  const [countAnim, setCountAnim] = useState<"up" | "down" | null>(null);
  const [starAnim, setStarAnim] = useState(false);
  const countKey = useRef(0);
  const toggleRecommend = () => {
    countKey.current += 1;
    if (isRecommended) {
      setIsRecommended(false);
      setRecommendCount((c) => c - 1);
      setCountAnim("down");
    } else {
      setIsRecommended(true);
      setRecommendCount((c) => c + 1);
      setCountAnim("up");
      setStarAnim(true);
    }
    setTimeout(() => setCountAnim(null), 400);
    setTimeout(() => setStarAnim(false), 600);
  };

  return (
    <div className="mx-auto flex w-full flex-col gap-6 min-[1281px]:max-w-[1280px]">
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
                    <span className="flex h-6 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white" style={{ backgroundColor: "#E765BE" }}>
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

      {/* Admin Tab Bar */}
      {isAdmin && (
        <div className="flex items-center justify-between rounded-2xl p-2" style={{ backgroundColor: "#f6f6f6" }}>
          <div className="flex items-center gap-2">
            {adminTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className="min-w-[62px] rounded-xl px-3 py-2 text-center text-sm leading-[1.5] tracking-[-0.14px] transition-colors"
                style={{
                  backgroundColor: activeTab === tab ? "#E765BE" : "transparent",
                  color: activeTab === tab ? "white" : "rgba(24,24,27,0.48)",
                  fontWeight: activeTab === tab ? 600 : 400,
                }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex shrink-0 items-center gap-1 px-2">
            <span className="text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-gray-500">관리자 가이드</span>
            <Image src="/icons/version-b/admin-guide.svg" alt="" width={20} height={20} />
          </div>
        </div>
      )}

      {/* 추천 위젯 (스크롤 시 상단 고정) */}
      <div
        className="sticky top-0 z-10 -mb-[72px] flex items-center gap-4 self-end rounded-2xl bg-white px-4 py-2"
        style={{
          boxShadow:
            "0px 14px 28px rgba(0, 0, 0, 0.04), 0px -6px 12px rgba(0, 0, 0, 0.03), 0px 2px 8px rgba(0, 0, 0, 0.06)",
        }}
      >
          <div className="flex min-h-[56px] flex-col items-center justify-center gap-1">
            <p className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-500">
              이 앱을 추천한 동료들
            </p>
            <div className="flex items-center gap-1">
              <div className="relative flex items-center justify-center">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className={starAnim ? "star-squish-bounce" : ""}
                >
                  <path
                    d="M10 2.5L12.472 7.508L18 8.313L14 12.213L14.944 17.72L10 15.12L5.056 17.72L6 12.213L2 8.313L7.528 7.508L10 2.5Z"
                    fill="#E765BE"
                  />
                </svg>
                {starAnim && [
                  { tx: "-22px", ty: "-26px", delay: "0s" },
                  { tx: "22px", ty: "-22px", delay: "0.05s" },
                  { tx: "-26px", ty: "12px", delay: "0.1s" },
                  { tx: "26px", ty: "16px", delay: "0.04s" },
                  { tx: "0px", ty: "-28px", delay: "0.08s" },
                  { tx: "-12px", ty: "26px", delay: "0.06s" },
                ].map((p, i) => (
                  <svg key={i} className="star-particle" width="8" height="8" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ "--tx": p.tx, "--ty": p.ty, animationDelay: p.delay } as React.CSSProperties}>
                    <path d="M10 2.5L12.472 7.508L18 8.313L14 12.213L14.944 17.72L10 15.12L5.056 17.72L6 12.213L2 8.313L7.528 7.508L10 2.5Z" fill="#E765BE" />
                  </svg>
                ))}
              </div>
              <p
                key={countKey.current}
                className={`whitespace-nowrap text-[22px] font-semibold leading-[1.3] tracking-[-0.22px] text-black ${countAnim === "up" ? "count-up" : countAnim === "down" ? "count-down" : ""}`}
              >
                {recommendCount}
              </p>
            </div>
          </div>
          <div className="flex items-center py-3">
            {isRecommended ? (
              <button
                type="button"
                onClick={toggleRecommend}
                className="flex h-8 w-[76px] items-center justify-center rounded-lg border border-[#d4d4d8] bg-white text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-gray-500 transition-all hover:bg-gray-50 active:scale-90"
              >
                추천취소
              </button>
            ) : (
              <button
                type="button"
                onClick={toggleRecommend}
                className="flex h-8 w-[76px] items-center justify-center rounded-lg border border-transparent text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-all hover:opacity-90 active:scale-90"
                style={{ backgroundColor: "#E765BE" }}
              >
                추천하기
              </button>
            )}
          </div>
        </div>

      {/* App Header */}
      <div className="flex flex-col">
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
        <div className="flex items-center gap-4 border-b border-[#e4e4e7] py-5">
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
              <button
                type="button"
                className="flex h-8 items-center justify-center overflow-hidden rounded-xl px-4 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white"
                style={{ backgroundColor: "#E765BE" }}
              >
                열기
              </button>
              <button
                type="button"
                className="flex h-8 items-center justify-center overflow-hidden rounded-xl bg-[#f6f6f6] px-4 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#18181b]"
              >
                보관
              </button>
              <button
                type="button"
                className="flex h-8 items-center justify-center overflow-hidden rounded-xl border border-[#e4e4e7] px-4 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#18181b]"
              >
                수정
              </button>
            </div>
          </div>
        </div>

        {/* Info Table */}
        <div className="flex items-start">
          <div className="flex flex-1 flex-col items-center gap-5 px-10 py-5">
            <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-500">개발자</span>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#18181b]">안승원</span>
              <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">sw.an@jocodingax.ai</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
            <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-500">생성일</span>
            <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#18181b]">2026.04.07</span>
          </div>
          <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
            <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-500">사용자 수</span>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#18181b]">80</span>
              <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">명</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
            <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-500">추천 수</span>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#18181b]">{recommendCount}</span>
              <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">개</span>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-5 self-stretch px-10 py-5">
            <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-500">댓글 수</span>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold leading-[1.3] tracking-[-0.2px] text-[#18181b]">17</span>
              <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">개</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="flex flex-col gap-5 border-b border-[#e4e4e7] py-5">
          <h3 className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">앱 정보</h3>
          <div className="flex items-end gap-2.5">
          <div
            className={`flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b] overflow-hidden ${expanded ? "" : "h-[105px]"}`}
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
            className="shrink-0 px-2 text-sm font-semibold leading-[1.5] tracking-[-0.14px]"
            style={{ color: "#e09a34" }}
          >
            {expanded ? "접기" : "더보기"}
          </button>
          </div>
        </div>
      </div>

      {/* 동료들이 남긴 한마디 */}
      <div className="flex flex-col gap-5">
        <h3 className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">
          동료들이 남긴 한마디
        </h3>
        <div className="grid grid-cols-2 gap-5 2xl:grid-cols-3">
          {comments.map((c, i) => (
            <div key={i} className="flex h-[166px] cursor-pointer flex-col gap-3 rounded-2xl bg-[#f6f6f6] p-5" onClick={() => setModalComment(i)}>
              <div className="flex items-center gap-2.5">
                {c.isMine && (
                  <span className="flex h-6 shrink-0 items-center justify-center rounded-md px-2 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white" style={{ backgroundColor: "#E765BE" }}>
                    내 댓글
                  </span>
                )}
                <span className="flex-1 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">{c.name}</span>
                <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">{c.time}</span>
              </div>
              <div className="flex-1 overflow-hidden text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">
                <p className="line-clamp-3">{c.text}</p>
              </div>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-1">
                  <button
                    type="button"
                    className="flex items-center gap-1"
                    onClick={(e) => { e.stopPropagation(); setLikedSet((prev) => {
                      const next = new Set(prev);
                      if (next.has(i)) next.delete(i); else next.add(i);
                      return next;
                    }); }}
                  >
                    <Image src={likedSet.has(i) ? "/icons/version-b/comment-heart-active.svg" : "/icons/version-b/comment-heart.svg"} alt="" width={18} height={18} />
                    <span className="min-w-5 text-left text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-gray-500">{c.likes + (likedSet.has(i) !== c.liked ? (likedSet.has(i) ? 1 : -1) : 0)}</span>
                  </button>
                  <div className="flex items-center gap-1">
                    <Image src="/icons/version-b/comment-reply.svg" alt="" width={18} height={18} />
                    <span className="min-w-5 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-gray-500">{c.replies}</span>
                  </div>
                </div>
                {c.isMine && (
                  <div className="relative">
                    <button type="button" onClick={(e) => { e.stopPropagation(); setMoreMenuOpen(moreMenuOpen === i ? null : i); }}>
                      <Image src="/icons/version-b/comment-more.svg" alt="" width={18} height={18} />
                    </button>
                    {moreMenuOpen === i && (
                      <div className="absolute right-0 top-full z-20 mt-1 flex min-w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
                        <button
                          type="button"
                          onClick={() => setMoreMenuOpen(null)}
                          className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50"
                          style={{ color: "#3f3f46" }}
                        >
                          수정
                        </button>
                        <button
                          type="button"
                          onClick={() => setMoreMenuOpen(null)}
                          className="whitespace-nowrap px-4 py-2.5 text-left text-sm font-normal leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50"
                          style={{ color: "#f5475c" }}
                        >
                          삭제
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 댓글 입력란 (콘텐츠 영역 하단 고정) */}
      <div className="sticky -bottom-6 bg-white py-5">
        <div className="flex min-h-[48px] items-center gap-1.5 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white px-4 py-3">
          <input
            type="text"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="이 앱에 대한 한 마디를 남겨주세요"
            className="flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] outline-none placeholder:text-gray-500"
          />
          <Image
            src={commentText.trim() ? "/icons/version-b/comment-send-active.svg" : "/icons/version-b/comment-send.svg"}
            alt=""
            width={20}
            height={20}
          />
        </div>
      </div>
    </div>
  );
}

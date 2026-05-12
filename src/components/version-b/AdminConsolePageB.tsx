"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import PageSidebar from "./PageSidebar";
import NotificationButton from "./NotificationButton";
import { useDarkMode } from "@/hooks/useDarkMode";

const PROFILE_ICONS = [
  "/icons/version-b/profile-gray.png",
  "/icons/version-b/profile-blue.png",
  "/icons/version-b/profile-green.png",
  "/icons/version-b/profile-peach.png",
  "/icons/version-b/profile-red.png",
];

function pickProfileIcon(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) | 0;
  }
  return PROFILE_ICONS[Math.abs(hash) % PROFILE_ICONS.length];
}

type SubMenuKey =
  | "intro"
  | "dev"
  | "dev-git"
  | "dev-env"
  | "dev-deploy"
  | "ops"
  | "ops-ops"
  | "ops-table"
  | "ops-data"
  | "members"
  | "settings"
  | "settings-info"
  | "settings-ci"
  | "settings-deploy"
  | "settings-api"
  | "settings-sso"
  | "settings-file"
  | "settings-cache";

type Crumb = { label: string; href?: string };

export default function AdminConsolePageB() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeTeam, setActiveTeam] = useState<"JO" | "DE">("JO");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode, setDarkMode] = useDarkMode();

  const appName = searchParams.get("app") ?? "ccrank";
  const category = searchParams.get("category") ?? "공용";

  const [activeMenu, setActiveMenu] = useState<SubMenuKey>("intro");

  const [introText, setIntroText] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [autoApprove, setAutoApprove] = useState(false);
  const [isArchived, setIsArchived] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [recommendModalOpen, setRecommendModalOpen] = useState(false);
  const [commentsModalOpen, setCommentsModalOpen] = useState(false);
  const [pendingUsers, setPendingUsers] = useState<{ name: string; email: string }[]>([]);
  const comments = [
    { name: "박민영", time: "1시간 전", text: "셋업이 정말 단순합니다. 토큰 키만 넣으면 자동으로 멤버 매핑까지 돼서 다음 날 바로 리포트가 도착했어요" },
    { name: "송재희", time: "1일 전", text: "토큰 사용량과 비용을 한눈에 볼 수 있어서 팀 단위 운영에 도움이 많이 됩니다" },
    { name: "안준성", time: "20일 전", text: "Slack 알림 연동까지 자연스럽게 되어 모니터링 부담이 줄었어요. 강력 추천합니다" },
  ];
  const currentUsers = [
    { name: "박민영", email: "minion@jocodingax.ai" },
    { name: "송재희", email: "songjh@jocodingax.ai" },
    { name: "안준성", email: "ahn.js@jocodingax.ai" },
    { name: "김태호", email: "kimth@jocodingax.ai" },
    { name: "이지은", email: "lje@jocodingax.ai" },
    { name: "윤서아", email: "yoonsa@jocodingax.ai" },
    { name: "강민준", email: "minjun@jocodingax.ai" },
    { name: "정수빈", email: "subin.j@jocodingax.ai" },
    { name: "최유나", email: "yuna.c@jocodingax.ai" },
    { name: "한승호", email: "han.sh@jocodingax.ai" },
    { name: "박지훈", email: "jihoon@jocodingax.ai" },
    { name: "오세영", email: "syoung@jocodingax.ai" },
    { name: "임도현", email: "dohyun@jocodingax.ai" },
    { name: "조하늘", email: "haneul@jocodingax.ai" },
  ];
  const introRef = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    const el = introRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.max(400, el.scrollHeight)}px`;
  }, [introText]);

  const crumbs: Crumb[] = [
    { label: "디스커버리", href: "/discovery" },
    { label: appName, href: `/discovery?app=${encodeURIComponent(appName)}&category=${encodeURIComponent(category)}&status=admin` },
    { label: "관리 콘솔" },
  ];

  return (
    <div
      className={`flex h-screen w-full items-start overflow-hidden${darkMode ? " dark-mode" : ""}`}
      style={{
        backgroundColor: darkMode ? "#0C0A12" : "#130321",
        "--page-primary": darkMode ? "#6E4A94" : "#5B3D7A",
      } as React.CSSProperties}
    >
      {/* L. Global Nav */}
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
          <button
            type="button"
            onClick={() => setDarkMode(!darkMode)}
            className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
            aria-label={darkMode ? "라이트모드로 전환" : "다크모드로 전환"}
          >
            <Image src={darkMode ? "/icons/version-b/nav-sun.svg" : "/icons/version-b/nav-moon.svg"} alt="" width={24} height={24} />
          </button>
          <NotificationButton />
          <div className="relative">
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="relative size-10 overflow-hidden rounded-full transition-opacity hover:opacity-80"
              aria-label="프로필"
            >
              <Image src="/icons/version-b/profile-new.png" alt="" fill sizes="40px" className="rounded-full object-cover" />
            </button>
            {profileOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
                <div
                  className="absolute bottom-0 left-[calc(100%+8px)] z-50 w-[220px] rounded-2xl bg-white p-3 shadow-lg"
                  style={{
                    boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                  }}
                >
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

      {/* M + R: PageSidebar + Main */}
      <div className="flex h-full flex-1 min-w-0 items-start overflow-hidden pr-2 py-2">
        <PageSidebar activeMenu="디스커버리" />

        <div className="relative flex h-full min-w-0 flex-1 flex-col">
          {/* 헤더 (브레드크럼) */}
          <div className="flex h-[60px] w-full shrink-0 items-center overflow-hidden rounded-tr-2xl border-b border-[rgba(82,82,91,0.08)] bg-white px-5">
            <Breadcrumb crumbs={crumbs} onCrumbClick={(href) => router.push(href)} />
          </div>

          {/* 본문 */}
          <div
            className="flex h-full flex-1 min-h-0 flex-col overflow-y-auto rounded-br-2xl border-r border-[#f6f6f6] bg-white"
            style={{ animation: "fadeSlideIn 0.35s ease-out" }}
          >
            <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-[60px] px-14 pb-[120px] pt-10">
              {/* 앱 헤더 섹션 */}
              <div className="flex w-full items-start gap-[60px] py-5">
                {/* 좌측: 아이콘 + 정보 */}
                <div className="flex min-w-0 flex-1 items-start gap-7">
                  <div
                    className="size-[120px] shrink-0 rounded-[20px]"
                    style={{
                      backgroundImage: "linear-gradient(135deg, #9B7AB8 0%, #5B3D7A 100%)",
                    }}
                  />
                  <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
                    <div className="flex w-full items-center gap-2">
                      <Image
                        src="/icons/version-b/private-lock-gray.svg"
                        alt=""
                        width={24}
                        height={24}
                        aria-hidden="true"
                      />
                      <p className="text-[40px] font-bold leading-[1.2] text-black">{appName}</p>
                    </div>
                    <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">
                      팀원별·프로젝트별 Claude Code 사용량을 집계하고, 토큰·요청 수·비용을 한눈에 비교합니다.
                    </p>
                    <div className="flex items-center gap-2 pt-4 text-sm leading-[1.5] tracking-[-0.14px]">
                      <span className="font-semibold text-[#5B3D7A]">{category}</span>
                      <span className="font-normal text-[#a1a1aa]">•</span>
                      <span className="font-normal text-[#a1a1aa]">안승원</span>
                      <span className="font-normal text-[#a1a1aa]">•</span>
                      <span className="font-normal text-[#a1a1aa]">최근 업데이트 2026.04.29</span>
                    </div>
                  </div>
                </div>

                {/* 우측: 액션 버튼 */}
                <div className="flex w-[200px] shrink-0 flex-col items-center justify-end gap-2 self-stretch pb-2">
                  <button
                    type="button"
                    onClick={() => setStatusModalOpen(true)}
                    className="flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-[#f6f6f6] px-8 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                  >
                    공개 범위 설정
                  </button>
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-center overflow-hidden rounded-full border border-[#e4e4e7] bg-white px-8 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                  >
                    보관
                  </button>
                </div>
              </div>

              {/* 통계 바: 2행 × 3컬럼 — 상태/공개범위/심사 → 사용자/추천/댓글 */}
              <div className="flex w-full flex-col">
                <div className="flex h-[120px] w-full items-center border-t border-b border-[rgba(82,82,91,0.08)]">
                  <StatInfoCell
                    label="상태"
                    value={isArchived ? "보관됨" : "운영중"}
                    helpTooltip={
                      <>
                        개발중 : 배포 전 상태예요
                        <br />
                        운영중 : 사용자가 이용할 수 있는 활성 상태예요
                        <br />
                        보관중 : 사용자가 이용할 수 없는 비활성 상태예요
                      </>
                    }
                  />
                  <div className="h-full w-px shrink-0 bg-[rgba(82,82,91,0.08)]" />
                  <StatInfoCell
                    label="공개범위"
                    value={isPublic ? "공개" : "비공개"}
                    helpTooltip={
                      <>
                        비공개 : 관리자가 초대한 사용자만 이용할 수 있어요
                        <br />
                        공개 : 누구나 디스커버리에서 앱을 찾고 이용할 수 있어요
                      </>
                    }
                  />
                  <div className="h-full w-px shrink-0 bg-[rgba(82,82,91,0.08)]" />
                  <StatReviewCell label="심사" value="미요청" />
                </div>
                <div className="flex h-[120px] w-full items-center border-b border-[rgba(82,82,91,0.08)]">
                  <StatChevronCell label="사용자" value={String(currentUsers.length)} onClick={() => setUserModalOpen(true)} />
                  <div className="h-full w-px shrink-0 bg-[rgba(82,82,91,0.08)]" />
                  <StatChevronCell label="추천" value="8" onClick={() => setRecommendModalOpen(true)} />
                  <div className="h-full w-px shrink-0 bg-[rgba(82,82,91,0.08)]" />
                  <StatChevronCell label="댓글" value={String(comments.length)} onClick={() => setCommentsModalOpen(true)} />
                </div>
              </div>

              {/* 본문: 상단 수평 탭 네비 + 콘텐츠 */}
              <div className="flex w-full flex-col gap-10">
                <TopTabs active={activeMenu} onSelect={setActiveMenu} />

                {/* 콘텐츠 */}
                <div className="flex w-full min-w-0 flex-col gap-5">
                  {/* 앱 소개 섹션 */}
                  <div className="flex w-full items-end gap-5">
                    <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                      <h2 className="text-[22px] font-bold leading-[1.3] tracking-[-0.22px] text-[#3f3f46]">
                        앱 소개
                      </h2>
                      <p className="w-full text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                        앱 상세페이지의 앱 소개에 표시되는 설명이에요
                      </p>
                    </div>
                    <div className="flex shrink-0 items-start gap-2">
                      <button
                        type="button"
                        className="flex h-9 items-center justify-center overflow-hidden rounded-full border border-[#e4e4e7] bg-white px-5 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                      >
                        MD 불러오기
                      </button>
                      <button
                        type="button"
                        disabled={introText.trim().length === 0}
                        className="relative flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:hover:opacity-100"
                      >
                        저장
                        {introText.trim().length === 0 && (
                          <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />
                        )}
                      </button>
                    </div>
                  </div>
                  <textarea
                    ref={introRef}
                    value={introText}
                    onChange={(e) => setIntroText(e.target.value)}
                    placeholder="이 앱이 해결하는 문제, 주요 기능, 사용 방법을 Markdown으로 작성하세요"
                    className="min-h-[400px] w-full resize-none rounded-2xl border border-[#e4e4e7] bg-[#fafafa] px-4 py-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] outline-none transition-colors placeholder:text-[#a1a1aa] focus:border-[#18181b]"
                  />

                  {/* 스크린샷 섹션 */}
                  <div className="mt-2">
                    <SectionHeader
                      title="스크린샷"
                      desc="이미지는 앱 파일 저장소의 screenshots/ 경로에 업로드돼요"
                      inline
                    />
                  </div>
                  <button
                    type="button"
                    className="flex h-[100px] w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-[#d4d4d8] bg-white transition-colors hover:border-[#a1a1aa] hover:bg-[#fafafa]"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                      <path d="M10 4v12M4 10h12" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">이미지 업로드</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {statusModalOpen && (
        <VisibilityModal
          isPublic={isPublic}
          autoApprove={autoApprove}
          onClose={() => setStatusModalOpen(false)}
          onSave={(nextPublic, nextAuto) => {
            setIsPublic(nextPublic);
            setAutoApprove(nextAuto);
            setStatusModalOpen(false);
          }}
        />
      )}

      {userModalOpen && (
        <UserModal
          currentUsers={currentUsers}
          pendingUsers={pendingUsers}
          onInvite={(name, email) => setPendingUsers((prev) => [...prev, { name, email }])}
          onCancelInvite={(idx) =>
            setPendingUsers((prev) => prev.filter((_, i) => i !== idx))
          }
          onClose={() => setUserModalOpen(false)}
        />
      )}

      {recommendModalOpen && (
        <RecommendModal
          users={currentUsers.slice(0, 8)}
          onClose={() => setRecommendModalOpen(false)}
        />
      )}

      {commentsModalOpen && (
        <CommentsModal
          comments={comments}
          onClose={() => setCommentsModalOpen(false)}
        />
      )}
    </div>
  );
}

function UserModal({
  currentUsers,
  pendingUsers,
  onInvite,
  onCancelInvite,
  onClose,
}: {
  currentUsers: { name: string; email: string }[];
  pendingUsers: { name: string; email: string }[];
  onInvite: (name: string, email: string) => void;
  onCancelInvite: (index: number) => void;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const canInvite = query.trim().length > 0;
  const handleInvite = () => {
    const trimmed = query.trim();
    if (!trimmed) return;
    const looksLikeEmail = trimmed.includes("@");
    onInvite(looksLikeEmail ? trimmed.split("@")[0] : trimmed, looksLikeEmail ? trimmed : `${trimmed}@jocodingax.ai`);
    setQuery("");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div
        className="flex max-h-[calc(100vh-64px)] w-[510px] flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          animation: "modalScaleIn 0.3s ease-out",
        }}
      >
        <div className="flex w-full items-center gap-6">
          <p className="flex-1 text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">앱 사용자</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex shrink-0 items-center justify-center text-[#3f3f46] transition-opacity hover:opacity-70"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex w-full items-center gap-2">
          <div className="flex h-12 min-h-12 flex-1 items-center rounded-full border border-[#e4e4e7] bg-[#fafafa] px-5">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && canInvite) handleInvite();
              }}
              placeholder="초대할 사용자의 이름, 이메일을 검색하세요"
              className="min-w-0 flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] outline-none placeholder:text-[#a1a1aa]"
            />
          </div>
          <button
            type="button"
            onClick={handleInvite}
            disabled={!canInvite}
            className="relative flex h-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] px-6 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:hover:opacity-100"
          >
            초대
            {!canInvite && (
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />
            )}
          </button>
        </div>

        {/* 초대 확인중 / 사용중 — 각 영역이 별도 스크롤, 두 영역 사이 24px 갭 */}
        {pendingUsers.length > 0 && (
          <div className="flex w-full flex-col">
            <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
              초대 확인중 {pendingUsers.length}
            </p>
            <div className="sidebar-scroll -mx-2 flex max-h-[180px] w-[calc(100%+1rem)] flex-col overflow-y-auto px-2">
              {pendingUsers.map((u, i) => (
                <UserRow
                  key={`pending-${i}`}
                  name={u.name}
                  email={u.email}
                  action={
                    <button
                      type="button"
                      onClick={() => onCancelInvite(i)}
                      className="flex h-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-[#e4e4e7] bg-white px-5 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                    >
                      취소
                    </button>
                  }
                />
              ))}
            </div>
          </div>
        )}

        <div className="flex w-full flex-col">
          <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
            사용중 {currentUsers.length}
          </p>
          <div className="sidebar-scroll -mx-2 flex h-[375px] w-[calc(100%+1rem)] flex-col overflow-y-auto px-2">
            {currentUsers.map((u, i) => (
              <UserRow key={`current-${i}`} name={u.name} email={u.email} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function RecommendModal({
  users,
  onClose,
}: {
  users: { name: string; email: string }[];
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const filtered = users.filter(
    (u) => u.name.includes(query.trim()) || u.email.includes(query.trim()),
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div
        className="flex max-h-[calc(100vh-64px)] w-[510px] flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          animation: "modalScaleIn 0.3s ease-out",
        }}
      >
        <div className="flex w-full items-center gap-6">
          <p className="flex-1 text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">추천 {users.length}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex shrink-0 items-center justify-center text-[#3f3f46] transition-opacity hover:opacity-70"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="flex h-12 min-h-12 w-full items-center rounded-full border border-[#e4e4e7] bg-[#fafafa] px-5">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="사용자의 이름, 이메일을 검색하세요"
            className="min-w-0 flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] outline-none placeholder:text-[#a1a1aa]"
          />
        </div>

        <div className="sidebar-scroll -mx-2 flex h-[375px] w-[calc(100%+1rem)] flex-col overflow-y-auto px-2">
          {filtered.map((u, i) => (
            <UserRow key={i} name={u.name} email={u.email} />
          ))}
        </div>
      </div>
    </div>
  );
}

function CommentsModal({
  comments,
  onClose,
}: {
  comments: { name: string; time: string; text: string }[];
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div
        className="flex max-h-[calc(100vh-64px)] w-[510px] flex-col gap-6 overflow-hidden rounded-2xl bg-white p-6"
        onClick={(e) => e.stopPropagation()}
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          animation: "modalScaleIn 0.3s ease-out",
        }}
      >
        <div className="flex w-full items-center gap-6">
          <p className="flex-1 text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">댓글 {comments.length}</p>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex shrink-0 items-center justify-center text-[#3f3f46] transition-opacity hover:opacity-70"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="sidebar-scroll -mx-2 flex min-h-0 max-h-[450px] w-[calc(100%+1rem)] flex-col overflow-y-auto px-2">
          {comments.map((c, i) => (
            <div key={i} className="flex w-full items-start gap-3 py-5">
              <div className="relative size-8 shrink-0 overflow-hidden rounded-full">
                <Image src={pickProfileIcon(c.name + c.time)} alt="" fill sizes="32px" className="object-cover" />
              </div>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-end gap-2">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">{c.name}</p>
                  <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{c.time}</p>
                </div>
                <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]">{c.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function UserRow({ name, email, action }: { name: string; email: string; action?: React.ReactNode }) {
  return (
    <div className="flex h-[60px] w-full items-center gap-2 py-4">
      <div className="relative size-7 shrink-0 overflow-hidden rounded-full">
        <Image src={pickProfileIcon(name + email)} alt="" fill sizes="28px" className="object-cover" />
      </div>
      <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">{name}</p>
      <p className="min-w-0 flex-1 truncate text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
        {email}
      </p>
      {action}
    </div>
  );
}

function Switch({
  checked,
  onChange,
  disabled = false,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors ${
        checked ? "bg-[#5B3D7A]" : "bg-[#d4d4d8]"
      } ${disabled ? "cursor-not-allowed" : ""}`}
    >
      <span
        aria-hidden="true"
        className={`absolute top-1 size-6 rounded-full bg-white transition-all ${
          checked ? "left-[24px]" : "left-1"
        }`}
      />
    </button>
  );
}

function VisibilityModal({
  isPublic,
  autoApprove,
  onClose,
  onSave,
}: {
  isPublic: boolean;
  autoApprove: boolean;
  onClose: () => void;
  onSave: (nextPublic: boolean, nextAuto: boolean) => void;
}) {
  const [localPublic, setLocalPublic] = useState(isPublic);
  const [localAuto, setLocalAuto] = useState(autoApprove);
  const isDirty = localPublic !== isPublic || localAuto !== autoApprove;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div
        className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          animation: "modalScaleIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">
          앱 공개 범위 설정
        </p>

        <div className="flex w-full flex-col gap-2">
          {/* 공개 토글 */}
          <div className="flex w-full items-start gap-5 p-3">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">공개</p>
              <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                앱이 디스커버리에 올라가 모든 동료들이 볼 수 있어요
                <br />
                단, 심사를 완료한 앱만 공개할 수 있어요
              </p>
            </div>
            <Switch checked={localPublic} onChange={setLocalPublic} />
          </div>

          {/* 신청 자동 승인 토글 + 비공개 시 오버레이 */}
          <div className="relative flex w-full items-start gap-5 p-3">
            <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
              <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">신청 자동 승인</p>
              <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                별도의 확인없이 앱 사용 신청을 자동으로 승인해요
                <br />
                사용자는 대기없이 바로 앱을 이용할 수 있어요
              </p>
            </div>
            <Switch checked={localAuto} onChange={setLocalAuto} disabled={!localPublic} />
            {!localPublic && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 rounded-[20px] bg-white/70 transition-opacity"
              />
            )}
          </div>
        </div>

        <div className="flex items-start gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#f6f6f6] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
          >
            취소
          </button>
          <button
            type="button"
            disabled={!isDirty}
            onClick={() => onSave(localPublic, localPublic ? localAuto : false)}
            className="relative flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:hover:opacity-100"
          >
            저장
            {!isDirty && (
              <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function Breadcrumb({ crumbs, onCrumbClick }: { crumbs: Crumb[]; onCrumbClick: (href: string) => void }) {
  return (
    <div className="flex items-center gap-1">
      {crumbs.map((crumb, i) => {
        const isLast = i === crumbs.length - 1;
        return (
          <Fragment key={i}>
            {!isLast && crumb.href ? (
              <button
                type="button"
                onClick={() => onCrumbClick(crumb.href!)}
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
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className="shrink-0">
                <path d="M6 4l4 4-4 4" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </Fragment>
        );
      })}
    </div>
  );
}

const TOP_TABS: { key: SubMenuKey; label: string }[] = [
  { key: "intro", label: "소개" },
  { key: "dev-git", label: "Git 연동" },
  { key: "dev-env", label: "환경변수" },
  { key: "dev-deploy", label: "배포" },
  { key: "ops-ops", label: "운영" },
  { key: "ops-table", label: "테이블" },
  { key: "ops-data", label: "데이터 접근" },
  { key: "members", label: "멤버" },
  { key: "settings", label: "설정" },
];

function TopTabs({ active, onSelect }: { active: SubMenuKey; onSelect: (key: SubMenuKey) => void }) {
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[active];
    if (!el) return;
    setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
  }, [active]);

  return (
    <nav className="sidebar-scroll relative flex w-full items-start gap-2 overflow-x-auto overflow-y-hidden">
      {TOP_TABS.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            ref={(el) => {
              tabRefs.current[tab.key] = el;
            }}
            type="button"
            onClick={() => onSelect(tab.key)}
            className="relative flex shrink-0 items-center justify-center px-4 py-2"
          >
            {/* 너비 고정용 ghost (항상 SemiBold로 너비 예약, 보이지 않음) */}
            <span
              aria-hidden="true"
              className="invisible block whitespace-nowrap text-base font-semibold leading-[1.5] tracking-[-0.16px]"
            >
              {tab.label}
            </span>
            {/* 실제 노출 텍스트 */}
            <span
              className={`absolute inset-0 flex items-center justify-center whitespace-nowrap text-base leading-[1.5] tracking-[-0.16px] transition-colors ${
                isActive
                  ? "font-semibold text-[#5B3D7A]"
                  : "font-normal text-[rgba(24,24,27,0.9)] hover:text-[#18181b]"
              }`}
            >
              {tab.label}
            </span>
          </button>
        );
      })}
      {/* 슬라이딩 인디케이터 */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 h-[2px] rounded-full bg-[#5B3D7A] transition-[left,width] duration-300 ease-out"
        style={{ left: indicator.left, width: indicator.width }}
      />
    </nav>
  );
}

function StatChevronCell({ label, value, onClick }: { label: string; value: string; onClick?: () => void }) {
  const Comp = onClick ? "button" : "div";
  return (
    <Comp
      {...(onClick ? { type: "button" as const, onClick } : {})}
      className={`flex h-full flex-1 items-center gap-2 px-7 text-left ${
        onClick ? "transition-colors hover:bg-[#fafafa]" : ""
      }`}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{label}</p>
        <p className="text-2xl font-bold leading-[1.2] text-[#3f3f46]">{value}</p>
      </div>
      <Image
        src="/icons/version-b/admin-chevron-right.svg"
        alt=""
        width={16}
        height={16}
        aria-hidden="true"
        className="-rotate-90 shrink-0"
      />
    </Comp>
  );
}

function StatInfoCell({
  label,
  value,
  showHelp = false,
  helpTooltip,
}: {
  label: string;
  value: string;
  showHelp?: boolean;
  helpTooltip?: React.ReactNode;
}) {
  const hasHelp = showHelp || helpTooltip !== undefined;
  return (
    <div className="flex h-full flex-1 flex-col items-start justify-center gap-2 px-7">
      <div className="flex items-center gap-1">
        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{label}</p>
        {hasHelp && (
          <span className="group relative inline-flex">
            <Image
              src="/icons/version-b/admin-help.svg"
              alt=""
              width={18}
              height={18}
              aria-hidden="true"
            />
            {helpTooltip && (
              <span
                role="tooltip"
                className="pointer-events-none absolute bottom-full left-0 mb-2 hidden whitespace-nowrap rounded-[8px] bg-[#27272a] px-2.5 py-1.5 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-white shadow-[0px_2px_4px_rgba(0,0,0,0.06),0px_-6px_6px_rgba(0,0,0,0.03),0px_14px_14px_rgba(0,0,0,0.04)] backdrop-blur-[20px] group-hover:block"
              >
                {helpTooltip}
              </span>
            )}
          </span>
        )}
      </div>
      <p className="text-2xl font-bold leading-[1.2] text-[#3f3f46]">{value}</p>
    </div>
  );
}

function StatReviewCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex h-full flex-1 items-end gap-2 px-7 py-7">
      <div className="flex min-w-0 flex-1 flex-col items-start justify-center gap-2 self-stretch">
        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">{label}</p>
        <p className="text-2xl font-bold leading-[1.2] text-[#3f3f46]">{value}</p>
      </div>
      <button
        type="button"
        className="flex h-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
      >
        심사 요청
      </button>
    </div>
  );
}

function SectionHeader({
  title,
  desc,
  inline = false,
  actions,
}: {
  title: string;
  desc?: string;
  inline?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <div className="flex w-full items-center justify-between gap-4">
      <div className={inline ? "flex items-baseline gap-3" : "flex flex-col gap-2"}>
        <h2 className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">{title}</h2>
        {desc && (
          <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">{desc}</p>
        )}
      </div>
      {actions}
    </div>
  );
}

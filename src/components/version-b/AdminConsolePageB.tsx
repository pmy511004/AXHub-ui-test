"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";

import PageSidebar from "./PageSidebar";
import NotificationButton from "./NotificationButton";
import { useDarkMode } from "@/hooks/useDarkMode";

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
  const [openGroups, setOpenGroups] = useState<Record<"dev" | "ops" | "settings", boolean>>({
    dev: true,
    ops: true,
    settings: true,
  });
  const toggleGroup = (g: "dev" | "ops" | "settings") =>
    setOpenGroups((prev) => ({ ...prev, [g]: !prev[g] }));

  const [introText, setIntroText] = useState("");
  type AppStatusKey = "public-no-approval" | "public-approval" | "private" | "archived";
  const [appStatus, setAppStatus] = useState<AppStatusKey>("public-no-approval");
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const STATUS_LABEL: Record<AppStatusKey, { main: string; sub?: string; short: string }> = {
    "public-no-approval": { main: "공개 운영", sub: "(승인없음)", short: "공개 운영중" },
    "public-approval": { main: "공개 운영", sub: "(승인필요)", short: "공개 운영중" },
    private: { main: "비공개 운영", short: "비공개 운영중" },
    archived: { main: "보관", short: "보관중" },
  };
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
                    <p className="text-[40px] font-bold leading-[1.2] text-black">{appName}</p>
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
                  {/* 상태 표시 */}
                  <div className="flex w-full items-center justify-center gap-2 py-1">
                    {appStatus === "private" ? (
                      <Image
                        src="/icons/version-b/status-private.svg"
                        alt=""
                        width={16}
                        height={16}
                        aria-hidden="true"
                      />
                    ) : appStatus === "archived" ? (
                      <Image
                        src="/icons/version-b/status-archived.svg"
                        alt=""
                        width={16}
                        height={16}
                        aria-hidden="true"
                      />
                    ) : (
                      <span className="relative flex size-2.5 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#1fa24e] opacity-60" />
                        <span className="relative inline-flex size-2.5 rounded-full bg-[#1fa24e]" />
                      </span>
                    )}
                    <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px]">
                      <span className="text-[#18181b]">{STATUS_LABEL[appStatus].short}</span>
                      {STATUS_LABEL[appStatus].sub && (
                        <span className="text-[#71717a]"> {STATUS_LABEL[appStatus].sub}</span>
                      )}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatusModalOpen(true)}
                    className="flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-[#f6f6f6] px-8 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                  >
                    상태 변경
                  </button>
                  <button
                    type="button"
                    className="flex h-12 w-full items-center justify-center overflow-hidden rounded-full border border-[#e4e4e7] bg-white px-8 text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#f9f9f9]"
                  >
                    정보 수정
                  </button>
                </div>
              </div>

              {/* 본문: 서브메뉴 + 콘텐츠 */}
              <div className="flex w-full items-start gap-10">
                {/* 서브메뉴 */}
                <SubMenu
                  active={activeMenu}
                  onSelect={setActiveMenu}
                  openGroups={openGroups}
                  toggleGroup={toggleGroup}
                />

                {/* 콘텐츠 */}
                <div className="flex min-h-[800px] flex-1 min-w-0 flex-col gap-5">
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
        <StatusChangeModal
          current={appStatus}
          onClose={() => setStatusModalOpen(false)}
          onSave={(next) => {
            setAppStatus(next);
            setStatusModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

interface StatusOptionDef {
  key: "public-no-approval" | "public-approval" | "private" | "archived";
  main: string;
  sub?: string;
  desc: string;
}

const STATUS_OPTIONS: StatusOptionDef[] = [
  { key: "public-no-approval", main: "공개 운영", sub: "(승인없음)", desc: "디스커버리에서 모든 동료가 찾고, 바로 사용할 수 있어요" },
  { key: "public-approval", main: "공개 운영", sub: "(승인필요)", desc: "누구나 찾을 수 있지만, 관리자의 승인을 받은 동료만 사용할 수 있어요" },
  { key: "private", main: "비공개 운영", desc: "초대받은 사용자만 접근할 수 있어요" },
  { key: "archived", main: "보관", desc: "디스커버리에서 동료들이 더 이상 볼 수 없지만, 데이터는 유지돼요" },
];

function StatusChangeModal({
  current,
  onClose,
  onSave,
}: {
  current: StatusOptionDef["key"];
  onClose: () => void;
  onSave: (next: StatusOptionDef["key"]) => void;
}) {
  const [selected, setSelected] = useState<StatusOptionDef["key"]>(current);
  const isDirty = selected !== current;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20" onClick={onClose}>
      <div
        className="flex w-[460px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
        style={{
          boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
          backdropFilter: "blur(20px)",
          animation: "modalScaleIn 0.3s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">
          앱 상태를 변경하시겠어요?
        </p>

        <div className="flex w-full flex-col gap-1">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = selected === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSelected(opt.key)}
                className={`flex w-full items-center gap-5 rounded-[20px] p-4 text-left transition-colors ${
                  isSelected ? "bg-[#f9f9f9]" : "hover:bg-[#fafafa]"
                }`}
              >
                <span className="flex shrink-0 items-center self-stretch p-0.5">
                  <span
                    className={`flex size-5 items-center justify-center rounded-full border-[1.5px] ${
                      isSelected ? "border-[#B86397] bg-[#B86397]" : "border-[#d4d4d8] bg-white"
                    }`}
                  >
                    {isSelected && <span className="size-2 rounded-full bg-white" />}
                  </span>
                </span>
                <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
                  <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46]">
                    {opt.main}
                    {opt.sub && <span className="font-medium text-[#71717a]"> {opt.sub}</span>}
                  </p>
                  <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                    {opt.desc}
                  </p>
                </div>
              </button>
            );
          })}
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
            onClick={() => onSave(selected)}
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

interface SubMenuProps {
  active: SubMenuKey;
  onSelect: (key: SubMenuKey) => void;
  openGroups: Record<"dev" | "ops" | "settings", boolean>;
  toggleGroup: (g: "dev" | "ops" | "settings") => void;
}

function SubMenu({ active, onSelect, openGroups, toggleGroup }: SubMenuProps) {
  return (
    <nav className="sticky top-5 flex w-[180px] shrink-0 flex-col gap-0.5 self-start rounded-[12px] bg-[#f9f9f9] p-3">
      <MenuItem label="소개" active={active === "intro"} onClick={() => onSelect("intro")} />
      <MenuGroup label="개발" open={openGroups.dev} onToggle={() => toggleGroup("dev")}>
        <MenuItem label="Git 연동" indent active={active === "dev-git"} onClick={() => onSelect("dev-git")} />
        <MenuItem label="환경변수" indent active={active === "dev-env"} onClick={() => onSelect("dev-env")} />
        <MenuItem label="배포" indent active={active === "dev-deploy"} onClick={() => onSelect("dev-deploy")} />
      </MenuGroup>
      <MenuGroup label="운영" open={openGroups.ops} onToggle={() => toggleGroup("ops")}>
        <MenuItem label="운영" indent active={active === "ops-ops"} onClick={() => onSelect("ops-ops")} />
        <MenuItem label="테이블" indent active={active === "ops-table"} onClick={() => onSelect("ops-table")} />
        <MenuItem label="데이터 접근" indent active={active === "ops-data"} onClick={() => onSelect("ops-data")} />
      </MenuGroup>
      <MenuItem label="멤버" active={active === "members"} onClick={() => onSelect("members")} />
      <MenuGroup label="설정" open={openGroups.settings} onToggle={() => toggleGroup("settings")}>
        <MenuItem label="정보 수정" indent active={active === "settings-info"} onClick={() => onSelect("settings-info")} />
        <MenuItem label="CI 자동 검증" indent active={active === "settings-ci"} onClick={() => onSelect("settings-ci")} />
        <MenuItem label="배포 방식" indent active={active === "settings-deploy"} onClick={() => onSelect("settings-deploy")} />
        <MenuItem label="API 키" indent active={active === "settings-api"} onClick={() => onSelect("settings-api")} />
        <MenuItem label="SSO 통합" indent active={active === "settings-sso"} onClick={() => onSelect("settings-sso")} />
        <MenuItem label="파일" indent active={active === "settings-file"} onClick={() => onSelect("settings-file")} />
        <MenuItem label="캐시" indent active={active === "settings-cache"} onClick={() => onSelect("settings-cache")} />
      </MenuGroup>
    </nav>
  );
}

function MenuItem({
  label,
  active = false,
  indent = false,
  onClick,
}: {
  label: string;
  active?: boolean;
  indent?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center rounded-[8px] py-2 text-left text-sm leading-[1.5] tracking-[-0.14px] transition-colors ${
        indent ? "px-6" : "px-3"
      } ${
        active
          ? "bg-[rgba(24,24,27,0.03)] font-semibold text-[#5B3D7A]"
          : indent
            ? "font-normal text-[#71717a] hover:bg-[rgba(24,24,27,0.03)]"
            : "font-normal text-[#18181b] hover:bg-[rgba(24,24,27,0.03)]"
      }`}
    >
      {label}
    </button>
  );
}

function MenuGroup({
  label,
  open,
  onToggle,
  children,
}: {
  label: string;
  open: boolean;
  onToggle: () => void;
  children: React.ReactNode;
}) {
  return (
    <>
      <button
        type="button"
        onClick={onToggle}
        className={`flex w-full items-center justify-between gap-2 rounded-[8px] px-3 py-2 text-left text-sm leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[rgba(24,24,27,0.03)] ${
          open ? "font-semibold" : "font-normal"
        }`}
      >
        <span>{label}</span>
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
          className={`shrink-0 transition-transform ${open ? "" : "-rotate-90"}`}
        >
          <path d="M4 6l4 4 4-4" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && <div className="flex w-full flex-col gap-0.5">{children}</div>}
    </>
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

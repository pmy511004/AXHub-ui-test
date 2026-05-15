"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import PageSidebar, { type AdminActiveMenu } from "./PageSidebar";

type MemberRole = "관리자" | "사용자";
type MemberStatus = "활성" | "초대중" | "비활성";
type Member = {
  id: string;
  initials: string;
  fullName: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  lastAccess: string;
  avatarColor: string;
};

const AVATAR_COLORS = ["#2d64fa", "#0f5fcc", "#f6c205", "#e765be", "#4a78b8"];
const STATUS_STYLES: Record<MemberStatus, { bg: string; text: string }> = {
  활성: { bg: "#e7f1fe", text: "#1571f3" },
  초대중: { bg: "#f6f6f6", text: "#71717a" },
  비활성: { bg: "#fee8ea", text: "#c90f22" },
};
import NotificationButton from "./NotificationButton";
import { useDarkMode } from "@/hooks/useDarkMode";

type HomePageBProps = { initialSidebarMode?: "user" | "admin" };

export default function HomePageB({ initialSidebarMode = "user" }: HomePageBProps = {}) {
  const router = useRouter();
  const [appsExpanded, setAppsExpanded] = useState(false);
  // 최초접속/사용중 토글은 임시 비활성화 (사용 중 페이지만 노출)
  const SHOW_VIEW_VERSION_TOGGLE = false;
  const [viewVersion, setViewVersion] = useState<"first-time" | "in-use">("in-use");
  const [guideModalOpen, setGuideModalOpen] = useState(false);
  const [guideModalStep, setGuideModalStep] = useState<"os-select" | "mac" | "windows" | "final">("os-select");
  const [guideModalClosing, setGuideModalClosing] = useState(false);
  const [selectedOS, setSelectedOS] = useState<"mac" | "windows">("mac");
  const [guideDirection, setGuideDirection] = useState<"forward" | "back">("forward");
  const [profileOpen, setProfileOpen] = useState(false);
  const [darkMode] = useDarkMode();
  const [sidebarMode, setSidebarMode] = useState<"user" | "admin">(initialSidebarMode);
  const [adminMenu, setAdminMenu] = useState<AdminActiveMenu>("대시보드");
  const [teamName, setTeamName] = useState("조코딩AX파트너스");
  const [teamDescription, setTeamDescription] = useState("");
  const [inviteModalOpen, setInviteModalOpen] = useState(false);
  const [inviteModalClosing, setInviteModalClosing] = useState(false);
  const [inviteRows, setInviteRows] = useState<Array<{ email: string; role: MemberRole }>>([
    { email: "", role: "사용자" },
  ]);
  const [openInviteRoleIdx, setOpenInviteRoleIdx] = useState<number | null>(null);
  const [members, setMembers] = useState<Member[]>([
    {
      id: "minion",
      initials: "민영",
      fullName: "박민영",
      email: "minion@jocodingax.ai",
      role: "관리자",
      status: "활성",
      lastAccess: "2026-05-13",
      avatarColor: "#2d64fa",
    },
  ]);
  const [roleFilter, setRoleFilter] = useState<MemberRole | null>(null);
  const [statusFilter, setStatusFilter] = useState<MemberStatus | null>(null);
  const [openRoleFilter, setOpenRoleFilter] = useState(false);
  const [openStatusFilter, setOpenStatusFilter] = useState(false);
  const [detailMemberId, setDetailMemberId] = useState<string | null>(null);
  const [detailClosing, setDetailClosing] = useState(false);
  const [detailDraftRole, setDetailDraftRole] = useState<MemberRole>("사용자");
  const [detailRoleOpen, setDetailRoleOpen] = useState(false);

  const filteredMembers = members.filter(
    (m) =>
      (roleFilter === null || m.role === roleFilter) &&
      (statusFilter === null || m.status === statusFilter)
  );
  const detailMember = members.find((m) => m.id === detailMemberId) ?? null;

  const openMemberDetail = (m: Member) => {
    setDetailClosing(false);
    setDetailMemberId(m.id);
    setDetailDraftRole(m.role);
    setDetailRoleOpen(false);
  };
  const closeMemberDetail = () => {
    setDetailClosing(true);
    setDetailRoleOpen(false);
    setTimeout(() => {
      setDetailMemberId(null);
      setDetailClosing(false);
    }, 300);
  };
  const saveMemberDetail = () => {
    if (!detailMember) return;
    setMembers((prev) =>
      prev.map((m) =>
        m.id === detailMember.id ? { ...m, role: detailDraftRole } : m
      )
    );
    closeMemberDetail();
  };
  const canSaveDetail =
    detailMember !== null && detailDraftRole !== detailMember.role;
  const [deactivateModalOpen, setDeactivateModalOpen] = useState(false);
  const [deactivateModalClosing, setDeactivateModalClosing] = useState(false);
  const [statusToast, setStatusToast] = useState<{
    type: "activate" | "deactivate";
    closing: boolean;
  } | null>(null);
  const statusToastTimer = useRef<number | null>(null);
  const statusToastCloseTimer = useRef<number | null>(null);

  const showStatusToast = (type: "activate" | "deactivate") => {
    if (statusToastTimer.current) window.clearTimeout(statusToastTimer.current);
    if (statusToastCloseTimer.current)
      window.clearTimeout(statusToastCloseTimer.current);
    setStatusToast({ type, closing: false });
    statusToastTimer.current = window.setTimeout(() => {
      setStatusToast((prev) => (prev ? { ...prev, closing: true } : prev));
      statusToastCloseTimer.current = window.setTimeout(
        () => setStatusToast(null),
        250
      );
    }, 2800);
  };

  const onDeactivateClick = () => {
    if (!detailMember) return;
    setDeactivateModalOpen(true);
    setDeactivateModalClosing(false);
  };
  const closeDeactivateModal = () => {
    setDeactivateModalClosing(true);
    setTimeout(() => {
      setDeactivateModalOpen(false);
      setDeactivateModalClosing(false);
    }, 250);
  };
  const confirmStatusToggle = () => {
    if (!detailMember) return;
    if (detailMember.status === "비활성") {
      setMembers((prev) =>
        prev.map((m) => {
          if (m.id !== detailMember.id) return m;
          const lastAccess = m.lastAccess === "-" ? "2026-05-15" : m.lastAccess;
          return { ...m, status: "활성" as MemberStatus, lastAccess };
        })
      );
      showStatusToast("activate");
    } else {
      setMembers((prev) =>
        prev.map((m) =>
          m.id === detailMember.id
            ? { ...m, status: "비활성" as MemberStatus }
            : m
        )
      );
      showStatusToast("deactivate");
    }
    closeDeactivateModal();
  };
  const submitInvite = () => {
    const validRows = inviteRows.filter((r) => r.email.trim() !== "");
    if (validRows.length === 0) return;
    const stamp = Date.now();
    const newMembers: Member[] = validRows.map((r, i) => {
      const local = r.email.trim().split("@")[0];
      return {
        id: `${stamp}-${i}`,
        initials: local.slice(0, 2),
        fullName: local,
        email: r.email.trim(),
        role: r.role,
        status: "초대중",
        lastAccess: "-",
        avatarColor:
          AVATAR_COLORS[(members.length + i) % AVATAR_COLORS.length],
      };
    });
    setMembers((prev) => [...prev, ...newMembers]);
    closeInviteModal();
  };

  const openInviteModal = () => {
    setInviteRows([{ email: "", role: "사용자" }]);
    setOpenInviteRoleIdx(null);
    setInviteModalOpen(true);
  };
  const closeInviteModal = () => {
    setInviteModalClosing(true);
    setTimeout(() => {
      setInviteModalOpen(false);
      setInviteModalClosing(false);
      setOpenInviteRoleIdx(null);
    }, 250);
  };
  const canAddInviteRow = inviteRows.every((r) => r.email.trim() !== "");
  const canSendInvite = inviteRows.some((r) => r.email.trim() !== "");
  const addInviteRow = () => {
    if (!canAddInviteRow) return;
    setInviteRows((prev) => [...prev, { email: "", role: "사용자" }]);
  };
  const [makeAppModalOpen, setMakeAppModalOpen] = useState(false);
  const [makeAppModalClosing, setMakeAppModalClosing] = useState(false);
  const [makeAppName, setMakeAppName] = useState("");
  const [makeAppCategory, setMakeAppCategory] = useState("");
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const categoryOptions = ["인사관리", "데이터분석", "물류관리", "경영재무", "협업도구", "프로젝트관리", "AI도구"];
  const closeMakeAppModal = () => {
    setMakeAppModalClosing(true);
    setTimeout(() => {
      setMakeAppModalOpen(false);
      setMakeAppModalClosing(false);
      setCategoryDropdownOpen(false);
    }, 250);
  };
  const isMakeAppValid = makeAppName.trim() !== "" && makeAppCategory !== "";

  // 최초접속 가이드 모달은 임시 비활성화 (코드는 유지)
  const SHOW_FIRST_TIME_GUIDE = false;
  useEffect(() => {
    if (sidebarMode === "admin" || !SHOW_FIRST_TIME_GUIDE) {
      setGuideModalOpen(false);
      return;
    }
    if (viewVersion === "first-time") {
      setGuideModalStep("os-select");
      setGuideModalOpen(true);
    } else {
      setGuideModalOpen(false);
    }
  }, [viewVersion, sidebarMode]);
  const closeGuideModal = () => {
    setGuideModalClosing(true);
    setTimeout(() => { setGuideModalOpen(false); setGuideModalClosing(false); setGuideModalStep("os-select"); }, 250);
  };

  return (
    <div
      className={`flex h-screen w-full items-start overflow-hidden${darkMode ? " dark-mode" : ""}`}
      style={{
        backgroundColor: darkMode ? "#0C0A12" : "#130321",
        "--page-primary": darkMode ? "#6E4A94" : "#2D64FA",
      } as React.CSSProperties}
    >
      {/* L. Sidebar */}
      <PageSidebar
        activeMenu={sidebarMode === "admin" ? adminMenu : "홈"}
        mode={sidebarMode}
        onModeChange={(next) => {
          if (next === sidebarMode) return;
          setSidebarMode(next);
          if (next === "admin") {
            setAdminMenu("대시보드");
            router.push("/manage");
          } else {
            router.push("/");
          }
        }}
        onAdminMenuChange={setAdminMenu}
      />

      {/* R. Header + Main */}
      <div className="relative flex h-full min-w-0 flex-1 flex-col overflow-hidden bg-white">
        {/* Header (60px) */}
        <div
          className="flex h-[60px] shrink-0 items-center justify-between border-b border-[rgba(82,82,91,0.08)] bg-white px-5"
          data-node-id="4940:6702"
        >
          <div className="flex items-center" data-node-id="4940:6703">
            <span
              className="px-1 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]"
              data-node-id="4940:6705"
            >
              {sidebarMode === "admin" ? adminMenu : "홈"}
            </span>
          </div>
          <div className="flex h-full items-center gap-3">
            <button
              type="button"
              aria-label="검색"
              className="flex size-9 items-center justify-center rounded-full transition-colors hover:bg-[#f4f4f5]"
            >
              <Image
                src="/icons/version-b/header-search.svg"
                alt=""
                width={32}
                height={32}
              />
            </button>
            <NotificationButton variant="header" />
            <div className="relative">
              <button
                type="button"
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex size-9 items-center justify-center rounded-full bg-[#2D64FA] p-2 transition-opacity hover:opacity-80"
                aria-label="프로필"
                data-node-id="4940:6970"
              >
                <span className="whitespace-nowrap text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">
                  민영
                </span>
              </button>
              {profileOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setProfileOpen(false)}
                  />
                  <div
                    className="absolute right-0 top-[calc(100%+8px)] z-50 w-[220px] rounded-2xl bg-white p-3"
                    style={{
                      boxShadow:
                        "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div className="flex flex-col gap-3">
                      <div className="flex flex-col gap-1 rounded-2xl px-3 py-2">
                        <p className="text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#18181b]">
                          박민영
                        </p>
                        <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                          minion@jocodingax.ai
                        </p>
                      </div>
                      <div className="h-px w-full bg-[#e4e4e7]" />
                      <div className="flex flex-col">
                        <button
                          type="button"
                          className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]"
                        >
                          내 정보
                        </button>
                        <button
                          type="button"
                          className="w-full rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f4f4f5]"
                        >
                          로그아웃
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Main scrollable */}
        <div className="relative flex min-w-0 flex-1 flex-col overflow-y-auto overflow-x-hidden bg-white">
          {sidebarMode === "admin" ? (
            adminMenu === "대시보드" ? (
            /* T1. 테넌트 설정 (Figma 4910:4830) */
            <div
              className="relative flex flex-1 flex-col items-center justify-center gap-[60px] overflow-hidden px-14 pb-[120px] pt-10"
              data-node-id="4910:4893"
            >
              {/* 배경 그라데이션 이미지 */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-[320px] w-[997px] max-w-none -translate-x-1/2 opacity-80">
                <Image
                  src="/icons/version-b/admin-bg.png"
                  alt=""
                  fill
                  sizes="997px"
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* 히어로 */}
              <div className="relative z-10 flex w-[556px] flex-col items-center gap-3" data-node-id="4940:6106">
                <div className="flex items-start justify-center gap-2 whitespace-nowrap">
                  <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">팀 허브를 열고</p>
                  <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">동료들을 초대하세요</p>
                </div>
                <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  나중에 설정해도 괜찮아요
                </p>
              </div>

              {/* 폼: 이미지 업로드 + 입력 필드 */}
              <div className="relative z-10 flex w-[556px] items-center gap-10" data-node-id="4940:6107">
                {/* 이미지 업로드 */}
                <div className="flex min-w-[116px] flex-col items-start justify-center gap-2" data-node-id="4940:6064">
                  <div className="relative size-[116px] overflow-hidden rounded-2xl bg-[#f6f6f6]">
                    <Image
                      src="/icons/version-b/team-building-large.svg"
                      alt=""
                      width={80}
                      height={80}
                      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                  <button
                    type="button"
                    className="flex h-8 items-center justify-center whitespace-nowrap rounded-full border border-[#e4e4e7] bg-white px-5 py-3 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#f6f7f9]"
                  >
                    이미지 업로드
                  </button>
                </div>

                {/* 입력 필드들 */}
                <div className="flex flex-col gap-5" data-node-id="4940:6136">
                  <div className="flex w-[400px] flex-col justify-center gap-2" data-node-id="4940:6108">
                    <label htmlFor="team-name" className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                      팀 이름
                    </label>
                    <input
                      id="team-name"
                      type="text"
                      value={teamName}
                      onChange={(e) => setTeamName(e.target.value)}
                      className="min-h-12 w-full rounded-3xl border border-[#e4e4e7] bg-white px-5 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#2D64FA] focus:outline-none"
                    />
                  </div>
                  <div className="flex w-[400px] flex-col justify-center gap-2" data-node-id="4940:6085">
                    <label htmlFor="team-desc" className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                      팀 설명
                    </label>
                    <textarea
                      id="team-desc"
                      value={teamDescription}
                      onChange={(e) => setTeamDescription(e.target.value)}
                      placeholder="팀에 대해 짧게 소개해 주세요"
                      rows={2}
                      className="min-h-12 w-full resize-none rounded-3xl border border-[#e4e4e7] bg-white px-5 py-3 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#2D64FA] focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="relative z-10 flex w-[556px] items-center justify-center" data-node-id="4940:6154">
                <button
                  type="button"
                  onClick={() => setAdminMenu("멤버 • 그룹")}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#18181b] px-8 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
                  data-node-id="4940:6155"
                >
                  동료 초대하기
                  <Image
                    src="/icons/version-b/btn-arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                  />
                </button>
              </div>
            </div>
            ) : adminMenu === "멤버 • 그룹" ? (
            /* T2. 유저 관리 (Figma 4940:6166) */
            <div
              className="relative flex flex-1 flex-col items-start gap-10 overflow-y-auto px-10 pb-[120px] pt-10"
              data-node-id="4940:6224"
            >
              {/* 헤더 행 */}
              <div className="flex w-full items-end gap-5" data-node-id="4940:6978">
                <div className="flex flex-1 flex-col items-start gap-3">
                  <p className="text-[32px] font-bold leading-[1.2] text-[#18181b]" data-node-id="4940:7052">
                    멤버 • 그룹
                  </p>
                  <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#71717a]" data-node-id="4940:6495">
                    멤버 권한과 그룹을 관리해요
                  </p>
                </div>
                <button
                  type="button"
                  onClick={openInviteModal}
                  className="flex h-12 shrink-0 items-center justify-center gap-2 rounded-full bg-[#18181b] px-8 py-3 transition-opacity hover:opacity-90"
                  data-node-id="4940:6973"
                >
                  <Image
                    src="/icons/version-b/plus-white.svg"
                    alt=""
                    width={20}
                    height={20}
                  />
                  <span className="whitespace-nowrap text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white">
                    초대하기
                  </span>
                </button>
              </div>

              {/* 서브 탭 + 테이블 */}
              <div className="flex w-full flex-col gap-5" data-node-id="4940:7188">
                {/* 서브 탭 */}
                <div className="flex w-full items-start gap-2" data-node-id="4940:7169">
                  <div className="flex items-center gap-2 border-b-2 border-[#2D64FA] px-3 py-2">
                    <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b]">
                      멤버
                    </span>
                    <span className="flex items-center rounded-full bg-[rgba(91,61,122,0.1)] px-2 py-0.5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#2D64FA]">
                      {members.length}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2">
                    <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[rgba(24,24,27,0.9)]">
                      그룹
                    </span>
                    <span className="flex items-center rounded-full bg-[#f6f6f6] px-2 py-0.5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                      0
                    </span>
                  </div>
                </div>

                {/* 테이블 */}
                <div className="flex w-full flex-col items-center rounded-lg bg-[#f6f6f6] p-1" data-node-id="4940:6993">
                  {/* 헤더 */}
                  <div className="flex w-full items-center gap-4 px-4 py-2.5" data-node-id="4940:6994">
                    <div className="flex flex-1 items-center">
                      <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">멤버</p>
                    </div>
                    {/* 권한 필터 */}
                    <div className="relative flex flex-1 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenRoleFilter((v) => !v);
                          setOpenStatusFilter(false);
                        }}
                        className="-m-1 flex items-center gap-2 rounded p-1 transition-colors hover:bg-[#ececec]"
                      >
                        <p className="whitespace-nowrap text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                          {roleFilter ?? "권한"}
                        </p>
                        <Image
                          src="/icons/version-b/sort-chevron.svg"
                          alt=""
                          width={18}
                          height={18}
                          className={`transition-transform duration-200 ${openRoleFilter ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openRoleFilter && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenRoleFilter(false)}
                          />
                          <div className="absolute left-0 top-[calc(100%+4px)] z-20 w-[140px] overflow-hidden rounded-lg border border-[#e4e4e7] bg-white p-1 shadow-lg">
                            {([null, "관리자", "사용자"] as const).map((option) => (
                              <button
                                key={option ?? "all"}
                                type="button"
                                onClick={() => {
                                  setRoleFilter(option);
                                  setOpenRoleFilter(false);
                                }}
                                className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-[#f4f4f5] ${
                                  roleFilter === option
                                    ? "font-semibold text-[#2D64FA]"
                                    : "font-normal text-[#18181b]"
                                }`}
                              >
                                {option ?? "전체"}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    {/* 계정 상태 필터 */}
                    <div className="relative flex flex-1 items-center">
                      <button
                        type="button"
                        onClick={() => {
                          setOpenStatusFilter((v) => !v);
                          setOpenRoleFilter(false);
                        }}
                        className="-m-1 flex items-center gap-2 rounded p-1 transition-colors hover:bg-[#ececec]"
                      >
                        <p className="whitespace-nowrap text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                          {statusFilter ?? "계정 상태"}
                        </p>
                        <Image
                          src="/icons/version-b/sort-chevron.svg"
                          alt=""
                          width={18}
                          height={18}
                          className={`transition-transform duration-200 ${openStatusFilter ? "rotate-180" : ""}`}
                        />
                      </button>
                      {openStatusFilter && (
                        <>
                          <div
                            className="fixed inset-0 z-10"
                            onClick={() => setOpenStatusFilter(false)}
                          />
                          <div className="absolute left-0 top-[calc(100%+4px)] z-20 w-[140px] overflow-hidden rounded-lg border border-[#e4e4e7] bg-white p-1 shadow-lg">
                            {([null, "활성", "초대중", "비활성"] as const).map((option) => (
                              <button
                                key={option ?? "all"}
                                type="button"
                                onClick={() => {
                                  setStatusFilter(option);
                                  setOpenStatusFilter(false);
                                }}
                                className={`flex w-full items-center rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-[#f4f4f5] ${
                                  statusFilter === option
                                    ? "font-semibold text-[#2D64FA]"
                                    : "font-normal text-[#18181b]"
                                }`}
                              >
                                {option ?? "전체"}
                              </button>
                            ))}
                          </div>
                        </>
                      )}
                    </div>
                    <div className="flex flex-1 items-center">
                      <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">마지막 접속일</p>
                    </div>
                    <div className="size-7" />
                  </div>
                  {/* 바디 */}
                  <div className="flex w-full flex-col items-start justify-center overflow-hidden rounded-lg bg-white" data-node-id="4940:7005">
                    {filteredMembers.map((m) => (
                      <div
                        key={m.id}
                        role="button"
                        tabIndex={0}
                        onClick={() => openMemberDetail(m)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" || e.key === " ") {
                            e.preventDefault();
                            openMemberDetail(m);
                          }
                        }}
                        className={`relative flex h-14 w-full cursor-pointer items-center gap-4 px-4 py-3 transition-colors ${
                          detailMemberId === m.id ? "bg-[#f6f7f9]" : "hover:bg-[#fafafa]"
                        }`}
                      >
                        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#e4e4e7] opacity-50" />
                        <div className="flex flex-1 items-center gap-3">
                          <div
                            className="flex size-8 items-center justify-center rounded-full p-2"
                            style={{ backgroundColor: m.avatarColor }}
                          >
                            <span className="whitespace-nowrap text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">
                              {m.initials}
                            </span>
                          </div>
                          <div className="flex flex-col items-start justify-center whitespace-nowrap">
                            <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                              {m.fullName}
                            </p>
                            <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">
                              {m.email}
                            </p>
                          </div>
                        </div>
                        {/* 권한 */}
                        <div className="flex flex-1 items-center gap-1">
                          {m.role === "관리자" && (
                            <Image
                              src="/icons/version-b/role-shield.svg"
                              alt=""
                              width={18}
                              height={18}
                            />
                          )}
                          <p className="whitespace-nowrap text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                            {m.role}
                          </p>
                        </div>
                        {/* 계정 상태 */}
                        <div className="flex flex-1 items-center">
                          <span
                            className="flex w-[47px] items-center justify-center whitespace-nowrap rounded-full px-2 py-1 text-xs font-semibold leading-[1.3] tracking-[-0.12px]"
                            style={{
                              backgroundColor: STATUS_STYLES[m.status].bg,
                              color: STATUS_STYLES[m.status].text,
                            }}
                          >
                            {m.status}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center">
                          <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            {m.lastAccess}
                          </p>
                        </div>
                        <div className="flex size-7 items-center justify-center">
                          <Image
                            src="/icons/version-b/row-chevron-right.svg"
                            alt=""
                            width={28}
                            height={28}
                            className="-rotate-90"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* 하단 도메인 CTA */}
              <div className="flex w-full flex-col items-center gap-3 py-5" data-node-id="4988:8170">
                <p className="text-center text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                  관리자 초대없이
                  <br />
                  회사 이메일로 자동 가입하게 할까요?
                </p>
                <button
                  type="button"
                  onClick={() => setAdminMenu("환경설정")}
                  className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#f6f6f6] px-6 py-3 transition-colors hover:bg-[#ececec]"
                  data-node-id="4988:8155"
                >
                  <span className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b]">
                    도메인 설정하기
                  </span>
                  <Image
                    src="/icons/version-b/btn-arrow-right.svg"
                    alt=""
                    width={16}
                    height={16}
                    className="[filter:brightness(0)]"
                  />
                </button>
              </div>
            </div>
            ) : (
            /* 환경설정 (준비 중) */
            <div className="flex flex-1 items-center justify-center px-10 py-10">
              <p className="text-2xl font-semibold leading-[1.2] text-[#71717a]">
                환경설정 화면은 준비 중이에요
              </p>
            </div>
            )
          ) : viewVersion === "first-time" ? (
            /* 최초접속 버전 */
            <div className="relative flex min-h-full w-full flex-1 items-center justify-center overflow-hidden px-10 py-10">
              {/* 배경 이미지 (하단 중앙) */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 h-[400px] w-[997px] max-w-none -translate-x-1/2">
                <Image
                  src="/icons/version-b/home-bg-firsttime.png"
                  alt=""
                  fill
                  sizes="997px"
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* 컨텐츠 */}
              <div className="relative z-10 flex w-full flex-col items-center justify-center gap-10">
                <div className="flex w-full flex-col items-center gap-3">
                  <div className="flex flex-col items-center text-center">
                    <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">안녕하세요 박민영 님</p>
                    <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">업무 자동화를 어떻게 시작할까요?</p>
                  </div>
                  <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[rgba(24,24,27,0.48)]">
                    원하는 방법으로 빠르게 시작해 보세요
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full bg-[#2D64FA] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
                  >
                    내가 앱 만들기
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full border border-[#e4e4e7] bg-white px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#f6f7f9]"
                  >
                    동료가 만든 앱 쓰기
                  </button>
                </div>
              </div>
            </div>
          ) : (
          /* 사용 중 버전: 단일 스크롤 영역 */
          <div className="mx-auto flex w-full flex-col gap-[80px] px-10 py-10 pb-[240px] min-[1441px]:max-w-[1280px]">

            {/* 1. 헤더 섹션 */}
            <div className="flex flex-col gap-10">
              {/* 날짜 */}
              <p className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#71717a]">2026년 4월 16일 목요일</p>

              {/* 인사말 + 버튼 행 */}
              <div className="flex items-end gap-10">
                <div className="flex-1">
                  <p className="text-[40px] font-bold leading-[1.2] text-[#a1a1aa]">안녕하세요,</p>
                  <p className="text-[40px] font-bold leading-[1.2] text-[#18181b]">박민영 님</p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full bg-[#18181b] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
                  >
                    개발 가이드
                  </button>
                  <button
                    type="button"
                    className="flex h-12 items-center justify-center rounded-full border border-[#e4e4e7] bg-white px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#18181b] transition-colors hover:bg-[#f6f7f9]"
                  >
                    의견 보내기
                  </button>
                </div>
              </div>
            </div>

            {/* 2. 내 업무공간 섹션 */}
            <div className="flex flex-col gap-5">
              {/* 섹션 헤더 */}
              <div className="flex flex-col gap-2">
                <p className="text-2xl font-semibold leading-[1.2] text-black">내 업무공간</p>
                <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">사용 중인 앱을 모았어요</p>
              </div>

              {/* 빈 상태 카드 */}
              <div className="flex h-[150px] w-full items-center justify-center rounded-xl bg-[#f6f7f9] p-3">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Image
                    src="/icons/version-b/empty-stack.svg"
                    alt=""
                    width={53}
                    height={48}
                  />
                  <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                    사용 중인 앱이 없어요
                  </p>
                </div>
              </div>
            </div>

            {/* 4. 내가 개발한 앱 섹션 */}
            <div className="flex flex-col gap-5">
              {/* 섹션 헤더 + 앱 만들기 버튼 */}
              <div className="flex items-center gap-5">
                <div className="flex flex-1 flex-col gap-2">
                  <p className="text-2xl font-semibold leading-[1.2] text-black">내가 개발한 앱</p>
                  <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">관리자 권한을 갖고 있는 앱이에요</p>
                </div>
                <button
                  type="button"
                  onClick={() => setMakeAppModalOpen(true)}
                  className="flex h-9 shrink-0 items-center justify-center rounded-full bg-[#18181b] px-5 py-3 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                >
                  앱 만들기
                </button>
              </div>

              {/* 빈 상태 카드 */}
              <div className="flex h-[150px] w-full items-center justify-center rounded-xl bg-[#f6f7f9] p-3">
                <div className="flex flex-col items-center justify-center gap-2">
                  <Image
                    src="/icons/version-b/empty-stack.svg"
                    alt=""
                    width={53}
                    height={48}
                  />
                  <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                    관리하고 있는 앱이 없어요
                  </p>
                </div>
              </div>
            </div>
          </div>
          )}

          {/* 버전 토글 (우측 하단 플로팅, user 모드에서만) */}
          {sidebarMode === "user" && SHOW_VIEW_VERSION_TOGGLE && (
          <div className="fixed bottom-6 right-6 z-50 flex items-center gap-1 rounded-full border border-[#e4e4e7] bg-white p-1" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px 14px 28px rgba(0,0,0,0.04)" }}>
            <button
              type="button"
              onClick={() => setViewVersion("first-time")}
              className={`flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] transition-colors ${viewVersion === "first-time" ? "bg-[#2D64FA] text-white" : "text-[#71717a] hover:text-[#18181b]"}`}
            >
              최초접속
            </button>
            <button
              type="button"
              onClick={() => setViewVersion("in-use")}
              className={`flex h-9 items-center justify-center rounded-full px-4 text-sm font-semibold leading-[1.5] tracking-[-0.14px] transition-colors ${viewVersion === "in-use" ? "bg-[#2D64FA] text-white" : "text-[#71717a] hover:text-[#18181b]"}`}
            >
              사용 중
            </button>
          </div>
          )}

          {/* 앱 만들기 모달 */}
          {makeAppModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-250"
              style={{ opacity: makeAppModalClosing ? 0 : 1 }}
              onClick={closeMakeAppModal}
            >
              <div
                className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
                style={{
                  boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                  backdropFilter: "blur(20px)",
                  animation: makeAppModalClosing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* 제목 */}
                <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">앱 만들기</p>

                {/* 앱 이름 */}
                <div className="flex w-full flex-col gap-2">
                  <label htmlFor="make-app-name" className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                    앱 이름
                  </label>
                  <input
                    id="make-app-name"
                    type="text"
                    value={makeAppName}
                    onChange={(e) => setMakeAppName(e.target.value)}
                    placeholder="이름 입력"
                    className="min-h-12 w-full rounded-full border border-[#e4e4e7] bg-white px-4 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#2D64FA] focus:outline-none"
                  />
                </div>

                {/* 카테고리 */}
                <div className="relative flex w-full flex-col gap-2">
                  <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">카테고리</p>
                  <button
                    type="button"
                    onClick={() => setCategoryDropdownOpen((v) => !v)}
                    className="flex min-h-12 w-full items-center justify-between rounded-full border border-[#e4e4e7] bg-white pl-4 pr-4 text-left transition-colors hover:border-[#d4d4d8] focus:border-[#2D64FA] focus:outline-none"
                  >
                    <span
                      className={`text-base font-normal leading-[1.5] tracking-[-0.16px] ${
                        makeAppCategory ? "text-[#18181b]" : "text-[#a1a1aa]"
                      }`}
                    >
                      {makeAppCategory || "카테고리 선택"}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`shrink-0 transition-transform duration-200 ${categoryDropdownOpen ? "rotate-180" : ""}`}
                    >
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {categoryDropdownOpen && (
                    <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 max-h-[200px] overflow-y-auto rounded-2xl border border-[#e4e4e7] bg-white p-2 shadow-lg">
                      {categoryOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setMakeAppCategory(option);
                            setCategoryDropdownOpen(false);
                          }}
                          className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] transition-colors hover:bg-[#f4f4f5] ${
                            makeAppCategory === option ? "text-[#2D64FA]" : "text-[#18181b]"
                          }`}
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 액션 버튼 */}
                <div className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={closeMakeAppModal}
                    className="flex h-9 items-center justify-center rounded-full bg-[#f6f6f6] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                  >
                    취소
                  </button>
                  <button
                    type="button"
                    disabled={!isMakeAppValid}
                    onClick={() => { if (isMakeAppValid) closeMakeAppModal(); }}
                    className="relative flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#2D64FA] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                  >
                    만들기
                    {!isMakeAppValid && <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 멤버 초대 모달 (T3, Figma 4988:7276) */}
          {inviteModalOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-250"
              style={{ opacity: inviteModalClosing ? 0 : 1 }}
              onClick={closeInviteModal}
            >
              <div
                className="flex max-h-[80vh] w-[566px] flex-col items-end gap-6 overflow-hidden rounded-2xl bg-white p-6"
                style={{
                  boxShadow:
                    "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                  backdropFilter: "blur(20px)",
                  animation: inviteModalClosing
                    ? "modalScaleOut 0.25s ease-in forwards"
                    : "modalScaleIn 0.3s ease-out",
                }}
                onClick={(e) => e.stopPropagation()}
                data-node-id="4988:7276"
              >
                {/* 제목 */}
                <p className="w-full shrink-0 text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-[#18181b]">
                  멤버 초대하기
                </p>

                {/* 입력 행 (스크롤) + + 버튼 (항상 노출) */}
                <div className="flex w-full min-h-0 flex-1 flex-col items-center gap-4">
                  <div className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col gap-4 overflow-y-auto">
                  {inviteRows.map((row, idx) => (
                    <div key={idx} className="flex w-full items-end gap-3">
                      <div className="flex flex-1 min-w-0 flex-col items-start gap-2">
                        {idx === 0 && (
                          <label
                            htmlFor={`invite-email-${idx}`}
                            className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#3f3f46]"
                          >
                            이메일
                          </label>
                        )}
                        <input
                          id={`invite-email-${idx}`}
                          type="email"
                          value={row.email}
                          onChange={(e) =>
                            setInviteRows((prev) =>
                              prev.map((r, i) =>
                                i === idx ? { ...r, email: e.target.value } : r
                              )
                            )
                          }
                          placeholder="이메일 입력"
                          className="min-h-12 w-full rounded-3xl border border-[#e4e4e7] bg-white px-5 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#2D64FA] focus:outline-none"
                        />
                      </div>
                      <div className="relative flex w-[116px] flex-col items-start gap-2">
                        {idx === 0 && (
                          <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                            권한
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() =>
                            setOpenInviteRoleIdx(openInviteRoleIdx === idx ? null : idx)
                          }
                          className="flex h-12 w-full items-center justify-between rounded-3xl border border-[#e4e4e7] bg-white px-5 text-left transition-colors hover:border-[#d4d4d8]"
                        >
                          <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b]">
                            {row.role}
                          </span>
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            className={`shrink-0 transition-transform duration-200 ${
                              openInviteRoleIdx === idx ? "rotate-180" : ""
                            }`}
                          >
                            <path
                              d="M5 7.5L10 12.5L15 7.5"
                              stroke="#18181b"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        {openInviteRoleIdx === idx && (
                          <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-10 overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white p-2 shadow-lg">
                            {(["사용자", "관리자"] as const).map((option) => (
                              <button
                                key={option}
                                type="button"
                                onClick={() => {
                                  setInviteRows((prev) =>
                                    prev.map((r, i) =>
                                      i === idx ? { ...r, role: option } : r
                                    )
                                  );
                                  setOpenInviteRoleIdx(null);
                                }}
                                className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-base font-normal leading-[1.5] tracking-[-0.16px] transition-colors hover:bg-[#f4f4f5] ${
                                  row.role === option ? "text-[#2D64FA]" : "text-[#18181b]"
                                }`}
                              >
                                {option}
                              </button>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  </div>

                  <button
                    type="button"
                    onClick={addInviteRow}
                    disabled={!canAddInviteRow}
                    aria-label="이메일 행 추가"
                    className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[12px] bg-[rgba(24,24,27,0.03)] transition-colors hover:bg-[rgba(24,24,27,0.06)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-[rgba(24,24,27,0.03)]"
                  >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M10 4.375v11.25M4.375 10h11.25"
                        stroke="#18181b"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </button>
                </div>

                {/* 도메인 helper */}
                <div
                  className="flex w-full shrink-0 flex-col items-start gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5"
                  data-node-id="4988:8184"
                >
                  <div className="flex w-full items-start gap-2">
                    <p className="flex-1 whitespace-pre-wrap text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                      구글 워크스페이스 쓰시나요? {"\n"}
                      명단을 한 번에 불러올 수 있어요!
                    </p>
                    <button
                      type="button"
                      className="flex h-8 shrink-0 items-center justify-center rounded-full bg-[#18181b] px-5 py-3 transition-opacity hover:opacity-90"
                    >
                      <span className="whitespace-nowrap text-sm font-medium leading-[1.5] tracking-[-0.14px] text-white">
                        파일 올리기
                      </span>
                    </button>
                  </div>
                  <p className="w-full text-xs leading-[1.3] tracking-[-0.12px] text-[#71717a]">
                    <span className="font-semibold">디렉토리</span> &gt;{" "}
                    <span className="font-semibold">사용자</span> &gt;{" "}
                    <span className="font-semibold">사용자 다운로드</span>
                    <span>로 받은 파일을 올려주세요</span>
                  </p>
                </div>

                {/* 액션 버튼 */}
                <div className="flex shrink-0 items-start gap-2">
                  <button
                    type="button"
                    onClick={closeInviteModal}
                    className="flex h-9 items-center justify-center rounded-full bg-[#f6f6f6] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                  >
                    닫기
                  </button>
                  <button
                    type="button"
                    disabled={!canSendInvite}
                    onClick={submitInvite}
                    className="relative flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#2D64FA] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                  >
                    초대하기
                    {!canSendInvite && (
                      <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 계정 활성/비활성 확인 모달 (Figma 5005:8241 / 5024:8271) */}
          {deactivateModalOpen && detailMember && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 transition-opacity duration-250"
              style={{ opacity: deactivateModalClosing ? 0 : 1 }}
              onClick={closeDeactivateModal}
            >
              {(() => {
                const isReactivate = detailMember.status === "비활성";
                const actionLabel = isReactivate ? "활성화" : "비활성화";
                const subtitle = isReactivate
                  ? "다시 접근할 수 있어요"
                  : "더 이상 접근할 수 없어요";
                return (
                  <div
                    className="flex w-[420px] flex-col items-center justify-center gap-10 rounded-2xl bg-white px-6 py-10"
                    style={{
                      boxShadow:
                        "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                      backdropFilter: "blur(20px)",
                      animation: deactivateModalClosing
                        ? "modalScaleOut 0.25s ease-in forwards"
                        : "modalScaleIn 0.3s ease-out",
                    }}
                    onClick={(e) => e.stopPropagation()}
                    data-node-id={isReactivate ? "5024:8271" : "5005:8241"}
                  >
                    <div className="flex w-full flex-col items-center gap-2">
                      <p className="w-full text-center text-[22px] font-semibold leading-[1.3] tracking-[-0.22px] text-[#18181b]">
                        {detailMember.fullName} 님의
                        <br />
                        계정을 {actionLabel} 할까요?
                      </p>
                      <p className="w-full text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                        조코딩AX파트너스 팀 허브에
                        <br />
                        {subtitle}
                      </p>
                    </div>
                    <div className="flex w-full items-center justify-center gap-2">
                      <button
                        type="button"
                        onClick={closeDeactivateModal}
                        className="flex h-9 items-center justify-center rounded-full bg-[#f6f6f6] px-5 py-3 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
                      >
                        취소
                      </button>
                      <button
                        type="button"
                        onClick={confirmStatusToggle}
                        className="flex h-9 items-center justify-center rounded-full bg-[#18181b] px-5 py-3 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
                      >
                        네, {actionLabel} 할게요
                      </button>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* 계정 상태 변경 토스트 (Figma 5024:8283) */}
          {statusToast && (
            <div
              className="fixed right-6 top-6 z-[60] flex w-[340px] items-center gap-3 rounded-2xl bg-white px-4"
              style={{
                boxShadow:
                  "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                backdropFilter: "blur(20px)",
                animation: statusToast.closing
                  ? "toastSlideOut 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                  : "toastSlideIn 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              data-node-id="5024:8283"
            >
              <div className="flex shrink-0 items-center py-3.5">
                <Image
                  src={
                    statusToast.type === "activate"
                      ? "/icons/version-b/lock-open.svg"
                      : "/icons/version-b/lock-closed.svg"
                  }
                  alt=""
                  width={24}
                  height={24}
                />
              </div>
              <div className="flex min-h-14 flex-1 flex-col justify-center py-[11.5px]">
                <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[rgba(24,24,27,0.9)]">
                  {statusToast.type === "activate"
                    ? "계정을 활성화 했습니다"
                    : "계정을 비활성화 했습니다"}
                </p>
                <p className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                  계정 상태를 확인해 보세요
                </p>
              </div>
            </div>
          )}

          {/* 초기 시작 가이드 모달 */}
          {guideModalOpen && (
            <div className="absolute inset-0 z-50 flex items-center justify-center overflow-hidden bg-white/50 transition-opacity duration-250" style={{ opacity: guideModalClosing ? 0 : 1 }} onClick={closeGuideModal}>
              <div className="flex h-[724px] w-[546px] flex-col overflow-hidden rounded-2xl bg-white" style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)", backdropFilter: "blur(20px)", animation: guideModalClosing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out" }} onClick={(e) => e.stopPropagation()}>
                {guideModalStep === "os-select" ? (
                  /* 첫 번째 모달: OS 선택 */
                  <div key="os-select" className="flex h-full w-full flex-col items-center justify-center gap-10 p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideRight"} 0.35s ease-out` }}>
                    <div className="relative flex flex-col items-center justify-center gap-5 py-10">
                      <Image src="/icons/version-b/home-bg-initial.png" alt="" width={466} height={287} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <h2 className="relative z-10 text-center text-2xl font-bold leading-[1.4] text-[#18181b]">
                        AXHub에 오신 걸 환영합니다
                        <br />
                        ClaudeCode 세팅부터 시작해 보세요
                      </h2>
                      <p className="relative z-10 text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]/70">
                        어떤 PC 환경을 사용 중이신가요?
                      </p>
                    </div>
                    <div className="flex w-full flex-col gap-2 px-10">
                      <button type="button" onClick={() => { setSelectedOS("mac"); setGuideDirection("forward"); setGuideModalStep("mac"); }} className="flex w-full items-center justify-center rounded-xl border border-[#e4e4e7] bg-white p-4 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f6f7f9]">
                        Mac OS
                      </button>
                      <button type="button" onClick={() => { setSelectedOS("windows"); setGuideDirection("forward"); setGuideModalStep("windows"); }} className="flex w-full items-center justify-center rounded-xl border border-[#e4e4e7] bg-white p-4 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#3f3f46] transition-colors hover:bg-[#f6f7f9]">
                        Windows OS
                      </button>
                    </div>
                  </div>
                ) : guideModalStep === "mac" ? (
                  /* Mac OS 가이드 (4단계) */
                  <div key="mac" className="flex h-full w-full flex-col justify-between p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideLeft"} 0.35s ease-out` }}>
                    <div className="relative w-full">
                      <div className="absolute left-[13px] top-[14px] bottom-[14px] w-px bg-[#d4d4d8]" />
                      {/* Step 1: 터미널 열기 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#2D64FA]">1</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">터미널 열기</h3>
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                              <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Cmd</span>
                              <span>+</span>
                              <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Space</span>
                              <span>를 눌러 Spotlight를 열어주세요</span>
                            </div>
                            <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                              <span className="font-bold">Terminal</span>
                              <span>을 입력하고</span>
                              <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                              <span>를 눌러주세요</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* Step 2: 플러그인 설치 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#2D64FA]">2</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 플러그인 설치하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 터미널에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin marketplace add jocoding-ax-partners/axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin marketplace add jocoding-ax-partners/axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>한 번 더, 아래 코드를 복사 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin install jocoding-ax-partners@axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin install jocoding-ax-partners@axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Step 3: 클로드코드 열기 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#2D64FA]">3</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 열기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span className="font-bold">Claude</span>
                            <span>를 입력하고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                        </div>
                      </div>
                      {/* Step 4: 초기화 */}
                      <div className="relative flex gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#2D64FA]">4</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">AXHub 사용을 위해 초기화하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 클로드코드에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">/axhub-init</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("/axhub-init")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-center justify-end gap-2">
                      <button type="button" onClick={() => { setGuideDirection("back"); setGuideModalStep("os-select"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={() => { setGuideDirection("forward"); setGuideModalStep("final"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#2D64FA] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        다음
                      </button>
                    </div>
                  </div>
                ) : guideModalStep === "windows" ? (
                  /* Windows OS 가이드 (3단계) */
                  <div key="windows" className="flex h-full w-full flex-col items-end gap-8 p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideLeft"} 0.35s ease-out` }}>
                    <div className="relative w-full">
                      <div className="absolute left-[13px] top-[14px] bottom-[14px] w-px bg-[#d4d4d8]" />
                      {/* Step 1: 플러그인 설치 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#2D64FA]">1</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 플러그인 설치하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 터미널에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin marketplace add jocoding-ax-partners/axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin marketplace add jocoding-ax-partners/axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>한 번 더, 아래 코드를 복사 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">claude plugin install jocoding-ax-partners@axhub</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("claude plugin install jocoding-ax-partners@axhub")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                      {/* Step 2: 클로드코드 열기 */}
                      <div className="relative flex gap-3 pb-8">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#2D64FA]">2</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">클로드코드 열기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span className="font-bold">Claude</span>
                            <span>를 입력하고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                        </div>
                      </div>
                      {/* Step 3: 초기화 */}
                      <div className="relative flex gap-3">
                        <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-[#e7d8f3] text-base font-bold text-[#2D64FA]">3</span>
                        <div className="flex flex-col gap-3">
                          <h3 className="flex h-7 items-center text-lg font-bold leading-[1.4] tracking-[-0.18px] text-black">AXHub 사용을 위해 초기화하기</h3>
                          <div className="flex items-center gap-1 text-sm leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            <span>아래 코드를 복사 후, 클로드코드에 붙여넣고</span>
                            <span className="rounded-lg border border-[#d4d4d8] bg-white px-3 py-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#18181b]">Enter</span>
                            <span>를 눌러주세요</span>
                          </div>
                          <div className="flex items-center gap-2 rounded-xl border border-[#e4e4e7] bg-[#f4f4f5] px-3 py-2.5">
                            <span className="flex-1 text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#71717a]">/axhub-init</span>
                            <button type="button" className="shrink-0" onClick={() => navigator.clipboard.writeText("/axhub-init")}>
                              <Image src="/icons/version-b/copy-icon.svg" alt="복사" width={20} height={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1" />
                    <div className="flex w-full items-center justify-end gap-2">
                      <button type="button" onClick={() => { setGuideDirection("back"); setGuideModalStep("os-select"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={() => { setGuideDirection("forward"); setGuideModalStep("final"); }} className="flex h-9 items-center justify-center rounded-lg bg-[#2D64FA] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        다음
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 마지막 모달 */
                  <div key="final" className="flex h-full w-full flex-col items-end gap-8 p-10" style={{ animation: `${guideDirection === "back" ? "slideRight" : "slideLeft"} 0.35s ease-out` }}>
                    <div className="relative flex flex-1 flex-col items-center justify-center gap-5 w-full">
                      <Image src="/icons/version-b/home-bg-initial.png" alt="" width={466} height={287} className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
                      <h2 className="relative z-10 text-center text-2xl font-bold leading-[1.2] text-[#18181b]">
                        이제 ClaudeCode에서
                        <br />
                        바이브코딩으로 앱을 만들어 보세요
                      </h2>
                      <p className="relative z-10 text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b]/70">
                        사내 구성원이 만든 모든 앱은 AXHub에서 사용할 수 있어요
                      </p>
                    </div>
                    <div className="flex items-center justify-end gap-2">
                      <button type="button" onClick={() => { setGuideDirection("back"); setGuideModalStep(selectedOS); }} className="flex h-9 items-center justify-center rounded-lg bg-[#f6f6f6] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]">
                        이전
                      </button>
                      <button type="button" onClick={closeGuideModal} className="flex h-9 items-center justify-center rounded-lg bg-[#2D64FA] px-8 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90">
                        시작
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

        </div>

        {/* 멤버 상세 사이드 패널 (Figma 4988:7843) */}
        {detailMember && (
          <div
            className="absolute right-0 top-0 z-30 flex h-full w-[350px] flex-col items-end gap-6 bg-white p-8"
            style={{
              boxShadow: "-1px 0 5px rgba(0,0,0,0.1)",
              animation: detailClosing
                ? "slideOutRight 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards"
                : "slideInRight 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            data-node-id="4988:7843"
          >
            {/* 헤더 */}
            <div className="flex w-full items-start gap-6">
              <div className="flex flex-1 items-center gap-2">
                <div
                  className="flex size-8 items-center justify-center rounded-full p-2"
                  style={{ backgroundColor: detailMember.avatarColor }}
                >
                  <span className="whitespace-nowrap text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white">
                    {detailMember.initials}
                  </span>
                </div>
                <p className="flex-1 truncate text-2xl font-bold leading-[1.2] text-[#18181b]">
                  {detailMember.fullName}
                </p>
              </div>
              <button
                type="button"
                onClick={closeMemberDetail}
                aria-label="닫기"
                className="flex size-6 items-center justify-center"
              >
                <Image
                  src="/icons/version-b/close-icon.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            </div>

            {/* 디테일 */}
            <div className="flex w-full flex-1 flex-col gap-6 py-5">
              <div className="flex w-full items-center gap-6">
                <p className="w-[100px] shrink-0 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  이메일
                </p>
                <p className="whitespace-nowrap text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b]">
                  {detailMember.email}
                </p>
              </div>

              <div className="flex w-full items-center gap-6">
                <p className="w-[100px] shrink-0 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  권한
                </p>
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => setDetailRoleOpen((v) => !v)}
                    className="flex h-12 w-full items-center justify-between rounded-3xl border border-[#e4e4e7] bg-white px-5 transition-colors hover:border-[#d4d4d8]"
                  >
                    <span className="text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b]">
                      {detailDraftRole}
                    </span>
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      className={`shrink-0 transition-transform duration-200 ${
                        detailRoleOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M5 7.5L10 12.5L15 7.5"
                        stroke="#18181b"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  {detailRoleOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-10"
                        onClick={() => setDetailRoleOpen(false)}
                      />
                      <div className="absolute left-0 right-0 top-[calc(100%+4px)] z-20 overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white p-2 shadow-lg">
                        {(["관리자", "사용자"] as const).map((option) => (
                          <button
                            key={option}
                            type="button"
                            onClick={() => {
                              setDetailDraftRole(option);
                              setDetailRoleOpen(false);
                            }}
                            className={`flex w-full items-center rounded-lg px-3 py-2 text-left text-base transition-colors hover:bg-[#f4f4f5] ${
                              detailDraftRole === option
                                ? "font-semibold text-[#2D64FA]"
                                : "font-normal text-[#18181b]"
                            }`}
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>

              <div className="flex w-full items-center gap-6">
                <p className="w-[100px] shrink-0 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  계정 상태
                </p>
                <span
                  className="flex items-center justify-center whitespace-nowrap rounded-full px-4 py-1 text-base font-semibold leading-[1.5] tracking-[-0.16px]"
                  style={{
                    backgroundColor: STATUS_STYLES[detailMember.status].bg,
                    color: STATUS_STYLES[detailMember.status].text,
                  }}
                >
                  {detailMember.status}
                </span>
              </div>

              <div className="flex w-full items-center gap-6">
                <p className="w-[100px] shrink-0 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  마지막 접속일
                </p>
                <p className="whitespace-nowrap text-base font-medium leading-[1.5] tracking-[-0.16px] text-[#18181b]">
                  {detailMember.lastAccess}
                </p>
              </div>
            </div>

            {/* 액션 버튼 */}
            <div className="flex w-full flex-col gap-2">
              <button
                type="button"
                onClick={saveMemberDetail}
                disabled={!canSaveDetail}
                className="relative flex h-12 w-full items-center justify-center overflow-hidden rounded-full bg-[#18181b] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity hover:opacity-90"
              >
                저장
                {!canSaveDetail && (
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />
                )}
              </button>
              <button
                type="button"
                onClick={onDeactivateClick}
                className="flex h-12 w-full items-center justify-center rounded-full bg-[#f6f6f6] px-6 py-3 text-base font-semibold leading-[1.5] tracking-[-0.16px] transition-colors hover:bg-[#ececec]"
                style={{
                  color: detailMember.status === "비활성" ? "#1571F3" : "#ef1026",
                }}
              >
                {detailMember.status === "비활성"
                  ? "계정 활성화"
                  : "계정 비활성화"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

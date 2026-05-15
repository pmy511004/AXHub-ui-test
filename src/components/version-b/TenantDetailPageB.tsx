"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PlatformAdminSidebar from "./PlatformAdminSidebar";

type Tenant = {
  name: string;
  email: string;
  slug: string;
  createdAt: string;
  apps: number;
  members: number;
};

type AppStatus = "운영중" | "보관중" | "개발중";
type MemberStatus = "활성" | "비활성";
type MemberRole = "관리자" | "사용자";

const STATUS_TONE: Record<AppStatus | MemberStatus, { bg: string; color: string }> = {
  운영중: { bg: "#e7f1fe", color: "#1571f3" },
  보관중: { bg: "#f6f6f6", color: "#71717a" },
  개발중: { bg: "#fffbe1", color: "#f6c205" },
  활성: { bg: "#e7f1fe", color: "#1571f3" },
  비활성: { bg: "#f6f6f6", color: "#71717a" },
};

const APPS: ReadonlyArray<{
  name: string;
  devName: string;
  devEmail: string;
  status: AppStatus;
  createdAt: string;
}> = [
  { name: "경비 정산 자동화", devName: "송재희", devEmail: "j@mintlab.io", status: "운영중", createdAt: "2026-05-13" },
  { name: "스마트 캘린더", devName: "박지호", devEmail: "jiho@mintlab.io", status: "보관중", createdAt: "2026-05-10" },
  { name: "매출 대시보드", devName: "김민지", devEmail: "minji@mintlab.io", status: "개발중", createdAt: "2026-05-08" },
  { name: "프로젝트 트래커", devName: "이재성", devEmail: "jaeseong@mintlab.io", status: "운영중", createdAt: "2026-04-28" },
  { name: "회의실 예약", devName: "송재희", devEmail: "j@mintlab.io", status: "운영중", createdAt: "2026-04-22" },
  { name: "전자 결재", devName: "최서영", devEmail: "seoyoung@mintlab.io", status: "운영중", createdAt: "2026-04-15" },
  { name: "고객 CRM", devName: "박지호", devEmail: "jiho@mintlab.io", status: "개발중", createdAt: "2026-04-10" },
  { name: "AI 문서 요약", devName: "정유나", devEmail: "yuna@mintlab.io", status: "운영중", createdAt: "2026-03-31" },
  { name: "팀 메신저", devName: "김민지", devEmail: "minji@mintlab.io", status: "보관중", createdAt: "2026-03-22" },
  { name: "데이터 시각화", devName: "한재훈", devEmail: "jaehoon@mintlab.io", status: "운영중", createdAt: "2026-03-15" },
  { name: "재고 관리", devName: "이재성", devEmail: "jaeseong@mintlab.io", status: "개발중", createdAt: "2026-03-08" },
  { name: "HR 봇", devName: "윤다영", devEmail: "dayoung@mintlab.io", status: "운영중", createdAt: "2026-02-25" },
];

const MEMBERS: ReadonlyArray<{
  name: string;
  email: string;
  role: MemberRole;
  status: MemberStatus;
  joinedAt: string;
}> = [
  { name: "박민영", email: "minyoung@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-05-12" },
  { name: "고성현", email: "sunghyun@mintlab.io", role: "관리자", status: "비활성", joinedAt: "2026-05-12" },
  { name: "송재희", email: "j@mintlab.io", role: "관리자", status: "활성", joinedAt: "2026-05-10" },
  { name: "박지호", email: "jiho@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-05-08" },
  { name: "김민지", email: "minji@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-05-05" },
  { name: "이재성", email: "jaeseong@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-05-02" },
  { name: "최서영", email: "seoyoung@mintlab.io", role: "관리자", status: "활성", joinedAt: "2026-04-28" },
  { name: "정유나", email: "yuna@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-04-25" },
  { name: "한재훈", email: "jaehoon@mintlab.io", role: "사용자", status: "비활성", joinedAt: "2026-04-22" },
  { name: "윤다영", email: "dayoung@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-04-18" },
  { name: "강도현", email: "dohyun@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-04-15" },
  { name: "임수아", email: "sua@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-04-12" },
  { name: "노지훈", email: "jihoon@mintlab.io", role: "사용자", status: "비활성", joinedAt: "2026-04-08" },
  { name: "백서윤", email: "seoyun@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-04-04" },
  { name: "차은우", email: "eunwoo@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-03-30" },
  { name: "오민준", email: "minjun@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-03-26" },
  { name: "신혜진", email: "hyejin@mintlab.io", role: "관리자", status: "활성", joinedAt: "2026-03-22" },
  { name: "류지원", email: "jiwon@mintlab.io", role: "사용자", status: "비활성", joinedAt: "2026-03-18" },
  { name: "장태민", email: "taemin@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-03-14" },
  { name: "권나연", email: "nayeon@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-03-10" },
  { name: "황우진", email: "woojin@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-03-06" },
  { name: "조서아", email: "seoah@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-03-02" },
  { name: "한지민", email: "jimin@mintlab.io", role: "사용자", status: "비활성", joinedAt: "2026-02-26" },
  { name: "양세빈", email: "sebin@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-02-22" },
  { name: "문지유", email: "jiyu@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-02-18" },
  { name: "배상윤", email: "sangyoon@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-02-14" },
  { name: "서주아", email: "jua@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-02-10" },
  { name: "곽민서", email: "minseo@mintlab.io", role: "사용자", status: "비활성", joinedAt: "2026-02-06" },
  { name: "표하늘", email: "haneul@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-02-02" },
  { name: "우현우", email: "hyeonu@mintlab.io", role: "사용자", status: "활성", joinedAt: "2026-01-29" },
];

type AppStatusFilter = "전체" | AppStatus;
type MemberRoleFilter = "전체" | MemberRole;
type MemberStatusFilter = "전체" | MemberStatus;
type FilterKey = "appStatus" | "memberRole" | "memberStatus";

const APP_STATUS_OPTIONS: ReadonlyArray<AppStatusFilter> = ["전체", "운영중", "개발중", "보관중"];
const MEMBER_ROLE_OPTIONS: ReadonlyArray<MemberRoleFilter> = ["전체", "관리자", "사용자"];
const MEMBER_STATUS_OPTIONS: ReadonlyArray<MemberStatusFilter> = ["전체", "활성", "비활성"];

export default function TenantDetailPageB({ tenant }: { tenant: Tenant }) {
  const [tab, setTab] = useState<"app" | "member">("app");
  const [scrollTopVisible, setScrollTopVisible] = useState(false);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  const [openFilter, setOpenFilter] = useState<FilterKey | null>(null);
  const [appStatusFilter, setAppStatusFilter] = useState<AppStatusFilter>("전체");
  const [memberRoleFilter, setMemberRoleFilter] = useState<MemberRoleFilter>("전체");
  const [memberStatusFilter, setMemberStatusFilter] = useState<MemberStatusFilter>("전체");

  useEffect(() => {
    setOpenFilter(null);
  }, [tab]);

  const visibleApps = APPS.filter((a) => appStatusFilter === "전체" || a.status === appStatusFilter);
  const visibleMembers = MEMBERS.filter(
    (m) =>
      (memberRoleFilter === "전체" || m.role === memberRoleFilter) &&
      (memberStatusFilter === "전체" || m.status === memberStatusFilter),
  );

  const renderFilterHeader = <T extends string>(
    label: string,
    filterKey: FilterKey,
    options: ReadonlyArray<T>,
    value: T,
    onChange: (v: T) => void,
  ) => {
    const isOpen = openFilter === filterKey;
    const active = value !== "전체";
    return (
      <div className="relative flex flex-1 items-center min-w-0">
        <button
          type="button"
          onClick={() => setOpenFilter(isOpen ? null : filterKey)}
          className="flex items-center gap-2"
        >
          <span
            className={`text-sm font-medium leading-[1.5] tracking-[-0.14px] transition-colors ${
              active ? "text-[#2D64FA]" : "text-[#a1a1aa]"
            }`}
          >
            {active ? value : label}
          </span>
          <Image
            src="/icons/version-b/column-toggle-icon.svg"
            alt=""
            width={18}
            height={18}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
          />
        </button>
        {isOpen && (
          <div
            className="absolute left-0 top-[calc(100%+6px)] z-20 flex min-w-[140px] flex-col gap-0.5 rounded-xl border border-[#e4e4e7] bg-white p-2"
            style={{
              boxShadow:
                "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {options.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpenFilter(null);
                }}
                className={`rounded-md px-3 py-1.5 text-left text-sm leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-[#f4f4f5] ${
                  opt === value
                    ? "font-semibold text-[#2D64FA]"
                    : "font-normal text-[#18181b]"
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  useEffect(() => {
    const onScroll = () => setScrollTopVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const measure = () => {
      const activeIndex = tab === "app" ? 0 : 1;
      const el = tabRefs.current[activeIndex];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [tab]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <main className="flex min-h-screen w-full flex-col bg-white" data-node-id="4824:3006">
      {/* 상단 헤더 */}
      <header
        className="sticky top-0 z-10 flex h-[60px] w-full shrink-0 items-center gap-3 border-b border-[rgba(82,82,91,0.08)] bg-white px-5"
        data-node-id="4824:3007"
      >
        <span className="text-2xl font-bold leading-[1.2] text-[#18181b]">AXHub</span>
        <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
          플랫폼 관리자
        </span>
      </header>

      {/* 사이드 + 본문 */}
      <div className="mx-auto flex w-full max-w-[1439px] items-start">
        <PlatformAdminSidebar active="tenants" />
        <section className="flex min-w-0 flex-1 flex-col gap-10 px-14 pb-[120px] pt-10">
        {/* Breadcrumbs */}
        <Link
          href="/platform-admin"
          className="flex shrink-0 items-center gap-1 self-start transition-opacity hover:opacity-70"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path
              d="M10 3.5 L5.5 8 L10 12.5"
              stroke="#71717a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="px-1 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
            목록으로 돌아가기
          </span>
        </Link>

        {/* 회사명 */}
        <h1 className="text-[32px] font-bold leading-[1.2] text-[#18181b]">
          {tenant.name}
        </h1>

        {/* 메타 박스 */}
        <div className="flex h-[120px] w-full items-stretch border-y border-[#e4e4e7] bg-white">
          {/* 이메일 */}
          <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden p-7">
            <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
              이메일
            </p>
            <p className="truncate text-xl font-medium leading-[1.3] tracking-[-0.2px] text-[#3f3f46]">
              {tenant.email}
            </p>
          </div>
          <div className="w-px self-stretch bg-[#e4e4e7]" />
          {/* 슬러그 */}
          <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden p-7">
            <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">
              슬러그
            </p>
            <span className="self-start rounded-lg bg-[#f6f6f6] px-2 py-1 text-lg font-semibold leading-[1.4] tracking-[-0.18px] text-[#2D64FA]">
              {tenant.slug}
            </span>
          </div>
          <div className="w-px self-stretch bg-[#e4e4e7]" />
          {/* 생성일 */}
          <div className="flex flex-1 flex-col justify-center gap-2 overflow-hidden p-7">
            <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
              생성일
            </p>
            <p className="truncate text-xl font-medium leading-[1.3] tracking-[-0.2px] text-[#3f3f46]">
              {tenant.createdAt}
            </p>
          </div>
        </div>

        {/* 탭 + 테이블 */}
        <div className="flex w-full flex-col gap-5">
          {/* 탭 */}
          <nav className="relative flex w-full shrink-0 gap-2">
            {(["app", "member"] as const).map((key, i) => {
              const isActive = tab === key;
              const label = key === "app" ? "앱" : "멤버";
              const count = key === "app" ? tenant.apps : tenant.members;
              return (
                <button
                  key={key}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  type="button"
                  onClick={() => setTab(key)}
                  className="flex items-center gap-2 px-3 py-2"
                >
                  <span
                    className={`text-base leading-[1.5] tracking-[-0.16px] transition-colors ${
                      isActive
                        ? "font-semibold text-[#18181b]"
                        : "font-normal text-[rgba(24,24,27,0.9)]"
                    }`}
                  >
                    {label}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] transition-colors ${
                      isActive
                        ? "bg-[rgba(91,61,122,0.1)] text-[#2D64FA]"
                        : "bg-[#f6f6f6] text-[#71717a]"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 h-0.5 bg-[#2D64FA] transition-[left,width] duration-300 ease-out"
              style={{ left: indicator.left, width: indicator.width }}
            />
          </nav>

          {/* 테이블 */}
          <div className="flex w-full flex-col rounded-3xl bg-[#f6f6f6] p-1">
            {tab === "app" ? (
              <>
                {/* 헤더 */}
                <div className="flex w-full shrink-0 items-center gap-4 px-4 py-2.5">
                  {["앱 이름", "개발자"].map((h) => (
                    <div key={h} className="flex flex-1 items-center min-w-0">
                      <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                        {h}
                      </span>
                    </div>
                  ))}
                  {renderFilterHeader(
                    "운영 상태",
                    "appStatus",
                    APP_STATUS_OPTIONS,
                    appStatusFilter,
                    setAppStatusFilter,
                  )}
                  <div className="flex flex-1 items-center min-w-0">
                    <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                      생성일
                    </span>
                  </div>
                </div>
                {/* 바디 */}
                <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white">
                  {visibleApps.map((app, i) => {
                    const tone = STATUS_TONE[app.status];
                    return (
                      <div
                        key={i}
                        className="relative flex h-14 w-full shrink-0 items-center gap-4 px-4 py-3"
                      >
                        <div className="flex flex-1 items-center min-w-0">
                          <p className="truncate text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                            {app.name}
                          </p>
                        </div>
                        <div className="flex flex-1 items-center gap-2 min-w-0">
                          <p className="shrink-0 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                            {app.devName}
                          </p>
                          <p className="truncate text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            {app.devEmail}
                          </p>
                        </div>
                        <div className="flex flex-1 items-center min-w-0">
                          <span
                            className="inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold leading-[1.3] tracking-[-0.12px]"
                            style={{ backgroundColor: tone.bg, color: tone.color }}
                          >
                            {app.status}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center min-w-0">
                          <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            {app.createdAt}
                          </p>
                        </div>
                        {i < visibleApps.length - 1 && (
                          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#e4e4e7] opacity-50" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            ) : (
              <>
                {/* 헤더 */}
                <div className="flex w-full shrink-0 items-center gap-4 px-4 py-2.5">
                  {["이름", "이메일"].map((h) => (
                    <div key={h} className="flex flex-1 items-center min-w-0">
                      <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                        {h}
                      </span>
                    </div>
                  ))}
                  {renderFilterHeader(
                    "권한",
                    "memberRole",
                    MEMBER_ROLE_OPTIONS,
                    memberRoleFilter,
                    setMemberRoleFilter,
                  )}
                  {renderFilterHeader(
                    "계정 상태",
                    "memberStatus",
                    MEMBER_STATUS_OPTIONS,
                    memberStatusFilter,
                    setMemberStatusFilter,
                  )}
                  <div className="flex flex-1 items-center min-w-0">
                    <span className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#a1a1aa]">
                      가입일
                    </span>
                  </div>
                </div>
                {/* 바디 */}
                <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white">
                  {visibleMembers.map((m, i) => {
                    const tone = STATUS_TONE[m.status];
                    return (
                      <div
                        key={i}
                        className="relative flex h-14 w-full shrink-0 items-center gap-4 px-4 py-3"
                      >
                        <div className="flex flex-1 items-center min-w-0">
                          <p className="truncate text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                            {m.name}
                          </p>
                        </div>
                        <div className="flex flex-1 items-center min-w-0">
                          <p className="truncate text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            {m.email}
                          </p>
                        </div>
                        <div className="flex flex-1 items-center gap-1 min-w-0">
                          {m.role === "관리자" && (
                            <Image
                              src="/icons/version-b/admin-check-icon.svg"
                              alt=""
                              width={18}
                              height={18}
                              className="shrink-0"
                            />
                          )}
                          <p className="text-sm font-medium leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                            {m.role}
                          </p>
                        </div>
                        <div className="flex flex-1 items-center min-w-0">
                          <span
                            className="inline-flex items-center justify-center rounded-full px-2 py-1 text-xs font-semibold leading-[1.3] tracking-[-0.12px]"
                            style={{ backgroundColor: tone.bg, color: tone.color }}
                          >
                            {m.status}
                          </span>
                        </div>
                        <div className="flex flex-1 items-center min-w-0">
                          <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                            {m.joinedAt}
                          </p>
                        </div>
                        {i < visibleMembers.length - 1 && (
                          <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#e4e4e7] opacity-50" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
        </section>
      </div>

      <button
        type="button"
        onClick={scrollToTop}
        aria-label="맨 위로 이동"
        className={`fixed bottom-6 left-1/2 z-20 flex size-9 items-center justify-center rounded-full bg-[#18181b] shadow-[0px_4px_12px_rgba(0,0,0,0.15)] transition-all duration-300 ease-out hover:opacity-90 ${
          scrollTopVisible
            ? "pointer-events-auto -translate-x-1/2 translate-y-0 opacity-100"
            : "pointer-events-none -translate-x-1/2 translate-y-3 opacity-0"
        }`}
      >
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <path d="M10 16 V4.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" />
          <path
            d="M4.5 9.5 L10 4 L15.5 9.5"
            stroke="white"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </button>
    </main>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";

type Tenant = {
  name: string;
  slug: string;
  createdAt: string;
  apps: number;
  members: number;
};

const TENANTS: ReadonlyArray<Tenant> = [
  { name: "민트랩 주식회사", slug: "/mintlab", createdAt: "2026-05-12", apps: 235, members: 400 },
  { name: "그린테크 솔루션", slug: "/greentech", createdAt: "2026-04-30", apps: 184, members: 312 },
  { name: "노바AI 랩스", slug: "/novaai", createdAt: "2026-04-22", apps: 421, members: 588 },
  { name: "어센드 워크스", slug: "/ascend", createdAt: "2026-04-15", apps: 96, members: 142 },
  { name: "파스텔 디자인", slug: "/pastel", createdAt: "2026-03-28", apps: 67, members: 89 },
  { name: "데이브릿지 컴퍼니", slug: "/daybridge", createdAt: "2026-03-19", apps: 312, members: 504 },
  { name: "스카이로프트", slug: "/skyloft", createdAt: "2026-03-04", apps: 152, members: 233 },
  { name: "더플로우 스튜디오", slug: "/theflow", createdAt: "2026-02-20", apps: 78, members: 124 },
  { name: "오리진 파트너스", slug: "/origin", createdAt: "2026-02-09", apps: 209, members: 365 },
];

export default function PlatformAdminPageB() {
  const [search, setSearch] = useState("");
  const [tenantModalOpen, setTenantModalOpen] = useState(false);
  const [tenantModalClosing, setTenantModalClosing] = useState(false);
  const [tenantName, setTenantName] = useState("");
  const [tenantSlug, setTenantSlug] = useState("");

  const openTenantModal = () => setTenantModalOpen(true);
  const closeTenantModal = () => {
    setTenantModalClosing(true);
    setTimeout(() => {
      setTenantModalOpen(false);
      setTenantModalClosing(false);
    }, 250);
  };
  const isTenantValid = tenantName.trim() !== "" && tenantSlug.trim() !== "";

  return (
    <main className="flex min-h-screen w-full flex-col bg-white" data-node-id="4821:2132">
      {/* 상단 헤더 */}
      <header
        className="flex h-[60px] w-full shrink-0 items-center gap-3 border-b border-[rgba(82,82,91,0.08)] bg-white px-5"
        data-node-id="4821:2182"
      >
        <span className="text-2xl font-bold leading-[1.2] text-[#18181b]">AXHub</span>
        <span className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
          플랫폼 관리자
        </span>
      </header>

      {/* 본문 */}
      <section
        className="mx-auto flex w-full max-w-[1280px] flex-col gap-10 px-14 pb-[120px] pt-10"
        data-node-id="4821:2194"
      >
        {/* 페이지 제목 + 새 테넌트 버튼 */}
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[32px] font-bold leading-[1.2] text-[#18181b]">테넌트</span>
            <span className="text-[32px] font-bold leading-[1.2] text-[#a1a1aa]">{TENANTS.length}개</span>
          </div>
          <button
            type="button"
            onClick={openTenantModal}
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-[#18181b] px-8 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white transition-opacity duration-200 ease-out hover:opacity-90"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <path
                d="M10 4.5 V15.5 M4.5 10 H15.5"
                stroke="white"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            새 테넌트
          </button>
        </div>

        {/* 검색 + 테이블 */}
        <div className="flex w-full flex-col gap-5">
          {/* 검색 input */}
          <div className="flex h-12 w-[400px] items-center gap-3 rounded-full bg-[#f4f4f5] px-4 py-3">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" className="shrink-0">
              <circle cx="9" cy="9" r="6" stroke="#71717a" strokeWidth="1.5" />
              <path d="M13.5 13.5 L17 17" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="이름, 슬러그 검색"
              className="flex-1 bg-transparent text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:outline-none"
            />
            {search.length > 0 && (
              <button
                type="button"
                onClick={() => setSearch("")}
                aria-label="검색어 지우기"
                className="shrink-0 transition-opacity duration-150 hover:opacity-80"
              >
                <Image
                  src="/icons/version-b/search-clear-icon.svg"
                  alt=""
                  width={24}
                  height={24}
                />
              </button>
            )}
          </div>

          {/* 테이블 */}
          <div className="flex w-full flex-col rounded-3xl bg-[#f6f6f6] p-1">
            {/* 헤더 */}
            <div className="flex w-full items-center gap-4 px-4 py-2.5">
              <div className="flex flex-1 items-center">
                <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">이름</span>
              </div>
              <div className="flex w-[200px] items-center">
                <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">슬러그</span>
              </div>
              <div className="flex w-[200px] items-center">
                <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">생성일</span>
              </div>
              <div className="flex w-20 items-center">
                <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">앱 개수</span>
              </div>
              <div className="flex w-20 items-center">
                <span className="text-xs font-medium leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">멤버 수</span>
              </div>
              <span className="size-7 shrink-0" aria-hidden="true" />
            </div>

            {/* 바디 */}
            <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-white">
              {TENANTS.map((tenant, i) => (
                <button
                  key={tenant.slug}
                  type="button"
                  className="group relative flex h-14 w-full items-center gap-4 px-4 py-3 transition-colors hover:bg-[#fafafa]"
                >
                  <div className="flex flex-1 items-center min-w-0">
                    <p className="truncate text-left text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                      {tenant.name}
                    </p>
                  </div>
                  <div className="flex w-[200px] items-center">
                    <span className="rounded-lg bg-[#f6f6f6] px-2 py-1 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#5B3D7A]">
                      {tenant.slug}
                    </span>
                  </div>
                  <div className="flex w-[200px] items-center">
                    <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                      {tenant.createdAt}
                    </span>
                  </div>
                  <div className="flex w-20 items-center">
                    <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">
                      {tenant.apps}
                    </span>
                  </div>
                  <div className="flex w-20 items-center gap-1">
                    <Image
                      src="/icons/version-b/member-icon.svg"
                      alt=""
                      width={16}
                      height={16}
                      className="shrink-0"
                    />
                    <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#18181b]">
                      {tenant.members}
                    </span>
                  </div>
                  <span
                    className="-rotate-90 opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Image
                      src="/icons/version-b/team-arrow.svg"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </span>
                  {i < TENANTS.length - 1 && (
                    <span className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-[#e4e4e7] opacity-50" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {tenantModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/30 transition-opacity duration-250"
          style={{ opacity: tenantModalClosing ? 0 : 1 }}
          onClick={closeTenantModal}
        >
          <div
            className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
            style={{
              boxShadow:
                "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
              backdropFilter: "blur(20px)",
              animation: tenantModalClosing
                ? "modalScaleOut 0.25s ease-in forwards"
                : "modalScaleIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
            data-node-id="4824:2725"
          >
            <p className="w-full text-xl font-semibold leading-[1.3] tracking-[-0.2px] text-black">
              새 테넌트 만들기
            </p>

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="tenant-name" className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                테넌트 이름
              </label>
              <input
                id="tenant-name"
                type="text"
                value={tenantName}
                onChange={(e) => setTenantName(e.target.value)}
                placeholder="이름 입력"
                className="min-h-12 w-full rounded-full border border-[#e4e4e7] bg-white px-5 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#5B3D7A] focus:outline-none"
              />
            </div>

            <div className="flex w-full flex-col gap-2">
              <label htmlFor="tenant-slug" className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                slug
              </label>
              <input
                id="tenant-slug"
                type="text"
                value={tenantSlug}
                onChange={(e) => setTenantSlug(e.target.value)}
                placeholder="slug 입력"
                className="min-h-12 w-full rounded-full border border-[#e4e4e7] bg-white px-5 text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#18181b] placeholder:text-[#a1a1aa] focus:border-[#5B3D7A] focus:outline-none"
              />
            </div>

            <div className="flex items-start gap-2">
              <button
                type="button"
                onClick={closeTenantModal}
                className="flex h-9 items-center justify-center rounded-full bg-[#f6f6f6] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#18181b] transition-colors hover:bg-[#ececec]"
              >
                취소
              </button>
              <button
                type="button"
                disabled={!isTenantValid}
                onClick={() => {
                  if (isTenantValid) closeTenantModal();
                }}
                className="relative flex h-9 items-center justify-center overflow-hidden rounded-full bg-[#5B3D7A] px-5 text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-white transition-opacity hover:opacity-90"
              >
                만들기
                {!isTenantValid && (
                  <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

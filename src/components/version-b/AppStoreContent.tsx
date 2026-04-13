"use client";

import { useState } from "react";
import Image from "next/image";

const categories = [
  { name: "전체", count: 240 },
  { name: "백엔드", count: 38 },
  { name: "디자인", count: 24 },
  { name: "경영재무", count: 12 },
];

interface AppItem {
  name: string;
  category: string;
  users: string;
  isNew: boolean;
}

const apps: AppItem[] = [
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: false },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: true },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: true },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: false },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: true },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: false },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: false },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: true },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: false },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: false },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: true },
  { name: "앱 이름", category: "카테고리명", users: "00명 사용중", isNew: true },
];

export default function AppStoreContent() {
  const [activeCategory, setActiveCategory] = useState("전체");

  return (
    <div className="flex h-full flex-1 min-w-0 items-start overflow-hidden px-5 py-4">
      <div className="flex h-full min-w-0 flex-1 flex-col gap-10 overflow-hidden rounded-2xl border-r border-gray-100 bg-white p-8">
        {/* Header */}
        <div className="flex shrink-0 items-center gap-3">
          <div className="flex flex-1 items-center">
            <h1
              className="font-bold tracking-[-0.22px] text-black"
              style={{ fontSize: "22px", lineHeight: "1.3" }}
            >
              앱스토어
            </h1>
          </div>
          <div className="flex h-10 w-[240px] items-center gap-1.5 overflow-hidden rounded-xl px-4 py-3" style={{ backgroundColor: "#f4f4f5" }}>
            <div className="flex items-center">
              <div className="relative size-5 overflow-hidden">
                <Image src="/icons/version-b/search.svg" alt="" fill sizes="20px" />
              </div>
            </div>
            <div className="flex flex-1 items-center overflow-hidden">
              <p className="whitespace-nowrap text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-300">
                앱 찾기
              </p>
            </div>
          </div>
        </div>

        {/* 카테고리 + 정렬 + 리스트 */}
        <div className="flex min-h-0 flex-1 flex-col gap-5">
          {/* 카테고리 탭 */}
          <div
            className="flex shrink-0 items-start gap-2 rounded-2xl p-2 text-sm tracking-[-0.14px]"
            style={{ backgroundColor: "#f6f6f6" }}
          >
            {categories.map((cat) => (
              <button
                key={cat.name}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className="flex items-center gap-1 rounded-xl px-3 py-2 leading-[1.5] transition-colors"
                style={{
                  backgroundColor: activeCategory === cat.name ? "#fbb03b" : "transparent",
                  color: activeCategory === cat.name ? "white" : "rgba(24,24,27,0.48)",
                  fontWeight: activeCategory === cat.name ? 600 : 400,
                }}
              >
                <span>{cat.name}</span>
                <span
                  style={{
                    color: activeCategory === cat.name
                      ? "rgba(255,255,255,0.7)"
                      : "rgba(24,24,27,0.16)",
                    fontWeight: 400,
                  }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* 앱 수 + 정렬 */}
          <div className="flex shrink-0 items-center gap-3" data-node-id="2695:674">
            <button
              type="button"
              className="relative flex h-8 items-center justify-center gap-1 overflow-hidden rounded-xl px-3.5 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-gray-900"
              style={{ backgroundColor: "#f6f6f6" }}
            >
              인기순
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6L8 10L4 6" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-black">
              240개의 앱
            </p>
          </div>

          {/* 앱 리스트 (2컬럼) */}
          <div className="relative min-h-0 flex-1">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6" style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6" style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />
            <div className="sidebar-scroll flex h-full gap-10 overflow-y-auto">
              {/* 왼쪽 컬럼 */}
              <div className="flex flex-1 flex-col">
                {apps.slice(0, 6).map((app, i) => (
                  <div
                    key={i}
                    className="app-row flex items-center gap-5 border-b border-gray-100 px-1 py-5"
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <div className="app-icon size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                      <div className="flex h-[52px] flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          {app.isNew && (
                            <span className="new-badge-pulse flex h-5 items-center justify-center rounded-lg bg-[#f5475c] px-1.5 text-[10px] font-semibold leading-[1.4] tracking-[-0.1px] text-white">
                              NEW
                            </span>
                          )}
                          <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.18px] text-black">
                            {app.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-500">
                          <span>{app.category}</span>
                          <span className="inline-block size-1 rounded-full bg-gray-500" />
                          <span>{app.users}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-xl px-3 text-[12px] font-semibold leading-[1.3] tracking-[-0.12px] transition-colors"
                      style={{ backgroundColor: "#f6f6f6", color: "#fbb03b", height: 32 }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ececec"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f6f6f6"; }}
                    >
                      사용 신청
                    </button>
                  </div>
                ))}
              </div>

              {/* 오른쪽 컬럼 */}
              <div className="flex flex-1 flex-col">
                {apps.slice(6, 12).map((app, i) => (
                  <div
                    key={i}
                    className="app-row flex items-center gap-5 border-b border-gray-100 px-1 py-5"
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <div className="app-icon size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                      <div className="flex h-[52px] flex-col gap-2">
                        <div className="flex items-center gap-1.5">
                          {app.isNew && (
                            <span className="new-badge-pulse flex h-5 items-center justify-center rounded-lg bg-[#f5475c] px-1.5 text-[10px] font-semibold leading-[1.4] tracking-[-0.1px] text-white">
                              NEW
                            </span>
                          )}
                          <p className="text-[18px] font-semibold leading-[1.4] tracking-[-0.18px] text-black">
                            {app.name}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-500">
                          <span>{app.category}</span>
                          <span className="inline-block size-1 rounded-full bg-gray-500" />
                          <span>{app.users}</span>
                        </div>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="shrink-0 rounded-xl px-3 text-[12px] font-semibold leading-[1.3] tracking-[-0.12px] transition-colors"
                      style={{ backgroundColor: "#f6f6f6", color: "#fbb03b", height: 32 }}
                      onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ececec"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#f6f6f6"; }}
                    >
                      사용 신청
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

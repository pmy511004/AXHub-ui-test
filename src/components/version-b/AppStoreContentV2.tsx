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
  { name: "경비 정산 자동화", category: "경영재무", users: "312명 사용중", isNew: false },
  { name: "AI 문서 요약", category: "생산성", users: "24명 사용중", isNew: true },
  { name: "스마트 출퇴근", category: "인사관리", users: "18명 사용중", isNew: true },
  { name: "스마트 캘린더", category: "협업도구", users: "287명 사용중", isNew: false },
  { name: "데이터 시각화", category: "데이터분석", users: "15명 사용중", isNew: true },
  { name: "매출 대시보드", category: "데이터분석", users: "245명 사용중", isNew: false },
  { name: "사내 문서 검색", category: "생산성", users: "198명 사용중", isNew: false },
  { name: "맞춤 교육 추천", category: "교육", users: "12명 사용중", isNew: true },
  { name: "프로젝트 트래커", category: "프로젝트관리", users: "176명 사용중", isNew: false },
  { name: "업무 자동화 봇", category: "자동화", users: "9명 사용중", isNew: true },
  { name: "회의실 예약", category: "사내시설", users: "153명 사용중", isNew: false },
  { name: "OKR 관리", category: "프로젝트관리", users: "7명 사용중", isNew: true },
  { name: "피드백 분석기", category: "고객관리", users: "132명 사용중", isNew: false },
  { name: "비용 리포트", category: "경영재무", users: "5명 사용중", isNew: true },
  { name: "재고 모니터링", category: "물류관리", users: "98명 사용중", isNew: false },
  { name: "사내 위키", category: "협업도구", users: "3명 사용중", isNew: false },
  { name: "전자 결재", category: "경영재무", users: "87명 사용중", isNew: false },
  { name: "API 모니터링", category: "개발도구", users: "2명 사용중", isNew: true },
  { name: "팀 메신저", category: "커뮤니케이션", users: "76명 사용중", isNew: false },
  { name: "스마트 알림", category: "생산성", users: "1명 사용중", isNew: true },
  { name: "고객 CRM", category: "고객관리", users: "64명 사용중", isNew: false },
  { name: "워크플로우 빌더", category: "자동화", users: "42명 사용중", isNew: true },
  { name: "보안 점검 도구", category: "보안", users: "31명 사용중", isNew: false },
  { name: "디자인 리뷰", category: "디자인", users: "28명 사용중", isNew: true },
];

interface Props {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onAppClick?: (name: string, category: string) => void;
}


export default function AppStoreContentV2({ activeMenu, setActiveMenu, onAppClick }: Props) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState("인기순");

  return (
    <div className="flex h-full flex-1 min-w-0 items-start overflow-hidden pr-2 py-2">
      {/* Left sidebar */}
      <div className="flex h-full w-[200px] shrink-0 flex-col">
        {/* Header */}
        <div className="flex h-[44px] items-center overflow-hidden rounded-tl-xl border-r px-3" style={{ backgroundColor: "#f6f6f6", borderColor: "#f6f6f6" }}>
          <p className="overflow-hidden text-ellipsis whitespace-nowrap text-base font-bold leading-[1.5] tracking-[-0.16px] text-black">
            조코딩AX파트너스
          </p>
        </div>
        {/* Nav */}
        <div className="flex flex-1 min-h-0 flex-col overflow-hidden rounded-bl-xl border-r" style={{ backgroundColor: "#f6f6f6", borderColor: "#f6f6f6" }}>
          <nav className="sidebar-scroll flex w-full min-h-0 flex-1 flex-col items-stretch gap-2 overflow-y-auto px-2 py-2">
            <button type="button" onClick={() => setActiveMenu("인기 • 신규 앱")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "인기 • 신규 앱" ? "menu-active" : "hover:bg-gray-200"}`}>
              <Image src={activeMenu === "인기 • 신규 앱" ? "/icons/version-b/browse-menu-hot-apps.svg" : "/icons/version-b/browse-menu-hot-apps-inactive.svg"} alt="" width={18} height={18} />
              <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "인기 • 신규 앱" ? "font-semibold text-[#FBB03B]" : "font-normal text-gray-900"}`}>인기 • 신규 앱</span>
            </button>
            <button type="button" onClick={() => setActiveMenu("앱")} className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 ${activeMenu === "앱" ? "menu-active" : "hover:bg-gray-200"}`}>
              <Image src={activeMenu === "앱" ? "/icons/version-b/browse-menu-app-store-active.svg" : "/icons/version-b/browse-menu-app-store.svg"} alt="" width={18} height={18} />
              <span className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] ${activeMenu === "앱" ? "font-semibold text-[#FBB03B]" : "font-normal text-gray-900"}`}>앱 스토어</span>
            </button>
            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
              <Image src="/icons/version-b/browse-menu-api-store.svg" alt="" width={18} height={18} />
              <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">API 스토어</span>
            </button>
            <button type="button" className="flex w-full items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-200">
              <Image src="/icons/version-b/browse-menu-shared-data.svg" alt="" width={18} height={18} />
              <span className="whitespace-nowrap text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-900">공유 데이터</span>
            </button>
          </nav>
        </div>
      </div>

      {/* Right: Main content */}
      <div className="flex h-full min-w-0 flex-1 flex-col gap-6 overflow-hidden rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6">
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
                      ? "rgba(255,255,255,0.8)"
                      : "rgba(24,24,27,0.3)",
                    fontWeight: 400,
                  }}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          {/* 앱 수 + 정렬 */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="relative">
              <button
                type="button"
                onClick={() => setSortOpen(!sortOpen)}
                className="relative flex h-8 items-center justify-center gap-1 overflow-hidden rounded-xl px-3.5 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-gray-900"
                style={{ backgroundColor: "#f6f6f6" }}
              >
                {sortBy}
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 6L8 10L4 6" stroke="#18181B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              {sortOpen && (
                <div className="absolute left-0 top-full z-20 mt-1 flex w-full min-w-full flex-col overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(0,0,0,0.12)]">
                  {["인기순", "최신순"].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => { setSortBy(option); setSortOpen(false); }}
                      className="whitespace-nowrap px-4 py-2.5 text-left text-sm leading-[1.5] tracking-[-0.14px] transition-colors hover:bg-gray-50"
                      style={{
                        fontWeight: sortBy === option ? 600 : 400,
                        color: sortBy === option ? "#fbb03b" : "#18181b",
                      }}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <p className="text-base font-normal leading-[1.5] tracking-[-0.16px] text-black">
              240개의 앱
            </p>
          </div>

          {/* 앱 리스트 (2컬럼) */}
          <div className="relative min-h-0 flex-1">
            <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-6" style={{ background: "linear-gradient(to bottom, white 0%, transparent 100%)" }} />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-6" style={{ background: "linear-gradient(to top, white 0%, transparent 100%)" }} />
            <div className="sidebar-scroll grid h-full grid-cols-1 gap-x-8 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
              {apps.map((app, i) => (
                <div
                  key={i}
                  className="app-row flex cursor-pointer items-center gap-5 border-b border-gray-100 !rounded-none px-1 py-5"
                  onClick={() => onAppClick?.(app.name, app.category)}
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
  );
}

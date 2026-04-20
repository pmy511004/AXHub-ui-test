"use client";

import { useState } from "react";
import Image from "next/image";

type AppStatus = "사용 신청" | "열기" | "승인 대기";

const popularApps: { name: string; category: string; recommends: number; status: AppStatus }[] = [
  { name: "경비 정산 자동화", category: "경영재무", recommends: 312, status: "열기" },
  { name: "스마트 캘린더", category: "협업도구", recommends: 287, status: "열기" },
  { name: "매출 대시보드", category: "데이터분석", recommends: 245, status: "사용 신청" },
  { name: "사내 문서 검색", category: "생산성", recommends: 198, status: "열기" },
  { name: "프로젝트 트래커", category: "프로젝트관리", recommends: 176, status: "승인 대기" },
  { name: "회의실 예약", category: "사내시설", recommends: 153, status: "열기" },
  { name: "피드백 분석기", category: "고객관리", recommends: 132, status: "사용 신청" },
  { name: "전자 결재", category: "경영재무", recommends: 121, status: "열기" },
  { name: "팀 메신저", category: "커뮤니케이션", recommends: 118, status: "사용 신청" },
  { name: "재고 모니터링", category: "물류관리", recommends: 105, status: "승인 대기" },
  { name: "고객 CRM", category: "고객관리", recommends: 98, status: "열기" },
  { name: "보안 점검 도구", category: "보안", recommends: 94, status: "사용 신청" },
  { name: "워크플로우 빌더", category: "자동화", recommends: 89, status: "열기" },
  { name: "사내 위키", category: "협업도구", recommends: 85, status: "사용 신청" },
  { name: "AI 문서 요약", category: "생산성", recommends: 82, status: "승인 대기" },
  { name: "스마트 출퇴근", category: "인사관리", recommends: 79, status: "열기" },
  { name: "데이터 시각화", category: "데이터분석", recommends: 76, status: "사용 신청" },
  { name: "맞춤 교육 추천", category: "교육", recommends: 73, status: "열기" },
  { name: "업무 자동화 봇", category: "자동화", recommends: 70, status: "사용 신청" },
  { name: "OKR 관리", category: "프로젝트관리", recommends: 67, status: "승인 대기" },
  { name: "비용 리포트", category: "경영재무", recommends: 64, status: "사용 신청" },
  { name: "API 모니터링", category: "개발도구", recommends: 61, status: "열기" },
  { name: "스마트 알림", category: "생산성", recommends: 58, status: "사용 신청" },
  { name: "디자인 리뷰", category: "디자인", recommends: 55, status: "열기" },
  { name: "온보딩 가이드", category: "인사관리", recommends: 52, status: "승인 대기" },
  { name: "계약서 관리", category: "법무", recommends: 49, status: "사용 신청" },
  { name: "설문 조사 툴", category: "마케팅", recommends: 46, status: "열기" },
  { name: "이슈 트래커", category: "개발도구", recommends: 43, status: "사용 신청" },
  { name: "자산 관리", category: "총무", recommends: 40, status: "승인 대기" },
  { name: "근태 분석", category: "인사관리", recommends: 37, status: "열기" },
  { name: "미팅 노트", category: "협업도구", recommends: 34, status: "사용 신청" },
  { name: "코드 리뷰 봇", category: "개발도구", recommends: 31, status: "열기" },
  { name: "마케팅 대시보드", category: "마케팅", recommends: 28, status: "사용 신청" },
  { name: "고객 피드백 허브", category: "고객관리", recommends: 25, status: "승인 대기" },
  { name: "채용 관리", category: "인사관리", recommends: 22, status: "열기" },
  { name: "예산 플래너", category: "경영재무", recommends: 19, status: "사용 신청" },
  { name: "팀 캘린더", category: "협업도구", recommends: 16, status: "열기" },
  { name: "문서 전자서명", category: "법무", recommends: 13, status: "승인 대기" },
  { name: "성과 리뷰", category: "인사관리", recommends: 10, status: "사용 신청" },
  { name: "AI 번역기", category: "생산성", recommends: 7, status: "열기" },
];

const categories = ["전체", "공용", "인사", "업무", "데이터", "시스템"];

interface Props {
  onAppClick?: (name: string, category: string) => void;
}

export default function PopularChartContent({ onAppClick }: Props = {}) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const [isGridView, setIsGridView] = useState(true);

  return (
    <div className="flex h-full min-w-0 flex-1 items-start justify-center overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6">
      <div className="mx-auto flex w-full flex-col gap-6 min-[1281px]:max-w-[1280px]">
      {/* Header */}
      <div className="flex shrink-0 items-center justify-between">
        <h1 className="font-bold text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
          인기 차트
        </h1>
        <div className="flex h-10 w-[240px] items-center gap-1.5 overflow-hidden rounded-xl px-4 py-3" style={{ backgroundColor: "#f4f4f5" }}>
          <div className="relative size-5 shrink-0 overflow-hidden">
            <Image src="/icons/version-b/search.svg" alt="" fill sizes="20px" />
          </div>
          <p className="whitespace-nowrap text-base font-normal leading-[1.5] tracking-[-0.16px] text-gray-300">앱 찾기</p>
        </div>
      </div>

      {/* Content: category sidebar + app grid */}
      <div className="flex min-h-0 flex-1 gap-8">
        {/* Left: Category sidebar */}
        <div className="sticky top-0 flex shrink-0 self-start flex-col gap-2">
          <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-gray-500">
            카테고리
          </p>
          <div className="flex w-[140px] flex-col rounded-xl bg-[#f9f9f9] p-3">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm leading-[1.5] tracking-[-0.14px] ${
                  activeCategory === cat
                    ? "font-semibold text-[#FBB03B]"
                    : "font-normal text-gray-500 hover:bg-gray-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Right: App grid */}
        <div className="flex min-h-0 flex-1 flex-col gap-2">
          {/* Header row */}
          <div className="flex shrink-0 items-center justify-between">
            <p className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-gray-500">
              {activeCategory} 앱 순위
            </p>
            <div className="flex items-center gap-1">
              {/* Grid view button */}
              <button
                type="button"
                onClick={() => setIsGridView(true)}
                className="flex size-8 items-center justify-center rounded-lg transition-colors"
                style={{ backgroundColor: isGridView ? "#FBB03B" : "transparent" }}
                aria-label="그리드 보기"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="1" width="6" height="6" rx="1" fill={isGridView ? "white" : "#a1a1aa"} />
                  <rect x="9" y="1" width="6" height="6" rx="1" fill={isGridView ? "white" : "#a1a1aa"} />
                  <rect x="1" y="9" width="6" height="6" rx="1" fill={isGridView ? "white" : "#a1a1aa"} />
                  <rect x="9" y="9" width="6" height="6" rx="1" fill={isGridView ? "white" : "#a1a1aa"} />
                </svg>
              </button>
              {/* List view button */}
              <button
                type="button"
                onClick={() => setIsGridView(false)}
                className="flex size-8 items-center justify-center rounded-lg transition-colors"
                style={{ backgroundColor: !isGridView ? "#FBB03B" : "transparent" }}
                aria-label="리스트 보기"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="1" y="3" width="14" height="2" rx="1" fill={!isGridView ? "white" : "#a1a1aa"} />
                  <rect x="1" y="7" width="14" height="2" rx="1" fill={!isGridView ? "white" : "#a1a1aa"} />
                  <rect x="1" y="11" width="14" height="2" rx="1" fill={!isGridView ? "white" : "#a1a1aa"} />
                </svg>
              </button>
            </div>
          </div>

          {/* App cards - Grid view */}
          {isGridView ? (
          <div className="popular-chart-grid grid gap-y-6">
            {popularApps.map((app, i) => {
              const rankColor = i < 3 ? "#FBB03B" : "#a1a1aa";
              return (
                <div
                  key={i}
                  className="flex cursor-pointer items-start"
                  onClick={() => onAppClick?.(app.name, app.category)}
                >
                  {/* Rank (left, full height) */}
                  <div
                    className="flex w-6 shrink-0 justify-center pt-2 self-stretch text-center text-[18px] font-bold leading-[1.4] tracking-[-0.18px]"
                    style={{ color: rankColor }}
                  >
                    {i + 1}
                  </div>
                  {/* Icon + Info (right, vertical) */}
                  <div className="flex flex-col gap-2 p-2">
                    <div className="size-[104px] rounded-xl bg-[#e4e4e7]" />
                    <div className="flex flex-col gap-1 py-0.5">
                      <span className="truncate text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">
                        {app.name}
                      </span>
                      <p className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-gray-500">
                        {app.category}
                      </p>
                      <div className="flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FBB03B" />
                        </svg>
                        <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-black">
                          {app.recommends}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          ) : (
          /* App list - List view */
          <div className="flex flex-col">
            {popularApps.map((app, i) => {
              const rankColor = i < 3 ? "#FBB03B" : "#a1a1aa";
              return (
                <div
                  key={i}
                  className="flex cursor-pointer items-center gap-3 border-b border-gray-100 py-4"
                  onClick={() => onAppClick?.(app.name, app.category)}
                >
                  <div
                    className="flex size-6 shrink-0 items-center justify-center text-center text-[18px] font-bold leading-[1.4] tracking-[-0.18px]"
                    style={{ color: rankColor }}
                  >
                    {i + 1}
                  </div>
                  <div className="size-[60px] shrink-0 rounded-lg bg-[#e4e4e7]" />
                  <div className="flex min-w-0 flex-1 items-center gap-1">
                    <div className="flex min-w-0 flex-1 flex-col gap-1">
                      <span className="truncate text-base font-semibold leading-[1.5] tracking-[-0.16px] text-black">
                        {app.name}
                      </span>
                      <p className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-gray-500">
                        {app.category}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FBB03B" />
                      </svg>
                      <span className="text-sm font-normal leading-[1.5] tracking-[-0.14px] text-black">
                        {app.recommends}
                      </span>
                    </div>
                  </div>
                  {app.status === "열기" ? (
                    <button
                      type="button"
                      className="flex h-7 w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-xl px-3 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-white"
                      style={{ backgroundColor: "#FBB03B" }}
                    >
                      열기
                    </button>
                  ) : app.status === "승인 대기" ? (
                    <button
                      type="button"
                      className="flex h-7 w-[66px] shrink-0 items-center justify-center overflow-hidden rounded-xl px-3 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#FBB03B]"
                      style={{ backgroundColor: "#fff8e6" }}
                    >
                      승인대기
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="flex h-8 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-[#f6f6f6] px-3 text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#FBB03B]"
                    >
                      사용신청
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}

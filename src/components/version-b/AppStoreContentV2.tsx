"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";

type AppStatus = "바로 사용" | "승인 요청" | "승인 중" | "열기";

interface AppItem {
  name: string;
  category: string;
  categoryTag: string;
  recommends: number;
  isNew: boolean;
  status: AppStatus;
}

const categoryNames = ["백엔드", "디자인", "경영재무", "생산성", "인사관리", "협업도구", "데이터분석", "자동화", "고객관리", "개발도구", "마케팅", "보안"];

function generateApps(count: number): AppItem[] {
  const names = [
    "경비 정산 자동화", "스마트 캘린더", "매출 대시보드", "사내 문서 검색", "프로젝트 트래커",
    "회의실 예약", "피드백 분석기", "재고 모니터링", "전자 결재", "팀 메신저",
    "AI 문서 요약", "스마트 출퇴근", "데이터 시각화", "맞춤 교육 추천", "업무 자동화 봇",
    "OKR 관리", "비용 리포트", "사내 위키", "API 모니터링", "스마트 알림",
    "고객 CRM", "워크플로우 빌더", "보안 점검 도구", "디자인 리뷰", "온보딩 가이드",
    "계약서 관리", "설문 조사 툴", "이슈 트래커", "자산 관리", "근태 분석",
    "미팅 노트", "코드 리뷰 봇", "마케팅 대시보드", "고객 피드백 허브", "채용 관리",
    "예산 플래너", "팀 캘린더", "문서 전자서명", "성과 리뷰", "AI 번역기",
    "로그 분석기", "배포 자동화", "디자인 시스템", "브랜드 가이드", "세금 계산기",
    "급여 관리", "화상 회의", "BI 리포트", "봇 빌더", "티켓 관리",
    "깃 관리 도구", "SEO 분석기", "방화벽 설정", "프로토타입 뷰어", "예산 추적기",
    "출장비 관리", "팀 보드", "데이터 파이프라인", "일정 자동화", "NPS 분석",
    "CI/CD 모니터", "광고 관리", "취약점 스캐너", "UI 테스트 도구", "매출 예측",
    "연차 관리", "프로젝트 보드", "ETL 도구", "챗봇 빌더", "VOC 분석",
    "서버 모니터링", "이메일 캠페인", "암호화 도구", "와이어프레임 도구", "손익 계산기",
    "인사 평가", "스프린트 플래너", "실시간 대시보드", "RPA 도구", "설문 분석",
    "API 게이트웨이", "SNS 관리", "접근 제어", "컬러 팔레트", "법인카드 관리",
    "복리후생 관리", "타임라인 뷰", "데이터 크롤러", "알림 봇", "리뷰 관리",
    "부하 테스트 도구", "리타겟팅 도구", "백업 관리", "아이콘 라이브러리", "세무 신고 도구",
    "조직도 관리",
  ];
  const statuses: AppStatus[] = ["바로 사용", "승인 요청", "승인 중", "열기"];
  const result: AppItem[] = [];
  for (let i = 0; i < count; i++) {
    const cat = categoryNames[i % categoryNames.length];
    let tag = "백엔드";
    if (["디자인", "마케팅"].includes(cat)) tag = "디자인";
    else if (["경영재무", "인사관리"].includes(cat)) tag = "경영재무";
    else if (["백엔드", "개발도구", "보안", "자동화"].includes(cat)) tag = "백엔드";
    else tag = "백엔드";
    result.push({
      name: names[i % names.length] + (i >= names.length ? ` ${Math.floor(i / names.length) + 1}` : ""),
      category: cat,
      categoryTag: tag,
      recommends: Math.floor(Math.random() * 400) + 10,
      isNew: i % 5 === 2 || i % 7 === 3,
      status: statuses[i % 4],
    });
  }
  return result;
}

const allApps = generateApps(96);

const categories = [
  { name: "전체", count: allApps.length },
  { name: "백엔드", count: allApps.filter((a) => a.categoryTag === "백엔드").length },
  { name: "디자인", count: allApps.filter((a) => a.categoryTag === "디자인").length },
  { name: "경영재무", count: allApps.filter((a) => a.categoryTag === "경영재무").length },
];

interface Props {
  activeMenu: string;
  setActiveMenu: (menu: string) => void;
  onAppClick?: (name: string, category: string) => void;
}

export default function AppStoreContentV2({ onAppClick }: Props) {
  const [activeCategory, setActiveCategory] = useState("전체");
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const handleScroll = useCallback(() => {
    if (scrollRef.current) {
      setShowScrollTop(scrollRef.current.scrollTop > 200);
    }
  }, []);

  const scrollToTop = useCallback(() => {
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const filteredApps = activeCategory === "전체"
    ? allApps
    : allApps.filter((a) => a.categoryTag === activeCategory);

  return (
    <div ref={scrollRef} onScroll={handleScroll} className="flex h-full min-w-0 flex-1 flex-col overflow-y-auto rounded-br-2xl rounded-tr-2xl border-r border-gray-100 bg-white p-6">
      <div className="mx-auto flex w-full flex-col gap-6 min-[1281px]:max-w-[1280px]">
        {/* Header */}
        <h1 className="font-bold tracking-[-0.22px] text-black" style={{ fontSize: "22px", lineHeight: "1.3" }}>
          앱스토어
        </h1>

        {/* Search + Category */}
        <div className="flex flex-col items-center gap-2.5 px-[100px]">
          {/* Search input */}
          <div className="flex w-full items-center gap-1.5 overflow-hidden rounded-2xl border border-[#e4e4e7] bg-white px-4 py-4">
            <div className="relative size-5 shrink-0 overflow-hidden">
              <Image src="/icons/version-b/search.svg" alt="" fill sizes="20px" />
            </div>
            <p className="whitespace-nowrap text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#d4d4d8]">
              앱, 개발자를 검색하세요
            </p>
          </div>

          {/* Category tabs */}
          <div className="no-scrollbar flex w-full cursor-grab items-start gap-2 overflow-x-auto text-sm tracking-[-0.14px]">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.name;
              return (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(cat.name)}
                  className="flex items-center gap-1 rounded-xl px-3 py-2 leading-[1.5] transition-colors"
                  style={isActive ? {
                    backgroundColor: "#fbb03b",
                    color: "white",
                    fontWeight: 600,
                  } : {
                    backgroundColor: "transparent",
                    border: "1px solid #e4e4e7",
                    color: "rgba(24,24,27,0.9)",
                    fontWeight: 400,
                  }}
                >
                  <span>{cat.name}</span>
                  <span style={{
                    color: isActive ? "rgba(255,255,255,0.9)" : "rgba(24,24,27,0.48)",
                    fontWeight: 400,
                  }}>
                    {isActive ? filteredApps.length : cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* App list - 2 columns */}
        <div className="flex flex-wrap gap-x-10">
          {filteredApps.map((app, i) => (
            <div
              key={i}
              className="flex w-[calc(50%-20px)] cursor-pointer items-center gap-5 border-b border-[#f6f6f6] py-6"
              onClick={() => onAppClick?.(app.name, app.category)}
            >
              {/* Left: icon + info */}
              <div className="flex flex-1 items-center gap-3 min-w-0">
                <div className="size-16 shrink-0 rounded-xl bg-[#e4e4e7]" />
                <div className="flex min-w-0 flex-1 flex-col gap-1 py-0.5">
                  {/* App name + NEW badge */}
                  <div className="flex items-center gap-2">
                    {app.isNew && (
                      <span className="flex h-5 shrink-0 items-center justify-center rounded-lg bg-[#f5475c] px-1.5 text-[10px] font-semibold leading-[1.4] tracking-[-0.1px] text-white">
                        NEW
                      </span>
                    )}
                    <span className="truncate text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-black">
                      {app.name}
                    </span>
                  </div>
                  {/* Category */}
                  <p className="truncate text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#71717a]">
                    {app.category}
                  </p>
                  {/* Star + recommends */}
                  <div className="flex items-center gap-1">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M6 1L7.545 4.13L11 4.635L8.5 7.07L9.09 10.51L6 8.885L2.91 10.51L3.5 7.07L1 4.635L4.455 4.13L6 1Z" fill="#FBB03B" />
                    </svg>
                    <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-black">
                      {app.recommends}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right: button + status */}
              <div className="flex shrink-0 flex-col items-center gap-1">
                {app.status === "열기" ? (
                  <button
                    type="button"
                    className="flex h-7 w-[66px] items-center justify-center rounded-xl text-sm font-semibold leading-[1.3] tracking-[-0.12px] text-white transition-opacity hover:opacity-85"
                    style={{ backgroundColor: "#FBB03B" }}
                    onClick={(e) => e.stopPropagation()}
                  >
                    열기
                  </button>
                ) : app.status === "승인 중" ? (
                  <>
                    <button
                      type="button"
                      className="flex h-7 w-[66px] items-center justify-center rounded-xl text-sm font-semibold leading-[1.3] tracking-[-0.12px] text-[#6D319D] bg-[#F4ECFA] hover:bg-[#EEE3F7] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      대기
                    </button>
                    <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">
                      승인 중
                    </span>
                  </>
                ) : (
                  <>
                    <button
                      type="button"
                      className="flex h-7 w-[66px] items-center justify-center rounded-xl text-sm font-semibold leading-[1.3] tracking-[-0.12px] text-[#FBB03B] bg-[rgba(251,176,59,0.1)] hover:bg-[rgba(251,176,59,0.2)] transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      받기
                    </button>
                    <span className="text-xs font-normal leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">
                      {app.status}
                    </span>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Scroll to top - sticky bottom center */}
      <div
        className="sticky bottom-6 z-10 mt-4 flex shrink-0 justify-center transition-opacity duration-300"
        style={{ opacity: showScrollTop ? 1 : 0, pointerEvents: showScrollTop ? "auto" : "none" }}
      >
        <button
          type="button"
          onClick={scrollToTop}
          className="flex size-10 items-center justify-center rounded-full border border-[#e4e4e7] bg-white shadow-sm transition-colors hover:bg-gray-50"
          aria-label="맨 위로"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 15V5M10 5L5 10M10 5L15 10" stroke="#18181b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  );
}

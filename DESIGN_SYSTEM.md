# AXHub UI 디자인 시스템 & 프론트엔드 설계 가이드

## 1. 프로젝트 구조

```
src/
├── app/
│   ├── globals.css          # 디자인 토큰, 애니메이션, 라이트/다크 변형, 공통 스타일
│   ├── layout.tsx           # 루트 레이아웃
│   ├── page.tsx             # / → HomePageB
│   ├── browse/page.tsx      # /browse → BrowsePageB / DiscoveryPageB
│   ├── make/page.tsx        # /make → MakePageB
│   ├── admin/page.tsx       # /admin → AdminPageB
│   └── admin-console/page.tsx # /admin-console → AdminConsolePageB
├── hooks/
│   └── useDarkMode.ts       # 다크모드 토글 훅 (localStorage + storage 동기화)
├── components/version-b/
│   ├── TeamColumn.tsx       # 좌측 팀 컬럼 (확장/축소)
│   ├── PageSidebar.tsx      # 페이지별 서브 사이드바
│   ├── NotificationButton.tsx # 알림 벨/팝오버
│   ├── HomePageB.tsx        # 홈 (최초접속/사용중 토글, 앱 만들기 모달)
│   ├── DiscoveryPageB.tsx   # 둘러보기 (배너/추천/검색)
│   ├── MakePageB.tsx        # 만들기 페이지
│   ├── AdminPageB.tsx       # 관리하기 페이지
│   ├── AdminConsolePageB.tsx # 관리 콘솔 (상단 수평 탭)
│   ├── AppDetailView.tsx    # 앱 상세 (탭, 모달, 가이드)
│   ├── AppStoreContentV2.tsx      # 앱스토어 콘텐츠
│   ├── HotNewAppsContentV2.tsx    # 인기·신규 앱 콘텐츠
│   ├── PopularChartContent.tsx    # 인기 차트
│   └── NewUpdateChartContent.tsx  # 신규·업데이트 차트
public/icons/version-b/       # SVG/PNG 아이콘 에셋 (활성/비활성 페어 + light/dark 변형 포함)
```

---

## 2. 디자인 토큰

### 2.1 컬러 시스템

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-primary-50` | `#f4ecfa` | primary 배경 연한 |
| `--color-primary-500` | `#6d319d` | 팀 아이콘 고정색 |
| `--page-primary` | 페이지별 동적 | 각 페이지의 활성 메뉴 인디케이터 색상 |
| `--color-gray-50` | `#f9f9f9` | 카드 배경 |
| `--color-gray-100` | `#f6f6f6` | 카드 보더, 테이블 헤더 배경 |
| `--color-gray-200` | `#e4e4e7` | 구분선, 테이블 보더 |
| `--color-gray-300` | `#d4d4d8` | placeholder 텍스트 |
| `--color-gray-500` | `#71717a` | 보조 텍스트, 카테고리명 |
| `--color-gray-900` | `#18181b` | 본문 텍스트 |

#### 페이지별 Primary 컬러

페이지 루트 컨테이너의 인라인 스타일로 `--page-primary` CSS 변수를 주입합니다. 라이트/다크 모드 각각 두 값을 둡니다.

| 페이지 | 라이트 `--page-primary` | 다크 `--page-primary` | 사이드바 캔버스 (light → dark) | 용도 |
|--------|--------------------------|------------------------|--------------------------------|------|
| 홈 (`/`) | `#5B3D7A` | `#6E4A94` | `#130321` → `#0C0A12` | 활성 메뉴 텍스트, 인디케이터 바, 모달 CTA |
| 만들기 (`/make`) | `#B86397` | (다크 변형 적용) | `#130321` → `#0C0A12` | 활성 메뉴, CTA |
| 둘러보기 (`/browse`) | `#B88539` | (다크 변형 적용) | `#130321` → `#0C0A12` | 활성 메뉴, 사용신청 버튼 |
| 관리하기 (`/admin`) | `#4A78B8` | (다크 변형 적용) | `#130321` → `#0C0A12` | 활성 메뉴, 인디케이터 바 |

> 다크 모드에서 텍스트의 보라 `#5B3D7A`는 한 단계 밝은 `#9866CC`로 자동 전환됩니다(§11 참고). 그 외 페이지 primary는 동일한 hex로 유지하되, 배경 표면이 어두워지면 시각적으로 더 강조됩니다.

#### 순위 컬러 (인기앱)

| 순위 | 색상 | 비고 |
|------|------|------|
| 1위 | `#e09a34` | 골드 (진) |
| 2위 | `#fbbb45` | 골드 (중) |
| 3위 | `#fddc8a` | 골드 (연) |
| 4위~ | `#a1a1aa` | 그레이 |

#### 기능 컬러

| 용도 | 색상 |
|------|------|
| NEW 뱃지 | `#f5475c` |
| 삭제/위험 텍스트 | `#f5475c` |
| 순위 상승 | `#22c55e` |
| 순위 하락 | `#ef4444` |
| 링크 텍스트 | `#1571F3` |
| 필수 입력 표시 (`*`) | `#ef1026` |
| 선택된 카드 배경 | `#fdf2f8` |
| 사용신청 버튼 배경 | `#fff8e6` |
| 사용신청 버튼 텍스트 | `#fbb03b` |
| 사용신청 버튼 hover | `#fdefc5` |

### 2.2 타이포그래피

- 기본 폰트: `Pretendard Variable`
- fallback: `-apple-system, BlinkMacSystemFont, system-ui, sans-serif`

| 스타일 | 크기 | 굵기 | line-height | tracking |
|--------|------|------|-------------|----------|
| 페이지 제목 | 22px | Bold (700) | 1.3 | -0.22px |
| 모달 제목 | 20px | SemiBold (600) | 1.3 | -0.2px |
| 섹션 제목 | 20px | Medium (500) | 1.3 | -0.2px |
| 배너 제목 | 28px | Bold (700) | 1.35 | — |
| 배너 부제 | 18px | Regular (400) | 1.4 | -0.18px |
| 안내 카드 제목 | 18px | SemiBold (600) | 1.4 | -0.18px |
| 사이드바 헤더 | 18px | SemiBold (600) | 1.4 | -0.18px |
| 사이드바 설명 | 14px | Regular (400) | 1.5 | -0.14px |
| 본문 텍스트 | 16px | Regular (400) | 1.5 | -0.16px |
| 본문 굵게 | 16px | SemiBold (600) | 1.5 | -0.16px |
| 메뉴 항목 (활성) | 14px | SemiBold (600) | 1.5 | -0.14px |
| 메뉴 항목 (비활성) | 14px | Regular (400) | 1.5 | -0.14px |
| 버튼 텍스트 | 14px | SemiBold (600) | 1.5 | -0.14px |
| 앱 이름 | 18px | SemiBold (600) | 1.4 | -0.18px |
| 카테고리/사용자 | 14px | Regular (400) | 1.5 | -0.14px |
| 순위 번호 | 32px | Bold (700) | 1.2 | — |
| 순위 변동 | 10px | SemiBold (600) | — | — |
| NEW 뱃지 | 10px | SemiBold (600) | 1.4 | -0.1px |
| 네비 라벨 (활성) | 12px | SemiBold (600) | 1.3 | -0.12px |
| 네비 라벨 (비활성) | 12px | Regular (400) | 1.3 | -0.12px |

---

## 3. 레이아웃 규칙

### 3.1 전체 구조

```
┌──────────┬──────────┬──────────────┬──────────────────────┐
│ TeamCol  │ GlobalNav│  SubSidebar  │     Main Content     │
│ (76px)   │ (76px)   │  (200px)     │     (flex-1)         │
│ 확장시    │          │              │                      │
└──────────┴──────────┴──────────────┴──────────────────────┘
```

- **TeamColumn**: 확장 시 76px, 축소 시 0px (CSS transition)
- **Global Nav**: 고정 76px, 상단 팀 아이콘 + 3개 네비 + 하단 유틸리티
- **Sub Sidebar**: 고정 200px, `sidebar-enter` 애니메이션
- **Main Content**: `flex-1`, `min-w-0`

### 3.2 팀 아이콘

- 색상: 항상 `#6d319d` 고정 (모든 페이지 동일)
- 축소 상태: Global Nav 상단에 표시
- 확장 상태: TeamColumn에 팀 목록 표시

### 3.3 사이드바 메뉴

- 활성 메뉴: `.menu-active` 클래스 → 좌측 3px 인디케이터 바 (`--page-primary` 색상)
- 아이콘 색상 제어: `mask-image` + `currentColor` 방식
  - 활성: `--page-primary` 색상 (예: `#FBB03B`)
  - 비활성: `rgba(24,24,27,0.16)`
- 스크롤: `.sidebar-scroll` 클래스, 호버 시에만 4px 스크롤바 표시
- 하단 그라데이션 섀도우: `linear-gradient(to top, white, transparent)` 39px

---

## 4. 컴포넌트 패턴

### 4.1 버튼

| 종류 | 스타일 | 호버 |
|------|--------|------|
| Primary | `bg-[#E765BE] text-white rounded-lg` | `hover:opacity-90`, `transition-opacity` |
| Secondary | `bg-[#f6f6f6] text-[#3f3f46] rounded-lg` | `hover:bg-[#ececec]`, `transition-colors` |
| Ghost (아웃라인) | `border border-[#d4d4d8] text-[#71717a] rounded-lg` | `hover:bg-gray-50`, `transition-colors` |
| Destructive | `bg-[#f6f6f6] text-[#f5475c] rounded-lg` | `hover:bg-[#ececec]`, `transition-colors` |
| Link | `text-[#1571F3] font-semibold` | `hover:underline`, `underline-offset-2` |

#### Pill 버튼 (rounded-full)

헤더/모달 액션에 사용하는 둥근 캡슐 버튼. 높이로 강조도를 구분합니다.

| 강조도 | 크기 | 스타일 |
|--------|------|--------|
| 큰 CTA (헤더 인사말 옆) | `h-12 px-6 py-3 text-base` | `rounded-full bg-[#18181b] text-white` (채움) 또는 `border border-[#e4e4e7] bg-white text-[#18181b]` (아웃라인) |
| 작은 CTA (섹션 헤더 옆) | `h-9 px-5 py-3 text-sm` | `rounded-full bg-[#18181b] text-white` |
| 모달 액션 | `h-9 px-5 text-sm` | `취소` = `bg-[#f6f6f6] text-[#18181b]` / `만들기` = `bg-[#5B3D7A] text-white` |
| 토글 칩 (예: 최초접속/사용 중) | `h-9 px-4 text-sm` | 활성 `bg-[#5B3D7A] text-white`, 비활성 `text-[#71717a] hover:text-[#18181b]` |

#### 상태 뱃지

`내가 개발한 앱` 리스트에서 운영 상태를 표시하는 작은 캡슐:

| 상태 | 배경 | 텍스트 |
|------|------|--------|
| 운영중 | `#e9faf1` | `#1fa24e` |
| 개발중 | `#fffbe1` | `#f6c205` |

```tsx
<span className="rounded-full px-3 py-2 text-xs font-semibold tracking-[-0.12px]"
      style={{ backgroundColor: "#e9faf1", color: "#1fa24e" }}>
  운영중
</span>
```

#### 비활성 버튼 패턴

비활성 상태의 primary 버튼은 **`bg-white/70` 오버레이** 방식으로 통일 (다크 모드에서는 자동으로 `rgba(24,24,27,0.48)` + 10% white 보더로 변환, §11 참고):

```tsx
<button className="relative overflow-hidden bg-[#5B3D7A] text-white ...">
  버튼 텍스트
  {isDisabled && <span className="pointer-events-none absolute inset-0 rounded-full bg-white/70" />}
</button>
```

### 4.2 모달

모든 모달은 동일한 구조를 따름:

```tsx
<div className="fixed inset-0 z-30 flex items-center justify-center bg-black/20"
     onClick={onClose}>
  <div
    className="flex w-[520px] flex-col items-end gap-6 rounded-2xl bg-white p-6"
    style={{
      boxShadow: "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
      backdropFilter: "blur(20px)",
      animation: "modalScaleIn 0.3s ease-out"
    }}
    onClick={(e) => e.stopPropagation()}
  >
    {/* 모달 내용 */}
  </div>
</div>
```

#### 확인 모달 (삭제 등)

- 제목: `text-xl font-semibold` (20px)
- 설명: `text-base font-normal text-[#71717a]` (16px)
- 버튼: 닫기 (Secondary) + 확인 (Primary)

#### 입력 모달 (앱 만들기 등)

- 너비 `w-[520px]`, 패딩 `p-6`, gap 24px (`gap-6`), 우측 정렬 (`items-end`)
- 제목: `text-xl font-semibold` (20px)
- 필드 라벨: `text-sm font-semibold text-[#71717a]` (14px SemiBold)
- 인풋: `min-h-12 rounded-full border border-[#e4e4e7] px-4 text-base placeholder:text-[#a1a1aa] focus:border-[#5B3D7A]`
- 드롭다운: 동일한 캡슐 모양, 오른쪽에 chevron(`rotate-180` 토글), 리스트는 `absolute top-[calc(100%+4px)] rounded-2xl border border-[#e4e4e7] shadow-lg max-h-[200px]`
- 액션 (우측 하단): 취소(`bg-[#f6f6f6]`) + 만들기(`bg-[#5B3D7A]`, 비활성 시 `bg-white/70` 오버레이)

#### 닫힘 애니메이션 패턴

상태 두 개로 enter/exit를 제어:

```tsx
const [open, setOpen] = useState(false);
const [closing, setClosing] = useState(false);
const close = () => {
  setClosing(true);
  setTimeout(() => { setOpen(false); setClosing(false); }, 250);
};

<div style={{
  opacity: closing ? 0 : 1,
  animation: closing ? "modalScaleOut 0.25s ease-in forwards" : "modalScaleIn 0.3s ease-out",
}} />
```

### 4.3 탭 네비게이션

```tsx
<div className="flex items-center border-b border-[rgba(82,82,91,0.08)]">
  {tabs.map((tab) => (
    <button className={`px-5 py-2 text-base tracking-[-0.16px] ${
      isActive
        ? "border-b-[2.5px] border-[#E765BE] font-semibold text-black"
        : "font-normal text-[#a1a1aa]"
    }`}>
      {tab}
    </button>
  ))}
</div>
```

AppDetailView 탭 목록: 앱, Git 연동, 배포, 운영, 테이블, 환경변수, 데이터 접근, 멤버, 설정

### 4.4 테이블

```tsx
{/* 헤더 */}
<div className="flex bg-[#f6f6f6]">
  <div className="flex items-center border-[0.5px] border-[#e4e4e7] px-4 py-3">
    <span className="text-base font-medium text-[#71717a]">컬럼명</span>
  </div>
</div>
{/* 바디 */}
<div className="flex bg-white">
  <div className="flex h-[60px] items-center border-[0.5px] border-[#e4e4e7] px-4 py-3">
    <span className="text-base font-normal text-[#18181b]">값</span>
  </div>
</div>
```

### 4.5 폼 입력

- Input: `min-h-[48px] rounded-xl border border-[#e4e4e7] bg-white px-4 focus:border-[#E765BE] focus:outline-none`
- 선택 카드: 미선택 `border-[#e4e4e7] bg-white hover:border-[#d4d4d8]` / 선택됨 `border-[#E765BE] bg-[#fdf2f8]`

### 4.6 검색 드롭다운

드롭다운 트리거가 열린 상태에서 검색 input으로 전환되는 패턴:

- 닫힌 상태: 선택된 값 또는 placeholder 텍스트 표시
- 열린 상태: input으로 전환, 자동 포커스, 실시간 필터링
- 아이콘: chevron `rotate-180` 토글
- 리스트: `absolute top-[calc(100%+4px)] rounded-xl border shadow-lg max-h-[200px] overflow-y-auto`

### 4.7 안내 카드

```tsx
<div className="flex flex-col gap-2 overflow-hidden rounded-xl bg-[#f4f4f5] p-5">
  <p className="text-lg font-semibold text-[#3f3f46]">제목</p>
  <p className="text-base text-[#71717a]">설명</p>
</div>
```

### 4.8 가이드 스텝바

- 트랙: `h-1.5 rounded-full bg-[#e4e4e7]`
- 프로그레스: `bg-[#E765BE]` + shimmer 오버레이 애니메이션
- 스텝 뱃지: `size-6 rounded-full bg-[#E765BE] text-white` (완료/활성)
- 비활성 뱃지: `bg-[#E765BE]` + `absolute inset-0 bg-white/70` 오버레이
- 호버: `hover:scale-110` (버튼 전체), `group-hover:bg-[#d454a8]` (뱃지)

---

## 5. 애니메이션 & 인터랙션

### 5.1 전역 트랜지션

| 대상 | 속성 | duration | easing |
|------|------|----------|--------|
| 버튼/링크 | background, opacity, color, box-shadow, transform | 0.2s | ease |
| aside | width | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) |
| 네비 아이콘 hover | transform (scale 1.05) | 0.2s | ease |
| 콘텐츠 카드 hover | box-shadow, transform (translateY -1px) | 0.25s | ease |

### 5.2 키프레임 애니메이션

| 이름 | 효과 | duration | 용도 |
|------|------|----------|------|
| `modalScaleIn` | opacity 0→1, scale 0.9→1 | 0.3s ease-out | 모달 열림 |
| `modalScaleOut` | opacity 1→0, scale 1→0.9 | 0.25s ease-in | 모달 닫힘 |
| `guideShimmer` | translateX -100%→100% | 2s ease-in-out infinite | 가이드바 빛 흐름 |
| `slideLeft` | opacity 0→1, translateX 40px→0 | 0.35s | 가이드 스텝 전환 |
| `slideRight` | opacity 0→1, translateX -40px→0 | 0.35s | 가이드 스텝 전환 |
| `fadeSlideIn` | opacity 0→1, translateY 12px→0 | — | 콘텐츠 진입 |
| `pageFadeIn` | opacity 0→1, translateY 6px→0 | 0.35s | 페이지 진입 |
| `slideInLeft` | opacity 0→1, translateX -12px→0 | 0.3s | 팀 컬럼 진입 |
| `sidebarSlideIn` | opacity 0→1, translateY 8px→0 | 0.3s | 서브 사이드바 진입 |
| `rankFadeIn` | opacity 0→1, scale 0.8→1, translateY 12px→0 | 0.4s | 순위 staggered 진입 |
| `badgePulse` | box-shadow 0→6px 확산 | 2s infinite | NEW 뱃지 펄스 |
| `starSquishBounce` | scale 1→0.4→1.3→0.95→1 | 0.7s | 별점 애니메이션 |
| `countUp` / `countDown` | translateY ±100%→0, opacity 0→1 | — | 카운터 전환 |

### 5.3 마이크로 인터랙션

#### 앱 리스트 행 호버 (`.app-row`)
- 앱 아이콘(`.app-icon`): `scale(1.08)`, `transition: transform 0.2s ease`

#### 순위 진입 애니메이션
- `.rank-enter` 클래스, staggered delay: `animationDelay: ${index * 80}ms`
- 아래에서 위로 + scale-up 효과

#### 사용신청 버튼 hover
- 배경: `#fff8e6` → `#fdefc5` (onMouseEnter/Leave로 인라인 제어)
- `transition-colors` 클래스로 부드러운 전환

#### NEW 뱃지 펄스
- `box-shadow: 0 0 0 0 rgba(245,71,92,0.5)` → `0 0 0 6px rgba(245,71,92,0)`

#### 앱 미리보기 툴팁
- `position: fixed` (스크롤 컨테이너 밖에서도 표시)
- 호버 후 **0.3초 대기** → **0.3초 디졸브** 페이드인
- 행 간 이동 시: 이전 툴팁이 visible이면 딜레이 없이 즉시 교체
- 마우스 벗어남 시: 페이드아웃 후 300ms 뒤 제거
- 스타일: `rgba(24,24,27,0.6)` 배경, 12px Medium, `line-height 1.3`, `rounded-lg`

### 5.4 배너 캐러셀

- **방식**: 슬라이드 (translateX), 항상 좌→우 방향 통일
- **자동 전환**: 10초 간격
- **구조**: 3장 (배너1, 배너2, 배너1 복제) → 마지막 도달 시 트랜지션 없이 리셋
- **전환 속도**: `duration-500 ease-in-out`
- **Dot indicator**: 하단 중앙, 활성 dot 20px 흰색, 비활성 6px `rgba(255,255,255,0.4)`
- **클리핑**: `overflowX: clip`, `overflowY: visible` (일러스트 상단 삐져나옴 허용)
- **패럴랙스**: 콘텐츠 스크롤 시 배너가 `scrollTop * 0.3` 비율로 따라감

---

## 6. 스크롤 처리

### 6.1 사이드바 스크롤 (`.sidebar-scroll`)
- `scrollbar-width: thin`
- 트랙: 투명
- 썸: 호버 시에만 `rgba(0,0,0,0.2)`, 4px 너비
- webkit: `::-webkit-scrollbar-thumb` 호버 시에만 표시

### 6.2 리스트 영역 Scroll Shadow
- 상단: `linear-gradient(to bottom, white 0%, transparent 100%)`, 24px 높이
- 하단: `linear-gradient(to top, white 0%, transparent 100%)`, 24px 높이
- `pointer-events-none`, `z-index: 10`

### 6.3 구분선 그라데이션 (인기앱 ↔ 신규앱)
```css
linear-gradient(to bottom, transparent 0%, #e4e4e7 15%, #e4e4e7 85%, transparent 100%)
```

---

## 7. 아이콘 관리

### 7.1 메뉴 아이콘 색상 제어

SVG 아이콘을 `<Image>`가 아닌 CSS `mask-image`로 렌더링하여 색상 동적 제어:

```tsx
<span
  className="menu-icon"
  style={{
    maskImage: "url(/icons/version-b/menu-my-apps.svg)",
    WebkitMaskImage: "url(/icons/version-b/menu-my-apps.svg)",
    color: isActive ? "#FBB03B" : "rgba(24,24,27,0.16)",
  }}
/>
```

`.menu-icon` CSS:
```css
.menu-icon {
  display: inline-block;
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  background-color: currentColor;
  mask-size: contain;
  mask-repeat: no-repeat;
  mask-position: center;
}
```

> **주의**: SVG 파일에서 `fill-opacity`를 제거해야 mask 투명도가 CSS `color`로만 제어됩니다.

### 7.2 네비게이션 아이콘

- 활성/비활성 상태별 별도 SVG 파일 사용
- 예: `nav-make.svg` (활성), `nav-make-inactive.svg` (비활성)
- 크기: 44x44px (`size-11`)

---

## 8. 컴포넌트 설계 규칙

### 8.1 페이지 컴포넌트 패턴

```tsx
export default function [Page]PageB() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <div
      className="flex h-screen w-full items-start overflow-hidden"
      style={{ backgroundColor: "#f4f4f5", "--page-primary": "[컬러]" }}
    >
      <TeamColumn expanded={sidebarExpanded} />
      {/* Global Nav (76px) */}
      {/* Sub Sidebar (200px) */}
      {/* Main Content (flex-1) */}
    </div>
  );
}
```

### 8.2 팀 아이콘 규칙

- `TeamColumn`에 `color` prop을 전달하지 않으면 기본값 `#6d319d` 사용
- **모든 페이지에서 동일한 색상** (`#6d319d`)

### 8.3 피그마 노드 추적

- 모든 주요 요소에 `data-node-id` 속성으로 피그마 노드 ID 기록
- 디자인 변경 시 추적 용이

---

## 9. 접근성

- 모든 버튼에 `type="button"` 명시
- 아이콘 버튼에 `aria-label` 필수
- 이미지 아이콘에 `alt=""` (장식용)
- 토글 버튼에 상태별 aria-label 변경 (예: "사이드바 접기" / "사이드바 펼치기")

---

## 10. 체크리스트 (새 페이지 추가 시)

- [ ] `--page-primary` CSS 변수 설정 (라이트/다크 모두)
- [ ] `useDarkMode` 훅을 사용해 페이지 루트 컨테이너에 `dark-mode` 클래스 토글
- [ ] 루트 인라인 스타일에 라이트 `#130321` / 다크 `#0C0A12` 배경 분기
- [ ] `TeamColumn` color prop 미전달 (기본값 `#6d319d` 사용)
- [ ] 활성 메뉴에 `.menu-active` 클래스 적용
- [ ] 메뉴 아이콘에 `mask-image` 방식 사용 (활성/비활성 색상)
- [ ] 사이드바에 `.sidebar-enter` 클래스 적용
- [ ] 스크롤 영역에 `.sidebar-scroll` 클래스 적용
- [ ] 하단 scroll shadow 그라데이션 추가
- [ ] 네비 아이콘 활성/비활성 SVG 파일 준비
- [ ] `data-node-id` 속성으로 피그마 노드 매핑
- [ ] 접근성: aria-label, 시맨틱 버튼 확인
- [ ] 다크모드: §11의 매핑 표에 포함된 토큰만 사용 (`bg-white`, `bg-[#f6f6f6]`, `text-[#18181b]`, `border-[#e4e4e7]` 등 기본 토큰은 자동 변환)

---

## 11. 라이트/다크 모드

라이트가 기본이고, 다크는 `html.dark-mode` (그리고 페이지 루트의 `.dark-mode` 클래스)에 매핑된 CSS 셀렉터로 색을 덮어쓰는 구조입니다. 모든 다크 규칙은 [globals.css](src/app/globals.css#L410-L787) 하단에 모여 있습니다.

### 11.1 토글 메커니즘

- 훅: [`useDarkMode`](src/hooks/useDarkMode.ts) — `localStorage["axhub-dark-mode"]`에 `"true"/"false"` 저장, `storage` 이벤트로 탭 간 자동 동기화
- 적용: 훅이 `<html>`에 `.dark-mode` 클래스를 토글. 각 페이지 컴포넌트도 자체 루트 div에 `${darkMode ? " dark-mode" : ""}`를 붙여 CSS 셀렉터 캐스케이드를 보장
- 토글 버튼: Global Nav 하단, 아이콘은 `nav-sun.svg`(다크 ON) / `nav-moon.svg`(라이트 ON)
- 라벨 스왑: aria-label도 `"라이트모드로 전환" / "다크모드로 전환"`으로 분기

### 11.2 페이지 루트 컨테이너

모든 페이지의 최외곽 컨테이너는 동일한 인라인 스타일 패턴을 사용합니다.

```tsx
const [darkMode, setDarkMode] = useDarkMode();
<div
  className={`flex h-screen w-full items-start overflow-hidden${darkMode ? " dark-mode" : ""}`}
  style={{
    backgroundColor: darkMode ? "#0C0A12" : "#130321",
    "--page-primary": darkMode ? "#6E4A94" : "#5B3D7A",
  } as React.CSSProperties}
/>
```

### 11.3 다크 팔레트 — 표면(surface)

| 역할 | 라이트 | 다크 | 비고 |
|------|--------|------|------|
| 사이드바 캔버스 (루트 인라인) | `#130321` | `#0C0A12` | dark purple → near-black |
| 메인 콘텐츠 표면 (`.bg-white`) | `#ffffff` | `#16151a` | 자동 변환 |
| Raised / 카드 (`bg-[#f6f6f6]`, `bg-[#f4f4f5]`, `bg-[#f9f9f9]`, `bg-gray-50/100`) | 회색 50~100 | `#1c1b21` | 자동 변환 |
| 모달 / 팝오버 (`rounded-xl/-2xl` + `bg-white`) | `#ffffff` | `#16151a` + `1px rgba(255,255,255,0.1)` 윤곽 | 자동 변환 |
| Hover 표면 (`hover:bg-[#f4f4f5]`, `hover:bg-[#f9f9f9]`, `hover:bg-[#ececec]`, `hover:bg-gray-50`) | 회색 50~100 | `#2a2932` | 자동 변환 |
| 모달 dim 백드롭 (`bg-black/20`) | 검정 20% | `rgba(0,0,0,0.5)` | 자동 변환 |
| 검색바 (`[data-node-id="4181:1572"]`) | `#f6f6f6` (한 단계 raised) | `#272530` |  |
| 필터/정렬 버튼 (`.filter-btn`) | (light Tailwind) | `#272530`, hover `#2F2D3A` |  |

### 11.4 다크 팔레트 — 텍스트 위계

| 위계 | 라이트 | 다크 |
|------|--------|------|
| 1° (본문/제목) | `#18181b`, `#27272a`, `text-black` | `#fafafa` |
| 2° (보조 1) | `#3f3f46`, `#52525b` | `#d4d4d8` |
| 3° (보조 2) | `#71717a` | `#a1a1aa` |
| 4° (placeholder/약함) | `#a1a1aa`, `#d4d4d8` | `#71717a` |
| Primary 보라 텍스트 | `#5B3D7A` | `#9866CC` |
| 카테고리 탭 비활성 텍스트/숫자 | `rgba(24,24,27,0.9)` / `rgba(24,24,27,0.48)` | `#fafafa` / `#d4d4d8` |

> 보더·배경의 `--page-primary`(`#5B3D7A → #6E4A94`)와 별개로, **텍스트의 보라색만 한 단계 밝은 `#9866CC`로** 분리해 어두운 표면에서 대비를 확보합니다. `.menu-active-accent`도 동일 규칙.

### 11.5 다크 팔레트 — 보더

| 강도 | 라이트 | 다크 |
|------|--------|------|
| Sub | `#e4e4e7`, `#f4f4f5`, `#f6f6f6`, `#ececec`, `border-gray-100/200` | `rgba(255,255,255,0.08)` |
| Strong | `#d4d4d8` | `rgba(255,255,255,0.16)` |
| 모달 윤곽 | (없음) | `1px rgba(255,255,255,0.1)` |
| 모달 1px 디바이더 (`h-px.bg-[#e4e4e7]`) | `#e4e4e7` | `rgba(255,255,255,0.1)` |
| 알림 활성 탭 pill (`bg-[rgba(24,24,27,0.08)]`) | 검정 8% | `rgba(255,255,255,0.1)` |

### 11.6 컴포넌트별 다크 변형

- **비활성 버튼 오버레이**: 라이트 `bg-white/70` → 다크 `rgba(24,24,27,0.48)` + 1px 10% white 보더
- **선택 카드** (`bg-[#fdf2f8]`): 다크 → `rgba(110,74,148,0.18)` (primary 어두운 틴트)
- **앱 미리보기 툴팁** (`.app-tooltip-box`): 라이트 `rgba(24,24,27,0.6)` bg / 흰 텍스트 → 다크 `rgba(250,250,250,0.92)` bg / `#18181b` 텍스트 (반전)
- **사이드바 스크롤바**: 다크 hover → 컨트롤러 `rgba(255,255,255,0.2)`
- **PageSidebar 메뉴 비활성 아이콘**: 라이트 `rgba(24,24,27,0.48)` → 다크 `rgba(255,255,255,0.4)`
- **PageSidebar 메뉴 호버** (`hover:bg-black/[0.03]`): 다크 → `rgba(255,255,255,0.05)`
- **메뉴 활성 인디케이터 바** (`.menu-active::before`): 라이트 `--page-primary` → 다크 `#6E4A94` (fallback)
- **스크롤 그라데이션** (`from-white`): 다크 → `#16151a`에서 페이드
- **EmptyPopularCard / 알림 빈 상태 아이콘**: 라이트/다크 변형 SVG를 모두 DOM에 두고 `.empty-stack-light/-dark`, `.notification-bell-light/-dark`로 `display:none` 토글
- **빈 상태 alarm**: 라이트 `text-black/[0.16]` → 다크 흰색 16% 톤
- **스크롤탑 플로팅 버튼** (`.scroll-top-btn`): 다크 → 흰 배경 / 검정 텍스트 (반전), hover `#f4f4f5`

### 11.7 디스커버리 / 앱 상세 전용 다크 변형

- **배너 ellipse 그라데이션**: 라이트 center `#5B3D7A` / outer `#F6F6F6` → 다크 center `#9866CC` / outer `#1C1B21`
- **우측 비활성 탭 텍스트** (`text-[rgba(24,24,27,0.28)]`): 다크 → `rgba(255,255,255,0.3)`
- **리뷰 입력창** (`.review-input-container`): 다크 → `#272530`, 보더 제거 (focus-within에서도)
- **리뷰 send 버튼** (`.review-send-btn`): 다크 활성 → 흰 배경 / 검정 아이콘; 비활성 → `rgba(255,255,255,0.1)` / `#71717a`. 라이트 모드의 `.review-send-overlay`는 다크에서 `display:none`
- **추천 버튼** (`.discovery-rec-btn`): 다크 비활성 → 투명 배경 + `#3f3f46` 보더, hover `rgba(255,255,255,0.04)`; 활성 → `rgba(251,176,59,0.4)`, hover `rgba(251,176,59,0.48)`
- **사용해제 버튼** (`.discovery-cancel-btn`): 다크 → `#27272a`, hover `#3f3f46`
- **캐러셀 페이지네이션 화살표** (`.pagination-arrow`): 다크 활성 → 보더 30% / 아이콘 stroke 70%; 비활성 → 보더 10% / 아이콘 30%
- **뷰 토글** (`.bg-[#18181B]` 컨테이너): 다크 → 색상 반전 (검정 ↔ 흰)
- **앱 상세 primary CTA** (`.app-detail-primary-cta`): 다크 → 흰 배경 / `#18181b` 텍스트 (반전)
- **앱 상세 통계 영역 / TOC rail / 정보 카드 / 댓글 카드**: 다크 → 보더 `rgba(255,255,255,0.1)`
- **앱 상세 TOC 슬라이딩 인디케이터** (`.app-detail-toc-indicator`): 다크 → `#9866cc`

### 11.8 다크 변형 추가 시 규칙

새 색상을 사용해야 한다면 다음 중 하나의 방식을 택합니다.

1. **매핑된 토큰만 사용** — 위 표에 있는 라이트 색만 쓰면 다크 변환은 자동으로 따라옵니다 (가장 권장).
2. **세맨틱 클래스 + CSS 셀렉터** — 컴포넌트에 의미 있는 클래스(`.review-send-btn` 등)를 부여하고, [globals.css](src/app/globals.css#L410-L787)의 `.dark-mode .your-class { ... }` 블록에 다크 변형을 정의.
3. **인라인 분기** — `darkMode` 상태를 props/스타일에 직접 매핑 (페이지 루트에서만 사용).

`bg-[#xxxxxx]` 임의 hex를 새로 도입하면 다크 모드에서 라이트 톤이 그대로 노출되니, 반드시 매핑이나 셀렉터를 추가하세요.

# AXHub UI 디자인 시스템 & 프론트엔드 설계 가이드

## 1. 프로젝트 구조

```
src/
├── app/
│   ├── globals.css          # 디자인 토큰, 애니메이션, 공통 스타일
│   ├── page.tsx             # / → BrowsePageB
│   ├── make/page.tsx        # /make → MakePageB
│   └── admin/page.tsx       # /admin → AdminPageB
├── components/version-b/
│   ├── TeamColumn.tsx       # 좌측 팀 컬럼 (확장/축소)
│   ├── BrowsePageB.tsx      # 둘러보기 페이지
│   ├── MakePageB.tsx        # 만들기 페이지
│   ├── AdminPageB.tsx       # 관리하기 페이지
│   └── HotNewAppsContent.tsx # 인기•신규 앱 콘텐츠
public/icons/version-b/       # SVG/PNG 아이콘 에셋
```

---

## 2. 디자인 토큰

### 2.1 컬러 시스템

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-primary-500` | `#6d319d` | 만들기 페이지 Primary, 팀 아이콘 고정색 |
| `--page-primary` | 페이지별 동적 | 각 페이지의 활성 메뉴 인디케이터 색상 |
| `--color-gray-100` | `#f6f6f6` | 카드 보더, 배경 구분 |
| `--color-gray-200` | `#e4e4e7` | 구분선 |
| `--color-gray-300` | `#d4d4d8` | placeholder 텍스트 |
| `--color-gray-500` | `#71717a` | 보조 텍스트, 카테고리명 |
| `--color-gray-900` | `#18181b` | 본문 텍스트 |

#### 페이지별 Primary 컬러

| 페이지 | `--page-primary` | 용도 |
|--------|------------------|------|
| 둘러보기 (`/`) | `#FBB03B` | 활성 메뉴 텍스트, 인디케이터 바, 사용신청 버튼 |
| 만들기 (`/make`) | `#6d319d` | 활성 메뉴 텍스트, CTA 버튼, 인디케이터 바 |
| 관리하기 (`/admin`) | `#18181B` | 활성 메뉴 텍스트, 인디케이터 바 |

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
| 순위 상승 | `#22c55e` |
| 순위 하락 | `#ef4444` |
| 사용신청 버튼 배경 | `#fff8e6` |
| 사용신청 버튼 텍스트 | `#fbb03b` |
| 사용신청 버튼 hover | `#fdefc5` |

### 2.2 타이포그래피

- 기본 폰트: `Pretendard Variable`
- fallback: `-apple-system, BlinkMacSystemFont, system-ui, sans-serif`

| 스타일 | 크기 | 굵기 | line-height | tracking |
|--------|------|------|-------------|----------|
| 페이지 제목 | 22px | Bold (700) | 1.3 | -0.22px |
| 섹션 제목 | 20px | Medium (500) | 1.3 | -0.2px |
| 배너 제목 | 28px | Bold (700) | 1.35 | — |
| 배너 부제 | 18px | Regular (400) | 1.4 | -0.18px |
| 사이드바 헤더 | 18px | SemiBold (600) | 1.4 | -0.18px |
| 사이드바 설명 | 14px | Regular (400) | 1.5 | -0.14px |
| 메뉴 항목 (활성) | 14px | SemiBold (600) | 1.5 | -0.14px |
| 메뉴 항목 (비활성) | 14px | Regular (400) | 1.5 | -0.14px |
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

## 4. 애니메이션 & 인터랙션

### 4.1 전역 트랜지션

| 대상 | 속성 | duration | easing |
|------|------|----------|--------|
| 버튼/링크 | background, opacity, color, box-shadow, transform | 0.2s | ease |
| aside | width | 0.3s | cubic-bezier(0.4, 0, 0.2, 1) |
| 네비 아이콘 hover | transform (scale 1.05) | 0.2s | ease |
| 콘텐츠 카드 hover | box-shadow, transform (translateY -1px) | 0.25s | ease |

### 4.2 키프레임 애니메이션

| 이름 | 클래스 | 효과 | duration | 용도 |
|------|--------|------|----------|------|
| `pageFadeIn` | `.page-enter` | opacity 0→1, translateY 6px→0 | 0.35s | 페이지 진입 (현재 미사용) |
| `slideInLeft` | `.team-column-enter` | opacity 0→1, translateX -12px→0 | 0.3s | 팀 컬럼 진입 |
| `sidebarSlideIn` | `.sidebar-enter` | opacity 0→1, translateY 8px→0 | 0.3s | 서브 사이드바 진입 |
| `rankFadeIn` | `.rank-enter` | opacity 0→1, scale 0.8→1, translateY 12px→0 | 0.4s | 순위 번호 staggered 진입 |
| `badgePulse` | `.new-badge-pulse` | box-shadow 0→6px 확산 | 2s (infinite) | NEW 뱃지 펄스 |

### 4.3 마이크로 인터랙션

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
- 확산만 있고 줄어드는 애니메이션 없음

#### 앱 미리보기 툴팁
- `position: fixed` (스크롤 컨테이너 밖에서도 표시)
- 호버 후 **0.3초 대기** → **0.3초 디졸브** 페이드인
- 행 간 이동 시: 이전 툴팁이 visible이면 딜레이 없이 즉시 교체
- 마우스 벗어남 시: 페이드아웃 후 300ms 뒤 제거
- 스타일: `rgba(24,24,27,0.6)` 배경, 12px Medium, `line-height 1.3`, `rounded-lg`

### 4.4 배너 캐러셀

- **방식**: 슬라이드 (translateX), 항상 좌→우 방향 통일
- **자동 전환**: 10초 간격
- **구조**: 3장 (배너1, 배너2, 배너1 복제) → 마지막 도달 시 트랜지션 없이 리셋
- **전환 속도**: `duration-500 ease-in-out`
- **Dot indicator**: 하단 중앙, 활성 dot 20px 흰색, 비활성 6px `rgba(255,255,255,0.4)`
- **클리핑**: `overflowX: clip`, `overflowY: visible` (일러스트 상단 삐져나옴 허용)
- **패럴랙스**: 콘텐츠 스크롤 시 배너가 `scrollTop * 0.3` 비율로 따라감

---

## 5. 스크롤 처리

### 5.1 사이드바 스크롤 (`.sidebar-scroll`)
- `scrollbar-width: thin`
- 트랙: 투명
- 썸: 호버 시에만 `rgba(0,0,0,0.2)`, 4px 너비
- webkit: `::-webkit-scrollbar-thumb` 호버 시에만 표시

### 5.2 리스트 영역 Scroll Shadow
- 상단: `linear-gradient(to bottom, white 0%, transparent 100%)`, 24px 높이
- 하단: `linear-gradient(to top, white 0%, transparent 100%)`, 24px 높이
- `pointer-events-none`, `z-index: 10`

### 5.3 구분선 그라데이션 (인기앱 ↔ 신규앱)
```css
linear-gradient(to bottom, transparent 0%, #e4e4e7 15%, #e4e4e7 85%, transparent 100%)
```

---

## 6. 아이콘 관리

### 6.1 메뉴 아이콘 색상 제어

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

### 6.2 네비게이션 아이콘

- 활성/비활성 상태별 별도 SVG 파일 사용
- 예: `nav-make.svg` (활성), `nav-make-inactive.svg` (비활성)
- 크기: 44x44px (`size-11`)

---

## 7. 컴포넌트 설계 규칙

### 7.1 페이지 컴포넌트 패턴

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

### 7.2 팀 아이콘 규칙

- `TeamColumn`에 `color` prop을 전달하지 않으면 기본값 `#6d319d` 사용
- **모든 페이지에서 동일한 색상** (`#6d319d`)

### 7.3 피그마 노드 추적

- 모든 주요 요소에 `data-node-id` 속성으로 피그마 노드 ID 기록
- 디자인 변경 시 추적 용이

---

## 8. 접근성

- 모든 버튼에 `type="button"` 명시
- 아이콘 버튼에 `aria-label` 필수
- 이미지 아이콘에 `alt=""` (장식용)
- 토글 버튼에 상태별 aria-label 변경 (예: "사이드바 접기" / "사이드바 펼치기")

---

## 9. 체크리스트 (새 페이지 추가 시)

- [ ] `--page-primary` CSS 변수 설정
- [ ] `TeamColumn` color prop 미전달 (기본값 `#6d319d` 사용)
- [ ] 활성 메뉴에 `.menu-active` 클래스 적용
- [ ] 메뉴 아이콘에 `mask-image` 방식 사용 (활성/비활성 색상)
- [ ] 사이드바에 `.sidebar-enter` 클래스 적용
- [ ] 스크롤 영역에 `.sidebar-scroll` 클래스 적용
- [ ] 하단 scroll shadow 그라데이션 추가
- [ ] 네비 아이콘 활성/비활성 SVG 파일 준비
- [ ] `data-node-id` 속성으로 피그마 노드 매핑
- [ ] 접근성: aria-label, 시맨틱 버튼 확인

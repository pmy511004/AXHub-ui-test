# /make 페이지 Version B + 버전 토글 설계

**날짜**: 2026-04-10
**범위**: `/make` 페이지에 피그마 기반 Version B 레이아웃 추가, A/B 전환 토글 버튼
**피그마 노드**: [versionB 2471:1262](https://www.figma.com/design/zcmpdNiO5jHIcyAXw1QGoe/AX-%EB%B8%8C%EB%9E%9C%EB%94%A9?node-id=2471-1262)

## 목표

`/make` 페이지의 디자인을 피그마 versionB 시안대로 구현하고, 우측 하단 플로팅 토글 버튼으로 기존(A) ↔ 신규(B) 레이아웃을 세션 내에서 즉시 전환한다.

## 결정사항 요약

| 항목 | 결정 |
|---|---|
| 적용 범위 | `/make` 페이지만 (추후 피그마 받는 대로 다른 페이지 확장) |
| 토글 위치 | 우측 하단 플로팅 버튼 (`fixed bottom-4 right-4`) |
| 상태 유지 | 없음 — 로컬 `useState`만. 새로고침 시 A로 리셋 |
| 에셋 처리 | Figma MCP 에셋을 `public/icons/version-b/`에 다운로드 후 영구 저장 |

## 레이어 구조 (피그마 기준)

```
versionB (2471:1262) — flex row, bg #f4f4f5, h-screen
│
├── Left Global Nav (2471:1278) — w-76, flex col, justify-between
│   ├── Top (2471:1531)
│   │   ├── Team icon "JO" (2471:1521) — 44px 보라 라운드 (primary-500)
│   │   └── Nav (2471:1279) — 만들기(active) / 둘러보기 / 관리하기
│   │        각 항목: 44px 아이콘 + 12px 라벨
│   └── Bottom card (2471:1532) — 흰색 rounded-16 카드
│        검색(44px) / 알림(44px) / 프로필(44px)
│
├── Middle column (2474:1570)
│   ├── Toggle icon card (2474:1880) — 44px 흰 rounded-12, 사이드패널 아이콘
│   └── Aside SideNavBar (2474:1552) — w-168, 흰 rounded-12
│        ├── 헤더: "만들기" + "여기에서 내 앱을 만드세요"
│        └── 메뉴: 내 활동(active, primary-50) / 내가 만든 앱 / 앱 만들기
│
└── Main area (2484:1893)
    ├── Header (2484:1894) — h-76, shadow
    │    "내 활동" (22/bold) + "앱 만들기" 보라 버튼 (rounded-12)
    └── Content card (2484:1908) — 흰 rounded-12, flex-1
```

## 컴포넌트 구조

```
src/app/make/page.tsx                       ← 상태 + 조건부 렌더 + 토글 포함
  ├── version === 'a' → 기존 레이아웃 유지
  └── version === 'b' → <MakePageB />

src/components/version-b/MakePageB.tsx      ← 신규, props 없이 완결
src/components/shared/VersionToggle.tsx     ← 신규, 프레젠테이셔널
```

### `VersionToggle` 인터페이스
```ts
type VersionToggleProps = {
  version: 'a' | 'b';
  onChange: (v: 'a' | 'b') => void;
};
```
- `fixed bottom-4 right-4 z-50`
- pill 형태, 현재 버전 하이라이트
- `/make` 페이지에서만 렌더 (다른 페이지는 version B 없음)

### `MakePageB`
- props 없음, 자체 완결
- 피그마 레이어 구조를 그대로 반영 (스크린샷 아닌 node-id 기반)
- 에셋 경로는 `/icons/version-b/*` 로 참조

## 에셋 목록 (Figma → public/icons/version-b/)

| 파일명 | 원본 | 용도 |
|---|---|---|
| `nav-make.png` | imgMakeUn | 만들기 네비 아이콘 |
| `nav-store.png` | imgStoreUn | 둘러보기 네비 아이콘 |
| `nav-admin.png` | imgAdminUn | 관리하기 네비 아이콘 |
| `profile.png` | imgProfile | 프로필 이미지 |
| `toggle-panel.png` | imgFrame | 서브 사이드바 토글 아이콘 |
| `menu-activity.svg` | imgFrame1 | "내 활동" 메뉴 아이콘 |
| `menu-apps.svg` | imgFrame2 | "내가 만든 앱" 메뉴 아이콘 |
| `menu-create.svg` | imgFrame3 | "앱 만들기" 메뉴 아이콘 |
| `search.svg` | imgVector | 검색 아이콘 |
| `bell.svg` | imgVector1 | 알림 아이콘 |
| `plus.svg` | imgUnion | "앱 만들기" 버튼 플러스 |

## 디자인 토큰 매핑

- `#f4f4f5` (페이지 배경) → Tailwind `bg-[#f4f4f5]` 또는 `bg-gray-100` (확인 필요)
- `#6d319d` → 기존 `primary-500`
- `#f4ecfa` → 기존 `primary-50`
- `#18181b` → 기존 `gray-900`
- `rgba(24,24,27,0.48)` → 비활성 라벨 텍스트
- 폰트: Pretendard Variable (기존 프로젝트 사용 중)

## 비범위 (Out of Scope)

- `/` 및 `/admin` 페이지의 Version B (추후 별도 피그마)
- 토글 상태 persistence (localStorage/sessionStorage 모두 제외)
- 버전 B 내부 세부 인터랙션 (알림 팝오버, 프로필 메뉴 등) — 시안 그대로 정적 렌더

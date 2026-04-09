export const apps = [
  { id: 1, name: "근태관리", developer: "HR팀 · 김민수", icon: "📋" },
  { id: 2, name: "회의실 예약", developer: "총무팀 · 이지은", icon: "🏢" },
  { id: 3, name: "전자결재", developer: "경영지원팀 · 박준혁", icon: "✍️" },
  { id: 4, name: "사내 메신저", developer: "IT팀 · 최서연", icon: "💬" },
  { id: 5, name: "프로젝트 관리", developer: "개발팀 · 정우진", icon: "📊" },
  { id: 6, name: "경비 정산", developer: "재무팀 · 한소희", icon: "💰" },
  { id: 7, name: "교육 플랫폼", developer: "인재개발팀 · 오태양", icon: "📚" },
  { id: 8, name: "고객 관리(CRM)", developer: "영업팀 · 송예진", icon: "👥" },
];

export const navItems = [
  { label: "내가 이용중인 앱", active: true },
  { label: "인기 • 신규 앱", active: false },
  { label: "APP 스토어", active: false },
  { label: "API 스토어", active: false },
  { label: "앱 사용요청 내역", active: false },
];

export const sidebarNavItems = [
  { label: "만들기", icon: "/icons/side-unmake.svg", activeIcon: "/icons/side-make.png", activeIconSize: 28, href: "/make" },
  { label: "둘러보기", icon: "/icons/side-unstore.svg", activeIcon: "/icons/side-store.png", href: "/" },
  { label: "관리자", icon: "/icons/side-unadmin.svg", activeIcon: "/icons/side-admin.png", href: "/admin" },
];

export const makeNavItems = [
  { label: "내 활동", active: true },
  { label: "내가 만든 앱", active: false },
  { label: "앱 만들기", active: false },
];

export const adminNavItems = [
  { label: "전체 앱 관리", active: true },
  { label: "API 관리", active: false },
  { label: "멤버 관리", active: false },
  { label: "역할 관리", active: false },
  { label: "권한 관리", active: false },
  { label: "게이트웨이 로그", active: false },
  { label: "카테고리 관리", active: false },
  { label: "기업 정보 관리", active: false },
];

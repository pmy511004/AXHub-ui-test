export type Tenant = {
  name: string;
  email: string;
  slug: string;
  createdAt: string;
  apps: number;
  members: number;
};

export const TENANTS: ReadonlyArray<Tenant> = [
  { name: "민트랩 주식회사", email: "contact@mintlab.kr", slug: "/mintlab", createdAt: "2026-05-12", apps: 12, members: 30 },
  { name: "그린테크 솔루션", email: "hello@greentech.co", slug: "/greentech", createdAt: "2026-04-30", apps: 184, members: 312 },
  { name: "노바AI 랩스", email: "admin@novaai.io", slug: "/novaai", createdAt: "2026-04-22", apps: 421, members: 588 },
  { name: "어센드 워크스", email: "team@ascend.com", slug: "/ascend", createdAt: "2026-04-15", apps: 96, members: 142 },
  { name: "파스텔 디자인", email: "hi@pastel.design", slug: "/pastel", createdAt: "2026-03-28", apps: 67, members: 89 },
  { name: "데이브릿지 컴퍼니", email: "contact@daybridge.com", slug: "/daybridge", createdAt: "2026-03-19", apps: 312, members: 504 },
  { name: "스카이로프트", email: "admin@skyloft.kr", slug: "/skyloft", createdAt: "2026-03-04", apps: 152, members: 233 },
  { name: "더플로우 스튜디오", email: "hello@theflow.studio", slug: "/theflow", createdAt: "2026-02-20", apps: 78, members: 124 },
  { name: "오리진 파트너스", email: "contact@origin.io", slug: "/origin", createdAt: "2026-02-09", apps: 209, members: 365 },
];

export const tenantRouteSlug = (slug: string) => slug.replace(/^\//, "");

export const findTenantByRouteSlug = (routeSlug: string): Tenant | undefined =>
  TENANTS.find((t) => tenantRouteSlug(t.slug) === routeSlug);

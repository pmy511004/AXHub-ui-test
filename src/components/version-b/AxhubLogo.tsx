import { useId } from "react";

type AxhubLogoProps = {
  size?: number;
  showWordmark?: boolean;
  className?: string;
};

type Node = { cx: number; cy: number; r: number; specCx: number; specCy: number; specR: number };

export default function AxhubLogo({ size = 64, showWordmark = true, className }: AxhubLogoProps) {
  const uid = useId().replace(/[:]/g, "");
  const idSphere = `axSphere-${uid}`;
  const idCore = `axCore-${uid}`;
  const idSpec = `axSpec-${uid}`;
  const idCoreSpec = `axCoreSpec-${uid}`;
  const idShadow = `axShadow-${uid}`;
  const idLineGrad = `axLine-${uid}`;

  const wordmarkSize = 64;
  const gap = Math.round(size * 0.22);

  // 4 corner nodes (소형 sphere) + 중앙 core sphere
  const corners: Node[] = [
    { cx: 20, cy: 22, r: 10, specCx: 17, specCy: 18, specR: 4 },
    { cx: 80, cy: 22, r: 10, specCx: 77, specCy: 18, specR: 4 },
    { cx: 20, cy: 78, r: 10, specCx: 17, specCy: 74, specR: 4 },
    { cx: 80, cy: 78, r: 10, specCx: 77, specCy: 74, specR: 4 },
  ];
  const core: Node = { cx: 50, cy: 50, r: 15, specCx: 45, specCy: 44, specR: 6 };

  return (
    <div className={className ?? "flex items-center"} style={{ gap }}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        aria-hidden="true"
        style={{ display: "block" }}
      >
        <defs>
          {/* 모서리 sphere — 더 밝은 보라 톤 (작아도 잘 보이게) */}
          <radialGradient id={idSphere} cx="32%" cy="26%" r="85%">
            <stop offset="0%" stopColor="#E8D4F5" />
            <stop offset="38%" stopColor="#A87BD1" />
            <stop offset="78%" stopColor="#5B3D7A" />
            <stop offset="100%" stopColor="#2E1C44" />
          </radialGradient>

          {/* 중앙 core sphere — 한 단계 더 진한 보라 (허브 중심) */}
          <radialGradient id={idCore} cx="32%" cy="24%" r="88%">
            <stop offset="0%" stopColor="#D5B7EA" />
            <stop offset="35%" stopColor="#9866CC" />
            <stop offset="78%" stopColor="#4A2C66" />
            <stop offset="100%" stopColor="#1F1130" />
          </radialGradient>

          {/* 좌상단 specular 하이라이트 (sphere 공통) */}
          <radialGradient id={idSpec} cx="30%" cy="20%" r="55%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="55%" stopColor="#FFFFFF" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* 중앙 core 전용 더 밝은 specular */}
          <radialGradient id={idCoreSpec} cx="30%" cy="20%" r="60%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>

          {/* 연결선 — 중앙에서 모서리로 페이드 */}
          <linearGradient id={idLineGrad} x1="50%" y1="50%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#9866CC" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#9866CC" stopOpacity="0.15" />
          </linearGradient>

          {/* sphere 아래 floating shadow */}
          <filter id={idShadow} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="2" />
            <feOffset dx="0" dy="2.5" result="off" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.45" />
            </feComponentTransfer>
            <feMerge>
              <feMergeNode />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* 허브 연결선 — sphere 뒤에 깔리도록 먼저 */}
        <g strokeLinecap="round" strokeWidth="2">
          <line x1={core.cx} y1={core.cy} x2={corners[0].cx} y2={corners[0].cy} stroke="#9866CC" strokeOpacity="0.32" />
          <line x1={core.cx} y1={core.cy} x2={corners[1].cx} y2={corners[1].cy} stroke="#9866CC" strokeOpacity="0.32" />
          <line x1={core.cx} y1={core.cy} x2={corners[2].cx} y2={corners[2].cy} stroke="#9866CC" strokeOpacity="0.32" />
          <line x1={core.cx} y1={core.cy} x2={corners[3].cx} y2={corners[3].cy} stroke="#9866CC" strokeOpacity="0.32" />
        </g>

        {/* 4개 모서리 sphere */}
        {corners.map((n, i) => (
          <g key={i} filter={`url(#${idShadow})`}>
            <circle cx={n.cx} cy={n.cy} r={n.r} fill={`url(#${idSphere})`} />
            <ellipse cx={n.specCx} cy={n.specCy} rx={n.specR} ry={n.specR * 0.75} fill={`url(#${idSpec})`} />
          </g>
        ))}

        {/* 중앙 core sphere */}
        <g filter={`url(#${idShadow})`}>
          <circle cx={core.cx} cy={core.cy} r={core.r} fill={`url(#${idCore})`} />
          <ellipse cx={core.specCx} cy={core.specCy} rx={core.specR} ry={core.specR * 0.75} fill={`url(#${idCoreSpec})`} />
          {/* 코어 위 작은 글로스 점 */}
          <circle cx={core.specCx - 1} cy={core.specCy - 1.5} r="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        </g>
      </svg>

      {showWordmark && (
        <span
          className="font-bold tracking-[-0.5px] text-[#18181b]"
          style={{ fontSize: wordmarkSize, lineHeight: 1.1 }}
        >
          AXHub
        </span>
      )}
    </div>
  );
}

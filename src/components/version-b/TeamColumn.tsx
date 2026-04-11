"use client";

import Image from "next/image";

interface TeamColumnProps {
  expanded: boolean;
  color?: string;
}

// 피그마 sidebar-expand (2544:1996) 좌측 팀 목록 열
// CSS 트랜지션으로 확장/축소 애니메이션
export default function TeamColumn({ expanded, color = "#6d319d" }: TeamColumnProps) {
  return (
    <div
      className="flex h-full shrink-0 flex-col items-center gap-5 overflow-hidden py-4 transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
      style={{
        width: expanded ? 76 : 0,
        opacity: expanded ? 1 : 0,
        paddingLeft: expanded ? 20 : 0,
        paddingRight: expanded ? 20 : 0,
      }}
    >
      {/* Team JO (active) */}
      <div
        className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white p-1"
        style={{ backgroundColor: color, boxShadow: `0px 0px 0px 1px ${color}` }}
      >
        <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
          JO
        </p>
      </div>

      {/* Team DE (inactive) */}
      <div
        className="group flex size-11 shrink-0 cursor-pointer items-center justify-center overflow-hidden rounded-xl p-1 transition-all"
        style={{
          backgroundImage:
            `linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) 100%), linear-gradient(90deg, ${color} 0%, ${color} 100%)`,
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundImage =
            `linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0) 100%), linear-gradient(90deg, ${color} 0%, ${color} 100%)`;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundImage =
            `linear-gradient(90deg, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.8) 100%), linear-gradient(90deg, ${color} 0%, ${color} 100%)`;
        }}
      >
        <p className="text-base font-bold leading-[1.5] tracking-[-0.16px] text-white">
          DE
        </p>
      </div>

      {/* Add team */}
      <button
        type="button"
        className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl p-1"
        aria-label="팀 추가"
      >
        <Image src="/icons/version-b/add-team.svg" alt="" width={24} height={24} />
      </button>
    </div>
  );
}

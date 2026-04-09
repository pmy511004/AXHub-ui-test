"use client";

import Image from "next/image";

interface ProfileMenuProps {
  onClose: () => void;
  onAction?: (action: string) => void;
  isExpanded?: boolean;
}

function IconMoon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#71717a" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17.5 10.833A7.5 7.5 0 0 1 9.167 2.5a7.5 7.5 0 1 0 8.333 8.333Z" />
    </svg>
  );
}

function IconSignOut() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="#f5475c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7.5 17.5H4.167A1.667 1.667 0 0 1 2.5 15.833V4.167A1.667 1.667 0 0 1 4.167 2.5H7.5" />
      <path d="M13.333 14.167 17.5 10l-4.167-4.167" />
      <path d="M17.5 10H7.5" />
    </svg>
  );
}

export default function ProfileMenu({ onClose, onAction, isExpanded }: ProfileMenuProps) {
  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-40" onClick={onClose} />

      {/* Menu */}
      <div className="absolute left-[64px] bottom-4 z-50 w-[200px] rounded-2xl border border-white/30 bg-[rgba(220,220,225,0.2)] backdrop-blur-[20px] backdrop-saturate-[1.8] shadow-[0px_8px_32px_0px_rgba(0,0,0,0.16),inset_1px_1px_0px_0px_rgba(255,255,255,0.5)]">
        {/* User Info */}
        <div className="border-b border-gray-100 px-4 pt-4 pb-3">
          <p className="text-base font-bold text-gray-900 tracking-[-0.16px] leading-6">
            박민영
          </p>
          <p className="text-xs text-gray-500 leading-normal mt-1">
            minion@jocodingax.ai
          </p>
        </div>

        {/* Menu Items */}
        <div className="py-1">
          <button
            onClick={() => onAction?.("expand")}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 tracking-[-0.14px] leading-6 hover:bg-[rgba(24,24,27,0.03)] transition-colors"
          >
            <Image
              src={isExpanded ? "/icons/sidemenu-fold.png" : "/icons/sidemenu-expand.png"}
              alt={isExpanded ? "접기" : "펼치기"}
              width={20}
              height={20}
            />
            {isExpanded ? "기업 프로필 접기" : "기업 프로필 펼치기"}
          </button>

          <button className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-gray-500 tracking-[-0.14px] leading-6 hover:bg-[rgba(24,24,27,0.03)] transition-colors">
            <IconMoon />
            다크모드
          </button>

          <button
            onClick={onClose}
            className="flex w-full items-center gap-2 px-4 py-3 text-sm font-medium text-[#f5475c] tracking-[-0.14px] leading-6 hover:bg-[rgba(24,24,27,0.03)] transition-colors"
          >
            <IconSignOut />
            로그아웃
          </button>
        </div>
      </div>
    </>
  );
}

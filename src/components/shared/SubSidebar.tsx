import Image from "next/image";
import { navItems } from "./data";
import { navIcons } from "./Icons";

interface SubSidebarProps {
  onClose: () => void;
  showIcons?: boolean;
  borderColor?: string;
  collapsePosition?: "header" | "center";
}

export default function SubSidebar({ onClose, showIcons = true, borderColor = "border-gray-200", collapsePosition = "center" }: SubSidebarProps) {
  return (
    <aside className={`relative flex h-full w-[200px] shrink-0 flex-col border-r ${borderColor} bg-white`}>
      {/* Header */}
      <div className="relative flex h-[68px] flex-col items-start justify-center gap-1 p-3">
        <h2 className="text-base font-semibold text-gray-900 leading-6 tracking-[-0.16px]">
          둘러보기
        </h2>
        <p className="text-xs font-normal text-gray-500 leading-[1.3] tracking-[-0.12px]">
          사내 앱과 API를 구경하세요
        </p>
      </div>

      {/* Menu Items */}
      <nav className="flex flex-col gap-2 px-3 py-4">
        {navItems.map((item, index) => {
          const Icon = navIcons[index];
          return (
            <button
              key={index}
              className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm tracking-[-0.14px] leading-6 ${
                item.active
                  ? "bg-primary-50 font-semibold text-gray-900"
                  : "font-normal text-gray-500 hover:bg-[rgba(24,24,27,0.03)]"
              }`}
            >
              {showIcons && <Icon className="shrink-0" />}
              {item.label}
            </button>
          );
        })}
      </nav>

    </aside>
  );
}

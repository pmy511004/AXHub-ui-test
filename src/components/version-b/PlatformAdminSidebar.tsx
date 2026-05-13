"use client";

import Image from "next/image";
import Link from "next/link";

type SidebarKey = "tenants" | "other";

type Props = {
  active: SidebarKey;
};

const ITEMS: ReadonlyArray<{
  key: SidebarKey;
  label: string;
  icon: string;
  href: string;
}> = [
  { key: "tenants", label: "테넌트", icon: "/icons/version-b/snb-tenants.svg", href: "/platform-admin" },
  { key: "other", label: "다른 메뉴", icon: "/icons/version-b/snb-other.svg", href: "#" },
];

export default function PlatformAdminSidebar({ active }: Props) {
  return (
    <aside
      className="sticky top-[60px] flex h-[calc(100vh-60px)] w-[200px] shrink-0 flex-col gap-2 overflow-y-auto bg-[#f9f9f9] p-5"
      data-node-id="4830:4433"
    >
      {ITEMS.map((item) => {
        const isActive = item.key === active;
        return (
          <Link
            key={item.key}
            href={item.href}
            className="flex h-[37px] items-center gap-2 rounded-lg py-2 transition-colors"
          >
            <Image src={item.icon} alt="" width={18} height={18} className="shrink-0" />
            <span
              className={`text-sm leading-[1.5] tracking-[-0.14px] transition-colors ${
                isActive ? "font-semibold text-[#18181b]" : "font-normal text-[#71717a]"
              }`}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </aside>
  );
}

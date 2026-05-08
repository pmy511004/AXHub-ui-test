"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";

const NOTIFICATION_TABS = ["전체", "읽지 않음", "승인요청", "추천"] as const;
type NotificationTab = (typeof NOTIFICATION_TABS)[number];

export default function NotificationButton() {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex size-11 items-center justify-center rounded-xl transition-colors hover:bg-white/10"
        aria-label="알림"
      >
        <Image src="/icons/version-b/nav-bell.svg" alt="" width={44} height={44} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div
            className="absolute bottom-0 left-[calc(100%+8px)] z-50 flex h-[520px] w-[400px] flex-col items-start gap-5 overflow-hidden rounded-2xl bg-white p-5"
            style={{
              boxShadow:
                "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
            }}
            data-node-id="4059:3944"
          >
            <NotificationTabs />
            <div className="flex w-full flex-1 flex-col items-center justify-center gap-5">
              <Image src="/icons/version-b/notification-bell.svg" alt="" width={72} height={76} className="notification-bell-light" />
              <Image src="/icons/version-b/notification-bell-dark.svg" alt="" width={72} height={76} className="notification-bell-dark" />
              <p className="text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#a1a1aa]">
                알림이 생기면
                <br />
                여기서 알려드릴게요
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function NotificationTabs() {
  const [activeTab, setActiveTab] = useState<NotificationTab>("전체");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });

  useLayoutEffect(() => {
    const el = tabRefs.current[activeTab];
    if (!el) return;
    setPillStyle({ left: el.offsetLeft, width: el.offsetWidth });
  }, [activeTab]);

  return (
    <div className="relative flex w-full items-start" data-node-id="4450:2143">
      <span
        aria-hidden
        className="pointer-events-none absolute left-0 top-0 bottom-0 rounded-full bg-[rgba(24,24,27,0.08)]"
        style={{
          width: pillStyle.width,
          transform: `translateX(${pillStyle.left}px)`,
          transition:
            "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), width 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      />
      {NOTIFICATION_TABS.map((tab) => {
        const isActive = activeTab === tab;
        return (
          <button
            key={tab}
            ref={(el) => {
              tabRefs.current[tab] = el;
            }}
            type="button"
            onClick={() => setActiveTab(tab)}
            className="relative z-10 flex shrink-0 items-center px-3 py-2"
          >
            <span
              className={`whitespace-nowrap text-sm leading-[1.5] tracking-[-0.14px] transition-colors ${
                isActive ? "font-semibold text-[#18181b]" : "font-normal text-[#71717a]"
              }`}
            >
              {tab}
            </span>
          </button>
        );
      })}
    </div>
  );
}

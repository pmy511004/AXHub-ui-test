"use client";

import Image from "next/image";
import { useState } from "react";
import GlobalSidebar from "@/components/shared/GlobalSidebar";
import { adminNavItems } from "@/components/shared/data";

export default function AdminPage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <GlobalSidebar
        activePage="관리자"
        onNavClick={(label) => {
          if (label === "관리자") {
            setSidebarOpen((prev) => !prev);
          } else {
            window.location.href = label === "둘러보기" ? "/" : label === "만들기" ? "/make" : "#";
          }
        }}
      />

      {/* Sub Sidebar */}
      {sidebarOpen && (
        <aside className="relative flex h-full w-[200px] shrink-0 flex-col border-r border-gray-200 bg-white">
          {/* Header */}
          <div className="flex h-[68px] flex-col items-start justify-center gap-1 p-3">
            <h2 className="text-base font-semibold text-gray-900 leading-6 tracking-[-0.16px]">
              관리자
            </h2>
            <p className="text-xs font-normal text-gray-500 leading-[1.3] tracking-[-0.12px]">
              모든 기업데이터를 관리하세요
            </p>
          </div>

          {/* Menu Items */}
          <nav className="flex flex-col gap-2 px-3 py-4">
            {adminNavItems.map((item, index) => {
              const icons = [
                // 전체 앱 관리 - circles-four fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M128,120a44,44,0,1,1,44-44A44.05,44.05,0,0,1,128,120Zm60,8a44,44,0,1,0,44,44A44.05,44.05,0,0,0,188,128ZM68,128a44,44,0,1,0,44,44A44.05,44.05,0,0,0,68,128Z"/></svg>,
                // API 관리 - code fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M32,64V192a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V64a16,16,0,0,0-16-16H48A16,16,0,0,0,32,64Zm47.45,79.39a8,8,0,0,1-11.32,11.32l-24-24a8,8,0,0,1,0-11.32l24-24a8,8,0,0,1,11.32,11.32L61.11,125l.83.82Zm50.12,8.31-16,48a8,8,0,1,1-15.14-5.06l16-48a8,8,0,1,1,15.14,5.06Zm62.06-20.65-24,24a8,8,0,1,1-11.32-11.32L176.89,125l-.83-.82L159.76,107.9a8,8,0,0,1,11.32-11.32l24,24A8,8,0,0,1,195.63,131.05Z"/></svg>,
                // 멤버 관리 - users fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M164.47,195.63a8,8,0,0,1-6.7,12.37H10.23a8,8,0,0,1-6.7-12.37,95.83,95.83,0,0,1,47.22-37.71,60,60,0,1,1,66.5,0A95.83,95.83,0,0,1,164.47,195.63Zm87.91-.15a95.87,95.87,0,0,0-47.13-37.56A60,60,0,0,0,144.7,54.59a4,4,0,0,0-1.33,6A75.83,75.83,0,0,1,147,150.53a4,4,0,0,0,1.07,5.53,112.32,112.32,0,0,1,29.85,30.83,23.92,23.92,0,0,1,3.65,16.47,4,4,0,0,0,3.95,4.64h60.3a8,8,0,0,0,7.73-5.93A8.22,8.22,0,0,0,252.38,195.48Z"/></svg>,
                // 역할 관리 - id-card fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M200,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V40A16,16,0,0,0,200,24ZM96,48h64a8,8,0,0,1,0,16H96a8,8,0,0,1,0-16Zm84.81,150.4a8,8,0,0,1-11.21-1.6,52,52,0,0,0-83.2,0,8,8,0,1,1-12.8-9.6A67.88,67.88,0,0,1,101,165.51a40,40,0,1,1,53.94,0A67.88,67.88,0,0,1,182.4,187.2,8,8,0,0,1,180.81,198.4ZM152,136a24,24,0,1,1-24-24A24,24,0,0,1,152,136Z"/></svg>,
                // 권한 관리 - shield-check fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M208,40H48A16,16,0,0,0,32,56v58.77c0,89.61,75.82,119.34,91,124.39a15.53,15.53,0,0,0,10,0c15.2-5.05,91-34.78,91-124.39V56A16,16,0,0,0,208,40Zm-32.52,69.63-56,56a8,8,0,0,1-11.31,0l-24-24a8,8,0,0,1,11.31-11.31L114,149.1l50.34-50.35a8,8,0,0,1,11.31,11.32Z"/></svg>,
                // 게이트웨이 로그 - server-stack fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M208,40H48A16,16,0,0,0,32,56v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V56A16,16,0,0,0,208,40ZM180,92a12,12,0,1,1,12-12A12,12,0,0,1,180,92Z"/><path d="M208,136H48a16,16,0,0,0-16,16v48a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V152A16,16,0,0,0,208,136Zm-28,52a12,12,0,1,1,12-12A12,12,0,0,1,180,188Z"/></svg>,
                // 카테고리 관리 - tag fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M243.31,136,144,36.69A15.86,15.86,0,0,0,132.69,32H40a8,8,0,0,0-8,8v92.69A15.86,15.86,0,0,0,36.69,144L136,243.31a16,16,0,0,0,22.63,0l84.68-84.68a16,16,0,0,0,0-22.63ZM84,96A12,12,0,1,1,96,84,12,12,0,0,1,84,96Z"/></svg>,
                // 기업 정보 관리 - buildings fill
                <svg key="i" width="16" height="16" viewBox="0 0 256 256" fill="currentColor"><path d="M240,208h-8V88a8,8,0,0,0-8-8H160a8,8,0,0,0-8,8v40H104V40a8,8,0,0,0-8-8H32a8,8,0,0,0-8,8V208H16a8,8,0,0,0,0,16H240a8,8,0,0,0,0-16ZM72,184a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm0-48a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Zm0-48a8,8,0,0,1-16,0V72a8,8,0,0,1,16,0Zm64,96a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm64,0a8,8,0,0,1-16,0V168a8,8,0,0,1,16,0Zm0-48a8,8,0,0,1-16,0V120a8,8,0,0,1,16,0Z"/></svg>,
              ];
              return (
                <button
                  key={index}
                  className={`flex w-full items-center gap-2 rounded-lg px-4 py-2 text-left text-sm tracking-[-0.14px] leading-6 ${
                    item.active
                      ? "bg-primary-50 font-semibold text-gray-900"
                      : "font-normal text-gray-500 hover:bg-[rgba(24,24,27,0.03)]"
                  }`}
                >
                  {icons[index]}
                  {item.label}
                </button>
              );
            })}
          </nav>
        </aside>
      )}

      {/* Main Content */}
      <main className="flex flex-1 flex-col h-full min-w-0">
        {/* Header */}
        <header className="flex h-[72px] shrink-0 items-center bg-white px-5 py-4">
          <h1 className="text-[22px] font-bold text-black leading-[1.3] tracking-[-0.22px]">
            전체 앱 관리
          </h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 bg-white" />
      </main>
    </div>
  );
}

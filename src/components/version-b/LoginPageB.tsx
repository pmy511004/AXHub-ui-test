"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setAuthed } from "@/lib/auth";

const TEAMS: ReadonlyArray<{ name: string }> = [
  { name: "조코딩 AX 파트너스" },
  { name: "대모산개발단" },
];

export default function LoginPageB() {
  const router = useRouter();
  const [signupModalOpen, setSignupModalOpen] = useState(false);
  const [signupModalClosing, setSignupModalClosing] = useState(false);
  const [teamModalOpen, setTeamModalOpen] = useState(false);
  const [teamModalClosing, setTeamModalClosing] = useState(false);
  const [tooltipMsg, setTooltipMsg] = useState<string | null>(null);
  const tooltipKey = useRef(0);
  const tooltipTimer = useRef<number | null>(null);

  const openSignupModal = () => setSignupModalOpen(true);
  const closeSignupModal = () => {
    setSignupModalClosing(true);
    setTimeout(() => {
      setSignupModalOpen(false);
      setSignupModalClosing(false);
    }, 250);
  };
  const goToTeamSelect = () => {
    setSignupModalClosing(true);
    setTimeout(() => {
      setSignupModalOpen(false);
      setSignupModalClosing(false);
      setTeamModalOpen(true);
    }, 250);
  };
  const closeTeamModal = () => {
    setTeamModalClosing(true);
    setTimeout(() => {
      setTeamModalOpen(false);
      setTeamModalClosing(false);
    }, 250);
  };
  const selectTeam = (_name: string) => {
    setAuthed(true);
    router.replace("/");
  };

  const copy = (value: string, message: string) => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      void navigator.clipboard.writeText(value);
    }
    if (tooltipTimer.current !== null) window.clearTimeout(tooltipTimer.current);
    tooltipKey.current += 1;
    setTooltipMsg(message);
    tooltipTimer.current = window.setTimeout(() => setTooltipMsg(null), 3000);
  };

  return (
    <main
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-surface px-6 py-[100px]"
      data-node-id="4777:1209"
    >
      <div className="relative z-10 flex flex-col items-center gap-[60px]">
        <div className="flex flex-col items-center gap-3">
          <span
            className="font-bold tracking-[-0.5px] text-[#18181b]"
            style={{ fontSize: 64, lineHeight: 1.1 }}
          >
            AXHub
          </span>
          <p className="text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#18181b]">
            보안 문제없이 모두의 업무를 단순하게
          </p>
        </div>

        <button
          type="button"
          onClick={openSignupModal}
          className="flex items-center justify-center gap-2 rounded-[99px] bg-[#eaf0fe] px-6 py-4 text-base font-semibold leading-[1.5] tracking-[-0.16px] text-[#2d64fa] transition-all duration-200 ease-out hover:scale-105 hover:bg-[#dde6fc]"
          data-node-id="4777:1416"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              fill="#4285F4"
            />
            <path
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              fill="#34A853"
            />
            <path
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              fill="#FBBC05"
            />
            <path
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              fill="#EA4335"
            />
          </svg>
          구글로 시작하기
        </button>
      </div>

      {signupModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 transition-opacity duration-250"
          style={{ opacity: signupModalClosing ? 0 : 1 }}
          onClick={closeSignupModal}
        >
          <div
            className="relative flex w-[400px] flex-col items-center gap-5 rounded-2xl bg-white p-5"
            style={{
              boxShadow:
                "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
              backdropFilter: "blur(20px)",
              animation: signupModalClosing
                ? "modalScaleOut 0.25s ease-in forwards"
                : "modalScaleIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
            data-node-id="4790:1477"
          >
            <button
              type="button"
              onClick={closeSignupModal}
              aria-label="닫기"
              className="absolute right-5 top-[21px] flex size-6 items-center justify-center"
              data-node-id="4845:4597"
            >
              <Image
                src="/icons/version-b/close-icon.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>

            <div
              className="flex w-full flex-col items-center gap-6 py-10"
              data-node-id="4790:1695"
            >
              <div
                className="flex w-full flex-col gap-2"
                data-node-id="4790:1478"
              >
                <p className="w-full text-center text-[22px] font-bold leading-[1.3] tracking-[-0.22px] text-[#18181b]">
                  먼저, 가입 권한을 얻어주세요
                </p>
                <p className="w-full text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  아래 폼에서 신청할 수 있어요
                </p>
              </div>

              <button
                type="button"
                onClick={goToTeamSelect}
                className="flex items-center justify-center gap-2 rounded-[99px] bg-[#18181b] pl-6 pr-7 py-4 transition-opacity duration-200 ease-out hover:opacity-90"
                data-node-id="4790:1645"
              >
                <span className="text-base font-semibold leading-[1.5] tracking-[-0.16px] text-white">
                  AXHub 신청하기
                </span>
                <Image
                  src="/icons/version-b/external-link-icon.svg"
                  alt=""
                  width={20}
                  height={20}
                />
              </button>
            </div>

            <div
              className="flex w-full flex-col gap-4 rounded-xl bg-[#fafafa] p-4"
              data-node-id="4790:1681"
            >
              <p className="text-sm font-semibold leading-[1.5] tracking-[-0.14px] text-[#3f3f46]">
                직접 연락주셔도 좋아요!
              </p>
              <div className="flex flex-col gap-2">
                {[
                  { label: "전화", value: "02-0000-0000", message: "전화번호를 복사했어요" },
                  { label: "메일", value: "contact@jocodingax.ai", message: "이메일을 복사했어요" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center gap-5">
                    <p className="text-xs font-semibold leading-[1.3] tracking-[-0.12px] text-[#a1a1aa]">
                      {row.label}
                    </p>
                    <p className="flex-1 text-sm font-normal leading-[1.5] tracking-[-0.14px] text-[#71717a]">
                      {row.value}
                    </p>
                    <button
                      type="button"
                      onClick={() => copy(row.value, row.message)}
                      aria-label={`${row.label} 복사`}
                      className="-m-1 flex items-center justify-center rounded-md p-1 opacity-70 transition-colors transition-opacity duration-200 hover:bg-[#f1f1f3] hover:opacity-100"
                    >
                      <Image
                        src="/icons/version-b/copy-icon.svg"
                        alt=""
                        width={18}
                        height={18}
                      />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {tooltipMsg && (
              <div className="pointer-events-none absolute left-1/2 top-full z-10 mt-3 -translate-x-1/2">
                <div
                  key={tooltipKey.current}
                  className="whitespace-nowrap rounded-lg bg-[#27272a] px-2.5 py-1.5 text-sm font-medium leading-[1.5] tracking-[-0.14px] text-white"
                  style={{
                    backdropFilter: "blur(20px)",
                    boxShadow:
                      "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
                    animation: "tooltipFlash 3s cubic-bezier(0.4, 0, 0.2, 1) forwards",
                  }}
                >
                  {tooltipMsg}
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {teamModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white/60 transition-opacity duration-250"
          style={{ opacity: teamModalClosing ? 0 : 1 }}
          onClick={closeTeamModal}
        >
          <div
            className="relative flex w-[400px] flex-col items-center overflow-hidden rounded-2xl bg-white p-5"
            style={{
              boxShadow:
                "0px 2px 8px rgba(0,0,0,0.06), 0px -6px 12px rgba(0,0,0,0.03), 0px 14px 28px rgba(0,0,0,0.04)",
              backdropFilter: "blur(20px)",
              animation: teamModalClosing
                ? "modalScaleOut 0.25s ease-in forwards"
                : "modalScaleIn 0.3s ease-out",
            }}
            onClick={(e) => e.stopPropagation()}
            data-node-id="4845:4600"
          >
            <button
              type="button"
              onClick={closeTeamModal}
              aria-label="닫기"
              className="absolute right-5 top-5 flex size-6 items-center justify-center"
              data-node-id="4845:4622"
            >
              <Image
                src="/icons/version-b/close-icon.svg"
                alt=""
                width={24}
                height={24}
              />
            </button>

            <div
              className="flex w-full flex-col items-center py-10"
              data-node-id="4845:4601"
            >
              <div
                className="flex w-full flex-col gap-2"
                data-node-id="4845:4602"
              >
                <p className="w-full text-center text-[22px] font-bold leading-[1.3] tracking-[-0.22px] text-[#18181b]">
                  어느 팀으로 시작할까요?
                </p>
                <p className="w-full text-center text-base font-normal leading-[1.5] tracking-[-0.16px] text-[#71717a]">
                  나중에 바꿀 수 있어요
                </p>
              </div>
            </div>

            <div
              className="flex w-full flex-col gap-2 px-10 py-5"
              data-node-id="4845:4624"
            >
              {TEAMS.map((team) => (
                <button
                  key={team.name}
                  type="button"
                  onClick={() => selectTeam(team.name)}
                  className="group flex w-full items-center gap-3 rounded-2xl border border-[#e4e4e7] p-4 transition-colors hover:bg-[#fafafa]"
                >
                  <div className="relative flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-[10px] bg-[#f6f6f6]">
                    <Image
                      src="/icons/version-b/team-building.svg"
                      alt=""
                      width={24}
                      height={24}
                    />
                  </div>
                  <p className="flex-1 text-left text-lg font-normal leading-[1.4] tracking-[-0.18px] text-[#18181b]">
                    {team.name}
                  </p>
                  <span
                    className="flex size-7 -rotate-90 items-center justify-center opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                    aria-hidden="true"
                  >
                    <Image
                      src="/icons/version-b/team-arrow.svg"
                      alt=""
                      width={28}
                      height={28}
                    />
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

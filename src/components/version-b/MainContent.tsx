import { apps } from "../shared/data";

export default function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto bg-gray-50 p-6">
      <p className="mb-4 text-[18px] text-gray-500 tracking-[-0.18px]">
        <span className="font-semibold text-gray-900">{apps.length}</span>개 앱 사용중
      </p>
      <div className="flex flex-wrap gap-5">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex w-[240px] cursor-pointer flex-col justify-between rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden transition-all duration-200 ease-out hover:scale-[1.03] hover:shadow-lg aspect-[4/3]"
          >
            <div className="flex flex-col gap-1.5 p-4">
              <h3 className="text-[24px] font-bold text-gray-900 tracking-[-0.24px] leading-[1.3]">
                {app.name}
              </h3>
              <p className="text-xs text-gray-500 tracking-[-0.12px]">
                {app.developer}
              </p>
            </div>
            <div className="flex items-center justify-between px-4 pb-4">
              <span className="text-2xl">{app.icon}</span>
              <button
                onClick={(e) => e.stopPropagation()}
                className="flex h-8 items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-xs font-medium text-gray-500 transition-colors hover:border-gray-300 hover:text-gray-700"
              >
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
                  <path d="M5 10.5H3.5a1.5 1.5 0 01-1.5-1.5v-6A1.5 1.5 0 013.5 1.5h6A1.5 1.5 0 0111 3v1.5" />
                </svg>
                API키 복사
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

import { apps } from "../shared/data";

export default function MainContent() {
  return (
    <div className="flex-1 overflow-y-auto bg-white p-6">
      <p className="mb-4 text-[18px] text-gray-500 tracking-[-0.18px]">
        <span className="font-semibold text-gray-900">{apps.length}</span>개 앱 사용중
      </p>
      <div className="group/cards flex flex-wrap gap-5">
        {apps.map((app) => (
          <div
            key={app.id}
            className="flex w-[240px] cursor-pointer flex-col justify-between rounded-xl border border-gray-100 bg-gray-50 overflow-hidden transition-all duration-300 ease-out hover:scale-[1.05] hover:shadow-[0px_8px_24px_0px_rgba(0,0,0,0.08)] group-has-[div:hover]/cards:opacity-50 hover:!opacity-100 aspect-[4/3]"
          >
            <div className="flex flex-col gap-1.5 p-4">
              <h3 className="text-[24px] font-bold text-gray-900 tracking-[-0.24px] leading-[1.3]">
                {app.name}
              </h3>
              <p className="text-xs text-gray-500 tracking-[-0.12px]">
                {app.developer}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

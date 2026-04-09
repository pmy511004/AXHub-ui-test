export function IconMyApps({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <rect x="1" y="1" width="6" height="6" rx="1.5" />
      <rect x="9" y="1" width="6" height="6" rx="1.5" />
      <rect x="1" y="9" width="6" height="6" rx="1.5" />
      <rect x="9" y="9" width="6" height="6" rx="1.5" />
    </svg>
  );
}

export function IconTrending({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M8 1l2.245 4.55 5.02.73-3.633 3.54.857 5.001L8 12.385 3.51 14.82l.858-5L.735 6.28l5.02-.73L8 1z" />
    </svg>
  );
}

export function IconAppStore({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M2 3a1 1 0 011-1h10a1 1 0 011 1v2H2V3zm0 4h12v6a1 1 0 01-1 1H3a1 1 0 01-1-1V7zm5 2a.5.5 0 000 1h2a.5.5 0 000-1H7z" />
    </svg>
  );
}

export function IconApiStore({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 256 256" fill="currentColor">
      <path d="M128,24C74.17,24,32,48.6,32,80v96c0,31.4,42.17,56,96,56s96-24.6,96-56V80C224,48.6,181.83,24,128,24Zm80,104c0,9.62-7.88,19.43-21.61,26.92C170.93,163.35,150.19,168,128,168s-42.93-4.65-58.39-13.08C55.88,147.43,48,137.62,48,128V111.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64Zm-21.61,74.92C170.93,211.35,150.19,216,128,216s-42.93-4.65-58.39-13.08C55.88,195.43,48,185.62,48,176V159.36c17.06,15,46.23,24.64,80,24.64s62.94-9.68,80-24.64V176C208,185.62,200.12,195.43,186.39,202.92Z" />
    </svg>
  );
}

export function IconRequest({ className }: { className?: string }) {
  return (
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M4 1a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V3a2 2 0 00-2-2H4zm1 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 4zm0 3a.5.5 0 01.5-.5h5a.5.5 0 010 1h-5A.5.5 0 015 7zm0 3a.5.5 0 01.5-.5h3a.5.5 0 010 1h-3A.5.5 0 015 10z" />
    </svg>
  );
}

export const navIcons = [IconMyApps, IconTrending, IconAppStore, IconApiStore, IconRequest];

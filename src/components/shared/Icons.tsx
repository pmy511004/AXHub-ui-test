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
    <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
      <path d="M5.854 4.146a.5.5 0 10-.708.708L7.293 7H1.5a.5.5 0 000 1h5.793L5.146 10.146a.5.5 0 10.708.708l3-3a.5.5 0 000-.708l-3-3zM10.146 4.146a.5.5 0 01.708.708L8.707 7H14.5a.5.5 0 010 1H8.707l2.147 2.146a.5.5 0 01-.708.708l-3-3a.5.5 0 010-.708l3-3z" />
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

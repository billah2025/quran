// app/analytics.tsx
'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("config", "G-79KW5P3QE2", {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

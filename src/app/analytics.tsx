'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

declare global {
  interface Window {
    gtag?: (command: 'config', targetId: string, config?: Record<string, unknown>) => void;
  }
}

export function Analytics() {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
      window.gtag('config', 'G-79KW5P3QE2', {
        page_path: pathname,
      });
    }
  }, [pathname]);

  return null;
}

'use client';

import { useEffect } from 'react';
import HashLoader from 'react-spinners/HashLoader';

export default function LoadingPage() {
  useEffect(() => {
    // Set the body overflow to hidden when the component is mounted
    document.body.style.overflow = 'hidden';
    return () => {
      // Set the body overflow back to auto when the component is unmounted
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="relative inset-0 light:bg-white dark:bg-[#09090b] h-screen w-screen">
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center gap-6">
        <HashLoader color="#ee4949" loading={true} size={35} />
        <span className="text-sm">Xin vui lòng chờ ...</span>
      </div>
    </div>
  );
}

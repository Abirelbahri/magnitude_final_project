import React from 'react';

export default function FrontLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="container w-full max-w-full overflow-x-hidden bg-[#070707] px-3 m-0">
      {children}
    </main>
  );
}

import React from "react";

export function Quote({ children }: { children: React.ReactNode }) {
  return (
    <div className="m-2 flex flex-row">
      <span className="min-w-1 rounded-sm bg-black"></span>
      <blockquote className="ps-4 italic sm:ps-6">{children}</blockquote>
    </div>
  );
}

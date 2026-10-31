"use client";

import { useRef, useState } from "react";
import { Check, ChevronsUpDown, Sprout } from "lucide-react";

import { useGuardian } from "@/components/guardian/guardian-provider";
import { cn } from "@/lib/utils";

export function ChildSwitcher() {
  const { selectedChild, children, selectChild, message } = useGuardian();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  function choose(studentId: string) {
    selectChild(studentId);
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <section
      className="relative z-10 mb-6 md:max-w-md"
      aria-label="조회할 자녀 선택"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          triggerRef.current?.focus();
        }
      }}
    >
      <button
        ref={triggerRef}
        type="button"
        aria-label={`조회할 자녀 선택, 현재 ${selectedChild.name}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className="flex min-h-14 w-full items-center justify-between gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 text-left shadow-sm transition hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        <span className="flex min-w-0 items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
            <Sprout className="size-4" aria-hidden="true" />
          </span>
          <span className="min-w-0">
            <strong className="block truncate text-sm text-gray-900">
              {selectedChild.name}
            </strong>
            <span className="block truncate text-xs font-normal text-gray-500">
              {selectedChild.grade} · {selectedChild.className}
            </span>
          </span>
        </span>
        <ChevronsUpDown
          className="size-4 shrink-0 text-gray-400"
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          role="listbox"
          aria-label="연결된 자녀"
          className="absolute top-full right-0 left-0 mt-2 overflow-hidden rounded-2xl border border-gray-200 bg-white p-1.5 shadow-xl"
        >
          {children.map((child) => {
            const selected = child.id === selectedChild.id;
            return (
              <button
                key={child.id}
                type="button"
                role="option"
                aria-selected={selected}
                onClick={() => choose(child.id)}
                className={cn(
                  "flex min-h-14 w-full items-center gap-3 rounded-xl px-3 py-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  selected ? "bg-primary-50" : "hover:bg-gray-50",
                )}
              >
                <Check
                  className={cn(
                    "size-4 shrink-0",
                    selected ? "text-primary" : "opacity-0",
                  )}
                  aria-hidden="true"
                />
                <span className="min-w-0">
                  <strong className="block truncate text-sm text-gray-900">
                    {child.name}
                  </strong>
                  <span className="block truncate text-xs text-gray-500">
                    {child.grade} · {child.className}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
      <p aria-live="polite" className="sr-only">
        {message}
      </p>
    </section>
  );
}

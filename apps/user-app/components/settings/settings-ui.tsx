import Link from "next/link";
import { ChevronRight, CircleHelp, type LucideIcon } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function ProfileSummary({
  name,
  role,
  academy,
  details,
}: {
  name: string;
  role: string;
  academy: string;
  details: string;
}) {
  return (
    <section className="rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-blue-50 p-5 sm:p-6">
      <div className="flex min-w-0 items-center gap-4">
        <Avatar className="size-16 shrink-0 ring-4 ring-white">
          <AvatarFallback
            className="bg-primary text-lg font-bold text-primary-foreground"
            aria-label={`${name} 프로필`}
          >
            {name.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="break-keep text-xl font-bold text-gray-900">
              {name}
            </h2>
            <Badge variant="secondary" className="rounded-full">
              {role}
            </Badge>
          </div>
          <p className="mt-1 break-keep text-sm text-gray-600">{academy}</p>
          <p className="mt-1 break-keep text-xs text-gray-500">{details}</p>
        </div>
      </div>
    </section>
  );
}

export function SettingsSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <div className="mb-3">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
        {description ? (
          <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
        ) : null}
      </div>
      <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white">
        {children}
      </div>
    </section>
  );
}

export function SettingLink({
  href,
  icon: Icon,
  label,
  description,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group flex min-h-16 min-w-0 items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
    >
      <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
        <Icon className="size-4" aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-semibold text-gray-900">
          {label}
        </span>
        <span className="mt-0.5 block break-keep text-xs leading-5 text-gray-500">
          {description}
        </span>
      </span>
      <ChevronRight
        className="size-4 shrink-0 text-gray-300 group-hover:text-primary-600"
        aria-hidden="true"
      />
    </Link>
  );
}

export function UnavailableSetting({
  label,
  description,
}: {
  label: string;
  description: string;
}) {
  return (
    <div className="flex min-h-16 min-w-0 items-center gap-3 border-b border-gray-100 px-4 py-3 last:border-b-0">
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="text-sm font-semibold text-gray-700">{label}</p>
          <Badge variant="secondary" className="rounded-full text-[0.6875rem]">
            준비 중
          </Badge>
        </div>
        <p className="mt-1 break-keep text-xs leading-5 text-gray-500">
          {description}
        </p>
      </div>
    </div>
  );
}

export function FaqList({
  items,
}: {
  items: ReadonlyArray<{ question: string; answer: string }>;
}) {
  return (
    <div className="divide-y divide-gray-100">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex min-h-14 cursor-pointer list-none items-center gap-3 px-4 py-3 text-sm font-semibold text-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary [&::-webkit-details-marker]:hidden">
            <CircleHelp
              className="size-4 shrink-0 text-primary-600"
              aria-hidden="true"
            />
            <span className="min-w-0 flex-1 break-keep">{item.question}</span>
            <ChevronRight
              className="size-4 shrink-0 text-gray-400 transition-transform group-open:rotate-90"
              aria-hidden="true"
            />
          </summary>
          <p className="bg-gray-50 px-11 py-4 text-sm leading-6 text-gray-600">
            {item.answer}
          </p>
        </details>
      ))}
    </div>
  );
}

export function InfoGrid({
  items,
  className,
}: {
  items: ReadonlyArray<[string, string | number]>;
  className?: string;
}) {
  return (
    <dl className={cn("divide-y divide-gray-100", className)}>
      {items.map(([label, value]) => (
        <div
          key={label}
          className="grid min-h-12 grid-cols-[6.5rem_minmax(0,1fr)] items-center gap-3 px-4 py-3 text-sm"
        >
          <dt className="text-gray-500">{label}</dt>
          <dd className="min-w-0 break-words text-right font-semibold text-gray-800">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}

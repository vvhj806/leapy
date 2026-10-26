import type { ReactNode } from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, ChevronRight } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ProfileSummary({
  name,
  role,
  summary,
  initials,
}: {
  name: string;
  role: string;
  summary: string;
  initials: string;
}) {
  return (
    <section
      aria-label={`${role} 오늘 요약`}
      className="flex w-full max-w-full min-w-0 items-center gap-3 overflow-hidden rounded-2xl bg-primary-50/70 px-4 py-4 sm:gap-4 sm:px-5"
    >
      <Avatar className="size-11 shrink-0 ring-4 ring-white sm:size-12">
        <AvatarFallback className="bg-primary-100 font-bold text-primary-700">
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <div className="flex flex-col items-start gap-1 min-[390px]:flex-row min-[390px]:items-center min-[390px]:gap-2">
          <h2 className="text-lg font-bold tracking-tight text-gray-900">
            안녕하세요, {name}님
          </h2>
          <Badge
            variant="secondary"
            className="rounded-full bg-white text-[0.6875rem] text-primary-700"
          >
            {role}
          </Badge>
        </div>
        <p className="mt-1 text-sm leading-5 text-gray-600">{summary}</p>
      </div>
    </section>
  );
}

export function SectionHeader({
  id,
  title,
  description,
  href,
  linkLabel = "전체 보기",
}: {
  id?: string;
  title: string;
  description?: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="flex min-h-11 items-center justify-between gap-4">
      <div className="min-w-0">
        <h2 id={id} className="text-lg font-bold tracking-tight text-gray-900">
          {title}
        </h2>
        {description ? (
          <p className="mt-1 text-sm text-gray-500">{description}</p>
        ) : null}
      </div>
      {href ? (
        <Link
          href={href}
          className="inline-flex min-h-11 shrink-0 items-center gap-1 text-sm font-semibold text-primary-700 hover:text-primary-800 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          {linkLabel}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}

export function CompactActionMenu({
  items,
}: {
  items: readonly { label: string; href: string; icon: LucideIcon }[];
}) {
  return (
    <nav aria-label="빠른 메뉴" className="grid grid-cols-4 gap-2 sm:gap-3">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group flex min-h-20 min-w-0 flex-col items-center justify-center gap-2 rounded-2xl bg-white px-1 py-3 text-center shadow-[0_6px_20px_rgba(17,24,39,0.035)] ring-1 ring-gray-100 transition hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <span className="flex size-8 items-center justify-center rounded-xl bg-primary-50 text-primary-700 transition-colors group-hover:bg-white">
            <item.icon className="size-4" aria-hidden="true" />
          </span>
          <span className="whitespace-nowrap text-xs font-semibold text-gray-700">
            {item.label}
          </span>
        </Link>
      ))}
    </nav>
  );
}

export function HorizontalCardList({
  label,
  children,
  className,
}: {
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="region"
      aria-label={label}
      tabIndex={0}
      className={cn(
        "flex w-full max-w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 [scrollbar-width:none] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 lg:grid lg:overflow-visible lg:pb-0 lg:pr-0 [&::-webkit-scrollbar]:hidden",
        className,
      )}
    >
      {children}
    </div>
  );
}

export type NoticeItem = {
  title: string;
  date: string;
  important: boolean;
  unread: boolean;
};

export function NoticeListCard({
  items,
  href,
}: {
  items: readonly NoticeItem[];
  href: string;
}) {
  return (
    <Card className="gap-0 rounded-2xl border border-gray-100 py-0 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
      <CardContent className="divide-y divide-gray-100 px-0">
        {items.map((notice) => (
          <Link
            key={notice.title}
            href={href}
            className="flex min-h-16 items-center gap-3 px-4 py-3 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300 sm:px-5"
          >
            <span className="min-w-0 flex-1">
              <span className="flex items-center gap-2">
                <span className="truncate text-sm font-semibold text-gray-800">
                  {notice.title}
                </span>
                {notice.unread ? (
                  <span
                    className="size-1.5 shrink-0 rounded-full bg-primary-600"
                    aria-label="읽지 않음"
                  />
                ) : null}
              </span>
              <span className="mt-1 block text-xs text-gray-500">
                {notice.date}
              </span>
            </span>
            {notice.important ? (
              <Badge className="rounded-lg bg-red-50 text-red-700">중요</Badge>
            ) : null}
            <ChevronRight
              className="size-4 shrink-0 text-gray-400"
              aria-hidden="true"
            />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function WelcomeBanner({
  title,
  description,
  eyebrow,
}: {
  title: string;
  description: string;
  eyebrow: string;
}) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-50 via-white to-secondary-50 p-6 sm:p-8">
      <div className="absolute -top-16 -right-12 size-44 rounded-full bg-primary-200/45 blur-2xl" />
      <div className="relative max-w-xl">
        <p className="flex items-center gap-2 text-sm font-semibold text-primary-700">
          <Sparkles className="size-4" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          {title}
        </h2>
        <p className="mt-2 text-sm leading-6 text-gray-600 sm:text-base">
          {description}
        </p>
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
      <div>
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

const toneClasses = {
  primary: "bg-primary-50 text-primary-700",
  success: "bg-green-50 text-green-700",
  warning: "bg-orange-50 text-orange-700",
  danger: "bg-red-50 text-red-700",
  info: "bg-blue-50 text-blue-700",
  neutral: "bg-gray-100 text-gray-700",
};

export function SummaryCard({
  label,
  value,
  detail,
  icon: Icon,
  tone = "primary",
}: {
  label: string;
  value: string | number;
  detail?: string;
  icon: LucideIcon;
  tone?: keyof typeof toneClasses;
}) {
  return (
    <Card className="gap-0 rounded-2xl border border-gray-100 py-5 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
      <CardContent className="flex items-start justify-between gap-4 px-5">
        <div>
          <p className="text-sm font-medium text-gray-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-gray-900">{value}</p>
          {detail ? (
            <p className="mt-1 text-xs leading-5 text-gray-500">{detail}</p>
          ) : null}
        </div>
        <span
          className={cn(
            "flex size-10 shrink-0 items-center justify-center rounded-xl",
            toneClasses[tone],
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
      </CardContent>
    </Card>
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
            className="flex min-h-16 items-center gap-3 px-5 py-4 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300"
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
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

export function QuickActionGrid({
  items,
}: {
  items: readonly { label: string; href: string; icon: LucideIcon }[];
}) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="flex min-h-24 flex-col justify-between rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_6px_20px_rgba(17,24,39,0.035)] transition hover:-translate-y-0.5 hover:border-primary-200 hover:bg-primary-50/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
        >
          <item.icon className="size-5 text-primary-700" aria-hidden="true" />
          <span className="text-sm font-semibold text-gray-800">
            {item.label}
          </span>
        </Link>
      ))}
    </div>
  );
}

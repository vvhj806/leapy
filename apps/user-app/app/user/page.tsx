import Link from "next/link";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  CompactActionMenu,
  HorizontalCardList,
  NoticeListCard,
  ProfileSummary,
  SectionHeader,
} from "@/components/dashboard/dashboard-ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { userDashboardMock as dashboard } from "@/lib/mock/dashboard";

const quickActions = [
  { label: "출결", href: "/user/attendance", icon: CheckCircle2 },
  { label: "공지", href: "/user/notice", icon: Bell },
  { label: "일정", href: "/user/schedule", icon: CalendarDays },
  { label: "리포트", href: "/user/report", icon: ClipboardList },
] as const;

export default function UserPage() {
  return (
    <main className="w-full max-w-full min-w-0 space-y-8">
      <h1 className="sr-only">학생·학부모 대시보드</h1>

      <ProfileSummary
        name={dashboard.displayName}
        role="학생 · 학부모"
        initials="사용"
        summary={`오늘은 ${dashboard.todayClass.subject} 수업이 있어요 · ${dashboard.attendance.status}`}
      />

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <section
          aria-labelledby="user-today-heading"
          className="min-w-0 lg:col-span-8"
        >
          <SectionHeader id="user-today-heading" title="오늘의 핵심" />
          <Card className="relative mt-3 w-full max-w-full min-w-0 overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-700 to-primary-500 py-0 text-white shadow-[0_16px_36px_rgba(109,40,217,0.2)] ring-0">
            <div
              className="absolute -top-12 right-0 size-36 rounded-full bg-white/10"
              aria-hidden="true"
            />
            <CardContent className="relative p-5 sm:p-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-primary-100">
                    오늘 수업
                  </p>
                  <h2 className="mt-1 text-2xl font-bold tracking-tight">
                    {dashboard.todayClass.subject}
                  </h2>
                </div>
                <Badge className="rounded-full bg-white/15 text-white ring-1 ring-white/20">
                  <CheckCircle2 className="size-3.5" aria-hidden="true" />
                  {dashboard.attendance.status}
                </Badge>
              </div>

              <div className="mt-6 grid gap-3 text-sm text-primary-50 sm:grid-cols-3">
                <p className="flex items-center gap-2">
                  <Clock3 className="size-4 shrink-0" aria-hidden="true" />
                  {dashboard.todayClass.time}
                </p>
                <p className="flex items-center gap-2">
                  <UserRound className="size-4 shrink-0" aria-hidden="true" />
                  {dashboard.todayClass.teacher}
                </p>
                <p className="flex items-center gap-2">
                  <MapPin className="size-4 shrink-0" aria-hidden="true" />
                  {dashboard.todayClass.location}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-primary-100">
                <span>출석 확인 {dashboard.attendance.checkedAt}</span>
                <Link
                  href="/user/attendance"
                  className="inline-flex min-h-11 items-center gap-1 font-semibold text-white focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  출결 보기
                  <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        <section
          aria-labelledby="user-quick-heading"
          className="min-w-0 lg:col-span-4"
        >
          <SectionHeader id="user-quick-heading" title="빠른 메뉴" />
          <div className="mt-3">
            <CompactActionMenu items={quickActions} />
          </div>
        </section>
      </div>

      <section
        aria-labelledby="user-schedule-heading"
        className="w-full max-w-full min-w-0 overflow-hidden"
      >
        <SectionHeader
          id="user-schedule-heading"
          title="이번 주 일정"
          href="/user/schedule"
        />
        <div className="mt-3">
          <HorizontalCardList
            label="이번 주 일정, 가로로 스크롤할 수 있습니다"
            className="lg:grid-cols-3"
          >
            {dashboard.schedules.map((schedule, index) => (
              <Link
                key={schedule.title}
                href="/user/schedule"
                className="w-auto max-w-none basis-[82%] shrink-0 snap-start rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.04)] transition hover:border-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 lg:basis-auto"
              >
                <div className="flex items-center justify-between gap-3">
                  <Badge
                    variant="secondary"
                    className="rounded-full text-primary-700"
                  >
                    {schedule.date}
                  </Badge>
                  <span className="text-xs font-medium text-gray-400">
                    {index === 0 ? "오늘" : "예정"}
                  </span>
                </div>
                <h3 className="mt-4 font-bold text-gray-900">
                  {schedule.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{schedule.detail}</p>
              </Link>
            ))}
          </HorizontalCardList>
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <section
          aria-labelledby="user-notice-heading"
          className="min-w-0 lg:col-span-7"
        >
          <SectionHeader
            id="user-notice-heading"
            title="최근 공지"
            href="/user/notice"
          />
          <div className="mt-3">
            <NoticeListCard items={dashboard.notices} href="/user/notice" />
          </div>
        </section>

        <section
          aria-labelledby="user-report-heading"
          className="min-w-0 lg:col-span-5"
        >
          <SectionHeader
            id="user-report-heading"
            title="최근 학습 리포트"
            href="/user/report"
          />
          <Card className="mt-3 gap-0 rounded-2xl border border-primary-100 py-0 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
            <CardContent className="p-5">
              <div className="flex items-start gap-3">
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <BookOpen className="size-5" aria-hidden="true" />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-gray-900">
                    {dashboard.report.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {dashboard.report.period}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-700">학습 진도율</span>
                <span className="tabular-nums text-gray-500">
                  {dashboard.report.progress}%
                </span>
              </div>
              <Progress
                value={dashboard.report.progress}
                aria-label={`학습 진도율 ${dashboard.report.progress}%`}
                className="mt-2"
              />
              <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-600">
                {dashboard.report.comment}
              </p>
            </CardContent>
          </Card>
        </section>
      </div>
    </main>
  );
}

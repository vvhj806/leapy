import Link from "next/link";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import {
  NoticeListCard,
  QuickActionGrid,
  SectionHeader,
  WelcomeBanner,
} from "@/components/dashboard/dashboard-ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { userDashboardMock as dashboard } from "@/lib/mock/dashboard";

const quickActions = [
  { label: "출결 확인", href: "/user/attendance", icon: CheckCircle2 },
  { label: "공지 보기", href: "/user/notice", icon: Bell },
  { label: "일정 보기", href: "/user/schedule", icon: CalendarDays },
  { label: "리포트 보기", href: "/user/report", icon: ClipboardList },
] as const;

export default function UserPage() {
  return (
    <main className="space-y-6 sm:space-y-8">
      <h1 className="sr-only">학생·학부모 대시보드</h1>
      <WelcomeBanner
        eyebrow="오늘의 Leapy"
        title={`안녕하세요, ${dashboard.displayName}님`}
        description="오늘도 즐겁게 배우고 한 걸음 더 성장해 볼까요?"
      />

      <section aria-labelledby="user-today-heading">
        <SectionHeader
          id="user-today-heading"
          title="오늘 한눈에 보기"
          description="출석 상태와 예정된 수업이에요."
        />
        <div className="mt-3 grid gap-4 md:grid-cols-2">
          <Card className="gap-0 rounded-2xl border border-green-100 bg-green-50/60 py-5 shadow-none ring-0">
            <CardContent className="px-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    오늘 출석 상태
                  </p>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {dashboard.attendance.status}
                  </p>
                  <p className="mt-2 flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock3 className="size-4" aria-hidden="true" />
                    {dashboard.attendance.checkedAt} 입실
                  </p>
                </div>
                <Badge className="rounded-lg bg-green-100 text-green-700">
                  <CheckCircle2 className="size-3" aria-hidden="true" />
                  출석
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="gap-0 rounded-2xl border border-primary-100 py-5 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
            <CardContent className="px-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">오늘 수업</p>
                  <p className="mt-2 text-xl font-bold text-gray-900">
                    {dashboard.todayClass.subject}
                  </p>
                </div>
                <span className="flex size-10 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                  <BookOpen className="size-5" aria-hidden="true" />
                </span>
              </div>
              <div className="mt-4 grid gap-2 text-sm text-gray-600 sm:grid-cols-2">
                <div className="flex items-center gap-2">
                  <Clock3 className="size-4" aria-hidden="true" />
                  <span>{dashboard.todayClass.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <UserRound className="size-4" aria-hidden="true" />
                  <span>{dashboard.todayClass.teacher}</span>
                </div>
                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="size-4" aria-hidden="true" />
                  <span>{dashboard.todayClass.location}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section aria-labelledby="user-quick-heading">
        <SectionHeader id="user-quick-heading" title="빠른 메뉴" />
        <div className="mt-3">
          <QuickActionGrid items={quickActions} />
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <section
          aria-labelledby="user-notice-heading"
          className="lg:col-span-7"
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
          aria-labelledby="user-schedule-heading"
          className="lg:col-span-5"
        >
          <SectionHeader
            id="user-schedule-heading"
            title="이번 주 일정"
            href="/user/schedule"
          />
          <Card className="mt-3 gap-0 rounded-2xl border border-gray-100 py-0 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
            <CardContent className="divide-y divide-gray-100 px-5">
              {dashboard.schedules.map((schedule) => (
                <div key={schedule.title} className="flex gap-4 py-4">
                  <div className="w-16 shrink-0 text-sm font-semibold text-primary-700">
                    {schedule.date}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-gray-800">
                      {schedule.title}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">
                      {schedule.detail}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </section>
      </div>

      <section aria-labelledby="user-report-heading">
        <SectionHeader
          id="user-report-heading"
          title="최근 학습 리포트"
          href="/user/report"
        />
        <Card className="mt-3 gap-0 rounded-2xl border border-primary-100 py-6 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
          <CardContent className="grid gap-6 px-5 md:grid-cols-[1fr_1.1fr] md:px-6">
            <div>
              <Badge variant="secondary" className="rounded-lg">
                최신 리포트
              </Badge>
              <h3 className="mt-3 text-lg font-bold text-gray-900">
                {dashboard.report.title}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                평가 기간 {dashboard.report.period}
              </p>
              <div className="mt-5 flex items-center justify-between text-sm">
                <span className="font-medium text-gray-800">학습 진도율</span>
                <span className="tabular-nums text-gray-500">
                  {dashboard.report.progress}%
                </span>
              </div>
              <Progress
                value={dashboard.report.progress}
                aria-label={`학습 진도율 ${dashboard.report.progress}%`}
                className="mt-2"
              />
            </div>
            <div className="rounded-2xl bg-gray-50 p-5">
              <p className="text-sm font-semibold text-gray-800">
                선생님 코멘트
              </p>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {dashboard.report.comment}
              </p>
              <Link
                href="/user/report"
                className="mt-4 inline-flex min-h-11 items-center text-sm font-semibold text-primary-700 hover:text-primary-800 focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                리포트 자세히 보기
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}

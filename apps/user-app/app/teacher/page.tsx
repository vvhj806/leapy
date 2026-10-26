import Link from "next/link";
import {
  Bell,
  BookOpenCheck,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  School,
  Users,
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
import { teacherDashboardMock as dashboard } from "@/lib/mock/dashboard";
import { cn } from "@/lib/utils";

const quickActions = [
  {
    label: "출결 처리",
    href: "/teacher/attendance",
    icon: CheckCircle2,
  },
  { label: "반 관리", href: "/teacher/classes", icon: Users },
  { label: "리포트", href: "/teacher/reports", icon: ClipboardList },
  { label: "공지", href: "/teacher/notice", icon: Bell },
] as const;

const statusTone = {
  success: "bg-green-50 text-green-700 ring-green-100",
  warning: "bg-orange-50 text-orange-700 ring-orange-100",
  danger: "bg-red-50 text-red-700 ring-red-100",
  neutral: "bg-gray-100 text-gray-700 ring-gray-200",
};

const taskTone = {
  warning: "bg-orange-50 text-orange-700",
  primary: "bg-primary-50 text-primary-700",
  info: "bg-blue-50 text-blue-700",
  neutral: "bg-gray-100 text-gray-700",
};

const taskIcons = [ClipboardCheck, ClipboardList, Bell, Users] as const;

export default function TeacherPage() {
  return (
    <main className="w-full max-w-full min-w-0 space-y-8">
      <h1 className="sr-only">선생님 대시보드</h1>

      <ProfileSummary
        name={dashboard.displayName}
        role="선생님"
        initials="선생"
        summary={`오늘 수업 ${dashboard.classSummary.total}개 · 미처리 출결 ${dashboard.attendance[3].value}건`}
      />

      <section aria-labelledby="teacher-today-heading">
        <SectionHeader id="teacher-today-heading" title="오늘의 업무" />
        <Card className="relative mt-3 w-full max-w-full min-w-0 overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-700 to-primary-500 py-0 text-white shadow-[0_16px_36px_rgba(109,40,217,0.2)] ring-0">
          <div
            className="absolute -top-16 right-0 size-44 rounded-full bg-white/10"
            aria-hidden="true"
          />
          <CardContent className="relative p-5 sm:p-6">
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary-100">
                  다음 수업
                </p>
                <h2 className="mt-1 text-2xl leading-tight font-bold tracking-tight break-keep">
                  {dashboard.classSummary.nextClass}
                </h2>
                <p className="mt-3 flex items-center gap-2 text-sm text-primary-50">
                  <Clock3 className="size-4" aria-hidden="true" />
                  {dashboard.classSummary.nextTime}
                </p>
              </div>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-white/15 ring-1 ring-white/20">
                <BookOpenCheck className="size-5" aria-hidden="true" />
              </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 border-t border-white/15 pt-4 text-sm text-primary-50">
              <span>오늘 수업 {dashboard.classSummary.total}개</span>
              <span>수업 학생 {dashboard.classSummary.studentCount}명</span>
              <Link
                href="/teacher/classes"
                className="ml-auto inline-flex min-h-11 items-center gap-1 font-semibold text-white focus-visible:rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                반 확인
                <ChevronRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      <section aria-labelledby="teacher-attendance-heading">
        <SectionHeader
          id="teacher-attendance-heading"
          title="오늘 출결 현황"
          href="/teacher/attendance"
          linkLabel="출결 처리"
        />
        <div
          role="group"
          aria-label="오늘 출결 상태"
          className="mt-3 grid w-full max-w-full min-w-0 grid-cols-2 gap-2 min-[390px]:grid-cols-4"
        >
          {dashboard.attendance.map((item) => (
            <Link
              key={item.label}
              href="/teacher/attendance"
              className={cn(
                "flex min-h-14 min-w-0 items-center justify-between gap-1 rounded-2xl px-3 py-2 ring-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300",
                statusTone[item.tone],
              )}
            >
              <span className="text-xs font-semibold sm:text-sm">
                {item.label}
              </span>
              <strong className="text-base tabular-nums sm:text-lg">
                {item.value}명
              </strong>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-8 lg:grid-cols-12 lg:items-start">
        <section
          aria-labelledby="teacher-classes-heading"
          className="min-w-0 overflow-hidden lg:col-span-7"
        >
          <SectionHeader
            id="teacher-classes-heading"
            title="담당 반"
            href="/teacher/classes"
          />
          <div className="mt-3">
            <HorizontalCardList
              label="담당 반, 가로로 스크롤할 수 있습니다"
              className="lg:grid-cols-3"
            >
              {dashboard.classes.map((classItem) => (
                <Link
                  key={classItem.name}
                  href="/teacher/classes"
                  className="w-auto max-w-none basis-[82%] shrink-0 snap-start rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.04)] transition hover:border-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 lg:basis-auto"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                      <School className="size-4" aria-hidden="true" />
                    </span>
                    <ChevronRight
                      className="size-4 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                  <h3 className="mt-4 line-clamp-2 leading-snug font-bold break-keep text-gray-900">
                    {classItem.name}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">
                    {classItem.subject} · {classItem.students}명
                  </p>
                  <p className="mt-4 text-xs font-semibold text-primary-700">
                    {classItem.nextTime}
                  </p>
                </Link>
              ))}
            </HorizontalCardList>
          </div>
        </section>

        <section
          aria-labelledby="teacher-tasks-heading"
          className="min-w-0 lg:col-span-5"
        >
          <SectionHeader
            id="teacher-tasks-heading"
            title="처리 필요"
            description="우선 확인할 업무예요."
          />
          <Card className="mt-3 gap-0 rounded-2xl border border-gray-100 py-0 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
            <CardContent className="divide-y divide-gray-100 px-0">
              {dashboard.tasks.map((task, index) => {
                const Icon = taskIcons[index];

                return (
                  <Link
                    key={task.title}
                    href={task.href}
                    className="flex min-h-16 items-center gap-3 px-4 py-3 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300 sm:px-5"
                  >
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-600">
                      <Icon className="size-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1 text-sm font-semibold text-gray-800">
                      {task.title}
                    </span>
                    <Badge className={cn("rounded-full", taskTone[task.tone])}>
                      {task.count}건
                    </Badge>
                    <ChevronRight
                      className="size-4 shrink-0 text-gray-400"
                      aria-hidden="true"
                    />
                  </Link>
                );
              })}
            </CardContent>
          </Card>
        </section>
      </div>

      <section aria-labelledby="teacher-quick-heading">
        <SectionHeader id="teacher-quick-heading" title="빠른 업무" />
        <div className="mt-3">
          <CompactActionMenu items={quickActions} />
        </div>
      </section>

      <section aria-labelledby="teacher-notice-heading">
        <SectionHeader
          id="teacher-notice-heading"
          title="최근 공지"
          href="/teacher/notice"
        />
        <div className="mt-3">
          <NoticeListCard items={dashboard.notices} href="/teacher/notice" />
        </div>
      </section>
    </main>
  );
}

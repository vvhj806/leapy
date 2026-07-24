import Link from "next/link";
import {
  Bell,
  BookOpenCheck,
  CheckCircle2,
  ClipboardCheck,
  ClipboardList,
  Clock3,
  School,
  Users,
} from "lucide-react";

import {
  NoticeListCard,
  QuickActionGrid,
  SectionHeader,
  SummaryCard,
  WelcomeBanner,
} from "@/components/dashboard/dashboard-ui";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { teacherDashboardMock as dashboard } from "@/lib/mock/dashboard";
import { cn } from "@/lib/utils";

const quickActions = [
  { label: "출결 처리", href: "/teacher/attendance", icon: CheckCircle2 },
  { label: "반 관리", href: "/teacher/classes", icon: Users },
  { label: "리포트 작성", href: "/teacher/reports", icon: ClipboardList },
  { label: "공지 확인", href: "/teacher/notice", icon: Bell },
] as const;

const attendanceIcons = [
  CheckCircle2,
  Clock3,
  ClipboardCheck,
  BookOpenCheck,
] as const;

const taskTone = {
  warning: "bg-orange-50 text-orange-700",
  primary: "bg-primary-50 text-primary-700",
  info: "bg-blue-50 text-blue-700",
  neutral: "bg-gray-100 text-gray-700",
};

export default function TeacherPage() {
  return (
    <main className="space-y-6 sm:space-y-8">
      <h1 className="sr-only">선생님 대시보드</h1>
      <WelcomeBanner
        eyebrow="오늘의 업무"
        title={`안녕하세요, ${dashboard.displayName}`}
        description="오늘 수업과 출결 현황을 빠르게 확인하고 필요한 업무를 처리하세요."
      />

      <section aria-labelledby="teacher-class-summary-heading">
        <SectionHeader
          id="teacher-class-summary-heading"
          title="오늘 수업 요약"
          description="예정된 수업과 다음 일정을 확인하세요."
        />
        <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
          <SummaryCard
            label="전체 수업"
            value={`${dashboard.classSummary.total}개`}
            icon={BookOpenCheck}
          />
          <SummaryCard
            label="다음 수업"
            value={dashboard.classSummary.nextTime}
            icon={Clock3}
            tone="info"
          />
          <SummaryCard
            label="다음 반"
            value={dashboard.classSummary.nextClass}
            icon={School}
            tone="primary"
          />
          <SummaryCard
            label="수업 학생"
            value={`${dashboard.classSummary.studentCount}명`}
            icon={Users}
            tone="success"
          />
        </div>
      </section>

      <section aria-labelledby="teacher-attendance-heading">
        <SectionHeader
          id="teacher-attendance-heading"
          title="오늘 출결 현황"
          href="/teacher/attendance"
          linkLabel="출결 처리"
        />
        <div className="mt-3 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {dashboard.attendance.map((item, index) => (
            <SummaryCard
              key={item.label}
              label={item.label}
              value={`${item.value}명`}
              icon={attendanceIcons[index]}
              tone={item.tone}
            />
          ))}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-12">
        <section
          aria-labelledby="teacher-classes-heading"
          className="lg:col-span-7"
        >
          <SectionHeader
            id="teacher-classes-heading"
            title="담당 반"
            href="/teacher/classes"
          />
          <Card className="mt-3 gap-0 rounded-2xl border border-gray-100 py-0 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
            <CardContent className="divide-y divide-gray-100 px-0">
              {dashboard.classes.map((classItem) => (
                <Link
                  key={classItem.name}
                  href="/teacher/classes"
                  className="flex min-h-20 items-center gap-4 px-5 py-4 transition-colors hover:bg-primary-50/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary-300"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary-50 text-primary-700">
                    <School className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-semibold text-gray-800">
                      {classItem.name}
                    </span>
                    <span className="mt-1 block text-xs text-gray-500">
                      {classItem.subject} · {classItem.students}명
                    </span>
                  </span>
                  <span className="hidden text-right text-xs font-medium text-gray-500 sm:block">
                    {classItem.nextTime}
                  </span>
                </Link>
              ))}
            </CardContent>
          </Card>
        </section>

        <section
          aria-labelledby="teacher-tasks-heading"
          className="lg:col-span-5"
        >
          <SectionHeader
            id="teacher-tasks-heading"
            title="처리 필요"
            description="우선 확인할 업무예요."
          />
          <div className="mt-3 grid gap-3">
            {dashboard.tasks.map((task) => (
              <Link
                key={task.title}
                href={task.href}
                className="flex min-h-16 items-center justify-between rounded-2xl border border-gray-100 bg-white px-5 py-3 shadow-[0_6px_20px_rgba(17,24,39,0.035)] transition hover:border-primary-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
              >
                <span className="text-sm font-semibold text-gray-800">
                  {task.title}
                </span>
                <Badge className={cn("rounded-lg", taskTone[task.tone])}>
                  {task.count}건
                </Badge>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <section aria-labelledby="teacher-quick-heading">
        <SectionHeader id="teacher-quick-heading" title="빠른 업무" />
        <div className="mt-3">
          <QuickActionGrid items={quickActions} />
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

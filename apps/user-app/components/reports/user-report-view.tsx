import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  ChevronRight,
  ClipboardList,
} from "lucide-react";

import { Progress } from "@/components/ui/progress";
import {
  formatReportDate,
  formatReportPeriod,
  getProgressRate,
  getReportContext,
  type LearningReport,
} from "@/lib/mock/reports";

export function UserReportView({ reports }: { reports: LearningReport[] }) {
  if (!reports.length)
    return (
      <main className="!text-base !font-normal">
        <div className="mx-auto flex min-h-80 max-w-lg flex-col items-center justify-center text-center">
          <ClipboardList className="size-8 text-gray-300" />
          <h1 className="mt-4 text-xl font-bold">학습 리포트가 아직 없어요.</h1>
          <p className="mt-2 text-sm text-gray-500">
            발행된 리포트가 생기면 이곳에서 확인할 수 있어요.
          </p>
        </div>
      </main>
    );
  const latest = reports[0];
  const context = getReportContext(latest);
  const progress = getProgressRate(latest);
  const assessment = latest.assessments.find(
    (item) => item.score !== undefined,
  );
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            학습 리포트
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            학습 과정과 성장 기록을 확인하세요.
          </p>
          <p className="mt-2 text-xs font-semibold text-primary-700">
            {formatReportPeriod(latest.period)} 학습 리포트
          </p>
        </header>
        <section
          aria-labelledby="latest-report-heading"
          className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4 sm:p-6"
        >
          <p className="flex items-center gap-2 text-xs font-bold text-primary-700">
            <BookOpen className="size-4" />
            이번 달 학습 기록
          </p>
          <h2
            id="latest-report-heading"
            className="mt-3 text-xl font-bold text-gray-900"
          >
            {context.academyClass?.name}
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {context.student?.name} · {context.academyClass?.teacherName}
          </p>
          <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-700">
            {latest.summary}
          </p>
          <Link
            href={`/user/report/${latest.id}`}
            className="mt-4 inline-flex min-h-11 items-center gap-1 text-sm font-bold text-primary-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            리포트 자세히 보기
            <ArrowRight className="size-4" />
          </Link>
        </section>
        <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
          <div className="space-y-8">
            <section aria-labelledby="learning-metrics-heading">
              <h2
                id="learning-metrics-heading"
                className="text-lg font-bold text-gray-900"
              >
                주요 학습 지표
              </h2>
              <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
                <div className="flex justify-between text-sm">
                  <span className="font-semibold">학습 진도</span>
                  <strong className="text-primary-700">{progress}%</strong>
                </div>
                <Progress
                  value={progress ?? 0}
                  aria-label={`학습 진도 ${progress}%`}
                  className="mt-2"
                />
                <dl className="mt-5 grid grid-cols-3 divide-x divide-gray-100 text-center">
                  <div>
                    <dt className="text-xs text-gray-400">과제</dt>
                    <dd className="mt-1 font-bold">
                      {latest.assignments.completed}/{latest.assignments.total}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400">최근 평가</dt>
                    <dd className="mt-1 font-bold">
                      {assessment?.score !== undefined
                        ? `${assessment.score}점`
                        : "서술형"}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-gray-400">출석</dt>
                    <dd className="mt-1 font-bold">
                      {latest.attendance
                        ? `${latest.attendance.present}회`
                        : "미표시"}
                    </dd>
                  </div>
                </dl>
              </div>
            </section>
            <section aria-labelledby="subject-progress-heading">
              <h2
                id="subject-progress-heading"
                className="text-lg font-bold text-gray-900"
              >
                과목별 학습 현황
              </h2>
              <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-4">
                <p className="text-xs font-semibold text-primary-700">
                  {context.academyClass?.subject}
                </p>
                <h3 className="mt-1 font-bold text-gray-900">
                  {context.academyClass?.name}
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  현재 단원 · {latest.progress.currentUnit}
                </p>
                <p className="mt-3 text-xs text-gray-500">
                  {latest.progress.completedUnits}/{latest.progress.totalUnits}
                  단원 완료 · 진도 {progress}%
                </p>
              </div>
            </section>
          </div>
          <section aria-labelledby="feedback-preview-heading">
            <h2
              id="feedback-preview-heading"
              className="text-lg font-bold text-gray-900"
            >
              선생님 피드백
            </h2>
            <div className="mt-3 space-y-3">
              {[
                ["잘하고 있는 점", latest.feedback.strengths],
                ["보완하면 좋은 점", latest.feedback.improvements],
                ["다음 학습 목표", latest.feedback.nextGoals],
              ].map(([title, text]) => (
                <div key={title} className="rounded-2xl bg-gray-50 p-4">
                  <h3 className="text-sm font-bold text-gray-900">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
        <section aria-labelledby="previous-reports-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2
              id="previous-reports-heading"
              className="text-lg font-bold text-gray-900"
            >
              이전 리포트
            </h2>
            <span className="text-xs text-gray-500">
              발행 완료 {reports.length}개
            </span>
          </div>
          <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
            {reports.map((report) => {
              const itemContext = getReportContext(report);
              return (
                <li key={report.id}>
                  <Link
                    href={`/user/report/${report.id}`}
                    className="group flex min-h-20 items-center gap-3 px-4 py-4 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                  >
                    <span className="min-w-0 flex-1">
                      <strong className="block text-sm text-gray-900">
                        {report.title}
                      </strong>
                      <span className="mt-1 block text-xs text-gray-500">
                        {itemContext.academyClass?.name} ·{" "}
                        {itemContext.academyClass?.teacherName} ·{" "}
                        {formatReportDate(report.publishedAt)} 발행
                      </span>
                    </span>
                    <ChevronRight className="size-4 text-gray-300" />
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}

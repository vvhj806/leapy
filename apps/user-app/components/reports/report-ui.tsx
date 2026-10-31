import { CheckCircle2, Circle, Clock3 } from "lucide-react";

import { PremiumReport } from "@/components/reports/premium-report";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  formatReportDate,
  formatReportPeriod,
  getProgressRate,
  getReportContext,
  type LearningReport,
  type UnitStatus,
} from "@/lib/mock/reports";
import { cn } from "@/lib/utils";
import { getReportAnalytics } from "@/lib/mock/report-analytics";

export function ReportStatusBadge({
  status,
}: {
  status: "draft" | "published";
}) {
  return (
    <Badge
      className={cn(
        "rounded-full px-2.5 font-semibold ring-1",
        status === "published"
          ? "bg-green-50 text-green-700 ring-green-100"
          : "bg-orange-50 text-orange-700 ring-orange-100",
      )}
    >
      {status === "published" ? "발행 완료" : "작성 중"}
    </Badge>
  );
}

const unitMeta: Record<
  UnitStatus,
  { label: string; icon: typeof Circle; className: string }
> = {
  completed: { label: "완료", icon: CheckCircle2, className: "text-green-700" },
  inProgress: { label: "학습 중", icon: Clock3, className: "text-primary-700" },
  planned: { label: "예정", icon: Circle, className: "text-gray-500" },
};

export function ReportContent({
  report,
  preview = false,
}: {
  report: LearningReport;
  preview?: boolean;
}) {
  if (report.status === "published" && getReportAnalytics(report.id)) {
    return <PremiumReport report={report} preview={preview} />;
  }
  const { student, academyClass } = getReportContext(report);
  const progressRate = getProgressRate(report);
  return (
    <div className="space-y-8">
      {preview ? (
        <p className="rounded-xl bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700">
          학생·학부모 화면 미리보기
        </p>
      ) : null}
      <header className="border-b border-gray-100 pb-6">
        <div className="flex flex-wrap items-center gap-2">
          <ReportStatusBadge status={report.status} />
          <span className="text-xs text-gray-500">
            {formatReportPeriod(report.period)}
          </span>
        </div>
        <h1 className="mt-4 break-keep text-2xl font-bold text-gray-900 sm:text-3xl">
          {report.title}
        </h1>
        <dl className="mt-4 grid gap-2 text-sm text-gray-500 sm:grid-cols-2">
          <div>
            <dt className="inline font-semibold text-gray-400">학생 · </dt>
            <dd className="inline">{student?.name ?? "학생 정보 없음"}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-gray-400">반 · </dt>
            <dd className="inline">{academyClass?.name ?? "반 정보 없음"}</dd>
          </div>
          <div>
            <dt className="inline font-semibold text-gray-400">담당 · </dt>
            <dd className="inline">
              {academyClass?.teacherName ?? "담당 정보 없음"}
            </dd>
          </div>
          <div>
            <dt className="inline font-semibold text-gray-400">발행 · </dt>
            <dd className="inline">
              {report.status === "published"
                ? formatReportDate(report.publishedAt)
                : "미발행 초안"}
            </dd>
          </div>
        </dl>
      </header>

      <section aria-labelledby="report-summary-heading">
        <h2
          id="report-summary-heading"
          className="text-lg font-bold text-gray-900"
        >
          학습 요약
        </h2>
        <p className="mt-3 rounded-2xl bg-primary-50/70 p-4 leading-7 text-gray-700 sm:p-5">
          {report.summary || "작성된 학습 요약이 없습니다."}
        </p>
      </section>

      <section aria-labelledby="report-metrics-heading">
        <h2
          id="report-metrics-heading"
          className="text-lg font-bold text-gray-900"
        >
          학습 현황
        </h2>
        <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between text-sm">
            <span className="font-semibold text-gray-700">학습 진도</span>
            <strong className="text-primary-700">
              {progressRate === null ? "데이터 없음" : `${progressRate}%`}
            </strong>
          </div>
          {progressRate !== null ? (
            <Progress
              value={progressRate}
              aria-label={`학습 진도 ${progressRate}%`}
              className="mt-2"
            />
          ) : null}
          <dl className="mt-5 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="text-xs text-gray-400">완료 단원</dt>
              <dd className="mt-1 font-bold text-gray-900">
                {report.progress.completedUnits}/{report.progress.totalUnits}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-400">과제 완료</dt>
              <dd className="mt-1 font-bold text-gray-900">
                {report.assignments.completed}/{report.assignments.total}
              </dd>
            </div>
            {report.attendance ? (
              <div>
                <dt className="text-xs text-gray-400">출석 기록</dt>
                <dd className="mt-1 font-bold text-gray-900">
                  {report.attendance.present}/{report.attendance.total}회
                </dd>
                <p className="mt-1 text-[0.6875rem] text-gray-400">
                  {report.attendance.source}
                </p>
              </div>
            ) : null}
          </dl>
        </div>
      </section>

      <section aria-labelledby="report-units-heading">
        <h2
          id="report-units-heading"
          className="text-lg font-bold text-gray-900"
        >
          단원별 진도
        </h2>
        <ul className="mt-3 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
          {report.progress.units.length ? (
            report.progress.units.map((unit) => {
              const meta = unitMeta[unit.status];
              return (
                <li
                  key={unit.name}
                  className="flex min-h-14 items-center gap-3 px-4 py-3"
                >
                  <meta.icon
                    className={cn("size-4", meta.className)}
                    aria-hidden="true"
                  />
                  <span className="min-w-0 flex-1 text-sm font-semibold text-gray-800">
                    {unit.name}
                  </span>
                  <span className={cn("text-xs font-semibold", meta.className)}>
                    {meta.label}
                  </span>
                </li>
              );
            })
          ) : (
            <li className="px-4 py-8 text-center text-sm text-gray-500">
              등록된 단원 정보가 없습니다.
            </li>
          )}
        </ul>
      </section>

      <section aria-labelledby="report-assessments-heading">
        <h2
          id="report-assessments-heading"
          className="text-lg font-bold text-gray-900"
        >
          평가 결과
        </h2>
        {report.assessments.length ? (
          <ul className="mt-3 space-y-3">
            {report.assessments.map((assessment) => (
              <li
                key={assessment.id}
                className="rounded-2xl border border-gray-100 bg-white p-4"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {assessment.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-500">
                      {formatReportDate(assessment.date)}
                    </p>
                  </div>
                  {assessment.score !== undefined &&
                  assessment.maxScore !== undefined ? (
                    <strong className="text-lg text-primary-700">
                      {assessment.score}
                      <span className="text-sm font-medium text-gray-400">
                        /{assessment.maxScore}점
                      </span>
                    </strong>
                  ) : (
                    <Badge variant="outline">서술형 평가</Badge>
                  )}
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  {assessment.comment}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 rounded-2xl border border-dashed border-gray-200 py-8 text-center text-sm text-gray-500">
            이번 기간에는 등록된 평가가 없습니다.
          </p>
        )}
      </section>

      <section aria-labelledby="report-feedback-heading">
        <h2
          id="report-feedback-heading"
          className="text-lg font-bold text-gray-900"
        >
          선생님 피드백
        </h2>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {[
            ["잘하고 있는 점", report.feedback.strengths],
            ["보완하면 좋은 점", report.feedback.improvements],
            ["다음 학습 목표", report.feedback.nextGoals],
            ["선생님 종합 의견", report.feedback.overall],
          ].map(([title, text]) => (
            <div key={title} className="rounded-2xl bg-gray-50 p-4 sm:p-5">
              <h3 className="text-sm font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {text || "작성된 내용이 없습니다."}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

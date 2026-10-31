import { Award, BookOpenCheck, CalendarCheck2, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import {
  DistributionChart,
  DonutMetric,
  ScoreTrendChart,
  SkillBars,
  SkillRadarChart,
} from "@/components/reports/premium-charts";
import { ReportActions } from "@/components/reports/report-actions";
import { Progress } from "@/components/ui/progress";
import type { LearningReport } from "@/lib/mock/reports";
import { formatReportDate } from "@/lib/mock/reports";
import { resolveMonthlyReport } from "@/lib/reports/report-view-model";

export function PremiumReport({
  report,
  preview = false,
}: {
  report: LearningReport;
  preview?: boolean;
}) {
  const vm = resolveMonthlyReport(report);
  const a = vm.analytics;
  if (!a) return null;
  const scoreDiff =
    vm.currentScore !== null && vm.classAverage !== null
      ? vm.currentScore - vm.classAverage
      : null;
  const summaryMetrics: Array<{
    label: string;
    value: string;
    icon: LucideIcon;
  }> = [
    {
      label: "최근 평가",
      value: vm.currentScore === null ? "-" : `${vm.currentScore}점`,
      icon: Award,
    },
    {
      label: "전월 대비",
      value:
        vm.scoreChange === null
          ? "비교 없음"
          : `${vm.scoreChange >= 0 ? "+" : ""}${vm.scoreChange}점`,
      icon: TrendingUp,
    },
    {
      label: "반 평균 대비",
      value:
        scoreDiff === null
          ? "비교 없음"
          : `${scoreDiff >= 0 ? "+" : ""}${scoreDiff}점`,
      icon: BookOpenCheck,
    },
    {
      label: "현재 순위",
      value:
        vm.rank && vm.cohortSize
          ? `${vm.cohortSize}명 중 ${vm.rank}등`
          : "자료 없음",
      icon: CalendarCheck2,
    },
  ];
  return (
    <div className="premium-report space-y-10">
      <header className="overflow-hidden rounded-3xl border border-primary-100 bg-gradient-to-br from-primary-100 via-white to-blue-50 p-5 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.16em] text-primary-700">
              LEAPY MONTHLY LEARNING REPORT
            </p>
            <h1 className="mt-3 text-2xl font-bold text-gray-900 sm:text-3xl">
              {vm.periodLabel} 학습 종합 리포트
            </h1>
            <p className="mt-2 text-sm text-gray-600">
              {vm.student?.name} · {vm.academyClass?.name} ·{" "}
              {vm.academyClass?.teacherName}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              {formatReportDate(report.publishedAt)} 발행
            </p>
          </div>
          {preview ? (
            <span className="rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-700">
              초안 미리보기
            </span>
          ) : (
            <ReportActions report={report} />
          )}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-7 text-gray-700">
          {report.summary}
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {summaryMetrics.map(({ label, value, icon: Icon }) => (
            <div
              key={label}
              className="rounded-2xl bg-white/80 p-4 ring-1 ring-white"
            >
              <Icon className="size-4 text-primary-600" />
              <p className="mt-3 text-xs text-gray-500">{label}</p>
              <strong className="mt-1 block break-keep text-lg text-gray-900">
                {value}
              </strong>
            </div>
          ))}
        </div>
        <p className="mt-3 text-[0.6875rem] text-gray-400">
          반 평균·순위·분포는 동일 단원 평가를 기준으로 구성한 가상 데모
          통계입니다.
        </p>
      </header>
      <section aria-labelledby="performance-analysis">
        <div className="mb-4">
          <h2
            id="performance-analysis"
            className="text-xl font-bold text-gray-900"
          >
            성적과 순위 분석
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            같은 기준의 최근 3개월 단원 평가를 비교합니다.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <ScoreTrendChart data={a.scoreHistory} />
          <DistributionChart
            data={a.scoreDistribution}
            score={vm.currentScore ?? 0}
          />
        </div>
        <div className="mt-4 rounded-2xl bg-blue-50/70 p-4 text-sm leading-6 text-blue-900">
          최근 3개월 점수는 {a.scoreHistory[0].score}점에서{" "}
          {a.scoreHistory.at(-1)!.score}점으로 변화했습니다. 현재 순위는{" "}
          {vm.cohortSize}명 중 {vm.rank}등이며 이전 평가보다{" "}
          {vm.previousRank && vm.rank ? Math.abs(vm.previousRank - vm.rank) : 0}
          계단{" "}
          {vm.previousRank && vm.rank && vm.previousRank > vm.rank
            ? "상승"
            : "변동"}
          했습니다.
        </div>
      </section>
      <section aria-labelledby="skills-analysis">
        <h2 id="skills-analysis" className="text-xl font-bold text-gray-900">
          학습 역량과 영역별 성취도
        </h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <SkillRadarChart skills={a.skillScores} />
          <div className="rounded-2xl border border-gray-100 bg-white p-5">
            <h3 className="font-bold text-gray-900">영역별 상세</h3>
            <div className="mt-5">
              <SkillBars skills={a.skillScores} />
            </div>
            <div className="mt-5 grid gap-2 text-sm">
              <p className="rounded-xl bg-green-50 p-3 text-green-800">
                <strong>상대적 강점:</strong> {vm.strongestSkill?.label}{" "}
                {vm.strongestSkill?.score}점
              </p>
              <p className="rounded-xl bg-orange-50 p-3 text-orange-800">
                <strong>보완 영역:</strong> {vm.growthSkill?.label}{" "}
                {vm.growthSkill?.score}점
              </p>
            </div>
          </div>
        </div>
      </section>
      <section aria-labelledby="participation-analysis">
        <h2
          id="participation-analysis"
          className="text-xl font-bold text-gray-900"
        >
          학습 참여 요약
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <DonutMetric
            label="출결률"
            value={vm.attendanceRate}
            detail={`출석 ${a.attendance.present} · 지각 ${a.attendance.late} · 결석 ${a.attendance.absent}`}
            tone="green"
          />
          <DonutMetric
            label="과제 완료율"
            value={vm.assignmentRate}
            detail={`${report.assignments.completed}/${report.assignments.total}개 완료`}
            tone="orange"
          />
          <DonutMetric
            label="학습 진도율"
            value={vm.progressRate}
            detail={`${report.progress.completedUnits}/${report.progress.totalUnits}단원 완료`}
          />
        </div>
        <div className="mt-4 rounded-2xl border border-gray-100 bg-white p-5">
          <h3 className="font-bold text-gray-900">단원별 진도</h3>
          <Progress
            value={vm.progressRate ?? 0}
            aria-label={`학습 진도 ${vm.progressRate ?? 0}%`}
            className="mt-3"
          />
          <ul className="mt-4 grid gap-2 sm:grid-cols-2">
            {report.progress.units.map((unit) => (
              <li
                key={unit.name}
                className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2 text-sm"
              >
                <span>{unit.name}</span>
                <span className="text-xs font-semibold text-primary-700">
                  {
                    {
                      completed: "완료",
                      inProgress: "학습 중",
                      planned: "예정",
                    }[unit.status]
                  }
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section aria-labelledby="growth-comparison">
        <h2 id="growth-comparison" className="text-xl font-bold text-gray-900">
          전월 대비 성장
        </h2>
        <div className="mt-4 overflow-hidden rounded-2xl border border-gray-100">
          <div className="grid grid-cols-4 bg-gray-50 px-3 py-2 text-xs font-bold text-gray-500">
            <span>지표</span>
            <span>이전 월</span>
            <span>이번 월</span>
            <span>변화</span>
          </div>
          {[
            [
              "평가 점수",
              `${a.scoreHistory.at(-2)!.score}점`,
              `${a.scoreHistory.at(-1)!.score}점`,
              `${vm.scoreChange! >= 0 ? "+" : ""}${vm.scoreChange}점`,
            ],
            [
              "반 내 순위",
              `${vm.previousRank}등`,
              `${vm.rank}등`,
              `${vm.previousRank! - vm.rank! >= 0 ? "+" : ""}${vm.previousRank! - vm.rank!}계단`,
            ],
          ].map((row) => (
            <div
              key={row[0]}
              className="grid grid-cols-4 border-t border-gray-100 px-3 py-3 text-xs sm:text-sm"
            >
              {row.map((cell, i) => (
                <span
                  key={cell}
                  className={
                    i === 3 ? "font-bold text-primary-700" : "text-gray-700"
                  }
                >
                  {cell}
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="teacher-evaluation">
        <h2 id="teacher-evaluation" className="text-xl font-bold text-gray-900">
          선생님 종합 평가
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {[
            [
              "잘하고 있는 점",
              report.feedback.strengths,
              "bg-green-50 text-green-900",
            ],
            [
              "보완하면 좋은 점",
              report.feedback.improvements,
              "bg-orange-50 text-orange-900",
            ],
            [
              "다음 달 학습 목표",
              report.feedback.nextGoals,
              "bg-blue-50 text-blue-900",
            ],
            [
              "선생님 종합 의견",
              report.feedback.overall,
              "bg-primary-50 text-primary-900",
            ],
          ].map(([title, text, color]) => (
            <div key={title} className={`rounded-2xl p-5 ${color}`}>
              <h3 className="font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-7">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section aria-labelledby="next-plan">
        <h2 id="next-plan" className="text-xl font-bold text-gray-900">
          다음 달 학습 계획
        </h2>
        <dl className="mt-4 grid gap-3 rounded-2xl border border-blue-100 bg-blue-50/50 p-5 sm:grid-cols-2">
          {[
            ["예정 단원", a.nextPlan.units.join(", ")],
            ["우선 보완 영역", a.nextPlan.prioritySkill],
            ["과제 목표", a.nextPlan.assignmentGoal],
            ["다음 평가", a.nextPlan.nextAssessment],
            ["학부모 안내", a.nextPlan.parentNote],
          ].map(([label, value]) => (
            <div key={label}>
              <dt className="text-xs font-bold text-blue-700">{label}</dt>
              <dd className="mt-1 text-sm leading-6 text-gray-700">{value}</dd>
            </div>
          ))}
        </dl>
      </section>
    </div>
  );
}

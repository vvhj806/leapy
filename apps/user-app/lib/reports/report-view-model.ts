import type { LearningReport } from "@/lib/mock/reports";
import {
  formatReportPeriod,
  getProgressRate,
  getReportContext,
} from "@/lib/mock/reports";
import {
  getReportAnalytics,
  type ReportAnalytics,
} from "@/lib/mock/report-analytics";

export function calculateRate(completed: number, total: number) {
  if (total <= 0) return null;
  return Math.min(100, Math.max(0, Math.round((completed / total) * 100)));
}

export function calculateTopPercentage(rank: number, cohortSize: number) {
  if (rank < 1 || cohortSize < rank) return null;
  return Math.round((rank / cohortSize) * 100);
}

export function getScoreChange(analytics: ReportAnalytics) {
  const history = analytics.scoreHistory;
  if (history.length < 2) return null;
  return history.at(-1)!.score - history.at(-2)!.score;
}

export function resolveMonthlyReport(report: LearningReport) {
  const analytics = getReportAnalytics(report.id);
  const context = getReportContext(report);
  const currentScore = analytics?.scoreHistory.at(-1);
  const previousScore = analytics?.scoreHistory.at(-2);
  const currentAssessment = report.assessments.find(
    (assessment) => assessment.score !== undefined,
  );
  const progressRate = getProgressRate(report);
  const assignmentRate = calculateRate(
    report.assignments.completed,
    report.assignments.total,
  );
  const attendanceTotal = analytics
    ? analytics.attendance.present +
      analytics.attendance.late +
      analytics.attendance.absent
    : 0;
  const attendanceRate = analytics
    ? calculateRate(analytics.attendance.present, attendanceTotal)
    : null;
  const strongestSkill = analytics
    ? [...analytics.skillScores].sort((a, b) => b.score - a.score)[0]
    : undefined;
  const growthSkill = analytics
    ? [...analytics.skillScores].sort(
        (a, b) => a.score - a.benchmark - (b.score - b.benchmark),
      )[0]
    : undefined;

  return {
    report,
    analytics,
    student: context.student,
    academyClass: context.academyClass,
    periodLabel: formatReportPeriod(report.period),
    currentScore: currentScore?.score ?? currentAssessment?.score ?? null,
    classAverage: currentScore?.classAverage ?? null,
    scoreChange:
      currentScore && previousScore
        ? currentScore.score - previousScore.score
        : null,
    rank: currentScore?.rank ?? null,
    previousRank: previousScore?.rank ?? null,
    cohortSize: currentScore?.cohortSize ?? null,
    topPercentage: currentScore
      ? calculateTopPercentage(currentScore.rank, currentScore.cohortSize)
      : null,
    progressRate,
    assignmentRate,
    attendanceRate,
    attendanceTotal,
    strongestSkill,
    growthSkill,
  };
}

export type MonthlyReportViewModel = ReturnType<typeof resolveMonthlyReport>;

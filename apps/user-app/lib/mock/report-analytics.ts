export type SkillScore = {
  label: string;
  score: number;
  benchmark: number;
};

export type ReportAnalytics = {
  reportId: string;
  assessmentType: "단원 평가";
  scoreHistory: {
    period: string;
    score: number;
    classAverage: number;
    rank: number;
    cohortSize: number;
  }[];
  scoreDistribution: { range: string; count: number }[];
  skillScores: SkillScore[];
  attendance: { present: number; late: number; absent: number };
  weeklyActivity: {
    week: string;
    classes: number;
    assignments: number;
    assessments: number;
  }[];
  nextPlan: {
    units: string[];
    prioritySkill: string;
    assignmentGoal: string;
    nextAssessment: string;
    parentNote: string;
  };
};

export const reportAnalytics: ReportAnalytics[] = [
  {
    reportId: "report-student-13-2026-10",
    assessmentType: "단원 평가",
    scoreHistory: [
      {
        period: "2026-08",
        score: 74,
        classAverage: 75,
        rank: 7,
        cohortSize: 10,
      },
      {
        period: "2026-09",
        score: 78,
        classAverage: 76,
        rank: 6,
        cohortSize: 10,
      },
      {
        period: "2026-10",
        score: 82,
        classAverage: 77,
        rank: 4,
        cohortSize: 10,
      },
    ],
    scoreDistribution: [
      { range: "0~59", count: 1 },
      { range: "60~69", count: 1 },
      { range: "70~79", count: 3 },
      { range: "80~89", count: 4 },
      { range: "90~100", count: 1 },
    ],
    skillScores: [
      { label: "개념 이해", score: 84, benchmark: 78 },
      { label: "연산 정확도", score: 86, benchmark: 80 },
      { label: "문제 응용력", score: 73, benchmark: 75 },
      { label: "서술형 풀이", score: 76, benchmark: 74 },
      { label: "복습 완성도", score: 81, benchmark: 78 },
    ],
    attendance: { present: 6, late: 1, absent: 1 },
    weeklyActivity: [
      { week: "1주", classes: 2, assignments: 2, assessments: 0 },
      { week: "2주", classes: 2, assignments: 1, assessments: 0 },
      { week: "3주", classes: 1, assignments: 2, assessments: 1 },
      { week: "4주", classes: 3, assignments: 2, assessments: 0 },
    ],
    nextPlan: {
      units: ["함수의 뜻", "그래프 읽기"],
      prioritySkill: "문제 조건을 식으로 정리하는 연습",
      assignmentGoal: "주간 과제 85% 이상 완료",
      nextAssessment: "11월 26일 함수 단원 평가",
      parentNote: "주 1회 풀이 과정을 말로 설명하도록 격려해 주세요.",
    },
  },
  {
    reportId: "report-student-1-2026-10",
    assessmentType: "단원 평가",
    scoreHistory: [
      {
        period: "2026-08",
        score: 78,
        classAverage: 76,
        rank: 6,
        cohortSize: 12,
      },
      {
        period: "2026-09",
        score: 82,
        classAverage: 78,
        rank: 5,
        cohortSize: 12,
      },
      {
        period: "2026-10",
        score: 85,
        classAverage: 79,
        rank: 3,
        cohortSize: 12,
      },
    ],
    scoreDistribution: [
      { range: "0~59", count: 1 },
      { range: "60~69", count: 1 },
      { range: "70~79", count: 4 },
      { range: "80~89", count: 4 },
      { range: "90~100", count: 2 },
    ],
    skillScores: [
      { label: "개념 이해", score: 88, benchmark: 80 },
      { label: "연산 정확도", score: 84, benchmark: 78 },
      { label: "문제 응용력", score: 72, benchmark: 75 },
      { label: "서술형 풀이", score: 79, benchmark: 76 },
      { label: "복습 완성도", score: 86, benchmark: 80 },
    ],
    attendance: { present: 8, late: 1, absent: 0 },
    weeklyActivity: [
      { week: "1주", classes: 2, assignments: 2, assessments: 0 },
      { week: "2주", classes: 2, assignments: 2, assessments: 1 },
      { week: "3주", classes: 2, assignments: 1, assessments: 0 },
      { week: "4주", classes: 3, assignments: 3, assessments: 1 },
    ],
    nextPlan: {
      units: ["일차함수 활용", "그래프 응용"],
      prioritySkill: "문제의 조건을 식과 그래프로 연결하는 연습",
      assignmentGoal: "주간 과제 90% 이상 완료",
      nextAssessment: "11월 28일 일차함수 단원 평가",
      parentNote: "오답 노트를 주 1회 함께 확인해 주세요.",
    },
  },
  {
    reportId: "report-student-1-2026-09",
    assessmentType: "단원 평가",
    scoreHistory: [
      {
        period: "2026-07",
        score: 80,
        classAverage: 75,
        rank: 5,
        cohortSize: 12,
      },
      {
        period: "2026-08",
        score: 78,
        classAverage: 76,
        rank: 6,
        cohortSize: 12,
      },
      {
        period: "2026-09",
        score: 82,
        classAverage: 78,
        rank: 5,
        cohortSize: 12,
      },
    ],
    scoreDistribution: [
      { range: "0~59", count: 1 },
      { range: "60~69", count: 2 },
      { range: "70~79", count: 4 },
      { range: "80~89", count: 4 },
      { range: "90~100", count: 1 },
    ],
    skillScores: [
      { label: "개념 이해", score: 82, benchmark: 78 },
      { label: "연산 정확도", score: 81, benchmark: 77 },
      { label: "문제 응용력", score: 70, benchmark: 74 },
      { label: "서술형 풀이", score: 75, benchmark: 75 },
      { label: "복습 완성도", score: 80, benchmark: 78 },
    ],
    attendance: { present: 7, late: 1, absent: 0 },
    weeklyActivity: [
      { week: "1주", classes: 2, assignments: 2, assessments: 0 },
      { week: "2주", classes: 2, assignments: 2, assessments: 0 },
      { week: "3주", classes: 2, assignments: 1, assessments: 1 },
      { week: "4주", classes: 2, assignments: 2, assessments: 0 },
    ],
    nextPlan: {
      units: ["좌표평면", "일차함수"],
      prioritySkill: "그래프에서 변화 관계 읽기",
      assignmentGoal: "주간 과제 85% 이상 완료",
      nextAssessment: "10월 24일 일차방정식 단원 평가",
      parentNote: "문제 풀이 후 검산하는 습관을 격려해 주세요.",
    },
  },
];

export function getReportAnalytics(reportId: string) {
  return reportAnalytics.find((analytics) => analytics.reportId === reportId);
}

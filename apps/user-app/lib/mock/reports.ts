import {
  academyClasses,
  classStudents,
  getAcademyClass,
} from "@/lib/mock/classes";

export type ReportStatus = "draft" | "published";
export type UnitStatus = "completed" | "inProgress" | "planned";

export type LearningReport = {
  id: string;
  studentId: string;
  classId: string;
  teacherId: string;
  title: string;
  period: string;
  status: ReportStatus;
  publishedAt?: string;
  updatedAt?: string;
  summary: string;
  progress: {
    completedUnits: number;
    totalUnits: number;
    currentUnit: string;
    units: { name: string; status: UnitStatus }[];
  };
  assignments: { completed: number; total: number };
  attendance?: { present: number; total: number; source: string };
  assessments: {
    id: string;
    name: string;
    date: string;
    score?: number;
    maxScore?: number;
    comment: string;
  }[];
  feedback: {
    strengths: string;
    improvements: string;
    nextGoals: string;
    overall: string;
  };
};

export const demoStudentId = "student-1";
export const reportDemoPeriod = "2026-10";

const feedback = {
  strengths:
    "최근 문제 풀이 과정이 안정적이며, 풀이 방법을 말로 설명하는 능력이 좋아지고 있습니다.",
  improvements:
    "응용 문제에서는 조건을 한 번 더 확인하고 풀이 과정을 차분히 정리하면 좋겠습니다.",
  nextGoals: "일차함수 응용 문제를 다양한 방식으로 해결하는 것이 목표입니다.",
  overall:
    "수업 참여가 꾸준하고 개념 이해도도 안정적입니다. 다음 달에는 응용 문제의 풀이 정확도를 높여 보겠습니다.",
};

export const mockReports: LearningReport[] = [
  {
    id: "report-student-1-2026-10",
    studentId: "student-1",
    classId: "middle-math-a",
    teacherId: "teacher-kim",
    title: "2026년 10월 학습 리포트",
    period: "2026-10",
    status: "published",
    publishedAt: "2026-10-30",
    summary:
      "일차방정식과 좌표평면 학습을 완료하고 일차함수 그래프를 안정적으로 익히고 있습니다.",
    progress: {
      completedUnits: 6,
      totalUnits: 8,
      currentUnit: "일차함수와 그래프",
      units: [
        { name: "일차방정식", status: "completed" },
        { name: "좌표평면", status: "completed" },
        { name: "일차함수", status: "inProgress" },
        { name: "그래프 응용", status: "planned" },
      ],
    },
    assignments: { completed: 8, total: 10 },
    attendance: { present: 8, total: 9, source: "10월 리포트 예시 기록" },
    assessments: [
      {
        id: "assessment-1",
        name: "일차방정식 단원 평가",
        date: "2026-10-24",
        score: 85,
        maxScore: 100,
        comment: "기본 유형은 안정적이며 응용 문제 풀이를 보완하고 있습니다.",
      },
    ],
    feedback,
  },
  {
    id: "report-student-1-2026-09",
    studentId: "student-1",
    classId: "middle-math-a",
    teacherId: "teacher-kim",
    title: "2026년 9월 학습 리포트",
    period: "2026-09",
    status: "published",
    publishedAt: "2026-09-30",
    summary: "연립방정식의 기본 계산과 활용 문제를 꾸준히 학습했습니다.",
    progress: {
      completedUnits: 5,
      totalUnits: 7,
      currentUnit: "연립방정식 활용",
      units: [
        { name: "연립방정식 계산", status: "completed" },
        { name: "연립방정식 활용", status: "completed" },
        { name: "일차부등식", status: "inProgress" },
      ],
    },
    assignments: { completed: 7, total: 8 },
    assessments: [
      {
        id: "assessment-2",
        name: "9월 학습 관찰",
        date: "2026-09-26",
        comment: "풀이 순서를 스스로 점검하는 습관이 좋아졌습니다.",
      },
    ],
    feedback: {
      ...feedback,
      nextGoals: "일차부등식의 기본 성질을 정확히 이해하는 것이 목표입니다.",
    },
  },
  {
    id: "report-student-2-2026-10",
    studentId: "student-2",
    classId: "middle-math-a",
    teacherId: "teacher-kim",
    title: "2026년 10월 학습 리포트",
    period: "2026-10",
    status: "published",
    publishedAt: "2026-10-30",
    summary: "좌표평면과 일차함수의 기본 개념을 성실히 학습했습니다.",
    progress: {
      completedUnits: 7,
      totalUnits: 8,
      currentUnit: "그래프 응용",
      units: [
        { name: "좌표평면", status: "completed" },
        { name: "그래프 응용", status: "inProgress" },
      ],
    },
    assignments: { completed: 9, total: 10 },
    assessments: [
      {
        id: "assessment-3",
        name: "일차함수 확인 평가",
        date: "2026-10-25",
        score: 91,
        maxScore: 100,
        comment: "개념 적용이 정확합니다.",
      },
    ],
    feedback,
  },
  {
    id: "report-student-3-2026-10-draft",
    studentId: "student-3",
    classId: "middle-math-a",
    teacherId: "teacher-kim",
    title: "2026년 10월 학습 리포트",
    period: "2026-10",
    status: "draft",
    updatedAt: "2026-10-29",
    summary: "일차함수 단원 학습 내용을 정리하고 있습니다.",
    progress: {
      completedUnits: 5,
      totalUnits: 8,
      currentUnit: "일차함수",
      units: [{ name: "일차함수", status: "inProgress" }],
    },
    assignments: { completed: 6, total: 10 },
    assessments: [],
    feedback,
  },
  ...[
    ["student-13", "middle-math-b", "published", "2026-10", 82],
    ["student-14", "middle-math-b", "draft", "2026-10", 0],
    ["student-16", "middle-math-b", "published", "2026-09", 88],
    ["student-23", "high-math-basic", "published", "2026-10", 79],
    ["student-24", "high-math-basic", "draft", "2026-10", 0],
    ["student-25", "high-math-basic", "published", "2026-09", 93],
  ].map(([studentId, classId, status, period, score], index) => ({
    id: `report-${studentId}-${period}${status === "draft" ? "-draft" : ""}`,
    studentId: String(studentId),
    classId: String(classId),
    teacherId: "teacher-kim",
    title: `${String(period).replace("-", "년 ")}월 학습 리포트`,
    period: String(period),
    status: status as ReportStatus,
    ...(status === "published"
      ? { publishedAt: `${period}-${index % 2 ? "29" : "30"}` }
      : { updatedAt: "2026-10-28" }),
    summary: "이번 달 주요 개념과 문제 풀이 과정을 꾸준히 학습했습니다.",
    progress: {
      completedUnits: 6,
      totalUnits: 8,
      currentUnit: "핵심 유형 학습",
      units: [
        { name: "핵심 개념", status: "completed" as const },
        { name: "응용 문제", status: "inProgress" as const },
      ],
    },
    assignments: { completed: 7, total: 9 },
    assessments: score
      ? [
          {
            id: `assessment-${index + 4}`,
            name: "월간 확인 평가",
            date: `${period}-25`,
            score: Number(score),
            maxScore: 100,
            comment: "기본 개념을 안정적으로 적용했습니다.",
          },
        ]
      : [],
    feedback,
  })),
];

export function getReport(id: string) {
  return mockReports.find((report) => report.id === id);
}

export function getStudent(studentId: string) {
  return classStudents.find((student) => student.id === studentId);
}

export function getReportContext(report: LearningReport) {
  return {
    student: getStudent(report.studentId),
    academyClass: getAcademyClass(report.classId),
  };
}

export function getUserReports(studentId = demoStudentId) {
  return mockReports
    .filter(
      (report) =>
        report.studentId === studentId && report.status === "published",
    )
    .sort((first, second) => second.period.localeCompare(first.period));
}

export function getProgressRate(report: LearningReport) {
  return report.progress.totalUnits > 0
    ? Math.round(
        (report.progress.completedUnits / report.progress.totalUnits) * 100,
      )
    : null;
}

export function formatReportPeriod(period: string) {
  const [year, month] = period.split("-");
  return `${year}년 ${Number(month)}월`;
}

export function formatReportDate(value?: string) {
  if (!value) return "날짜 없음";
  const [, month, day] = value.split("-").map(Number);
  return `${month}월 ${day}일`;
}

export function isStudentInClass(studentId: string, classId: string) {
  return Boolean(
    academyClasses.find(
      (academyClass) =>
        academyClass.id === classId &&
        academyClass.studentIds.includes(studentId),
    ),
  );
}

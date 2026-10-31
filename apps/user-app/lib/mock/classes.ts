import { teacherAttendanceClasses } from "@/lib/mock/attendance";

export type AcademyClassStatus = "active" | "completed";

export type AcademyClass = {
  id: string;
  name: string;
  subject: string;
  level: string;
  teacherId: string;
  teacherName: string;
  room: string;
  weekdays: number[];
  startTime: string;
  endTime: string;
  status: AcademyClassStatus;
  description: string;
  materials: string[];
  studentIds: string[];
};

export type ClassStudent = {
  id: string;
  name: string;
  grade: string;
  enrollmentStatus: "재원";
};

const classMetadata: Record<
  string,
  Omit<AcademyClass, "id" | "name" | "subject" | "studentIds">
> = {
  "middle-math-a": {
    level: "중학교 2학년",
    teacherId: "teacher-kim",
    teacherName: "김선생 선생님",
    room: "본관 3강의실",
    weekdays: [1, 3],
    startTime: "14:30",
    endTime: "16:00",
    status: "active",
    description:
      "핵심 개념을 이해하고 학교 시험 유형을 단계별로 연습하는 수업입니다.",
    materials: ["중등 수학 개념서", "유형 문제집", "오답 노트"],
  },
  "middle-math-b": {
    level: "중학교 2학년",
    teacherId: "teacher-kim",
    teacherName: "김선생 선생님",
    room: "본관 2강의실",
    weekdays: [2, 5],
    startTime: "17:00",
    endTime: "18:30",
    status: "active",
    description:
      "교과 진도와 서술형 문제 풀이를 함께 진행하는 중등 수학 수업입니다.",
    materials: ["중등 수학 기본서", "서술형 워크북"],
  },
  "high-math-basic": {
    level: "고등학교 1학년",
    teacherId: "teacher-kim",
    teacherName: "김선생 선생님",
    room: "별관 1강의실",
    weekdays: [3, 6],
    startTime: "19:00",
    endTime: "20:30",
    status: "active",
    description:
      "고등 수학의 기본 개념과 필수 유형을 안정적으로 다지는 수업입니다.",
    materials: ["고등 수학 개념서", "주간 확인 문제"],
  },
};

export const academyClasses: AcademyClass[] = teacherAttendanceClasses.map(
  (attendanceClass) => ({
    id: attendanceClass.id,
    name: attendanceClass.className,
    subject: attendanceClass.subject,
    studentIds: attendanceClass.students.map((student) => student.id),
    ...classMetadata[attendanceClass.id],
  }),
);

export const classStudents: ClassStudent[] = teacherAttendanceClasses.flatMap(
  (attendanceClass) =>
    attendanceClass.students.map((student) => ({
      id: student.id,
      name: student.name,
      grade: attendanceClass.id === "high-math-basic" ? "고1" : "중2",
      enrollmentStatus: "재원" as const,
    })),
);

export function getAcademyClass(id: string) {
  return academyClasses.find((academyClass) => academyClass.id === id);
}

export function getClassStudents(academyClass: AcademyClass) {
  const studentIds = new Set(academyClass.studentIds);
  return classStudents.filter((student) => studentIds.has(student.id));
}

export function formatWeekdays(weekdays: number[]) {
  const labels = ["일", "월", "화", "수", "목", "금", "토"];
  return weekdays.map((weekday) => labels[weekday]).join("·");
}

export function formatTimeRange(startTime: string, endTime: string) {
  return `${startTime}~${endTime}`;
}

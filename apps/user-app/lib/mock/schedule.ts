import { getAcademyClass } from "@/lib/mock/classes";

export type ScheduleStatus = "scheduled" | "canceled" | "makeup" | "changed";

export type ClassSession = {
  id: string;
  classId: string;
  date: string;
  startTime: string;
  endTime: string;
  status: ScheduleStatus;
  room: string;
  userVisible: boolean;
  originalStartTime?: string;
  originalEndTime?: string;
  originalRoom?: string;
  changeReason?: string;
  lesson: string;
  materials: string[];
  note?: string;
};

export const scheduleDemoToday = "2026-10-31";

export const classSessions: ClassSession[] = [
  {
    id: "session-2026-10-31-a",
    classId: "middle-math-a",
    date: "2026-10-31",
    startTime: "14:30",
    endTime: "16:00",
    status: "scheduled",
    room: "본관 3강의실",
    userVisible: false,
    lesson: "일차함수 그래프와 기울기",
    materials: ["개념서", "필기도구"],
  },
  {
    id: "session-2026-10-31-b-change",
    classId: "middle-math-b",
    date: "2026-10-31",
    startTime: "17:30",
    endTime: "19:00",
    status: "changed",
    room: "본관 2강의실",
    userVisible: false,
    originalStartTime: "17:00",
    originalEndTime: "18:30",
    changeReason: "학원 행사 준비로 시작 시간이 30분 늦춰졌습니다.",
    lesson: "연립방정식 활용 문제",
    materials: ["기본서", "서술형 워크북"],
  },
  {
    id: "session-2026-11-02-canceled",
    classId: "middle-math-a",
    date: "2026-11-02",
    startTime: "16:00",
    endTime: "17:30",
    status: "canceled",
    room: "본관 3강의실",
    userVisible: true,
    changeReason: "학원 전체 휴원일로 수업이 진행되지 않습니다.",
    lesson: "일차함수 단원 정리",
    materials: [],
  },
  {
    id: "session-2026-11-03-user",
    classId: "middle-math-a",
    date: "2026-11-03",
    startTime: "16:00",
    endTime: "17:30",
    status: "scheduled",
    room: "본관 3강의실",
    userVisible: true,
    lesson: "일차함수 실전 문제 풀이",
    materials: ["수학 교재", "오답 노트"],
    note: "지난 수업의 오답 문제를 확인합니다.",
  },
  {
    id: "session-2026-11-04-high",
    classId: "high-math-basic",
    date: "2026-11-04",
    startTime: "19:00",
    endTime: "20:30",
    status: "scheduled",
    room: "별관 1강의실",
    userVisible: false,
    lesson: "다항식의 연산",
    materials: ["고등 수학 개념서"],
  },
  {
    id: "session-2026-11-05-changed",
    classId: "middle-math-a",
    date: "2026-11-05",
    startTime: "16:30",
    endTime: "18:00",
    status: "changed",
    room: "본관 4강의실",
    userVisible: true,
    originalStartTime: "16:00",
    originalEndTime: "17:30",
    originalRoom: "본관 3강의실",
    changeReason: "강의실 정기 점검으로 시간과 강의실이 변경되었습니다.",
    lesson: "일차함수 심화 문제",
    materials: ["수학 교재", "오답 노트"],
  },
  {
    id: "session-2026-11-06-b",
    classId: "middle-math-b",
    date: "2026-11-06",
    startTime: "17:00",
    endTime: "18:30",
    status: "scheduled",
    room: "본관 2강의실",
    userVisible: false,
    lesson: "연립방정식 단원 평가",
    materials: ["필기도구"],
  },
  {
    id: "session-2026-11-07-makeup",
    classId: "middle-math-a",
    date: "2026-11-07",
    startTime: "14:00",
    endTime: "15:30",
    status: "makeup",
    room: "본관 3강의실",
    userVisible: true,
    changeReason: "11월 2일 휴강 수업의 보강입니다.",
    lesson: "일차함수 단원 정리 및 확인 평가",
    materials: ["수학 교재", "오답 노트"],
  },
  {
    id: "session-2026-11-07-high",
    classId: "high-math-basic",
    date: "2026-11-07",
    startTime: "19:00",
    endTime: "20:30",
    status: "scheduled",
    room: "별관 1강의실",
    userVisible: false,
    lesson: "항등식과 나머지정리",
    materials: ["고등 수학 개념서", "주간 확인 문제"],
  },
  {
    id: "session-2026-11-09-a",
    classId: "middle-math-a",
    date: "2026-11-09",
    startTime: "16:00",
    endTime: "17:30",
    status: "scheduled",
    room: "본관 3강의실",
    userVisible: true,
    lesson: "삼각형의 성질",
    materials: ["수학 교재", "필기도구"],
  },
  {
    id: "session-2026-11-10-b",
    classId: "middle-math-b",
    date: "2026-11-10",
    startTime: "17:00",
    endTime: "18:30",
    status: "scheduled",
    room: "본관 2강의실",
    userVisible: false,
    lesson: "함수의 뜻과 그래프",
    materials: ["중등 수학 기본서"],
  },
  {
    id: "session-2026-11-11-high",
    classId: "high-math-basic",
    date: "2026-11-11",
    startTime: "19:00",
    endTime: "20:30",
    status: "scheduled",
    room: "별관 1강의실",
    userVisible: false,
    lesson: "인수분해 기본 유형",
    materials: ["고등 수학 개념서"],
  },
];

export function parseLocalDate(value: string) {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function toLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function addDays(date: Date, amount: number) {
  const nextDate = new Date(date);
  nextDate.setDate(nextDate.getDate() + amount);
  return nextDate;
}

export function getStartOfWeek(date: Date) {
  const start = new Date(date);
  const day = start.getDay();
  start.setDate(start.getDate() - (day === 0 ? 6 : day - 1));
  return start;
}

export function getSession(id: string) {
  return classSessions.find((session) => session.id === id);
}

export function getSessionsForClass(classId: string) {
  return classSessions
    .filter((session) => session.classId === classId)
    .sort(compareSessions);
}

export function getUserSessions(classIds: string[] = ["middle-math-a"]) {
  return classSessions
    .filter((session) => classIds.includes(session.classId))
    .sort(compareSessions);
}

export function compareSessions(first: ClassSession, second: ClassSession) {
  return `${first.date}T${first.startTime}`.localeCompare(
    `${second.date}T${second.startTime}`,
  );
}

export function getSessionClass(session: ClassSession) {
  return getAcademyClass(session.classId);
}

export function formatScheduleDate(value: string, includeYear = false) {
  const date = parseLocalDate(value);
  return new Intl.DateTimeFormat("ko-KR", {
    ...(includeYear ? { year: "numeric" } : {}),
    month: "long",
    day: "numeric",
    weekday: "long",
  }).format(date);
}

export function formatMonth(date: Date) {
  return `${date.getFullYear()}년 ${date.getMonth() + 1}월`;
}

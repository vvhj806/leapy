import {
  academyClasses,
  formatTimeRange,
  formatWeekdays,
} from "@/lib/mock/classes";

export const academyName = "Leapy 학원";

export const userSettingsProfile = {
  id: "student-1",
  name: "김민준",
  role: "학생",
  academyName,
  className: "중등 수학 A반",
  teacherName: "김선생 선생님",
} as const;

export const teacherSettingsProfile = {
  id: "teacher-kim",
  name: "김선생 선생님",
  role: "선생님",
  academyName,
  subject: "수학",
} as const;

export const teacherSettingsClasses = academyClasses.map((academyClass) => ({
  id: academyClass.id,
  name: academyClass.name,
  subject: academyClass.subject,
  studentCount: academyClass.studentIds.length,
  schedule: `${formatWeekdays(academyClass.weekdays)} · ${formatTimeRange(academyClass.startTime, academyClass.endTime)}`,
}));

export const teacherStudentCount = new Set(
  academyClasses.flatMap((academyClass) => academyClass.studentIds),
).size;

export const userFaqs = [
  {
    question: "출결 기록은 어디에서 확인하나요?",
    answer:
      "하단 메뉴 또는 설정의 바로가기에서 출결 화면으로 이동해 확인할 수 있습니다.",
  },
  {
    question: "수업 일정 변경은 어디에서 확인하나요?",
    answer: "일정 화면과 학원 공지에서 변경 및 보강 일정을 확인해 주세요.",
  },
  {
    question: "학습 리포트 PDF는 어떻게 받나요?",
    answer:
      "발행된 리포트 상세 화면에서 PDF 다운로드 버튼을 선택하면 기기에 저장됩니다.",
  },
] as const;

export const teacherFaqs = [
  {
    question: "담당 반은 어디에서 확인하나요?",
    answer: "반 관리 화면에서 담당 반과 학생 명단을 확인할 수 있습니다.",
  },
  {
    question: "학생 출결 상태는 어떻게 변경하나요?",
    answer: "출결 관리 화면에서 담당 반을 선택한 뒤 학생별 상태를 변경하세요.",
  },
  {
    question: "리포트 초안은 어디에 저장되나요?",
    answer:
      "현재 데모 초안은 이 브라우저의 localStorage에만 저장됩니다. 다른 기기와 동기화되지 않습니다.",
  },
  {
    question: "리포트 발행 기능은 언제 사용할 수 있나요?",
    answer: "실제 발행 기능은 인증과 데이터베이스 연결 이후 제공될 예정입니다.",
  },
] as const;

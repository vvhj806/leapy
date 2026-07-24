// Temporary dashboard data. Replace this file when Supabase data access is added.
export const userDashboardMock = {
  displayName: "사용자",
  attendance: {
    status: "출석 완료",
    checkedAt: "오후 3:52",
  },
  todayClass: {
    subject: "중등 수학",
    time: "오후 4:00 - 5:30",
    teacher: "김선생 선생님",
    location: "본관 3강의실",
  },
  notices: [
    {
      title: "7월 학습 상담 일정 안내",
      date: "7월 24일",
      important: true,
      unread: true,
    },
    {
      title: "여름방학 수업 시간표 안내",
      date: "7월 22일",
      important: false,
      unread: true,
    },
    {
      title: "교재 준비 및 과제 제출 안내",
      date: "7월 19일",
      important: false,
      unread: false,
    },
  ],
  schedules: [
    {
      date: "7월 24일",
      title: "영어 정규 수업",
      detail: "오후 6:00 · 2강의실",
    },
    {
      date: "7월 25일",
      title: "수학 보충 수업",
      detail: "오후 4:00 · 3강의실",
    },
    { date: "7월 27일", title: "7월 학습 상담", detail: "오후 7:30 · 상담실" },
  ],
  report: {
    title: "7월 3주차 학습 리포트",
    period: "7월 14일 - 7월 20일",
    progress: 78,
    comment:
      "개념 이해가 안정적이에요. 다음 주에는 응용 문제 풀이를 집중해 봅시다.",
  },
} as const;

export const teacherDashboardMock = {
  displayName: "선생님",
  classSummary: {
    total: 4,
    nextTime: "오후 2:30",
    nextClass: "중등 수학 A반",
    studentCount: 12,
  },
  attendance: [
    { label: "출석", value: 28, tone: "success" },
    { label: "지각", value: 2, tone: "warning" },
    { label: "결석", value: 1, tone: "danger" },
    { label: "미처리", value: 3, tone: "neutral" },
  ],
  classes: [
    {
      name: "중등 수학 A반",
      subject: "수학",
      students: 12,
      nextTime: "오늘 오후 2:30",
    },
    {
      name: "중등 수학 B반",
      subject: "수학",
      students: 10,
      nextTime: "오늘 오후 5:00",
    },
    {
      name: "고등 수학 기초반",
      subject: "수학",
      students: 8,
      nextTime: "내일 오후 4:00",
    },
  ],
  tasks: [
    {
      title: "미처리 출결",
      count: 3,
      href: "/teacher/attendance",
      tone: "warning",
    },
    {
      title: "작성 대기 리포트",
      count: 5,
      href: "/teacher/reports",
      tone: "primary",
    },
    {
      title: "확인하지 않은 공지",
      count: 2,
      href: "/teacher/notice",
      tone: "info",
    },
    {
      title: "이번 주 상담 예정",
      count: 4,
      href: "/teacher/classes",
      tone: "neutral",
    },
  ],
  notices: [
    {
      title: "7월 강사 회의 일정 안내",
      date: "7월 24일",
      important: true,
      unread: true,
    },
    {
      title: "여름방학 강의실 운영 안내",
      date: "7월 21일",
      important: false,
      unread: true,
    },
    {
      title: "학습 리포트 작성 기준 안내",
      date: "7월 18일",
      important: false,
      unread: false,
    },
  ],
} as const;

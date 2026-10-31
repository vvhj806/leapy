export type NoticeAudience = "all" | "user" | "teacher";

export type NoticeCategory =
  | "학원 공지"
  | "수업 안내"
  | "일정"
  | "행사"
  | "학원 운영";

export type NoticeContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "note"; title?: string; text: string };

export type NoticeAttachment = {
  name: string;
  type: string;
  size: string;
  available: false;
};

export type Notice = {
  id: string;
  title: string;
  summary: string;
  category: NoticeCategory;
  audience: NoticeAudience;
  classIds?: string[];
  isImportant: boolean;
  isPinned: boolean;
  publishedAt: string;
  author: string;
  content: NoticeContentBlock[];
  attachments?: NoticeAttachment[];
};

export const teacherClasses = [
  { id: "middle-math-a", name: "중등 수학 A반" },
  { id: "middle-math-b", name: "중등 수학 B반" },
  { id: "high-math-basic", name: "고등 수학 기초반" },
] as const;

export const notices: Notice[] = [
  {
    id: "november-closure",
    title: "11월 학원 휴원 일정 안내",
    summary: "휴원 일정과 수업별 보강 운영 계획을 안내드립니다.",
    category: "학원 공지",
    audience: "all",
    isImportant: true,
    isPinned: true,
    publishedAt: "2026-10-30",
    author: "Leapy 학원",
    content: [
      {
        type: "paragraph",
        text: "11월 학원 운영 일정을 안내드립니다. 아래 일정을 확인해 수업 참여에 착오 없으시길 바랍니다.",
      },
      {
        type: "list",
        items: [
          "11월 2일(월): 학원 전체 휴원",
          "11월 3일(화): 정상 수업",
          "휴원일 수업은 담당 선생님이 별도 안내하는 일정에 보강",
        ],
      },
      {
        type: "note",
        title: "꼭 확인해 주세요",
        text: "반별 보강 시간은 수업 상황에 따라 달라질 수 있습니다.",
      },
    ],
    attachments: [
      {
        name: "11월_학원_운영일정.pdf",
        type: "PDF",
        size: "248KB",
        available: false,
      },
    ],
  },
  {
    id: "parent-counseling-november",
    title: "11월 학부모 상담 일정 안내",
    summary: "학생별 학습 현황을 나누는 정기 상담 신청 일정을 확인해 주세요.",
    category: "일정",
    audience: "user",
    isImportant: true,
    isPinned: true,
    publishedAt: "2026-10-29",
    author: "상담 운영팀",
    content: [
      {
        type: "paragraph",
        text: "11월 정기 학부모 상담을 진행합니다. 상담 가능 시간은 담당 선생님이 순차적으로 안내드릴 예정입니다.",
      },
      {
        type: "list",
        items: [
          "상담 기간: 11월 9일(월)~11월 20일(금)",
          "진행 방식: 방문 또는 전화 상담",
          "예상 소요 시간: 약 20분",
        ],
      },
    ],
  },
  {
    id: "teacher-meeting-november",
    title: "11월 정기 강사 회의 안내",
    summary: "11월 수업 운영과 평가 일정을 논의하는 정기 회의입니다.",
    category: "학원 운영",
    audience: "teacher",
    isImportant: true,
    isPinned: true,
    publishedAt: "2026-10-29",
    author: "학원 운영팀",
    content: [
      {
        type: "paragraph",
        text: "11월 정기 강사 회의를 아래와 같이 진행합니다. 모든 선생님께서는 일정을 확인해 주세요.",
      },
      {
        type: "list",
        items: [
          "일시: 11월 4일(수) 오후 9시",
          "장소: 본관 회의실",
          "안건: 시험 대비 수업, 상담 주간, 보강 운영",
        ],
      },
    ],
  },
  {
    id: "academy-shuttle-winter",
    title: "동절기 학원 차량 운행 시간 안내",
    summary: "11월부터 변경되는 등원 차량 운행 시간을 안내드립니다.",
    category: "학원 공지",
    audience: "user",
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-28",
    author: "차량 운영팀",
    content: [
      {
        type: "paragraph",
        text: "해가 짧아지는 동절기를 맞아 11월 2일부터 등원 차량 운행 시간이 일부 변경됩니다.",
      },
      {
        type: "note",
        text: "정류장별 시간은 기존 시간보다 5~10분 앞당겨질 수 있으니 개별 안내를 확인해 주세요.",
      },
    ],
  },
  {
    id: "middle-math-a-makeup",
    title: "중등 수학 A반 보강 일정 안내",
    summary: "휴원일 수업에 대한 중등 수학 A반 보강 일정을 안내합니다.",
    category: "수업 안내",
    audience: "all",
    classIds: ["middle-math-a"],
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-27",
    author: "김선생 선생님",
    content: [
      {
        type: "paragraph",
        text: "중등 수학 A반 휴원일 보강 수업을 11월 7일 토요일에 진행합니다.",
      },
      {
        type: "list",
        items: [
          "수업 시간: 오후 2시~3시 30분",
          "수업 장소: 본관 3강의실",
          "준비물: 수학 교재와 오답 노트",
        ],
      },
    ],
  },
  {
    id: "midterm-special-class",
    title: "중간고사 대비 주말 특강 안내",
    summary: "시험 범위 핵심 개념과 유형별 문제 풀이를 진행합니다.",
    category: "수업 안내",
    audience: "user",
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-25",
    author: "교육 연구팀",
    content: [
      {
        type: "paragraph",
        text: "중간고사 대비 주말 특강에서는 학교별 시험 범위에 맞춘 핵심 문제를 풀이합니다.",
      },
      {
        type: "list",
        items: [
          "일정: 10월 31일(토), 11월 1일(일)",
          "대상: 중등부 정규 수강생",
          "신청: 담당 선생님께 문의",
        ],
      },
    ],
  },
  {
    id: "middle-math-b-time-change",
    title: "중등 수학 B반 수업 시간 변경",
    summary: "이번 주 금요일 수업 시작 시간이 30분 늦춰집니다.",
    category: "수업 안내",
    audience: "all",
    classIds: ["middle-math-b"],
    isImportant: true,
    isPinned: false,
    publishedAt: "2026-10-23",
    author: "이선생 선생님",
    content: [
      {
        type: "paragraph",
        text: "학원 행사 준비로 이번 주 금요일 중등 수학 B반 수업 시간이 변경됩니다.",
      },
      {
        type: "note",
        title: "변경 시간",
        text: "오후 5시 30분~7시입니다. 다음 주부터는 기존 시간에 정상 진행합니다.",
      },
    ],
  },
  {
    id: "november-textbook",
    title: "11월 수업 교재 준비 안내",
    summary: "새 단원 수업에 사용할 교재와 준비물을 확인해 주세요.",
    category: "수업 안내",
    audience: "user",
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-21",
    author: "교무팀",
    content: [
      {
        type: "paragraph",
        text: "11월부터 새 단원 수업이 시작됩니다. 첫 수업 전까지 안내받은 교재를 준비해 주세요.",
      },
      {
        type: "list",
        items: ["개념 기본서 2권", "유형 문제집 1권", "개인 오답 노트"],
      },
    ],
  },
  {
    id: "high-math-operation",
    title: "고등 수학 기초반 수업 운영 안내",
    summary: "11월 진도와 주간 과제 운영 기준을 선생님께 공유합니다.",
    category: "학원 운영",
    audience: "teacher",
    classIds: ["high-math-basic"],
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-20",
    author: "교육 연구팀",
    content: [
      {
        type: "paragraph",
        text: "고등 수학 기초반은 11월부터 개념 확인 과제와 주간 테스트를 함께 운영합니다.",
      },
      {
        type: "list",
        items: [
          "월요일: 개념 확인 과제 배부",
          "금요일: 과제 피드백",
          "매월 마지막 수업: 누적 확인 테스트",
        ],
      },
    ],
  },
  {
    id: "fall-academy-event",
    title: "가을 학원 독서 행사 안내",
    summary: "함께 책을 읽고 감상을 나누는 가을 독서 행사를 진행합니다.",
    category: "행사",
    audience: "all",
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-18",
    author: "학생 지원팀",
    content: [
      {
        type: "paragraph",
        text: "학생들이 책과 가까워질 수 있도록 가을 독서 행사를 진행합니다.",
      },
      {
        type: "list",
        items: [
          "기간: 11월 2일~11월 13일",
          "참여 방법: 추천 도서 읽고 한 줄 감상 남기기",
          "참여 학생에게는 작은 기념품 제공",
        ],
      },
    ],
  },
  {
    id: "report-writing-guide",
    title: "10월 학습 리포트 작성 기준 안내",
    summary: "학습 리포트 작성 항목과 제출 기한을 확인해 주세요.",
    category: "학원 운영",
    audience: "teacher",
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-16",
    author: "교무팀",
    content: [
      {
        type: "paragraph",
        text: "10월 학습 리포트는 학생별 진도, 성취도, 다음 달 학습 계획을 중심으로 작성해 주세요.",
      },
      {
        type: "note",
        title: "제출 기한",
        text: "11월 2일 월요일 오후 6시까지 작성해 주세요.",
      },
    ],
  },
  {
    id: "facility-inspection",
    title: "본관 시설 점검 일정 안내",
    summary: "안전한 학원 운영을 위한 정기 시설 점검을 진행합니다.",
    category: "일정",
    audience: "all",
    isImportant: false,
    isPinned: false,
    publishedAt: "2026-10-14",
    author: "학원 운영팀",
    content: [
      {
        type: "paragraph",
        text: "10월 31일 토요일 오전에 본관 전기 및 소방 시설 정기 점검을 진행합니다.",
      },
      {
        type: "note",
        text: "점검 시간 중 일부 강의실 출입이 제한될 수 있으며 수업에는 영향이 없습니다.",
      },
    ],
  },
];

export function getNoticeById(id: string) {
  return notices.find((notice) => notice.id === id);
}

export function canViewNotice(notice: Notice, role: "user" | "teacher") {
  return notice.audience === "all" || notice.audience === role;
}

export function getNoticesForRole(role: "user" | "teacher") {
  return notices
    .filter((notice) => canViewNotice(notice, role))
    .sort(
      (first, second) =>
        new Date(second.publishedAt).getTime() -
        new Date(first.publishedAt).getTime(),
    );
}

export function getClassNames(classIds?: string[]) {
  if (!classIds?.length) return [];

  return classIds.flatMap((classId) => {
    const teacherClass = teacherClasses.find((item) => item.id === classId);
    return teacherClass ? [teacherClass.name] : [];
  });
}

export function getNoticeSearchText(notice: Notice) {
  const contentText = notice.content.flatMap((block) =>
    block.type === "list" ? block.items : [block.text],
  );

  return [notice.title, notice.summary, ...contentText]
    .join(" ")
    .toLocaleLowerCase("ko-KR");
}

export function formatNoticeDate(value: string) {
  const [, month, day] = value.split("-").map(Number);
  return `${month}월 ${day}일`;
}

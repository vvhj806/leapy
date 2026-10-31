export type AttendanceStatus = "present" | "late" | "absent" | "pending";

export type UserAttendanceRecord = {
  id: string;
  date: string;
  day: string;
  subject: string;
  className: string;
  startTime: string;
  endTime: string;
  checkInTime: string | null;
  status: AttendanceStatus;
  note?: string;
};

export type StudentAttendance = {
  id: string;
  name: string;
  status: AttendanceStatus;
  checkInTime: string | null;
};

export type TeacherAttendanceClass = {
  id: string;
  className: string;
  subject: string;
  startTime: string;
  endTime: string;
  processingStatus: string;
  students: StudentAttendance[];
};

export const userAttendanceRecords: UserAttendanceRecord[] = [
  {
    id: "user-attendance-1",
    date: "7월 24일",
    day: "목요일",
    subject: "중등 수학",
    className: "중등 수학 A반",
    startTime: "오후 4:00",
    endTime: "오후 5:30",
    checkInTime: "오후 3:52",
    status: "present",
  },
  {
    id: "user-attendance-2",
    date: "7월 22일",
    day: "화요일",
    subject: "영어 정규 수업",
    className: "중등 영어 B반",
    startTime: "오후 6:00",
    endTime: "오후 7:20",
    checkInTime: "오후 5:56",
    status: "present",
  },
  {
    id: "user-attendance-3",
    date: "7월 19일",
    day: "토요일",
    subject: "수학 보충 수업",
    className: "중등 수학 A반",
    startTime: "오후 2:00",
    endTime: "오후 3:30",
    checkInTime: "오후 2:08",
    status: "late",
    note: "수업 시작 후 8분 입실",
  },
  {
    id: "user-attendance-4",
    date: "7월 17일",
    day: "목요일",
    subject: "중등 수학",
    className: "중등 수학 A반",
    startTime: "오후 4:00",
    endTime: "오후 5:30",
    checkInTime: "오후 3:49",
    status: "present",
  },
  {
    id: "user-attendance-5",
    date: "7월 15일",
    day: "화요일",
    subject: "영어 정규 수업",
    className: "중등 영어 B반",
    startTime: "오후 6:00",
    endTime: "오후 7:20",
    checkInTime: "오후 5:55",
    status: "present",
  },
  {
    id: "user-attendance-6",
    date: "7월 10일",
    day: "목요일",
    subject: "중등 수학",
    className: "중등 수학 A반",
    startTime: "오후 4:00",
    endTime: "오후 5:30",
    checkInTime: "오후 3:51",
    status: "present",
  },
  {
    id: "user-attendance-7",
    date: "7월 8일",
    day: "화요일",
    subject: "영어 정규 수업",
    className: "중등 영어 B반",
    startTime: "오후 6:00",
    endTime: "오후 7:20",
    checkInTime: "오후 5:58",
    status: "present",
  },
  {
    id: "user-attendance-8",
    date: "7월 3일",
    day: "목요일",
    subject: "중등 수학",
    className: "중등 수학 A반",
    startTime: "오후 4:00",
    endTime: "오후 5:30",
    checkInTime: null,
    status: "pending",
    note: "출결 확인 중",
  },
  {
    id: "user-attendance-9",
    date: "7월 1일",
    day: "화요일",
    subject: "영어 정규 수업",
    className: "중등 영어 B반",
    startTime: "오후 6:00",
    endTime: "오후 7:20",
    checkInTime: "오후 5:54",
    status: "present",
  },
];

const secondChildAttendanceRecords: UserAttendanceRecord[] =
  userAttendanceRecords.slice(0, 7).map((record, index) => ({
    ...record,
    id: `student-13-attendance-${index + 1}`,
    subject: "중등 수학",
    className: "중등 수학 B반",
    startTime: "오후 5:00",
    endTime: "오후 6:30",
    status: index === 2 ? "absent" : index === 4 ? "late" : "present",
    checkInTime: index === 2 ? null : index === 4 ? "오후 5:07" : "오후 4:52",
    note:
      index === 2
        ? "보호자 확인 결석"
        : index === 4
          ? "수업 시작 후 7분 입실"
          : undefined,
  }));

export function getChildAttendance(studentId: string) {
  if (studentId === "student-1") return userAttendanceRecords;
  if (studentId === "student-13") return secondChildAttendanceRecords;
  return [];
}

export const teacherAttendanceClasses: TeacherAttendanceClass[] = [
  {
    id: "middle-math-a",
    className: "중등 수학 A반",
    subject: "수학",
    startTime: "오후 2:30",
    endTime: "오후 4:00",
    processingStatus: "미처리 3명",
    students: [
      {
        id: "student-1",
        name: "김리피",
        status: "present",
        checkInTime: "오후 2:21",
      },
      {
        id: "student-2",
        name: "이서연",
        status: "present",
        checkInTime: "오후 2:24",
      },
      {
        id: "student-3",
        name: "박지호",
        status: "late",
        checkInTime: "오후 2:37",
      },
      {
        id: "student-4",
        name: "최하윤",
        status: "present",
        checkInTime: "오후 2:19",
      },
      {
        id: "student-5",
        name: "정도윤",
        status: "present",
        checkInTime: "오후 2:25",
      },
      {
        id: "student-6",
        name: "한지우",
        status: "present",
        checkInTime: "오후 2:22",
      },
      {
        id: "student-7",
        name: "윤서준",
        status: "present",
        checkInTime: "오후 2:26",
      },
      {
        id: "student-8",
        name: "송예린",
        status: "present",
        checkInTime: "오후 2:20",
      },
      {
        id: "student-9",
        name: "임시우",
        status: "present",
        checkInTime: "오후 2:23",
      },
      {
        id: "student-10",
        name: "강유나",
        status: "pending",
        checkInTime: null,
      },
      {
        id: "student-11",
        name: "조현우",
        status: "pending",
        checkInTime: null,
      },
      {
        id: "student-12",
        name: "오수빈",
        status: "pending",
        checkInTime: null,
      },
    ],
  },
  {
    id: "middle-math-b",
    className: "중등 수학 B반",
    subject: "수학",
    startTime: "오후 5:00",
    endTime: "오후 6:30",
    processingStatus: "미처리 2명",
    students: [
      {
        id: "student-13",
        name: "김리니",
        status: "present",
        checkInTime: "오후 4:51",
      },
      {
        id: "student-14",
        name: "이채원",
        status: "present",
        checkInTime: "오후 4:53",
      },
      {
        id: "student-15",
        name: "박준영",
        status: "present",
        checkInTime: "오후 4:49",
      },
      {
        id: "student-16",
        name: "최서아",
        status: "late",
        checkInTime: "오후 5:06",
      },
      {
        id: "student-17",
        name: "정시윤",
        status: "present",
        checkInTime: "오후 4:55",
      },
      {
        id: "student-18",
        name: "한예준",
        status: "present",
        checkInTime: "오후 4:52",
      },
      { id: "student-19", name: "윤지민", status: "absent", checkInTime: null },
      {
        id: "student-20",
        name: "송하준",
        status: "present",
        checkInTime: "오후 4:54",
      },
      {
        id: "student-21",
        name: "임나은",
        status: "pending",
        checkInTime: null,
      },
      {
        id: "student-22",
        name: "강민재",
        status: "pending",
        checkInTime: null,
      },
    ],
  },
  {
    id: "high-math-basic",
    className: "고등 수학 기초반",
    subject: "수학",
    startTime: "오후 7:00",
    endTime: "오후 8:30",
    processingStatus: "처리 완료",
    students: [
      {
        id: "student-23",
        name: "김가은",
        status: "present",
        checkInTime: "오후 6:51",
      },
      {
        id: "student-24",
        name: "이준서",
        status: "present",
        checkInTime: "오후 6:54",
      },
      {
        id: "student-25",
        name: "박서윤",
        status: "present",
        checkInTime: "오후 6:52",
      },
      {
        id: "student-26",
        name: "최도윤",
        status: "present",
        checkInTime: "오후 6:55",
      },
      {
        id: "student-27",
        name: "정유진",
        status: "late",
        checkInTime: "오후 7:04",
      },
      {
        id: "student-28",
        name: "한승우",
        status: "present",
        checkInTime: "오후 6:50",
      },
      {
        id: "student-29",
        name: "윤하린",
        status: "present",
        checkInTime: "오후 6:53",
      },
      {
        id: "student-30",
        name: "송지후",
        status: "present",
        checkInTime: "오후 6:56",
      },
    ],
  },
];

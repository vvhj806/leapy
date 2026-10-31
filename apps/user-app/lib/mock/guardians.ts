export type ChildProfile = {
  id: string;
  name: string;
  grade: string;
  academyId: string;
  academyName: string;
  classIds: string[];
  className: string;
  teacherName: string;
};

export const demoGuardian = {
  id: "guardian-demo-1",
  displayName: "김보호자",
  role: "학부모",
  childIds: ["student-1", "student-13"],
} as const;

export const guardianChildren: ChildProfile[] = [
  {
    id: "student-1",
    name: "김리피",
    grade: "중학교 2학년",
    academyId: "academy-demo-1",
    academyName: "Leapy 학원",
    classIds: ["middle-math-a"],
    className: "중등 수학 A반",
    teacherName: "김선생 선생님",
  },
  {
    id: "student-13",
    name: "김리니",
    grade: "중학교 1학년",
    academyId: "academy-demo-1",
    academyName: "Leapy 학원",
    classIds: ["middle-math-b"],
    className: "중등 수학 B반",
    teacherName: "김선생 선생님",
  },
];

export function getGuardianChild(studentId: string) {
  return guardianChildren.find((child) => child.id === studentId);
}

export function isGuardianChild(studentId: string) {
  return demoGuardian.childIds.includes(
    studentId as (typeof demoGuardian.childIds)[number],
  );
}

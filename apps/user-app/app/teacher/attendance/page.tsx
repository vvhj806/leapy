import { AttendancePageIntro } from "@/components/attendance/attendance-ui";
import { TeacherAttendancePanel } from "@/components/attendance/teacher-attendance-panel";

export default function TeacherAttendancePage() {
  return (
    <main className="w-full max-w-full min-w-0 space-y-8">
      <AttendancePageIntro
        title="출결 관리"
        description="수업을 선택하고 학생 출결 상태를 확인하세요."
      />
      <TeacherAttendancePanel />
    </main>
  );
}

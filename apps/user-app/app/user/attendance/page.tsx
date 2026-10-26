import { AttendancePageIntro } from "@/components/attendance/attendance-ui";
import { UserAttendanceView } from "@/components/attendance/user-attendance-view";

export default function UserAttendancePage() {
  return (
    <main className="w-full max-w-full min-w-0 space-y-8">
      <AttendancePageIntro
        title="출결"
        description="수업별 출결 기록을 확인하세요."
      />
      <UserAttendanceView />
    </main>
  );
}

import { NoticeList } from "@/components/notice/notice-list";
import { getNoticesForRole } from "@/lib/mock/notices";

export default function TeacherNoticePage() {
  return <NoticeList notices={getNoticesForRole("teacher")} role="teacher" />;
}

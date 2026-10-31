import { NoticeList } from "@/components/notice/notice-list";
import { getNoticesForRole } from "@/lib/mock/notices";

export default function UserNoticePage() {
  return <NoticeList notices={getNoticesForRole("user")} role="user" />;
}

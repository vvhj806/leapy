import { notFound } from "next/navigation";

import { NoticeDetail } from "@/components/notice/notice-detail";
import { canViewNotice, getNoticeById, notices } from "@/lib/mock/notices";

export function generateStaticParams() {
  return notices
    .filter((notice) => canViewNotice(notice, "teacher"))
    .map((notice) => ({ id: notice.id }));
}

export default async function TeacherNoticeDetailPage({
  params,
}: PageProps<"/teacher/notice/[id]">) {
  const { id } = await params;
  const notice = getNoticeById(id);

  if (!notice || !canViewNotice(notice, "teacher")) notFound();

  return <NoticeDetail notice={notice} role="teacher" />;
}

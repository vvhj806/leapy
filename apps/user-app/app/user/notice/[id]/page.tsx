import { notFound } from "next/navigation";

import { NoticeDetail } from "@/components/notice/notice-detail";
import { canViewNotice, getNoticeById, notices } from "@/lib/mock/notices";

export function generateStaticParams() {
  return notices
    .filter((notice) => canViewNotice(notice, "user"))
    .map((notice) => ({ id: notice.id }));
}

export default async function UserNoticeDetailPage({
  params,
}: PageProps<"/user/notice/[id]">) {
  const { id } = await params;
  const notice = getNoticeById(id);

  if (!notice || !canViewNotice(notice, "user")) notFound();

  return <NoticeDetail notice={notice} role="user" />;
}

import { notFound } from "next/navigation";

import { ScheduleDetail } from "@/components/schedule/schedule-detail";
import { getAcademyClass } from "@/lib/mock/classes";
import { classSessions, getSession } from "@/lib/mock/schedule";

export function generateStaticParams() {
  return classSessions
    .filter((session) => session.userVisible)
    .map((session) => ({ id: session.id }));
}

export default async function UserScheduleDetailPage({
  params,
}: PageProps<"/user/schedule/[id]">) {
  const { id } = await params;
  const session = getSession(id);
  if (!session?.userVisible) notFound();
  const academyClass = getAcademyClass(session.classId);
  if (!academyClass) notFound();
  return <ScheduleDetail session={session} academyClass={academyClass} />;
}

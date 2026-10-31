import { notFound } from "next/navigation";

import { GuardianScheduleDetail } from "@/components/schedule/guardian-schedule-detail";
import { guardianChildren } from "@/lib/mock/guardians";
import { getAcademyClass } from "@/lib/mock/classes";
import { classSessions, getSession } from "@/lib/mock/schedule";

export function generateStaticParams() {
  return classSessions
    .filter((session) =>
      guardianChildren.some((child) =>
        child.classIds.includes(session.classId),
      ),
    )
    .map((session) => ({ id: session.id }));
}

export default async function UserScheduleDetailPage({
  params,
}: PageProps<"/user/schedule/[id]">) {
  const { id } = await params;
  const session = getSession(id);
  if (!session) notFound();
  const academyClass = getAcademyClass(session.classId);
  if (!academyClass) notFound();
  return (
    <GuardianScheduleDetail session={session} academyClass={academyClass} />
  );
}

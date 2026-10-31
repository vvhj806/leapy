import { notFound } from "next/navigation";

import { ClassDetail } from "@/components/classes/class-detail";
import { academyClasses, getAcademyClass } from "@/lib/mock/classes";

export function generateStaticParams() {
  return academyClasses.map((academyClass) => ({ id: academyClass.id }));
}

export default async function TeacherClassDetailPage({
  params,
}: PageProps<"/teacher/classes/[id]">) {
  const { id } = await params;
  const academyClass = getAcademyClass(id);
  if (!academyClass) notFound();
  return <ClassDetail academyClass={academyClass} />;
}

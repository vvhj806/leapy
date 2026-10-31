import { notFound } from "next/navigation";

import { GuardianReportDetail } from "@/components/reports/guardian-reports";
import { getReport, mockReports } from "@/lib/mock/reports";
import { isGuardianChild } from "@/lib/mock/guardians";

export function generateStaticParams() {
  return mockReports
    .filter(
      (report) =>
        report.status === "published" && isGuardianChild(report.studentId),
    )
    .map((report) => ({ id: report.id }));
}
export default async function UserReportDetailPage({
  params,
}: PageProps<"/user/report/[id]">) {
  const { id } = await params;
  const report = getReport(id);
  if (
    !report ||
    report.status !== "published" ||
    !isGuardianChild(report.studentId)
  )
    notFound();
  return <GuardianReportDetail report={report} />;
}

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { ReportContent } from "@/components/reports/report-ui";
import { demoStudentId, getReport, getUserReports } from "@/lib/mock/reports";

export function generateStaticParams() {
  return getUserReports().map((report) => ({ id: report.id }));
}
export default async function UserReportDetailPage({
  params,
}: PageProps<"/user/report/[id]">) {
  const { id } = await params;
  const report = getReport(id);
  if (
    !report ||
    report.status !== "published" ||
    report.studentId !== demoStudentId
  )
    notFound();
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/user/report"
          className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="size-4" />
          학습 리포트로
        </Link>
        <ReportContent report={report} />
      </div>
    </main>
  );
}

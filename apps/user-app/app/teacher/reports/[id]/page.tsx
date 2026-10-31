import { ReportForm } from "@/components/reports/report-form";
import { getReport, mockReports } from "@/lib/mock/reports";
export function generateStaticParams() {
  return mockReports.map((report) => ({ id: report.id }));
}
export default async function TeacherReportDetailPage({
  params,
}: PageProps<"/teacher/reports/[id]">) {
  const { id } = await params;
  return <ReportForm reportId={id} initialReport={getReport(id)} />;
}

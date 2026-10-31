import { UserReportView } from "@/components/reports/user-report-view";
import { getUserReports } from "@/lib/mock/reports";

export default function UserReportPage() {
  return <UserReportView reports={getUserReports()} />;
}

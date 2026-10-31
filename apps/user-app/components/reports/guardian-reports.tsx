"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { useGuardian } from "@/components/guardian/guardian-provider";
import { ReportContent } from "@/components/reports/report-ui";
import { UserReportView } from "@/components/reports/user-report-view";
import { Button } from "@/components/ui/button";
import { getUserReports, type LearningReport } from "@/lib/mock/reports";

export function GuardianReportList() {
  const { selectedChild } = useGuardian();
  return (
    <UserReportView
      key={selectedChild.id}
      reports={getUserReports(selectedChild.id)}
    />
  );
}

export function GuardianReportDetail({ report }: { report: LearningReport }) {
  const { selectedChild } = useGuardian();
  if (report.studentId !== selectedChild.id)
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-bold">선택한 자녀의 리포트가 아닙니다.</h1>
        <p className="mt-2 text-sm text-gray-500">
          자녀를 다시 선택하거나 리포트 목록으로 이동해 주세요.
        </p>
        <Button
          nativeButton={false}
          className="mt-5"
          render={<Link href="/user/report" />}
        >
          리포트 목록으로
        </Button>
      </div>
    );
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/user/report"
          className="mb-4 inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="size-4" /> 학습 리포트로
        </Link>
        <ReportContent report={report} />
      </div>
    </main>
  );
}

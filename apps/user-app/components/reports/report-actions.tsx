"use client";

import { useState } from "react";
import { Download, Printer } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { LearningReport } from "@/lib/mock/reports";
import { resolveMonthlyReport } from "@/lib/reports/report-view-model";

export function ReportActions({ report }: { report: LearningReport }) {
  const viewModel = resolveMonthlyReport(report);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  async function download() {
    if (loading) return;
    setLoading(true);
    setMessage("");
    try {
      const [{ Font, pdf }, { MonthlyReportPdf }] = await Promise.all([
        import("@react-pdf/renderer"),
        import("@/components/reports/report-pdf"),
      ]);
      const origin = window.location.origin;
      Font.register({
        family: "PretendardPdf",
        fonts: [
          { src: `${origin}/user/report/font/regular`, fontWeight: 400 },
          { src: `${origin}/user/report/font/bold`, fontWeight: 700 },
        ],
      });
      const blob = await pdf(<MonthlyReportPdf report={report} />).toBlob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `Leapy_${viewModel.student?.name ?? report.studentId}_${report.period}_학습종합리포트.pdf`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("PDF 다운로드가 완료되었습니다.");
    } catch {
      setMessage("PDF를 생성하지 못했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="report-actions">
      <div className="flex flex-wrap gap-2">
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl bg-white"
          onClick={download}
          disabled={loading}
        >
          <Download className="size-4" />
          {loading ? "PDF 생성 중…" : "PDF 다운로드"}
        </Button>
        <Button
          type="button"
          variant="outline"
          className="h-11 rounded-xl bg-white"
          onClick={() => window.print()}
        >
          <Printer className="size-4" />
          인쇄하기
        </Button>
      </div>
      <p aria-live="polite" className="mt-2 text-xs text-primary-700">
        {message}
      </p>
    </div>
  );
}

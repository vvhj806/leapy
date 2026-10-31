"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { ChevronLeft, ChevronRight, FilePlus2, Search, X } from "lucide-react";

import { ReportStatusBadge } from "@/components/reports/report-ui";
import {
  getDraftSnapshot,
  getServerDraftSnapshot,
  parseDrafts,
  subscribeToDrafts,
} from "@/components/reports/report-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { academyClasses } from "@/lib/mock/classes";
import {
  formatReportDate,
  formatReportPeriod,
  getReportContext,
  mockReports,
  type ReportStatus,
} from "@/lib/mock/reports";
import { cn } from "@/lib/utils";

export function TeacherReportList() {
  const snapshot = useSyncExternalStore(
    subscribeToDrafts,
    getDraftSnapshot,
    getServerDraftSnapshot,
  );
  const savedDrafts = useMemo(() => parseDrafts(snapshot), [snapshot]);
  const reports = useMemo(
    () => [
      ...savedDrafts,
      ...mockReports.filter(
        (report) => !savedDrafts.some((draft) => draft.id === report.id),
      ),
    ],
    [savedDrafts],
  );
  const [classId, setClassId] = useState("all");
  const [query, setQuery] = useState("");
  const [period, setPeriod] = useState("2026-10");
  const [status, setStatus] = useState<"all" | ReportStatus>("all");
  const filtered = reports.filter((report) => {
    const { student } = getReportContext(report);
    return (
      (classId === "all" || report.classId === classId) &&
      (!query.trim() || student?.name.includes(query.trim())) &&
      report.period === period &&
      (status === "all" || report.status === status)
    );
  });
  const draftCount = reports.filter((r) => r.status === "draft").length;
  const publishedCount = reports.filter((r) => r.status === "published").length;
  function moveMonth(amount: number) {
    const [year, month] = period.split("-").map(Number);
    const next = new Date(year, month - 1 + amount, 1);
    setPeriod(
      `${next.getFullYear()}-${String(next.getMonth() + 1).padStart(2, "0")}`,
    );
  }
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-5xl space-y-8">
        <header className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              학습 리포트 관리
            </h1>
            <p className="mt-1 text-sm leading-6 text-gray-500">
              담당 학생의 학습 기록을 확인하고 리포트를 작성하세요.
            </p>
          </div>
          <Button
            render={<Link href="/teacher/reports/new" />}
            className="h-11 rounded-xl px-4"
          >
            <FilePlus2 className="size-4" />새 리포트 작성
          </Button>
        </header>
        <section aria-label="리포트 현황">
          <dl className="grid grid-cols-3 divide-x divide-primary-100 rounded-2xl bg-primary-50/70 px-2 py-4 text-center">
            {[
              ["전체", reports.length],
              ["작성 중", draftCount],
              ["발행 완료", publishedCount],
            ].map(([label, value]) => (
              <div key={label}>
                <dt className="text-xs text-primary-600">{label}</dt>
                <dd className="mt-1 text-lg font-bold text-primary-900">
                  {value}개
                </dd>
              </div>
            ))}
          </dl>
        </section>
        <section aria-labelledby="report-filter-heading">
          <h2 id="report-filter-heading" className="sr-only">
            리포트 검색 및 필터
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="report-class"
                className="mb-1.5 block text-xs font-semibold text-gray-600"
              >
                담당 반
              </label>
              <select
                id="report-class"
                value={classId}
                onChange={(e) => setClassId(e.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm"
              >
                <option value="all">전체 담당 반</option>
                {academyClasses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="report-student-search"
                className="mb-1.5 block text-xs font-semibold text-gray-600"
              >
                학생 검색
              </label>
              <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400" />
                <Input
                  id="report-student-search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="학생 이름"
                  className="h-11 rounded-xl pr-10 pl-9"
                />
                {query ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="검색어 지우기"
                    onClick={() => setQuery("")}
                    className="absolute top-1/2 right-1 size-9 -translate-y-1/2"
                  >
                    <X className="size-4" />
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center rounded-xl border border-gray-200 bg-white p-1">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="이전 달"
                onClick={() => moveMonth(-1)}
              >
                <ChevronLeft className="size-4" />
              </Button>
              <span className="min-w-28 text-center text-sm font-bold">
                {formatReportPeriod(period)}
              </span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                aria-label="다음 달"
                onClick={() => moveMonth(1)}
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
            <div
              role="group"
              aria-label="작성 상태"
              className="flex rounded-xl bg-gray-100 p-1"
            >
              {[
                ["all", "전체"],
                ["draft", "작성 중"],
                ["published", "발행 완료"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={status === value}
                  onClick={() => setStatus(value as typeof status)}
                  className={cn(
                    "min-h-11 rounded-lg px-3 text-sm font-semibold",
                    status === value
                      ? "bg-white text-primary-700 shadow-sm"
                      : "text-gray-500",
                  )}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
        </section>
        <section aria-labelledby="teacher-report-list-heading">
          <div className="mb-3 flex items-center justify-between">
            <h2 id="teacher-report-list-heading" className="text-lg font-bold">
              리포트 목록
            </h2>
            <span className="text-xs text-gray-500">{filtered.length}개</span>
          </div>
          {filtered.length ? (
            <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
              {filtered.map((report) => {
                const { student, academyClass } = getReportContext(report);
                return (
                  <li key={report.id}>
                    <Link
                      href={`/teacher/reports/${report.id}`}
                      className="group flex min-h-24 items-center gap-3 px-4 py-4 hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
                    >
                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-center gap-2">
                          <strong className="text-sm text-gray-900">
                            {student?.name}
                          </strong>
                          <ReportStatusBadge status={report.status} />
                        </span>
                        <span className="mt-2 block text-xs text-gray-500">
                          {academyClass?.name} ·{" "}
                          {formatReportPeriod(report.period)}
                        </span>
                        <span className="mt-1 block text-xs text-gray-400">
                          {report.status === "published"
                            ? `${formatReportDate(report.publishedAt)} 발행`
                            : `${formatReportDate(report.updatedAt)} 수정`}
                        </span>
                      </span>
                      <span className="text-xs font-semibold text-primary-700">
                        {report.status === "draft" ? "계속 작성" : "상세 보기"}
                      </span>
                      <ChevronRight className="size-4 text-gray-300" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 py-12 text-center">
              <p className="font-semibold text-gray-700">
                조건에 맞는 리포트가 없어요.
              </p>
              <button
                type="button"
                onClick={() => {
                  setClassId("all");
                  setQuery("");
                  setStatus("all");
                  setPeriod("2026-10");
                }}
                className="mt-3 min-h-11 text-sm font-bold text-primary-700"
              >
                필터 초기화
              </button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

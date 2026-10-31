"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Clock3, Info } from "lucide-react";

import {
  AttendanceStatusBadge,
  AttendanceSummary,
} from "@/components/attendance/attendance-ui";
import { Button } from "@/components/ui/button";
import { useGuardian } from "@/components/guardian/guardian-provider";
import { Card, CardContent } from "@/components/ui/card";
import {
  type AttendanceStatus,
  getChildAttendance,
} from "@/lib/mock/attendance";

const initialMonth = { year: 2026, month: 7 };

function getCounts(statuses: AttendanceStatus[]) {
  return statuses.reduce<Record<AttendanceStatus, number>>(
    (counts, status) => ({ ...counts, [status]: counts[status] + 1 }),
    { present: 0, late: 0, absent: 0, pending: 0 },
  );
}

export function UserAttendanceView() {
  const { selectedChild } = useGuardian();
  const [selectedMonth, setSelectedMonth] = useState(initialMonth);
  const isInitialMonth =
    selectedMonth.year === initialMonth.year &&
    selectedMonth.month === initialMonth.month;
  const records = isInitialMonth ? getChildAttendance(selectedChild.id) : [];
  const counts = getCounts(records.map((record) => record.status));

  function moveMonth(offset: number) {
    setSelectedMonth((current) => {
      const date = new Date(current.year, current.month - 1 + offset, 1);
      return { year: date.getFullYear(), month: date.getMonth() + 1 };
    });
  }

  return (
    <div className="space-y-8">
      <section aria-labelledby="user-attendance-summary-heading">
        <h2
          id="user-attendance-summary-heading"
          className="text-lg font-bold tracking-tight text-gray-900"
        >
          {selectedChild.name}의 이번 달 출결 요약
        </h2>
        <div className="mt-3">
          <AttendanceSummary counts={counts} />
        </div>
      </section>

      <section aria-labelledby="user-attendance-records-heading">
        <div className="flex min-h-11 items-center justify-between gap-3">
          <h2
            id="user-attendance-records-heading"
            className="text-lg font-bold tracking-tight text-gray-900"
          >
            출결 기록
          </h2>
          <div
            aria-label="조회할 월 선택"
            className="flex items-center rounded-xl bg-white p-1 ring-1 ring-gray-200"
          >
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="이전 달 보기"
              onClick={() => moveMonth(-1)}
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </Button>
            <p
              className="min-w-24 text-center text-sm font-bold text-gray-800"
              aria-live="polite"
            >
              {selectedMonth.year}년 {selectedMonth.month}월
            </p>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="rounded-lg"
              aria-label="다음 달 보기"
              onClick={() => moveMonth(1)}
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <Card className="mt-3 gap-0 rounded-2xl border border-gray-100 py-0 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
          <CardContent className="divide-y divide-gray-100 px-0">
            {records.length > 0 ? (
              records.map((record) => (
                <article
                  key={record.id}
                  className="grid gap-3 px-4 py-4 sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:px-5"
                >
                  <div>
                    <p className="text-sm font-bold text-gray-900">
                      {record.date}
                    </p>
                    <p className="mt-1 text-xs text-gray-500">{record.day}</p>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-gray-800">
                        {record.subject}
                      </h3>
                      <span className="text-xs text-gray-400">
                        {record.className}
                      </span>
                    </div>
                    <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
                      <Clock3 className="size-3.5" aria-hidden="true" />
                      {record.startTime}~{record.endTime}
                    </p>
                    {record.note ? (
                      <p className="mt-2 text-xs text-gray-500">
                        {record.note}
                      </p>
                    ) : null}
                  </div>

                  <div className="flex items-center justify-between gap-3 sm:flex-col sm:items-end">
                    <AttendanceStatusBadge status={record.status} />
                    <p className="text-xs text-gray-500">
                      {record.checkInTime
                        ? `${record.checkInTime} 입실`
                        : "입실 정보 없음"}
                    </p>
                  </div>
                </article>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <p className="font-semibold text-gray-700">
                  조회할 출결 기록이 없습니다.
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  다른 월을 선택해 확인해 주세요.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <aside
        aria-labelledby="attendance-guide-heading"
        className="rounded-2xl bg-primary-50/70 p-4 sm:p-5"
      >
        <div className="flex gap-3">
          <Info
            className="mt-0.5 size-5 shrink-0 text-primary-700"
            aria-hidden="true"
          />
          <div>
            <h2
              id="attendance-guide-heading"
              className="text-sm font-bold text-gray-800"
            >
              출결 안내
            </h2>
            <ul className="mt-2 space-y-1 text-sm leading-6 text-gray-600">
              <li>출결 정보가 실제 수업과 다르면 학원에 문의해 주세요.</li>
              <li>지각 및 결석 기준은 학원 정책에 따라 달라질 수 있습니다.</li>
            </ul>
          </div>
        </div>
      </aside>
    </div>
  );
}

"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, Users } from "lucide-react";

import {
  AttendanceStatusBadge,
  AttendanceSummary,
  attendanceStatusMeta,
} from "@/components/attendance/attendance-ui";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  type AttendanceStatus,
  teacherAttendanceClasses,
} from "@/lib/mock/attendance";
import { cn } from "@/lib/utils";

const selectableStatuses: AttendanceStatus[] = ["present", "late", "absent"];

function getCounts(statuses: AttendanceStatus[]) {
  return statuses.reduce<Record<AttendanceStatus, number>>(
    (counts, status) => ({ ...counts, [status]: counts[status] + 1 }),
    { present: 0, late: 0, absent: 0, pending: 0 },
  );
}

export function TeacherAttendancePanel() {
  const [classes, setClasses] = useState(teacherAttendanceClasses);
  const [selectedClassId, setSelectedClassId] = useState(classes[0].id);
  const [pendingOnly, setPendingOnly] = useState(false);
  const [message, setMessage] = useState("");
  const selectedClass =
    classes.find((classItem) => classItem.id === selectedClassId) ?? classes[0];
  const counts = useMemo(
    () => getCounts(selectedClass.students.map((student) => student.status)),
    [selectedClass],
  );
  const visibleStudents = pendingOnly
    ? selectedClass.students.filter((student) => student.status === "pending")
    : selectedClass.students;

  function selectClass(classId: string) {
    setSelectedClassId(classId);
    setPendingOnly(false);
    setMessage("");
  }

  function updateStatus(studentId: string, status: AttendanceStatus) {
    setClasses((currentClasses) =>
      currentClasses.map((classItem) =>
        classItem.id === selectedClassId
          ? {
              ...classItem,
              students: classItem.students.map((student) =>
                student.id === studentId
                  ? {
                      ...student,
                      status,
                      checkInTime:
                        status === "absent"
                          ? null
                          : (student.checkInTime ?? "수동 처리"),
                    }
                  : student,
              ),
            }
          : classItem,
      ),
    );
    setMessage("");
  }

  return (
    <div className="space-y-8">
      <section
        aria-labelledby="teacher-class-selector-heading"
        className="w-full max-w-full min-w-0 overflow-hidden"
      >
        <h2
          id="teacher-class-selector-heading"
          className="text-lg font-bold tracking-tight text-gray-900"
        >
          오늘 수업
        </h2>
        <div
          role="group"
          aria-label="출결을 관리할 수업 선택"
          className="mt-3 flex w-full max-w-full min-w-0 snap-x snap-mandatory gap-3 overflow-x-auto pb-2 pr-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {classes.map((classItem) => {
            const selected = classItem.id === selectedClassId;
            const pendingCount = classItem.students.filter(
              (student) => student.status === "pending",
            ).length;

            return (
              <button
                key={classItem.id}
                type="button"
                aria-pressed={selected}
                onClick={() => selectClass(classItem.id)}
                className={cn(
                  "w-auto max-w-none basis-[82%] shrink-0 snap-start rounded-2xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 lg:basis-[calc((100%_-_1.5rem)/3)]",
                  selected
                    ? "border-primary-600 bg-primary-600 text-white shadow-[0_10px_28px_rgba(109,40,217,0.2)]"
                    : "border-gray-100 bg-white text-gray-900 shadow-[0_6px_20px_rgba(17,24,39,0.035)]",
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span
                    className={cn(
                      "text-sm font-bold",
                      selected ? "text-primary-100" : "text-primary-700",
                    )}
                  >
                    {classItem.startTime}
                  </span>
                  <Badge
                    className={cn(
                      "rounded-full",
                      selected
                        ? "bg-white/15 text-white"
                        : pendingCount > 0
                          ? "bg-orange-50 text-orange-700"
                          : "bg-green-50 text-green-700",
                    )}
                  >
                    {pendingCount > 0
                      ? `미처리 ${pendingCount}명`
                      : "처리 완료"}
                  </Badge>
                </div>
                <p className="mt-4 font-bold">{classItem.className}</p>
                <p
                  className={cn(
                    "mt-1 text-xs",
                    selected ? "text-primary-100" : "text-gray-500",
                  )}
                >
                  {classItem.subject} · {classItem.students.length}명
                </p>
              </button>
            );
          })}
        </div>
      </section>

      <section aria-labelledby="selected-class-summary-heading">
        <h2 id="selected-class-summary-heading" className="sr-only">
          선택 수업 요약
        </h2>
        <div className="rounded-2xl bg-primary-50/70 p-4 sm:p-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-primary-700">
                선택한 수업
              </p>
              <h3 className="mt-1 text-xl font-bold text-gray-900">
                {selectedClass.className}
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {selectedClass.subject}
              </p>
            </div>
            <AttendanceStatusBadge
              status={counts.pending > 0 ? "pending" : "present"}
              className="mt-1"
            />
          </div>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-600">
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-4" aria-hidden="true" />
              {selectedClass.startTime}~{selectedClass.endTime}
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="size-4" aria-hidden="true" />
              학생 {selectedClass.students.length}명
            </span>
          </div>
        </div>
      </section>

      <section aria-labelledby="teacher-attendance-summary-heading">
        <h2
          id="teacher-attendance-summary-heading"
          className="text-lg font-bold tracking-tight text-gray-900"
        >
          출결 상태
        </h2>
        <div className="mt-3">
          <AttendanceSummary counts={counts} unit="명" />
        </div>
      </section>

      <section aria-labelledby="student-attendance-heading">
        <div className="flex min-h-11 flex-wrap items-center justify-between gap-3">
          <div>
            <h2
              id="student-attendance-heading"
              className="text-lg font-bold tracking-tight text-gray-900"
            >
              학생 출결
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              학생별 상태를 선택해 주세요.
            </p>
          </div>
          <div
            role="group"
            aria-label="학생 출결 필터"
            className="flex rounded-xl bg-gray-100 p-1"
          >
            <button
              type="button"
              aria-pressed={!pendingOnly}
              onClick={() => setPendingOnly(false)}
              className={cn(
                "min-h-11 rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300",
                !pendingOnly
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-gray-500",
              )}
            >
              전체
            </button>
            <button
              type="button"
              aria-pressed={pendingOnly}
              onClick={() => setPendingOnly(true)}
              className={cn(
                "min-h-11 rounded-lg px-4 text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300",
                pendingOnly
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-gray-500",
              )}
            >
              미처리만
            </button>
          </div>
        </div>

        <Card className="mt-3 gap-0 rounded-2xl border border-gray-100 py-0 shadow-[0_8px_24px_rgba(17,24,39,0.04)] ring-0">
          <CardContent className="divide-y divide-gray-100 px-0">
            {visibleStudents.length > 0 ? (
              visibleStudents.map((student) => (
                <article
                  key={student.id}
                  className="grid min-w-0 gap-3 px-4 py-4 md:grid-cols-[minmax(0,1fr)_7rem_18rem] md:items-center md:px-5"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <Avatar className="size-9 shrink-0">
                      <AvatarFallback className="bg-primary-50 text-xs font-bold text-primary-700">
                        {student.name.slice(-2)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <h3 className="truncate text-sm font-bold text-gray-900">
                        {student.name}
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        {student.checkInTime
                          ? `${student.checkInTime} 입실`
                          : "입실 정보 없음"}
                      </p>
                    </div>
                    <AttendanceStatusBadge
                      status={student.status}
                      className="ml-auto md:hidden"
                    />
                  </div>

                  <div className="hidden md:block">
                    <AttendanceStatusBadge status={student.status} />
                  </div>

                  <div
                    role="group"
                    aria-label={`${student.name} 출결 상태 선택`}
                    className="grid grid-cols-3 gap-1 rounded-xl bg-gray-100 p-1"
                  >
                    {selectableStatuses.map((status) => {
                      const selected = student.status === status;

                      return (
                        <button
                          key={status}
                          type="button"
                          aria-pressed={selected}
                          onClick={() => updateStatus(student.id, status)}
                          className={cn(
                            "min-h-11 min-w-0 rounded-lg px-1 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300",
                            selected
                              ? attendanceStatusMeta[status].className
                              : "text-gray-500 hover:bg-white",
                          )}
                        >
                          {attendanceStatusMeta[status].label}
                        </button>
                      );
                    })}
                  </div>
                </article>
              ))
            ) : (
              <div className="px-5 py-12 text-center">
                <CheckCircle2
                  className="mx-auto size-7 text-green-600"
                  aria-hidden="true"
                />
                <p className="mt-3 font-semibold text-gray-700">
                  미처리 학생이 없습니다.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <div>
        <Button
          type="button"
          size="lg"
          className="w-full rounded-xl"
          onClick={() =>
            setMessage(
              "현재 화면의 출결 처리를 확인했습니다. 실제 저장은 연결되지 않았습니다.",
            )
          }
        >
          <CheckCircle2 className="size-4" aria-hidden="true" />
          출결 처리 완료
        </Button>
        <p
          className="mt-3 min-h-5 text-center text-sm text-primary-700"
          aria-live="polite"
        >
          {message}
        </p>
      </div>
    </div>
  );
}

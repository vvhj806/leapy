"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  MapPin,
  Search,
  UserRound,
  Users,
  X,
} from "lucide-react";

import { ScheduleStatusBadge } from "@/components/schedule/schedule-ui";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  formatTimeRange,
  formatWeekdays,
  getClassStudents,
  type AcademyClass,
} from "@/lib/mock/classes";
import {
  formatScheduleDate,
  getSessionsForClass,
  scheduleDemoToday,
} from "@/lib/mock/schedule";
import { cn } from "@/lib/utils";

type ClassTab = "schedule" | "students" | "information";

export function ClassDetail({ academyClass }: { academyClass: AcademyClass }) {
  const [tab, setTab] = useState<ClassTab>("schedule");
  const [studentQuery, setStudentQuery] = useState("");
  const sessions = getSessionsForClass(academyClass.id);
  const students = getClassStudents(academyClass);
  const normalizedQuery = studentQuery.trim().toLocaleLowerCase("ko-KR");
  const visibleStudents = students.filter((student) =>
    student.name.toLocaleLowerCase("ko-KR").includes(normalizedQuery),
  );
  const tabs = [
    { id: "schedule" as const, label: "수업 일정" },
    { id: "students" as const, label: "학생 명단" },
    { id: "information" as const, label: "반 정보" },
  ];

  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/teacher/classes"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          담당 수업으로
        </Link>
        <header className="mt-4 rounded-2xl bg-primary-50/70 p-4 sm:p-6">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold text-primary-700">
                {academyClass.level} · {academyClass.subject}
              </p>
              <h1 className="mt-1 break-keep text-2xl font-bold text-gray-900 sm:text-3xl">
                {academyClass.name}
              </h1>
            </div>
            <span className="rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-100">
              운영 중
            </span>
          </div>
          <dl className="mt-5 grid gap-3 text-sm text-gray-600 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <UserRound
                className="size-4 text-primary-500"
                aria-hidden="true"
              />
              <dt className="sr-only">담당 선생님</dt>
              <dd>{academyClass.teacherName}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Users className="size-4 text-primary-500" aria-hidden="true" />
              <dt className="sr-only">학생 수</dt>
              <dd>학생 {students.length}명</dd>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="size-4 text-primary-500" aria-hidden="true" />
              <dt className="sr-only">강의실</dt>
              <dd>{academyClass.room}</dd>
            </div>
            <div className="flex items-center gap-2">
              <Clock3 className="size-4 text-primary-500" aria-hidden="true" />
              <dt className="sr-only">정규 수업</dt>
              <dd>
                {formatWeekdays(academyClass.weekdays)}{" "}
                {formatTimeRange(academyClass.startTime, academyClass.endTime)}
              </dd>
            </div>
          </dl>
        </header>

        <div
          className="mt-7 grid grid-cols-3 rounded-xl bg-gray-100 p-1"
          role="tablist"
          aria-label="반 상세 정보"
        >
          {tabs.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              id={`class-tab-${item.id}`}
              aria-selected={tab === item.id}
              aria-controls={`class-panel-${item.id}`}
              tabIndex={tab === item.id ? 0 : -1}
              onClick={() => setTab(item.id)}
              className={cn(
                "min-h-11 rounded-lg px-2 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                tab === item.id
                  ? "bg-white text-primary-700 shadow-sm"
                  : "text-gray-500",
              )}
            >
              {item.label}
            </button>
          ))}
        </div>

        {tab === "schedule" ? (
          <section
            role="tabpanel"
            id="class-panel-schedule"
            aria-labelledby="class-tab-schedule"
            className="mt-6"
          >
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">수업 일정</h2>
              <span className="text-xs text-gray-500">예정 일정 우선</span>
            </div>
            {sessions.length ? (
              <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
                {[...sessions]
                  .sort(
                    (first, second) =>
                      Number(first.date < scheduleDemoToday) -
                        Number(second.date < scheduleDemoToday) ||
                      first.date.localeCompare(second.date),
                  )
                  .map((session) => (
                    <li
                      key={session.id}
                      className={cn(
                        "grid gap-3 px-4 py-4 sm:grid-cols-[8rem_1fr_auto] sm:items-center sm:px-5",
                        session.date < scheduleDemoToday && "opacity-60",
                      )}
                    >
                      <div>
                        <p className="text-sm font-bold text-gray-900">
                          {formatScheduleDate(session.date)}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {session.startTime}~{session.endTime}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-800">
                          {session.lesson}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          {session.room}
                        </p>
                        {session.changeReason ? (
                          <p className="mt-2 text-xs leading-5 text-orange-700">
                            {session.changeReason}
                          </p>
                        ) : null}
                      </div>
                      <ScheduleStatusBadge status={session.status} />
                    </li>
                  ))}
              </ul>
            ) : (
              <p className="rounded-2xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-500">
                등록된 수업 일정이 없습니다.
              </p>
            )}
          </section>
        ) : null}

        {tab === "students" ? (
          <section
            role="tabpanel"
            id="class-panel-students"
            aria-labelledby="class-tab-students"
            className="mt-6"
          >
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <h2 className="text-lg font-bold text-gray-900">학생 명단</h2>
                <p className="mt-1 text-sm text-gray-500">
                  등록 학생 {students.length}명
                </p>
              </div>
              <div className="relative w-full sm:w-64">
                <label htmlFor="class-student-search" className="sr-only">
                  학생 이름 검색
                </label>
                <Search
                  className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-gray-400"
                  aria-hidden="true"
                />
                <Input
                  id="class-student-search"
                  type="search"
                  value={studentQuery}
                  onChange={(event) => setStudentQuery(event.target.value)}
                  placeholder="학생 이름 검색"
                  className="h-11 rounded-xl pr-10 pl-9"
                />
                {studentQuery ? (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    aria-label="학생 검색어 지우기"
                    onClick={() => setStudentQuery("")}
                    className="absolute top-1/2 right-1 size-9 -translate-y-1/2"
                  >
                    <X className="size-4" />
                  </Button>
                ) : null}
              </div>
            </div>
            {visibleStudents.length ? (
              <ul className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
                {visibleStudents.map((student) => (
                  <li
                    key={student.id}
                    className="flex min-h-16 items-center gap-3 px-4 py-3 sm:px-5"
                  >
                    <Avatar className="size-9">
                      <AvatarFallback className="bg-primary-50 text-xs font-bold text-primary-700">
                        {student.name.slice(-2)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="min-w-0 flex-1">
                      <strong className="block text-sm text-gray-900">
                        {student.name}
                      </strong>
                      <span className="mt-0.5 block text-xs text-gray-500">
                        {student.grade}
                      </span>
                    </span>
                    <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                      {student.enrollmentStatus}
                    </span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="mt-4 rounded-2xl border border-dashed border-gray-200 py-10 text-center text-sm text-gray-500">
                검색 결과가 없습니다.
              </p>
            )}
          </section>
        ) : null}

        {tab === "information" ? (
          <section
            role="tabpanel"
            id="class-panel-information"
            aria-labelledby="class-tab-information"
            className="mt-6"
          >
            <h2 className="text-lg font-bold text-gray-900">반 정보</h2>
            <dl className="mt-4 divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white">
              {[
                ["반 이름", academyClass.name],
                [
                  "과목·수준",
                  `${academyClass.subject} · ${academyClass.level}`,
                ],
                ["담당 선생님", academyClass.teacherName],
                [
                  "정규 수업",
                  `${formatWeekdays(academyClass.weekdays)} ${formatTimeRange(academyClass.startTime, academyClass.endTime)}`,
                ],
                ["강의실", academyClass.room],
                ["운영 상태", "운영 중"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className="grid gap-1 px-4 py-4 sm:grid-cols-[8rem_1fr] sm:px-5"
                >
                  <dt className="text-sm font-semibold text-gray-500">
                    {label}
                  </dt>
                  <dd className="text-sm text-gray-800">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-5 rounded-2xl bg-gray-50 p-4 sm:p-5">
              <h3 className="font-bold text-gray-900">수업 소개</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                {academyClass.description}
              </p>
              <h3 className="mt-5 font-bold text-gray-900">준비물</h3>
              <ul className="mt-2 flex flex-wrap gap-2">
                {academyClass.materials.map((material) => (
                  <li
                    key={material}
                    className="rounded-full bg-white px-3 py-1.5 text-sm text-gray-600 ring-1 ring-gray-200"
                  >
                    {material}
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ) : null}

        <div className="mt-8 border-t border-gray-100 pt-6">
          <Button
            render={<Link href="/teacher/attendance" />}
            variant="outline"
            className="h-11 rounded-xl px-4"
          >
            <CheckCircle2 className="size-4" aria-hidden="true" />
            출결 관리 바로가기
          </Button>
        </div>
      </div>
    </main>
  );
}

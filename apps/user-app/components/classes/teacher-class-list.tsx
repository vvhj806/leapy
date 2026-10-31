"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Clock3,
  MapPin,
  RotateCcw,
  Search,
  Users,
  X,
} from "lucide-react";

import { ScheduleStatusBadge } from "@/components/schedule/schedule-ui";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  academyClasses,
  formatTimeRange,
  formatWeekdays,
} from "@/lib/mock/classes";
import {
  classSessions,
  getSessionClass,
  scheduleDemoToday,
} from "@/lib/mock/schedule";
import { cn } from "@/lib/utils";

export function TeacherClassList() {
  const [query, setQuery] = useState("");
  const [subject, setSubject] = useState("전체");
  const subjects = useMemo(
    () => ["전체", ...new Set(academyClasses.map((item) => item.subject))],
    [],
  );
  const todaySessions = classSessions
    .filter((session) => session.date === scheduleDemoToday)
    .sort((first, second) => first.startTime.localeCompare(second.startTime));
  const totalStudents = new Set(
    academyClasses.flatMap((academyClass) => academyClass.studentIds),
  ).size;
  const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");
  const filteredClasses = academyClasses.filter(
    (academyClass) =>
      (subject === "전체" || academyClass.subject === subject) &&
      (!normalizedQuery ||
        `${academyClass.name} ${academyClass.subject}`
          .toLocaleLowerCase("ko-KR")
          .includes(normalizedQuery)),
  );

  function resetFilters() {
    setQuery("");
    setSubject("전체");
  }

  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            담당 수업
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            담당 반과 학생, 수업 일정을 확인하세요.
          </p>
        </header>

        <section aria-labelledby="today-classes-heading">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2
              id="today-classes-heading"
              className="text-lg font-bold text-gray-900"
            >
              오늘의 수업
            </h2>
            <span className="text-xs font-medium text-gray-500">10월 31일</span>
          </div>
          {todaySessions.length ? (
            <ul className="divide-y divide-primary-100 overflow-hidden rounded-2xl border border-primary-100 bg-primary-50/50">
              {todaySessions.map((session) => {
                const academyClass = getSessionClass(session);
                if (!academyClass) return null;
                return (
                  <li key={session.id}>
                    <Link
                      href={`/teacher/classes/${academyClass.id}`}
                      className="group flex min-h-24 items-center gap-4 px-4 py-4 hover:bg-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-5"
                    >
                      <span className="w-12 shrink-0 text-sm font-bold tabular-nums text-primary-700">
                        {session.startTime}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block break-keep font-bold text-gray-900">
                          {academyClass.name}
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">
                          {academyClass.subject} · {session.room} · 학생{" "}
                          {academyClass.studentIds.length}명
                        </span>
                      </span>
                      <ScheduleStatusBadge
                        status={session.status}
                        className="hidden sm:inline-flex"
                      />
                      <ChevronRight
                        className="size-4 shrink-0 text-primary-300 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 py-10 text-center text-sm text-gray-500">
              오늘 예정된 수업이 없습니다.
            </div>
          )}
        </section>

        <section aria-labelledby="class-summary-heading">
          <h2 id="class-summary-heading" className="sr-only">
            담당 수업 요약
          </h2>
          <dl className="grid grid-cols-3 divide-x divide-primary-100 rounded-2xl bg-primary-50/70 px-2 py-4 text-center">
            {[
              ["담당 반", `${academyClasses.length}개`],
              ["담당 학생", `${totalStudents}명`],
              ["오늘 수업", `${todaySessions.length}개`],
            ].map(([label, value]) => (
              <div key={label} className="min-w-0 px-1 sm:px-4">
                <dt className="text-[0.6875rem] font-medium text-primary-600 sm:text-xs">
                  {label}
                </dt>
                <dd className="mt-1 text-base font-bold text-primary-900 sm:text-lg">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        <section aria-labelledby="class-search-heading">
          <h2 id="class-search-heading" className="sr-only">
            담당 반 검색 및 필터
          </h2>
          <label htmlFor="teacher-class-search" className="sr-only">
            반 이름 또는 과목 검색
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <Input
              id="teacher-class-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="반 이름이나 과목을 검색하세요"
              className="h-12 rounded-2xl border-gray-200 bg-white pr-12 pl-10 shadow-sm"
            />
            {query ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                aria-label="검색어 지우기"
                className="absolute top-1/2 right-2 size-9 -translate-y-1/2 rounded-xl"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            ) : null}
          </div>
          <div
            className="mt-3 flex flex-wrap gap-2"
            role="group"
            aria-label="과목 필터"
          >
            {subjects.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={subject === item}
                onClick={() => setSubject(item)}
                className={cn(
                  "min-h-11 rounded-full border px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                  subject === item
                    ? "border-primary-600 bg-primary-600 text-white"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-primary-50",
                )}
              >
                {item}
              </button>
            ))}
          </div>
        </section>

        <section aria-labelledby="assigned-classes-heading">
          <div className="mb-3 flex items-center justify-between gap-3">
            <h2
              id="assigned-classes-heading"
              className="text-lg font-bold text-gray-900"
            >
              담당 반
            </h2>
            <p className="text-xs text-gray-500">{filteredClasses.length}개</p>
          </div>
          {filteredClasses.length ? (
            <ul className="grid gap-3 md:grid-cols-2">
              {filteredClasses.map((academyClass) => (
                <li key={academyClass.id}>
                  <Link
                    href={`/teacher/classes/${academyClass.id}`}
                    className="group flex h-full min-h-48 flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-[0_8px_24px_rgba(17,24,39,0.04)] transition hover:border-primary-200 hover:shadow-[0_10px_28px_rgba(109,40,217,0.08)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-primary-700">
                          {academyClass.level} · {academyClass.subject}
                        </p>
                        <h3 className="mt-1 break-keep text-lg font-bold text-gray-900">
                          {academyClass.name}
                        </h3>
                      </div>
                      <span className="rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                        운영 중
                      </span>
                    </div>
                    <div className="mt-5 grid gap-2 text-sm text-gray-600">
                      <span className="flex items-center gap-2">
                        <Clock3
                          className="size-4 text-gray-400"
                          aria-hidden="true"
                        />
                        {formatWeekdays(academyClass.weekdays)}{" "}
                        {formatTimeRange(
                          academyClass.startTime,
                          academyClass.endTime,
                        )}
                      </span>
                      <span className="flex items-center gap-2">
                        <Users
                          className="size-4 text-gray-400"
                          aria-hidden="true"
                        />
                        학생 {academyClass.studentIds.length}명 ·{" "}
                        {academyClass.teacherName}
                      </span>
                      <span className="flex items-center gap-2">
                        <MapPin
                          className="size-4 text-gray-400"
                          aria-hidden="true"
                        />
                        {academyClass.room}
                      </span>
                    </div>
                    <span className="mt-auto flex items-center justify-end gap-1 pt-4 text-sm font-semibold text-primary-700">
                      반 상세 보기
                      <ChevronRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-4 text-center">
              <BookOpen className="size-7 text-gray-300" aria-hidden="true" />
              <p className="mt-3 font-semibold text-gray-700">
                조건에 맞는 담당 반이 없어요.
              </p>
              <Button
                type="button"
                variant="outline"
                className="mt-4 h-11 rounded-xl px-4"
                onClick={resetFilters}
              >
                <RotateCcw className="size-4" aria-hidden="true" />
                필터 초기화
              </Button>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

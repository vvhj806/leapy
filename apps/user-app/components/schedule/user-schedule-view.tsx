"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  BookOpen,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
} from "lucide-react";

import { ScheduleStatusBadge } from "@/components/schedule/schedule-ui";
import { Button } from "@/components/ui/button";
import {
  addDays,
  type ClassSession,
  formatMonth,
  formatScheduleDate,
  getSessionClass,
  getStartOfWeek,
  getUserSessions,
  parseLocalDate,
  scheduleDemoToday,
  toLocalDateKey,
} from "@/lib/mock/schedule";
import { cn } from "@/lib/utils";

type CalendarMode = "week" | "month";

function CalendarDateButton({
  date,
  selectedDate,
  sessionDates,
  inCurrentMonth = true,
  onSelect,
}: {
  date: Date;
  selectedDate: string;
  sessionDates: Set<string>;
  inCurrentMonth?: boolean;
  onSelect: (date: string) => void;
}) {
  const dateKey = toLocalDateKey(date);
  const selected = dateKey === selectedDate;
  const isToday = dateKey === scheduleDemoToday;
  const hasSession = sessionDates.has(dateKey);

  return (
    <button
      type="button"
      aria-label={formatScheduleDate(dateKey, true)}
      aria-pressed={selected}
      aria-current={isToday ? "date" : undefined}
      onClick={() => onSelect(dateKey)}
      className={cn(
        "relative flex min-h-11 min-w-0 flex-col items-center justify-center rounded-xl text-sm font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
        selected
          ? "bg-primary-600 text-white shadow-sm"
          : isToday
            ? "bg-primary-50 text-primary-700"
            : inCurrentMonth
              ? "text-gray-700 hover:bg-gray-100"
              : "text-gray-300 hover:bg-gray-50",
      )}
    >
      {date.getDate()}
      {hasSession ? (
        <span
          className={cn(
            "absolute bottom-1 size-1 rounded-full",
            selected ? "bg-white" : "bg-primary-500",
          )}
          aria-hidden="true"
        />
      ) : null}
    </button>
  );
}

function SessionList({
  sessions,
  selectedDate,
}: {
  sessions: ClassSession[];
  selectedDate: string;
}) {
  if (sessions.length === 0) {
    return (
      <div className="flex min-h-48 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50/70 px-4 text-center">
        <CalendarDays className="size-7 text-gray-300" aria-hidden="true" />
        <p className="mt-3 font-semibold text-gray-700">
          이날은 예정된 수업이 없어요.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          {formatScheduleDate(selectedDate)}
        </p>
      </div>
    );
  }

  return (
    <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(17,24,39,0.04)]">
      {sessions.map((session) => {
        const academyClass = getSessionClass(session);

        return (
          <li key={session.id}>
            <Link
              href={`/user/schedule/${session.id}`}
              className={cn(
                "group grid min-h-28 gap-3 px-4 py-4 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:grid-cols-[7rem_1fr_auto] sm:items-center sm:px-5",
                session.status === "canceled" && "bg-red-50/30",
              )}
            >
              <div>
                <p
                  className={cn(
                    "text-sm font-bold tabular-nums text-gray-900",
                    session.status === "canceled" &&
                      "text-gray-400 line-through",
                  )}
                >
                  {session.startTime} ~ {session.endTime}
                </p>
                <ScheduleStatusBadge status={session.status} className="mt-2" />
              </div>
              <div className="min-w-0">
                <h3 className="break-keep font-bold text-gray-900">
                  {academyClass?.name ?? "수업"}
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {academyClass?.teacherName} · {session.room}
                </p>
                {session.changeReason ? (
                  <p className="mt-2 line-clamp-2 text-xs leading-5 text-orange-700">
                    {session.changeReason}
                  </p>
                ) : null}
              </div>
              <ChevronRight
                className="hidden size-4 text-gray-300 transition-transform group-hover:translate-x-0.5 sm:block"
                aria-hidden="true"
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function UserScheduleView() {
  const sessions = useMemo(() => getUserSessions(), []);
  const [mode, setMode] = useState<CalendarMode>("week");
  const [selectedDate, setSelectedDate] = useState(scheduleDemoToday);
  const [cursorDate, setCursorDate] = useState(() =>
    parseLocalDate(scheduleDemoToday),
  );
  const sessionDates = useMemo(
    () => new Set(sessions.map((session) => session.date)),
    [sessions],
  );
  const selectedSessions = sessions.filter(
    (session) => session.date === selectedDate,
  );
  const nextSession = sessions.find(
    (session) =>
      session.date > scheduleDemoToday && session.status !== "canceled",
  );

  const weekDates = useMemo(() => {
    const start = getStartOfWeek(cursorDate);
    return Array.from({ length: 7 }, (_, index) => addDays(start, index));
  }, [cursorDate]);

  const monthDates = useMemo(() => {
    const firstDate = new Date(
      cursorDate.getFullYear(),
      cursorDate.getMonth(),
      1,
    );
    const start = getStartOfWeek(firstDate);
    return Array.from({ length: 42 }, (_, index) => addDays(start, index));
  }, [cursorDate]);

  function movePeriod(amount: number) {
    setCursorDate((current) => {
      if (mode === "week") return addDays(current, amount * 7);
      return new Date(current.getFullYear(), current.getMonth() + amount, 1);
    });
  }

  function goToday() {
    const today = parseLocalDate(scheduleDemoToday);
    setCursorDate(today);
    setSelectedDate(scheduleDemoToday);
  }

  const nextClass = nextSession ? getSessionClass(nextSession) : undefined;

  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                수업 일정
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                예정된 수업과 변경 일정을 확인하세요.
              </p>
            </div>
            <p className="text-sm font-semibold text-primary-700">
              {formatMonth(cursorDate)}
            </p>
          </div>
        </header>

        <section aria-labelledby="next-session-heading">
          <div className="rounded-2xl border border-primary-100 bg-primary-50/70 p-4 sm:p-5">
            <p
              id="next-session-heading"
              className="flex items-center gap-2 text-xs font-bold text-primary-700"
            >
              <BookOpen className="size-4" aria-hidden="true" />
              다음 수업
            </p>
            {nextSession && nextClass ? (
              <Link
                href={`/user/schedule/${nextSession.id}`}
                className="group mt-3 flex min-h-16 items-center justify-between gap-3 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <span className="min-w-0">
                  <strong className="block break-keep text-lg text-gray-900">
                    {nextClass.name}
                  </strong>
                  <span className="mt-1 block text-sm text-gray-600">
                    {formatScheduleDate(nextSession.date)} ·{" "}
                    {nextSession.startTime}
                  </span>
                  <span className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span>{nextClass.teacherName}</span>
                    <span>{nextSession.room}</span>
                  </span>
                </span>
                <ChevronRight
                  className="size-5 shrink-0 text-primary-400 transition-transform group-hover:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
            ) : (
              <p className="mt-3 text-sm text-gray-600">
                예정된 다음 수업이 없습니다.
              </p>
            )}
          </div>
        </section>

        <div className="grid min-w-0 gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,0.9fr)] lg:items-start">
          <section
            aria-labelledby="schedule-calendar-heading"
            className="min-w-0"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2
                id="schedule-calendar-heading"
                className="text-lg font-bold text-gray-900"
              >
                날짜 선택
              </h2>
              <div
                className="flex rounded-xl bg-gray-100 p-1"
                role="group"
                aria-label="달력 보기 방식"
              >
                {(["week", "month"] as const).map((calendarMode) => (
                  <button
                    key={calendarMode}
                    type="button"
                    aria-pressed={mode === calendarMode}
                    onClick={() => setMode(calendarMode)}
                    className={cn(
                      "min-h-11 rounded-lg px-4 text-sm font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      mode === calendarMode
                        ? "bg-white text-primary-700 shadow-sm"
                        : "text-gray-500",
                    )}
                  >
                    {calendarMode === "week" ? "주간" : "월간"}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-[0_8px_24px_rgba(17,24,39,0.04)] sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  aria-label={mode === "week" ? "이전 주" : "이전 달"}
                  onClick={() => movePeriod(-1)}
                >
                  <ChevronLeft className="size-5" aria-hidden="true" />
                </Button>
                <div className="text-center">
                  <p className="text-sm font-bold text-gray-900">
                    {formatMonth(cursorDate)}
                  </p>
                  <button
                    type="button"
                    onClick={goToday}
                    className="mt-1 min-h-6 text-xs font-semibold text-primary-700 underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                  >
                    오늘로 이동
                  </button>
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-lg"
                  aria-label={mode === "week" ? "다음 주" : "다음 달"}
                  onClick={() => movePeriod(1)}
                >
                  <ChevronRight className="size-5" aria-hidden="true" />
                </Button>
              </div>

              <div className="mt-3 grid grid-cols-7 gap-1 text-center text-[0.6875rem] font-semibold text-gray-400">
                {["월", "화", "수", "목", "금", "토", "일"].map((day) => (
                  <span key={day}>{day}</span>
                ))}
              </div>
              <div className="mt-1 grid grid-cols-7 gap-1">
                {(mode === "week" ? weekDates : monthDates).map((date) => (
                  <CalendarDateButton
                    key={toLocalDateKey(date)}
                    date={date}
                    selectedDate={selectedDate}
                    sessionDates={sessionDates}
                    inCurrentMonth={date.getMonth() === cursorDate.getMonth()}
                    onSelect={setSelectedDate}
                  />
                ))}
              </div>
            </div>
          </section>

          <section
            aria-labelledby="selected-sessions-heading"
            className="min-w-0"
          >
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2
                  id="selected-sessions-heading"
                  className="text-lg font-bold text-gray-900"
                >
                  선택한 날짜의 수업
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  {formatScheduleDate(selectedDate)}
                </p>
              </div>
              <p className="text-xs text-gray-500">
                시간순 · {selectedSessions.length}개
              </p>
            </div>
            <SessionList
              sessions={selectedSessions}
              selectedDate={selectedDate}
            />
          </section>
        </div>

        <aside className="flex gap-3 rounded-2xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
          <Clock3
            className="mt-1 size-4 shrink-0 text-gray-400"
            aria-hidden="true"
          />
          휴강·보강·변경 일정은 상태와 안내 문구를 함께 확인해 주세요.
        </aside>
      </div>
    </main>
  );
}

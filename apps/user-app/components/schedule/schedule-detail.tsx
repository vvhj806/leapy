import Link from "next/link";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  Clock3,
  MapPin,
  UserRound,
} from "lucide-react";

import { ScheduleStatusBadge } from "@/components/schedule/schedule-ui";
import type { AcademyClass } from "@/lib/mock/classes";
import { formatScheduleDate, type ClassSession } from "@/lib/mock/schedule";

export function ScheduleDetail({
  session,
  academyClass,
}: {
  session: ClassSession;
  academyClass: AcademyClass;
}) {
  return (
    <main className="!text-base !font-normal">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/user/schedule"
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          수업 일정으로
        </Link>

        <header className="mt-4 border-b border-gray-100 pb-6">
          <ScheduleStatusBadge status={session.status} />
          <h1 className="mt-4 break-keep text-2xl leading-tight font-bold text-gray-900 sm:text-3xl">
            {academyClass.name}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {academyClass.subject} · {academyClass.level}
          </p>
        </header>

        <section aria-labelledby="session-information-heading" className="py-7">
          <h2
            id="session-information-heading"
            className="text-lg font-bold text-gray-900"
          >
            수업 정보
          </h2>
          <dl className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                icon: CalendarDays,
                label: "수업 날짜",
                value: formatScheduleDate(session.date, true),
              },
              {
                icon: Clock3,
                label: "수업 시간",
                value: `${session.startTime}~${session.endTime}`,
              },
              {
                icon: UserRound,
                label: "담당 선생님",
                value: academyClass.teacherName,
              },
              { icon: MapPin, label: "강의실", value: session.room },
            ].map((item) => (
              <div
                key={item.label}
                className="flex gap-3 rounded-2xl bg-gray-50 p-4"
              >
                <item.icon
                  className="mt-0.5 size-4 shrink-0 text-primary-600"
                  aria-hidden="true"
                />
                <div>
                  <dt className="text-xs font-semibold text-gray-400">
                    {item.label}
                  </dt>
                  <dd className="mt-1 text-sm font-semibold text-gray-800">
                    {item.value}
                  </dd>
                </div>
              </div>
            ))}
          </dl>
        </section>

        {(session.status === "changed" ||
          session.status === "canceled" ||
          session.status === "makeup") &&
        session.changeReason ? (
          <section
            aria-labelledby="schedule-change-heading"
            className="rounded-2xl border border-orange-100 bg-orange-50/70 p-4 sm:p-5"
          >
            <h2
              id="schedule-change-heading"
              className="font-bold text-orange-900"
            >
              일정 안내
            </h2>
            {session.originalStartTime ? (
              <p className="mt-2 text-sm text-orange-800">
                <span className="font-semibold">변경 전:</span>{" "}
                {session.originalStartTime}~{session.originalEndTime}
                {session.originalRoom ? ` · ${session.originalRoom}` : ""}
              </p>
            ) : null}
            <p className="mt-2 text-sm leading-6 text-orange-800">
              {session.changeReason}
            </p>
          </section>
        ) : null}

        <section
          aria-labelledby="lesson-heading"
          className="border-b border-gray-100 py-7"
        >
          <h2
            id="lesson-heading"
            className="flex items-center gap-2 text-lg font-bold text-gray-900"
          >
            <BookOpen className="size-5 text-primary-600" aria-hidden="true" />
            수업 내용
          </h2>
          <p className="mt-3 leading-7 text-gray-700">{session.lesson}</p>
          <h3 className="mt-6 text-sm font-bold text-gray-900">준비물</h3>
          {session.materials.length ? (
            <ul className="mt-2 flex flex-wrap gap-2">
              {session.materials.map((material) => (
                <li
                  key={material}
                  className="rounded-full bg-primary-50 px-3 py-1.5 text-sm font-medium text-primary-700"
                >
                  {material}
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-gray-500">
              별도 준비물이 없습니다.
            </p>
          )}
          {session.note ? (
            <p className="mt-5 rounded-xl bg-gray-50 p-4 text-sm leading-6 text-gray-600">
              {session.note}
            </p>
          ) : null}
        </section>
      </article>
    </main>
  );
}

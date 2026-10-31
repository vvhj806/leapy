import Link from "next/link";
import { CalendarX2 } from "lucide-react";

export default function ScheduleNotFound() {
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto flex min-h-80 max-w-lg flex-col items-center justify-center text-center">
        <span className="flex size-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
          <CalendarX2 className="size-6" aria-hidden="true" />
        </span>
        <h1 className="mt-5 text-xl font-bold text-gray-900">
          수업 일정을 찾을 수 없어요.
        </h1>
        <p className="mt-2 text-sm leading-6 text-gray-500">
          삭제되었거나 공개되지 않은 일정입니다.
        </p>
        <Link
          href="/user/schedule"
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
        >
          수업 일정으로
        </Link>
      </div>
    </main>
  );
}

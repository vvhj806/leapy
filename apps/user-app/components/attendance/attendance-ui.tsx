import { Badge } from "@/components/ui/badge";
import type { AttendanceStatus } from "@/lib/mock/attendance";
import { cn } from "@/lib/utils";

export const attendanceStatusMeta = {
  present: {
    label: "출석",
    summaryLabel: "출석",
    className: "bg-green-50 text-green-700 ring-green-100",
  },
  late: {
    label: "지각",
    summaryLabel: "지각",
    className: "bg-orange-50 text-orange-700 ring-orange-100",
  },
  absent: {
    label: "결석",
    summaryLabel: "결석",
    className: "bg-red-50 text-red-700 ring-red-100",
  },
  pending: {
    label: "미확인",
    summaryLabel: "미확인",
    className: "bg-gray-100 text-gray-700 ring-gray-200",
  },
} satisfies Record<
  AttendanceStatus,
  { label: string; summaryLabel: string; className: string }
>;

export function AttendanceStatusBadge({
  status,
  className,
}: {
  status: AttendanceStatus;
  className?: string;
}) {
  const meta = attendanceStatusMeta[status];

  return (
    <Badge
      className={cn(
        "rounded-full px-2.5 font-semibold ring-1",
        meta.className,
        className,
      )}
    >
      {meta.label}
    </Badge>
  );
}

export function AttendanceSummary({
  counts,
  unit = "회",
}: {
  counts: Record<AttendanceStatus, number>;
  unit?: string;
}) {
  const statuses = Object.keys(attendanceStatusMeta) as AttendanceStatus[];

  return (
    <div
      aria-label="출결 상태 요약"
      className="grid w-full max-w-full min-w-0 grid-cols-2 gap-2 min-[390px]:grid-cols-4"
    >
      {statuses.map((status) => {
        const meta = attendanceStatusMeta[status];

        return (
          <div
            key={status}
            className={cn(
              "flex min-h-14 min-w-0 items-center justify-between gap-1 rounded-2xl px-3 py-2 ring-1",
              meta.className,
            )}
          >
            <span className="text-xs font-semibold sm:text-sm">
              {meta.summaryLabel}
            </span>
            <strong className="text-base tabular-nums sm:text-lg">
              {counts[status]}
              {unit}
            </strong>
          </div>
        );
      })}
    </div>
  );
}

export function AttendancePageIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {title}
      </h1>
      <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p>
    </div>
  );
}

import { Badge } from "@/components/ui/badge";
import type { ScheduleStatus } from "@/lib/mock/schedule";
import { cn } from "@/lib/utils";

export const scheduleStatusMeta = {
  scheduled: {
    label: "정상 수업",
    className: "bg-green-50 text-green-700 ring-green-100",
  },
  canceled: {
    label: "휴강",
    className: "bg-red-50 text-red-700 ring-red-100",
  },
  makeup: {
    label: "보강",
    className: "bg-blue-50 text-blue-700 ring-blue-100",
  },
  changed: {
    label: "변경",
    className: "bg-orange-50 text-orange-700 ring-orange-100",
  },
} satisfies Record<ScheduleStatus, { label: string; className: string }>;

export function ScheduleStatusBadge({
  status,
  className,
}: {
  status: ScheduleStatus;
  className?: string;
}) {
  const meta = scheduleStatusMeta[status];

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

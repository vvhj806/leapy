import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function NoticeStatusBadge({
  isRead,
  className,
}: {
  isRead: boolean;
  className?: string;
}) {
  return (
    <Badge
      variant={isRead ? "outline" : "secondary"}
      className={cn(
        "rounded-full px-2 text-[0.6875rem] font-semibold",
        isRead
          ? "border-gray-200 text-gray-500"
          : "bg-primary-100 text-primary-700",
        className,
      )}
    >
      {isRead ? "읽음" : "안 읽음"}
    </Badge>
  );
}

export function ImportantBadge() {
  return (
    <Badge className="rounded-full bg-primary-600 px-2 text-[0.6875rem] font-semibold text-white">
      중요
    </Badge>
  );
}

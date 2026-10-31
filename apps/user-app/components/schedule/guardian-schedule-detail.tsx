"use client";

import Link from "next/link";

import { useGuardian } from "@/components/guardian/guardian-provider";
import { ScheduleDetail } from "@/components/schedule/schedule-detail";
import { Button } from "@/components/ui/button";
import type { AcademyClass } from "@/lib/mock/classes";
import type { ClassSession } from "@/lib/mock/schedule";

export function GuardianScheduleDetail({
  session,
  academyClass,
}: {
  session: ClassSession;
  academyClass: AcademyClass;
}) {
  const { selectedChild } = useGuardian();
  if (!selectedChild.classIds.includes(session.classId))
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-bold">
          선택한 자녀의 수업 일정이 아닙니다.
        </h1>
        <Button
          nativeButton={false}
          className="mt-5"
          render={<Link href="/user/schedule" />}
        >
          일정 목록으로
        </Button>
      </div>
    );
  return <ScheduleDetail session={session} academyClass={academyClass} />;
}

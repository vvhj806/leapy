"use client";

import Link from "next/link";

import { useGuardian } from "@/components/guardian/guardian-provider";
import { NoticeDetail } from "@/components/notice/notice-detail";
import { NoticeList } from "@/components/notice/notice-list";
import { Button } from "@/components/ui/button";
import { getNoticesForChild, type Notice } from "@/lib/mock/notices";

export function GuardianNoticeList() {
  const { selectedChild } = useGuardian();
  return (
    <NoticeList
      notices={getNoticesForChild(selectedChild.classIds, selectedChild.id)}
      role="user"
      readScope={selectedChild.id}
    />
  );
}

export function GuardianNoticeDetail({ notice }: { notice: Notice }) {
  const { selectedChild } = useGuardian();
  const allowed = getNoticesForChild(
    selectedChild.classIds,
    selectedChild.id,
  ).some((item) => item.id === notice.id);
  if (!allowed)
    return (
      <div className="py-16 text-center">
        <h1 className="text-xl font-bold">
          선택한 자녀에게 공개된 공지가 아닙니다.
        </h1>
        <Button
          nativeButton={false}
          className="mt-5"
          render={<Link href="/user/notice" />}
        >
          공지 목록으로
        </Button>
      </div>
    );
  return (
    <NoticeDetail notice={notice} role="user" readScope={selectedChild.id} />
  );
}

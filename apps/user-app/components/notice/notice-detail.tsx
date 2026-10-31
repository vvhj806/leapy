"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ArrowLeft, FileText, Paperclip } from "lucide-react";

import {
  readNoticeIds,
  saveNoticeIds,
  type NoticeRole,
} from "@/components/notice/notice-read-state";
import { ImportantBadge } from "@/components/notice/notice-ui";
import { Button } from "@/components/ui/button";
import {
  formatNoticeDate,
  getClassNames,
  type Notice,
} from "@/lib/mock/notices";

export function NoticeDetail({
  notice,
  role,
}: {
  notice: Notice;
  role: NoticeRole;
}) {
  const classNames = getClassNames(notice.classIds);

  useEffect(() => {
    const readIds = readNoticeIds(role);
    if (readIds.has(notice.id)) return;

    readIds.add(notice.id);
    saveNoticeIds(role, readIds);
  }, [notice.id, role]);

  return (
    <main className="!text-base !font-normal">
      <article className="mx-auto max-w-3xl">
        <Link
          href={`/${role}/notice`}
          className="inline-flex min-h-11 items-center gap-2 rounded-xl px-2 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
          <ArrowLeft className="size-4" aria-hidden="true" />
          공지 목록으로
        </Link>

        <header className="mt-4 border-b border-gray-100 pb-6 sm:pb-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-600">
              {notice.category}
            </span>
            {notice.isImportant ? <ImportantBadge /> : null}
          </div>
          <h1 className="mt-4 break-keep text-2xl leading-tight font-bold tracking-tight text-gray-900 sm:text-3xl sm:leading-tight">
            {notice.title}
          </h1>
          <dl className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-gray-500">
            <div className="flex gap-1.5">
              <dt className="font-medium text-gray-400">작성</dt>
              <dd>{notice.author}</dd>
            </div>
            <div className="flex gap-1.5">
              <dt className="font-medium text-gray-400">날짜</dt>
              <dd>{formatNoticeDate(notice.publishedAt)}</dd>
            </div>
            {role === "teacher" ? (
              <>
                <div className="flex gap-1.5">
                  <dt className="font-medium text-gray-400">대상</dt>
                  <dd>
                    {classNames.length
                      ? classNames.join(", ")
                      : notice.audience === "teacher"
                        ? "전체 선생님"
                        : "학원 전체"}
                  </dd>
                </div>
                <div className="flex gap-1.5">
                  <dt className="font-medium text-gray-400">구분</dt>
                  <dd>{classNames.length ? "담당 반 공지" : "학원 공지"}</dd>
                </div>
              </>
            ) : null}
          </dl>
        </header>

        <div className="space-y-5 py-7 text-[0.9375rem] leading-7 text-gray-700 sm:py-9 sm:text-base sm:leading-8">
          {notice.content.map((block, index) => {
            if (block.type === "paragraph") {
              return <p key={index}>{block.text}</p>;
            }

            if (block.type === "list") {
              return (
                <ul key={index} className="space-y-2 pl-5">
                  {block.items.map((item) => (
                    <li
                      key={item}
                      className="list-disc pl-1 marker:text-primary-400"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              );
            }

            return (
              <aside
                key={index}
                className="rounded-2xl border border-primary-100 bg-primary-50/70 px-4 py-4 sm:px-5"
              >
                {block.title ? (
                  <p className="mb-1 font-bold text-primary-800">
                    {block.title}
                  </p>
                ) : null}
                <p className="text-primary-900/80">{block.text}</p>
              </aside>
            );
          })}
        </div>

        {notice.attachments?.length ? (
          <section
            aria-labelledby="notice-attachments-heading"
            className="border-t border-gray-100 pt-6"
          >
            <h2
              id="notice-attachments-heading"
              className="flex items-center gap-2 text-base font-bold text-gray-900"
            >
              <Paperclip
                className="size-4 text-primary-600"
                aria-hidden="true"
              />
              첨부파일
            </h2>
            <ul className="mt-3 space-y-2">
              {notice.attachments.map((attachment) => (
                <li
                  key={attachment.name}
                  className="flex flex-wrap items-center gap-3 rounded-2xl border border-gray-100 bg-gray-50 px-4 py-3"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white text-primary-600 shadow-sm">
                    <FileText className="size-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block break-all text-sm font-semibold text-gray-800">
                      {attachment.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-gray-500">
                      {attachment.type} · {attachment.size} · 첨부 예정
                    </span>
                  </span>
                  <Button type="button" variant="outline" disabled>
                    다운로드 미지원
                  </Button>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </article>
    </main>
  );
}

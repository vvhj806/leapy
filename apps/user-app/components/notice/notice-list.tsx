"use client";

import Link from "next/link";
import { useMemo, useState, useSyncExternalStore } from "react";
import { BellRing, ChevronRight, RotateCcw, Search, X } from "lucide-react";

import {
  ImportantBadge,
  NoticeStatusBadge,
} from "@/components/notice/notice-ui";
import {
  getNoticeIdsSnapshot,
  getServerNoticeIdsSnapshot,
  parseNoticeIds,
  subscribeToNoticeIds,
  type NoticeRole,
} from "@/components/notice/notice-read-state";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  formatNoticeDate,
  getClassNames,
  getNoticeSearchText,
  type Notice,
  teacherClasses,
} from "@/lib/mock/notices";
import { cn } from "@/lib/utils";

const userCategories = [
  "전체",
  "학원 공지",
  "수업 안내",
  "일정",
  "행사",
] as const;
const teacherScopes = ["전체", "학원 공지", "담당 반 공지"] as const;

type UserCategory = (typeof userCategories)[number];
type TeacherScope = (typeof teacherScopes)[number];

function NoticeListItem({
  notice,
  role,
  isRead,
  emphasized = false,
}: {
  notice: Notice;
  role: NoticeRole;
  isRead: boolean;
  emphasized?: boolean;
}) {
  const classNames = getClassNames(notice.classIds);
  const audienceLabel =
    role === "teacher"
      ? classNames.length
        ? classNames.join(", ")
        : notice.audience === "teacher"
          ? "전체 선생님"
          : "학원 전체"
      : null;

  return (
    <li>
      <Link
        href={`/${role}/notice/${notice.id}`}
        className={cn(
          "group flex min-h-24 items-center gap-3 px-4 py-4 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary sm:px-5",
          emphasized
            ? "bg-primary-50/70 hover:bg-primary-50"
            : "hover:bg-gray-50",
        )}
      >
        <span
          className={cn(
            "mt-1 size-2 shrink-0 self-start rounded-full",
            isRead ? "bg-gray-200" : "bg-primary-500",
          )}
          aria-hidden="true"
        />
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-1.5">
            {notice.isImportant ? <ImportantBadge /> : null}
            <NoticeStatusBadge isRead={isRead} />
            <span className="text-xs font-medium text-gray-500">
              {notice.category}
            </span>
          </span>
          <span
            className={cn(
              "mt-2 block break-keep text-sm leading-5 text-gray-900 sm:text-base",
              isRead ? "font-medium" : "font-bold",
            )}
          >
            {notice.title}
          </span>
          <span className="mt-1.5 line-clamp-2 block text-xs leading-5 text-gray-500 sm:text-sm">
            {notice.summary}
          </span>
          <span className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-gray-400">
            <span>{formatNoticeDate(notice.publishedAt)}</span>
            {audienceLabel ? (
              <>
                <span aria-hidden="true">·</span>
                <span>{audienceLabel}</span>
              </>
            ) : null}
          </span>
        </span>
        <ChevronRight
          className="size-4 shrink-0 text-gray-300 transition-transform group-hover:translate-x-0.5 group-hover:text-primary-500"
          aria-hidden="true"
        />
      </Link>
    </li>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center px-4 py-12 text-center">
      <span className="flex size-12 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
        <BellRing className="size-5" aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-base font-bold text-gray-900">
        조건에 맞는 공지사항이 없어요.
      </h2>
      <p className="mt-1 text-sm leading-6 text-gray-500">
        검색어나 선택한 필터를 다시 확인해 주세요.
      </p>
      <Button
        type="button"
        variant="outline"
        className="mt-5 h-11 rounded-xl px-4"
        onClick={onReset}
      >
        <RotateCcw className="size-4" aria-hidden="true" />
        필터 초기화
      </Button>
    </div>
  );
}

export function NoticeList({
  notices,
  role,
  readScope,
}: {
  notices: Notice[];
  role: NoticeRole;
  readScope?: string;
}) {
  const [query, setQuery] = useState("");
  const [userCategory, setUserCategory] = useState<UserCategory>("전체");
  const [teacherScope, setTeacherScope] = useState<TeacherScope>("전체");
  const [teacherClassId, setTeacherClassId] = useState("all");
  const readIdsSnapshot = useSyncExternalStore(
    subscribeToNoticeIds,
    () => getNoticeIdsSnapshot(role, readScope),
    getServerNoticeIdsSnapshot,
  );
  const readIds = useMemo(
    () => parseNoticeIds(readIdsSnapshot),
    [readIdsSnapshot],
  );

  const filteredNotices = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("ko-KR");

    return notices.filter((notice) => {
      const matchesQuery =
        !normalizedQuery ||
        getNoticeSearchText(notice).includes(normalizedQuery);

      if (!matchesQuery) return false;

      if (role === "user") {
        return userCategory === "전체" || notice.category === userCategory;
      }

      const isClassNotice = Boolean(notice.classIds?.length);
      const matchesScope =
        teacherScope === "전체" ||
        (teacherScope === "학원 공지" && !isClassNotice) ||
        (teacherScope === "담당 반 공지" && isClassNotice);
      const matchesClass =
        teacherScope !== "담당 반 공지" ||
        teacherClassId === "all" ||
        notice.classIds?.includes(teacherClassId);

      return matchesScope && matchesClass;
    });
  }, [notices, query, role, teacherClassId, teacherScope, userCategory]);

  const pinnedNotices = filteredNotices.filter(
    (notice) => notice.isPinned && notice.isImportant,
  );
  const regularNotices = filteredNotices.filter(
    (notice) => !notice.isPinned || !notice.isImportant,
  );
  const unreadCount = notices.filter(
    (notice) => !readIds.has(notice.id),
  ).length;

  function resetFilters() {
    setQuery("");
    setUserCategory("전체");
    setTeacherScope("전체");
    setTeacherClassId("all");
  }

  const filters = role === "user" ? userCategories : teacherScopes;
  const selectedFilter = role === "user" ? userCategory : teacherScope;

  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-5xl space-y-7 sm:space-y-8">
        <section aria-labelledby={`${role}-notice-page-title`}>
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <h1
                id={`${role}-notice-page-title`}
                className="text-2xl font-bold tracking-tight text-gray-900"
              >
                공지사항
              </h1>
              <p className="mt-1 text-sm leading-6 text-gray-500">
                {role === "user"
                  ? "학원의 새로운 소식을 확인하세요."
                  : "학원 및 담당 반의 공지를 확인하세요."}
              </p>
            </div>
            <p
              className="rounded-full bg-primary-50 px-3 py-1.5 text-sm font-semibold text-primary-700"
              aria-live="polite"
            >
              읽지 않음 {unreadCount}개
            </p>
          </div>
        </section>

        <section aria-labelledby={`${role}-notice-search-heading`}>
          <h2 id={`${role}-notice-search-heading`} className="sr-only">
            공지 검색 및 필터
          </h2>
          <label htmlFor={`${role}-notice-search`} className="sr-only">
            공지 제목과 내용 검색
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-gray-400"
              aria-hidden="true"
            />
            <Input
              id={`${role}-notice-search`}
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="공지 제목이나 내용을 검색하세요"
              className="h-12 rounded-2xl border-gray-200 bg-white pr-12 pl-10 shadow-sm"
            />
            {query ? (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setQuery("")}
                aria-label="검색어 지우기"
                className="absolute top-1/2 right-2 size-9 -translate-y-1/2 rounded-xl text-gray-500"
              >
                <X className="size-4" aria-hidden="true" />
              </Button>
            ) : null}
          </div>

          <div className="mt-3 -mx-1 overflow-x-auto px-1 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div
              className="flex w-max gap-2"
              role="group"
              aria-label="공지 필터"
            >
              {filters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  aria-pressed={selectedFilter === filter}
                  onClick={() => {
                    if (role === "user") {
                      setUserCategory(filter as UserCategory);
                    } else {
                      setTeacherScope(filter as TeacherScope);
                      if (filter !== "담당 반 공지") setTeacherClassId("all");
                    }
                  }}
                  className={cn(
                    "min-h-11 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                    selectedFilter === filter
                      ? "border-primary-600 bg-primary-600 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:border-primary-200 hover:bg-primary-50",
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {role === "teacher" && teacherScope === "담당 반 공지" ? (
            <div className="mt-3">
              <label
                htmlFor="teacher-notice-class"
                className="mb-1.5 block text-xs font-semibold text-gray-600"
              >
                담당 반 선택
              </label>
              <select
                id="teacher-notice-class"
                value={teacherClassId}
                onChange={(event) => setTeacherClassId(event.target.value)}
                className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm font-medium text-gray-700 outline-none transition-shadow focus:border-primary focus:ring-3 focus:ring-primary/20 sm:max-w-xs"
              >
                <option value="all">전체 담당 반</option>
                {teacherClasses.map((teacherClass) => (
                  <option key={teacherClass.id} value={teacherClass.id}>
                    {teacherClass.name}
                  </option>
                ))}
              </select>
            </div>
          ) : null}
        </section>

        {filteredNotices.length === 0 ? (
          <section
            aria-live="polite"
            className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(17,24,39,0.04)]"
          >
            <EmptyState onReset={resetFilters} />
          </section>
        ) : (
          <>
            {pinnedNotices.length > 0 ? (
              <section aria-labelledby={`${role}-important-notices-heading`}>
                <div className="mb-3 flex items-center gap-2">
                  <BellRing
                    className="size-4 text-primary-600"
                    aria-hidden="true"
                  />
                  <h2
                    id={`${role}-important-notices-heading`}
                    className="text-base font-bold text-gray-900"
                  >
                    중요 공지
                  </h2>
                </div>
                <ul className="divide-y divide-primary-100 overflow-hidden rounded-2xl border border-primary-100 bg-white shadow-[0_8px_24px_rgba(109,40,217,0.05)]">
                  {pinnedNotices.map((notice) => (
                    <NoticeListItem
                      key={notice.id}
                      notice={notice}
                      role={role}
                      isRead={readIds.has(notice.id)}
                      emphasized
                    />
                  ))}
                </ul>
              </section>
            ) : null}

            <section aria-labelledby={`${role}-all-notices-heading`}>
              <div className="mb-3 flex items-center justify-between gap-3">
                <h2
                  id={`${role}-all-notices-heading`}
                  className="text-base font-bold text-gray-900"
                >
                  전체 공지
                </h2>
                <p className="text-xs text-gray-500">
                  최신순 · {regularNotices.length}개
                </p>
              </div>
              {regularNotices.length > 0 ? (
                <ul className="divide-y divide-gray-100 overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_8px_24px_rgba(17,24,39,0.04)]">
                  {regularNotices.map((notice) => (
                    <NoticeListItem
                      key={notice.id}
                      notice={notice}
                      role={role}
                      isRead={readIds.has(notice.id)}
                    />
                  ))}
                </ul>
              ) : (
                <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-4 py-8 text-center text-sm text-gray-500">
                  중요 공지를 제외한 일반 공지가 없어요.
                </div>
              )}
            </section>
          </>
        )}
      </div>
    </main>
  );
}

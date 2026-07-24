"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  GraduationCap,
  Home,
  Menu,
  Settings,
  Users,
  type LucideIcon,
} from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

type AppKind = "user" | "teacher";

type NavigationItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

const navigation: Record<AppKind, NavigationItem[]> = {
  user: [
    { href: "/user", label: "홈", icon: Home },
    { href: "/user/attendance", label: "출결", icon: CheckCircle2 },
    { href: "/user/notice", label: "공지", icon: Bell },
    { href: "/user/report", label: "리포트", icon: ClipboardList },
    { href: "/user/schedule", label: "일정", icon: CalendarDays },
    { href: "/user/settings", label: "설정", icon: Settings },
  ],
  teacher: [
    { href: "/teacher", label: "홈", icon: Home },
    { href: "/teacher/attendance", label: "출결 관리", icon: CheckCircle2 },
    { href: "/teacher/classes", label: "반 관리", icon: Users },
    { href: "/teacher/notice", label: "공지", icon: Bell },
    { href: "/teacher/reports", label: "리포트 관리", icon: ClipboardList },
    { href: "/teacher/settings", label: "설정", icon: Settings },
  ],
};

const shellCopy = {
  user: {
    badge: "학생 · 학부모",
    description: "오늘의 학원 생활을 한눈에 확인하세요.",
    initials: "사용",
    headerDescription: "오늘의 학원 생활을 한눈에 확인하세요.",
    sidebarLabel: "오늘 수업",
    sidebarValue: "오후 4:00",
    sidebarDetail: "중등 수학 · 3강의실",
  },
  teacher: {
    badge: "선생님",
    description: "수업과 학생 관리를 빠르게 처리하세요.",
    initials: "선생",
    headerDescription: "수업과 처리할 업무를 빠르게 확인하세요.",
    sidebarLabel: "다음 수업",
    sidebarValue: "오후 2:30",
    sidebarDetail: "중등 수학 A반 · 12명",
  },
} satisfies Record<AppKind, Record<string, string>>;

function isActive(pathname: string, href: string) {
  return pathname === href;
}

function NavigationLink({
  item,
  active,
  compact = false,
}: {
  item: NavigationItem;
  active: boolean;
  compact?: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      aria-current={active ? "page" : undefined}
      className={cn(
        "flex items-center rounded-xl text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        compact
          ? "flex-col gap-1 px-2 py-2 text-[0.6875rem]"
          : "gap-3 px-3 py-2.5",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
      )}
    >
      <Icon className={compact ? "size-5" : "size-4"} aria-hidden="true" />
      <span>{item.label}</span>
    </Link>
  );
}

export function AppShell({
  kind,
  children,
}: {
  kind: AppKind;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const items = navigation[kind];
  const copy = shellCopy[kind];
  const activeItem = items.find((item) => isActive(pathname, item.href));
  const mobileItems = items.slice(0, 4);
  const overflowItems = items.slice(4);
  const isDashboard = pathname === items[0].href;

  return (
    <div className="min-h-dvh bg-gray-50">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r bg-background/95 px-4 py-5 backdrop-blur md:flex md:flex-col">
        <Link href={items[0].href} className="flex items-center gap-3 px-2">
          <span className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <GraduationCap className="size-5" aria-hidden="true" />
          </span>
          <span>
            <span className="block text-lg font-semibold tracking-tight">
              Leapy
            </span>
            <span className="block text-xs text-muted-foreground">
              함께 자라는 배움
            </span>
          </span>
        </Link>

        <Separator className="my-5" />
        <Badge variant="secondary" className="mb-3 w-fit rounded-full px-2.5">
          {copy.badge}
        </Badge>

        <nav aria-label={`${copy.badge} 메뉴`} className="space-y-1">
          {items.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              active={isActive(pathname, item.href)}
            />
          ))}
        </nav>

        <div className="mt-auto rounded-2xl border border-primary-100 bg-primary-50/70 p-4 shadow-sm">
          <div className="flex items-center gap-2 text-primary-700">
            <BookOpen className="size-4" aria-hidden="true" />
            <p className="text-xs font-semibold">{copy.sidebarLabel}</p>
          </div>
          <p className="mt-3 text-lg font-bold text-gray-900">
            {copy.sidebarValue}
          </p>
          <p className="mt-1 truncate text-xs text-gray-600">
            {copy.sidebarDetail}
          </p>
        </div>
      </aside>

      <div className="md:pl-64">
        <header className="sticky top-0 z-20 border-b bg-background/90 backdrop-blur">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
            <div className="min-w-0">
              <h1 className="truncate font-semibold tracking-tight text-gray-900">
                <span className="md:hidden">
                  {isDashboard ? "Leapy" : (activeItem?.label ?? "홈")}
                </span>
                <span className="hidden md:inline">
                  {activeItem?.label ?? "홈"}
                </span>
              </h1>
              {isDashboard ? (
                <p className="mt-0.5 hidden text-xs text-gray-500 md:block">
                  {copy.headerDescription}
                </p>
              ) : null}
            </div>

            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="icon-lg"
                aria-label="알림 확인"
                className="relative rounded-xl text-gray-600 hover:bg-primary-50 hover:text-primary-700"
              >
                <Bell className="size-5" aria-hidden="true" />
                <span className="absolute top-2 right-2 size-2 rounded-full border-2 border-background bg-red-500" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <Button
                      variant="ghost"
                      className="h-10 gap-2 rounded-full px-2"
                    />
                  }
                >
                  <Avatar className="size-8">
                    <AvatarFallback className="bg-primary/10 text-xs text-primary">
                      {copy.initials}
                    </AvatarFallback>
                  </Avatar>
                  <ChevronDown className="hidden size-4 text-muted-foreground sm:block" />
                  <span className="sr-only">사용자 메뉴 열기</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuLabel>{copy.badge}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    render={<Link href={items.at(-1)?.href ?? items[0].href} />}
                  >
                    <Settings className="size-4" aria-hidden="true" />
                    설정
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-5 pb-28 sm:px-6 md:py-8 md:pb-8">
          <div
            className={cn(
              isDashboard
                ? ""
                : "min-h-[calc(100dvh-8rem)] rounded-3xl border bg-card p-5 shadow-sm sm:p-7 [&>main]:text-xl [&>main]:font-semibold",
            )}
          >
            {children}
          </div>
        </div>
      </div>

      <nav
        aria-label={`${copy.badge} 모바일 메뉴`}
        className="fixed inset-x-0 bottom-0 z-40 border-t bg-background/95 px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-1 backdrop-blur md:hidden"
      >
        <div className="mx-auto grid max-w-md grid-cols-5">
          {mobileItems.map((item) => (
            <NavigationLink
              key={item.href}
              item={item}
              active={isActive(pathname, item.href)}
              compact
            />
          ))}

          <Sheet>
            <SheetTrigger
              render={
                <Button
                  variant="ghost"
                  className="h-auto flex-col gap-1 rounded-xl px-2 py-2 text-[0.6875rem] text-muted-foreground"
                />
              }
            >
              <Menu className="size-5" aria-hidden="true" />
              더보기
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="rounded-t-3xl pb-[max(1.5rem,env(safe-area-inset-bottom))]"
            >
              <SheetHeader>
                <SheetTitle>더보기</SheetTitle>
                <SheetDescription>추가 메뉴를 선택하세요.</SheetDescription>
              </SheetHeader>
              <div className="grid gap-1 px-4">
                {overflowItems.map((item) => (
                  <SheetClose
                    key={item.href}
                    render={<Link href={item.href} />}
                  >
                    <span
                      className={cn(
                        "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium",
                        isActive(pathname, item.href)
                          ? "bg-primary/10 text-primary"
                          : "hover:bg-accent",
                      )}
                    >
                      <item.icon className="size-4" aria-hidden="true" />
                      {item.label}
                    </span>
                  </SheetClose>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </div>
  );
}

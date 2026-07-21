import { AppShell } from "@/components/common/app-shell";

export default function TeacherLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell kind="teacher">{children}</AppShell>;
}

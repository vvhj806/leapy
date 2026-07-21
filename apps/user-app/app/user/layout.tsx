import { AppShell } from "@/components/common/app-shell";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AppShell kind="user">{children}</AppShell>;
}

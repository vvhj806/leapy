import { AppShell } from "@/components/common/app-shell";
import { ChildSwitcher } from "@/components/guardian/child-switcher";
import { GuardianProvider } from "@/components/guardian/guardian-provider";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GuardianProvider>
      <AppShell kind="user">
        <ChildSwitcher />
        {children}
      </AppShell>
    </GuardianProvider>
  );
}

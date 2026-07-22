import { LoginForm } from "@/components/auth/login-form";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;

  return (
    <LoginForm
      initialError={
        error === "auth_callback_failed"
          ? "인증 처리에 실패했습니다. 다시 로그인해 주세요."
          : undefined
      }
    />
  );
}

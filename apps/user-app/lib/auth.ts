import { SupabaseConfigError } from "@/lib/supabase/env";

type AuthAction = "login" | "signup";

type AuthErrorShape = {
  code?: unknown;
  status?: unknown;
};

export function getAuthErrorMessage(error: unknown, action: AuthAction) {
  if (error instanceof SupabaseConfigError) {
    return "Supabase 연결 설정을 확인해 주세요.";
  }

  const code =
    typeof error === "object" && error !== null
      ? (error as AuthErrorShape).code
      : undefined;

  if (code === "email_not_confirmed") {
    return "이메일 인증이 완료되지 않았습니다.";
  }

  if (code === "invalid_credentials") {
    return "이메일 또는 비밀번호가 올바르지 않습니다.";
  }

  if (code === "user_already_exists" || code === "email_exists") {
    return "이미 가입된 이메일입니다. 로그인해 주세요.";
  }

  if (code === "signup_disabled") {
    return "현재 회원가입을 사용할 수 없습니다.";
  }

  if (
    code === "over_request_rate_limit" ||
    code === "over_email_send_rate_limit"
  ) {
    return "요청이 너무 많습니다. 잠시 후 다시 시도해 주세요.";
  }

  return action === "login"
    ? "로그인에 실패했습니다. 잠시 후 다시 시도해 주세요."
    : "회원가입에 실패했습니다. 잠시 후 다시 시도해 주세요.";
}

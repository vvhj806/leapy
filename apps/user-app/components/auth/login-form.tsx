"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { AlertCircle, LoaderCircle } from "lucide-react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { createClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/auth";

import { FormFieldError } from "./form-field-error";

type LoginErrors = Partial<Record<"email" | "password", string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm({ initialError }: { initialError?: string }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<LoginErrors>({});
  const [formError, setFormError] = useState(initialError ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  function validate() {
    const nextErrors: LoginErrors = {};

    if (!email.trim()) {
      nextErrors.email = "이메일을 입력해 주세요.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "올바른 이메일 형식으로 입력해 주세요.";
    }

    if (!password) {
      nextErrors.password = "비밀번호를 입력해 주세요.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || !validate()) {
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        setFormError(getAuthErrorMessage(error, "login"));
        return;
      }

      router.push("/user");
      router.refresh();
    } catch (error) {
      setFormError(getAuthErrorMessage(error, "login"));
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card className="gap-6 rounded-3xl border-0 py-0 shadow-none ring-0 sm:border sm:py-8 sm:shadow-[0_12px_40px_rgba(17,24,39,0.06)] sm:ring-1 sm:ring-gray-100">
      <CardHeader className="gap-2 px-0 sm:px-8">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          다시 만나서 반가워요
        </CardTitle>
        <CardDescription className="text-sm leading-6 text-gray-500">
          Leapy 계정으로 로그인해 학원 생활을 확인하세요.
        </CardDescription>
      </CardHeader>

      <CardContent className="px-0 sm:px-8">
        <form noValidate onSubmit={handleSubmit} className="space-y-6">
          {formError ? (
            <Alert
              variant="destructive"
              aria-live="polite"
              className="border-red-200 bg-red-50 px-4 py-3 text-red-600"
            >
              <AlertCircle className="size-4" aria-hidden="true" />
              <AlertDescription className="text-red-600">
                {formError}
              </AlertDescription>
            </Alert>
          ) : null}

          <div className="space-y-2">
            <Label
              htmlFor="login-email"
              className="font-semibold text-gray-800"
            >
              이메일
            </Label>
            <Input
              id="login-email"
              type="email"
              autoComplete="email"
              inputMode="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "login-email-error" : undefined}
              disabled={isSubmitting}
              className="h-12 rounded-xl border-gray-300 px-4 text-base placeholder:text-gray-400 focus-visible:border-primary-700 focus-visible:ring-primary-200"
            />
            <FormFieldError id="login-email-error" message={errors.email} />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="login-password"
              className="font-semibold text-gray-800"
            >
              비밀번호
            </Label>
            <Input
              id="login-password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              aria-invalid={Boolean(errors.password)}
              aria-describedby={
                errors.password ? "login-password-error" : undefined
              }
              disabled={isSubmitting}
              className="h-12 rounded-xl border-gray-300 px-4 text-base placeholder:text-gray-400 focus-visible:border-primary-700 focus-visible:ring-primary-200"
            />
            <FormFieldError
              id="login-password-error"
              message={errors.password}
            />
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            aria-disabled={isSubmitting}
            className="h-12 w-full rounded-xl bg-primary-700 text-base font-semibold text-white hover:bg-primary-800 active:bg-primary-900"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle
                  className="size-4 animate-spin"
                  aria-hidden="true"
                />
                로그인 중
              </>
            ) : (
              "로그인"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          아직 계정이 없나요?{" "}
          <Link
            href="/signup"
            className="font-semibold text-primary-700 underline-offset-4 hover:text-primary-800 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            회원가입
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

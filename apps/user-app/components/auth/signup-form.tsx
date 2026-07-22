"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import {
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  LoaderCircle,
  School,
} from "lucide-react";

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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { getAuthErrorMessage } from "@/lib/auth";
import { createClient } from "@/lib/supabase/client";

import { FormFieldError } from "./form-field-error";

export type SignupRole = "user" | "teacher";

type SignupField = "name" | "email" | "password" | "passwordConfirm" | "role";
type SignupErrors = Partial<Record<SignupField, string>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const roles: Array<{
  value: SignupRole;
  label: string;
  description: string;
  icon: typeof GraduationCap;
}> = [
  {
    value: "user",
    label: "학생/학부모",
    description: "출결과 학원 소식을 확인해요",
    icon: GraduationCap,
  },
  {
    value: "teacher",
    label: "선생님",
    description: "수업과 학생을 관리해요",
    icon: School,
  },
];

export function SignupForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [role, setRole] = useState<SignupRole | "">("");
  const [errors, setErrors] = useState<SignupErrors>({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isAwaitingEmail, setIsAwaitingEmail] = useState(false);

  function validate() {
    const nextErrors: SignupErrors = {};

    if (!name.trim()) nextErrors.name = "이름을 입력해 주세요.";
    if (!email.trim()) {
      nextErrors.email = "이메일을 입력해 주세요.";
    } else if (!EMAIL_PATTERN.test(email.trim())) {
      nextErrors.email = "올바른 이메일 형식으로 입력해 주세요.";
    }
    if (!password) {
      nextErrors.password = "비밀번호를 입력해 주세요.";
    } else if (password.length < 8) {
      nextErrors.password = "비밀번호는 8자 이상 입력해 주세요.";
    }
    if (!passwordConfirm) {
      nextErrors.passwordConfirm = "비밀번호를 한 번 더 입력해 주세요.";
    } else if (password !== passwordConfirm) {
      nextErrors.passwordConfirm = "비밀번호가 일치하지 않습니다.";
    }
    if (!role) nextErrors.role = "이용자 유형을 선택해 주세요.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (isSubmitting || !validate()) return;

    setIsSubmitting(true);
    setFormError("");

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/callback`,
        },
      });

      if (error) {
        setFormError(getAuthErrorMessage(error, "signup"));
        return;
      }

      if (data.session) {
        router.push("/user");
        router.refresh();
        return;
      }

      setIsAwaitingEmail(true);
    } catch (error) {
      setFormError(getAuthErrorMessage(error, "signup"));
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isAwaitingEmail) {
    return (
      <Card className="rounded-3xl border-green-200 bg-green-50 py-8 shadow-none ring-0">
        <CardContent className="px-6 text-center sm:px-8">
          <span className="mx-auto flex size-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <CheckCircle2 className="size-6" aria-hidden="true" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-gray-900">
            인증 메일을 확인해 주세요
          </h1>
          <p
            className="mt-3 text-sm leading-6 text-gray-600"
            aria-live="polite"
          >
            회원가입 요청이 완료되었습니다.
            <br />
            입력한 이메일로 전송된 인증 메일을 확인해 주세요.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-primary-700 px-5 text-sm font-semibold text-white hover:bg-primary-800 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-primary-300"
          >
            로그인 화면으로 이동
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="gap-6 rounded-3xl border-0 py-0 shadow-none ring-0 sm:border sm:py-8 sm:shadow-[0_12px_40px_rgba(17,24,39,0.06)] sm:ring-1 sm:ring-gray-100">
      <CardHeader className="gap-2 px-0 sm:px-8">
        <CardTitle className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Leapy 시작하기
        </CardTitle>
        <CardDescription className="text-sm leading-6 text-gray-500">
          필요한 정보만 입력하고 계정을 만들어 보세요.
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
              htmlFor="signup-name"
              className="font-semibold text-gray-800"
            >
              이름
            </Label>
            <Input
              id="signup-name"
              autoComplete="name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="이름을 입력해 주세요"
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "signup-name-error" : undefined}
              disabled={isSubmitting}
              className="h-12 rounded-xl border-gray-300 px-4 text-base placeholder:text-gray-400 focus-visible:border-primary-700 focus-visible:ring-primary-200"
            />
            <FormFieldError id="signup-name-error" message={errors.name} />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="signup-email"
              className="font-semibold text-gray-800"
            >
              이메일
            </Label>
            <Input
              id="signup-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="name@example.com"
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "signup-email-error" : undefined}
              disabled={isSubmitting}
              className="h-12 rounded-xl border-gray-300 px-4 text-base placeholder:text-gray-400 focus-visible:border-primary-700 focus-visible:ring-primary-200"
            />
            <FormFieldError id="signup-email-error" message={errors.email} />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label
                htmlFor="signup-password"
                className="font-semibold text-gray-800"
              >
                비밀번호
              </Label>
              <Input
                id="signup-password"
                type="password"
                autoComplete="new-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="8자 이상"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "signup-password-error" : undefined
                }
                disabled={isSubmitting}
                className="h-12 rounded-xl border-gray-300 px-4 text-base placeholder:text-gray-400 focus-visible:border-primary-700 focus-visible:ring-primary-200"
              />
              <FormFieldError
                id="signup-password-error"
                message={errors.password}
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="signup-password-confirm"
                className="font-semibold text-gray-800"
              >
                비밀번호 확인
              </Label>
              <Input
                id="signup-password-confirm"
                type="password"
                autoComplete="new-password"
                value={passwordConfirm}
                onChange={(event) => setPasswordConfirm(event.target.value)}
                placeholder="다시 입력"
                aria-invalid={Boolean(errors.passwordConfirm)}
                aria-describedby={
                  errors.passwordConfirm
                    ? "signup-password-confirm-error"
                    : undefined
                }
                disabled={isSubmitting}
                className="h-12 rounded-xl border-gray-300 px-4 text-base placeholder:text-gray-400 focus-visible:border-primary-700 focus-visible:ring-primary-200"
              />
              <FormFieldError
                id="signup-password-confirm-error"
                message={errors.passwordConfirm}
              />
            </div>
          </div>

          <fieldset className="space-y-3">
            <legend className="text-sm font-semibold text-gray-800">
              이용자 유형
            </legend>
            <RadioGroup
              value={role}
              onValueChange={(value) => setRole(value as SignupRole)}
              aria-invalid={Boolean(errors.role)}
              aria-describedby={errors.role ? "signup-role-error" : undefined}
              className="grid gap-3 sm:grid-cols-2"
            >
              {roles.map((item) => {
                const Icon = item.icon;
                const selected = role === item.value;
                return (
                  <Label
                    key={item.value}
                    htmlFor={`signup-role-${item.value}`}
                    className={cn(
                      "min-h-24 cursor-pointer items-start rounded-2xl border p-4 transition-colors",
                      selected
                        ? "border-primary-700 bg-primary-50 text-primary-900"
                        : "border-gray-200 bg-white text-gray-800 hover:border-primary-300 hover:bg-primary-50/50",
                    )}
                  >
                    <RadioGroupItem
                      id={`signup-role-${item.value}`}
                      value={item.value}
                      disabled={isSubmitting}
                      className="mt-0.5"
                    />
                    <span className="flex gap-3">
                      <Icon
                        className="mt-0.5 size-5 shrink-0 text-primary-700"
                        aria-hidden="true"
                      />
                      <span>
                        <span className="block font-semibold">
                          {item.label}
                        </span>
                        <span className="mt-1 block text-xs leading-5 text-gray-500">
                          {item.description}
                        </span>
                      </span>
                    </span>
                  </Label>
                );
              })}
            </RadioGroup>
            <FormFieldError id="signup-role-error" message={errors.role} />
          </fieldset>

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
                가입 중
              </>
            ) : (
              "회원가입"
            )}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          이미 계정이 있나요?{" "}
          <Link
            href="/login"
            className="font-semibold text-primary-700 underline-offset-4 hover:text-primary-800 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            로그인
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}

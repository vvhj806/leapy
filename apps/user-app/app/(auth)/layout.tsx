import { Sparkles } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-gray-50 px-4 py-8 sm:px-6 sm:py-12">
      <div className="absolute -top-24 -left-20 size-72 rounded-full bg-primary-100/70 blur-3xl" />
      <div className="absolute -right-24 -bottom-24 size-80 rounded-full bg-secondary-100/70 blur-3xl" />

      <div className="relative grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-[0_20px_60px_rgba(76,29,149,0.08)] lg:grid-cols-[0.9fr_1.1fr]">
        <aside className="hidden bg-primary-700 p-10 text-white lg:flex lg:flex-col lg:justify-between">
          <div>
            <div className="flex size-11 items-center justify-center rounded-xl bg-white/15">
              <Sparkles className="size-5" aria-hidden="true" />
            </div>
            <p className="mt-6 text-3xl font-bold tracking-tight">Leapy</p>
            <p className="mt-2 text-sm font-medium text-primary-100">Learn &amp; Play</p>
          </div>
          <div>
            <p className="text-2xl leading-9 font-bold">
              배움의 순간을
              <br />더 가깝고 즐겁게
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6 text-primary-100">
              학생, 학부모, 선생님이 함께 성장하는 학원 생활을 시작하세요.
            </p>
          </div>
        </aside>

        <main className="flex min-h-[36rem] items-center justify-center px-5 py-8 sm:px-8 sm:py-10 lg:px-12">
          <div className="w-full max-w-md">
            <div className="mb-8 lg:hidden">
              <p className="text-2xl font-bold tracking-tight text-primary-700">Leapy</p>
              <p className="mt-1 text-sm text-gray-500">Learn &amp; Play</p>
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

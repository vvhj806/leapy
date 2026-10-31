import Link from "next/link";
export default function ReportNotFound() {
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto flex min-h-80 max-w-lg flex-col items-center justify-center text-center">
        <h1 className="text-xl font-bold">리포트를 찾을 수 없어요.</h1>
        <p className="mt-2 text-sm text-gray-500">
          발행되지 않았거나 조회할 수 없는 리포트입니다.
        </p>
        <Link
          href="/user/report"
          className="mt-6 inline-flex min-h-11 items-center rounded-xl bg-primary px-4 text-sm font-semibold text-white"
        >
          학습 리포트로
        </Link>
      </div>
    </main>
  );
}

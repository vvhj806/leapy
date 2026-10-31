"use client";

import { useId, useMemo, useState, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";
import { Eye, Save } from "lucide-react";

import { ReportContent } from "@/components/reports/report-ui";
import {
  getDraftSnapshot,
  getServerDraftSnapshot,
  parseDrafts,
  saveDraft,
  subscribeToDrafts,
} from "@/components/reports/report-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { academyClasses, getClassStudents } from "@/lib/mock/classes";
import { isStudentInClass, type LearningReport } from "@/lib/mock/reports";

type Values = {
  classId: string;
  studentId: string;
  period: string;
  title: string;
  summary: string;
  completedUnits: string;
  totalUnits: string;
  currentUnit: string;
  assignmentsCompleted: string;
  assignmentsTotal: string;
  assessmentName: string;
  score: string;
  maxScore: string;
  strengths: string;
  improvements: string;
  nextGoals: string;
  overall: string;
};
const empty: Values = {
  classId: "",
  studentId: "",
  period: "2026-10",
  title: "",
  summary: "",
  completedUnits: "0",
  totalUnits: "0",
  currentUnit: "",
  assignmentsCompleted: "0",
  assignmentsTotal: "0",
  assessmentName: "",
  score: "",
  maxScore: "100",
  strengths: "",
  improvements: "",
  nextGoals: "",
  overall: "",
};
function valuesFromReport(report?: LearningReport): Values {
  if (!report) return empty;
  const assessment = report.assessments[0];
  return {
    classId: report.classId,
    studentId: report.studentId,
    period: report.period,
    title: report.title,
    summary: report.summary,
    completedUnits: String(report.progress.completedUnits),
    totalUnits: String(report.progress.totalUnits),
    currentUnit: report.progress.currentUnit,
    assignmentsCompleted: String(report.assignments.completed),
    assignmentsTotal: String(report.assignments.total),
    assessmentName: assessment?.name ?? "",
    score: assessment?.score === undefined ? "" : String(assessment.score),
    maxScore: String(assessment?.maxScore ?? 100),
    strengths: report.feedback.strengths,
    improvements: report.feedback.improvements,
    nextGoals: report.feedback.nextGoals,
    overall: report.feedback.overall,
  };
}

export function ReportForm({
  reportId,
  initialReport,
}: {
  reportId?: string;
  initialReport?: LearningReport;
}) {
  const router = useRouter();
  const generatedId = `local-report-${useId().replaceAll(":", "")}`;
  const snapshot = useSyncExternalStore(
    subscribeToDrafts,
    getDraftSnapshot,
    getServerDraftSnapshot,
  );
  const stored = useMemo(
    () => parseDrafts(snapshot).find((item) => item.id === reportId),
    [snapshot, reportId],
  );
  const source = stored ?? initialReport;
  const [editedValues, setEditedValues] = useState<Values>(() =>
    valuesFromReport(initialReport),
  );
  const [dirty, setDirty] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [preview, setPreview] = useState(false);
  const values = !dirty && stored ? valuesFromReport(stored) : editedValues;
  const selectedClass = academyClasses.find(
    (item) => item.id === values.classId,
  );
  const students = selectedClass ? getClassStudents(selectedClass) : [];
  function update(name: keyof Values, value: string) {
    setDirty(true);
    setEditedValues((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: "" }));
  }
  function buildReport(): LearningReport | null {
    const nextErrors: Record<string, string> = {};
    const completed = Number(values.completedUnits),
      total = Number(values.totalUnits),
      assignmentCompleted = Number(values.assignmentsCompleted),
      assignmentTotal = Number(values.assignmentsTotal),
      score = values.score === "" ? undefined : Number(values.score),
      maxScore = Number(values.maxScore);
    if (!values.classId) nextErrors.classId = "담당 반을 선택해 주세요.";
    if (!values.studentId) nextErrors.studentId = "학생을 선택해 주세요.";
    else if (!isStudentInClass(values.studentId, values.classId))
      nextErrors.studentId = "선택한 반에 소속된 학생이 아닙니다.";
    if (!values.period) nextErrors.period = "평가 기간을 입력해 주세요.";
    if (!values.title.trim()) nextErrors.title = "리포트 제목을 입력해 주세요.";
    if (total < 0 || completed < 0 || completed > total)
      nextErrors.progress = "완료 단원은 전체 단원 수 이하로 입력해 주세요.";
    if (
      assignmentTotal < 0 ||
      assignmentCompleted < 0 ||
      assignmentCompleted > assignmentTotal
    )
      nextErrors.assignments = "완료 과제는 전체 과제 수 이하로 입력해 주세요.";
    if (score !== undefined && (score < 0 || score > maxScore))
      nextErrors.score = "평가 점수는 0점 이상, 만점 이하로 입력해 주세요.";
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) return null;
    return {
      id: reportId ?? generatedId,
      studentId: values.studentId,
      classId: values.classId,
      teacherId: selectedClass?.teacherId ?? "teacher-kim",
      title: values.title.trim(),
      period: values.period,
      status: "draft",
      updatedAt: "2026-10-31",
      summary: values.summary.trim(),
      progress: {
        completedUnits: completed,
        totalUnits: total,
        currentUnit: values.currentUnit.trim(),
        units: values.currentUnit.trim()
          ? [{ name: values.currentUnit.trim(), status: "inProgress" }]
          : [],
      },
      assignments: { completed: assignmentCompleted, total: assignmentTotal },
      assessments: values.assessmentName.trim()
        ? [
            {
              id: `local-assessment-${reportId ?? "new"}`,
              name: values.assessmentName.trim(),
              date: `${values.period}-28`,
              score,
              maxScore: score === undefined ? undefined : maxScore,
              comment: "초안에 입력한 평가 내용입니다.",
            },
          ]
        : [],
      feedback: {
        strengths: values.strengths.trim(),
        improvements: values.improvements.trim(),
        nextGoals: values.nextGoals.trim(),
        overall: values.overall.trim(),
      },
    };
  }
  function handleSave() {
    const report = buildReport();
    if (!report) return;
    try {
      saveDraft(report);
      setMessage("초안이 이 브라우저에 저장되었습니다.");
      if (!reportId) router.push(`/teacher/reports/${report.id}`);
      else router.refresh();
    } catch {
      setMessage("브라우저 저장소에 초안을 저장하지 못했습니다.");
    }
  }
  if (reportId && !source)
    return (
      <main className="!text-base !font-normal">
        <div className="mx-auto py-20 text-center">
          <h1 className="text-xl font-bold">리포트를 찾을 수 없어요.</h1>
          <Button
            type="button"
            variant="link"
            onClick={() => router.push("/teacher/reports")}
            className="mt-4"
          >
            목록으로
          </Button>
        </div>
      </main>
    );
  if (source?.status === "published")
    return (
      <main className="!text-base !font-normal">
        <div className="mx-auto max-w-3xl">
          <p className="mb-5 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            발행 완료된 샘플 리포트는 읽기 전용입니다.
          </p>
          <ReportContent report={source} />
        </div>
      </main>
    );
  const previewReport = buildPreview(
    values,
    reportId,
    selectedClass?.teacherId,
  );
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-4xl">
        <header>
          <h1 className="text-2xl font-bold text-gray-900">
            {reportId ? "리포트 초안 수정" : "새 리포트 작성"}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            현재는 데모 모드입니다. 초안은 이 브라우저에만 저장됩니다.
          </p>
        </header>
        <div className="mt-6 flex gap-2">
          <Button
            type="button"
            variant={preview ? "outline" : "default"}
            onClick={() => setPreview(false)}
            className="h-11"
          >
            작성
          </Button>
          <Button
            type="button"
            variant={preview ? "default" : "outline"}
            onClick={() => setPreview(true)}
            className="h-11"
          >
            <Eye className="size-4" />
            미리보기
          </Button>
        </div>
        {preview ? (
          <div className="mt-6">
            <ReportContent report={previewReport} preview />
          </div>
        ) : (
          <form
            className="mt-6 space-y-7"
            onSubmit={(e) => {
              e.preventDefault();
              handleSave();
            }}
            noValidate
          >
            <FormSection title="기본 정보">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="담당 반" error={errors.classId}>
                  <select
                    value={values.classId}
                    onChange={(e) => {
                      update("classId", e.target.value);
                      update("studentId", "");
                    }}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm"
                  >
                    <option value="">반 선택</option>
                    {academyClasses.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="학생" error={errors.studentId}>
                  <select
                    value={values.studentId}
                    onChange={(e) => update("studentId", e.target.value)}
                    disabled={!selectedClass}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-white px-3 text-sm disabled:bg-gray-100"
                  >
                    <option value="">학생 선택</option>
                    {students.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="평가 기간" error={errors.period}>
                  <Input
                    type="month"
                    value={values.period}
                    onChange={(e) => update("period", e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field label="리포트 제목" error={errors.title}>
                  <Input
                    value={values.title}
                    onChange={(e) => update("title", e.target.value)}
                    className="h-11"
                  />
                </Field>
              </div>
            </FormSection>
            <FormSection title="학습 현황">
              <Field label="학습 요약">
                <Textarea
                  value={values.summary}
                  onChange={(e) => update("summary", e.target.value)}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="현재 학습 단원">
                  <Input
                    value={values.currentUnit}
                    onChange={(e) => update("currentUnit", e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field label="완료 단원 / 전체 단원" error={errors.progress}>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      min="0"
                      value={values.completedUnits}
                      onChange={(e) => update("completedUnits", e.target.value)}
                      className="h-11"
                    />
                    <Input
                      type="number"
                      min="0"
                      value={values.totalUnits}
                      onChange={(e) => update("totalUnits", e.target.value)}
                      className="h-11"
                    />
                  </div>
                </Field>
                <Field label="완료 과제 / 전체 과제" error={errors.assignments}>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      min="0"
                      value={values.assignmentsCompleted}
                      onChange={(e) =>
                        update("assignmentsCompleted", e.target.value)
                      }
                      className="h-11"
                    />
                    <Input
                      type="number"
                      min="0"
                      value={values.assignmentsTotal}
                      onChange={(e) =>
                        update("assignmentsTotal", e.target.value)
                      }
                      className="h-11"
                    />
                  </div>
                </Field>
              </div>
            </FormSection>
            <FormSection title="평가 결과">
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="평가명">
                  <Input
                    value={values.assessmentName}
                    onChange={(e) => update("assessmentName", e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field label="점수" error={errors.score}>
                  <Input
                    type="number"
                    min="0"
                    value={values.score}
                    onChange={(e) => update("score", e.target.value)}
                    className="h-11"
                  />
                </Field>
                <Field label="만점">
                  <Input
                    type="number"
                    min="1"
                    value={values.maxScore}
                    onChange={(e) => update("maxScore", e.target.value)}
                    className="h-11"
                  />
                </Field>
              </div>
            </FormSection>
            <FormSection title="선생님 피드백">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  ["strengths", "잘하고 있는 점"],
                  ["improvements", "보완할 점"],
                  ["nextGoals", "다음 학습 목표"],
                  ["overall", "종합 의견"],
                ].map(([name, label]) => (
                  <Field key={name} label={label}>
                    <Textarea
                      value={values[name as keyof Values]}
                      onChange={(e) =>
                        update(name as keyof Values, e.target.value)
                      }
                    />
                  </Field>
                ))}
              </div>
            </FormSection>
            <div className="flex flex-wrap items-center gap-3">
              <Button type="submit" className="h-11 rounded-xl px-5">
                <Save className="size-4" />
                브라우저에 초안 저장
              </Button>
              <Button type="button" disabled variant="outline" className="h-11">
                발행
              </Button>
              <span className="text-xs text-gray-500">
                리포트 발행은 실제 데이터 연동 후 제공됩니다.
              </span>
            </div>
            <p
              aria-live="polite"
              className="min-h-5 text-sm font-medium text-primary-700"
            >
              {message}
            </p>
          </form>
        )}
      </div>
    </main>
  );
}
function FormSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-gray-100 bg-white p-4 sm:p-5">
      <h2 className="mb-4 text-lg font-bold text-gray-900">{title}</h2>
      {children}
    </section>
  );
}
function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-gray-700">
        {label}
      </span>
      {children}
      {error ? (
        <span className="mt-1 block text-xs text-red-600">{error}</span>
      ) : null}
    </label>
  );
}
function Textarea({
  value,
  onChange,
}: {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={4}
      className="w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-primary focus:ring-3 focus:ring-primary/20"
    />
  );
}
function buildPreview(
  values: Values,
  id?: string,
  teacherId?: string,
): LearningReport {
  return {
    id: id ?? "preview",
    studentId: values.studentId,
    classId: values.classId,
    teacherId: teacherId ?? "teacher-kim",
    title: values.title || "리포트 제목",
    period: values.period || "2026-10",
    status: "draft",
    updatedAt: "2026-10-31",
    summary: values.summary,
    progress: {
      completedUnits: Number(values.completedUnits) || 0,
      totalUnits: Number(values.totalUnits) || 0,
      currentUnit: values.currentUnit,
      units: values.currentUnit
        ? [{ name: values.currentUnit, status: "inProgress" }]
        : [],
    },
    assignments: {
      completed: Number(values.assignmentsCompleted) || 0,
      total: Number(values.assignmentsTotal) || 0,
    },
    assessments: values.assessmentName
      ? [
          {
            id: "preview-assessment",
            name: values.assessmentName,
            date: `${values.period}-28`,
            score: values.score === "" ? undefined : Number(values.score),
            maxScore: Number(values.maxScore) || 100,
            comment: "작성 중인 평가 내용입니다.",
          },
        ]
      : [],
    feedback: {
      strengths: values.strengths,
      improvements: values.improvements,
      nextGoals: values.nextGoals,
      overall: values.overall,
    },
  };
}

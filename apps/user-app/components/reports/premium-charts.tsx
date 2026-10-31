"use client";

import type { ReportAnalytics, SkillScore } from "@/lib/mock/report-analytics";

function ChartFrame({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="min-w-0 rounded-2xl border border-gray-100 bg-white p-4 shadow-[0_8px_24px_rgba(17,24,39,0.035)] sm:p-5">
      <figcaption>
        <h3 className="font-bold text-gray-900">{title}</h3>
        <p className="mt-1 text-xs leading-5 text-gray-500">{description}</p>
      </figcaption>
      <div className="mt-5 min-w-0">{children}</div>
    </figure>
  );
}

export function ScoreTrendChart({
  data,
}: {
  data: ReportAnalytics["scoreHistory"];
}) {
  const points = data.map((item, index) => ({
    x: 36 + index * (260 / Math.max(1, data.length - 1)),
    student: 150 - item.score * 1.1,
    average: 150 - item.classAverage * 1.1,
    ...item,
  }));
  return (
    <ChartFrame
      title="최근 성적 추이"
      description="동일한 단원 평가 기준 · 학생 점수와 반 평균"
    >
      <svg
        viewBox="0 0 332 180"
        role="img"
        aria-label={data
          .map(
            (d) => `${d.period} 학생 ${d.score}점 반 평균 ${d.classAverage}점`,
          )
          .join(", ")}
        className="h-auto w-full overflow-visible"
      >
        <defs>
          <linearGradient id="scoreArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8b5cf6" stopOpacity=".25" />
            <stop offset="1" stopColor="#8b5cf6" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[60, 80, 100].map((v) => (
          <g key={v}>
            <line
              x1="32"
              x2="316"
              y1={150 - v * 1.1}
              y2={150 - v * 1.1}
              stroke="#e5e7eb"
            />
            <text x="4" y={154 - v * 1.1} fontSize="10" fill="#9ca3af">
              {v}
            </text>
          </g>
        ))}
        <path
          d={`M ${points.map((p) => `${p.x},${p.student}`).join(" L ")} L ${points.at(-1)?.x},158 L ${points[0]?.x},158 Z`}
          fill="url(#scoreArea)"
        />
        <polyline
          points={points.map((p) => `${p.x},${p.student}`).join(" ")}
          fill="none"
          stroke="#7c3aed"
          strokeWidth="3"
        />
        <polyline
          points={points.map((p) => `${p.x},${p.average}`).join(" ")}
          fill="none"
          stroke="#60a5fa"
          strokeWidth="2"
          strokeDasharray="5 4"
        />
        {points.map((p) => (
          <g key={p.period}>
            <circle cx={p.x} cy={p.student} r="4" fill="#7c3aed" />
            <text
              x={p.x}
              y={p.student - 9}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#5b21b6"
            >
              {p.score}
            </text>
            <text
              x={p.x}
              y="174"
              textAnchor="middle"
              fontSize="10"
              fill="#6b7280"
            >
              {Number(p.period.slice(5))}월
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-2 flex gap-4 text-xs text-gray-500">
        <span>
          <i className="mr-1 inline-block size-2 rounded-full bg-primary-600" />
          학생 점수
        </span>
        <span>
          <i className="mr-1 inline-block size-2 rounded-full bg-blue-400" />반
          평균
        </span>
      </div>
    </ChartFrame>
  );
}

export function SkillRadarChart({ skills }: { skills: SkillScore[] }) {
  const center = 100,
    radius = 65,
    angle = (i: number) => -Math.PI / 2 + (Math.PI * 2 * i) / skills.length;
  const polygon = (scale: number) =>
    skills
      .map(
        (_, i) =>
          `${center + Math.cos(angle(i)) * radius * scale},${center + Math.sin(angle(i)) * radius * scale}`,
      )
      .join(" ");
  const scorePoints = skills
    .map(
      (s, i) =>
        `${center + Math.cos(angle(i)) * radius * (s.score / 100)},${center + Math.sin(angle(i)) * radius * (s.score / 100)}`,
    )
    .join(" ");
  return (
    <ChartFrame
      title="학습 역량 분석"
      description="영역별 성취 점수와 기준 점수를 함께 확인합니다."
    >
      <svg
        viewBox="0 0 300 220"
        role="img"
        aria-label={skills.map((s) => `${s.label} ${s.score}점`).join(", ")}
        className="mx-auto h-auto w-full max-w-xs"
      >
        {[0.25, 0.5, 0.75, 1].map((v) => (
          <polygon key={v} points={polygon(v)} fill="none" stroke="#e5e7eb" />
        ))}
        {skills.map((s, i) => {
          const x = center + Math.cos(angle(i)) * radius,
            y = center + Math.sin(angle(i)) * radius;
          return (
            <g key={s.label}>
              <line x1={center} y1={center} x2={x} y2={y} stroke="#e5e7eb" />
              <text
                x={center + Math.cos(angle(i)) * 90}
                y={center + Math.sin(angle(i)) * 90 + 4}
                textAnchor="middle"
                fontSize="10"
                fill="#4b5563"
              >
                {s.label}
              </text>
            </g>
          );
        })}
        <polygon
          points={scorePoints}
          fill="#c4b5fd"
          fillOpacity=".55"
          stroke="#7c3aed"
          strokeWidth="2"
        />
      </svg>
    </ChartFrame>
  );
}

export function DonutMetric({
  label,
  value,
  detail,
  tone = "purple",
}: {
  label: string;
  value: number | null;
  detail: string;
  tone?: "purple" | "green" | "orange";
}) {
  const color = { purple: "#7c3aed", green: "#16a34a", orange: "#ea580c" }[
    tone
  ];
  const safe = value ?? 0;
  return (
    <div className="flex min-w-0 items-center gap-3 rounded-2xl bg-gray-50 p-3">
      <svg
        viewBox="0 0 44 44"
        className="size-16 shrink-0"
        role="img"
        aria-label={`${label} ${value === null ? "데이터 없음" : `${value}%`}`}
      >
        <circle
          cx="22"
          cy="22"
          r="17"
          fill="none"
          stroke="#e5e7eb"
          strokeWidth="6"
        />
        <circle
          cx="22"
          cy="22"
          r="17"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeLinecap="round"
          strokeDasharray={`${safe * 1.068} 106.8`}
          transform="rotate(-90 22 22)"
        />
        <text
          x="22"
          y="25"
          textAnchor="middle"
          fontSize="9"
          fontWeight="700"
          fill="#111827"
        >
          {value === null ? "—" : `${value}%`}
        </text>
      </svg>
      <div>
        <p className="text-sm font-bold text-gray-900">{label}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500">{detail}</p>
      </div>
    </div>
  );
}

export function SkillBars({ skills }: { skills: SkillScore[] }) {
  return (
    <div className="space-y-4">
      {skills.map((skill) => (
        <div key={skill.label}>
          <div className="flex justify-between text-xs">
            <span className="font-semibold text-gray-700">{skill.label}</span>
            <span className="text-gray-500">
              {skill.score}점 · 기준 {skill.benchmark}점
            </span>
          </div>
          <div className="relative mt-2 h-2 overflow-hidden rounded-full bg-gray-100">
            <span
              className="absolute inset-y-0 left-0 rounded-full bg-primary-400"
              style={{ width: `${skill.score}%` }}
            />
            <span
              className="absolute inset-y-0 w-0.5 bg-gray-700"
              style={{ left: `${skill.benchmark}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export function DistributionChart({
  data,
  score,
}: {
  data: ReportAnalytics["scoreDistribution"];
  score: number;
}) {
  const max = Math.max(...data.map((d) => d.count));
  return (
    <ChartFrame
      title="반 점수 분포"
      description="익명 구간별 인원 · 보라색은 학생 점수 구간"
    >
      <div className="flex h-36 items-end gap-2">
        {data.map((item) => {
          const [start, end] = item.range.split("~").map(Number);
          const active = score >= start && score <= end;
          return (
            <div
              key={item.range}
              className="flex min-w-0 flex-1 flex-col items-center"
            >
              <span className="mb-1 text-xs font-bold text-gray-600">
                {item.count}명
              </span>
              <div
                className={
                  active
                    ? "w-full rounded-t-lg bg-primary-500"
                    : "w-full rounded-t-lg bg-blue-200"
                }
                style={{ height: `${Math.max(12, (item.count / max) * 90)}px` }}
              />
              <span className="mt-2 text-[0.625rem] text-gray-500">
                {item.range}
              </span>
            </div>
          );
        })}
      </div>
    </ChartFrame>
  );
}

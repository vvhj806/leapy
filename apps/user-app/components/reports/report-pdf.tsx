import { Document, Page, StyleSheet, Text, View } from "@react-pdf/renderer";

import type { LearningReport } from "@/lib/mock/reports";
import { formatReportDate } from "@/lib/mock/reports";
import { resolveMonthlyReport } from "@/lib/reports/report-view-model";

const s = StyleSheet.create({
  page: {
    fontFamily: "PretendardPdf",
    fontSize: 9,
    color: "#374151",
    paddingTop: 40,
    paddingBottom: 38,
    paddingHorizontal: 42,
    backgroundColor: "#fff",
  },
  header: {
    backgroundColor: "#ede9fe",
    borderRadius: 14,
    padding: 22,
    marginBottom: 18,
  },
  brand: { fontSize: 9, fontWeight: 700, color: "#6d28d9", letterSpacing: 1.5 },
  title: { fontSize: 22, fontWeight: 700, color: "#111827", marginTop: 9 },
  subtitle: { fontSize: 10, color: "#6b7280", marginTop: 7 },
  h2: { fontSize: 15, fontWeight: 700, color: "#111827", marginBottom: 10 },
  h3: { fontSize: 10, fontWeight: 700, color: "#111827", marginBottom: 5 },
  row: { flexDirection: "row", gap: 10 },
  card: { flex: 1, borderRadius: 10, padding: 12, backgroundColor: "#f9fafb" },
  metric: { fontSize: 17, fontWeight: 700, color: "#5b21b6", marginTop: 6 },
  body: { lineHeight: 1.65 },
  section: { marginBottom: 18 },
  barBg: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#e5e7eb",
    marginTop: 5,
  },
  bar: { height: 8, borderRadius: 4, backgroundColor: "#8b5cf6" },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: "#e5e7eb",
    paddingVertical: 8,
  },
  footer: {
    position: "absolute",
    bottom: 18,
    left: 42,
    right: 42,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 7,
    color: "#9ca3af",
  },
  green: { backgroundColor: "#ecfdf5" },
  orange: { backgroundColor: "#fff7ed" },
  blue: { backgroundColor: "#eff6ff" },
  purple: { backgroundColor: "#f5f3ff" },
});
function Footer({ period }: { period: string }) {
  return (
    <View style={s.footer} fixed>
      <Text>Leapy Monthly Learning Report · {period}</Text>
      <Text
        render={({ pageNumber, totalPages }) => `${pageNumber} / ${totalPages}`}
      />
    </View>
  );
}
function Metric({ label, value }: { label: string; value: string }) {
  return (
    <View style={s.card}>
      <Text>{label}</Text>
      <Text style={s.metric}>{value}</Text>
    </View>
  );
}
export function MonthlyReportPdf({ report }: { report: LearningReport }) {
  const vm = resolveMonthlyReport(report),
    a = vm.analytics;
  if (!a)
    return (
      <Document>
        <Page size="A4" style={s.page}>
          <Text>분석 데이터가 없습니다.</Text>
        </Page>
      </Document>
    );
  const scoreDiff = vm.currentScore! - vm.classAverage!;
  return (
    <Document
      title={`${vm.student?.name} ${vm.periodLabel} 학습 종합 리포트`}
      author="Leapy"
    >
      <Page size="A4" style={s.page}>
        <View style={s.header}>
          <Text style={s.brand}>LEAPY · MONTHLY LEARNING REPORT</Text>
          <Text style={s.title}>{vm.periodLabel} 학습 종합 리포트</Text>
          <Text style={s.subtitle}>
            {vm.student?.name} · {vm.academyClass?.name} ·{" "}
            {vm.academyClass?.subject}
          </Text>
          <Text style={s.subtitle}>
            담당 {vm.academyClass?.teacherName} ·{" "}
            {formatReportDate(report.publishedAt)} 발행
          </Text>
        </View>
        <View style={s.section}>
          <Text style={s.h2}>이번 달 학습 총평</Text>
          <Text style={s.body}>{report.summary}</Text>
        </View>
        <View style={[s.row, s.section]}>
          <Metric label="최근 평가" value={`${vm.currentScore}점`} />
          <Metric
            label="전월 대비"
            value={`${vm.scoreChange! >= 0 ? "+" : ""}${vm.scoreChange}점`}
          />
          <Metric
            label="반 평균 대비"
            value={`${scoreDiff >= 0 ? "+" : ""}${scoreDiff}점`}
          />
          <Metric
            label="현재 순위"
            value={`${vm.cohortSize}명 중 ${vm.rank}등`}
          />
        </View>
        <View style={[s.card, s.purple]}>
          <Text style={s.h3}>핵심 성장 요약</Text>
          <Text style={s.body}>
            최근 3개월 점수는 {a.scoreHistory[0].score}점에서{" "}
            {a.scoreHistory.at(-1)!.score}점으로 변화했습니다.{" "}
            {vm.strongestSkill?.label} 영역이 상대적으로 강점이며,{" "}
            {vm.growthSkill?.label} 영역은 다음 달에 집중 보완합니다.
          </Text>
        </View>
        <Footer period={vm.periodLabel} />
      </Page>
      <Page size="A4" style={s.page}>
        <Text style={s.h2}>성적 및 순위 분석</Text>
        <View style={s.section}>
          {a.scoreHistory.map((item) => (
            <View key={item.period} style={s.line}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{item.period.replace("-", "년 ")}월</Text>
                <Text>
                  학생 {item.score}점 · 반 평균 {item.classAverage}점 ·{" "}
                  {item.cohortSize}명 중 {item.rank}등
                </Text>
              </View>
              <View style={s.barBg}>
                <View style={[s.bar, { width: `${item.score}%` }]} />
              </View>
            </View>
          ))}
        </View>
        <View style={[s.row, s.section]}>
          <View style={[s.card, s.blue]}>
            <Text style={s.h3}>현재 순위</Text>
            <Text style={s.metric}>
              {vm.rank}등 / {vm.cohortSize}명
            </Text>
            <Text style={s.body}>
              이전 {vm.previousRank}등에서 {vm.previousRank! - vm.rank!}계단
              상승 · 상위 약 {vm.topPercentage}%
            </Text>
          </View>
          <View style={s.card}>
            <Text style={s.h3}>점수 분포</Text>
            {a.scoreDistribution.map((item) => (
              <Text key={item.range} style={{ marginTop: 5 }}>
                {item.range}점 · {item.count}명
                {vm.currentScore! >= Number(item.range.split("~")[0]) &&
                vm.currentScore! <= Number(item.range.split("~")[1])
                  ? "  ← 학생 구간"
                  : ""}
              </Text>
            ))}
          </View>
        </View>
        <Text style={{ fontSize: 7, color: "#9ca3af" }}>
          반 통계는 동일 단원 평가 기준의 가상 데모 데이터이며 다른 학생의 개별
          점수는 표시하지 않습니다.
        </Text>
        <Footer period={vm.periodLabel} />
      </Page>
      <Page size="A4" style={s.page}>
        <Text style={s.h2}>학습 성취도 및 진도</Text>
        <View style={[s.section, s.card, s.purple]}>
          {a.skillScores.map((skill) => (
            <View key={skill.label} style={{ marginBottom: 10 }}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text>{skill.label}</Text>
                <Text>
                  {skill.score}점 · 기준 {skill.benchmark}점
                </Text>
              </View>
              <View style={s.barBg}>
                <View style={[s.bar, { width: `${skill.score}%` }]} />
              </View>
            </View>
          ))}
        </View>
        <View style={[s.row, s.section]}>
          <View style={[s.card, s.green]}>
            <Text style={s.h3}>상대적 강점</Text>
            <Text style={s.metric}>{vm.strongestSkill?.label}</Text>
            <Text>{vm.strongestSkill?.score}점</Text>
          </View>
          <View style={[s.card, s.orange]}>
            <Text style={s.h3}>우선 보완 영역</Text>
            <Text style={s.metric}>{vm.growthSkill?.label}</Text>
            <Text>{vm.growthSkill?.score}점</Text>
          </View>
        </View>
        <Text style={s.h2}>단원별 학습 현황</Text>
        {report.progress.units.map((unit) => (
          <View key={unit.name} style={s.line}>
            <Text>
              {unit.name} ·{" "}
              {
                { completed: "완료", inProgress: "학습 중", planned: "예정" }[
                  unit.status
                ]
              }
            </Text>
          </View>
        ))}
        <Footer period={vm.periodLabel} />
      </Page>
      <Page size="A4" style={s.page}>
        <Text style={s.h2}>출결·과제·학습 참여</Text>
        <View style={[s.row, s.section]}>
          <Metric label="출결률" value={`${vm.attendanceRate}%`} />
          <Metric label="과제 완료율" value={`${vm.assignmentRate}%`} />
          <Metric label="학습 진도율" value={`${vm.progressRate}%`} />
        </View>
        <View style={[s.row, s.section]}>
          <View style={[s.card, s.green]}>
            <Text style={s.h3}>출결 상세</Text>
            <Text style={s.body}>출석 {a.attendance.present}회</Text>
            <Text style={s.body}>지각 {a.attendance.late}회</Text>
            <Text style={s.body}>결석 {a.attendance.absent}회</Text>
          </View>
          <View style={[s.card, s.orange]}>
            <Text style={s.h3}>과제 현황</Text>
            <Text style={s.metric}>
              {report.assignments.completed} / {report.assignments.total}
            </Text>
            <Text style={s.body}>완료 과제 / 전체 과제</Text>
          </View>
        </View>
        <Text style={s.h2}>주차별 학습 활동</Text>
        {a.weeklyActivity.map((item) => (
          <View key={item.week} style={s.line}>
            <Text>
              {item.week} · 수업 {item.classes}회 · 과제 {item.assignments}개 ·
              평가 {item.assessments}회
            </Text>
          </View>
        ))}
        <Footer period={vm.periodLabel} />
      </Page>
      <Page size="A4" style={s.page}>
        <Text style={s.h2}>선생님 종합 평가와 다음 달 계획</Text>
        <View style={[s.card, s.green, s.section]}>
          <Text style={s.h3}>잘하고 있는 점</Text>
          <Text style={s.body}>{report.feedback.strengths}</Text>
        </View>
        <View style={[s.card, s.orange, s.section]}>
          <Text style={s.h3}>보완하면 좋은 점</Text>
          <Text style={s.body}>{report.feedback.improvements}</Text>
        </View>
        <View style={[s.card, s.purple, s.section]}>
          <Text style={s.h3}>선생님 종합 의견</Text>
          <Text style={s.body}>{report.feedback.overall}</Text>
        </View>
        <View style={[s.card, s.blue]}>
          <Text style={s.h3}>다음 달 학습 계획</Text>
          <Text style={s.body}>예정 단원 · {a.nextPlan.units.join(", ")}</Text>
          <Text style={s.body}>우선 보완 · {a.nextPlan.prioritySkill}</Text>
          <Text style={s.body}>과제 목표 · {a.nextPlan.assignmentGoal}</Text>
          <Text style={s.body}>다음 평가 · {a.nextPlan.nextAssessment}</Text>
          <Text style={s.body}>학부모 안내 · {a.nextPlan.parentNote}</Text>
        </View>
        <Footer period={vm.periodLabel} />
      </Page>
    </Document>
  );
}

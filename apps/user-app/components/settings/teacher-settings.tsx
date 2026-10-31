import { CheckCircle2, ClipboardList, FilePlus2, Users } from "lucide-react";

import { NotificationSettings } from "@/components/settings/notification-settings";
import {
  FaqList,
  InfoGrid,
  ProfileSummary,
  SettingLink,
  SettingsSection,
  UnavailableSetting,
} from "@/components/settings/settings-ui";
import {
  teacherFaqs,
  teacherSettingsClasses,
  teacherSettingsProfile,
  teacherStudentCount,
} from "@/lib/mock/settings";
import {
  defaultTeacherPreferences,
  type TeacherNotificationPreferences,
} from "@/lib/settings/preferences";

const notifications: ReadonlyArray<{
  key: keyof TeacherNotificationPreferences;
  label: string;
  description: string;
}> = [
  {
    key: "classNotices",
    label: "담당 반 공지 알림",
    description: "담당 반과 관련된 새 공지를 표시합니다.",
  },
  {
    key: "pendingAttendance",
    label: "학생 출결 미처리 알림",
    description: "확인이 필요한 출결 업무 안내를 표시합니다.",
  },
  {
    key: "scheduleChanges",
    label: "수업 일정 변경 알림",
    description: "휴강·보강 등 수업 일정 변경을 표시합니다.",
  },
  {
    key: "reportReminders",
    label: "학습 리포트 작성 알림",
    description: "작성할 리포트가 있을 때 안내를 표시합니다.",
  },
  {
    key: "academyNotices",
    label: "학원 운영 공지 알림",
    description: "강사 회의와 학원 운영 공지를 표시합니다.",
  },
];

export function TeacherSettings() {
  const profile = teacherSettingsProfile;
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            설정
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            프로필과 수업 관리 환경을 확인하세요.
          </p>
        </header>

        <ProfileSummary
          name={profile.name}
          role={profile.role}
          academy={profile.academyName}
          details={`${profile.subject} · 담당 반 ${teacherSettingsClasses.length}개 · 담당 학생 ${teacherStudentCount}명`}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <SettingsSection title="소속 학원 및 담당 정보">
              <InfoGrid
                items={[
                  ["학원", profile.academyName],
                  ["담당 과목", profile.subject],
                  ["담당 반", `${teacherSettingsClasses.length}개`],
                  ["담당 학생", `${teacherStudentCount}명`],
                ]}
              />
            </SettingsSection>

            <SettingsSection
              title="담당 반"
              description="반을 선택하면 기존 상세 화면으로 이동합니다."
            >
              {teacherSettingsClasses.length ? (
                teacherSettingsClasses.map((academyClass) => (
                  <SettingLink
                    key={academyClass.id}
                    href={`/teacher/classes/${academyClass.id}`}
                    icon={Users}
                    label={academyClass.name}
                    description={`${academyClass.subject} · ${academyClass.studentCount}명 · ${academyClass.schedule}`}
                  />
                ))
              ) : (
                <p className="px-4 py-8 text-center text-sm text-gray-500">
                  배정된 담당 반이 없습니다.
                </p>
              )}
            </SettingsSection>

            <SettingsSection title="업무 바로가기">
              <SettingLink
                href="/teacher/attendance"
                icon={CheckCircle2}
                label="출결 관리"
                description="학생별 출결 상태를 확인하고 처리합니다."
              />
              <SettingLink
                href="/teacher/classes"
                icon={Users}
                label="반 관리"
                description="담당 반과 학생 명단을 확인합니다."
              />
              <SettingLink
                href="/teacher/reports"
                icon={ClipboardList}
                label="리포트 관리"
                description="리포트 목록과 초안을 확인합니다."
              />
              <SettingLink
                href="/teacher/reports/new"
                icon={FilePlus2}
                label="리포트 작성"
                description="새 학습 리포트 초안을 작성합니다."
              />
            </SettingsSection>
          </div>

          <div className="space-y-8">
            <SettingsSection
              title="업무 알림 설정"
              description="이 브라우저에 저장되는 데모 환경설정입니다."
            >
              <NotificationSettings
                role="teacher"
                defaults={defaultTeacherPreferences}
                items={notifications}
              />
            </SettingsSection>

            <SettingsSection title="계정 및 보안">
              <UnavailableSetting
                label="계정 정보 및 로그인 세션"
                description="Supabase 인증 기능 연동 후 제공됩니다."
              />
              <UnavailableSetting
                label="비밀번호 변경"
                description="본인 확인과 계정 보안 기능 연동 후 제공됩니다."
              />
              <UnavailableSetting
                label="로그아웃"
                description="현재 정상 로그아웃 기능이 연결되지 않아 제공하지 않습니다."
              />
            </SettingsSection>
          </div>
        </div>

        <SettingsSection
          title="자주 묻는 질문"
          description="현재 구현된 업무 기능을 기준으로 안내합니다."
        >
          <FaqList items={teacherFaqs} />
        </SettingsSection>

        <SettingsSection title="고객지원 및 앱 정보">
          <InfoGrid
            items={[
              ["서비스", "Leapy"],
              ["문의", "고객지원 기능 준비 중"],
              ["이용약관", "준비 중"],
              ["개인정보 처리방침", "준비 중"],
            ]}
          />
        </SettingsSection>
      </div>
    </main>
  );
}

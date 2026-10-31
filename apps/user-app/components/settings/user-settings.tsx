import {
  CalendarDays,
  CheckCircle2,
  ClipboardList,
  Megaphone,
} from "lucide-react";

import { NotificationSettings } from "@/components/settings/notification-settings";
import {
  FaqList,
  InfoGrid,
  ProfileSummary,
  SettingLink,
  SettingsSection,
  UnavailableSetting,
} from "@/components/settings/settings-ui";
import { userFaqs, userSettingsProfile } from "@/lib/mock/settings";
import {
  defaultUserPreferences,
  type UserNotificationPreferences,
} from "@/lib/settings/preferences";

const notifications: ReadonlyArray<{
  key: keyof UserNotificationPreferences;
  label: string;
  description: string;
}> = [
  {
    key: "notices",
    label: "학원 공지 알림",
    description: "새로운 학원 공지가 등록될 때 표시합니다.",
  },
  {
    key: "schedule",
    label: "수업 일정 알림",
    description: "예정된 수업 일정을 확인하기 위한 설정입니다.",
  },
  {
    key: "scheduleChanges",
    label: "휴강 및 보강 알림",
    description: "휴강이나 보강 일정 변경 안내를 표시합니다.",
  },
  {
    key: "attendance",
    label: "출결 알림",
    description: "출석·지각·결석 기록 관련 안내를 표시합니다.",
  },
  {
    key: "reports",
    label: "학습 리포트 발행 알림",
    description: "새 월별 학습 리포트가 발행될 때 표시합니다.",
  },
];

export function UserSettings() {
  const profile = userSettingsProfile;
  return (
    <main className="!text-base !font-normal">
      <div className="mx-auto max-w-5xl space-y-8">
        <header>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            설정
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-500">
            내 정보와 Leapy 사용 환경을 확인하세요.
          </p>
        </header>

        <ProfileSummary
          name={profile.name}
          role={profile.role}
          academy={profile.academyName}
          details={`${profile.className} · ${profile.teacherName}`}
        />

        <div className="grid items-start gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <SettingsSection
              title="소속 학원 정보"
              description="소속 정보는 조회만 가능하며 변경할 수 없습니다."
            >
              <InfoGrid
                items={[
                  ["학원", profile.academyName],
                  ["소속 반", profile.className],
                  ["담당 선생님", profile.teacherName],
                  ["연락처", "등록된 정보 없음"],
                ]}
              />
            </SettingsSection>

            <SettingsSection
              title="바로가기"
              description="현재 제공되는 화면으로 이동합니다."
            >
              <SettingLink
                href="/user/attendance"
                icon={CheckCircle2}
                label="출결"
                description="출결 기록과 상태를 확인합니다."
              />
              <SettingLink
                href="/user/notice"
                icon={Megaphone}
                label="공지"
                description="학원과 수업 안내를 확인합니다."
              />
              <SettingLink
                href="/user/schedule"
                icon={CalendarDays}
                label="일정"
                description="예정 수업과 변경 일정을 확인합니다."
              />
              <SettingLink
                href="/user/report"
                icon={ClipboardList}
                label="학습 리포트"
                description="월별 성장 기록과 PDF를 확인합니다."
              />
            </SettingsSection>
          </div>

          <div className="space-y-8">
            <SettingsSection
              title="알림 설정"
              description="이 브라우저에 저장되는 데모 환경설정입니다."
            >
              <NotificationSettings
                role="user"
                defaults={defaultUserPreferences}
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
          description="현재 구현된 기능을 기준으로 안내합니다."
        >
          <FaqList items={userFaqs} />
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

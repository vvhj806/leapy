export type UserNotificationPreferences = {
  notices: boolean;
  schedule: boolean;
  scheduleChanges: boolean;
  attendance: boolean;
  reports: boolean;
};

export type TeacherNotificationPreferences = {
  classNotices: boolean;
  pendingAttendance: boolean;
  scheduleChanges: boolean;
  reportReminders: boolean;
  academyNotices: boolean;
};

export type SettingsRole = "user" | "teacher";

export const settingsStorageKeys = {
  user: "leapy:demo:settings:user:v1",
  teacher: "leapy:demo:settings:teacher:v1",
} as const;

export const defaultUserPreferences: UserNotificationPreferences = {
  notices: true,
  schedule: true,
  scheduleChanges: true,
  attendance: true,
  reports: true,
};

export const defaultTeacherPreferences: TeacherNotificationPreferences = {
  classNotices: true,
  pendingAttendance: true,
  scheduleChanges: true,
  reportReminders: true,
  academyNotices: true,
};

type PreferenceRecord = Record<string, boolean>;

export function parsePreferences<T extends PreferenceRecord>(
  value: string | null,
  defaults: T,
): T {
  if (!value) return defaults;
  try {
    const parsed: unknown = JSON.parse(value);
    if (!isPreferenceValue(parsed, defaults)) return defaults;
    const preferences = parsed.preferences as Record<string, unknown>;
    return Object.fromEntries(
      Object.keys(defaults).map((key) => [key, preferences[key]]),
    ) as T;
  } catch {
    return defaults;
  }
}

function isPreferenceValue<T extends PreferenceRecord>(
  value: unknown,
  defaults: T,
): value is { version: 1; preferences: Record<string, boolean> } {
  if (
    typeof value !== "object" ||
    value === null ||
    !("version" in value) ||
    value.version !== 1 ||
    !("preferences" in value) ||
    typeof value.preferences !== "object" ||
    value.preferences === null
  ) {
    return false;
  }
  const preferences = value.preferences as Record<string, unknown>;
  return Object.keys(defaults).every(
    (key) => typeof preferences[key] === "boolean",
  );
}

export function isPreferenceSnapshotValid<T extends PreferenceRecord>(
  value: string | null,
  defaults: T,
) {
  if (!value) return true;
  try {
    return isPreferenceValue(JSON.parse(value), defaults);
  } catch {
    return false;
  }
}

export function serializePreferences<T extends PreferenceRecord>(
  preferences: T,
) {
  return JSON.stringify({ version: 1, preferences });
}

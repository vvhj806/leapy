export const selectedChildStorageKey = "leapy:demo:guardian:selected-child:v1";
export const selectedChildEvent = "leapy:guardian-selected-child-change";

export function parseSelectedChild(value: string | null, allowedIds: string[]) {
  if (!value) return allowedIds[0] ?? "";
  try {
    const parsed: unknown = JSON.parse(value);
    if (
      typeof parsed === "object" &&
      parsed !== null &&
      "version" in parsed &&
      parsed.version === 1 &&
      "studentId" in parsed &&
      typeof parsed.studentId === "string" &&
      allowedIds.includes(parsed.studentId)
    ) {
      return parsed.studentId;
    }
  } catch {}
  return allowedIds[0] ?? "";
}

export function serializeSelectedChild(studentId: string) {
  return JSON.stringify({ version: 1, studentId });
}

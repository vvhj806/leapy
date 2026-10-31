import type { LearningReport } from "@/lib/mock/reports";

const STORAGE_KEY = "leapy:teacher:report-drafts:v1";
const EVENT_NAME = "leapy:report-drafts-change";

export function getDraftSnapshot() {
  if (typeof window === "undefined") return '{"version":1,"drafts":[]}';
  try {
    return (
      window.localStorage.getItem(STORAGE_KEY) ?? '{"version":1,"drafts":[]}'
    );
  } catch {
    return '{"version":1,"drafts":[]}';
  }
}

export function getServerDraftSnapshot() {
  return '{"version":1,"drafts":[]}';
}

export function parseDrafts(snapshot: string): LearningReport[] {
  try {
    const value: unknown = JSON.parse(snapshot);
    if (
      typeof value === "object" &&
      value !== null &&
      "version" in value &&
      value.version === 1 &&
      "drafts" in value &&
      Array.isArray(value.drafts)
    ) {
      return value.drafts as LearningReport[];
    }
  } catch {
    return [];
  }
  return [];
}

export function subscribeToDrafts(onChange: () => void) {
  if (typeof window === "undefined") return () => undefined;
  window.addEventListener("storage", onChange);
  window.addEventListener(EVENT_NAME, onChange);
  return () => {
    window.removeEventListener("storage", onChange);
    window.removeEventListener(EVENT_NAME, onChange);
  };
}

export function saveDraft(report: LearningReport) {
  const drafts = parseDrafts(getDraftSnapshot());
  const nextDrafts = drafts.some((item) => item.id === report.id)
    ? drafts.map((item) => (item.id === report.id ? report : item))
    : [report, ...drafts];
  window.localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({ version: 1, drafts: nextDrafts }),
  );
  window.dispatchEvent(new Event(EVENT_NAME));
}

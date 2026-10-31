export type NoticeRole = "user" | "teacher";

const NOTICE_READ_EVENT = "leapy:notice-read-state-change";

export function getNoticeStorageKey(role: NoticeRole) {
  return `leapy:${role}:read-notice-ids`;
}

export function getNoticeIdsSnapshot(role: NoticeRole) {
  if (typeof window === "undefined") return "[]";

  try {
    return window.localStorage.getItem(getNoticeStorageKey(role)) ?? "[]";
  } catch {
    return "[]";
  }
}

export function getServerNoticeIdsSnapshot() {
  return "[]";
}

export function parseNoticeIds(snapshot: string) {
  try {
    const parsedValue: unknown = JSON.parse(snapshot);

    return new Set(
      Array.isArray(parsedValue)
        ? parsedValue.filter(
            (value): value is string => typeof value === "string",
          )
        : [],
    );
  } catch {
    return new Set<string>();
  }
}

export function readNoticeIds(role: NoticeRole) {
  return parseNoticeIds(getNoticeIdsSnapshot(role));
}

export function subscribeToNoticeIds(onStoreChange: () => void) {
  if (typeof window === "undefined") return () => undefined;

  window.addEventListener("storage", onStoreChange);
  window.addEventListener(NOTICE_READ_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(NOTICE_READ_EVENT, onStoreChange);
  };
}

export function saveNoticeIds(role: NoticeRole, ids: Set<string>) {
  if (typeof window === "undefined") return;

  window.localStorage.setItem(
    getNoticeStorageKey(role),
    JSON.stringify(Array.from(ids)),
  );
  window.dispatchEvent(new Event(NOTICE_READ_EVENT));
}

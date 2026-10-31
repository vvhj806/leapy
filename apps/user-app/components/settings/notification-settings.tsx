"use client";

import { useState, useSyncExternalStore } from "react";

import {
  isPreferenceSnapshotValid,
  parsePreferences,
  serializePreferences,
  settingsStorageKeys,
  type SettingsRole,
} from "@/lib/settings/preferences";
import { cn } from "@/lib/utils";

type PreferenceRecord = Record<string, boolean>;
const SETTINGS_EVENT = "leapy:demo-settings-change";

export function NotificationSettings<T extends PreferenceRecord>({
  role,
  defaults,
  items,
}: {
  role: SettingsRole;
  defaults: T;
  items: ReadonlyArray<{
    key: keyof T & string;
    label: string;
    description: string;
  }>;
}) {
  const [message, setMessage] = useState("");
  const snapshot = useSyncExternalStore(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener(SETTINGS_EVENT, onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener(SETTINGS_EVENT, onStoreChange);
      };
    },
    () => {
      try {
        return window.localStorage.getItem(settingsStorageKeys[role]);
      } catch {
        return null;
      }
    },
    () => null,
  );
  const preferences = parsePreferences(snapshot, defaults);
  const recovered = !isPreferenceSnapshotValid(snapshot, defaults);

  function update(key: keyof T & string) {
    const next = { ...preferences, [key]: !preferences[key] };
    try {
      window.localStorage.setItem(
        settingsStorageKeys[role],
        serializePreferences(next),
      );
      window.dispatchEvent(new Event(SETTINGS_EVENT));
      setMessage("이 브라우저에 데모 설정을 저장했습니다.");
    } catch {
      setMessage(
        "설정을 저장하지 못했습니다. 브라우저 저장 공간을 확인해 주세요.",
      );
    }
  }

  return (
    <div>
      <div className="divide-y divide-gray-100">
        {items.map((item) => {
          const checked = preferences[item.key];
          return (
            <div
              key={item.key}
              className="flex min-h-20 min-w-0 items-center gap-4 px-4 py-3"
            >
              <div className="min-w-0 flex-1">
                <p
                  id={`${role}-${item.key}-label`}
                  className="text-sm font-semibold text-gray-900"
                >
                  {item.label}
                </p>
                <p className="mt-1 break-keep text-xs leading-5 text-gray-500">
                  {item.description}
                </p>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={checked}
                aria-labelledby={`${role}-${item.key}-label`}
                onClick={() => update(item.key)}
                className={cn(
                  "relative h-7 w-12 shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
                  checked ? "bg-primary" : "bg-gray-300",
                )}
              >
                <span
                  className={cn(
                    "absolute top-1 left-1 size-5 rounded-full bg-white shadow-sm transition-transform",
                    checked && "translate-x-5",
                  )}
                />
                <span className="sr-only">{checked ? "켜짐" : "꺼짐"}</span>
              </button>
            </div>
          );
        })}
      </div>
      <div className="border-t border-primary-100 bg-primary-50/60 px-4 py-3">
        <p className="text-xs leading-5 text-primary-800">
          현재는 데모 설정입니다. 실제 알림 수신은 서비스 연동 후 제공됩니다.
        </p>
        <p aria-live="polite" className="mt-1 text-xs text-gray-500">
          {message ||
            (recovered
              ? "저장된 설정을 읽을 수 없어 기본값으로 복구했습니다."
              : "")}
        </p>
      </div>
    </div>
  );
}

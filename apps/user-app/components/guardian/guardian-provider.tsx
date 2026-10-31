"use client";

import {
  createContext,
  useContext,
  useState,
  useSyncExternalStore,
} from "react";

import { guardianChildren, type ChildProfile } from "@/lib/mock/guardians";
import {
  parseSelectedChild,
  selectedChildEvent,
  selectedChildStorageKey,
  serializeSelectedChild,
} from "@/lib/guardian/selected-child-store";

type GuardianContextValue = {
  selectedChildId: string;
  selectedChild: ChildProfile;
  children: ChildProfile[];
  selectChild: (studentId: string) => void;
  message: string;
};

const GuardianContext = createContext<GuardianContextValue | null>(null);
const SERVER_SNAPSHOT = "__guardian_pending__";

export function GuardianProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState("");
  const ids = guardianChildren.map((child) => child.id);
  const snapshot = useSyncExternalStore(
    (onChange) => {
      window.addEventListener("storage", onChange);
      window.addEventListener(selectedChildEvent, onChange);
      return () => {
        window.removeEventListener("storage", onChange);
        window.removeEventListener(selectedChildEvent, onChange);
      };
    },
    () => {
      try {
        return window.localStorage.getItem(selectedChildStorageKey);
      } catch {
        return null;
      }
    },
    () => SERVER_SNAPSHOT,
  );
  if (snapshot === SERVER_SNAPSHOT) {
    return (
      <div
        className="flex min-h-dvh items-center justify-center bg-gray-50 px-4 text-sm text-gray-500"
        aria-live="polite"
      >
        자녀 정보를 불러오는 중입니다.
      </div>
    );
  }
  const selectedChildId = parseSelectedChild(snapshot, ids);
  const selectedChild =
    guardianChildren.find((child) => child.id === selectedChildId) ??
    guardianChildren[0];

  function selectChild(studentId: string) {
    if (!ids.includes(studentId)) return;
    try {
      window.localStorage.setItem(
        selectedChildStorageKey,
        serializeSelectedChild(studentId),
      );
      setMessage(
        `${guardianChildren.find((child) => child.id === studentId)?.name} 자녀로 전환했습니다.`,
      );
      window.dispatchEvent(new Event(selectedChildEvent));
    } catch {
      setMessage("선택을 저장하지 못해 기본 자녀를 유지합니다.");
    }
  }

  if (!selectedChild)
    return <div className="p-6 text-center">연결된 자녀가 없습니다.</div>;
  return (
    <GuardianContext.Provider
      value={{
        selectedChildId,
        selectedChild,
        children: guardianChildren,
        selectChild,
        message,
      }}
    >
      {children}
    </GuardianContext.Provider>
  );
}

export function useGuardian() {
  const value = useContext(GuardianContext);
  if (!value)
    throw new Error("useGuardian must be used within GuardianProvider");
  return value;
}

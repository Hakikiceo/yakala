export const PENDING_ACCESS_STORAGE_KEY = "yakala_pending_access";

export function markPendingAccess() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.setItem(PENDING_ACCESS_STORAGE_KEY, "1");
  } catch {}
}

export function clearPendingAccess() {
  if (typeof window === "undefined") {
    return;
  }

  try {
    window.localStorage.removeItem(PENDING_ACCESS_STORAGE_KEY);
  } catch {}
}

export function hasPendingAccess() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    return window.localStorage.getItem(PENDING_ACCESS_STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

export function isPendingAccessMessage(message: string | null | undefined) {
  if (!message) {
    return false;
  }

  const normalized = message.toLowerCase();
  return normalized.includes("onaylanmadi") || normalized.includes("not approved");
}

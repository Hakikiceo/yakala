export type AuthMode = "login" | "register";

export type AuthApp = "ihaleradar" | "unknown";

export function parseAllowedReturnTo(raw: string | undefined) {
  if (!raw) {
    return [];
  }

  return raw
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function toUrl(value: string) {
  try {
    return new URL(value);
  } catch {
    return null;
  }
}

function normalizePathname(pathname: string) {
  if (pathname === "/") {
    return "/";
  }

  return pathname.replace(/\/+$/, "");
}

export function isAllowedReturnTo(returnTo: string, allowedList: string[]) {
  const targetUrl = toUrl(returnTo);

  if (!targetUrl || (targetUrl.protocol !== "http:" && targetUrl.protocol !== "https:")) {
    return false;
  }

  return allowedList.some((entry) => {
    const allowedUrl = toUrl(entry);

    if (!allowedUrl) {
      return false;
    }

    if (allowedUrl.origin !== targetUrl.origin) {
      return false;
    }

    const allowedPath = normalizePathname(allowedUrl.pathname);
    const targetPath = normalizePathname(targetUrl.pathname);

    if (allowedPath === "/") {
      return true;
    }

    return targetPath === allowedPath || targetPath.startsWith(`${allowedPath}/`);
  });
}

export function resolveAuthApp(app: string | undefined): AuthApp {
  if (app === "ihaleradar") {
    return "ihaleradar";
  }

  return "unknown";
}

export function extractToken(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  const nested = (root.data ?? root.result) as Record<string, unknown> | undefined;

  const candidates = [
    root.token,
    root.accessToken,
    root.access_token,
    nested?.token,
    nested?.accessToken,
    nested?.access_token,
  ];

  for (const value of candidates) {
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

export function buildReturnToWithToken(returnTo: string, token: string) {
  const targetUrl = new URL(returnTo);
  targetUrl.searchParams.set("token", token);
  return targetUrl.toString();
}

export function readErrorMessage(payload: unknown) {
  if (!payload || typeof payload !== "object") {
    return null;
  }

  const root = payload as Record<string, unknown>;
  const candidates = [root.message, root.error, root.detail];

  for (const value of candidates) {
    if (typeof value === "string" && value.length > 0) {
      return value;
    }
  }

  return null;
}

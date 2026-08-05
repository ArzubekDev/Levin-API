import { SESSION_COOKIE } from "./session-cookie";

export { SESSION_COOKIE } from "./session-cookie";

const ACCESS_TOKEN_KEY = "accessToken";
const TOKEN_CHANGE_EVENT = "access-token-change";

function setSessionCookie(present: boolean) {
  if (typeof document === "undefined") return;

  if (present) {
    document.cookie = `${SESSION_COOKIE}=1; path=/; max-age=604800; SameSite=Lax`;
    return;
  }

  document.cookie = `${SESSION_COOKIE}=; path=/; max-age=0; SameSite=Lax`;
}

export function syncSessionCookie() {
  setSessionCookie(Boolean(getAccessToken()));
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(ACCESS_TOKEN_KEY);
}

export function setAccessToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token);
  setSessionCookie(true);
  window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  setSessionCookie(false);
  window.dispatchEvent(new Event(TOKEN_CHANGE_EVENT));
}

export function subscribeAccessToken(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(TOKEN_CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(TOKEN_CHANGE_EVENT, onStoreChange);
  };
}

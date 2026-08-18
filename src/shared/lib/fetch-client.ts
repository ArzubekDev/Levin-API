import { FetchError } from "./fetch-error";

const API_URL = "/backend";

type RequestOptions = RequestInit & {
  clearSessionOn401?: boolean;
};

async function clearServerSession() {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });
  } catch {
    return;
  }
}

export class FetchClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  private async request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
    const { clearSessionOn401 = true, ...fetchOptions } = options;
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : `/${endpoint}`;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    const headers: Record<string, string> = {
      ...(fetchOptions.headers as Record<string, string>),
    };

    if (fetchOptions.body && typeof fetchOptions.body === "string") {
      headers["Content-Type"] = "application/json";
    }

    let response: Response;
    try {
      response = await fetch(url, {
        ...fetchOptions,
        headers,
        credentials: "include",
      });
    } catch {
      throw new FetchError("Сервис недоступен", 0);
    }

    if (response.status === 401) {
      if (clearSessionOn401) {
        await clearServerSession();
      }
      throw new FetchError("Не авторизован", 401);
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
      throw new FetchError(error.message || "Неизвестная ошибка", response.status);
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  get<T>(endpoint: string, options?: Omit<RequestOptions, "method" | "body">) {
    return this.request<T>(endpoint, { ...options, method: "GET" });
  }

  post<T, B = unknown>(endpoint: string, body?: B) {
    return this.request<T>(endpoint, {
      method: "POST",
      body: body ? JSON.stringify(body) : undefined,
    });
  }

  delete<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const fetchClient = new FetchClient(API_URL);

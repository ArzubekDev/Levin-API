import { clearAccessToken, getAccessToken } from "./access-token";

export { clearAccessToken, getAccessToken, setAccessToken } from "./access-token";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "/backend";

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl.replace(/\/$/, ""); // убираем trailing slash
  }

  private getToken(): string | null {
    return getAccessToken();
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const cleanEndpoint = endpoint.startsWith("/") ? endpoint : "/" + endpoint;
    const url = `${this.baseUrl}${cleanEndpoint}`;

    const headers: Record<string, string> = {
      ...(options.headers as Record<string, string>),
    };

    const token = this.getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    // Добавляем Content-Type только если есть body
    if (options.body && typeof options.body === "string") {
      headers["Content-Type"] = "application/json";
    }

    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (response.status === 401) {
      clearAccessToken();
      throw new Error("Unauthorized");
    }

    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: `HTTP ${response.status}` }));
      throw new Error(error.message || "Unknown error");
    }

    if (response.status === 204) {
      return undefined as T;
    }

    return response.json();
  }

  get<T>(endpoint: string) {
    return this.request<T>(endpoint, { method: "GET" });
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

export const api = new ApiClient(API_URL);

// Типы
export interface User {
  id: string;
  email: string;
  name: string | null;
  avatar: string | null;
  plan: string;
  maxProjects: number;
  projectsCount?: number;
}

export interface Project {
  id: string;
  name: string;
  endpointKey: string;
  schemaJson: Record<string, unknown>;
  delay: number;
  errorRate: number;
  createdAt: string;
}

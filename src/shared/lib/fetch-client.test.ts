import { FetchClient } from "./fetch-client";
import { FetchError } from "./fetch-error";

describe("FetchClient", () => {
  let client: FetchClient;

  beforeEach(() => {
    client = new FetchClient("/backend");

    jest.clearAllMocks();

    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("Нормализация URL и параметров запроса", () => {
    it("корректно формирует URL, если baseUrl имеет слэш на конце, а endpoint — в начале", async () => {
      const clientWithTrailingSlash = new FetchClient("/backend/");
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce({ data: "ok" }),
      });

      await clientWithTrailingSlash.get("/history");

      expect(global.fetch).toHaveBeenCalledWith(
        "/backend/history",
        expect.objectContaining({ method: "GET", credentials: "include" }),
      );
    });

    it("корректно добавляет ведущий слэш к endpoint, если он отсутствует", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce({ data: "ok" }),
      });

      await client.get("history");

      expect(global.fetch).toHaveBeenCalledWith("/backend/history", expect.anything());
    });
  });

  describe("Успешные HTTP-запросы (GET, POST, DELETE)", () => {
    it("выполняет GET-запрос и возвращает распарсенный JSON", async () => {
      const mockData = { id: 1, name: "Test Item" };
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce(mockData),
      });

      const response = await client.get<typeof mockData>("/history");

      expect(global.fetch).toHaveBeenCalledWith("/backend/history", {
        method: "GET",
        headers: {},
        credentials: "include",
      });
      expect(response).toEqual(mockData);
    });

    it("выполняет POST-запрос с body и автоматически устанавливает Content-Type: application/json", async () => {
      const payload = { title: "Новая запись" };
      const responseData = { id: 10, ...payload };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 201,
        json: jest.fn().mockResolvedValueOnce(responseData),
      });

      const response = await client.post("/history", payload);

      expect(global.fetch).toHaveBeenCalledWith("/backend/history", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      expect(response).toEqual(responseData);
    });

    it("выполняет DELETE-запрос", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: jest.fn().mockResolvedValueOnce({ success: true }),
      });

      const response = await client.delete<{ success: boolean }>("/history/1");

      expect(global.fetch).toHaveBeenCalledWith("/backend/history/1", {
        method: "DELETE",
        headers: {},
        credentials: "include",
      });
      expect(response).toEqual({ success: true });
    });
  });

  describe("Краевой случай: Статус 204 (No Content)", () => {
    it("возвращает undefined и НЕ пытается парсить JSON при статусе 204", async () => {
      const jsonSpy = jest.fn();
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        status: 204,
        json: jsonSpy,
      });

      const result = await client.delete("/history/123");

      expect(result).toBeUndefined();
      expect(jsonSpy).not.toHaveBeenCalled();
    });
  });

  describe("Краевой случай: Статус 401 (Unauthorized)", () => {
    it("вызывает clearServerSession() и выбрасывает FetchError, если clearSessionOn401 = true (по умолчанию)", async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          status: 401,
          ok: false,
        })
        .mockResolvedValueOnce({
          ok: true,
          status: 200,
        });

      await expect(client.get("/history")).rejects.toThrow(FetchError);

      expect(global.fetch).toHaveBeenNthCalledWith(2, "/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    });

    it("НЕ вызывает clearServerSession(), если clearSessionOn401 = false", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        status: 401,
        ok: false,
      });

      await expect(client.get("/history", { clearSessionOn401: false })).rejects.toMatchObject({
        message: "Не авторизован",
        status: 401,
      });

      expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it("успешно выбрасывает FetchError, даже если вызов clearServerSession завершился ошибкой", async () => {
      (global.fetch as jest.Mock)
        .mockResolvedValueOnce({
          status: 401,
          ok: false,
        })
        .mockRejectedValueOnce(new Error("Logout failed"));

      await expect(client.get("/history")).rejects.toMatchObject({
        message: "Не авторизован",
        status: 401,
      });
    });
  });

  describe("Краевой случай: Ошибки HTTP (4xx, 5xx)", () => {
    it("извлекает поле message из JSON ответа сервера при 400/500", async () => {
      const serverErrorMessage = "Неверные данные запроса";
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: jest.fn().mockResolvedValueOnce({ message: serverErrorMessage }),
      });

      await expect(client.get("/history")).rejects.toMatchObject({
        message: serverErrorMessage,
        status: 400,
      });
    });

    it("использует дефолтное сообщение 'HTTP {status}', если сервер вернул не-JSON ответ (например, HTML 500)", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: jest.fn().mockRejectedValueOnce(new SyntaxError("Unexpected token <")),
      });

      await expect(client.get("/history")).rejects.toMatchObject({
        message: "HTTP 500",
        status: 500,
      });
    });

    it("использует дефолтное сообщение 'Неизвестная ошибка', если JSON ответа пуст", async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 422,
        json: jest.fn().mockResolvedValueOnce({}),
      });

      await expect(client.get("/history")).rejects.toMatchObject({
        message: "Неизвестная ошибка",
        status: 422,
      });
    });
  });

  describe("Краевой случай: Сетевые ошибки (Offline / CORS / Network Failure)", () => {
    it("перехватывает падение fetch() и выбрасывает FetchError('Сервис недоступен', 0)", async () => {
      (global.fetch as jest.Mock).mockRejectedValueOnce(new TypeError("Failed to fetch"));

      await expect(client.get("/history")).rejects.toMatchObject({
        message: "Сервис недоступен",
        status: 0,
      });
    });
  });
});

import { FetchError, isUnauthorizedError } from "./fetch-error";

describe("FetchError", () => {
  it("корректно инициализирует свойства ошибки", () => {
    const error = new FetchError("Не найден", 404);

    expect(error.message).toBe("Не найден");
    expect(error.status).toBe(404);
    expect(error.name).toBe("FetchError");
    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(FetchError);
  });
});

describe("isUnauthorizedError", () => {
  it("возвращает true, если ошибка является FetchError со статусом 401", () => {
    const error = new FetchError("Не авторизован", 401);
    expect(isUnauthorizedError(error)).toBe(true);
  });

  it("возвращает false для FetchError с другими статусами", () => {
    expect(isUnauthorizedError(new FetchError("Запрещено", 403))).toBe(false);
    expect(isUnauthorizedError(new FetchError("Ошибка сервера", 500))).toBe(false);
    expect(isUnauthorizedError(new FetchError("Сеть недоступна", 0))).toBe(false);
  });

  it("возвращает false для значений, не являющихся FetchError", () => {
    expect(isUnauthorizedError(new Error("Обычная ошибка"))).toBe(false);
    expect(isUnauthorizedError({ status: 401, message: "Не авторизован" })).toBe(false);
    expect(isUnauthorizedError("401")).toBe(false);
    expect(isUnauthorizedError(null)).toBe(false);
    expect(isUnauthorizedError(undefined)).toBe(false);
  });
});

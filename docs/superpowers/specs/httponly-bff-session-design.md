# Дизайн HttpOnly BFF-сессии

## Цель

Убрать JWT из JavaScript в браузере (`localStorage`). Сессия живёт в **HttpOnly**-cookie на origin Next.js. Браузер общается только с same-origin BFF; BFF добавляет `Authorization: Bearer` к запросам в Nest API.

## Решения

| Решение | Выбор |
|----------|--------|
| Паттерн | BFF, а не cookie на стороне API |
| Область прокси | Все `/backend/*` через Next Route Handler |
| Значение cookie | Upstream JWT в HttpOnly-cookie (без копии, читаемой клиентом) |
| CSRF | `SameSite=Lax` + проверка `Origin`/`Host` на мутирующих BFF-запросах |
| Изменения бэкенда | Нет — API по-прежнему принимает Bearer JWT |
| Старый флаг `has_session` | Удалён — edge-guard смотрит на наличие настоящей session-cookie |

## Архитектура

```
Browser
  ├─ POST /api/auth/google|github  → BFF обменивает OAuth → Set-Cookie (HttpOnly) → { user }
  ├─ POST /api/auth/logout         → очистить cookie
  └─ /backend/* (credentials)      → BFF читает cookie → Bearer → API_INTERNAL_URL
```

## Cookie

- Имя: `levin_session`
- Флаги: `HttpOnly`, `SameSite=Lax`, `Path=/`, `Secure` в production, `Max-Age=7d`
- Значение: JWT от Nest (ответы логина `{ token, user }`). Токен никогда не возвращается браузеру в JSON.

## Auth-роуты (владеет BFF)

- `POST /api/auth/google` `{ credential }` → upstream `/auth/google` → выставить cookie → `{ user }`
- `POST /api/auth/github` `{ code }` → upstream `/auth/github` → выставить cookie → `{ user }`
- `POST /api/auth/logout` → очистить cookie → `204`

Логин-эндпоинты `/backend/auth/google|github|dev-login` **заблокированы** на catch-all прокси, чтобы наивный проброс не утекал `{ token }` на клиент.

`GET /backend/auth/me` остаётся доступен через прокси (cookie → Bearer).

## API-клиент (браузер)

- Base URL: `/backend` (в браузере только same-origin)
- `credentials: "include"`
- Заголовок `Authorization` из клиентского кода не ставится
- 401 → `POST /api/auth/logout` + считать пользователя разлогиненным

## UX сессии

- `proxy.ts`: наличие `levin_session` для редиректов на уровне страниц (только UX, не авторизация)
- `useSession`: `GET /backend/auth/me` через React Query; токена в query key нет
- Нет гидрационного мигания из-за `null`-снимка из `localStorage`

## CSRF

Для `POST` / `PUT` / `PATCH` / `DELETE` на BFF (`/api/auth/*`, `/backend/*`):

- Требовать, чтобы `Origin` (запасной вариант — `Referer`) совпадал с host запроса
- Иначе отвечать `403`

Безопасные методы (`GET`/`HEAD`) проверку пропускают.

## Конфиг

- `API_INTERNAL_URL` (сервер): по умолчанию `http://localhost:4000`
- Убрать rewrite `/backend → :4000` из `next.config` (его заменяет Route Handler)
- `NEXT_PUBLIC_API_URL` больше не используется как базовый URL API в браузере (опционально — только для отображения)

## Вне скоупа

- Refresh-токены / ротация
- Серверное хранилище сессий / Redis
- Перевод Nest на cookie-auth
- Зашифрованный конверт cookie (JWT уже подписан API)

## Критерии успеха

1. DevTools → Application: session-cookie — HttpOnly; в localStorage нет `accessToken`
2. Network: браузер ходит только на same-origin `/api/auth/*` и `/backend/*`; Bearer из JS не ставится
3. Обновление страницы `/mock-api` оставляет пользователя на странице, если он залогинен
4. Logout очищает cookie; защищённые роуты редиректят на логин
5. Поддельный кросс-сайтовый POST на `/backend/*` падает на проверке Origin

# План внедрения HttpOnly BFF-сессии

> **Для агентов:** реализация следует спецификации `docs/superpowers/specs/httponly-bff-session-design.md`.

**Цель:** браузер не видит JWT; Next BFF владеет HttpOnly-cookie и проксирует `/backend/*`.

## Задачи

1. Серверная сессия + CSRF + хелперы для upstream + тесты
2. Route handlers: `/api/auth/*`, `/backend/[...path]`
3. Миграция клиентских api/session/login; убрать токен из localStorage
4. Убрать rewrite из `next.config`; задокументировать `API_INTERNAL_URL`
5. Проверить тесты и ручные сценарии авторизации

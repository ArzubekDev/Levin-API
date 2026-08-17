import type { ReactNode } from "react";

export type DocsSection = {
  id: string;
  group: string;
  title: string;
  label: string;
  content: ReactNode;
};

export type DocsSidebarGroup = {
  title: string;
  items: { label: string; href: string; id: string }[];
};

function P({ children }: { children: ReactNode }) {
  return <p className="mb-4 leading-relaxed text-slate-400">{children}</p>;
}

function Lead({ children }: { children: ReactNode }) {
  return <p className="mb-6 text-base leading-relaxed text-slate-300">{children}</p>;
}

function Code({ children }: { children: string }) {
  return (
    <pre className="glass mb-6 overflow-x-auto rounded-lg p-4 font-mono text-sm leading-relaxed text-slate-300">
      {children}
    </pre>
  );
}

function Note({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3">
      <p className="mb-1 text-sm font-medium text-blue-300">{title}</p>
      <div className="text-sm leading-relaxed text-slate-400">{children}</div>
    </div>
  );
}

function Warn({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="mb-6 rounded-xl border border-amber-500/20 bg-amber-500/5 px-4 py-3">
      <p className="mb-1 text-sm font-medium text-amber-300">{title}</p>
      <div className="text-sm leading-relaxed text-slate-400">{children}</div>
    </div>
  );
}

function Sub({ children }: { children: ReactNode }) {
  return <h3 className="mt-8 mb-3 text-lg font-semibold text-slate-200">{children}</h3>;
}

function Ul({ items }: { items: ReactNode[] }) {
  return (
    <ul className="mb-6 list-disc space-y-2 pl-5 text-slate-400">
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ul>
  );
}

function Ol({ items }: { items: ReactNode[] }) {
  return (
    <ol className="mb-6 list-decimal space-y-3 pl-5 text-slate-400">
      {items.map((item, i) => (
        <li key={i} className="leading-relaxed">
          {item}
        </li>
      ))}
    </ol>
  );
}

function Table({ headers, rows }: { headers: string[]; rows: ReactNode[][] }) {
  return (
    <div className="mb-6 overflow-x-auto rounded-xl border border-slate-800">
      <table className="w-full min-w-md text-left text-sm">
        <thead className="bg-slate-950/70 text-slate-300">
          <tr>
            {headers.map((h) => (
              <th key={h} className="px-4 py-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800 text-slate-400">
          {rows.map((row, i) => (
            <tr key={i} className="bg-slate-900/40">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-3 align-top leading-relaxed">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export const DOC_SECTIONS: DocsSection[] = [
  {
    id: "overview",
    group: "Начало работы",
    title: "Что такое Levin API",
    label: "Обзор",
    content: (
      <>
        <Lead>
          Levin API — это сервис, который за пару минут даёт вам готовый mock REST API. Вы
          описываете структуру данных в формате JSON Schema, а мы генерируем фейковые ответы,
          которые можно сразу дергать из React, Vue, обычного{" "}
          <code className="text-slate-300">fetch</code> или Postman.
        </Lead>
        <P>
          Сервис рассчитан на начинающих фронтенд-разработчиков и pet-проекты. Когда настоящего
          бэкенда ещё нет (или он «приедет через неделю»), вы всё равно можете собирать UI,
          отрабатывать загрузку, ошибки и отображение списков.
        </P>
        <Sub>Зачем это джуну</Sub>
        <Ul
          items={[
            "Практиковать HTTP-запросы без своего Nest/Express сервера",
            "Проверять, как интерфейс ведёт себя при медленной сети и случайных ошибках",
            "Иметь стабильный URL с предсказуемой формой ответа { data, meta }",
            "Быстро показать демо на собеседовании или в учебном проекте",
          ]}
        />
        <Sub>Как это работает в двух словах</Sub>
        <Ol
          items={[
            "Вы входите через Google или GitHub",
            "Создаёте проект и описываете ресурсы (например, users, products)",
            "Получаете публичный URL вида /api/{endpointKey}/{resource}",
            "Подключаете этот URL в своём фронтенде — авторизация для mock-запросов не нужна",
          ]}
        />
        <Note title="Важно понимать">
          Публичный mock API умеет только <strong className="text-slate-300">GET</strong>. Это
          чтение фейковых данных, а не полноценный CRUD-бэкенд. Для обучения фронтенда этого обычно
          достаточно: списки, карточки, скелетоны, обработка ошибок.
        </Note>
      </>
    ),
  },
  {
    id: "quickstart",
    group: "Начало работы",
    title: "Быстрый старт",
    label: "Быстрый старт",
    content: (
      <>
        <Lead>
          Ниже — полный путь от нуля до первого успешного запроса. Если вы только начинаете, идите
          по шагам сверху вниз и не пропускайте проверку ответа в браузере.
        </Lead>
        <Ol
          items={[
            <>
              Откройте страницу <strong className="text-slate-300">Войти</strong> и авторизуйтесь
              через Google или GitHub. После успеха вы попадёте на дашборд.
            </>,
            <>
              Нажмите <strong className="text-slate-300">New project</strong>. Если кнопка
              недоступна — у вас уже достигнут лимит бесплатного тарифа (по умолчанию 2 проекта).
            </>,
            <>
              Заполните имя проекта, оставьте схему по умолчанию или подправьте её. Ключ верхнего
              уровня — это имя ресурса. В шаблоне уже есть ресурс{" "}
              <code className="text-slate-300">users</code>.
            </>,
            <>
              При желании выставьте <strong className="text-slate-300">Delay</strong> и{" "}
              <strong className="text-slate-300">Error rate</strong>, затем создайте проект.
            </>,
            <>
              Откройте карточку проекта, скопируйте URL endpoint и выполните запрос в браузере,
              Postman или своём коде.
            </>,
          ]}
        />
        <Sub>Пример первого запроса</Sub>
        <P>
          Подставьте свой <code className="text-slate-300">endpointKey</code> (он появляется после
          создания проекта) и имя ресурса из схемы:
        </P>
        <Code>{`GET https://ваш-api/api/a7k9m2px/users?limit=5

GET http://localhost:4000/api/a7k9m2px/users?limit=5`}</Code>
        <P>Успешный ответ выглядит примерно так:</P>
        <Code>{`{
  "data": [
    {
      "id": 515,
      "name": "Katelyn Friesen",
      "email": "katelyn@example.com",
      "age": 31,
      "role": "admin",
      "isActive": true
    }
  ],
  "meta": {
    "resource": "users",
    "count": 5,
    "endpoint": "/a7k9m2px/users",
    "delay": 0
  }
}`}</Code>
        <Note title="Подсказка">
          На странице проекта есть кнопка тестирования — можно быстро проверить, что endpoint живой,
          не открывая Postman.
        </Note>
      </>
    ),
  },
  {
    id: "auth",
    group: "Начало работы",
    title: "Авторизация",
    label: "Авторизация",
    content: (
      <>
        <Lead>
          Чтобы создавать и удалять проекты, нужна учётная запись. Для публичных mock-запросов логин
          не требуется — их может дергать любой клиент по URL.
        </Lead>
        <Sub>Способы входа</Sub>
        <Table
          headers={["Способ", "Что происходит"]}
          rows={[
            [
              "Google",
              "Фронтенд получает Google credential и отправляет его на BFF POST /api/auth/google. BFF ходит в Nest, получает JWT и кладёт его в HttpOnly cookie — в браузерный JS токен не попадает.",
            ],
            [
              "GitHub",
              "Вас редиректит на GitHub OAuth. После согласия GitHub возвращает code на /login/github/callback. Фронтенд отправляет code на BFF POST /api/auth/github; JWT снова остаётся только в HttpOnly cookie.",
            ],
          ]}
        />
        <Sub>Что сохраняется после входа</Sub>
        <Ul
          items={[
            <>
              JWT хранится в HttpOnly cookie <code className="text-slate-300">levin_session</code> на
              домене фронта. JavaScript его не читает.
            </>,
            <>
              Браузер ходит только на same-origin <code className="text-slate-300">/backend/*</code>.
              BFF подставляет{" "}
              <code className="text-slate-300">Authorization: Bearer …</code> к Nest API.
            </>,
            "Срок жизни сессии — 7 дней",
          ]}
        />
        <Sub>Какие страницы доступны без входа</Sub>
        <Ul
          items={[
            "Главная страница /",
            "Документация /docs",
            "Страница входа /login",
            "Любые публичные mock URL /api/{endpointKey}/{resource}",
          ]}
        />
        <P>
          Дашборд, создание проекта и страница проекта требуют авторизации. Если сессии нет —
          произойдёт редирект на логин.
        </P>
        <Sub>Профиль пользователя</Sub>
        <P>
          После входа доступен запрос <code className="text-slate-300">GET /auth/me</code>. В ответе
          есть план, лимит проектов и текущее количество:
        </P>
        <Code>{`{
  "id": "uuid",
  "email": "you@example.com",
  "name": "Имя",
  "avatar": "https://...",
  "plan": "free",
  "maxProjects": 2,
  "projectsCount": 1
}`}</Code>
      </>
    ),
  },
  {
    id: "schema",
    group: "Начало работы",
    title: "JSON Schema: как правильно описать данные",
    label: "JSON Schema",
    content: (
      <>
        <Lead>
          Самая частая ошибка новичков — описать один объект «корнем» схемы. В Levin API верхний
          уровень — это словарь ресурсов. Ключ = имя ресурса в URL.
        </Lead>
        <Sub>Правильная структура</Sub>
        <Code>{`{
  "users": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "name": { "type": "string", "faker": "person.fullName" },
      "email": { "type": "string", "faker": "internet.email" },
      "age": { "type": "integer", "minimum": 18, "maximum": 65 },
      "role": { "type": "string", "enum": ["admin", "user", "guest"] },
      "isActive": { "type": "boolean" }
    }
  },
  "products": {
    "type": "object",
    "properties": {
      "id": { "type": "integer" },
      "title": { "type": "string", "faker": "commerce.productName" },
      "price": { "type": "number", "minimum": 1, "maximum": 999 }
    }
  }
}`}</Code>
        <P>Для схемы выше появятся два endpoint:</P>
        <Ul items={["/api/{endpointKey}/users", "/api/{endpointKey}/products"]} />
        <Warn title="Неправильный формат">
          Если передать схему без ключа ресурса (просто {'{ "type": "object", "properties": ... }'}
          ), mock-движок не найдёт ресурс в URL и вернёт 404.
        </Warn>
        <Sub>Какие типы поддерживаются</Sub>
        <Table
          headers={["type / поле", "Что генерируется"]}
          rows={[
            ["string", "Случайное слово, если нет faker/format/enum"],
            ["string + enum", "Случайное значение из списка"],
            ["string + faker", "Значение из @faker-js/faker, например person.fullName"],
            ["string + format: email | uuid | date | date-time", "Соответствующий формат"],
            ["integer", "Целое число; можно задать minimum / maximum"],
            ["number", "Дробное число с двумя знаками"],
            ["boolean", "true или false"],
          ]}
        />
        <Note title="Ограничения движка">
          Сейчас не поддерживаются вложенные object внутри properties, массивы как тип поля, $ref и
          полноценная валидация JSON Schema через AJV. Держите схему плоской: ресурс → объект →
          простые поля. Этого хватает для большинства учебных задач.
        </Note>
      </>
    ),
  },
  {
    id: "faker",
    group: "Начало работы",
    title: "Faker: реалистичные значения",
    label: "Faker",
    content: (
      <>
        <Lead>
          Чтобы данные выглядели «живыми», используйте поле{" "}
          <code className="text-slate-300">faker</code>. Значение — строка вида{" "}
          <code className="text-slate-300">namespace.method</code> из библиотеки @faker-js/faker.
        </Lead>
        <Sub>Популярные примеры</Sub>
        <Table
          headers={["faker", "Пример результата"]}
          rows={[
            ["person.fullName", "Anna Petrova"],
            ["person.firstName", "Ivan"],
            ["internet.email", "anna@example.com"],
            ["internet.userName", "cool_dev_42"],
            ["phone.number", "+1-555-0123"],
            ["commerce.productName", "Ergonomic Chair"],
            ["commerce.price", "129.00"],
            ["location.city", "Berlin"],
            ["company.name", "Acme Corp"],
            ["lorem.sentence", "Короткое предложение..."],
            ["image.avatar", "URL аватара"],
            ["string.uuid", "uuid-строка (лучше format: uuid)"],
          ]}
        />
        <Sub>Пример поля</Sub>
        <Code>{`{
  "name": {
    "type": "string",
    "faker": "person.fullName"
  },
  "email": {
    "type": "string",
    "faker": "internet.email"
  }
}`}</Code>
        <P>
          Если путь faker указан неверно, генератор вернёт строку-заглушку вида{" "}
          <code className="text-slate-300">unknown:bad.path</code>. Проверяйте названия методов в
          документации Faker.
        </P>
        <Note title="Приоритет генерации">
          Сначала используется faker, затем format, затем type/enum. То есть при наличии faker
          остальные подсказки для этого поля почти не участвуют.
        </Note>
      </>
    ),
  },
  {
    id: "create-project",
    group: "Работа с проектами",
    title: "Создание проекта",
    label: "Создание проекта",
    content: (
      <>
        <Lead>
          Проект — это ваша «мини-база» mock API: имя, схема ресурсов, настройки задержки и
          вероятности ошибки, а также уникальный <code className="text-slate-300">endpointKey</code>
          .
        </Lead>
        <Sub>Где создать</Sub>
        <P>
          Перейдите на <code className="text-slate-300">/projects/new</code> с дашборда (кнопка New
          project). Страница защищена: без логина вас отправит на вход.
        </P>
        <Sub>Поля формы</Sub>
        <Table
          headers={["Поле", "Описание"]}
          rows={[
            ["Project name", "Человекочитаемое имя, например «Интернет-магазин»"],
            [
              "JSON Schema",
              "Объект, где ключи — ресурсы (users, products…). Должен быть валидным JSON",
            ],
            ["Delay", "Задержка ответа в миллисекундах: от 0 до 5000, шаг 100"],
            ["Error rate", "Вероятность симулированной ошибки: от 0% до 50%"],
          ]}
        />
        <Sub>Что происходит на сервере</Sub>
        <Ol
          items={[
            "Проверяется JWT",
            "Проверяется лимит проектов (projectsCount < maxProjects)",
            "Генерируется случайный endpointKey (~8 символов)",
            "Проект сохраняется и становится доступен в списке",
          ]}
        />
        <Sub>API создания (если вызываете сами)</Sub>
        <Code>{`POST /projects
Authorization: Bearer <ваш_jwt>
Content-Type: application/json

{
  "name": "My store",
  "schemaJson": {
    "users": {
      "type": "object",
      "properties": {
        "id": { "type": "integer" },
        "name": { "type": "string", "faker": "person.fullName" }
      }
    }
  },
  "delay": 300,
  "errorRate": 5
}`}</Code>
        <Warn title="Редактирования пока нет">
          Изменить схему, delay или error rate у существующего проекта нельзя. Нужно удалить проект
          и создать новый. Планируйте схему заранее или держите копию JSON у себя в заметках.
        </Warn>
      </>
    ),
  },
  {
    id: "dashboard",
    group: "Работа с проектами",
    title: "Дашборд и управление",
    label: "Дашборд",
    content: (
      <>
        <Lead>
          Дашборд (<code className="text-slate-300">/dashboard</code>) — главная рабочая страница
          после входа. Здесь видно, сколько проектов уже создано, и можно быстро перейти к каждому.
        </Lead>
        <Sub>Что показывает карточка проекта</Sub>
        <Ul
          items={[
            "Название проекта",
            "Путь вида /api/{endpointKey}",
            "Текущие Delay и Error rate",
            "Кнопки: открыть детали и удалить",
          ]}
        />
        <Sub>Счётчик проектов</Sub>
        <P>
          В шапке дашборда отображается{" "}
          <code className="text-slate-300">projectsCount / maxProjects</code>. На бесплатном тарифе
          по умолчанию доступно 2 проекта. Если лимит достигнут, создание нового проекта будет
          отклонено.
        </P>
        <Sub>Удаление</Sub>
        <P>
          Удаление необратимо: вместе с проектом пропадает и публичный endpoint. После удаления
          старые URL начнут отвечать 404. Подтверждения в UI сейчас нет — нажимайте осознанно.
        </P>
        <Sub>Страница проекта</Sub>
        <P>
          По адресу <code className="text-slate-300">/project/[id]</code> можно:
        </P>
        <Ul
          items={[
            "Увидеть endpointKey и параметры",
            "Скопировать URL",
            "Посмотреть ресурсы из schemaJson",
            "Отправить тестовый запрос",
          ]}
        />
      </>
    ),
  },
  {
    id: "mock-endpoint",
    group: "Mock API",
    title: "Публичный mock endpoint",
    label: "Mock endpoint",
    content: (
      <>
        <Lead>
          Это главная ценность сервиса: публичный GET-endpoint, который отдаёт фейковые данные по
          вашей схеме. Авторизация не нужна — удобно подключать прямо из учебного фронтенда.
        </Lead>
        <Sub>Формат URL</Sub>
        <Code>{`GET /api/{endpointKey}/{resource}?limit=20`}</Code>
        <Table
          headers={["Часть", "Смысл"]}
          rows={[
            ["endpointKey", "Уникальный ключ проекта, например a7k9m2px"],
            ["resource", "Имя ресурса = ключ в schemaJson, например users"],
            ["limit", "Сколько объектов вернуть (опционально)"],
          ]}
        />
        <Sub>Форма ответа</Sub>
        <Code>{`{
  "data": [ /* массив объектов по схеме ресурса */ ],
  "meta": {
    "resource": "users",
    "count": 20,
    "endpoint": "/a7k9m2px/users",
    "delay": 300
  }
}`}</Code>
        <Ul
          items={[
            "data — всегда массив",
            "meta.count — фактическое число элементов в data",
            "meta.delay — задержка, настроенная у проекта",
            "meta.endpoint — путь без префикса /api",
          ]}
        />
        <Sub>Типичные ошибки</Sub>
        <Table
          headers={["Ситуация", "Ответ"]}
          rows={[
            ["Неверный endpointKey", '404 — "Mock API not found"'],
            ["Ресурса нет в схеме", '404 — Resource "X" not found in schema'],
            ["Сработала симуляция ошибки", '404 — "Simulated server error"'],
            ["Слишком много запросов", "429 — rate limit (около 100 запросов в минуту)"],
          ]}
        />
        <Note title="Только чтение">
          Нет POST/PUT/PATCH/DELETE для mock-ресурсов. Если в учебном задании нужен «создать
          пользователя», имитируйте это на клиенте (локальный state) или используйте отдельный
          учебный бэкенд.
        </Note>
      </>
    ),
  },
  {
    id: "query-params",
    group: "Mock API",
    title: "Параметры запроса",
    label: "Параметры",
    content: (
      <>
        <Lead>
          Сейчас публичный mock API понимает один полезный query-параметр —{" "}
          <code className="text-slate-300">limit</code>.
        </Lead>
        <Table
          headers={["Параметр", "По умолчанию", "Ограничение", "Описание"]}
          rows={[
            ["limit", "20", "максимум 100", "Сколько фейковых объектов сгенерировать"],
            ["page", "—", "игнорируется", "Пока не реализован — не используйте в проде ожиданиях"],
          ]}
        />
        <Sub>Примеры</Sub>
        <Code>{`GET /api/a7k9m2px/users
# вернёт 20 объектов

GET /api/a7k9m2px/users?limit=5
# вернёт 5 объектов

GET /api/a7k9m2px/users?limit=500
# всё равно вернёт максимум 100`}</Code>
        <P>
          Это удобно для пагинации на клиенте в учебном режиме: вы можете запросить небольшой кусок
          данных и отрисовать таблицу или карточки. Полноценной серверной пагинации с{" "}
          <code className="text-slate-300">page</code>,{" "}
          <code className="text-slate-300">total</code> и{" "}
          <code className="text-slate-300">totalPages</code> пока нет.
        </P>
      </>
    ),
  },
  {
    id: "delay-errors",
    group: "Mock API",
    title: "Delay и Error rate",
    label: "Delay и ошибки",
    content: (
      <>
        <Lead>
          Настоящий бэкенд иногда отвечает медленно или падает. Чтобы UI был готов к этому, Levin
          API умеет симулировать задержку и случайные ошибки.
        </Lead>
        <Sub>Delay</Sub>
        <P>
          Задержка в миллисекундах перед ответом. На форме создания: 0–5000 мс. Если delay = 500,
          каждый mock-запрос будет ждать около половины секунды — удобно тестировать скелетоны и
          спиннеры.
        </P>
        <Sub>Error rate</Sub>
        <P>
          Вероятность ошибки в процентах (на UI — до 50%). Например, errorRate = 10 означает, что
          примерно каждый десятый запрос вернёт ошибку симуляции.
        </P>
        <Code>{`HTTP 404
{
  "statusCode": 404,
  "message": "Simulated server error",
  "error": "Not Found"
}`}</Code>
        <Note title="Как тренироваться">
          Поставьте delay 800–1500 и errorRate 10–20, затем напишите на фронте обработку loading /
          error / success. Это один из лучших способов прокачать работу с асинхронностью.
        </Note>
        <Warn title="Не путайте с реальными 404">
          Одна и та же статус-код 404 используется и для «ресурс не найден», и для симуляции.
          Смотрите текст message, чтобы отличить причины во время отладки.
        </Warn>
      </>
    ),
  },
  {
    id: "examples",
    group: "Примеры кода",
    title: "Примеры: fetch, axios, React Query",
    label: "Примеры кода",
    content: (
      <>
        <Lead>
          Ниже — готовые фрагменты, которые можно почти без изменений вставить в учебный проект.
          Замените базовый URL и endpointKey на свои.
        </Lead>
        <Sub>fetch</Sub>
        <Code>{`async function loadUsers() {
  const res = await fetch(
    "http://localhost:4000/api/a7k9m2px/users?limit=10"
  );

  if (!res.ok) {
    throw new Error(\`Ошибка запроса: \${res.status}\`);
  }

  const json = await res.json();
  return json.data;
}`}</Code>
        <Sub>axios</Sub>
        <Code>{`import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000",
});

export async function getUsers() {
  const { data } = await api.get("/api/a7k9m2px/users", {
    params: { limit: 10 },
  });
  return data.data;
}`}</Code>
        <Sub>TanStack Query (React)</Sub>
        <Code>{`import { useQuery } from "@tanstack/react-query";

function UsersList() {
  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await fetch(
        "http://localhost:4000/api/a7k9m2px/users?limit=10"
      );
      if (!res.ok) throw new Error("Не удалось загрузить users");
      const json = await res.json();
      return json.data;
    },
  });

  if (isLoading) return <p>Загрузка...</p>;
  if (isError) return <p>{(error as Error).message}</p>;

  return (
    <div>
      <button onClick={() => refetch()}>Обновить</button>
      <ul>
        {data.map((user) => (
          <li key={user.id}>{user.name} — {user.email}</li>
        ))}
      </ul>
    </div>
  );
}`}</Code>
        <Note title="Про CORS">
          Бэкенд разрешает запросы с localhost:3000 и production-домена. Если открываете фронт с
          другого origin, браузер может заблокировать запрос — это нормальное поведение CORS.
        </Note>
      </>
    ),
  },
  {
    id: "limits",
    group: "Лимиты и FAQ",
    title: "Лимиты и текущие ограничения",
    label: "Лимиты",
    content: (
      <>
        <Lead>
          Чтобы не ждать от сервиса того, чего пока нет, заранее посмотрите на ограничения
          бесплатного тарифа и mock-движка.
        </Lead>
        <Table
          headers={["Тема", "Сейчас"]}
          rows={[
            ["Бесплатный тариф", "plan = free, maxProjects = 2"],
            ["Методы mock API", "только GET"],
            ["Пагинация", "только limit (default 20, max 100), без page/total"],
            ["Редактирование проекта", "нет (только удалить и создать заново)"],
            ["Вложенные объекты / массивы в схеме", "не поддерживаются"],
            ["Rate limit", "около 100 запросов в минуту с одного IP"],
            ["Статистика запросов", "пока нет"],
          ]}
        />
        <P>
          Планы <code className="text-slate-300">pro</code> и{" "}
          <code className="text-slate-300">enterprise</code> заложены в модель пользователя, но
          автоматического апгрейда в продукте пока нет.
        </P>
      </>
    ),
  },
  {
    id: "faq",
    group: "Лимиты и FAQ",
    title: "Частые вопросы и ошибки",
    label: "FAQ",
    content: (
      <>
        <Sub>Почему 404 Resource not found?</Sub>
        <P>
          Имя ресурса в URL должно совпадать с ключом в schemaJson. Если в схеме есть только{" "}
          <code className="text-slate-300">users</code>, запрос{" "}
          <code className="text-slate-300">/products</code> вернёт 404.
        </P>
        <Sub>Почему ответ всегда разный?</Sub>
        <P>
          Данные генерируются при каждом запросе заново (через faker и random). Это нормально для
          mock API: каждый refresh — новый набор значений.
        </P>
        <Sub>Можно ли использовать mock URL без логина?</Sub>
        <P>
          Да. Создавать проекты нужно авторизованным, а читать публичный endpoint — можно из любого
          клиента.
        </P>
        <Sub>Где взять endpointKey?</Sub>
        <P>
          На дашборде в карточке проекта или на странице проекта. Он также есть в ответе{" "}
          <code className="text-slate-300">GET /projects</code> /{" "}
          <code className="text-slate-300">GET /projects/:id</code>.
        </P>
        <Sub>Локальная разработка</Sub>
        <P>
          Браузер ходит на same-origin <code className="text-slate-300">/backend/...</code>. Next
          BFF читает HttpOnly cookie и проксирует на Nest (
          <code className="text-slate-300">API_INTERNAL_URL</code>, по умолчанию{" "}
          <code className="text-slate-300">http://localhost:4000</code>). Публичные mock URL для
          клиентов — напрямую на Nest, не через BFF.
        </P>
        <Sub>Чеклист перед тем, как писать в поддержку / чат</Sub>
        <Ol
          items={[
            "Схема — словарь ресурсов, а не один голый object",
            "URL содержит правильный endpointKey и resource",
            "limit не обязателен, но если указан — число",
            "Если ловите Simulated server error — временно поставьте errorRate = 0",
            "Для UI нужна активная HttpOnly-сессия после логина",
          ]}
        />
      </>
    ),
  },
];

export function getSidebarGroups(sections: DocsSection[] = DOC_SECTIONS): DocsSidebarGroup[] {
  const groupsMap = new Map<string, DocsSidebarGroup>();

  for (const section of sections) {
    if (!groupsMap.has(section.group)) {
      groupsMap.set(section.group, { title: section.group, items: [] });
    }
    groupsMap.get(section.group)?.items.push({
      label: section.label,
      href: `#${section.id}`,
      id: section.id,
    });
  }

  return Array.from(groupsMap.values());
}

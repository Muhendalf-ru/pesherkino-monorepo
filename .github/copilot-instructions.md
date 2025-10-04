## Коротко — цель

Дать AI-агенту концентрированное понимание архитектуры монорепозитория, распространённых команд и проектных соглашений, чтобы быстро заниматься задачами (фичи, баги, рефакторинг, тесты).

## Большая картина (архитектура)

- Монорепо (Yarn v4 workspaces). Корневой `package.json` управляет скриптами и workspace: `apps/*`, `packages/*`.
- Основные компоненты:
  - apps/backend-api, apps/backend-admin — NestJS backends (REST). Точка входа: `apps/*/src/main.ts`.
  - apps/bot — Telegraf-based bot (src/main.ts).
  - apps/frontend-\* — Vite + React фронтенды.
  - packages/db — общая модель базы (Typegoose / Mongoose). Экспорт: `packages/db/src/index.ts`.
- Интеграция БД: оба бэкенда используют MongooseModule.forRoot(process.env.MONGO_URI) и подключают модели из пакета `db`.

## Где смотреть код для контекста

- Модели/DTO для работы с пользователями: `packages/db/src/user/*` (см. `user.model.ts`, `user.dto.ts`).
- Подключение БД и провайдеры: `apps/*/src/app.module.ts`.
- Swagger и защищённые админ-эндпойнты: `apps/backend-admin/src/setupSwagger.ts` и `apps/backend-admin/src/auth/*`.
- Точка запуска сервисов: `apps/*/src/main.ts` (внимание: все читают `.env` из корня через dotenv.config({ path: '../../.env' })).

## Важные скрипты и рабочие команды

- Менеджер пакетов: yarn@4 (в `package.json` root -> `packageManager`).
- Общие команды (из корня):
  - yarn build:all — собрать всё
  - yarn dev:all — запустить backends и frontends в режиме разработки (concurrently)
  - yarn build:db, yarn build:bot, yarn build:backends, yarn build:frontends — подзадачи
- Примеры per-app:
  - Backend (dev): `yarn workspace backend-api start:dev` (порт через env, e.g. BACKEND_API_PORT)
  - Admin (dev): `yarn workspace backend-admin start:dev`
  - Bot (dev): `yarn workspace bot start:dev`
  - Frontend (dev): `yarn workspace frontend-admin dev` (vite)

## Переменные окружения и конфигурация

- Корневой `.env` ожидается для всех приложений (backends загружают `../../.env` в `main.ts`).
- Ключевые переменные: MONGO_URI, BACKEND_API_PORT, BACKEND_ADMIN_PORT, BOT_PORT и т.д.

## Проектные соглашения и паттерны

- TypeScript сборка: mix of `nest build` и `tsc --build` в разных пакетах. Иногда используются `ts-node` для dev.
- Модели хранятся в `packages/db` и экспортируются через пакет `db` (используется короткий импорт `import { UserModel } from 'db'`).
- NestJS модули подключают модели через `MongooseModule.forFeature([{ name: UserModel.modelName, schema: UserModel.schema }])`.
- Swagger-конфигурация кастомизируется в `apps/backend-admin/src/setupSwagger.ts` (включает кастомный CSS и API key guard).

## Полезные примеры (copy-paste для правок)

- Добавление модели в backend-api:
  - В `apps/backend-api/src/app.module.ts` добавить в imports `MongooseModule.forFeature([{ name: UserModel.modelName, schema: UserModel.schema }])` (уже продемонстрировано).
- Отправная точка для изменений в User-модели: `packages/db/src/user/user.model.ts` — изменять здесь поля/Prop-конфигурации и потом `yarn workspace db build`.

## Тесты, линт и дебаг

- Unit/e2e тесты настроены через Jest в бэкендах (см. `jest` секцию в `apps/*/package.json`). Запуск: `yarn workspace backend-api test` или `yarn workspace backend-admin test:e2e`.
- Линт: `yarn workspace backend-api lint` (eslint). Фронтенды используют vite/eslint.

## Частые задачи и советы для агента

- Если вносишь изменения в модели в `packages/db`, всегда выполнить сборку пакета db и перезапустить сервисы, которые его импортируют: `yarn workspace db build` -> `yarn workspace backend-api start:dev`.
- Проверяй `.env` в корне — сервисы читают его напрямую через относительный путь; отсутствие MONGO_URI — частая причина ошибок при локальном запуске.
- При изменениях API доки для админа обновляются через `setupSwagger.ts` — не удаляй кастомный CSS и guard, если правишь UI док.
- При создании новых endpoints следуй схеме в `apps/backend-admin/src/users` (Controllers -> Module -> Service -> DTOs).

## Примеры файлов, которые часто надо проверять

- `packages/db/src/user/user.model.ts` — модель пользователя (typegoose)
- `apps/backend-api/src/app.module.ts` — регистрация модели и MONGO_URI
- `apps/backend-admin/src/setupSwagger.ts` — swagger + api-key guard
- `apps/*/src/main.ts` — dotenv загрузка и порт

## Что НЕ менять без обсуждения

- Корневые workspace скрипты (`package.json`), конфигурации tsconfig для сборки (tsc --build), и `.env` пути — это повлияет на все пакеты.

Если нужно — внесу правки в этот документ по фидбеку или добавлю примеры команд Powershell для Windows среды.

---

Пожалуйста, проверьте: какие места нужно расширить (например, CI/CD, Docker-compose, или примеры тестов)?

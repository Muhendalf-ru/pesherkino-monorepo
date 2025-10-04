# CI/CD Deploy (GitHub Actions)

Этот каталог содержит workflow `deploy.yml` для автоматической сборки, публикации и деплоя всех сервисов монорепозитория через Docker и Traefik с SSL и поддоменами.

## Необходимые GitHub Secrets

**Для публикации образов в реестр:**

- `REGISTRY_HOST` — адрес реестра (например, `ghcr.io` или `docker.io`)
- `REGISTRY_USER` — логин в реестр
- `REGISTRY_TOKEN` — токен/пароль для реестра
- `REGISTRY_BACKEND_API` — полный тег образа backend-api (например, `ghcr.io/org/backend-api:latest`)
- `REGISTRY_BACKEND_ADMIN` — тег backend-admin
- `REGISTRY_BOT` — тег bot
- `REGISTRY_FRONTEND_ADMIN` — тег frontend-admin
- `REGISTRY_FRONTEND_LANDING` — тег frontend-landing

**Для деплоя на сервер:**

- `DEPLOY_HOST` — IP или домен сервера (SSH)
- `DEPLOY_USER` — SSH-пользователь
- `DEPLOY_SSH_KEY` — приватный SSH-ключ (PEM, без пароля или с ssh-agent)
- `DEPLOY_SSH_PORT` — (опционально) порт SSH (по умолчанию 22)
- `DEPLOY_DIR` — (опционально) путь к директории деплоя на сервере (по умолчанию `~/pesherkino-deploy`)

**Для smoke-теста (и Traefik):**

- `API_HOST` — поддомен backend-api (например, `api.example.com`)
- `ADMIN_API_HOST` — поддомен backend-admin
- `FRONTEND_ADMIN_HOST` — поддомен frontend-admin
- `FRONTEND_LANDING_HOST` — поддомен frontend-landing

**Для Traefik/Let's Encrypt:**

- `LETSENCRYPT_EMAIL` — email для получения SSL-сертификатов

**Для приложений (через .env на сервере):**

- `MONGO_URI`, `ADMIN_API_KEY`, `TELEGRAM_BOT_TOKEN` и другие переменные, необходимые сервисам (см. `.env.example`)

---

## Как работает деплой

1. При пуше в main:
   - Workflow собирает и пушит Docker-образы для всех сервисов.
   - По SSH подключается к серверу, делает git pull, docker compose pull/up.
   - Traefik автоматически проксирует все сервисы на 443 с SSL по поддоменам.
   - После деплоя выполняется smoke-test (curl на каждый поддомен).

## Пример .env (см. `.env.example`)

```
REGISTRY_BACKEND_API=ghcr.io/your-org/backend-api:latest
REGISTRY_BACKEND_ADMIN=ghcr.io/your-org/backend-admin:latest
REGISTRY_BOT=ghcr.io/your-org/bot:latest
REGISTRY_FRONTEND_ADMIN=ghcr.io/your-org/frontend-admin:latest
REGISTRY_FRONTEND_LANDING=ghcr.io/your-org/frontend-landing:latest

API_HOST=api.example.com
ADMIN_API_HOST=admin-api.example.com
FRONTEND_ADMIN_HOST=admin.example.com
FRONTEND_LANDING_HOST=landing.example.com

LETSENCRYPT_EMAIL=admin@example.com
MONGO_URI=mongodb://user:pass@host:27017/dbname
ADMIN_API_KEY=some-secret
TELEGRAM_BOT_TOKEN=123:ABC
```

---

**Важно:**

- Все переменные должны быть заданы в GitHub Secrets и/или .env на сервере.
- DNS всех поддоменов должен указывать на сервер, порты 80/443 открыты.
- Сертификаты Let's Encrypt будут выданы автоматически Traefik.

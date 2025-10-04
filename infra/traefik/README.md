# Полная инструкция деплоя с нуля (VPS → прод)

1. Подготовка VPS
   - Установите Docker и Docker Compose v2:
     - `sudo apt update && sudo apt install -y docker.io`
     - `sudo systemctl enable --now docker`
     - `sudo usermod -aG docker $USER` (перелогиньтесь)
     - `sudo apt install -y docker-compose-plugin`
   - Откройте порты 80 и 443 в firewall (например, `sudo ufw allow 80`, `sudo ufw allow 443`).

2. Инициализация деплой-директории
   - `mkdir ~/pesherkino-deploy`
   - `cd ~/pesherkino-deploy`
   - `git clone <ваш-репозиторий> .`
   - `cp .env.example .env` и заполните все переменные (`MONGO_URI`, `ADMIN_API_KEY` и т.д.).

3. Настройка SSH-доступа для GitHub Actions
   - Сгенерируйте SSH-ключ (если нет): `ssh-keygen -t ed25519 -C "deploy"`
   - Добавьте публичный ключ в `~/.ssh/authorized_keys` на сервере.
   - Приватный ключ добавьте в GitHub Secrets как `DEPLOY_SSH_KEY`.

4. Настройка GitHub Secrets
   - В репозитории на GitHub добавьте все переменные из `.github/workflows/README.md` в Secrets (`DEPLOY_HOST`, `DEPLOY_USER`, `REGISTRY_*`, `API_HOST` и т.д.).

5. Первый запуск вручную (на сервере)
   - `cd ~/pesherkino-deploy`
   - `docker compose -f docker-compose.prod.yml pull`
   - `docker compose -f docker-compose.prod.yml up -d`

6. Проверка Traefik и DNS
   - Убедитесь, что все поддомены (`api.`, `admin.`, `landing.` и т.д.) указывают на IP сервера.
   - Traefik автоматически получит SSL-сертификаты через Let's Encrypt.

7. Автоматизация деплоя
   - Теперь при каждом пуше в main GitHub Actions:
     - Соберёт и запушит образы.
     - По SSH зайдёт на сервер, сделает git pull, docker compose pull/up.
     - Выполнит smoke-test.

8. Обновление переменных
   - Для смены .env — отредактируйте файл на сервере и перезапустите `docker compose up -d`.

---

После первой ручной настройки всё обновляется автоматически по пушу. Traefik и nginx внутри контейнеров полностью управляют проксированием и раздачей статики.

# Traefik для деплоя монорепозитория

- Используется docker-compose.prod.yml, Traefik слушает 80/443 и автоматически получает SSL через Let's Encrypt.
- Все сервисы доступны по своим поддоменам (см. .env.example).
- Сертификаты хранятся в infra/traefik/letsencrypt (volume).

## Быстрый старт

1. Убедитесь, что DNS всех поддоменов указывает на сервер.
2. В .env задать LETSENCRYPT_EMAIL и все \*\_HOST переменные.
3. На сервере:
   ```sh
   mkdir -p infra/traefik/letsencrypt
   chmod 600 infra/traefik/letsencrypt
   ```
4. Traefik автоматически получит сертификаты при первом запуске.

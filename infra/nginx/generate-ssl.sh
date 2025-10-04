#!/bin/bash
set -e

# --- Конфигурация ---
DOMAINS=("admin.pesherkino.ru" "landing.pesherkino.ru" "api.pesherkino.ru" "admin-api.pesherkino.ru")
EMAIL="your-email@example.com"
SSL_DIR="./ssl"
NGINX_SERVICE="nginx"

echo "=== Генерация сертификатов для: ${DOMAINS[*]} ==="

# --- Проверка certbot и установка если нужно ---
if ! command -v certbot &> /dev/null; then
    echo "Certbot не найден. Устанавливаем..."
    if [[ -f /etc/debian_version ]]; then
        sudo apt update
        sudo apt install -y certbot python3-certbot-nginx
    elif [[ -f /etc/redhat-release ]]; then
        sudo yum install -y epel-release
        sudo yum install -y certbot python3-certbot-nginx
    else
        echo "Неизвестная ОС. Установите certbot вручную."
        exit 1
    fi
fi

# --- Создание SSL папки ---
mkdir -p "$SSL_DIR"

# --- Генерация сертификатов ---
for DOMAIN in "${DOMAINS[@]}"; do
    echo "Генерация сертификата для $DOMAIN..."
    DOMAIN_DIR="$SSL_DIR/$DOMAIN"
    mkdir -p "$DOMAIN_DIR"

    # Запрос сертификата через standalone (не требует pre-настроенного nginx)
    sudo certbot certonly \
        --standalone \
        --non-interactive \
        --agree-tos \
        --email "$EMAIL" \
        -d "$DOMAIN" \
        --cert-path "$DOMAIN_DIR/fullchain.pem" \
        --key-path "$DOMAIN_DIR/privkey.pem"

    echo "Сертификат для $DOMAIN сохранен в $DOMAIN_DIR"
done

# --- Перезагрузка Nginx ---
echo "Перезагрузка Nginx..."
sudo systemctl reload $NGINX_SERVICE || echo "Не удалось перезагрузить Nginx. Проверьте конфиг."

# --- Настройка автообновления ---
CRON_JOB="0 */12 * * * root certbot renew --post-hook 'systemctl reload $NGINX_SERVICE'"
if ! sudo grep -q "$CRON_JOB" /etc/cron.d/certbot-renew 2>/dev/null; then
    echo "$CRON_JOB" | sudo tee /etc/cron.d/certbot-renew > /dev/null
    echo "Автообновление сертификатов настроено через cron."
else
    echo "Cron задача для автообновления уже настроена."
fi

echo "=== Готово! ==="

# ЭЛИДОМ — инфраструктура

> Сервера, доступы, порты, ключи. Читать перед SSH/деплоем.

## Локальное окружение
- **OS:** Windows 11
- **Docker Desktop** на хосте (Денис ставит локально)
- **Порты (хост):**
  - `:80` → nginx → Laravel API + Filament admin
  - `:3000` → Nuxt dev (frontend)
  - `:5432` → Postgres (открыт для удобства DBeaver/TablePlus)
- **Контейнеры (внутри сети):**
  - `eldom-php` (php-fpm 8.3) → `:9000`
  - `eldom-nginx` (alpine)
  - `eldom-pg` (postgres:16)
  - `eldom-node` (node:22-alpine) → `:3000`

## Подключение к БД (локально)
- host: `localhost`
- port: `5432`
- user: `elidom`
- password: см. `.env`
- db: `elidom`

## Учётка Filament-админа (локально)
- URL: http://localhost/admin
- email: `denis@elidom.local`
- пароль: `elidom2026`

## Telegram бот для заявок
- [ ] Бот ещё не создан. Будет создан Денисом через @BotFather.
- Хранение токена и chat-id: `backend/.env` (`TELEGRAM_BOT_TOKEN`, `TELEGRAM_CHAT_ID`).

## Прод
- Сервер ещё не выбран. Возможно VPS под Docker (Selectel/Beget/Reg.ru).
- Деплой — через `docker compose pull && up -d` с private registry или git pull + build на сервере.

## Артефакты на компе Дениса
- Шрифт оригинал: `c:\Users\User\Desktop\eldom\ablation.regular.otf`
- Логотипы: `eldom/logo.png`, `eldom/logo-subtitle.png`, `eldom/logo.svg` (тяжёлый, с растром внутри)

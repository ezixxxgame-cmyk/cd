# Сокольников Детейлинг

Одностраничный сайт выездного детейлинга авто в Уфе и пригороде. Проект на Next.js, готов для запуска на Vercel.

## Запуск локально

```bash
npm install
npm run dev
```

Сайт откроется на `http://localhost:3000`.

## Telegram-заявки

Форма отправляет данные на `/api/booking`, а серверная часть пересылает заявку в Telegram через Bot API.

Создайте `.env.local` по примеру `.env.example`:

```bash
TELEGRAM_BOT_TOKEN=
TELEGRAM_CHAT_ID=
NEXT_PUBLIC_SITE_URL=
```

`TELEGRAM_BOT_TOKEN` берется у BotFather. `TELEGRAM_CHAT_ID` — id чата, куда должны приходить заявки.
`NEXT_PUBLIC_SITE_URL` — публичный адрес сайта, например `https://site.ru`. Он нужен для canonical, sitemap и Open Graph.

## Изображения

Основные изображения лежат в `public/images`. Для замены hero или блока до/после кладите файлы туда же и меняйте пути в компонентах.

## Структура

- `app/page.tsx` — главная страница.
- `app/api/booking/route.ts` — серверная отправка заявок в Telegram.
- `components/BookingForm.tsx` — форма записи.
- `components/BeforeAfterSlider.tsx` — сравнение до/после.
- `components/BenefitStrip.tsx` — преимущества.
- `data/services.ts` — услуги и цены.

## Деплой на Vercel

1. Загрузите проект в GitHub.
2. Импортируйте репозиторий в Vercel.
3. Добавьте `TELEGRAM_BOT_TOKEN` и `TELEGRAM_CHAT_ID` в Environment Variables.
4. Добавьте `NEXT_PUBLIC_SITE_URL` с финальным доменом.
5. Запустите деплой.

## Дальнейшее расширение

Позже можно добавить хранение заявок в Supabase, админ-панель и управление заявками через Telegram-бота. Текущая архитектура уже отделяет форму от серверного обработчика, поэтому интеграции можно добавлять без переписывания лендинга.

# Habit Flow — Mini App для Telegram

Трекер привычек в стиле минималистичного приложения. Реализован по макету Figma «Привычки», адаптирован для запуска как Telegram Mini App.

## Возможности

- **Онбординг** — краткое знакомство с приложением
- **Дашборд** — обзор дня, прогресс в виде круговой диаграммы, список привычек на сегодня
- **Привычки** — создание, редактирование, удаление; частота: ежедневно / по дням / по периоду; напоминания
- **Детали привычки** — текущая серия, всего дней, история за 14 дней
- **Инсайты** — мотивационные цитаты и блок «Ваша активность»
- **Настройки** — баннер PRO, профиль, уведомления, язык и т.д.

Данные хранятся в `localStorage` (при открытии в Telegram — в контексте WebView).

## Стек

- React 18, TypeScript
- Vite 6
- Tailwind CSS 4
- Framer Motion, date-fns, Recharts, Lucide React, Sonner

## Запуск

```bash
cd "D:\AI\MiniAPP\Habbit flow"
npm install
npm run dev
```

Откройте в браузере адрес из вывода Vite (обычно `http://localhost:5173`).

## Сборка для продакшена

```bash
npm run build
```

Результат в папке `dist/`. Разместите его на HTTPS-хостинге и укажите URL в настройках бота как Web App.

## Деплой на GitHub Pages

Проект настроен под деплой через **GitHub Actions** (сборка Vite и корректные пути для Pages).

1. **Один раз в репозитории:**  
   **Settings → Pages → Build and deployment → Source:** выбери **«Deploy from a GitHub Actions workflow»**.

2. После каждого пуша в ветку `main` workflow соберёт приложение с `BASE_PATH=/{имя-репо}/` и задеплоит.  
   Сайт будет доступен по адресу:  
   `https://<username>.github.io/<имя-репо>/`

Если оставить Source «Deploy from a branch», нужна готовая папка (например `dist` или `docs`) в репо — GitHub Pages **не собирает** React/Vite сам, поэтому в репо сейчас лежат исходники, а не билд. Workflow выше решает это: сборка выполняется в Actions, деплоится уже готовый `dist`.

## Подключение к Telegram-боту

1. Создайте бота через [@BotFather](https://t.me/BotFather).
2. Разместите собранное приложение на HTTPS (Vercel, Netlify, свой сервер).
3. В BotFather или через API задайте кнопку/меню с типом `web_app` и URL вашего приложения, например:
   - `https://your-domain.com` (корень раздаёте `index.html`).

При открытии Mini App Telegram подгружает `telegram-web-app.js` и передаёт в страницу данные (theme, viewport и т.д.). В коде вызываются `Telegram.WebApp.ready()` и `Telegram.WebApp.expand()` для корректного отображения.

## Структура проекта

```
Habbit flow/
├── index.html
├── package.json
├── vite.config.ts
├── tsconfig.json
├── README.md
└── src/
    ├── main.tsx          # Точка входа + инициализация Telegram Web App
    ├── vite-env.d.ts
    ├── app/
    │   ├── App.tsx        # Состояние, навигация, экраны
    │   ├── types.ts
    │   └── components/
    │       ├── Onboarding.tsx
    │       ├── Dashboard.tsx
    │       ├── HabitCard.tsx
    │       ├── HabitForm.tsx
    │       ├── HabitDetails.tsx
    │       ├── Motivation.tsx
    │       ├── Settings.tsx
    │       └── BottomNav.tsx
    ├── lib/
    │   └── utils.ts
    └── styles/
        ├── index.css
        ├── fonts.css
        ├── tailwind.css
        └── theme.css
```

## Лицензия

MIT. Идея и дизайн — по макету Figma «Привычки».

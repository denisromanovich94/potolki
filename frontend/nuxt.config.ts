// https://nuxt.com/docs/api/configuration/nuxt-config
//
// На деплое GitHub Pages baseURL и preload-href подставляются из ENV (см. workflow).
// Локально baseURL = '/' (Vite dev сервер) — переменные пустые, дефолты сработают.
const BASE = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['~/assets/css/main.css'],

  // Статическая генерация для GitHub Pages
  ssr: true,
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  app: {
    baseURL: BASE,
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'ЭЛИДОМ — Премиальные натяжные потолки в Москве',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1, viewport-fit=cover' },
        { name: 'theme-color', content: '#1F1B19' },
        { name: 'description', content: 'Премиальные тканевые натяжные потолки и архитектурный свет в Москве и ближнем Подмосковье. Прозрачная смета, мобильный шоурум на замере, точные сроки.' },
      ],
      /* Шрифты импортируются через main.css → Vite сам хэширует и добавляет в HTML.
         Preload не указываем вручную, чтобы не ссылаться на устаревшие пути.   */
    },
  },
})

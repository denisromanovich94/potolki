<script setup lang="ts">
import logoUrl from '~/assets/img/logo.png'

const year = new Date().getFullYear()

const columns = [
  {
    title: 'Сайт',
    links: [
      { label: 'О компании',    href: '#about' },
      { label: 'Услуги',        href: '#services' },
      { label: 'Портфолио',     href: '#portfolio' },
      { label: 'Сотрудничество', href: '/partners' },
      { label: 'Блог',          href: '/blog' },
    ],
  },
  {
    title: 'Услуги',
    links: [
      { label: 'Тканевые натяжные потолки', href: '/services#ceilings' },
      { label: 'Архитектурный свет',         href: '/services#lighting' },
      { label: 'Для дизайнеров',             href: '/partners' },
    ],
  },
]

const phone = '+7 916 327 72 60'
const phoneHref = 'tel:+79163277260'
const telegram = 'https://t.me/elidom'
</script>

<template>
  <footer class="ft">
    <div class="wrap">
      <div class="ft__top">
        <div class="ft__brand-col">
          <NuxtLink to="/" class="ft__brand" aria-label="Элидом">
            <img :src="logoUrl" alt="Элидом" width="72" height="40" />
          </NuxtLink>
          <p class="ft__tagline t-sub">
            Премиальные тканевые натяжные потолки и&nbsp;архитектурный свет в&nbsp;Москве.
          </p>
          <div class="ft__contacts">
            <a class="ft__phone" :href="phoneHref">{{ phone }}</a>
            <a class="ft__social" :href="telegram" target="_blank" rel="noopener" aria-label="Telegram">
              <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
                <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
              </svg>
            </a>
          </div>
        </div>

        <div v-for="col in columns" :key="col.title" class="ft__col">
          <h3 class="ft__col-title">{{ col.title }}</h3>
          <ul>
            <li v-for="l in col.links" :key="l.href">
              <NuxtLink :to="l.href">{{ l.label }}</NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <div class="ft__bottom">
        <p>© {{ year }} ЭЛИДОМ. Москва и&nbsp;ближнее Подмосковье.</p>
        <NuxtLink to="/privacy" class="ft__legal">Политика конфиденциальности</NuxtLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.ft {
  background: #14110F;
  border-top: 1px solid var(--line);
  padding-block: 48px 28px;
  color: var(--muted);
}

.ft__top { display: flex; flex-direction: column; gap: 36px; padding-bottom: 36px; border-bottom: 1px solid var(--line); }

.ft__brand-col { display: flex; flex-direction: column; gap: 14px; max-width: 360px; }
.ft__brand img { display: block; }
.ft__tagline { font-size: 13px; line-height: 1.55; max-width: 32ch; }

.ft__contacts { display: flex; align-items: center; gap: 12px; margin-top: 6px; }
.ft__phone { font-family: var(--font-head); font-weight: 600; font-size: 16px; letter-spacing: .04em; color: var(--text); }
.ft__phone:hover { color: var(--accent); }
.ft__social {
  display: inline-flex; align-items: center; justify-content: center;
  width: 38px; height: 38px;
  border: 2px solid var(--muted-dim); border-radius: 50%;
  color: var(--accent);
  transition: border-color .18s;
}
.ft__social:hover { border-color: var(--accent); }

.ft__col { display: flex; flex-direction: column; gap: 12px; }
.ft__col-title { font-size: 11px; letter-spacing: .18em; text-transform: uppercase; color: var(--text); font-weight: 600; }
.ft__col ul { display: flex; flex-direction: column; gap: 8px; }
.ft__col a { font-size: 13px; color: var(--muted); transition: color .18s; }
.ft__col a:hover { color: var(--text); }

.ft__bottom { padding-top: 22px; display: flex; flex-direction: column; gap: 8px; font-size: 12px; }
.ft__legal { color: var(--muted); text-decoration: underline; text-underline-offset: 2px; }
.ft__legal:hover { color: var(--text); }

@media (min-width: 600px) {
  .ft { padding-block: 64px 32px; }
  .ft__top { flex-direction: row; gap: 48px; padding-bottom: 48px; flex-wrap: wrap; }
  .ft__brand-col { flex: 1 1 280px; }
  .ft__col { flex: 0 0 auto; }
  .ft__bottom { flex-direction: row; justify-content: space-between; padding-top: 28px; }
}
@media (min-width: 900px) {
  .ft__top { flex-wrap: nowrap; gap: 80px; }
  .ft__brand-col { flex: 1 1 auto; max-width: 380px; }
}
</style>

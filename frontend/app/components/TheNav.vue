<script setup lang="ts">
import logoUrl from '~/assets/img/logo.png'

const open = ref(false)

const phone = '+7 916 327 72 60'
const phoneHref = 'tel:+79163277260'
const telegram = 'https://t.me/elidom'

const links = [
  { label: 'О компании', href: '#about' },
  { label: 'Услуги', href: '#services' },
  { label: 'Портфолио', href: '#portfolio' },
  { label: 'Сотрудничество', href: '#partners' },
]

function toggle () {
  open.value = !open.value
  document.body.classList.toggle('is-locked', open.value)
}
function close () {
  open.value = false
  document.body.classList.remove('is-locked')
}

onMounted(() => {
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape') close() })
})
onUnmounted(() => { document.body.classList.remove('is-locked') })
</script>

<template>
  <header class="nav" :class="{ 'nav--open': open }">
    <div class="wrap nav__row">
      <NuxtLink class="nav__brand" to="/" aria-label="Элидом" @click="close">
        <img :src="logoUrl" alt="Элидом" width="72" height="40" />
      </NuxtLink>

      <nav class="nav__desktop" aria-label="Основная навигация">
        <ul class="nav__links">
          <li v-for="l in links" :key="l.href">
            <a :href="l.href">{{ l.label }}</a>
          </li>
        </ul>
      </nav>

      <div class="nav__right">
        <a class="nav__phone" :href="phoneHref">{{ phone }}</a>
        <a class="nav__social" :href="telegram" target="_blank" rel="noopener" aria-label="Telegram">
          <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
          </svg>
        </a>
      </div>

      <button
        class="nav__burger"
        type="button"
        :aria-expanded="open"
        aria-controls="nav-overlay"
        :aria-label="open ? 'Закрыть меню' : 'Открыть меню'"
        @click="toggle">
        <span></span><span></span><span></span>
      </button>
    </div>

    <Transition name="overlay">
      <div v-show="open" id="nav-overlay" class="nav__overlay" role="dialog" aria-modal="true" aria-label="Меню">
        <ul class="nav__overlay-links">
          <li v-for="(l, i) in links" :key="l.href">
            <a :href="l.href" @click="close">
              <span class="nav__overlay-i">{{ String(i + 1).padStart(2, '0') }}</span>
              {{ l.label }}
            </a>
          </li>
        </ul>
        <div class="nav__overlay-foot">
          <a class="nav__overlay-phone" :href="phoneHref">{{ phone }}</a>
          <a class="nav__social" :href="telegram" target="_blank" rel="noopener" aria-label="Telegram">
            <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="m22 2-7 20-4-9-9-4 20-7z"/><path d="M22 2 11 13"/>
            </svg>
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.nav {
  position: absolute;
  inset: 0 0 auto 0;
  z-index: 50;
  padding-block: 14px;
}
.nav__row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  position: relative;
  z-index: 41;
}

/* ── Бренд (только знак, без текста) ───────────────────── */
.nav__brand { display: inline-flex; align-items: center; }
.nav__brand img {
  width: 72px;
  height: 40px;
  display: block;
}

/* ── Десктоп-меню (по умолчанию скрыто) ────────────────── */
.nav__desktop { display: none; }
.nav__links {
  display: flex;
  justify-content: center;
  gap: 28px;
}
.nav__links a {
  color: var(--muted);
  font-size: 13px;
  letter-spacing: .14em;
  text-transform: uppercase;
  transition: color .18s ease;
}
.nav__links a:hover { color: var(--text); }

/* ── Контакты справа (десктоп) ─────────────────────────── */
.nav__right { display: none; align-items: center; gap: 12px; }
.nav__phone {
  font-size: 14px;
  font-weight: 600;
  letter-spacing: .03em;
  white-space: nowrap;
  transition: color .18s ease;
}
.nav__phone:hover { color: var(--accent); }
.nav__social {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  color: var(--accent);
  border: 2px solid var(--muted-dim);
  border-radius: 50%;
  transition: border-color .18s ease;
}
.nav__social:hover { border-color: var(--accent); }

/* ── Бургер (мобайл) ───────────────────────────────────── */
.nav__burger {
  position: relative;
  width: 40px;
  height: 40px;
  margin-left: auto;
  border: 2px solid var(--muted-dim);
  border-radius: 50%;
  color: var(--text);
  transition: border-color .18s ease;
}
.nav__burger:hover { border-color: var(--muted); }
.nav__burger span {
  position: absolute;
  left: 10px;
  right: 10px;
  height: 2px;
  background: currentColor;
  border-radius: 2px;
  transition: transform .26s ease, opacity .18s ease, top .26s ease, bottom .26s ease;
}
.nav__burger span:nth-child(1) { top: 12px; }
.nav__burger span:nth-child(2) { top: 50%; transform: translateY(-50%); }
.nav__burger span:nth-child(3) { bottom: 12px; }
.nav--open .nav__burger span:nth-child(1) { top: 50%; transform: translateY(-50%) rotate(45deg); }
.nav--open .nav__burger span:nth-child(2) { opacity: 0; }
.nav--open .nav__burger span:nth-child(3) { bottom: 50%; transform: translateY(50%) rotate(-45deg); }

/* ── Оверлей-меню (мобайл) ─────────────────────────────── */
.nav__overlay {
  position: fixed;
  inset: 0;
  z-index: 40;
  background: rgba(20, 16, 14, .985);
  -webkit-backdrop-filter: blur(18px);
  backdrop-filter: blur(18px);
  display: flex;
  flex-direction: column;
  padding: 86px var(--pad) 28px;
}
.nav__overlay-links {
  display: flex;
  flex-direction: column;
  gap: clamp(14px, 2.4vh, 22px);
}
.nav__overlay-links a {
  display: inline-flex;
  align-items: baseline;
  gap: 14px;
  font-family: var(--font-head);
  font-weight: 600;
  font-size: clamp(26px, 7.2vw, 38px);
  line-height: 1;
  letter-spacing: .03em;
  text-transform: uppercase;
}
.nav__overlay-i {
  font-size: 12px;
  letter-spacing: .2em;
  color: var(--accent);
  transform: translateY(-4px);
}

.nav__overlay-foot {
  margin-top: auto;
  padding-top: clamp(22px, 4vh, 36px);
  border-top: 1px solid var(--line);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
}
.nav__overlay-phone {
  font-family: var(--font-head);
  font-weight: 600;
  font-size: clamp(20px, 5vw, 26px);
  letter-spacing: .04em;
}

/* ── Overlay transition ────────────────────────────────── */
.overlay-enter-active, .overlay-leave-active { transition: opacity .26s ease; }
.overlay-enter-from, .overlay-leave-to { opacity: 0; }

/* ── ≥600px — больше воздуха, крупнее ──────────────────── */
@media (min-width: 600px) {
  .nav { padding-block: 22px; }
}

/* ── ≥900px — десктоп-меню вместо бургера ──────────────── */
@media (min-width: 900px) {
  /* меню абсолютно по центру шапки, brand слева, контакты справа */
  .nav__row { justify-content: flex-start; }
  .nav__desktop {
    display: block;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  .nav__right { display: inline-flex; margin-left: auto; }
  .nav__burger { display: none; }
  .nav__overlay { display: none !important; }
}
</style>

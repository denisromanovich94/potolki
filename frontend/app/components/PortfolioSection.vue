<script setup lang="ts">
// Берём те же данные что и /portfolio — единый источник
const projects = usePortfolio()
</script>

<template>
 <section id="portfolio" class="pf">
 <div class="wrap">
 <header class="pf__head">
 <p class="eyebrow"><span class="pf__num">05</span> Портфолио</p>
 <h2 class="pf__title h-display">Сделано — значит работает</h2>
 <p class="pf__sub t-sub">
 300+ объектов и&nbsp;15&nbsp;000+ м² потолков. Несколько кейсов с&nbsp;разрешения клиентов.
 </p>
 </header>

 <div class="pf__grid">
 <NuxtLink v-for="p in projects" :key="p.slug" :to="`/portfolio/${p.slug}`" class="pf__card">
 <div class="pf__media" aria-hidden="true">
 <span class="pf__media-type">{{ p.type }}</span>
 <span class="pf__media-area">{{ p.area }}</span>
 </div>
 <div class="pf__body">
 <h3 class="pf__name">{{ p.title }}</h3>
 <p class="pf__brief">{{ p.brief }}</p>
 </div>
 </NuxtLink>
 </div>

 <div class="pf__cta">
 <NuxtLink to="/portfolio" class="btn btn--ghost btn--block">
 Все работы
 <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
 <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
 </svg>
 </NuxtLink>
 </div>
 </div>
 </section>
</template>

<style scoped>
.pf { padding-block: 64px; background: var(--surface); border-top: 1px solid var(--line); }
.pf__head { max-width: 80ch; margin-bottom: 32px; }
.pf__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }
.pf__title { font-size: clamp(28px, 7vw, 44px); margin-top: 12px; max-width: 80ch; }
.pf__sub { margin-top: 14px; font-size: 14px; max-width: 52ch; }

.pf__grid { display: grid; gap: 14px; grid-template-columns: 1fr; }

.pf__card {
 display: flex; flex-direction: column;
 background: var(--bg);
 border: 1px solid var(--line);
 border-radius: 12px;
 overflow: hidden;
 transition: border-color .2s ease;
}
.pf__card:hover { border-color: var(--muted-dim); }

.pf__media {
 position: relative;
 aspect-ratio: 4 / 3;
 background:
 radial-gradient(60% 70% at 30% 30%, rgba(249,112,2,.08), transparent 70%),
 linear-gradient(135deg, #2A2522 0%, #1A1714 100%);
 display: flex; justify-content: space-between;
 padding: 14px;
 border-bottom: 1px solid var(--line);
}
.pf__media-type, .pf__media-area {
 font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
 color: var(--muted);
 background: rgba(31,27,25,.7);
 padding: 6px 10px; border-radius: 100px;
 border: 1px solid var(--line);
 align-self: flex-start;
}
.pf__media-area { color: var(--accent); align-self: flex-end; }

.pf__body { padding: 18px; display: flex; flex-direction: column; gap: 8px; }
.pf__name { font-family: var(--font-head); font-weight: 700; font-size: clamp(16px, 4.4vw, 20px); line-height: 1.2; }
.pf__brief { color: var(--muted); font-size: 13px; line-height: 1.5; }

.pf__cta { margin-top: 28px; }

@media (min-width: 600px) {
 .pf { padding-block: 96px; }
 .pf__sub { font-size: 16px; }
 .pf__grid { grid-template-columns: 1fr 1fr; gap: 18px; }
 .pf__body { padding: 22px; }
 .pf__brief { font-size: 14px; }
 .pf__cta { text-align: center; margin-top: 36px; }
 .pf__cta .btn--block { width: auto; max-width: 320px; margin-inline: auto; display: inline-flex; }
}
@media (min-width: 900px) {
 .pf { padding-block: 120px; }
 .pf__grid { grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
 .pf__body { padding: 24px; }
 .pf__cta { margin-top: 48px; }
}
</style>

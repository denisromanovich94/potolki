<script setup lang="ts">
const all = usePortfolio()
const filter = ref<'all' | 'Квартира' | 'Дом' | 'Коммерция'>('all')

const filtered = computed(() => filter.value === 'all' ? all : all.filter(p => p.type === filter.value))

useHead({
 title: 'Портфолио — ЭЛИДОМ',
 meta: [
 { name: 'description', content: '300+ объектов и 15 000+ м² потолков. Квартиры, дома, коммерческие пространства.' },
 ],
})
</script>

<template>
 <main class="pfp">
 <section class="pfp__hero">
 <div class="wrap">
 <NuxtLink to="/" class="pfp__back">
 <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
 <path d="M19 12H5"/><path d="m11 19-7-7 7-7"/>
 </svg>
 На главную
 </NuxtLink>
 <p class="eyebrow">Портфолио</p>
 <h1 class="pfp__title h-display">Работы с&nbsp;разрешения клиентов</h1>
 <p class="pfp__sub t-sub">
 Фотосъёмки от&nbsp;профессиональных фотографов, реальные объекты,
 реальные сметы.
 </p>

 <div class="pfp__filters">
 <button v-for="f in (['all','Квартира','Дом','Коммерция'] as const)" :key="f"
 type="button"
 class="pfp__filter"
 :class="{ 'is-on': filter === f }"
 @click="filter = f">
 {{ f === 'all' ? 'Все' : f }}
 </button>
 </div>
 </div>
 </section>

 <section class="pfp__list">
 <div class="wrap">
 <div class="pfp__grid">
 <NuxtLink v-for="p in filtered" :key="p.slug" :to="`/portfolio/${p.slug}`" class="pfp__card">
 <div class="pfp__media" aria-hidden="true">
 <span class="pfp__media-type">{{ p.type }}</span>
 <span class="pfp__media-area">{{ p.area }}</span>
 </div>
 <div class="pfp__body">
 <h2 class="pfp__name">{{ p.title }}</h2>
 <p class="pfp__loc">{{ p.location }} · {{ p.year }}</p>
 <p class="pfp__brief">{{ p.brief }}</p>
 </div>
 </NuxtLink>
 </div>
 </div>
 </section>

 <FinalCtaSection />
 <TheFooter />
 </main>
</template>

<style scoped>
.pfp__hero { padding-block: 96px 32px; background: var(--bg); border-bottom: 1px solid var(--line); }
.pfp__back {
 display: inline-flex; align-items: center; gap: 8px;
 font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
 color: var(--muted); margin-bottom: 24px;
 transition: color .18s;
}
.pfp__back:hover { color: var(--text); }
.pfp__title { font-size: clamp(32px, 9vw, 64px); margin-top: 14px; max-width: 80ch; }
.pfp__sub { margin-top: 18px; font-size: 14px; max-width: 52ch; }

.pfp__filters { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 32px; }
.pfp__filter {
 padding: 10px 16px;
 background: transparent;
 border: 1px solid var(--line);
 border-radius: 100px;
 color: var(--muted);
 font-size: 12px; letter-spacing: .12em; text-transform: uppercase;
 cursor: pointer;
 transition: border-color .18s, color .18s, background-color .18s;
}
.pfp__filter:hover { border-color: var(--muted-dim); color: var(--text); }
.pfp__filter.is-on { border-color: var(--accent); color: var(--accent); }

.pfp__list { padding-block: 48px; background: var(--bg); }
.pfp__grid { display: grid; gap: 14px; grid-template-columns: 1fr; }

.pfp__card {
 display: flex; flex-direction: column;
 background: var(--surface);
 border: 1px solid var(--line);
 border-radius: 12px;
 overflow: hidden;
 transition: border-color .2s, transform .2s;
}
.pfp__card:hover { border-color: var(--muted-dim); transform: translateY(-2px); }

.pfp__media {
 aspect-ratio: 4 / 3;
 background:
 radial-gradient(60% 70% at 30% 30%, rgba(249,112,2,.08), transparent 70%),
 linear-gradient(135deg, #2A2522 0%, #1A1714 100%);
 display: flex; justify-content: space-between;
 padding: 14px;
 border-bottom: 1px solid var(--line);
}
.pfp__media-type, .pfp__media-area {
 font-size: 11px; letter-spacing: .14em; text-transform: uppercase;
 color: var(--muted);
 background: rgba(31,27,25,.7);
 padding: 6px 10px; border-radius: 100px;
 border: 1px solid var(--line);
 align-self: flex-start;
}
.pfp__media-area { color: var(--accent); align-self: flex-end; }

.pfp__body { padding: 18px; display: flex; flex-direction: column; gap: 6px; }
.pfp__name { font-family: var(--font-head); font-weight: 700; font-size: clamp(18px, 4.8vw, 22px); line-height: 1.2; }
.pfp__loc { font-size: 12px; letter-spacing: .04em; color: var(--muted); }
.pfp__brief { color: var(--muted); font-size: 13px; line-height: 1.5; margin-top: 4px; }

@media (min-width: 600px) {
 .pfp__hero { padding-block: 120px 48px; }
 .pfp__sub { font-size: 16px; }
 .pfp__list { padding-block: 64px; }
 .pfp__grid { grid-template-columns: 1fr 1fr; gap: 18px; }
 .pfp__body { padding: 22px; }
 .pfp__brief { font-size: 14px; }
}
@media (min-width: 900px) {
 .pfp__hero { padding-block: 160px 64px; }
 .pfp__list { padding-block: 96px; }
 .pfp__grid { grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
}
</style>

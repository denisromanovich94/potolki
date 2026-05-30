<script setup lang="ts">
interface Service {
 title: string
 tagline: string
 bullets: string[]
 href: string
}

const services: Service[] = [
 {
 title: 'Тканевые натяжные потолки',
 tagline: 'Без швов, без бликов, без ограничений по форме.',
 bullets: [
 'Полотна JM на теневом профиле EuroSlott',
 'Своды, изломы, многоуровневые геометрии',
 'Мобильный шоурум на замере — выбор полотна вживую',
 'Финальная смета без «потом доплатите»',
 ],
 href: '/services#ceilings',
 },
 {
 title: 'Архитектурный свет',
 tagline: 'Скрытый, интегрированный, точно по сценарию.',
 bullets: [
 'Профили KraabSystems и аналоги под задачу',
 'Световые сценарии — день, вечер, акценты',
 'Совместная работа с дизайнером проекта',
 'Один подрядчик на потолок и свет — одна ответственность',
 ],
 href: '/services#lighting',
 },
]
</script>

<template>
 <section id="services" class="srv">
 <div class="wrap">
 <header class="srv__head">
 <p class="eyebrow"><span class="srv__num">02</span> Услуги</p>
 <h2 class="srv__title h-display">
 Два направления, одна ответственность
 </h2>
 <p class="srv__sub t-sub">
 Потолок и&nbsp;свет&nbsp;— два слоя одного решения. Делаем оба,
 договариваемся с&nbsp;вами один раз.
 </p>
 </header>

 <div class="srv__grid">
 <article v-for="(s, i) in services" :key="s.title" class="srv__card">
 <div class="srv__media" aria-hidden="true">
 <span class="srv__media-i">{{ String(i + 1).padStart(2, '0') }}</span>
 </div>
 <div class="srv__body">
 <h3 class="srv__name">{{ s.title }}</h3>
 <p class="srv__tag">{{ s.tagline }}</p>
 <ul class="srv__list">
 <li v-for="b in s.bullets" :key="b">
 <svg class="srv__bullet" viewBox="0 0 24 24" aria-hidden="true">
 <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
 </svg>
 <span>{{ b }}</span>
 </li>
 </ul>
 <NuxtLink class="srv__more" :to="s.href">
 Подробнее
 <svg class="srv__more-i" viewBox="0 0 24 24" aria-hidden="true">
 <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
 </svg>
 </NuxtLink>
 </div>
 </article>
 </div>
 </div>
 </section>
</template>

<style scoped>
.srv {
 position: relative;
 padding-block: 64px;
 background: var(--bg);
 border-top: 1px solid var(--line);
}
.srv__head { max-width: 80ch; margin-bottom: 32px; }
.srv__num { display: inline-block; margin-right: 10px; color: var(--muted-dim); letter-spacing: .14em; }
.srv__title { font-size: clamp(28px, 7vw, 44px); margin-top: 12px; max-width: 80ch; }
.srv__sub { margin-top: 14px; font-size: 14px; max-width: 48ch; }

.srv__grid { display: grid; gap: 16px; grid-template-columns: 1fr; }

.srv__card {
 display: flex;
 flex-direction: column;
 background: var(--surface);
 border: 1px solid var(--line);
 border-radius: 12px;
 overflow: hidden;
 transition: border-color .2s ease;
}
.srv__card:hover { border-color: var(--muted-dim); }

.srv__media {
 position: relative;
 aspect-ratio: 16 / 9;
 background:
 radial-gradient(60% 80% at 30% 30%, rgba(249,112,2,.12), transparent 70%),
 linear-gradient(135deg, #2A2522 0%, #1F1B19 100%);
 display: grid;
 place-items: center;
 border-bottom: 1px solid var(--line);
}
.srv__media-i {
 font-family: var(--font-head);
 font-weight: 700;
 font-size: clamp(48px, 14vw, 96px);
 line-height: 1;
 color: rgba(255,255,255,.04);
 letter-spacing: .02em;
}

.srv__body { padding: 20px; display: flex; flex-direction: column; gap: 14px; }
.srv__name {
 font-family: var(--font-head);
 font-weight: 700;
 font-size: clamp(20px, 5.5vw, 26px);
 line-height: 1.15;
 letter-spacing: .005em;
}
.srv__tag { color: var(--text); font-size: 14px; line-height: 1.5; }
.srv__list { display: flex; flex-direction: column; gap: 10px; }
.srv__list li {
 display: flex;
 align-items: flex-start;
 gap: 10px;
 color: var(--muted);
 font-size: 13px;
 line-height: 1.5;
}
.srv__bullet {
 width: 14px; height: 14px;
 flex: none;
 margin-top: 4px;
 color: var(--accent);
 stroke-width: 1.8;
 stroke: currentColor;
 fill: none;
 stroke-linecap: round;
 stroke-linejoin: round;
}

.srv__more {
 margin-top: 4px;
 align-self: flex-start;
 display: inline-flex;
 align-items: center;
 gap: 8px;
 font-family: var(--font-body);
 font-weight: 600;
 font-size: 13px;
 letter-spacing: .06em;
 text-transform: uppercase;
 color: var(--accent);
 padding: 10px 0;
 transition: gap .2s ease;
}
.srv__more:hover { gap: 12px; }
.srv__more-i {
 width: 16px; height: 16px;
 stroke: currentColor; stroke-width: 1.8;
 fill: none;
 stroke-linecap: round;
 stroke-linejoin: round;
}

@media (min-width: 600px) {
 .srv { padding-block: 96px; }
 .srv__head { margin-bottom: 48px; }
 .srv__body { padding: 28px; gap: 18px; }
 .srv__sub { font-size: 16px; }
 .srv__tag { font-size: 15px; }
 .srv__list li { font-size: 14px; }
 .srv__grid { gap: 20px; }
}
@media (min-width: 900px) {
 .srv { padding-block: 120px; }
 .srv__grid { grid-template-columns: 1fr 1fr; gap: 24px; }
 .srv__media { aspect-ratio: 4 / 3; }
 .srv__body { padding: 36px; gap: 22px; }
}
@media (min-width: 1280px) {
 .srv__body { padding: 44px; }
}
</style>

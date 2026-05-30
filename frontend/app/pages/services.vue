<script setup lang="ts">
useHead({
 title: 'Услуги — ЭЛИДОМ',
 meta: [
 { name: 'description', content: 'Тканевые натяжные потолки и архитектурный свет премиум-класса. Состав работ, материалы, подход.' },
 ],
})

function onCta (e: MouseEvent) {
 e.preventDefault()
 openBrief()
}

const ceilingPoints = [
 { title: 'Полотна JM', text: 'Премиальная марка тканевых полотен. Без шва, ширина до 5&nbsp;м, безопасность по&nbsp;Б1.' },
 { title: 'Теневой профиль EuroSlott', text: 'Скрытый стык со&nbsp;стеной. Зазор 3-4&nbsp;мм работает как архитектурная тень.' },
 { title: 'Многоуровневые геометрии', text: 'Купола, своды, изломы, ниши. Сложная форма — без потери качества полотна.' },
 { title: 'Скрытые карнизы', text: 'Карниз для штор уходит в&nbsp;теневой зазор. Никакого видимого крепления.' },
 { title: 'Защита поверхностей', text: 'Все чистовые стены и&nbsp;пол укрываются. Уборка после нас не&nbsp;нужна.' },
 { title: 'Гарантия 5 лет', text: 'На&nbsp;полотно и&nbsp;монтаж. По&nbsp;договору, с&nbsp;выездом мастера при необходимости.' },
]

const lightingPoints = [
 { title: 'Магнитные треки KraabSystems', text: 'Премиальная российская сборка. Совместимы с&nbsp;любыми типами светильников трека.' },
 { title: 'Световые сценарии', text: 'Минимум 3 пресета: день, вечер, акценты. Управление со&nbsp;смартфона или сцены.' },
 { title: 'Архитектурная подсветка', text: 'Линейный свет, контражур, ниши. Свет, который вы&nbsp;не&nbsp;видите — только результат.' },
 { title: 'Совместная работа с дизайнером', text: 'Если есть проект — встраиваемся. Если нет — предлагаем готовое решение.' },
 { title: 'Один подрядчик', text: 'Потолок и&nbsp;свет — мы. Одна смета, один договор, одна ответственность.' },
 { title: 'Сервис после сдачи', text: 'Месяц бесплатной поддержки, дальше — по&nbsp;звонку, без&nbsp;абонплаты.' },
]
</script>

<template>
 <main class="svp">
 <section class="svp__hero">
 <div class="wrap">
 <NuxtLink to="/" class="svp__back">
 <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
 <path d="M19 12H5"/><path d="m11 19-7-7 7-7"/>
 </svg>
 На главную
 </NuxtLink>
 <p class="eyebrow">Услуги</p>
 <h1 class="svp__title h-display">
 Потолок и&nbsp;свет&nbsp;— две части одного решения
 </h1>
 <p class="svp__sub t-sub">
 Делаем оба направления сами. Это значит — одна точка ответственности,
 одна смета, одна команда от&nbsp;замера до&nbsp;сдачи.
 </p>
 </div>
 </section>

 <section id="ceilings" class="svp__section">
 <div class="wrap">
 <header class="svp__head">
 <p class="eyebrow"><span class="svp__num">01</span> Тканевые натяжные потолки</p>
 <h2 class="svp__sec-title h-display">
 Без швов, без бликов
 </h2>
 <p class="svp__sec-sub t-sub">
 Бесшовные тканевые полотна, теневые профили, сложная геометрия.
 Премиум начинается с&nbsp;того, что вы&nbsp;не&nbsp;замечаете потолок —
 и&nbsp;замечаете, как изменилась комната.
 </p>
 </header>

 <div class="svp__grid">
 <article v-for="(p, i) in ceilingPoints" :key="p.title" class="svp__item">
 <span class="svp__item-i">{{ String(i + 1).padStart(2, '0') }}</span>
 <h3 class="svp__item-title" v-html="p.title"></h3>
 <p class="svp__item-text" v-html="p.text"></p>
 </article>
 </div>
 </div>
 </section>

 <section id="lighting" class="svp__section svp__section--alt">
 <div class="wrap">
 <header class="svp__head">
 <p class="eyebrow"><span class="svp__num">02</span> Архитектурный свет</p>
 <h2 class="svp__sec-title h-display">
 Скрытый, интегрированный
 </h2>
 <p class="svp__sec-sub t-sub">
 Магнитные треки, линейный свет, контражур, ниши, сценарии.
 Делаем свет, который выглядит как часть архитектуры — а&nbsp;не&nbsp;набор
 светильников.
 </p>
 </header>

 <div class="svp__grid">
 <article v-for="(p, i) in lightingPoints" :key="p.title" class="svp__item">
 <span class="svp__item-i">{{ String(i + 1).padStart(2, '0') }}</span>
 <h3 class="svp__item-title" v-html="p.title"></h3>
 <p class="svp__item-text" v-html="p.text"></p>
 </article>
 </div>
 </div>
 </section>

 <section class="svp__cta">
 <div class="wrap">
 <h2 class="svp__cta-title h-display">Готовы обсудить ваш проект<em>?</em></h2>
 <a href="#brief" class="btn btn--accent btn--block svp__cta-btn" @click="onCta">
 Оставить заявку
 <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">
 <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
 </svg>
 </a>
 </div>
 </section>

 <TheFooter />
 </main>
</template>

<style scoped>
.svp__hero { padding-block: 96px 48px; background: var(--bg); border-bottom: 1px solid var(--line); }
.svp__back {
 display: inline-flex; align-items: center; gap: 8px;
 font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
 color: var(--muted); margin-bottom: 24px;
 transition: color .18s;
}
.svp__back:hover { color: var(--text); }
.svp__title { font-size: clamp(32px, 9vw, 64px); margin-top: 14px; max-width: 80ch; }
.svp__sub { margin-top: 18px; font-size: 14px; max-width: 60ch; }

.svp__section { padding-block: 64px; background: var(--bg); border-top: 1px solid var(--line); }
.svp__section--alt { background: var(--surface); }

.svp__head { max-width: 80ch; margin-bottom: 32px; }
.svp__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }
.svp__sec-title { font-size: clamp(28px, 7vw, 44px); margin-top: 12px; max-width: 80ch; }
.svp__sec-sub { margin-top: 14px; font-size: 14px; max-width: 56ch; }

.svp__grid { display: grid; gap: 12px; grid-template-columns: 1fr; }
.svp__item {
 display: flex; flex-direction: column; gap: 8px;
 padding: 20px;
 background: var(--card);
 border: 1px solid var(--line);
 border-radius: 10px;
}
.svp__section--alt .svp__item { background: var(--bg); }
.svp__item-i { font-family: var(--font-head); font-weight: 700; font-size: 12px; letter-spacing: .14em; color: var(--accent); }
.svp__item-title { font-family: var(--font-head); font-weight: 700; font-size: clamp(16px, 4.4vw, 18px); line-height: 1.2; }
.svp__item-text { color: var(--muted); font-size: 13px; line-height: 1.55; }

.svp__cta { padding-block: 80px; background: var(--bg); border-top: 1px solid var(--line); text-align: center; }
.svp__cta-title { font-size: clamp(26px, 7vw, 44px); margin-bottom: 24px; max-width: 20ch; margin-inline: auto; }
.svp__cta-title em { font-style: normal; color: var(--accent); }
.svp__cta-btn { max-width: 360px; margin-inline: auto; }

@media (min-width: 600px) {
 .svp__hero { padding-block: 120px 64px; }
 .svp__sub { font-size: 16px; }
 .svp__section { padding-block: 96px; }
 .svp__sec-sub { font-size: 16px; }
 .svp__grid { grid-template-columns: 1fr 1fr; gap: 16px; }
 .svp__item { padding: 24px; }
 .svp__item-text { font-size: 14px; }
 .svp__cta { padding-block: 120px; }
 .svp__cta-btn { max-width: 320px; }
}
@media (min-width: 900px) {
 .svp__hero { padding-block: 160px 80px; }
 .svp__section { padding-block: 120px; }
 .svp__grid { grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
}
</style>

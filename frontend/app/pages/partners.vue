<script setup lang="ts">
useHead({
 title: 'Сотрудничество — ЭЛИДОМ',
 meta: [
 { name: 'description', content: 'Партнёрство для дизайнеров и прорабов. Прозрачные условия, быстрые расчёты, белые сделки.' },
 ],
})

function onCta (e: MouseEvent) {
 e.preventDefault()
 openPartners()
}

const benefits = [
 { title: 'Прозрачные условия', text: 'Согласуем процент и&nbsp;форму выплаты до&nbsp;начала проекта. Никаких «потом договоримся».' },
 { title: 'Быстрые расчёты', text: 'Смету по&nbsp;вашему объекту считаем в&nbsp;течение рабочего дня.' },
 { title: 'Белые сделки', text: 'Договор с&nbsp;ИП или ООО, безналичный расчёт, закрывающие документы.' },
 { title: 'Готовая команда', text: 'Замер, расчёт, монтаж, сдача — мы&nbsp;ведём всё сами. Вы&nbsp;только согласуете решения.' },
 { title: 'Зона ответственности', text: 'Берём на&nbsp;себя потолок и&nbsp;свет. Ваша зона — общий ход проекта и&nbsp;дизайн.' },
 { title: 'Сервис после сдачи', text: 'Месяц бесплатной поддержки. Дальше — по&nbsp;звонку, без&nbsp;абонентской платы.' },
]

const steps = [
 { title: 'Заявка', text: 'Оставляете имя и&nbsp;телефон. Связываемся в&nbsp;течение рабочего дня.' },
 { title: 'Знакомство', text: 'Короткий созвон или встреча. Обсуждаем формат сотрудничества.' },
 { title: 'Условия', text: 'Высылаем условия и&nbsp;шаблон договора. Согласовываем процент.' },
 { title: 'Первый проект', text: 'Передаёте объект — мы&nbsp;считаем смету, делаем замер, готовим план работ.' },
 { title: 'Долгосрочно', text: 'После первого проекта переходим на&nbsp;постоянное сотрудничество.' },
]
</script>

<template>
 <main class="prp">
 <section class="prp__hero">
 <div class="wrap">
 <NuxtLink to="/" class="prp__back">
 <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
 <path d="M19 12H5"/><path d="m11 19-7-7 7-7"/>
 </svg>
 На главную
 </NuxtLink>
 <p class="eyebrow">Сотрудничество</p>
 <h1 class="prp__title h-display">
 Дизайнерам и&nbsp;прорабам
 </h1>
 <p class="prp__sub t-sub">
 Берём на&nbsp;себя потолок и&nbsp;свет&nbsp;— вы&nbsp;сдаёте проект
 целиком и&nbsp;вовремя. Один подрядчик на&nbsp;два направления,
 одна точка ответственности.
 </p>
 </div>
 </section>

 <section class="prp__benefits">
 <div class="wrap">
 <header class="prp__head">
 <p class="eyebrow"><span class="prp__num">01</span> Что получаете</p>
 <h2 class="prp__sec-title h-display">
 Условия, а&nbsp;не&nbsp;обещания
 </h2>
 </header>

 <div class="prp__grid">
 <article v-for="(b, i) in benefits" :key="b.title" class="prp__item">
 <span class="prp__item-i">{{ String(i + 1).padStart(2, '0') }}</span>
 <h3 class="prp__item-title" v-html="b.title"></h3>
 <p class="prp__item-text" v-html="b.text"></p>
 </article>
 </div>
 </div>
 </section>

 <section class="prp__how">
 <div class="wrap">
 <header class="prp__head">
 <p class="eyebrow"><span class="prp__num">02</span> Как начинаем</p>
 <h2 class="prp__sec-title h-display">
 От&nbsp;заявки до&nbsp;первого проекта&nbsp;— пять шагов
 </h2>
 </header>

 <ol class="prp__steps">
 <li v-for="(s, i) in steps" :key="s.title" class="prp__step">
 <span class="prp__step-i">{{ String(i + 1).padStart(2, '0') }}</span>
 <div class="prp__step-body">
 <h3 class="prp__step-title" v-html="s.title"></h3>
 <p class="prp__step-text" v-html="s.text"></p>
 </div>
 </li>
 </ol>
 </div>
 </section>

 <section class="prp__cta">
 <div class="wrap">
 <div class="prp__cta-inner">
 <p class="eyebrow">Готовы начать?</p>
 <h2 class="prp__cta-title h-display">
 Условия — после анкеты<em>.</em>
 </h2>
 <p class="prp__cta-sub t-sub">
 Имя и&nbsp;телефон. Свяжемся в&nbsp;течение рабочего дня и&nbsp;вышлем
 условия. Никаких рассылок и&nbsp;звонков «между делом».
 </p>
 <a href="#partners-modal" class="btn btn--accent btn--block prp__cta-btn" @click="onCta">
 Получить условия
 <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">
 <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
 </svg>
 </a>
 </div>
 </div>
 </section>

 <TheFooter />
 </main>
</template>

<style scoped>
.prp__hero { padding-block: 96px 32px; background: var(--bg); border-bottom: 1px solid var(--line); }
.prp__back {
 display: inline-flex; align-items: center; gap: 8px;
 font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
 color: var(--muted); margin-bottom: 24px;
 transition: color .18s;
}
.prp__back:hover { color: var(--text); }
.prp__title { font-size: clamp(32px, 9vw, 64px); margin-top: 14px; max-width: 80ch; }
.prp__sub { margin-top: 18px; font-size: 14px; max-width: 56ch; }

.prp__benefits, .prp__how { padding-block: 64px; background: var(--bg); border-top: 1px solid var(--line); }
.prp__how { background: var(--surface); }

.prp__head { max-width: 80ch; margin-bottom: 32px; }
.prp__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }
.prp__sec-title { font-size: clamp(28px, 7vw, 44px); margin-top: 12px; max-width: 80ch; }

.prp__grid { display: grid; gap: 12px; grid-template-columns: 1fr; }
.prp__item {
 display: flex; flex-direction: column; gap: 8px;
 padding: 20px;
 background: var(--surface);
 border: 1px solid var(--line);
 border-radius: 10px;
}
.prp__how .prp__item { background: var(--bg); }
.prp__item-i { font-family: var(--font-head); font-weight: 700; font-size: 12px; letter-spacing: .14em; color: var(--accent); }
.prp__item-title { font-family: var(--font-head); font-weight: 700; font-size: clamp(16px, 4.4vw, 18px); line-height: 1.2; }
.prp__item-text { color: var(--muted); font-size: 13px; line-height: 1.55; }

.prp__steps { display: flex; flex-direction: column; gap: 0; }
.prp__step { display: grid; grid-template-columns: 40px 1fr; gap: 16px; padding-block: 16px; border-top: 1px solid var(--line); }
.prp__step:last-child { border-bottom: 1px solid var(--line); }
.prp__step-i {
 font-family: var(--font-head); font-weight: 700; font-size: 14px; letter-spacing: .14em; color: var(--accent);
 width: 32px; height: 32px;
 border: 1px solid var(--accent); border-radius: 50%;
 display: grid; place-items: center; flex: none;
}
.prp__step-body { display: flex; flex-direction: column; gap: 6px; padding-top: 4px; }
.prp__step-title { font-family: var(--font-head); font-weight: 700; font-size: clamp(18px, 4.8vw, 22px); line-height: 1.2; }
.prp__step-text { color: var(--muted); font-size: 14px; line-height: 1.55; }

@media (min-width: 600px) {
 .prp__hero { padding-block: 120px 48px; }
 .prp__sub { font-size: 16px; }
 .prp__benefits, .prp__how { padding-block: 96px; }
 .prp__grid { grid-template-columns: 1fr 1fr; gap: 16px; }
 .prp__item { padding: 24px; }
 .prp__item-text { font-size: 14px; }
 .prp__step { grid-template-columns: 56px 1fr; gap: 22px; padding-block: 22px; }
 .prp__step-i { width: 44px; height: 44px; font-size: 16px; }
 .prp__step-title { font-size: 24px; }
 .prp__step-text { font-size: 15px; }
}
@media (min-width: 900px) {
 .prp__hero { padding-block: 160px 64px; }
 .prp__benefits, .prp__how { padding-block: 120px; }
 .prp__grid { grid-template-columns: 1fr 1fr 1fr; gap: 20px; }
}

/* ── CTA в конце страницы ──────────────────────────────── */
.prp__cta {
 position: relative;
 padding-block: 80px;
 background:
 radial-gradient(80% 100% at 50% 0%, rgba(249,112,2,.14) 0%, rgba(249,112,2,0) 60%),
 var(--bg);
 border-top: 1px solid var(--line);
 text-align: center;
 overflow: hidden;
}
.prp__cta::before {
 content: '';
 position: absolute; top: 0; left: 50%;
 transform: translateX(-50%);
 width: min(80%, 600px); height: 2px;
 background: linear-gradient(90deg, transparent, #FFE9D2 20%, #FFFFFF 50%, #FFE9D2 80%, transparent);
 box-shadow: 0 0 18px 4px rgba(255,221,180,.45), 0 0 60px 14px rgba(249,112,2,.20);
}
.prp__cta-inner { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.prp__cta-title { font-size: clamp(28px, 8vw, 52px); max-width: 18ch; text-align: center; }
.prp__cta-title em { font-style: normal; color: var(--accent); }
.prp__cta-sub { font-size: 14px; max-width: 50ch; text-align: center; }
.prp__cta-btn { margin-top: 16px; max-width: 360px; }

@media (min-width: 600px) {
 .prp__cta { padding-block: 120px; }
 .prp__cta-sub { font-size: 16px; }
 .prp__cta-btn { max-width: 320px; }
 .prp__cta-inner { gap: 22px; }
}
@media (min-width: 900px) {
 .prp__cta { padding-block: 160px; }
}
</style>

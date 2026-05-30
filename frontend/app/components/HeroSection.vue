<script setup lang="ts">
function onCta (e: MouseEvent) {
 e.preventDefault()
 openBrief()
}
</script>

<template>
 <section class="hero">
 <div class="wrap hero__body">
 <p class="eyebrow hero__eyebrow">Тканевые&nbsp;натяжные&nbsp;потолки · Москва&nbsp;и&nbsp;область</p>

 <h1 class="hero__title h-display">
 Потолки и&nbsp;свет премиум&#8209;класса<em>.</em>
 </h1>

 <p class="hero__sub t-sub">
 Премиум&nbsp;— не&nbsp;про цену, а&nbsp;про подход. 
 Минимум вашего участия, готовые решения, 
 точная смета с&nbsp;первого звонка.
 </p>

 <div class="hero__cta">
 <a class="btn btn--accent btn--block" href="#brief" @click="onCta">
 Оставить заявку
 <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">
 <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
 </svg>
 </a>
 <a class="btn btn--ghost btn--block" href="#portfolio">Смотреть портфолио</a>
 </div>

 <div class="hero__foot">
 <div class="hero__stats">
 <div class="stat">
 <div class="stat__num">300<span>+</span></div>
 <div class="stat__label">завершённых объектов</div>
 </div>
 <div class="stat">
 <div class="stat__num">15&nbsp;000<span>+</span></div>
 <div class="stat__label">м² потолков</div>
 </div>
 </div>
 </div>
 </div>
 </section>
</template>

<style scoped>
.hero {
 position: relative;
 min-height: 100svh;
 display: flex;
 flex-direction: column;
 justify-content: center;
 overflow: hidden;
 background:
 radial-gradient(120% 80% at 50% -10%, rgba(249,112,2,.18) 0%, rgba(249,112,2,0) 45%),
 radial-gradient(90% 60% at 85% 0%, rgba(199,90,30,.10) 0%, rgba(199,90,30,0) 50%),
 var(--bg);
}
.hero::after {
 content: "";
 position: absolute;
 left: 0; right: 0; bottom: 0;
 height: 1px;
 background: linear-gradient(90deg, transparent, var(--line) 30%, var(--line) 70%, transparent);
}

/* Mobile-first: компактный отступ под навигацией */
.hero__body {
 padding-block: 96px 32px;
}

.hero__eyebrow { margin-bottom: 18px; }

.hero__title {
 font-size: clamp(24px, 8vw, 32px);
 line-height: 1.04;
 max-width: 18ch;
}
.hero__title em { font-style: normal; color: var(--accent); }

.hero__sub {
 font-size: 14px;
 line-height: 1.55;
 margin-top: 18px;
 max-width: 46ch;
}

.hero__cta {
 display: flex;
 flex-direction: column;
 gap: 10px;
 margin-top: 28px;
}

.hero__foot {
 margin-top: 48px;
 padding-top: 28px;
 position: relative;
}
.hero__foot::before {
 content: "";
 position: absolute;
 top: 0; left: 0; right: 0;
 height: 2px;
 border-radius: 4px;
 background: linear-gradient(90deg, transparent, #FFE9D2 20%, #FFFFFF 50%, #FFE9D2 80%, transparent);
 box-shadow:
 0 0 18px 4px rgba(255,221,180,.45),
 0 0 60px 14px rgba(249,112,2,.20),
 0 0 130px 40px rgba(249,112,2,.08);
}

.hero__stats {
 display: flex;
 gap: 24px;
 flex-wrap: wrap;
}

/* ≥460px (большие мобайлы) — чуть больше воздуха */
@media (min-width: 460px) {
 .hero__title { font-size: clamp(32px, 7.5vw, 42px); }
 .hero__sub { font-size: 15px; margin-top: 22px; }
}

/* ≥600px — кнопки в строку, цифры пошире */
@media (min-width: 600px) {
 .hero__body { padding-block: 120px 56px; }
 .hero__title { font-size: 52px; }
 .hero__sub { font-size: 16px; max-width: 52ch; }
 .hero__cta { flex-direction: row; gap: 14px; }
 .hero__cta .btn--block { width: auto; }
 .hero__foot { margin-top: 72px; padding-top: 36px; }
 .hero__stats { gap: 48px; }
}

/* ≥900px — десктоп */
@media (min-width: 900px) {
 .hero { justify-content: flex-end; }
 .hero__body { padding-block: 160px 72px; }
 .hero__title { font-size: 72px; max-width: 20ch; }
 .hero__sub { font-size: 18px; margin-top: 26px; }
}

/* ≥1280px — широкий десктоп */
@media (min-width: 1280px) {
 .hero__title { font-size: 96px; }
 .hero__sub { font-size: 19px; }
 .hero__foot { margin-top: 96px; }
 .hero__stats { gap: 64px; }
}
</style>

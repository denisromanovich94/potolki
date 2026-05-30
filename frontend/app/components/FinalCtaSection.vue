<script setup lang="ts">
function onCta (e: MouseEvent) {
  e.preventDefault()
  openBrief()
}
</script>

<template>
  <section id="cta" class="ctaf">
    <div class="wrap">
      <div class="ctaf__inner">
        <p class="eyebrow">Готовы начать?</p>
        <h2 class="ctaf__title h-display">Рассчитаем ваш проект<em>.</em></h2>
        <p class="ctaf__sub t-sub">
          Три коротких шага в&nbsp;брифе. В&nbsp;ответ&nbsp;— расчёт от&nbsp;инженера
          и&nbsp;удобное время для замера.
        </p>
        <a href="#brief" class="btn btn--accent btn--block ctaf__btn" @click="onCta">
          Оставить заявку
          <svg class="icon icon--sm" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.ctaf {
  position: relative;
  padding-block: 80px;
  background:
    radial-gradient(80% 100% at 50% 0%, rgba(249,112,2,.14) 0%, rgba(249,112,2,0) 60%),
    var(--bg);
  border-top: 1px solid var(--line);
  text-align: center;
  overflow: hidden;
}
.ctaf::before {
  content: '';
  position: absolute; top: 0; left: 50%;
  transform: translateX(-50%);
  width: min(80%, 600px); height: 2px;
  background: linear-gradient(90deg, transparent, #FFE9D2 20%, #FFFFFF 50%, #FFE9D2 80%, transparent);
  box-shadow: 0 0 18px 4px rgba(255,221,180,.45), 0 0 60px 14px rgba(249,112,2,.20);
}

.ctaf__inner { display: flex; flex-direction: column; align-items: center; gap: 18px; }
.ctaf__title { font-size: clamp(28px, 8vw, 56px); max-width: 16ch; text-align: center; }
.ctaf__title em { font-style: normal; color: var(--accent); }
.ctaf__sub { font-size: 14px; max-width: 48ch; text-align: center; }
.ctaf__btn { margin-top: 16px; max-width: 360px; }

@media (min-width: 600px) {
  .ctaf { padding-block: 120px; }
  .ctaf__sub { font-size: 16px; }
  .ctaf__btn { max-width: 320px; }
  .ctaf__inner { gap: 22px; }
}
@media (min-width: 900px) {
  .ctaf { padding-block: 160px; }
}
</style>

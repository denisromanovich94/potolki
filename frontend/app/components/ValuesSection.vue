<script setup lang="ts">
const values = [
  { title: 'Прозрачная смета',  text: 'Цена фиксируется до начала работ. Никаких «потом доплатите».' },
  { title: 'Мобильный шоурум',  text: 'Привозим полотна, профили и свет на замер. Решение принимаете вживую.' },
  { title: 'Чистота на объекте', text: 'Все поверхности укрываются. После нас — только ваша чистовая отделка.' },
  { title: 'Точные сроки',       text: 'Этапы расписаны по дням. Не задерживаемся, не съезжаем.' },
]
</script>

<template>
  <section id="values" class="vls">
    <div class="wrap">
      <header class="vls__head">
        <p class="eyebrow"><span class="vls__num">03</span> Подход</p>
        <h2 class="vls__title h-display">Премиум&nbsp;— это про подход</h2>
      </header>

      <div class="vls__grid">
        <article v-for="(v, i) in values" :key="v.title" class="vls__card">
          <span class="vls__bg-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="vls__name">{{ v.title }}</h3>
          <p class="vls__text">{{ v.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.vls { padding-block: 64px; background: var(--surface); border-top: 1px solid var(--line); }
.vls__head { max-width: 80ch; margin-bottom: 32px; }
.vls__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }
.vls__title { font-size: clamp(28px, 7vw, 44px); margin-top: 12px; max-width: 80ch; }

/* ── Сетка ─────────────────────────────────────────────── */
.vls__grid {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
  margin-top: 28px;
}

/* ── Карточка (единый стиль с WhyUs/Process) ───────────── */
.vls__card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px 22px 22px;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color .2s ease, background-color .2s ease, transform .2s ease;
}
.vls__card:hover {
  border-color: var(--muted-dim);
  background: #251F1C;
  transform: translateY(-2px);
}
/* верхняя оранжевая «вкладка» */
.vls__card::before {
  content: '';
  position: absolute;
  top: 0; left: 22px;
  width: 36px; height: 3px;
  background: var(--accent);
  border-radius: 0 0 2px 2px;
}

/* большая оранжевая цифра-водяной знак */
.vls__bg-num {
  position: absolute;
  bottom: -28px;
  right: -10px;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: clamp(110px, 26vw, 170px);
  line-height: 1;
  color: rgba(249, 112, 2, .12);
  letter-spacing: .02em;
  pointer-events: none;
  user-select: none;
}

.vls__name {
  position: relative; z-index: 1;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: clamp(20px, 5.5vw, 24px);
  line-height: 1.2;
  letter-spacing: .005em;
}
.vls__text {
  position: relative; z-index: 1;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}

/* ── ≥600px — 2 колонки ────────────────────────────────── */
@media (min-width: 600px) {
  .vls { padding-block: 96px; }
  .vls__grid { grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 36px; }
  .vls__card { padding: 30px 26px 26px; gap: 12px; min-height: 200px; }
  .vls__text { font-size: 15px; }
}

/* ── ≥900px — 4 в ряд ──────────────────────────────────── */
@media (min-width: 900px) {
  .vls { padding-block: 120px; }
  .vls__grid { grid-template-columns: repeat(4, 1fr); gap: 20px; margin-top: 48px; }
  .vls__card { padding: 32px 26px 28px; gap: 14px; min-height: 240px; }
  .vls__name { font-size: 22px; }
}

@media (min-width: 1280px) {
  .vls__card { padding: 36px 30px 30px; min-height: 260px; }
  .vls__name { font-size: 24px; }
}
</style>

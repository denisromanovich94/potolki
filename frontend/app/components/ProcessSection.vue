<script setup lang="ts">
const steps = [
  { title: 'Заявка',           text: 'Звоним или пишем в течение часа, согласуем удобное время выезда.' },
  { title: 'Замер с шоурумом', text: 'Приезжаем с полотнами, профилями и светом. Выбираете вживую.' },
  { title: 'Смета',            text: 'Фиксируем цену и состав работ. Утверждаете — переходим к производству.' },
  { title: 'Производство',     text: 'Полотно режется и спаивается под ваше помещение. Точно по замерам.' },
  { title: 'Монтаж',           text: 'Чистый объект, защита поверхностей, монтаж под ключ за 1–3 дня.' },
  { title: 'Сдача',            text: 'Проверяем швы, свет и геометрию вместе с вами. Подписываем акт.' },
]
</script>

<template>
  <section id="process" class="prc">
    <div class="wrap">
      <header class="prc__head">
        <p class="eyebrow"><span class="prc__num">06</span> Процесс</p>
        <h2 class="prc__title h-display">От&nbsp;заявки до&nbsp;сдачи — один подрядчик</h2>
        <p class="prc__sub t-sub">
          Ведём весь цикл сами. Никаких субподрядов, никаких «это к&nbsp;другим».
        </p>
      </header>

      <ol class="prc__grid">
        <li v-for="(s, i) in steps" :key="s.title" class="prc__card">
          <span class="prc__bg-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="prc__name">{{ s.title }}</h3>
          <p class="prc__text">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.prc { padding-block: 64px; background: var(--bg); border-top: 1px solid var(--line); }
.prc__head { max-width: 80ch; margin-bottom: 32px; }
.prc__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }
.prc__title { font-size: clamp(28px, 7vw, 44px); margin-top: 12px; max-width: 80ch; }
.prc__sub { margin-top: 14px; font-size: 14px; max-width: 52ch; }

/* ── Сетка ─────────────────────────────────────────────── */
.prc__grid {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
  margin-top: 28px;
}

/* ── Карточка (единый стиль с WhyUs) ───────────────────── */
.prc__card {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 26px 22px 22px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color .2s ease, background-color .2s ease, transform .2s ease;
}
.prc__card:hover {
  border-color: var(--muted-dim);
  background: #322D2A;
  transform: translateY(-2px);
}
/* верхняя оранжевая «вкладка» */
.prc__card::before {
  content: '';
  position: absolute;
  top: 0; left: 22px;
  width: 36px; height: 3px;
  background: var(--accent);
  border-radius: 0 0 2px 2px;
}

/* большая оранжевая цифра-водяной знак */
.prc__bg-num {
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

.prc__name {
  position: relative; z-index: 1;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: clamp(20px, 5.5vw, 24px);
  line-height: 1.2;
  letter-spacing: .005em;
}
.prc__text {
  position: relative; z-index: 1;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}

/* ── ≥600px — 2 колонки ────────────────────────────────── */
@media (min-width: 600px) {
  .prc { padding-block: 96px; }
  .prc__sub { font-size: 16px; }
  .prc__grid { grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 36px; }
  .prc__card { padding: 30px 26px 26px; gap: 12px; min-height: 200px; }
  .prc__text { font-size: 15px; }
}

/* ── ≥900px — 3 колонки × 2 ряда ────────────────────────── */
@media (min-width: 900px) {
  .prc { padding-block: 120px; }
  .prc__grid { grid-template-columns: repeat(3, 1fr); gap: 20px; margin-top: 48px; }
  .prc__card { padding: 36px 32px 32px; gap: 14px; min-height: 220px; }
  .prc__name { font-size: 26px; }
}

@media (min-width: 1280px) {
  .prc__card { padding: 40px 36px 36px; min-height: 240px; }
}
</style>

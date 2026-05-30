<script setup lang="ts">
const steps = [
  { title: 'Замер геометрии',           text: 'Точная съёмка помещения. Учитываем балки, ниши, перепады.' },
  { title: 'Расчёт нагрузок',           text: 'Подбираем профиль и крепления под массу полотна и сценарий освещения.' },
  { title: 'Подбор материалов',         text: 'Полотно, профиль, лента, диффузоры — каждый элемент под задачу.' },
  { title: 'Светотехнический расчёт',   text: 'Уровни освещённости, температура, направление. До монтажа, не после.' },
  { title: 'Согласование с дизайнером', text: 'Если у вас дизайн-проект — встраиваемся в него. Если нет — предложим решение.' },
]
</script>

<template>
  <section id="why" class="why">
    <div class="wrap">
      <header class="why__head">
        <p class="eyebrow"><span class="why__num">04</span> Почему мы</p>
        <h2 class="why__title h-display">Всё, что должно быть решено до&nbsp;монтажа</h2>
        <p class="why__sub t-sub">
          Премиум не&nbsp;в&nbsp;натяжке плёнки&nbsp;— а&nbsp;в&nbsp;том, что произойдёт
          за&nbsp;два-три дня до&nbsp;того, как мы&nbsp;приедем.
        </p>
      </header>

      <ol class="why__grid">
        <li v-for="(s, i) in steps" :key="s.title" class="why__card">
          <span class="why__bg-num" aria-hidden="true">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="why__name">{{ s.title }}</h3>
          <p class="why__text">{{ s.text }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>

<style scoped>
.why { padding-block: 64px; background: var(--bg); border-top: 1px solid var(--line); }
.why__head { max-width: 80ch; margin-bottom: 32px; }
.why__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }
.why__title { font-size: clamp(28px, 7vw, 44px); margin-top: 12px; max-width: 80ch; }
.why__sub { margin-top: 14px; font-size: 14px; max-width: 52ch; }

/* ── Сетка ─────────────────────────────────────────────── */
.why__grid {
  display: grid;
  gap: 14px;
  grid-template-columns: 1fr;
  margin-top: 28px;
}

/* ── Карточка ──────────────────────────────────────────── */
.why__card {
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
.why__card:hover {
  border-color: var(--muted-dim);
  background: #322D2A;
  transform: translateY(-2px);
}
/* верхняя оранжевая «вкладка» */
.why__card::before {
  content: '';
  position: absolute;
  top: 0; left: 22px;
  width: 36px; height: 3px;
  background: var(--accent);
  border-radius: 0 0 2px 2px;
}

/* большая оранжевая цифра-водяной знак */
.why__bg-num {
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

.why__name {
  position: relative; z-index: 1;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: clamp(20px, 5.5vw, 24px);
  line-height: 1.2;
  letter-spacing: .005em;
}
.why__text {
  position: relative; z-index: 1;
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
}

/* ── ≥600px — 2 колонки, последняя на всю ширину ───────── */
@media (min-width: 600px) {
  .why { padding-block: 96px; }
  .why__sub { font-size: 16px; }
  .why__grid { grid-template-columns: 1fr 1fr; gap: 16px; margin-top: 36px; }
  .why__card { padding: 30px 26px 26px; gap: 12px; }
  .why__card:nth-child(5) { grid-column: span 2; }
  .why__text { font-size: 15px; }
}

/* ── ≥900px — 6-фракционная сетка ──────────────────────── */
@media (min-width: 900px) {
  .why { padding-block: 120px; }
  .why__grid {
    grid-template-columns: repeat(6, 1fr);
    gap: 20px;
    margin-top: 48px;
  }
  .why__card { padding: 36px 32px 32px; gap: 14px; min-height: 220px; grid-column: span 2; }
  .why__card:nth-child(4) { grid-column: span 3; }
  .why__card:nth-child(5) { grid-column: span 3; }
  .why__name { font-size: 26px; }
}

@media (min-width: 1280px) {
  .why__card { padding: 40px 36px 36px; min-height: 240px; }
}
</style>

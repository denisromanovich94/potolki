<script setup lang="ts">
const founder = {
  name: 'Имя Фамилия',
  role: 'Основатель ЭЛИДОМ',
  quote: 'Премиум — это не про цену. Это про то, чтобы заказчик ни разу не услышал слово «проблема» от первого звонка до подписи акта.',
}
</script>

<template>
  <section id="founder" class="fq">
    <div class="wrap">
      <article class="fq__inner">
        <div class="fq__media" aria-hidden="true">
          <span class="fq__media-i">ЭД</span>
        </div>
        <div class="fq__body">
          <p class="eyebrow"><span class="fq__num">07</span> Слово основателя</p>
          <blockquote class="fq__quote">
            <svg class="fq__mark" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 7h4v6c0 2-2 4-4 4M14 7h4v6c0 2-2 4-4 4"/>
            </svg>
            «{{ founder.quote }}»
          </blockquote>
          <div class="fq__author">
            <span class="fq__name">{{ founder.name }}</span>
            <span class="fq__role">{{ founder.role }}</span>
          </div>
        </div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.fq { padding-block: 64px; background: var(--surface); border-top: 1px solid var(--line); }
.fq__inner { display: flex; flex-direction: column; gap: 24px; }

.fq__media {
  aspect-ratio: 4 / 5;
  background:
    radial-gradient(60% 70% at 30% 30%, rgba(249,112,2,.10), transparent 70%),
    linear-gradient(135deg, #2A2522 0%, #181513 100%);
  border: 1px solid var(--line);
  border-radius: 12px;
  display: grid; place-items: center;
  max-width: 420px; width: 100%;
}
.fq__media-i {
  font-family: var(--font-head); font-weight: 700;
  font-size: clamp(64px, 18vw, 140px);
  color: rgba(255,255,255,.06); letter-spacing: .02em;
}

.fq__body { display: flex; flex-direction: column; gap: 18px; }
.fq__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }

.fq__quote {
  position: relative;
  font-family: var(--font-head); font-weight: 600;
  font-size: clamp(20px, 5.6vw, 30px);
  line-height: 1.3; letter-spacing: .005em;
  color: var(--text);
  padding-top: 32px;
}
.fq__mark {
  position: absolute; top: 0; left: 0;
  width: 26px; height: 26px;
  color: var(--accent);
  stroke: currentColor; stroke-width: 1.6;
  fill: none; stroke-linecap: round; stroke-linejoin: round;
}

.fq__author { display: flex; flex-direction: column; gap: 4px; }
.fq__name { font-family: var(--font-head); font-weight: 700; font-size: 15px; letter-spacing: .04em; text-transform: uppercase; }
.fq__role { color: var(--muted); font-size: 13px; }

@media (min-width: 600px) {
  .fq { padding-block: 96px; }
  .fq__inner { gap: 36px; }
  .fq__role { font-size: 14px; }
}
@media (min-width: 900px) {
  .fq { padding-block: 120px; }
  .fq__inner { flex-direction: row; align-items: center; gap: 64px; }
  .fq__media { flex: 0 0 40%; max-width: 480px; aspect-ratio: 3 / 4; }
  .fq__body { flex: 1; }
}
</style>

<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const project = useProject(slug)

if (!project) {
  throw createError({ statusCode: 404, statusMessage: 'Проект не найден', fatal: true })
}

useHead({
  title: `${project!.title} — Портфолио ЭЛИДОМ`,
  meta: [{ name: 'description', content: project!.brief }],
})

function onCta (e: MouseEvent) {
  e.preventDefault()
  openBrief()
}

const all = usePortfolio()
const others = computed(() => all.filter(p => p.slug !== slug).slice(0, 3))
</script>

<template>
  <main v-if="project" class="prj">
    <article>
      <header class="prj__head">
        <div class="wrap">
          <NuxtLink to="/portfolio" class="prj__back">
            <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
              <path d="M19 12H5"/><path d="m11 19-7-7 7-7"/>
            </svg>
            Все работы
          </NuxtLink>

          <div class="prj__meta">
            <span class="prj__tag">{{ project.type }}</span>
            <span>{{ project.area }}</span>
            <span>{{ project.year }}</span>
          </div>

          <h1 class="prj__title h-display">{{ project.title }}</h1>
          <p class="prj__loc">{{ project.location }}</p>
          <p class="prj__brief">{{ project.brief }}</p>
        </div>
      </header>

      <div class="prj__cover" aria-hidden="true">
        <div class="wrap">
          <div class="prj__cover-box">
            <span class="prj__cover-i">{{ project.type[0] }}</span>
          </div>
        </div>
      </div>

      <div class="prj__body">
        <div class="wrap">
          <section class="prj__about">
            <h2 class="prj__h2 h-display">О&nbsp;проекте</h2>
            <p class="prj__about-text" v-html="project.description"></p>
          </section>

          <section class="prj__specs">
            <div class="prj__spec">
              <p class="eyebrow"><span class="prj__num">01</span> Потолок</p>
              <p class="prj__spec-cost">Стоимость потолка: <strong>{{ project.ceiling.cost }}</strong></p>
              <ul>
                <li v-for="w in project.ceiling.works" :key="w">{{ w }}</li>
              </ul>
            </div>
            <div class="prj__spec">
              <p class="eyebrow"><span class="prj__num">02</span> Свет</p>
              <p class="prj__spec-cost">Стоимость освещения: <strong>{{ project.lighting.cost }}</strong></p>
              <ul>
                <li v-for="w in project.lighting.works" :key="w">{{ w }}</li>
              </ul>
            </div>
          </section>

          <aside class="prj__cta">
            <h2 class="prj__cta-title h-display">
              Хотите похожее у&nbsp;себя<em>?</em>
            </h2>
            <p class="t-sub">
              Расскажите о&nbsp;вашем объекте — пришлём расчёт от&nbsp;инженера
              и&nbsp;удобное время для замера.
            </p>
            <a href="#brief" class="btn btn--accent" @click="onCta">
              Оставить заявку
              <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
                <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
              </svg>
            </a>
          </aside>
        </div>
      </div>
    </article>

    <section v-if="others.length" class="prj__other">
      <div class="wrap">
        <h2 class="prj__h2 h-display">Другие работы</h2>
        <div class="prj__other-grid">
          <NuxtLink v-for="p in others" :key="p.slug" :to="`/portfolio/${p.slug}`" class="prj__other-card">
            <div class="prj__other-media" aria-hidden="true">
              <span class="prj__other-type">{{ p.type }}</span>
              <span class="prj__other-area">{{ p.area }}</span>
            </div>
            <div class="prj__other-body">
              <h3 class="prj__other-name">{{ p.title }}</h3>
              <p class="prj__other-brief">{{ p.brief }}</p>
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>

    <TheFooter />
  </main>
</template>

<style scoped>
.prj__head { padding-block: 96px 32px; background: var(--bg); border-bottom: 1px solid var(--line); }
.prj__back {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 24px;
  transition: color .18s;
}
.prj__back:hover { color: var(--text); }

.prj__meta {
  display: flex; flex-wrap: wrap; align-items: center; gap: 14px;
  font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 16px;
}
.prj__tag { color: var(--accent); }
.prj__title { font-size: clamp(28px, 7.5vw, 56px); max-width: 22ch; }
.prj__loc { margin-top: 12px; font-size: 13px; letter-spacing: .04em; color: var(--muted); }
.prj__brief { margin-top: 18px; font-size: 15px; max-width: 56ch; color: var(--text); }

.prj__cover { background: var(--bg); padding-block: 24px; }
.prj__cover-box {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(60% 70% at 30% 30%, rgba(249,112,2,.10), transparent 70%),
    linear-gradient(135deg, #2A2522 0%, #181513 100%);
  border: 1px solid var(--line);
  border-radius: 12px;
  display: grid; place-items: center;
}
.prj__cover-i {
  font-family: var(--font-head); font-weight: 700;
  font-size: clamp(64px, 18vw, 140px);
  color: rgba(255,255,255,.06); letter-spacing: .02em;
}

.prj__body { padding-block: 32px 64px; background: var(--bg); }

.prj__h2 { font-size: clamp(24px, 6vw, 36px); }

.prj__about { padding-bottom: 36px; }
.prj__about-text { margin-top: 18px; font-size: 16px; line-height: 1.7; color: var(--text); }

.prj__specs {
  display: grid; gap: 16px; grid-template-columns: 1fr;
  padding-block: 24px;
  border-top: 1px solid var(--line); border-bottom: 1px solid var(--line);
}
.prj__spec { display: flex; flex-direction: column; gap: 12px; padding: 20px; background: var(--surface); border: 1px solid var(--line); border-radius: 10px; }
.prj__num { color: var(--muted-dim); letter-spacing: .14em; margin-right: 10px; }
.prj__spec-cost { color: var(--muted); font-size: 13px; }
.prj__spec-cost strong { color: var(--text); font-weight: 600; }
.prj__spec ul { display: flex; flex-direction: column; gap: 8px; }
.prj__spec li {
  position: relative; padding-left: 22px;
  color: var(--muted); font-size: 13px; line-height: 1.55;
}
.prj__spec li::before {
  content: ''; position: absolute; left: 0; top: 9px;
  width: 12px; height: 1.5px; background: var(--accent);
}

.prj__cta {
  margin-top: 36px;
  padding: 24px;
  border: 1px solid var(--line); border-radius: 12px;
  background: var(--surface);
  display: flex; flex-direction: column; gap: 14px;
}
.prj__cta-title { font-size: clamp(22px, 5vw, 30px); max-width: 18ch; }
.prj__cta-title em { font-style: normal; color: var(--accent); }
.prj__cta .btn { align-self: flex-start; }

.prj__other { padding-block: 64px; background: var(--surface); border-top: 1px solid var(--line); }
.prj__other-grid { display: grid; gap: 14px; grid-template-columns: 1fr; margin-top: 24px; }

.prj__other-card {
  display: flex; flex-direction: column;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 12px;
  overflow: hidden;
  transition: border-color .2s;
}
.prj__other-card:hover { border-color: var(--muted-dim); }
.prj__other-media {
  aspect-ratio: 4 / 3;
  background:
    radial-gradient(60% 70% at 30% 30%, rgba(249,112,2,.08), transparent 70%),
    linear-gradient(135deg, #2A2522 0%, #1A1714 100%);
  display: flex; justify-content: space-between;
  padding: 12px;
  border-bottom: 1px solid var(--line);
}
.prj__other-type, .prj__other-area {
  font-size: 10px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--muted);
  background: rgba(31,27,25,.7);
  padding: 5px 8px; border-radius: 100px;
  border: 1px solid var(--line);
  align-self: flex-start;
}
.prj__other-area { color: var(--accent); align-self: flex-end; }
.prj__other-body { padding: 16px; display: flex; flex-direction: column; gap: 6px; }
.prj__other-name { font-family: var(--font-head); font-weight: 700; font-size: clamp(16px, 4.4vw, 18px); line-height: 1.2; }
.prj__other-brief { color: var(--muted); font-size: 12px; line-height: 1.5; }

@media (min-width: 600px) {
  .prj__head { padding-block: 120px 48px; }
  .prj__body { padding-block: 48px 96px; }
  .prj__specs { grid-template-columns: 1fr 1fr; gap: 20px; padding-block: 36px; }
  .prj__spec { padding: 24px; }
  .prj__cta { padding: 32px; }
  .prj__other { padding-block: 96px; }
  .prj__other-grid { grid-template-columns: 1fr 1fr; gap: 18px; }
}
@media (min-width: 900px) {
  .prj__head { padding-block: 160px 64px; }
  .prj__cover { padding-block: 32px; }
  .prj__other-grid { grid-template-columns: 1fr 1fr 1fr; gap: 24px; }
}
</style>

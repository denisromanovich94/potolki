<script setup lang="ts">
const route = useRoute()
const slug = route.params.slug as string
const post = useBlogPost(slug)

if (!post) {
  throw createError({ statusCode: 404, statusMessage: 'Статья не найдена', fatal: true })
}

useHead({
  title: `${post!.title} — Блог ЭЛИДОМ`,
  meta: [{ name: 'description', content: post!.excerpt }],
})

const allPosts = useBlogPosts()
const otherPosts = computed(() => allPosts.filter(p => p.slug !== slug).slice(0, 2))
</script>

<template>
  <main v-if="post" class="article">
    <article>
      <header class="article__head">
        <div class="wrap">
          <NuxtLink to="/blog" class="article__back">
            <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
              <path d="M19 12H5"/><path d="m11 19-7-7 7-7"/>
            </svg>
            Все статьи
          </NuxtLink>

          <div class="article__meta">
            <span class="article__tag">{{ post.tag }}</span>
            <span>{{ formatBlogDate(post.date) }}</span>
            <span>{{ post.readMin }} мин чтения</span>
          </div>

          <h1 class="article__title h-display">{{ post.title }}</h1>
          <p class="article__excerpt t-sub">{{ post.excerpt }}</p>
        </div>
      </header>

      <div class="article__cover" aria-hidden="true">
        <div class="wrap">
          <div class="article__cover-box">
            <span class="article__cover-i">ЭД</span>
          </div>
        </div>
      </div>

      <div class="article__body">
        <div class="wrap">
          <div class="article__content" v-html="post.content"></div>

          <aside class="article__signature">
            <p class="article__signature-text">
              Материал подготовлен инженерами ЭЛИДОМ. Если у&nbsp;вас есть вопрос
              по&nbsp;вашему проекту — напишите нам, инженер ответит лично.
            </p>
            <a href="#brief" class="btn btn--accent" @click.prevent="openBrief">
              Задать вопрос инженеру
              <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
                <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
              </svg>
            </a>
          </aside>
        </div>
      </div>
    </article>

    <section v-if="otherPosts.length" class="article__other">
      <div class="wrap">
        <h2 class="article__other-title h-display">Ещё по&nbsp;теме</h2>
        <ul>
          <li v-for="p in otherPosts" :key="p.slug">
            <NuxtLink :to="`/blog/${p.slug}`" class="post-mini">
              <span class="post-mini__tag">{{ p.tag }}</span>
              <h3 class="post-mini__title">{{ p.title }}</h3>
              <p class="post-mini__excerpt">{{ p.excerpt }}</p>
            </NuxtLink>
          </li>
        </ul>
      </div>
    </section>

    <TheFooter />
  </main>
</template>

<style scoped>
.article__head { padding-block: 96px 32px; background: var(--bg); border-bottom: 1px solid var(--line); }
.article__back {
  display: inline-flex; align-items: center; gap: 8px;
  font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 24px;
  transition: color .18s;
}
.article__back:hover { color: var(--text); }

.article__meta {
  display: flex; flex-wrap: wrap; align-items: center; gap: 14px;
  font-size: 11px; letter-spacing: .12em; text-transform: uppercase;
  color: var(--muted); margin-bottom: 16px;
}
.article__tag { color: var(--accent); }
.article__title { font-size: clamp(28px, 7.5vw, 56px); max-width: 22ch; }
.article__excerpt { margin-top: 18px; font-size: 15px; max-width: 56ch; }

.article__cover { background: var(--bg); padding-block: 24px; }
.article__cover-box {
  aspect-ratio: 16 / 9;
  background:
    radial-gradient(60% 70% at 30% 30%, rgba(249,112,2,.10), transparent 70%),
    linear-gradient(135deg, #2A2522 0%, #181513 100%);
  border: 1px solid var(--line);
  border-radius: 12px;
  display: grid; place-items: center;
}
.article__cover-i {
  font-family: var(--font-head); font-weight: 700;
  font-size: clamp(48px, 12vw, 120px);
  color: rgba(255,255,255,.05); letter-spacing: .02em;
}

.article__body { padding-block: 32px 64px; background: var(--bg); }
.article__content {
  font-size: 16px; line-height: 1.7;
  color: var(--text);
}
.article__content :deep(h2) {
  font-family: var(--font-head); font-weight: 700;
  font-size: clamp(22px, 5.6vw, 30px);
  letter-spacing: .005em;
  margin-top: 36px; margin-bottom: 14px;
  line-height: 1.2;
}
.article__content :deep(p) { margin-bottom: 16px; color: var(--text); }
.article__content :deep(ul) { display: flex; flex-direction: column; gap: 8px; padding-left: 0; margin-bottom: 16px; }
.article__content :deep(li) { position: relative; padding-left: 22px; color: var(--muted); }
.article__content :deep(li)::before {
  content: ''; position: absolute; left: 0; top: 11px;
  width: 12px; height: 1.5px; background: var(--accent);
}

.article__signature {
  margin-top: 48px;
  padding: 24px;
  border: 1px solid var(--line); border-radius: 12px;
  background: var(--surface);
  display: flex; flex-direction: column; gap: 14px;
}
.article__signature-text { color: var(--muted); font-size: 14px; line-height: 1.55; }
.article__signature .btn { align-self: flex-start; }

.article__other { padding-block: 64px; background: var(--surface); border-top: 1px solid var(--line); }
.article__other-title { font-size: clamp(24px, 6vw, 36px); margin-bottom: 24px; }
.article__other ul { display: flex; flex-direction: column; gap: 16px; }

.post-mini {
  display: flex; flex-direction: column; gap: 10px; padding: 20px;
  background: var(--bg); border: 1px solid var(--line); border-radius: 10px;
  transition: border-color .2s;
}
.post-mini:hover { border-color: var(--muted-dim); }
.post-mini__tag { font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--accent); }
.post-mini__title { font-family: var(--font-head); font-weight: 700; font-size: clamp(18px, 4.8vw, 22px); line-height: 1.2; }
.post-mini__excerpt { color: var(--muted); font-size: 13px; line-height: 1.5; }

@media (min-width: 600px) {
  .article__head { padding-block: 120px 48px; }
  .article__body { padding-block: 48px 96px; }
  .article__signature { padding: 32px; }
  .article__other { padding-block: 96px; }
  .article__other ul { flex-direction: row; gap: 24px; }
  .post-mini { flex: 1; padding: 24px; }
}
@media (min-width: 900px) {
  .article__head { padding-block: 160px 56px; }
  .article__cover { padding-block: 32px; }
}
</style>

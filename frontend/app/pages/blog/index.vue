<script setup lang="ts">
const posts = useBlogPosts()

useHead({
 title: 'Блог — ЭЛИДОМ',
 meta: [
 { name: 'description', content: 'Статьи о натяжных потолках, архитектурном свете и материалах премиум-сегмента.' },
 ],
})
</script>

<template>
 <main class="blog">
 <section class="blog__head">
 <div class="wrap">
 <p class="eyebrow">Блог</p>
 <h1 class="blog__title h-display">Технологии, свет, материалы</h1>
 <p class="blog__sub t-sub">
 Без воды и&nbsp;маркетинговых обещаний — конкретно о&nbsp;том,
 из&nbsp;чего складывается премиальный потолок.
 </p>
 </div>
 </section>

 <section class="blog__list">
 <div class="wrap">
 <ul>
 <li v-for="p in posts" :key="p.slug">
 <NuxtLink :to="`/blog/${p.slug}`" class="post">
 <div class="post__meta">
 <span class="post__tag">{{ p.tag }}</span>
 <span class="post__date">{{ formatBlogDate(p.date) }}</span>
 <span class="post__time">{{ p.readMin }} мин</span>
 </div>
 <h2 class="post__title">{{ p.title }}</h2>
 <p class="post__excerpt">{{ p.excerpt }}</p>
 <span class="post__more">
 Читать
 <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
 <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
 </svg>
 </span>
 </NuxtLink>
 </li>
 </ul>
 </div>
 </section>

 <FinalCtaSection />
 <TheFooter />
 </main>
</template>

<style scoped>
.blog__head { padding-block: 96px 48px; background: var(--bg); }
.blog__title { font-size: clamp(32px, 9vw, 64px); margin-top: 14px; max-width: 80ch; }
.blog__sub { margin-top: 18px; font-size: 14px; max-width: 52ch; }

.blog__list { padding-block: 32px 64px; background: var(--bg); }
.blog__list ul { display: flex; flex-direction: column; gap: 0; }
.blog__list li { border-top: 1px solid var(--line); }
.blog__list li:last-child { border-bottom: 1px solid var(--line); }

.post { display: flex; flex-direction: column; gap: 12px; padding-block: 24px; transition: opacity .2s; }
.post:hover { opacity: .85; }

.post__meta {
 display: flex; flex-wrap: wrap; align-items: center; gap: 14px;
 font-size: 11px; letter-spacing: .12em; text-transform: uppercase; color: var(--muted);
}
.post__tag { color: var(--accent); }
.post__title { font-family: var(--font-head); font-weight: 700; font-size: clamp(20px, 5.6vw, 28px); line-height: 1.2; letter-spacing: .005em; }
.post__excerpt { color: var(--muted); font-size: 14px; line-height: 1.55; max-width: 64ch; }
.post__more {
 display: inline-flex; align-items: center; gap: 8px;
 font-size: 12px; font-weight: 600; letter-spacing: .12em; text-transform: uppercase;
 color: var(--accent); margin-top: 4px;
}

@media (min-width: 600px) {
 .blog__head { padding-block: 120px 64px; }
 .blog__sub { font-size: 16px; }
 .post { padding-block: 32px; gap: 14px; }
 .post__excerpt { font-size: 15px; }
}
@media (min-width: 900px) {
 .blog__head { padding-block: 160px 80px; }
 .blog__list { padding-block: 40px 96px; }
 .post { padding-block: 40px; }
}
</style>

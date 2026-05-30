<script setup lang="ts">
useHead({
 title: 'Политика конфиденциальности — ЭЛИДОМ',
 meta: [{ name: 'description', content: 'Политика обработки персональных данных компании ЭЛИДОМ.' }],
})

const lastUpdated = '29 мая 2026'
</script>

<template>
 <main class="prv">
 <section class="prv__head">
 <div class="wrap">
 <NuxtLink to="/" class="prv__back">
 <svg viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
 <path d="M19 12H5"/><path d="m11 19-7-7 7-7"/>
 </svg>
 На главную
 </NuxtLink>
 <p class="eyebrow">Юридическая информация</p>
 <h1 class="prv__title h-display">Политика конфиденциальности</h1>
 <p class="prv__updated t-sub">Действует с&nbsp;{{ lastUpdated }}</p>
 </div>
 </section>

 <article class="prv__body">
 <div class="wrap">
 <div class="prv__content">
 <h2>1. Общие положения</h2>
 <p>Настоящая Политика обработки персональных данных (далее — Политика) разработана в&nbsp;соответствии с&nbsp;Федеральным законом от&nbsp;27.07.2006 №&nbsp;152-ФЗ «О&nbsp;персональных данных».</p>
 <p>Политика определяет порядок обработки персональных данных и&nbsp;меры по&nbsp;обеспечению безопасности персональных данных, предпринимаемые ЭЛИДОМ (далее — Оператор).</p>

 <h2>2. Какие данные собираем</h2>
 <ul>
 <li>Имя</li>
 <li>Контактный телефон</li>
 <li>Тип объекта (квартира / дом / коммерция) — при заполнении брифа</li>
 <li>Наличие дизайн-проекта и&nbsp;загруженные файлы — при заполнении брифа</li>
 </ul>

 <h2>3. Цели обработки</h2>
 <ul>
 <li>Связь с&nbsp;вами по&nbsp;вашей заявке</li>
 <li>Согласование удобного времени замера</li>
 <li>Подготовка коммерческого предложения</li>
 <li>Заключение и&nbsp;исполнение договора</li>
 </ul>

 <h2>4. Сроки хранения</h2>
 <p>Персональные данные хранятся в&nbsp;течение срока, необходимого для достижения целей обработки, но&nbsp;не&nbsp;более 3&nbsp;лет с&nbsp;момента последнего контакта.</p>

 <h2>5. Передача данных третьим лицам</h2>
 <p>Оператор не&nbsp;передаёт персональные данные третьим лицам, за&nbsp;исключением случаев, предусмотренных законодательством Российской Федерации.</p>

 <h2>6. Права субъекта данных</h2>
 <p>Вы&nbsp;имеете право в&nbsp;любой момент:</p>
 <ul>
 <li>Получить информацию о&nbsp;ваших персональных данных, которые мы&nbsp;обрабатываем</li>
 <li>Потребовать уточнения, блокирования или удаления ваших данных</li>
 <li>Отозвать согласие на&nbsp;обработку</li>
 </ul>
 <p>Для реализации этих прав свяжитесь с&nbsp;нами по&nbsp;телефону или Telegram, указанным в&nbsp;разделе «Контакты».</p>

 <h2>7. Контакты</h2>
 <p>По&nbsp;всем вопросам, связанным с&nbsp;обработкой персональных данных, обращайтесь:</p>
 <ul>
 <li>Телефон: +7&nbsp;916&nbsp;327&nbsp;72&nbsp;60</li>
 <li>Telegram: <a href="https://t.me/elidom" target="_blank" rel="noopener">@elidom</a></li>
 </ul>
 </div>
 </div>
 </article>

 <TheFooter />
 </main>
</template>

<style scoped>
.prv__head { padding-block: 96px 32px; background: var(--bg); border-bottom: 1px solid var(--line); }
.prv__back {
 display: inline-flex; align-items: center; gap: 8px;
 font-size: 12px; letter-spacing: .14em; text-transform: uppercase;
 color: var(--muted); margin-bottom: 24px;
 transition: color .18s;
}
.prv__back:hover { color: var(--text); }
.prv__title { font-size: clamp(28px, 8vw, 52px); margin-top: 14px; max-width: 80ch; }
.prv__updated { margin-top: 14px; font-size: 13px; }

.prv__body { padding-block: 48px 64px; background: var(--bg); }

.prv__content {
 font-size: 15px; line-height: 1.7;
 color: var(--text);
}
.prv__content h2 {
 font-family: var(--font-head); font-weight: 700;
 font-size: clamp(20px, 5vw, 26px);
 letter-spacing: .005em;
 margin-top: 36px; margin-bottom: 14px;
 line-height: 1.2;
}
.prv__content h2:first-child { margin-top: 0; }
.prv__content p { margin-bottom: 14px; color: var(--text); }
.prv__content ul { display: flex; flex-direction: column; gap: 8px; padding-left: 0; margin-bottom: 14px; }
.prv__content li { position: relative; padding-left: 22px; color: var(--muted); }
.prv__content li::before {
 content: ''; position: absolute; left: 0; top: 11px;
 width: 12px; height: 1.5px; background: var(--accent);
}
.prv__content a { color: var(--accent); text-decoration: underline; text-underline-offset: 2px; }
.prv__content a:hover { color: var(--text); }

@media (min-width: 600px) {
 .prv__head { padding-block: 120px 48px; }
 .prv__body { padding-block: 64px 96px; }
}
@media (min-width: 900px) {
 .prv__head { padding-block: 160px 64px; }
}
</style>

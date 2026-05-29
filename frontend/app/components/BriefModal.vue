<script setup lang="ts">
type ObjectType = 'apartment' | 'house' | 'commercial'
type Step = 1 | 2 | 3 | 4

const open = useBriefOpen()
const step = ref<Step>(1)
const submitting = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  objectType: null as ObjectType | null,
  hasDesign: null as boolean | null,
  designFile: null as File | null,
  name: '',
  phone: '',
  consent: false,
})

const objectOptions: { value: ObjectType; label: string; sub: string }[] = [
  { value: 'apartment',  label: 'Квартира',  sub: 'Жилой комплекс, новостройка, вторичка' },
  { value: 'house',      label: 'Дом',       sub: 'Загородный дом, таунхаус, коттедж' },
  { value: 'commercial', label: 'Коммерция', sub: 'Офис, шоурум, ресторан, бутик' },
]

const fileInput = useTemplateRef<HTMLInputElement>('fileInput')

function pickObject (v: ObjectType) { form.objectType = v }
function pickDesign (v: boolean) {
  form.hasDesign = v
  if (!v) form.designFile = null
}
function onFile (e: Event) {
  const t = e.target as HTMLInputElement
  form.designFile = t.files?.[0] ?? null
}
function clearFile () {
  form.designFile = null
  if (fileInput.value) fileInput.value.value = ''
}

// Извлекаем 10 цифр номера (без кода страны)
const phoneSubscriber = computed(() => {
  let d = form.phone.replace(/\D/g, '')
  if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1)
  return d.slice(0, 10)
})
const phoneValid = computed(() => phoneSubscriber.value.length === 10)
const nameValid  = computed(() => form.name.trim().length >= 2)

// Форматирование: +7 (XXX) XXX‑XX‑XX. Блокируем 7 и 8 первой цифрой после +7.
// Используем U+2011 (non-breaking hyphen), т.к. Ablation не содержит глифа U+002D.
const NB_HYPHEN = '‑'
function formatPhone (raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1)
  while (d.length > 0 && (d[0] === '7' || d[0] === '8')) d = d.slice(1)
  d = d.slice(0, 10)
  let out = '+7'
  if (d.length > 0) out += ' (' + d.slice(0, 3)
  if (d.length >= 3) out += ')'
  if (d.length > 3) out += ' ' + d.slice(3, 6)
  if (d.length > 6) out += NB_HYPHEN + d.slice(6, 8)
  if (d.length > 8) out += NB_HYPHEN + d.slice(8, 10)
  return out
}

function onPhoneInput (e: Event) {
  const t = e.target as HTMLInputElement
  form.phone = formatPhone(t.value)
}
function onPhoneFocus () {
  if (!form.phone) form.phone = '+7 '
}
function onPhoneKeydown (e: KeyboardEvent) {
  // не даём стереть префикс «+7 »
  const t = e.target as HTMLInputElement
  if ((e.key === 'Backspace' || e.key === 'Delete') && (t.selectionStart ?? 0) <= 3) {
    e.preventDefault()
  }
}

// Валидация имени — только буквы/пробел/дефис, мин 2 символа
function onNameInput (e: Event) {
  const t = e.target as HTMLInputElement
  form.name = t.value.replace(/[^а-яА-ЯёЁa-zA-Z\s\-]/g, '').slice(0, 60)
}

const canNext = computed(() => {
  if (step.value === 1) return form.objectType !== null
  if (step.value === 2) return form.hasDesign !== null
  if (step.value === 3) return nameValid.value && phoneValid.value && form.consent
  return false
})

function next () {
  if (!canNext.value) return
  if (step.value < 3) { step.value = (step.value + 1) as Step; return }
  submit()
}
function back () {
  if (step.value > 1) step.value = (step.value - 1) as Step
}

async function submit () {
  if (submitting.value) return
  submitting.value = true
  error.value = null
  try {
    // TODO: $fetch('/api/leads', { method: 'POST', body: form })
    await new Promise(r => setTimeout(r, 600))
    step.value = 4
  } catch (e: any) {
    error.value = e?.message ?? 'Не удалось отправить. Попробуйте ещё раз.'
  } finally {
    submitting.value = false
  }
}

function reset () {
  form.objectType = null
  form.hasDesign = null
  form.designFile = null
  form.name = ''
  form.phone = ''
  form.consent = false
  step.value = 1
}

function close () {
  closeBrief()
  // Сбрасываем форму, но только если не в успехе (чтобы юзер увидел успех при следующем открытии — нет, лучше сразу reset)
  setTimeout(reset, 350)
}
function onBackdrop (e: MouseEvent) {
  if (e.target === e.currentTarget) close()
}

onMounted(() => {
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && open.value) close()
  })
})
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="bm" role="dialog" aria-modal="true" aria-labelledby="bm-title" @click="onBackdrop">
        <div class="bm__card">
          <button class="bm__close" type="button" aria-label="Закрыть" @click="close">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M6 6l12 12M18 6 6 18"/>
            </svg>
          </button>

          <header v-if="step < 4" class="bm__head">
            <p class="eyebrow">Заявка · 1 минута</p>
            <h2 id="bm-title" class="bm__title h-display">Расскажите о&nbsp;проекте</h2>
          </header>

          <!-- Прогресс -->
          <div v-if="step < 4" class="bm__progress">
            <div v-for="n in 3" :key="n"
                 class="bm__dot"
                 :class="{ 'is-done': step > n, 'is-active': step === n }"></div>
            <span class="bm__step-label">Шаг {{ step }} из&nbsp;3</span>
          </div>

          <!-- Шаги -->
          <Transition name="step" mode="out-in">
            <!-- 1 — Тип объекта -->
            <div v-if="step === 1" key="s1" class="bm__step">
              <h3 class="bm__q">Какой объект?</h3>
              <div class="bm__opts">
                <button v-for="o in objectOptions" :key="o.value"
                        type="button"
                        class="opt"
                        :class="{ 'opt--on': form.objectType === o.value }"
                        @click="pickObject(o.value)">
                  <span class="opt__icon" aria-hidden="true">
                    <!-- Квартира: многоэтажный дом с окнами сеткой -->
                    <svg v-if="o.value === 'apartment'" viewBox="0 0 24 24" class="icon icon--lg">
                      <rect x="4" y="2" width="16" height="20" rx="1"/>
                      <path d="M8 6h2M14 6h2M8 11h2M14 11h2M8 16h2M14 16h2"/>
                      <path d="M11 22v-3h2v3"/>
                    </svg>
                    <!-- Дом: одноэтажный с двускатной крышей и трубой -->
                    <svg v-else-if="o.value === 'house'" viewBox="0 0 24 24" class="icon icon--lg">
                      <path d="M3 11 12 3l9 8"/>
                      <path d="M5 10v11h14V10"/>
                      <path d="M10 21v-6h4v6"/>
                      <path d="M17 4v3"/>
                    </svg>
                    <!-- Коммерция: витрина с навесом и большим входом -->
                    <svg v-else viewBox="0 0 24 24" class="icon icon--lg">
                      <path d="M3 8 5 4h14l2 4"/>
                      <path d="M3 8h18"/>
                      <path d="M4 8v13h16V8"/>
                      <path d="M9 21v-7h6v7"/>
                      <path d="M9 14h6"/>
                    </svg>
                  </span>
                  <span class="opt__body">
                    <span class="opt__label">{{ o.label }}</span>
                    <span class="opt__sub">{{ o.sub }}</span>
                  </span>
                  <span class="opt__check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" class="icon"><path d="m5 12 5 5 9-11"/></svg>
                  </span>
                </button>
              </div>
            </div>

            <!-- 2 — Дизайн-проект -->
            <div v-else-if="step === 2" key="s2" class="bm__step">
              <h3 class="bm__q">Есть&nbsp;ли дизайн‑проект?</h3>
              <div class="bm__opts bm__opts--row">
                <button type="button" class="opt opt--compact"
                        :class="{ 'opt--on': form.hasDesign === true }"
                        @click="pickDesign(true)">
                  <span class="opt__body">
                    <span class="opt__label">Да</span>
                    <span class="opt__sub">Есть готовые чертежи</span>
                  </span>
                  <span class="opt__check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" class="icon"><path d="m5 12 5 5 9-11"/></svg>
                  </span>
                </button>
                <button type="button" class="opt opt--compact"
                        :class="{ 'opt--on': form.hasDesign === false }"
                        @click="pickDesign(false)">
                  <span class="opt__body">
                    <span class="opt__label">Нет</span>
                    <span class="opt__sub">Подберём решение&nbsp;сами</span>
                  </span>
                  <span class="opt__check" aria-hidden="true">
                    <svg viewBox="0 0 24 24" class="icon"><path d="m5 12 5 5 9-11"/></svg>
                  </span>
                </button>
              </div>

              <Transition name="fade">
                <div v-if="form.hasDesign === true" class="bm__file">
                  <input ref="fileInput" id="bm-file" type="file"
                         accept=".pdf,.dwg,.skp,.jpg,.jpeg,.png,.zip,.rar"
                         class="bm__file-input" @change="onFile" />
                  <label for="bm-file" class="bm__file-label">
                    <svg viewBox="0 0 24 24" class="icon">
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5-5 5 5"/><path d="M12 5v12"/>
                    </svg>
                    <span v-if="!form.designFile">Прикрепить файл (необязательно)</span>
                    <span v-else class="bm__file-name">{{ form.designFile.name }}</span>
                  </label>
                  <button v-if="form.designFile" type="button" class="bm__file-clear"
                          aria-label="Убрать файл" @click="clearFile">
                    <svg viewBox="0 0 24 24" class="icon icon--sm"><path d="M6 6l12 12M18 6 6 18"/></svg>
                  </button>
                </div>
              </Transition>
            </div>

            <!-- 3 — Контакты -->
            <div v-else-if="step === 3" key="s3" class="bm__step">
              <h3 class="bm__q">Куда выслать смету?</h3>
              <div class="bm__field" :class="{ 'is-invalid': form.name.length > 0 && !nameValid }">
                <label for="bm-name">Имя</label>
                <input id="bm-name" type="text" :value="form.name" @input="onNameInput"
                       autocomplete="given-name" placeholder="Денис" maxlength="60" />
              </div>
              <div class="bm__field" :class="{ 'is-invalid': phoneSubscriber.length > 0 && !phoneValid }">
                <label for="bm-phone">Телефон</label>
                <input id="bm-phone" type="tel" :value="form.phone"
                       @input="onPhoneInput" @focus="onPhoneFocus" @keydown="onPhoneKeydown"
                       autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___‑__‑__" />
              </div>
              <label class="bm__consent" :class="{ 'is-on': form.consent }">
                <input type="checkbox" v-model="form.consent" class="bm__consent-input" />
                <span class="bm__consent-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" class="bm__consent-tick"><path d="m5 12 5 5 9-11"/></svg>
                </span>
                <span class="bm__consent-text">
                  Согласен с&nbsp;<a href="#" target="_blank" rel="noopener">обработкой персональных данных</a>
                </span>
              </label>
              <p v-if="error" class="bm__error">{{ error }}</p>
            </div>

            <!-- 4 — Успех -->
            <div v-else key="s4" class="bm__step bm__step--done">
              <div class="bm__ok-wrap" aria-hidden="true">
                <svg class="bm__ok-ring" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" stroke="var(--accent)" stroke-width="2"
                          pathLength="1" stroke-linecap="round" transform="rotate(-90 50 50)"/>
                </svg>
                <span class="bm__ok">
                  <svg viewBox="0 0 24 24" class="bm__ok-tick">
                    <path pathLength="1" d="m5 12 5 5 9-11"/>
                  </svg>
                </span>
              </div>

              <h3 class="bm__q bm__done-title">Заявка принята</h3>

              <p class="bm__done-text">
                Менеджер свяжется в&nbsp;течение часа<br>
                в&nbsp;рабочее время (с&nbsp;9:00 до&nbsp;21:00),<br>
                чтобы согласовать удобное время замера.
              </p>

              <div class="bm__done-meta">
                <div class="bm__done-row">
                  <span class="bm__done-key">Объект</span>
                  <span class="bm__done-val">{{ objectOptions.find(o => o.value === form.objectType)?.label }}</span>
                </div>
                <div class="bm__done-row">
                  <span class="bm__done-key">Дизайн‑проект</span>
                  <span class="bm__done-val">{{ form.hasDesign ? 'Есть' : 'Нет' }}</span>
                </div>
                <div class="bm__done-row">
                  <span class="bm__done-key">Контакт</span>
                  <span class="bm__done-val">{{ form.phone }}</span>
                </div>
              </div>

              <button type="button" class="btn btn--accent btn--block" @click="close">Закрыть</button>
            </div>
          </Transition>

          <!-- Навигация -->
          <div v-if="step < 4" class="bm__nav">
            <button v-if="step > 1" type="button" class="btn btn--ghost bm__back" @click="back">
              <svg viewBox="0 0 24 24" class="icon icon--sm"><path d="M19 12H5"/><path d="m11 19-7-7 7-7"/></svg>
              Назад
            </button>
            <button type="button" class="btn btn--accent bm__next"
                    :disabled="!canNext || submitting"
                    @click="next">
              <span v-if="submitting">Отправляем…</span>
              <span v-else-if="step === 3">Отправить заявку</span>
              <span v-else>Дальше</span>
              <svg v-if="!submitting" viewBox="0 0 24 24" class="icon icon--sm">
                <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* ── Подложка модалки ──────────────────────────────────── */
.bm {
  position: fixed;
  inset: 0;
  z-index: 100;
  background: rgba(12, 10, 9, .88);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow-y: auto;
  padding: 0;
}

/* ── Карточка ──────────────────────────────────────────── */
.bm__card {
  position: relative;
  width: 100%;
  max-width: 560px;
  background: var(--bg);
  border-top: 1px solid var(--line);
  border-radius: 16px 16px 0 0;
  padding: 22px 18px 24px;
  max-height: calc(100svh - 24px);
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
}

.bm__close {
  position: absolute;
  top: 12px;
  right: 12px;
  width: 38px;
  height: 38px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--muted);
  transition: color .18s ease, border-color .18s ease;
  z-index: 1;
}
.bm__close:hover { color: var(--text); border-color: var(--muted); }

.bm__head { margin-bottom: 18px; padding-right: 44px; }
.bm__title { font-size: 22px; margin-top: 8px; }

/* ── Прогресс ──────────────────────────────────────────── */
.bm__progress { display: flex; align-items: center; gap: 6px; margin-bottom: 18px; }
.bm__dot { width: 22px; height: 3px; background: var(--line); border-radius: 2px; transition: background-color .2s ease; }
.bm__dot.is-active { background: var(--accent); }
.bm__dot.is-done   { background: var(--accent-2); }
.bm__step-label { margin-left: auto; font-size: 12px; color: var(--muted); letter-spacing: .04em; }

/* ── Шаг ───────────────────────────────────────────────── */
.bm__step { display: flex; flex-direction: column; gap: 14px; }
.bm__q { font-family: var(--font-head); font-weight: 700; font-size: 18px; line-height: 1.2; letter-spacing: .01em; }

/* ── Карточки-варианты ─────────────────────────────────── */
.bm__opts { display: flex; flex-direction: column; gap: 8px; }
.bm__opts--row { flex-direction: row; }

.opt {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  padding: 12px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  transition: border-color .18s ease, transform .12s ease;
}
.opt:hover { border-color: var(--muted-dim); }
.opt:active { transform: scale(.99); }
.opt--on { border-color: var(--accent); }

.opt__icon {
  display: grid; place-items: center;
  width: 38px; height: 38px;
  border-radius: 6px;
  border: 1px solid var(--line);
  color: var(--muted);
  flex: none;
  transition: color .18s ease, border-color .18s ease;
}
.opt--on .opt__icon { border-color: var(--accent); color: var(--accent); }

.opt__body { display: flex; flex-direction: column; gap: 2px; min-width: 0; flex: 1; }
.opt__label { font-weight: 600; font-size: 15px; letter-spacing: .02em; }
.opt__sub   { font-size: 12px; color: var(--muted); line-height: 1.35; }

.opt__check {
  width: 20px; height: 20px;
  border-radius: 50%;
  border: 1.5px solid var(--line);
  display: grid; place-items: center;
  color: transparent;
  flex: none;
  transition: border-color .18s ease, background-color .18s ease, color .18s ease;
}
.opt--on .opt__check { border-color: var(--accent); background: var(--accent); color: #fff; }
.opt__check .icon { width: 12px; height: 12px; stroke-width: 2.5; }

.opt--compact { flex-direction: column; align-items: stretch; gap: 6px; padding: 14px 12px; }
.opt--compact .opt__check { align-self: flex-end; }

/* ── Файл ──────────────────────────────────────────────── */
.bm__file { position: relative; display: flex; align-items: center; gap: 8px; margin-top: 2px; }
.bm__file-input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.bm__file-label {
  flex: 1;
  display: inline-flex; align-items: center; gap: 10px;
  padding: 12px 14px;
  border: 1px dashed var(--line);
  border-radius: 8px;
  color: var(--muted);
  font-size: 13px;
  cursor: pointer;
  transition: border-color .18s ease, color .18s ease;
}
.bm__file-label:hover { border-color: var(--muted); color: var(--text); }
.bm__file-name { color: var(--text); word-break: break-all; overflow: hidden; text-overflow: ellipsis; }
.bm__file-clear {
  display: grid; place-items: center;
  width: 32px; height: 32px;
  border-radius: 50%;
  border: 1px solid var(--line);
  color: var(--muted);
  transition: color .18s ease, border-color .18s ease;
  flex: none;
}
.bm__file-clear:hover { color: var(--text); border-color: var(--muted); }

/* ── Поля ──────────────────────────────────────────────── */
.bm__field { display: flex; flex-direction: column; gap: 6px; }
.bm__field label {
  font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted);
}
.bm__field input {
  padding: 13px 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 16px;
  color: var(--text);
  transition: border-color .18s ease;
  min-height: 48px;
}
.bm__field input::placeholder { color: var(--muted-dim); }
.bm__field input:focus { border-color: var(--accent); }
.bm__field.is-invalid input { border-color: rgba(255,122,89,.55); }
.bm__field.is-invalid input:focus { border-color: rgba(255,122,89,.85); }

/* ── Согласие ──────────────────────────────────────────── */
.bm__consent {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  cursor: pointer;
  padding: 4px 0 2px;
  user-select: none;
}
.bm__consent-input {
  position: absolute;
  width: 1px; height: 1px;
  opacity: 0;
  pointer-events: none;
}
.bm__consent-box {
  flex: none;
  width: 20px; height: 20px;
  margin-top: 1px;
  display: grid;
  place-items: center;
  border: 1.5px solid var(--line);
  border-radius: 4px;
  background: var(--surface);
  transition: border-color .18s ease, background-color .18s ease;
}
.bm__consent-tick {
  width: 14px; height: 14px;
  fill: none;
  stroke: #fff;
  stroke-width: 2.5;
  stroke-linecap: round;
  stroke-linejoin: round;
  opacity: 0;
  transition: opacity .15s ease;
}
.bm__consent.is-on .bm__consent-box { background: var(--accent); border-color: var(--accent); }
.bm__consent.is-on .bm__consent-tick { opacity: 1; }
.bm__consent-input:focus-visible + .bm__consent-box {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.bm__consent-text {
  color: var(--muted);
  font-size: 12px;
  line-height: 1.5;
}
.bm__consent-text a {
  color: var(--text);
  text-decoration: underline;
  text-underline-offset: 2px;
}
.bm__consent-text a:hover { color: var(--accent); }

.bm__error {
  font-size: 13px; color: #ff7a59;
  padding: 10px 12px;
  border-radius: 6px;
  background: rgba(255,122,89,.08);
  border: 1px solid rgba(255,122,89,.3);
}

/* ── Навигация ─────────────────────────────────────────── */
.bm__nav { display: flex; gap: 8px; margin-top: 18px; }
.bm__back { flex: 0 0 auto; padding-inline: 14px; }
.bm__next { flex: 1; }
.bm__next:disabled { opacity: .35; cursor: not-allowed; transform: none; filter: none; }

/* ── Успех ─────────────────────────────────────────────── */
.bm__step--done {
  align-items: center;
  text-align: center;
  gap: 16px;
  padding-block: 8px 4px;
}

.bm__ok-wrap {
  position: relative;
  width: 88px;
  height: 88px;
  display: grid;
  place-items: center;
  margin-bottom: 4px;
}
.bm__ok-ring {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.bm__ok-ring circle {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: bm-ring .9s cubic-bezier(.65,.05,.36,1) forwards;
}
@keyframes bm-ring { to { stroke-dashoffset: 0; } }

.bm__ok {
  position: relative;
  width: 56px; height: 56px;
  display: grid; place-items: center;
  background: var(--grad-accent);
  border-radius: 50%;
  color: #fff;
  transform: scale(0);
  animation: bm-pop .45s cubic-bezier(.34,1.56,.64,1) forwards;
  animation-delay: .55s;
  box-shadow: 0 0 0 6px rgba(249,112,2,.10);
}
@keyframes bm-pop { to { transform: scale(1); } }

.bm__ok-tick { width: 30px; height: 30px; stroke: #fff; stroke-width: 2.4; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.bm__ok-tick path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: bm-tick .35s ease forwards;
  animation-delay: .85s;
}
@keyframes bm-tick { to { stroke-dashoffset: 0; } }

.bm__done-title {
  font-size: 24px;
  opacity: 0;
  animation: bm-fade-up .4s ease forwards;
  animation-delay: 1.05s;
}
.bm__done-text {
  color: var(--muted);
  font-size: 14px;
  line-height: 1.55;
  opacity: 0;
  animation: bm-fade-up .4s ease forwards;
  animation-delay: 1.2s;
}
@keyframes bm-fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

.bm__done-meta {
  width: 100%;
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 14px 14px;
  border: 1px solid var(--line);
  border-radius: 8px;
  background: var(--surface);
  opacity: 0;
  animation: bm-fade-up .4s ease forwards;
  animation-delay: 1.35s;
}
.bm__done-row {
  display: flex;
  justify-content: space-between;
  gap: 12px;
  font-size: 13px;
}
.bm__done-key { color: var(--muted); letter-spacing: .04em; }
.bm__done-val {
  color: var(--text);
  font-weight: 600;
  text-align: right;
  word-break: break-word;
}

.bm__step--done .btn {
  margin-top: 6px;
  opacity: 0;
  animation: bm-fade-up .4s ease forwards;
  animation-delay: 1.5s;
}

@media (prefers-reduced-motion: reduce) {
  .bm__ok-ring circle,
  .bm__ok,
  .bm__ok-tick path,
  .bm__done-title,
  .bm__done-text,
  .bm__done-meta,
  .bm__step--done .btn {
    animation: none;
    opacity: 1;
    transform: none;
    stroke-dashoffset: 0;
  }
}

/* ── Modal transitions ─────────────────────────────────── */
.modal-enter-active, .modal-leave-active { transition: opacity .28s ease; }
.modal-enter-active .bm__card, .modal-leave-active .bm__card { transition: transform .32s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .bm__card, .modal-leave-to .bm__card { transform: translateY(20px); }

/* ── Step transitions ──────────────────────────────────── */
.step-enter-active, .step-leave-active { transition: opacity .22s ease, transform .22s ease; }
.step-enter-from { opacity: 0; transform: translateX(12px); }
.step-leave-to   { opacity: 0; transform: translateX(-12px); }

.fade-enter-active, .fade-leave-active { transition: opacity .22s ease, max-height .22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; max-height: 0; }
.fade-enter-to, .fade-leave-from { opacity: 1; max-height: 200px; }

/* ── ≥460px — больше места, центрирование ──────────────── */
@media (min-width: 460px) {
  .bm { align-items: center; padding: 24px; }
  .bm__card { border-radius: 14px; border: 1px solid var(--line); padding: 26px 22px; max-height: calc(100svh - 48px); }
  .bm__title { font-size: 26px; }
  .bm__q { font-size: 20px; }
}

/* ── ≥600px ────────────────────────────────────────────── */
@media (min-width: 600px) {
  .bm__card { padding: 32px 28px; }
  .bm__title { font-size: 32px; }
  .opt { padding: 16px; gap: 14px; }
  .opt__label { font-size: 16px; }
  .opt__sub   { font-size: 13px; }
}
</style>

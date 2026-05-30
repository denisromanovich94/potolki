<script setup lang="ts">
const open = usePartnersOpen()
const submitting = ref(false)
const sent = ref(false)
const error = ref<string | null>(null)

const form = reactive({
  name: '',
  phone: '',
  consent: false,
})

// Российский номер: код страны (7) + 10 цифр абонента = 11 цифр всего.
const phoneSubscriber = computed(() => {
  let d = form.phone.replace(/\D/g, '')
  if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1)
  return d.slice(0, 10)
})
const phoneTotalDigits = computed(() => 1 + phoneSubscriber.value.length)
const phoneValid = computed(() => phoneTotalDigits.value === 11)
const nameValid  = computed(() => form.name.trim().length >= 2)

const canSend = computed(() => nameValid.value && phoneValid.value && form.consent && !submitting.value)

const NB = '‑'
function formatPhone (raw: string): string {
  let d = raw.replace(/\D/g, '')
  if (d.startsWith('7') || d.startsWith('8')) d = d.slice(1)
  while (d.length > 0 && (d[0] === '7' || d[0] === '8')) d = d.slice(1)
  d = d.slice(0, 10)
  let out = '+7'
  if (d.length > 0) out += ' (' + d.slice(0, 3)
  if (d.length >= 3) out += ')'
  if (d.length > 3) out += ' ' + d.slice(3, 6)
  if (d.length > 6) out += NB + d.slice(6, 8)
  if (d.length > 8) out += NB + d.slice(8, 10)
  return out
}

function onPhoneInput (e: Event) { form.phone = formatPhone((e.target as HTMLInputElement).value) }
function onPhoneFocus () { if (!form.phone) form.phone = '+7 ' }
function onPhoneKeydown (e: KeyboardEvent) {
  const t = e.target as HTMLInputElement
  if ((e.key === 'Backspace' || e.key === 'Delete') && (t.selectionStart ?? 0) <= 3) e.preventDefault()
}
function onNameInput (e: Event) {
  form.name = (e.target as HTMLInputElement).value.replace(/[^а-яА-ЯёЁa-zA-Z\s\-]/g, '').slice(0, 60)
}

async function submit () {
  if (!canSend.value) return
  submitting.value = true
  error.value = null
  try {
    // TODO: $fetch('/api/partners', { method: 'POST', body: form })
    await new Promise(r => setTimeout(r, 600))
    sent.value = true
  } catch (e: any) {
    error.value = e?.message ?? 'Не удалось отправить. Попробуйте ещё раз.'
  } finally {
    submitting.value = false
  }
}

function reset () {
  form.name = ''
  form.phone = ''
  form.consent = false
  sent.value = false
  error.value = null
}

function close () {
  closePartners()
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
      <div v-if="open" class="pm" role="dialog" aria-modal="true" aria-labelledby="pm-title" @click="onBackdrop">
        <div class="pm__card">
          <button class="pm__close" type="button" aria-label="Закрыть" @click="close">
            <svg viewBox="0 0 24 24" class="icon">
              <path d="M6 6l12 12M18 6 6 18"/>
            </svg>
          </button>

          <Transition name="pm-fade" mode="out-in">
            <form v-if="!sent" key="form" class="pm__form" @submit.prevent="submit">
              <header class="pm__head">
                <p class="eyebrow">Сотрудничество</p>
                <h2 id="pm-title" class="pm__title h-display">Получить условия</h2>
                <p class="pm__sub t-sub">Имя и&nbsp;телефон. Свяжемся в&nbsp;течение рабочего дня и&nbsp;вышлем условия.</p>
              </header>

              <div class="pm__field" :class="{ 'is-invalid': form.name.length > 0 && !nameValid }">
                <label for="pm-name">Имя</label>
                <input id="pm-name" type="text" :value="form.name" @input="onNameInput"
                       autocomplete="given-name" placeholder="Имя" maxlength="60" />
              </div>

              <div class="pm__field" :class="{ 'is-invalid': phoneSubscriber.length > 0 && !phoneValid }">
                <label for="pm-phone">Телефон</label>
                <input id="pm-phone" type="tel" :value="form.phone"
                       @input="onPhoneInput" @focus="onPhoneFocus" @keydown="onPhoneKeydown"
                       autocomplete="tel" inputmode="tel" placeholder="+7 (___) ___‑__‑__" />
              </div>

              <label class="pm__consent" :class="{ 'is-on': form.consent }">
                <input type="checkbox" v-model="form.consent" class="pm__consent-input" />
                <span class="pm__consent-box" aria-hidden="true">
                  <svg viewBox="0 0 24 24" class="pm__consent-tick"><path d="m5 12 5 5 9-11"/></svg>
                </span>
                <span class="pm__consent-text">
                  Согласен с&nbsp;<a href="/privacy" target="_blank" rel="noopener">обработкой персональных данных</a>
                </span>
              </label>

              <p v-if="error" class="pm__error">{{ error }}</p>

              <button type="submit" class="btn btn--accent btn--block pm__submit" :disabled="!canSend">
                <span v-if="submitting">Отправляем…</span>
                <span v-else>Получить условия</span>
                <svg v-if="!submitting" viewBox="0 0 24 24" class="icon icon--sm" aria-hidden="true">
                  <path d="M5 12h14"/><path d="m13 5 7 7-7 7"/>
                </svg>
              </button>
            </form>

            <div v-else key="sent" class="pm__done">
              <div class="pm__ok-wrap" aria-hidden="true">
                <svg class="pm__ok-ring" viewBox="0 0 100 100" fill="none">
                  <circle cx="50" cy="50" r="46" stroke="var(--accent)" stroke-width="2"
                          pathLength="1" stroke-linecap="round" transform="rotate(-90 50 50)"/>
                </svg>
                <span class="pm__ok">
                  <svg viewBox="0 0 24 24" class="pm__ok-tick">
                    <path pathLength="1" d="m5 12 5 5 9-11"/>
                  </svg>
                </span>
              </div>
              <h3 class="pm__done-title">Заявка принята</h3>
              <p class="pm__done-text">Свяжемся в&nbsp;течение рабочего дня и&nbsp;вышлем условия партнёрства.</p>
              <button type="button" class="btn btn--accent btn--block" @click="close">Закрыть</button>
            </div>
          </Transition>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.pm {
  position: fixed; inset: 0; z-index: 100;
  background: rgba(12, 10, 9, .88);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow-y: auto;
}

.pm__card {
  position: relative;
  width: 100%;
  max-width: 480px;
  background: var(--bg);
  border-top: 1px solid var(--line);
  border-radius: 16px 16px 0 0;
  padding: 22px 18px 24px;
  max-height: calc(100svh - 24px);
  overflow-y: auto;
}
.pm__close {
  position: absolute; top: 12px; right: 12px;
  width: 38px; height: 38px;
  display: grid; place-items: center;
  border-radius: 50%; border: 1px solid var(--line);
  color: var(--muted);
  transition: color .18s, border-color .18s;
  z-index: 1;
}
.pm__close:hover { color: var(--text); border-color: var(--muted); }

.pm__form { display: flex; flex-direction: column; gap: 14px; }
.pm__head { display: flex; flex-direction: column; gap: 8px; padding-right: 44px; }
.pm__title { font-size: clamp(22px, 6vw, 28px); }
.pm__sub { font-size: 13px; }

.pm__field { display: flex; flex-direction: column; gap: 6px; }
.pm__field label { font-size: 11px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.pm__field input {
  padding: 13px 14px;
  background: var(--surface);
  border: 1px solid var(--line);
  border-radius: 8px;
  font-size: 16px;
  color: var(--text);
  transition: border-color .18s ease;
  min-height: 48px;
}
.pm__field input::placeholder { color: var(--muted-dim); }
.pm__field input:focus { border-color: var(--accent); }
.pm__field.is-invalid input { border-color: rgba(255,122,89,.55); }
.pm__field.is-invalid input:focus { border-color: rgba(255,122,89,.85); }

.pm__consent { display: flex; align-items: flex-start; gap: 10px; cursor: pointer; padding: 4px 0; user-select: none; }
.pm__consent-input { position: absolute; width: 1px; height: 1px; opacity: 0; pointer-events: none; }
.pm__consent-box {
  flex: none; width: 20px; height: 20px; margin-top: 1px;
  display: grid; place-items: center;
  border: 1.5px solid var(--line); border-radius: 4px;
  background: var(--surface);
  transition: border-color .18s, background-color .18s;
}
.pm__consent-tick { width: 14px; height: 14px; fill: none; stroke: #fff; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; opacity: 0; transition: opacity .15s; }
.pm__consent.is-on .pm__consent-box { background: var(--accent); border-color: var(--accent); }
.pm__consent.is-on .pm__consent-tick { opacity: 1; }
.pm__consent-text { color: var(--muted); font-size: 12px; line-height: 1.5; }
.pm__consent-text a { color: var(--text); text-decoration: underline; text-underline-offset: 2px; }
.pm__consent-text a:hover { color: var(--accent); }

.pm__error {
  font-size: 13px; color: #ff7a59;
  padding: 10px 12px; border-radius: 6px;
  background: rgba(255,122,89,.08); border: 1px solid rgba(255,122,89,.3);
}

.pm__submit[disabled] { opacity: .35; cursor: not-allowed; transform: none; filter: none; }

/* ── Success ───────────────────────────────────────────── */
.pm__done {
  display: flex; flex-direction: column; align-items: center; text-align: center;
  gap: 14px; padding-block: 8px 4px;
}
.pm__ok-wrap {
  position: relative;
  width: 88px; height: 88px;
  display: grid; place-items: center;
  margin-bottom: 4px;
}
.pm__ok-ring { position: absolute; inset: 0; width: 100%; height: 100%; }
.pm__ok-ring circle {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: pm-ring .9s cubic-bezier(.65,.05,.36,1) forwards;
}
@keyframes pm-ring { to { stroke-dashoffset: 0; } }
.pm__ok {
  position: relative;
  width: 56px; height: 56px;
  display: grid; place-items: center;
  background: var(--grad-accent);
  border-radius: 50%;
  color: #fff;
  transform: scale(0);
  animation: pm-pop .45s cubic-bezier(.34,1.56,.64,1) forwards;
  animation-delay: .55s;
  box-shadow: 0 0 0 6px rgba(249,112,2,.10);
}
@keyframes pm-pop { to { transform: scale(1); } }
.pm__ok-tick { width: 30px; height: 30px; stroke: #fff; stroke-width: 2.4; fill: none; stroke-linecap: round; stroke-linejoin: round; }
.pm__ok-tick path {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  animation: pm-tick .35s ease forwards;
  animation-delay: .85s;
}
@keyframes pm-tick { to { stroke-dashoffset: 0; } }
.pm__done-title {
  font-family: var(--font-head); font-weight: 700;
  font-size: 22px;
  opacity: 0;
  animation: pm-fade-up .4s ease forwards;
  animation-delay: 1.05s;
}
.pm__done-text {
  color: var(--muted); font-size: 14px; line-height: 1.55;
  opacity: 0;
  animation: pm-fade-up .4s ease forwards;
  animation-delay: 1.2s;
}
.pm__done .btn {
  opacity: 0;
  animation: pm-fade-up .4s ease forwards;
  animation-delay: 1.35s;
}
@keyframes pm-fade-up {
  from { opacity: 0; transform: translateY(6px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── Modal transitions ─────────────────────────────────── */
.modal-enter-active, .modal-leave-active { transition: opacity .28s ease; }
.modal-enter-active .pm__card, .modal-leave-active .pm__card { transition: transform .32s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.modal-enter-from .pm__card, .modal-leave-to .pm__card { transform: translateY(20px); }

.pm-fade-enter-active, .pm-fade-leave-active { transition: opacity .22s ease; }
.pm-fade-enter-from, .pm-fade-leave-to { opacity: 0; }

@media (min-width: 460px) {
  .pm { align-items: center; padding: 24px; }
  .pm__card { border-radius: 14px; border: 1px solid var(--line); padding: 26px 22px; max-height: calc(100svh - 48px); }
}
@media (min-width: 600px) {
  .pm__card { padding: 32px 28px; }
}
</style>

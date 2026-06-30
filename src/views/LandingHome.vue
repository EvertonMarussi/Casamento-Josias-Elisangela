<template>
  <div class="wedding-page">
    <!-- ============ 1. HERO / CARTA (ENVELOPE) ============ -->
    <section style="height: 100vh; display: flex; justify-content: center; align-items: center; background-color: #6e7350;" aria-label="Capa do convite">
      <picture>
        <!-- Desktop -->
        <source
          media="(min-width: 992px)"
          srcset="@/assets/carta-desktop.png"
        >

        <!-- Tablet -->
        <source
          media="(min-width: 600px)"
          srcset="@/assets/carta-tablet.png"
        >

        <!-- Celular -->
        <img
          src="@/assets/j-e-carta.png"
          alt=""
          class="convite-img"
        >
      </picture>
    </section>

    <!-- ============ 2. CASAL + PLAYER ============ -->
    <section class="section couple-section" aria-label="Nossa história">
      <div class="couple-card">
        <div class="couple-photo">
          <img
            src="../assets/joasias-elisangela.jpeg"
            alt="Josias e Elisangela se abraçando em um jardim"
            loading="lazy"
          />
        </div>

        <p class="couple-quote">
          Há 25 anos, Deus uniu duas vidas para escrever uma linda história de
          amor. Aperte o play e celebre esse capítulo conosco.
        </p>

        <div class="player">
          <p class="player__label">Dê o play em nossa canção</p>

          <div class="player__progress">
            <input
              type="range"
              class="player__range"
              min="0"
              :max="duration || 0"
              step="0.1"
              v-model.number="currentTime"
              @input="seek"
              :style="progressStyle"
              aria-label="Progresso da música"
            />
          </div>

          <div class="player__controls">
            <button class="player__icon-btn" type="button" @click="toggleShuffle" :class="{ 'is-active': shuffle }" aria-label="Aleatório">
              <svg viewBox="0 0 24 24"><path d="M3 6h3.5c1.2 0 2.3.6 3 1.6l1 1.4M3 18h3.5c1.2 0 2.3-.6 3-1.6l5-7c.7-1 1.8-1.6 3-1.6H21M17.5 4.5 21 8l-3.5 3.5M17.5 19.5 21 16l-3.5-3.5" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
            <button class="player__icon-btn" type="button" @click="restart" aria-label="Reiniciar música">
              <svg viewBox="0 0 24 24"><path d="M6 5v14M18 5 7 12l11 7z" fill="currentColor"/></svg>
            </button>
            <button class="player__play-btn" type="button" @click="togglePlay" :aria-label="isPlaying ? 'Pausar' : 'Tocar'">
              <svg v-if="!isPlaying" viewBox="0 0 24 24" class="icon-play"><path d="M7 4.5v15l13-7.5z" fill="currentColor"/></svg>
              <svg v-else viewBox="0 0 24 24" class="icon-pause"><path d="M6 4.5h4v15H6zM14 4.5h4v15h-4z" fill="currentColor"/></svg>
            </button>
            <button class="player__icon-btn" type="button" @click="restart" aria-label="Próxima">
              <svg viewBox="0 0 24 24"><path d="M18 5v14M6 5l11 7-11 7z" fill="currentColor"/></svg>
            </button>
            <button class="player__icon-btn" type="button" @click="toggleLoop" :class="{ 'is-active': loop }" aria-label="Repetir">
              <svg viewBox="0 0 24 24"><path d="M17 2l4 4-4 4M3 11V9a4 4 0 0 1 4-4h14M7 22l-4-4 4-4M21 13v2a4 4 0 0 1-4 4H3" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
            </button>
          </div>

          <p class="player__song">So Close</p>

          <audio
            ref="audioEl"
            :src="audioMsc"
            preload="metadata"
            :loop="loop"
            @timeupdate="onTimeUpdate"
            @loadedmetadata="onLoadedMetadata"
            @ended="onEnded"
          ></audio>
        </div>
      </div>
    </section>

    <!-- ============ 3. CALENDÁRIO + CONTAGEM ============ -->
    <section class="section calendar-section" aria-label="Data do casamento">
      <div class="calendar-card">
        <p class="calendar-blessing">
          Com alegria, convidamos você para celebrar conosco as Bodas de Prata.
        </p>

        <div class="calendar-date-row">
          <p class="calendar-month">Setembro</p>
          <div class="calendar-day-block">
            <span class="calendar-day-script">6</span>
          </div>
          <p class="calendar-year">2026</p>
        </div>

        <p class="calendar-faltan">Faltam</p>

        <div class="countdown">
          <div class="countdown__unit">
            <span class="countdown__value">{{ pad(countdown.days) }}</span>
            <span class="countdown__label">Dias</span>
          </div>
          <span class="countdown__colon">:</span>
          <div class="countdown__unit">
            <span class="countdown__value">{{ pad(countdown.hours) }}</span>
            <span class="countdown__label">Horas</span>
          </div>
          <span class="countdown__colon">:</span>
          <div class="countdown__unit">
            <span class="countdown__value">{{ pad(countdown.minutes) }}</span>
            <span class="countdown__label">Min</span>
          </div>
          <span class="countdown__colon">:</span>
          <div class="countdown__unit">
            <span class="countdown__value">{{ pad(countdown.seconds) }}</span>
            <span class="countdown__label">Seg</span>
          </div>
        </div>

        <p class="calendar-grand-day" style=" font-size: 1.8rem">O Grande Dia</p>
        <p class="calendar-month-year" style=" font-size: 1.3rem">Setembro 2026</p>

        <div class="mini-calendar">
          <div class="mini-calendar__weekdays">
            <span v-for="d in weekDays" :key="d">{{ d }}</span>
          </div>
          <div class="mini-calendar__grid">
            <span
              v-for="(cell, idx) in calendarCells"
              :key="idx"
              class="mini-calendar__cell"
              :class="{ 'is-empty': !cell, 'is-highlight': cell === weddingDayOfMonth }"
            >
              <template v-if="cell">
                <span v-if="cell === weddingDayOfMonth" class="mini-calendar__heart">
                  <svg viewBox="0 0 32 32"><path d="M16 25.5S5 18.8 5 11.4C5 6.8 8.6 4 12.3 4c2.6 0 4.4 1.6 3.7 1.6S18.1 4 20.7 4C24.4 4 28 6.8 28 11.4c0 7.4-12 14.1-12 14.1Z" fill="none" stroke="currentColor" stroke-width="1.3"/></svg>
                  <span class="mini-calendar__num">{{ cell }}</span>
                </span>
                <template v-else>{{ cell }}</template>
              </template>
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============ 4. NOSSO DIA ESPECIAL (SCHEDULE) ============ -->
    <section class="section schedule-section" aria-label="Programação do dia">
      <div class="schedule-bg">
        <img
          src="../assets/j-e-dia-esoecial.jpeg"
          alt=""
          class="schedule-bg__img"
          loading="lazy"
        />
        <div class="schedule-overlay"></div>
      </div>
      <div class="schedule-content">
        <p class="schedule-eyebrow" style=" font-size: 0.9rem">Aqui está um vislumbre do</p>
        <h2 class="schedule-title">Nosso Dia<br />Especial</h2>

        <div class="schedule-times">
          <div class="schedule-item">
            <p class="schedule-item__time" style=" font-size: 1.4rem">13:00</p>
            <p class="schedule-item__label" style=" font-size: 1.2rem">Recepção</p>
          </div>
          <div class="schedule-item" style=" font-size: 1.2rem">
            <p class="schedule-item__time" style=" font-size: 1.4rem">13:30</p>
            <p class="schedule-item__label" style=" font-size: 1.2rem">Cerimônia</p>
          </div>
        </div>

        <p class="schedule-footnote" style=" font-size: 1.3rem">
          Após a cerimônia, continuaremos celebrando este momento tão especial
          ao lado de nossos familiares e amigos.
        </p>
      </div>
    </section>

    <!-- ============ 5. LOCAL ============ -->
    <section class="section location-section" aria-label="Local da cerimônia">
      <h2 class="location-title">Local</h2>
      <div class="location-grid">
        <div class="location-text">
          <p style=" font-size: 1rem">Mansão Aricanduva</p>
        </div>

        <div class="location-photo">
          <img
            src="../assets/salao.jpeg"
            alt="Fachada da Mansão Aricanduva"
            loading="lazy"
          />
        </div>

        <div class="location-text">
          <p style=" font-size: 0.9rem">R. Porto Lucena, nº 43<br />Vila Dalila, São Paulo - SP<br />03520-040</p>
        </div>
      </div>

      <a
        class="location-map-btn"
        href="https://www.google.com/maps/search/?api=1&query=R.+Porto+Lucena+43+Vila+Dalila+S%C3%A3o+Paulo+SP+03520-040"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ver no mapa
      </a>
    </section>

    <!-- ============ 6. CÓDIGO DE VESTIMENTA ============ -->
    <section class="section dress-section" aria-label="Código de vestimenta">
      <div class="dress-card">
        <div class="dress-body">
          <h2 class="dress-title" style=" font-size: 1.9rem">Código de vestimenta</h2>
          <p class="dress-subtitle">Social</p>

          <div class="dress-illustration" aria-hidden="true">
            <img
                src="@/assets/couple.png"
                alt=""
                loading="lazy"
            />
          </div>

          <p style=" font-size:1.3rem" class="dress-note">
            Sugerimos traje social para esta <br> ocasião especial 
          </p>
        </div>
      </div>
    </section>

    <!-- ============ 7. CONFIRMAÇÃO ============ -->
    <section class="section rsvp-section" aria-label="Confirmação de presença">
      <div class="rsvp-card">
        <div class="rsvp-icon" aria-hidden="true">
          <svg viewBox="0 0 48 48">
            <rect x="6" y="10" width="36" height="32" rx="4" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path d="M6 18h36" stroke="currentColor" stroke-width="1.6" fill="none" />
            <circle cx="15" cy="9" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6" />
            <circle cx="24" cy="7.5" r="2.4" fill="none" stroke="currentColor" stroke-width="1.6" />
            <circle cx="33" cy="9" r="2.2" fill="none" stroke="currentColor" stroke-width="1.6" />
            <path
              d="M24 33s-7.5-4.6-7.5-9.7c0-2.8 2.1-4.8 4.6-4.8 1.7 0 3 1 2.9 1 -.1 0 1.2-1 2.9-1 2.5 0 4.6 2 4.6 4.8C31.5 28.4 24 33 24 33Z"
              fill="none"
              stroke="currentColor"
              stroke-width="1.5"
            />
          </svg>
        </div>

        <h2 class="rsvp-title" style=" font-size: 2.5rem">Confirmação</h2>
        <p class="rsvp-text" style=" font-size: 1.2rem">
          Confirme sua presença e participe desse momento especial conosco.
        </p>

        <a class="rsvp-btn" :href="rsvpLink" target="_blank" rel="noopener noreferrer" style=" font-size: 1.5rem">
          Confirmar presença
        </a>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import audioMsc from '../../public/audio/so-close.mp3'

/* ==========================================================
   LINK DE CONFIRMAÇÃO
   Troque pela URL real do seu formulário (Google Forms, RSVP, etc.)
========================================================== */
const rsvpLink = ref('https://docs.google.com/forms/d/e/1FAIpQLSdkiUlek4NPPBia9wPMRzd-gfsbQkaBm_oAs9v7_XrvXUFBJQ/viewform?usp=sharing&ouid=106685628413481898257')

/* ==========================================================
   CONTAGEM REGRESSIVA — 06/09/2026 às 12h30
========================================================== */
const weddingDate = new Date(2026, 8, 6, 12, 30, 0) // mês 8 = setembro (zero-indexed)

const countdown = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
  seconds: 0,
})

let countdownTimer = null

function updateCountdown() {
  const now = new Date()
  let diff = weddingDate.getTime() - now.getTime()
  if (diff < 0) diff = 0

  const totalSeconds = Math.floor(diff / 1000)
  countdown.days = Math.floor(totalSeconds / 86400)
  countdown.hours = Math.floor((totalSeconds % 86400) / 3600)
  countdown.minutes = Math.floor((totalSeconds % 3600) / 60)
  countdown.seconds = totalSeconds % 60
}

function pad(value) {
  return String(value).padStart(2, '0')
}

/* ==========================================================
   MINI CALENDÁRIO — Setembro de 2026
========================================================== */
const weekDays = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb', 'Dom']
const weddingDayOfMonth = 6

const calendarCells = computed(() => {
  // Setembro de 2026: dia 1 cai numa terça-feira (getDay: 0=Dom..6=Sáb)
  const year = 2026
  const monthIndex = 8 // setembro
  const firstWeekday = new Date(year, monthIndex, 1).getDay() // 0=Dom
  // Convertendo para semana iniciando na Segunda (Seg=0 ... Dom=6)
  const leadingBlanks = (firstWeekday + 6) % 7
  const daysInMonth = new Date(year, monthIndex + 1, 0).getDate()

  const cells = Array.from({ length: leadingBlanks }, () => null)
  for (let day = 1; day <= daysInMonth; day++) {
    cells.push(day)
  }
  return cells
})

/* ==========================================================
   PLAYER DE ÁUDIO — "So Close"
========================================================== */
const audioEl = ref(null)
const isPlaying = ref(false)
const currentTime = ref(0)
const duration = ref(0)
const shuffle = ref(false)
const loop = ref(false)

const progressStyle = computed(() => {
  const pct = duration.value ? (currentTime.value / duration.value) * 100 : 0
  return {
    '--progress': `${pct}%`,
  }
})

function togglePlay() {
  const audio = audioEl.value
  if (!audio) return
  if (audio.paused) {
    audio.play()
    isPlaying.value = true
  } else {
    audio.pause()
    isPlaying.value = false
  }
}

function restart() {
  const audio = audioEl.value
  if (!audio) return
  audio.currentTime = 0
  currentTime.value = 0
}

function toggleShuffle() {
  shuffle.value = !shuffle.value
}

function toggleLoop() {
  loop.value = !loop.value
}

function seek() {
  const audio = audioEl.value
  if (!audio) return
  audio.currentTime = currentTime.value
}

function onTimeUpdate() {
  if (!audioEl.value) return
  currentTime.value = audioEl.value.currentTime
}

function onLoadedMetadata() {
  if (!audioEl.value) return
  duration.value = audioEl.value.duration
}

function onEnded() {
  isPlaying.value = false
  currentTime.value = 0
}

/* ==========================================================
   LIFECYCLE
========================================================== */
onMounted(() => {
  updateCountdown()
  countdownTimer = setInterval(updateCountdown, 1000)
})

onUnmounted(() => {
  if (countdownTimer) clearInterval(countdownTimer)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Allura&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=EB+Garamond:ital@0;1&display=swap');

/* ==========================================================
   TOKENS
========================================================== */
:root {
  --sage: #6e7350;
  --sage-deep: #5c6044;
  --sage-light: #888d68;
  --cream: #f7f3ec;
  --cream-deep: #efe9de;
  --ink: #1f1e1b;
  --ink-soft: #2a2924;
  --paper: #faf8f4;
  --gold-text: #f1ecdf;

  --font-script: 'Allura', cursive;
  --font-display: 'Playfair Display', serif;
  --font-serif: 'Cormorant Garamond', serif;
  --font-serif-alt: 'EB Garamond', serif;
}

/* ==========================================================
   BASE / RESET
========================================================== */
.wedding-page * {
  box-sizing: border-box;
}

.wedding-page {
  background: var(--paper);
  color: var(--ink);
  font-family: var(--font-serif-alt);
  line-height: 1.5;
  overflow-x: hidden;
}

.wedding-page img {
  display: block;
  max-width: 100%;
}

.section {
  position: relative;
  width: 100%;
  padding: clamp(56px, 9vw, 96px) 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* ==========================================================
   1. HERO — ENVELOPE
========================================================== */
.hero-section {
  background: var(--sage);
  min-height: 100vh;
  justify-content: center;
  padding-top: 0;
  padding-bottom: 0;
}

.envelope-wrap {
  width: 100%;
  max-width: 380px;
  perspective: 1400px;
}

.envelope {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3.4;
  filter: drop-shadow(0 22px 40px rgba(0, 0, 0, 0.35));
  border-radius: 3px;
  overflow: hidden;
}

.envelope__back {
  position: absolute;
  inset: 0;
  z-index: 0;
  background: linear-gradient(150deg, var(--sage-light) 0%, var(--sage) 48%, var(--sage-deep) 100%);
}

/* Área superior onde ficam os nomes, acima do vinco da aba */
.envelope__names-area {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 46%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4% 12% 0;
}

.envelope__names {
  font-family: var(--font-script);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0;
  letter-spacing: 0.5px;
  color: var(--gold-text);
  text-align: center;
}

.envelope__name {
  font-size: clamp(1.9rem, 7.5vw, 2.5rem);
  line-height: 1.25;
}

.envelope__amp {
  font-size: clamp(1.4rem, 5vw, 1.8rem);
  line-height: 1.25;
}

/* Sombra suave projetada pelo vinco da aba sobre a área interna do envelope */
.envelope__flap-shadow {
  position: absolute;
  top: 36%;
  left: 0;
  width: 100%;
  height: 28%;
  z-index: 2;
  background: linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.12) 100%);
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  pointer-events: none;
}

/* Vinco/dobra triangular da aba: vértice apontando para cima a partir da base do envelope */
.envelope__flap {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 48%;
  z-index: 3;
  background: linear-gradient(
    20deg,
    var(--sage-deep) 0%,
    var(--sage) 38%,
    var(--sage-light) 62%,
    var(--sage) 100%
  );
  clip-path: polygon(0 100%, 50% 4%, 100% 100%);
  box-shadow: inset 0 8px 18px rgba(0, 0, 0, 0.12);
}

.envelope__flap::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0.18) 0%, transparent 14%);
  clip-path: polygon(0 100%, 50% 4%, 100% 100%);
}

.envelope__date {
  position: absolute;
  bottom: 12%;
  left: 0;
  width: 100%;
  z-index: 4;
  text-align: center;
  margin: 0;
  font-family: var(--font-serif-alt);
  font-size: 0.92rem;
  letter-spacing: 2px;
  color: var(--gold-text);
  opacity: 0.92;
}

.hero-scroll-hint {
  color: var(--gold-text);
  opacity: 0.75;
  font-size: 0.8rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  font-family: var(--font-serif-alt);
}

/* ==========================================================
   2. CASAL + PLAYER
========================================================== */
.couple-section {
  background: var(--cream);
}

.couple-card {
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.couple-photo {
  width: 100%;
  border-radius: 2px;
  overflow: hidden;
  box-shadow: 0 18px 38px rgba(31, 30, 27, 0.16);
  aspect-ratio: 4 / 5;
}

.couple-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.couple-quote {
  text-align: center;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.4rem;
  line-height: 1.6;
  color: var(--ink-soft);
  max-width: 360px;
  margin: 0;
}

.player {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
}

.player__label {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 1.3rem;
  color: var(--ink-soft);
  margin: 0;
}

.player__progress {
  width: 100%;
  max-width: 320px;
}

.player__range {
  -webkit-appearance: none;
  appearance: none;
  width: 100%;
  height: 2px;
  border-radius: 2px;
  background: linear-gradient(
    to right,
    var(--sage) 0%,
    var(--sage) var(--progress, 0%),
    #d8d2c4 var(--progress, 0%),
    #d8d2c4 100%
  );
  cursor: pointer;
}

.player__range::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 11px;
  height: 11px;
  border-radius: 50%;
  background: var(--sage);
  cursor: pointer;
  margin-top: -0.5px;
}

.player__range::-moz-range-thumb {
  width: 11px;
  height: 11px;
  border: none;
  border-radius: 50%;
  background: var(--sage);
  cursor: pointer;
}

.player__controls {
  display: flex;
  align-items: center;
  gap: 22px;
}

.player__icon-btn {
  background: none;
  border: none;
  padding: 0;
  width: 20px;
  height: 20px;
  color: var(--ink-soft);
  opacity: 0.6;
  cursor: pointer;
  transition: opacity 0.2s ease, color 0.2s ease;
}

.player__icon-btn svg {
  width: 100%;
  height: 100%;
}

.player__icon-btn.is-active,
.player__icon-btn:hover {
  opacity: 1;
  color: var(--sage-deep);
}

.player__play-btn {
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: var(--ink);
  color: var(--cream);
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: transform 0.15s ease, background 0.2s ease;
}

.player__play-btn:hover {
  transform: scale(1.05);
  background: var(--sage-deep);
}

.player__play-btn svg {
  width: 20px;
  height: 20px;
}

.icon-play {
  margin-left: 2px;
}

.player__song {
  font-family: var(--font-serif-alt);
  font-size: 1.3rem;
  letter-spacing: 1px;
  color: var(--ink-soft);
  opacity: 0.7;
  margin: 0;
}

/* ==========================================================
   3. CALENDÁRIO + CONTAGEM REGRESSIVA
========================================================== */
.calendar-section {
  background: var(--sage);
}

.calendar-card {
  width: 100%;
  max-width: 380px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  text-align: center;
  color: var(--gold-text);
}

.calendar-blessing {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  line-height: 1.6;
  margin: 0;
  max-width: 320px;
}

.calendar-date-row {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0;
  width: 100%;
}

.calendar-month {
  font-family: var(--font-serif-alt);
  letter-spacing: 3px;
  font-size: 0.85rem;
  text-transform: uppercase;
  margin: 0;
  flex: 1;
  position: relative;
  top: -22px;
}

.calendar-year {
  font-family: var(--font-serif-alt);
  letter-spacing: 3px;
  font-size: 0.85rem;
  margin: 0;
  flex: 1;
  position: relative;
  top: -22px;
}

.calendar-month::after,
.calendar-year::after {
  content: '';
  display: block;
  height: 1px;
  background: var(--gold-text);
  opacity: 0.55;
  margin-top: 10px;
}

.calendar-day-block {
  flex: 0 0 auto;
  width: 90px;
}

.calendar-day-script {
  font-family: var(--font-script);
  font-size: 4.2rem;
  line-height: 1;
  display: inline-block;
  transform: rotate(-4deg);
}

.calendar-faltan {
  font-family: var(--font-serif-alt);
  letter-spacing: 3px;
  text-transform: uppercase;
  font-size: 0.95rem;
  margin: -10px 0 0;
}

.countdown {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
  width: 100%;
}

.countdown__unit {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  min-width: 56px;
}

.countdown__value {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 7vw, 2.6rem);
  font-weight: 500;
  line-height: 1;
  letter-spacing: 1px;
}

.countdown__colon {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 7vw, 2.6rem);
  line-height: 1;
  opacity: 0.7;
  transform: translateY(-2px);
}

.countdown__label {
  font-family: var(--font-serif-alt);
  font-size: 0.7rem;
  letter-spacing: 1px;
  text-transform: capitalize;
  opacity: 0.85;
}

.calendar-grand-day {
  font-family: var(--font-display);
  font-size: 1.5rem;
  margin: 10px 0 -8px;
  letter-spacing: 0.5px;
}

.calendar-month-year {
  font-family: var(--font-serif-alt);
  letter-spacing: 2px;
  text-transform: uppercase;
  font-size: 0.85rem;
  margin: 0;
  opacity: 0.9;
}

.mini-calendar {
  width: 100%;
  margin-top: 4px;
}

.mini-calendar__weekdays {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  font-family: var(--font-serif-alt);
  font-size: 0.68rem;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  opacity: 0.85;
  margin-bottom: 14px;
}

.mini-calendar__grid {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  row-gap: 14px;
  font-family: var(--font-serif);
  font-size: 0.95rem;
}

.mini-calendar__cell {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
}

.mini-calendar__heart {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
}

.mini-calendar__heart svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  color: var(--gold-text);
}

.mini-calendar__num {
  position: relative;
  z-index: 1;
  font-size: 0.85rem;
}

/* ==========================================================
   4. NOSSO DIA ESPECIAL — SCHEDULE
========================================================== */
.schedule-section {
  min-height: auto;
  padding: 0;
  color: var(--cream);
  overflow: hidden;
}

.schedule-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.schedule-bg__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: grayscale(1) contrast(1.05);
}

.schedule-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(20, 19, 17, 0.55) 0%,
    rgba(20, 19, 17, 0.72) 55%,
    rgba(20, 19, 17, 0.86) 100%
  );
}

.schedule-content {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 520px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 18px;
  padding: clamp(72px, 14vw, 120px) 24px;
}

.schedule-eyebrow {
  font-family: var(--font-serif-alt);
  font-size: 0.75rem;
  letter-spacing: 3px;
  text-transform: uppercase;
  opacity: 0.85;
  margin: 0;
}

.schedule-content .schedule-title {
  font-family: var(--font-display);
  font-size: clamp(1.9rem, 6vw, 2.6rem);
  font-weight: 600;
  text-transform: uppercase;
  line-height: 1.25;
  letter-spacing: 1px;
  margin: 0;
  color: #dfd9ce;
}

.schedule-times {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: clamp(24px, 6vw, 56px);
  margin-top: 20px;
}

.schedule-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
}

.schedule-item__time {
  font-family: var(--font-display);
  font-size: 1.3rem;
  margin: 0;
}

.schedule-item__label {
  font-family: var(--font-serif-alt);
  font-size: 0.68rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  opacity: 0.85;
  margin: 0;
}

.schedule-footnote {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.95rem;
  line-height: 1.7;
  color: #dfd9ce;
  max-width: 380px;
  opacity: 0.92;
  margin: 24px 0 0;
}

/* ==========================================================
   5. LOCAL
========================================================== */
.location-section {
  background: var(--sage);
  gap: 36px;
}

.location-section .location-title {
  font-family: var(--font-display);
  font-size: clamp(2rem, 6vw, 2.6rem);
  letter-spacing: 1px;
  margin: 0;
  color: var(--paper);
}

.location-grid {
  width: 100%;
  max-width: 880px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
}

.location-grid .location-photo {
  order: -1;
}

.location-text {
  font-family: var(--font-serif-alt);
  font-size: 0.78rem;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  line-height: 1.7;
  margin: 0;
  color: var(--paper);
  text-align: center;
}

.location-text p {
  margin: 0;
  color: inherit;
}

.location-photo {
  width: clamp(200px, 52vw, 280px);
  aspect-ratio: 3 / 4;
  overflow: hidden;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.18);
}

.location-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  /*filter: grayscale(1) contrast(1.05);*/
}

.location-map-btn {
  display: inline-block;
  background: var(--ink);
  color: var(--cream);
  font-family: var(--font-serif-alt);
  font-size: 0.72rem;
  letter-spacing: 2px;
  text-transform: uppercase;
  text-decoration: none;
  padding: 16px 32px;
  transition: background 0.2s ease, transform 0.15s ease;
}

.location-map-btn:hover {
  background: var(--sage-deep);
  transform: translateY(-1px);
}

/* ==========================================================
   6. CÓDIGO DE VESTIMENTA
========================================================== */
.dress-section {
  background: #f7f3ec;
  padding: 0;
}

.dress-card {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
}

.dress-photo-strip {
  width: 100%;
  height: clamp(90px, 16vw, 140px);
  overflow: hidden;
}

.dress-photo-strip img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.dress-body {
  background: var(--cream);
  padding: clamp(36px, 8vw, 56px) 28px clamp(48px, 9vw, 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
}

.dress-body .dress-title {
  font-family: var(--font-script);
  font-size: clamp(1.8rem, 6vw, 2.2rem);
  color: var(--ink-soft);
  margin: 0;
}

.dress-subtitle {
  font-family: var(--font-serif-alt);
  font-size: 1rem;
  letter-spacing: 1px;
  color: var(--ink-soft);
  margin: 0 0 6px;
}

.dress-illustration {
  width: 100%;
  max-width: 210px;
  height: 110px;
  margin: 4px 0 8px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
  margin-top: 20px;
}

.dress-note {
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 0.92rem;
  line-height: 1.7;
  color: var(--ink-soft);
  margin: 0;
}

/* ==========================================================
   7. CONFIRMAÇÃO
========================================================== */
.rsvp-section {
  background: var(--sage);
}

.rsvp-card {
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 14px;
  color: var(--gold-text);
}

.rsvp-icon {
  width: 46px;
  height: 46px;
  margin-bottom: 6px;
}

.rsvp-icon svg {
  width: 100%;
  height: 100%;
  color: var(--gold-text);
}

.rsvp-card .rsvp-title {
  font-family: var(--font-script);
  font-size: clamp(2rem, 7vw, 2.4rem);
  margin: 0;
  color: var(--gold-text);
}

.rsvp-text {
  font-family: var(--font-serif-alt);
  font-size: 0.88rem;
  line-height: 1.7;
  opacity: 0.92;
  margin: 0 0 8px;
}

.rsvp-btn {
  display: inline-block;
  border: 1px solid var(--gold-text);
  border-radius: 999px;
  color: var(--gold-text);
  text-decoration: none;
  font-family: var(--font-script);
  font-size: 1.2rem;
  padding: 10px 32px;
  transition: background 0.2s ease, color 0.2s ease;
}

.rsvp-btn:hover {
  background: var(--gold-text);
  color: var(--sage-deep);
}

/* ==========================================================
   RESPONSIVE — TABLET / DESKTOP
========================================================== */
@media (min-width: 720px) {
  .location-grid {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 40px;
  }

  .location-grid .location-photo {
    order: 0;
  }

  .location-text {
    flex: 1;
    max-width: 220px;
    font-size: 0.8rem;
  }

  .couple-card {
    max-width: 460px;
  }
}

@media (min-width: 960px) {
  .envelope-wrap {
    max-width: 440px;
  }

  .schedule-content {
    max-width: 640px;
  }

  .location-grid {
    max-width: 960px;
    gap: 48px;
  }
}

/* ==========================================================
   ACCESSIBILITY — REDUCED MOTION
========================================================== */
@media (prefers-reduced-motion: reduce) {
  .player__play-btn,
  .location-map-btn {
    transition: none;
  }
}

.convite-img {
    display: block;
    margin: 0 auto;
}

@media (max-width: 599px) {
    .convite-img {
        width: 100%;
        height: 100vh;
        object-fit: cover;
    }
}

@media (min-width: 600px) and (max-width: 991px) {
    .convite-img {
        width: auto;
        max-width: 100%;
        height: 100vh;
        object-fit: contain;
    }
}

@media (min-width: 992px) {
    .convite-img {
        width: auto;
        max-width: 100%;
        height: 100vh;
        object-fit: contain;
    }
}
</style>
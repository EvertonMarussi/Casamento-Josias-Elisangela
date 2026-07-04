<template>
  <div>

    <div style="width: 100%; height: 100vh; position: fixed;">

    </div>

    <div v-if="loading" class="preloader">
      <div class="preloader__inner">
        <div class="contador">{{ progress }}%</div>
      </div>
    </div>
    
    <div v-else-if="!loading" class="home-page-root">
      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- HERO SECTION, intocada                               -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <section class="hero-section">
        <div class="video-container">
          <video autoplay muted loop playsinline class="bg-video">
            <source src="@/assets/videoHome.mp4" type="video/mp4" />
          </video>
          <div class="overlay-gradient"></div>
        </div>
    
        <div class="hero-content poppins-regular">
          <div class="text-wrapper">
            <h1 class="hero-title poppins">
              Recupere o reino invadido e <span class="gradient-text">salve e princesa</span> 
            </h1>
            <p class="hero-description">
              A princesa foi sequestrada e o reino foi invadido. Sua missão é combater monstros, matar o rei e recuperar a princesa
            </p>
    
            <div class="cta-group">
              <button ref="btn1" class="btn-primary poppins-semibold" @click="scrollTo('jogo')">
                CONFERIR JOGO
              </button>
              <button ref="btn2" class="btn-outline poppins-semibold" @click="scrollTo('sobre')">
                SAIBA MAIS
              </button>
            </div>
          </div>
        </div>
    
        <div class="scroll-indicator" @click="scrollTo('motivacao')">
          <span class="material-symbols-outlined">expand_more</span>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- SEÇÃO: MOTIVAÇÃO                                       -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <section id="motivacao" class="section motivacao-section">
        <div class="section-container">
          <div class="section-label gsap-fade">Nossa Missão</div>
          <h2 class="section-title gsap-fade">
            Por que criamos <span class="green-accent">isso</span>
          </h2>
          <p class="section-subtitle gsap-fade">
            Quatro estudantes, uma missão: transformar uma história épica em uma experiência interativa inesquecível.
          </p>

          <div class="motivacao-grid">
            <div
              v-for="(item, i) in motivacoes"
              :key="i"
              class="motivacao-card gsap-stagger"
            >
              <div class="mcard-icon">
                <span class="material-symbols-outlined">{{ item.icon }}</span>
              </div>
              <h3 class="mcard-title">{{ item.titulo }}</h3>
              <p class="mcard-desc">{{ item.desc }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- SEÇÃO: HISTÓRIA, Timeline de capítulos               -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <section id="historia" class="section historia-section">
        <div class="noise-overlay"></div>
        <div class="section-container">
          <div class="section-label gsap-fade">Narrativa</div>
          <h2 class="section-title gsap-fade">
            A <span class="green-accent">História</span>
          </h2>
          <p class="section-subtitle gsap-fade">
            Uma saga de amor, traição e redenção. Descubra os capítulos que moldam o mundo do jogo.
          </p>

          <div class="timeline">
            <div
              v-for="(cap, i) in capitulos"
              :key="i"
              class="timeline-item gsap-timeline-item"
              :class="i % 2 === 0 ? 'left' : 'right'"
            >
              <div class="timeline-badge">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="timeline-card">
                <div class="tcard-chapter">Capítulo {{ String(i + 1).padStart(2, '0') }}</div>
                <h3 class="tcard-title">{{ cap.titulo }}</h3>
                <p class="tcard-desc">{{ cap.desc }}</p>
                <div class="tcard-tag">{{ cap.tag }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- SEÇÃO: MISSÃO                                          -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <section id="missao" class="section missao-section">
        <div class="section-container">
          <div class="section-label gsap-fade">Objetivos</div>
          <h2 class="section-title gsap-fade">
            Sua <span class="green-accent">Missão</span>
          </h2>
          <p class="section-subtitle gsap-fade">
            Você é o camponês. O destino do reino está em suas mãos. Quatro etapas separam você da vitória.
          </p>

          <div class="missao-wrapper">
            <div class="missao-image-panel gsap-fade-left">
              <div class="missao-img-box">
                <img src="@/assets/CampPrin.jpeg" alt="">
                <div class="missao-img-glow"></div>
              </div>
            </div>
            <div class="missao-steps gsap-fade-right">
              <div
                v-for="(step, i) in missoes"
                :key="i"
                class="missao-step"
              >
                <div class="step-num">{{ String(i + 1).padStart(2, '0') }}</div>
                <div class="step-body">
                  <div class="step-icon">
                    <span class="material-symbols-outlined">{{ step.icon }}</span>
                  </div>
                  <div class="step-text">
                    <h3>{{ step.titulo }}</h3>
                    <p>{{ step.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- SEÇÃO: BESTIÁRIO & ANTAGONISTAS                        -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <section id="bestiario" class="section bestiario-section">
        <div class="noise-overlay"></div>
        <div class="section-container">
          <div class="section-label gsap-fade">Inimigos</div>
          <h2 class="section-title gsap-fade">
            O <span class="green-accent">Bestiário</span>
          </h2>
          <p class="section-subtitle gsap-fade">
            O rei não apenas conquistou com espadas, ele trouxe criaturas das sombras para guardar o reino caído.
          </p>

          <div class="bestiary-grid">
            <div
              v-for="(besta, i) in bestiario"
              :key="i"
              class="besta-card gsap-stagger"
            >
              <div class="besta-image">
                <img :src="besta.img" :alt="besta.nome" />
                <div class="besta-overlay">
                  <span class="besta-role">{{ besta.papel }}</span>
                </div>
              </div>
              <div class="besta-info">
                <div class="besta-threat" :class="'threat-' + besta.ameaca.toLowerCase()">
                  {{ besta.ameaca }}
                </div>
                <h3>{{ besta.nome }}</h3>
                <p>{{ besta.desc }}</p>
                <div class="besta-stats">
                  <div v-for="(val, stat) in besta.stats" :key="stat" class="besta-stat">
                    <span class="stat-label">{{ stat }}</span>
                    <div class="stat-bar">
                      <div class="stat-fill" :style="{ width: val + '%', '--val': val }"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Antagonistas principais -->
          <div class="antagonistas-title gsap-fade">
            <h3>Os <span class="green-accent">Antagonistas Principais</span></h3>
          </div>
          <div class="antagonistas-grid">
            <div
              v-for="(ant, i) in antagonistas"
              :key="i"
              class="antagonista-card gsap-stagger"
            >
              <div>
                <div class="ant-rank">{{ ant.rank }}</div>
  
                <div class="ant-visual" :style="{ background: ant.gradiente }">
                  <span class="material-symbols-outlined ant-icon">{{ ant.icon }}</span>
                </div>
                <h3>{{ ant.nome }}</h3>
                <p>{{ ant.desc }}</p>
              </div>

              <div class="ant-ability">
                <span class="material-symbols-outlined">bolt</span>
                {{ ant.habilidade }}
              </div>
              
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- SEÇÃO: EQUIPE                                          -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <section id="time" class="section equipe-section">
        <div class="section-container">
          <div class="section-label gsap-fade">Desenvolvedores</div>
          <h2 class="section-title gsap-fade">
            A <span class="green-accent">Equipe</span>
          </h2>
          <p class="section-subtitle gsap-fade">
            Quatro mentes, quatro perspectivas, unidos pela paixão de criar experiências que ficam na memória.
          </p>

          <div class="equipe-grid">
            <div
              v-for="(membro, i) in membros"
              :key="i"
              class="membro-card gsap-stagger"
            >
              <div class="membro-avatar" :style="{ background: membro.gradiente }">
                  <img :src="membro.img" />
              </div>
              <div class="membro-info">
                <h3>{{ membro.nome }}</h3>
                <div class="membro-area">{{ membro.area }}</div>
                <p>{{ membro.descricao }}</p>
                <div class="membro-matricula">Matrícula: {{ membro.matricula }}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- ═══════════════════════════════════════════════════════ -->
      <!-- SEÇÃO: CONTATO                                         -->
      <!-- ═══════════════════════════════════════════════════════ -->
      <section id="contato" class="section contato-section">
        <div class="noise-overlay"></div>
        <div class="section-container">
          <div class="section-label gsap-fade">Fale Conosco</div>
          <h2 class="section-title gsap-fade">
            Entre em <span class="green-accent">Contato</span>
          </h2>
          <p class="section-subtitle gsap-fade">
            Tem perguntas sobre o projeto? Quer contribuir ou acompanhar o desenvolvimento?
          </p>

          <div class="contato-grid">
            <a href="mailto:evertonmarussi@gmail.com" class="contato-card gsap-stagger">
              <div class="contato-icon">
                <span class="material-symbols-outlined">mail</span>
              </div>
              <div class="contato-info">
                <span class="contato-label">E-mail</span>
                <span class="contato-value">evertonmarussi@gmail.com</span>
              </div>
            </a>
            <a href="https://github.com/EvertonMarussi" target="_blank" class="contato-card gsap-stagger">
              <div class="contato-icon github-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </div>
              <div class="contato-info">
                <span class="contato-label">Github</span>
                <span class="contato-value">https://github.com/EvertonMarussi</span>
              </div>
            </a>
          </div>

          <div class="contato-grid">
            <a href="mailto:Matheus.silvalima2708@gmail.com" class="contato-card gsap-stagger">
              <div class="contato-icon">
                <span class="material-symbols-outlined">mail</span>
              </div>
              <div class="contato-info">
                <span class="contato-label">E-mail</span>
                <span class="contato-value">Matheus.silvalima2708@gmail.com</span>
              </div>
            </a>
            <a href="https://github.com/Matheus-SL27" target="_blank" class="contato-card gsap-stagger">
              <div class="contato-icon github-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </div>
              <div class="contato-info">
                <span class="contato-label">Github</span>
                <span class="contato-value">https://github.com/Matheus-SL27</span>
              </div>
            </a>
          </div>
          <div class="contato-grid">
            <a href="mailto:gustavonascime123@gmail.com" class="contato-card gsap-stagger">
              <div class="contato-icon">
                <span class="material-symbols-outlined">mail</span>
              </div>
              <div class="contato-info">
                <span class="contato-label">E-mail</span>
                <span class="contato-value">gustavonascime123@gmail.com</span>
              </div>
            </a>
            <a href="https://github.com/GustavoNascimento07" target="_blank" class="contato-card gsap-stagger">
              <div class="contato-icon github-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </div>
              <div class="contato-info">
                <span class="contato-label">Github</span>
                <span class="contato-value">https://github.com/GustavoNascimento07</span>
              </div>
            </a>
          </div>
          <div class="contato-grid">
            <a href="mailto:pedrobritodeoliveira11@gmail.com" class="contato-card gsap-stagger">
              <div class="contato-icon">
                <span class="material-symbols-outlined">mail</span>
              </div>
              <div class="contato-info">
                <span class="contato-label">E-mail</span>
                <span class="contato-value">pedrobritodeoliveira11@gmail.com</span>
              </div>
            </a>
            <a class="contato-card gsap-stagger">
              <div class="contato-icon github-icon">
                <svg viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              </div>
              <div class="contato-info">
                <span class="contato-label">Github</span>
                <span class="contato-value">https://github.com/pedrobritodeoliveira11-arch</span>
              </div>
            </a>
          </div>
        </div>
      </section>

    </div>

    
  </div>
</template>

<script>
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default {
  name: 'HomePage',
  data() {
    return {
      loading: true,
      loadingContent: true,
      progress: 0,

      assets: [
        require('@/assets/videoHome.mp4'),
        require('@/assets/videoHome.mp4'),
        require('@/assets/videoHome.mp4'),
        require('@/assets/videoHome.mp4'),
        require('@/assets/videoHome.mp4'),
        require('@/assets/videoHome.mp4'),
        require('@/assets/videoHome.mp4'),
        require('@/assets/CampPrin.jpeg'),
        require('@/assets/espada-acesa.png'),
        require('@/assets/espada.png'),
        require('@/assets/espectro.png'),
        require('@/assets/golen.png'),
        require('@/assets/Gustavo.png'),
        require('@/assets/lobo.png'),
        require('@/assets/Marussi.png'),
        require('@/assets/Matheus.png'),
        require('@/assets/Pedro.png'),
        require('@/assets/logo.png'),
      ],

      motivacoes: [
        { icon: 'sports_esports', titulo: 'Paixão por Jogos', desc: 'Crescemos jogando e sonhando em criar. Este projeto nasce de anos de inspiração acumulada diante de telas e histórias.' },
        { icon: 'auto_stories', titulo: 'Narrativa como Motor', desc: 'Acreditamos que um bom jogo precisa de uma história. A mecânica é o veículo; o storytelling é o destino.' },
        { icon: 'code', titulo: 'Aprendizado Técnico', desc: 'Este projeto é nosso laboratório vivo, onde teoria encontra prática e cada bug é uma lição disfarçada.' },
        { icon: 'groups', titulo: 'Trabalho em Equipe', desc: 'Quatro mentes, quatro perspectivas. A diversidade de visões foi nossa maior força durante o desenvolvimento.' },
        { icon: 'lightbulb', titulo: 'Desafiar o Convencional', desc: 'Queríamos subverter o RPG clássico. Aqui o herói não é o escolhido, é apenas um camponês determinado.' },
        { icon: 'palette', titulo: 'Arte com Propósito', desc: 'Cada cor no jogo conta uma história. O verde da esperança, o vermelho da corrupção, o dourado da redenção.' },
      ],

      capitulos: [
        {
          titulo: 'O Amor que Desafia Fronteiras',
          desc: 'Nas terras do reino, um amor proibido floresce entre a princesa e um simples camponês. Uma história que desafia as leis de um mundo em paz, mas prestes a ser destruído.',
          tag: '💚 Amor & Esperança'
        },
        {
          titulo: 'Um Café que Mudaria Tudo',
          desc: 'Um dia, contra todos os protocolos, um encontro inesperado em um vilarejo acende a faísca. O camponês jura proteger o que mais ama, sem saber o preço que pagará.',
          tag: '☕ O Encontro'
        },
        {
          titulo: 'O Dia que o Reino Caiu',
          desc: 'O chefe do reino inimigo observava há anos, aguardando o momento certo. Quando os portões cederam, o mundo do camponês desmoronou em chamas e cinzas.',
          tag: '🔥 A Queda'
        },
        {
          titulo: 'O Bestiário',
          desc: 'O rei não apenas conquistou com espadas. Ele trouxe consigo criaturas das sombras, guardiões sobrenaturais que patrulham os campos corrompidos pelo seu poder.',
          tag: '👹 Monstros & Trevas'
        },
        {
          titulo: 'Os Antagonistas',
          desc: 'Três figuras se erguem como pilares do mal: O Cavaleiro Negro, mestre da espada; O Arqueiro, sombra silenciosa; e O Rei, arquiteto de toda a destruição.',
          tag: '⚔️ O Tríplice Mal'
        },
      ],

      missoes: [
        { icon: 'terrain', titulo: 'Atravessar os Campos Corrompidos', desc: 'Os campos outrora férteis foram contaminados pela magia negra do rei. Sobreviva às armadilhas e criaturas que espreitam na névoa.' },
        { icon: 'shield', titulo: 'Derrotar os Guardiões do Rei', desc: 'O Cavaleiro Negro e o Arqueiro protegem o caminho até o trono. Cada um carrega segredos que só a batalha pode revelar.' },
        { icon: 'castle', titulo: 'Enfrentar o Rei no Trono', desc: 'No coração do castelo corrompido, o confronto final aguarda. O rei é mais do que um inimigo, ele é o reflexo de tudo que deu errado.' },
        { icon: 'favorite', titulo: 'Salvar a Princesa', desc: 'A missão culmina no resgate daquele que torna a jornada válida. Mas o verdadeiro preço da liberdade ainda está por ser revelado.' },
      ],

      bestiario: [
        {
          nome: 'Golem de Pedra',
          papel: 'Guardião dos Campos',
          desc: 'Colosso de rocha animada pela magia corrompida. Lento mas devastador, seu impacto treme a terra sob seus pés.',
          img: require('@/assets/golen.png'),
          ameaca: 'ALTO',
          stats: { Força: 95, Velocidade: 20, Defesa: 90 }
        },
        {
          nome: 'Espectro das Sombras',
          papel: 'Atormentador Noturno',
          desc: 'Criatura etérea que ataca na escuridão. Imune a ataques físicos comuns, só pode ser derrotado com magia ou luz.',
          img: require('@/assets/espectro.png'),
          ameaca: 'CRÍTICO',
          stats: { Força: 70, Velocidade: 95, Defesa: 60 }
        },
        {
          nome: 'Lobo Corrompido',
          papel: 'Predador dos Campos',
          desc: 'Outrora nobre criatura da floresta, agora tomada pela corrupção. Caça em alcateia e não conhece misericórdia.',
          img: require('@/assets/lobo.png'),
          ameaca: 'MÉDIO',
          stats: { Força: 65, Velocidade: 85, Defesa: 45 }
        },
      ],

      antagonistas: [
        {
          rank: 'II',
          nome: 'O Cavaleiro Negro',
          desc: 'General implacável do rei, sua armadura absorve a magia e sua lâmina nunca falha. Protege as portas do castelo com honra torta.',
          habilidade: 'Absorção de Magia',
          icon: 'security',
          gradiente: '#000'
        },
        {
          rank: 'III',
          nome: 'O Arqueiro',
          desc: 'Ninguém o vê. Ninguém o ouve. Mas todos sentem sua flecha. Opera nas sombras como extensão da vontade do rei.',
          habilidade: 'Invisibilidade Tática',
          icon: 'my_location',
          gradiente: '#000'
        },
        {
          rank: 'I',
          nome: 'O Rei',
          desc: 'Arquiteto de toda a destruição. Não luta por prazer mas por necessidade estratégica. Quando enfrenta o camponês, é porque tudo mais falhou.',
          habilidade: 'Corrupção Total',
          icon: 'crown',
          gradiente: '#000'
        },
      ],

      membros: [
        {
          nome: 'Everton Marussi',
          area: 'Game Dev & Web site UI/UX',
          matricula: '38861305',
          descricao: 'Atua profissionalmente como Desenvolvedor Full Stack',
          img: require('@/assets/Marussi.png'),
          gradiente: '#000'
        },
        {
          nome: 'Gustavo Nascimento',
          area: 'UI/UX & Game Dev',
          matricula: '38176165',
          descricao: 'Atua profissionalmente como Auxiliar de Administração',
          img: require('@/assets/Gustavo.png'),
          gradiente: 'linear-gradient(135deg, #33cccc, #0a5f5f)'
        },
        {
          nome: 'Pedro Brito',
          area: 'UI/UX & Game Dev',
          matricula: '40315282',
          descricao: 'Atua profissionalmente como Analista de Sinistros',
          img: require('@/assets/Pedro.png'),
          gradiente: 'linear-gradient(135deg, #9d39ff, #3a0080)'
        },
        {
          nome: 'Matheus Silva',
          area: 'Game Design & UI',
          matricula: '38728117',
          descricao: 'Atua profissionalmente como Desenvolvedor Frontend',
          img: require('@/assets/Matheus.png'),
          gradiente: 'linear-gradient(135deg, #ff6b14, #7a2200)'
        }
      ]
    }
  },

  methods: {
    scrollTo(id) {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    },

    startLoader() {
      this.loadingContent = true
      let loaded = 0
      const total = this.assets.length

      const updateProgress = () => {
        loaded++
        this.progress = Math.round((loaded / total) * 100)
        if (loaded === total) this.finishLoading()
      }

      this.assets.forEach(src => {
        const img = new Image()
        img.src = src
        img.onload = updateProgress
        img.onerror = updateProgress
      })
    },

    finishLoading() {
      const smooth = setInterval(() => {
        if (this.progress < 100) {
          this.progress++
        } else {
          clearInterval(smooth)
          this.loading = false
          setTimeout(() => {
            this.loadingContent = false
            this.animateHero()
            this.$nextTick(() => {
              this.initScrollAnimations()
            })
            setTimeout(() => {
              window.scrollTo({ top: 0 });
            }, 50)
          }, 40)
        }
      }, 10)
    },

    animateHero() {
      const btn1 = this.$refs.btn1;
      const btn2 = this.$refs.btn2;

      gsap.set([btn1, btn2], { opacity: 0, scale: 0 });
      gsap.set('.hero-title', { opacity: 0, y: 50 });
      gsap.set('.hero-description', { opacity: 0, y: 30 });
      gsap.set('.scroll-indicator', { opacity: 0 });

      const tl = gsap.timeline({ delay: 0.2 });

      tl.to('.hero-title', { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
        .to('.hero-description', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.5')
        .to([btn1, btn2], { scale: 1, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'back.out(1.7)', clearProps: 'all' }, '-=0.4')
        .to('.scroll-indicator', { opacity: 1, duration: 0.8 }, '-=0.3');

      tl.add(() => {
        gsap.to('.scroll-indicator', { y: 10, duration: 1, repeat: -1, yoyo: true, ease: 'sine.inOut' });
      });

      this.heroTl = tl;
    },

    initScrollAnimations() {
      // Fade simples (labels, títulos, subtítulos)
      gsap.utils.toArray('.gsap-fade').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
          }
        )
      })

      // Cards com stagger por seção
      gsap.utils.toArray('.section').forEach(section => {
        const cards = section.querySelectorAll('.gsap-stagger')
        if (cards.length) {
          gsap.fromTo(cards,
            { opacity: 0, y: 60, scale: 0.95 },
            {
              opacity: 1, y: 0, scale: 1, duration: 0.7, stagger: 0.12, ease: 'power3.out',
              scrollTrigger: { trigger: section, start: 'top 75%', toggleActions: 'play none none none' }
            }
          )
        }
      })

      // Timeline items alternados
      gsap.utils.toArray('.gsap-timeline-item').forEach((el) => {
        const fromX = el.classList.contains('left') ? -80 : 80
        gsap.fromTo(el,
          { opacity: 0, x: fromX },
          {
            opacity: 1, x: 0, duration: 0.9, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 82%', toggleActions: 'play none none none' }
          }
        )
      })

      // Fade esquerda / direita para seção missão
      gsap.utils.toArray('.gsap-fade-left').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, x: -60 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
          }
        )
      })

      gsap.utils.toArray('.gsap-fade-right').forEach(el => {
        gsap.fromTo(el,
          { opacity: 0, x: 60 },
          {
            opacity: 1, x: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 80%', toggleActions: 'play none none none' }
          }
        )
      })

      // Stat bars animadas
      gsap.utils.toArray('.stat-fill').forEach(bar => {
        const val = bar.style.getPropertyValue('--val') || '0'
        gsap.fromTo(bar,
          { width: '0%' },
          {
            width: val + '%', duration: 1.2, ease: 'power2.out',
            scrollTrigger: { trigger: bar, start: 'top 85%', toggleActions: 'play none none none' }
          }
        )
      })
    }
  },

  mounted() {
    setTimeout(()=>{
      this.startLoader()
    },2500)
  },

  unmounted() {
    if (this.heroTl) this.heroTl.kill();
    ScrollTrigger.getAll().forEach(t => t.kill());
    gsap.killTweensOf('*');
  }
}
</script>

<style>
/* ── GLOBAL CSS VARS ── */
:root {
  --green-neon: #39ff14;
  --green-dark: #125f04;
  --green-mid: #1a8c05;
  --green-glow: rgba(57, 255, 20, 0.18);
  --cyan: #33cccc;
  --purple: #7b2fff;
  --bg-deep: #030f03;
  --bg-black: #000;
  --bg-section: linear-gradient(to bottom,
    #000000 0%,
    #060e06 50%,
    #060e06 50%,
    #000000 100%
  );
  --bg-alt: #080808;
  --text-primary: #e8f5e8;
  --text-muted: #a3c3a3;
  --border-subtle: rgba(57, 255, 20, 0.12);
  --card-bg: rgba(10, 25, 10, 0.85);
}

@keyframes shine {
  to { background-position: 300% center; }
}

@keyframes pulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(57,255,20,0.2); }
  50%       { box-shadow: 0 0 40px rgba(57,255,20,0.5); }
}

@keyframes floatY {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-12px); }
}

.hero-title, .hero-description, .scroll-indicator {}
</style>

<style scoped>
/* ─── ROOT ─── */
.home-page-root {
  width: 100%;
  overflow-x: hidden;
  /* background: var(--bg-black); */
}

h1, h2, h3, p { font-family: 'Poppins', sans-serif; }

/* ─── HERO (intacta) ─── */
.hero-section {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  color: #fff;
}
.video-container {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%; z-index: -1;
}
.bg-video { width: 100%; height: 100%; object-fit: cover; }
.overlay-gradient {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  background: linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.3) 50%, #000000 100%);
}
.hero-content { text-align: center; z-index: 1; max-width: 900px; padding: 0 20px; }
.hero-title { font-size: 3.5rem; line-height: 1.1; margin-bottom: 20px; font-weight: 500; }
.gradient-text {
  background: linear-gradient(120deg, #33cccc, #39ff14, #00ff88, #33cccc);
  background-size: 300% auto;
  -webkit-background-clip: text; background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shine 5s linear infinite;
}
.hero-description { font-size: 1.1rem; color: #cbd5e1; max-width: 600px; margin: 0 auto 40px; line-height: 1.6; }
.cta-group { display: flex; gap: 20px; justify-content: center; }
.cta-group button { will-change: transform, opacity; }
.btn-primary {
  background: linear-gradient(45deg, #39ff14, #125f04); background-size: 200% auto;
  border: none; padding: 16px 36px; color: white; border-radius: 50px;
  cursor: pointer; transition: 0.4s; box-shadow: 0 10px 20px rgba(3,148,92,0.3);
}
.btn-primary:hover { background-position: right center; transform: translateY(-3px); box-shadow: 0 15px 25px rgba(2,187,49,0.4); }
.btn-outline {
  background: transparent; border: 2px solid rgba(255,255,255,0.3);
  padding: 16px 36px; color: white; border-radius: 50px;
  cursor: pointer; transition: 0.3s; backdrop-filter: blur(5px);
}
.btn-outline:hover { background: rgba(255,255,255,0.1); border-color: white; }
.scroll-indicator {
  position: absolute; bottom: 40px; left: 50%; transform: translateX(-50%);
  cursor: pointer; color: rgba(255,255,255,0.6); transition: color 0.3s;
}
.scroll-indicator span { font-size: 3rem; }
.scroll-indicator:hover { color: #33cccc; }
.poppins-regular { font-family: 'Poppins', sans-serif; font-weight: 400; }
.poppins-semibold { font-family: 'Poppins', sans-serif; font-weight: 600; }
.poppins-bold { font-family: 'Poppins', sans-serif; font-weight: 500; }

/* ─── PRELOADER ─── */
.preloader {
  position: fixed; inset: 0; background: #050505;
  display: flex; justify-content: center; align-items: center;
  z-index: 99999; overflow: hidden;
}
.preloader__inner { display: flex; flex-direction: column; align-items: center; gap: 1.5rem; }
.contador { font-size: 3rem; font-family: 'Poppins'; color: #fff; letter-spacing: 3px; font-weight: 300; }

/* ═══════════════════════════════════════════════════════════════ */
/* SHARED SECTION STYLES                                          */
/* ═══════════════════════════════════════════════════════════════ */
.section {
  padding: 120px 0;
  position: relative;
  overflow: hidden;
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
}

.section-label {
  display: inline-block;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--green-neon);
  border: 1px solid var(--border-subtle);
  background: rgba(57,255,20,0.06);
  padding: 6px 18px;
  border-radius: 20px;
  margin-bottom: 20px;
}

.section-title {
  font-size: clamp(2rem, 4vw, 3rem);
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 16px;
  line-height: 1.15;
}

.green-accent {
  color: var(--green-neon);
  text-shadow: 0 0 30px rgba(57,255,20,0.35);
}

.section-subtitle {
  font-size: 1.05rem;
  color: var(--text-muted);
  max-width: 100%;
  line-height: 1.7;
  margin-bottom: 70px;
}

.noise-overlay {
  position: absolute; inset: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  background-repeat: repeat;
  background-size: 200px;
  opacity: 0.4;
  z-index: 0;
}
.noise-overlay ~ * { position: relative; z-index: 1; }

/* ═══════════════════════════════════════════════════════════════ */
/* MOTIVAÇÃO                                                      */
/* ═══════════════════════════════════════════════════════════════ */
.motivacao-section {
  background: var(--bg-black);
}

.motivacao-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.motivacao-card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 32px 28px;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
}

.motivacao-card:hover {
  transform: translateY(-6px);
  border-color: rgba(57,255,20,0.35);
  box-shadow: 0 20px 50px rgba(57,255,20,0.08);
}

.mcard-icon {
  width: 52px; height: 52px;
  background: rgba(57,255,20,0.1);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  margin-bottom: 20px;
  color: var(--green-neon);
}

.mcard-icon .material-symbols-outlined { font-size: 1.6rem; }

.mcard-title {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.mcard-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.65;
}

/* ═══════════════════════════════════════════════════════════════ */
/* HISTÓRIA, TIMELINE                                            */
/* ═══════════════════════════════════════════════════════════════ */
.historia-section {
  background: var(--bg-section);
}

.timeline {
  position: relative;
  padding: 20px 0;
}

.timeline::before {
  content: '';
  position: absolute;
  left: 50%;
  top: 0; bottom: 0;
  width: 2px;
  background: linear-gradient(to bottom, transparent, var(--green-neon), transparent);
  transform: translateX(-50%);
}

.timeline-item {
  display: flex;
  justify-content: flex-end;
  padding-right: calc(50% + 50px);
  margin-bottom: 64px;
  position: relative;
}

.timeline-item.right {
  justify-content: flex-start;
  padding-right: 0;
  padding-left: calc(50% + 50px);
}

.timeline-badge {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 20px;
  width: 44px; height: 44px;
  background: var(--bg-black);
  border: 2px solid var(--green-neon);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.75rem;
  font-weight: 500;
  color: var(--green-neon);
  z-index: 2;
  box-shadow: 0 0 20px rgba(57,255,20,0.3);
}

.timeline-card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 28px 30px;
  max-width: 420px;
  backdrop-filter: blur(10px);
  transition: border-color 0.3s, box-shadow 0.3s;
}

.timeline-card:hover {
  border-color: rgba(57,255,20,0.3);
  box-shadow: 0 16px 40px rgba(57,255,20,0.07);
}

.tcard-chapter {
  font-size: 0.72rem;
  color: var(--green-neon);
  letter-spacing: 0.2em;
  text-transform: uppercase;
  font-weight: 600;
  margin-bottom: 8px;
}

.tcard-title {
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 12px;
}

.tcard-desc {
  font-size: 0.88rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 16px;
}

.tcard-tag {
  display: inline-block;
  font-size: 0.78rem;
  padding: 5px 14px;
  background: rgba(57,255,20,0.08);
  border: 1px solid var(--border-subtle);
  border-radius: 20px;
  color: var(--text-muted);
}

/* ═══════════════════════════════════════════════════════════════ */
/* MISSÃO                                                         */
/* ═══════════════════════════════════════════════════════════════ */
.missao-section {
  background: var(--bg-black);
}

.missao-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.missao-img-box {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  height: 400px;
  border: 1px solid var(--border-subtle);
}

.missao-img-box img {
  width: 100%;
  height: 480px;
  object-fit: cover;
  display: block;
  transition: filter 0.5s;
}

.missao-img-box:hover img { filter: grayscale(0%) brightness(1); }

.missao-img-glow {
  position: absolute; inset: 0;
  pointer-events: none;
}

.missao-steps { display: flex; flex-direction: column; gap: 28px; }

.missao-step {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 14px;
  transition: transform 0.3s, border-color 0.3s;
  backdrop-filter: blur(8px);
}

.missao-step:hover {
  transform: translateX(6px);
  border-color: rgba(57,255,20,0.3);
}

.step-num {
  font-size: 2.2rem;
  font-weight: 800;
  color: rgba(57,255,20,0.15);
  line-height: 1;
  min-width: 48px;
}

.step-body { display: flex; align-items: flex-start; gap: 16px; flex: 1; }

.step-icon {
  width: 40px; height: 40px;
  background: rgba(57,255,20,0.1);
  border-radius: 10px;
  display: flex; align-items: center; justify-content: center;
  color: var(--green-neon);
  flex-shrink: 0;
}

.step-icon .material-symbols-outlined { font-size: 1.3rem; }

.step-text h3 {
  font-size: 0.95rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 6px;
}

.step-text p {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.6;
}

/* ═══════════════════════════════════════════════════════════════ */
/* BESTIÁRIO                                                      */
/* ═══════════════════════════════════════════════════════════════ */
.bestiario-section {
  background: var(--bg-section);
}

.bestiary-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-bottom: 80px;
}

.besta-card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
}

.besta-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 30px 60px rgba(0,0,0,0.5);
}

.besta-image {
  position: relative;
  height: 200px;
  overflow: hidden;
}

.besta-image img {
  width: 100%; height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
  filter: grayscale(40%) brightness(0.75);
}

.besta-card:hover .besta-image img {
  transform: scale(1.08);
  filter: grayscale(0%) brightness(0.9);
}

.besta-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.7), transparent);
  display: flex; align-items: flex-end; padding: 14px 16px;
}

.besta-role {
  font-size: 0.75rem;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.besta-info { padding: 22px; }

.besta-threat {
  display: inline-block;
  font-size: 0.68rem;
  font-weight: 500;
  letter-spacing: 0.15em;
  padding: 4px 12px;
  border-radius: 4px;
  margin-bottom: 10px;
}

.threat-alto { background: rgba(255,100,0,0.2); color: #ff8040; border: 1px solid rgba(255,100,0,0.3); }
.threat-crítico { background: rgba(220,0,0,0.2); color: #ff4040; border: 1px solid rgba(220,0,0,0.3); }
.threat-médio { background: rgba(255,200,0,0.15); color: #ffd040; border: 1px solid rgba(255,200,0,0.3); }

.besta-info h3 { font-size: 1rem; font-weight: 500; color: var(--text-primary); margin-bottom: 8px; }
.besta-info p { font-size: 0.83rem; color: var(--text-muted); line-height: 1.6; margin-bottom: 16px; }

.besta-stats { display: flex; flex-direction: column; gap: 8px; }

.besta-stat { display: flex; align-items: center; gap: 10px; }

.stat-label { font-size: 0.72rem; color: var(--text-muted); min-width: 65px; }

.stat-bar {
  flex: 1; height: 4px;
  background: rgba(255,255,255,0.06);
  border-radius: 2px;
  overflow: hidden;
}

.stat-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green-neon), var(--green-dark));
  border-radius: 2px;
  width: 0%;
  transition: width 0s; /* GSAP controls this */
}

/* Antagonistas */
.antagonistas-title {
  text-align: center;
  margin-bottom: 40px;
}

.antagonistas-title h3 {
  font-size: clamp(1.5rem, 3vw, 2.2rem);
  font-weight: 500;
  color: var(--text-primary);
}

.antagonistas-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.antagonista-card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  padding: 30px 24px;
  text-align: center;
  transition: transform 0.35s, box-shadow 0.35s, border-color 0.35s;
  backdrop-filter: blur(10px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.antagonista-card:hover {
  transform: translateY(-8px);
  border-color: rgba(57,255,20,0.25);
  box-shadow: 0 24px 50px rgba(0,0,0,0.5);
}

.ant-rank {
  position: absolute;
  top: 18px; right: 18px;
  font-size: 0.7rem;
  font-weight: 500;
  color: rgba(57,255,20,0.5);
  letter-spacing: 0.1em;
  border: 1px solid var(--border-subtle);
  padding: 3px 10px;
  border-radius: 4px;
}

.ant-visual {
  width: 80px; height: 80px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 20px;
  border: 2px solid rgba(255,255,255,0.08);
}

.ant-icon { font-size: 2rem; color: rgba(255,255,255,0.7); }

.antagonista-card h3 {
  font-size: 1.05rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.antagonista-card p {
  font-size: 0.84rem;
  color: var(--text-muted);
  line-height: 1.65;
  margin-bottom: 18px;
}

.ant-ability {
  display: flex; align-items: center; justify-content: center; gap: 6px;
  font-size: 0.78rem;
  color: var(--green-neon);
  background: rgba(57,255,20,0.07);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;
  padding: 8px 14px;
}

.ant-ability .material-symbols-outlined { font-size: 1rem; }

/* ═══════════════════════════════════════════════════════════════ */
/* EQUIPE                                                         */
/* ═══════════════════════════════════════════════════════════════ */
.equipe-section { background: var(--bg-black); }

.equipe-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
}

.membro-card {
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 18px;
  overflow: hidden;
  transition: transform 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
}

.membro-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 24px 50px rgba(0,0,0,0.4);
}

.membro-avatar {
  height: 140px;
  display: flex; align-items: center; justify-content: center;
}

.membro-avatar {
  height: 140px;
  width: 100%;
  overflow: hidden; /* 🔥 corta o excesso */
}

.membro-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;       /* 🔥 preenche sem distorcer */
  object-position: center; /* centraliza */
  display: block;
}

.avatar-icon { font-size: 3.5rem; color: rgba(255,255,255,0.6); }

.membro-info { padding: 22px 20px; }

.membro-info h3 {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-primary);
  margin-bottom: 5px;
}

.membro-area {
  font-size: 0.75rem;
  color: var(--green-neon);
  font-weight: 600;
  letter-spacing: 0.05em;
  margin-bottom: 10px;
}

.membro-info p {
  font-size: 0.83rem;
  color: var(--text-muted);
  line-height: 1.6;
  margin-bottom: 14px;
}

.membro-matricula {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.5);
  font-family: 'Courier New', monospace;
}

/* ═══════════════════════════════════════════════════════════════ */
/* CONTATO                                                        */
/* ═══════════════════════════════════════════════════════════════ */
.contato-section {
  background: var(--bg-section);
}

.contato-section .section-subtitle { margin-bottom: 48px; }

.contato-grid {
  display: flex;
  justify-content: center;
  gap: 20px;
}

@media (max-width: 768px) {
  .contato-grid{
    flex-direction: column;
    align-items: center;
  }
}

.contato-card {
  display: flex;
  align-items: center;
  gap: 20px;
  width: 400px;
  background: var(--card-bg);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: 28px 24px;
  text-decoration: none;
  transition: transform 0.3s, border-color 0.3s, box-shadow 0.3s;
  backdrop-filter: blur(10px);
}

.contato-card:hover {
  transform: translateY(-5px);
  border-color: rgba(57,255,20,0.3);
  box-shadow: 0 16px 40px rgba(57,255,20,0.06);
}

.contato-icon {
  width: 52px; height: 52px;
  background: rgba(57,255,20,0.1);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  display: flex; align-items: center; justify-content: center;
  color: var(--green-neon);
  flex-shrink: 0;
}

.contato-icon .material-symbols-outlined { font-size: 1.6rem; }
.github-icon { color: #e8f5e8; background: rgba(255,255,255,0.05); }

.contato-info { display: flex; flex-direction: column; gap: 4px; overflow: hidden; text-align: start; }

.contato-label {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.contato-value {
  font-size: 0.85rem;
  color: var(--text-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* ═══════════════════════════════════════════════════════════════ */
/* FOOTER                                                         */
/* ═══════════════════════════════════════════════════════════════ */
.site-footer {
  background: #050505;
  border-top: 1px solid var(--border-subtle);
  padding: 60px 0 30px;
}

.footer-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.footer-brand {}

.footer-logo {
  font-size: 1.15rem;
  font-weight: 500;
  color: var(--text-primary);
  display: block;
  margin-bottom: 10px;
}

.footer-brand p {
  font-size: 0.85rem;
  color: var(--text-muted);
  max-width: 340px;
}

.footer-links {
  display: flex;
  gap: 32px;
  flex-wrap: wrap;
}

.footer-links a {
  font-size: 0.85rem;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
}

.footer-links a:hover { color: var(--green-neon); }

.footer-copy {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.2);
  padding-top: 20px;
  border-top: 1px solid rgba(255,255,255,0.05);
}

/* ═══════════════════════════════════════════════════════════════ */
/* RESPONSIVO                                                     */
/* ═══════════════════════════════════════════════════════════════ */
@media (max-width: 1024px) {
  .motivacao-grid { grid-template-columns: repeat(2, 1fr); }
  .equipe-grid { grid-template-columns: repeat(2, 1fr); }
  .missao-wrapper { grid-template-columns: 1fr; gap: 40px; }
  .missao-image-panel { display: none; }
  .bestiary-grid { grid-template-columns: repeat(2, 1fr); }
  .antagonistas-grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 768px) {
  .section { padding: 80px 0; }
  .section-container { padding: 0 20px; }
  .section-title { font-size: 2rem; }
  .hero-title { font-size: 2rem; }

  /* Timeline mobile, linear */
  .timeline::before { left: 20px; }
  .timeline-item,
  .timeline-item.right {
    justify-content: flex-start;
    padding-right: 0;
    padding-left: 60px;
  }
  .timeline-badge { left: 20px; transform: none; }

  .motivacao-grid { grid-template-columns: 1fr; }
  .bestiary-grid { grid-template-columns: 1fr; }
  .antagonistas-grid { grid-template-columns: 1fr; }
  .equipe-grid { grid-template-columns: 1fr; }
  .contato-grid { grid-template-columns: 1fr; max-width: 100%; }

  .cta-group { flex-direction: column; align-items: center; }
  .btn-primary, .btn-outline { width: 220px; }
}

@media (max-width: 480px) {
  .section-container { padding: 0 16px; }
  .section-subtitle { margin-bottom: 40px; }
  .timeline-card { max-width: 100%; }
  .footer-links { gap: 16px; }
}
</style>
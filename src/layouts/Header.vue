<template>
  <div class="header-wrapper">
    <header class="glass-header poppins-regular">
      <div class="container">
        <div class="logo-area" @click="redirect('Home')">
          <span class="poppins-bold" >S<span class="accent">K</span></span>
        </div>

        <nav class="desktop-nav">
          <a v-for="item in menuItems" :key="item.label" @click="redirect(item.id)">
            {{ item.label }}
          </a>
        </nav>

        <button class="mobile-toggle" @click="toggleMenu">
          <span class="material-symbols-outlined">menu</span>
        </button>
      </div>
    </header>

    <transition name="slide">
      <aside v-if="isMenuOpen" class="sidebar-overlay">
        <div class="sidebar-content poppins-medium">
          <div class="sidebar-header">
            <span class="poppins-bold">MENU</span>
            <button class="close-btn" @click="toggleMenu">
              <span class="material-symbols-outlined">close</span>
            </button>
          </div>

          <nav class="sidebar-nav">
            <a 
              v-for="item in menuItems" 
              :key="item.label" 
              @click="redirect(item.id); toggleMenu()"
            >
              {{ item.label }}
              <span class="material-symbols-outlined">chevron_right</span>
            </a>
          </nav>

          <div class="sidebar-footer">
            <p class="poppins-regular">© 2026 Shadow Knight - Storytelling</p>
          </div>
        </div>
        <div class="backdrop" @click="toggleMenu"></div>
      </aside>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'HeaderSite',
  data() {
    return {
      isMenuOpen: false,
      menuItems: [
        { label: 'MOTIVAÇÃO', id: 'motivacao' },
        { label: 'HISTÓRIA', id: 'historia' },
        { label: 'MISSÃO', id: 'missao' },
        { label: 'O TIME', id: 'time' },
        { label: 'CONTATO', id: 'contato' }
      ]
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
      // Impede o scroll do body quando o menu está aberto
      if (this.isMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'auto';
      }
    },
    redirect(id) {
      console.log(`Redirecionando para: ${id}`);
      // Aqui você pode usar this.$router.push ou scroll suave
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }
};
</script>

<style scoped>
/* Import Poppins */
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.header-wrapper {
  position: relative;
  width: 100%;
  z-index: 999;
}

/* Header Estilo Glassmorphism */
.glass-header {
  position: absolute; /* Sobrepõe o conteúdo */
  top: 0;
  left: 0;
  width: 100%;
  padding: 20px 0;
  background: rgba(255, 255, 255, 0.05);
  
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo-area {
  cursor: pointer;
  font-size: 22px;
  color: #FFF;
  letter-spacing: -0.5px;
}

.logo-area .accent {
  color: #39ff14; /* Laranja da sua marca */
}

/* Nav Desktop */
.desktop-nav {
  display: flex;
  gap: 32px;
}

.desktop-nav a {
  color: #FFF;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.3s ease;
  position: relative;
}

.desktop-nav a:after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -4px;
  left: 0;
  background-color: #39ff14;
  transition: width 0.3s ease;
}

.desktop-nav a:hover:after {
  width: 100%;
}

/* Mobile Toggle */
.mobile-toggle {
  
  background: none;
  border: none;
  color: #FFF;
  cursor: pointer;
}

/* Menu Lateral (Drawer) */
.sidebar-overlay {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100vh;
  z-index: 1001;
  display: flex;
  justify-content: flex-end;
}

.backdrop {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(15, 23, 42, 0.4);
  backdrop-filter: blur(4px);
}

.sidebar-content {
  position: relative;
  z-index: 1002;
  width: 80%;
  max-width: 320px;
  background: #0f172a; /* Cinza azulado escuro */
  height: 100%;
  padding: 40px 30px;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0, 0, 0, 0.2);
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  margin-bottom: 50px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
}

.sidebar-nav {
  display: flex;
  flex-direction: column;
  gap: 25px;
  cursor: pointer;
}

.sidebar-nav a {
  color: white;
  font-size: 18px;
  text-decoration: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: transform 0.2s ease;
}

.sidebar-nav a:hover {
  transform: scale(0.98);
  color: #39ff14;
}

.sidebar-nav a:active {
  transform: scale(0.98);
  color: #39ff14;
}

.close-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

.sidebar-footer {
  margin-top: auto;
  color: rgba(255, 255, 255, 0.4);
  font-size: 12px;
}

/* Transições */
.slide-enter-active, .slide-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-enter-from, .slide-leave-to {
  opacity: 0;
}

.slide-enter-from .sidebar-content {
  transform: translateX(100%);
}

.slide-leave-to .sidebar-content {
  transform: translateX(100%);
}

/* Responsividade */
@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }
  .mobile-toggle {
    display: block;
  }
}

/* Utilitários de fonte */
.poppins-regular { font-family: 'Poppins', sans-serif; font-weight: 400; }
.poppins-medium { font-family: 'Poppins', sans-serif; font-weight: 500; }
.poppins-bold { font-family: 'Poppins', sans-serif; font-weight: 700; }
</style>
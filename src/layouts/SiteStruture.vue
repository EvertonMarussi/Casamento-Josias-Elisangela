<template>
  <div class="app-container">
    <Header />
    
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade-page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>

    <Footer />
  </div>
</template>

<script>
// Importando os componentes (ajuste o caminho conforme sua pasta)
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'MainLayout',
  components: {
    Header,
    Footer
  }
};
</script>

<style>
/* Reset básico para garantir o visual clean */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}



.main-content {
  flex: 1; /* Faz o conteúdo ocupar o espaço restante entre header e footer */
  width: 100%;
  /* Como o Header está com position: absolute no componente dele, 
     o conteúdo aqui começará do topo (Y=0). */
}

/* Transição suave entre trocas de rota (Páginas) */
.fade-page-enter-active,
.fade-page-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.fade-page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Scrollbar Customizada (Opcional, mas dá o toque final) */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #f1f5f9;
}
::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}
::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
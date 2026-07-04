<template>
  <div>
    <SiteStruture v-if="!loading" />
    <div class="loading-screen" v-else />
  </div>
</template>

<script>

import SiteStruture from './layouts/SiteStruture.vue';

export default {
  name: 'App',
  data(){
    return{
      loading: true
    }
  },
  components: {
    SiteStruture
  },
   mounted() {
    
    this.loading = false
  },

  watch: {
    
    $route() {
      this.startLoading()
    }
  },

  methods: {
    startLoading() {
      this.loading = true
      requestAnimationFrame(() => {
        this.loading = false
      })
    }
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50; 
}

.loading-screen{
  width: 100%;
  height: 100vh;
  overflow: hidden;
  background-color: #000;
}

body {
  cursor: url('@/assets/espada.png') 16 16, auto;
}


a:hover, button:hover {
  cursor: url('@/assets/espada-acesa.png'), pointer;
}

</style>

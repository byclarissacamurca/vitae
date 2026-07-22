<script setup>
import Home from './views/Home.vue'
import LogoVitae from './components/LogoVitae.vue'
</script>

<template>
  <header class="app-header">
    <LogoVitae class="app-logo" />
  </header>
  <Home />
</template>

<style scoped>
.app-header {
  padding: 20px 48px;
  background: #1a1a1a;
}

.app-logo {
  display: block;
  height: 60px;
  width: auto;
}

@media (max-width: 768px) {
  .app-header {
    padding: 16px 20px;
  }

  .app-logo {
    height: 28px;
  }
}
</style>

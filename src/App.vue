<script setup>
import Home from './views/Home.vue'
</script>

<template>
  <header class="app-header">
    <span class="app-nome">Gerador de Currículo</span>
  </header>
  <Home />
</template>

<style scoped>
.app-header {
  padding: 20px 48px;
  border-bottom: 1px solid var(--border);
}

.app-nome {
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: var(--text-muted);
}

@media (max-width: 768px) {
  .app-header {
    padding: 16px 20px;
  }
}
</style>

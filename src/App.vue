<script setup>
import { computed } from 'vue'
import Home from './views/Home.vue'
import LogoVitaeBranco from './components/LogoVitaeBranco.vue'
import LogoVitaePreto from './components/LogoVitaePreto.vue'
import AlternadorTema from './components/AlternadorTema.vue'
import BotaoExportar from './components/BotaoExportar.vue'
import { useTema } from './composables/useTema'

const { tema } = useTema()

const logoAtual = computed(() => (tema.value === 'dark' ? LogoVitaeBranco : LogoVitaePreto))
</script>

<template>
  <header class="app-header">
    <component :is="logoAtual" class="app-logo" />
    <div class="app-acoes">
      <AlternadorTema />
      <BotaoExportar />
    </div>
  </header>
  <Home />
</template>

<style scoped>
.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  padding: 20px 48px;
  background: var(--bg-elevado);
  border-bottom: 1px solid var(--borda);
}

.app-logo {
  display: block;
  height: 60px;
  width: auto;
}

.app-acoes {
  display: flex;
  align-items: center;
  gap: 16px;
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

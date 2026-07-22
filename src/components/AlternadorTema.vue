<script setup>
import { useTema } from '../composables/useTema'

const { tema, definirTema } = useTema()
</script>

<template>
  <div class="alternador-tema" role="group" aria-label="Tema">
    <button type="button" :class="{ ativo: tema === 'claro' }" @click="definirTema('claro')">
      Claro
    </button>
    <button type="button" :class="{ ativo: tema === 'escuro' }" @click="definirTema('escuro')">
      Escuro
    </button>
  </div>
</template>

<style scoped>
.alternador-tema {
  display: flex;
  gap: 2px;
  border: 1px solid var(--cabecalho-borda);
  border-radius: 8px;
  padding: 2px;
}

.alternador-tema button {
  font: inherit;
  font-size: 12px;
  color: var(--cabecalho-texto-suave);
  background: none;
  border: none;
  border-radius: 6px;
  padding: 5px 10px;
  cursor: pointer;
}

.alternador-tema button.ativo {
  color: var(--cabecalho-bg);
  background: var(--cabecalho-texto);
}
</style>

<script setup>
import { computed } from 'vue'
import { useTema } from '../composables/useTema'

const { tema, definirTema } = useTema()

const rotulo = computed(() =>
  tema.value === 'dark' ? 'Alternar para tema claro' : 'Alternar para tema escuro',
)

function alternar() {
  definirTema(tema.value === 'dark' ? 'light' : 'dark')
}
</script>

<template>
  <button type="button" class="alternador-tema" :aria-label="rotulo" :title="rotulo" @click="alternar">
    <svg
      v-if="tema === 'dark'"
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        d="M12 2.5v2M12 19.5v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M2.5 12h2M19.5 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"
      />
    </svg>
    <svg
      v-else
      viewBox="0 0 24 24"
      width="18"
      height="18"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a7 7 0 0 0 10.5 10.5z" />
    </svg>
  </button>
</template>

<style scoped>
.alternador-tema {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 0;
  color: var(--texto-suave);
  background: none;
  border: 1px solid var(--borda);
  border-radius: 8px;
  cursor: pointer;
}

.alternador-tema:hover {
  color: var(--destaque);
  border-color: var(--destaque);
}
</style>

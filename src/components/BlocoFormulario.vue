<script setup>
import { useLocalStorage } from '@vueuse/core'

const props = defineProps({
  titulo: { type: String, required: true },
  contador: { type: String, default: '' },
  chave: { type: String, required: true },
})

const expandido = useLocalStorage(`bloco-expandido-${props.chave}`, true)

function alternar() {
  expandido.value = !expandido.value
}
</script>

<template>
  <section class="bloco">
    <button
      type="button"
      class="bloco-cabecalho"
      :aria-expanded="expandido"
      :aria-controls="`bloco-conteudo-${chave}`"
      @click="alternar"
    >
      <span class="bloco-titulo">
        {{ titulo }}<span v-if="contador" class="bloco-contador"> · {{ contador }}</span>
      </span>
      <span class="bloco-seta" :class="{ recolhido: !expandido }" aria-hidden="true">⌄</span>
    </button>
    <div v-show="expandido" :id="`bloco-conteudo-${chave}`" class="bloco-conteudo">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.bloco {
  background: var(--bg-elevado);
  border: 1px solid var(--borda);
  border-radius: 10px;
  margin-bottom: 20px;
}

.bloco-cabecalho {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  font: inherit;
  background: none;
  border: none;
  cursor: pointer;
  padding: 16px 20px;
  text-align: left;
  color: inherit;
}

.bloco-titulo {
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--texto-suave);
}

.bloco-contador {
  font-weight: 400;
  text-transform: none;
  letter-spacing: normal;
}

.bloco-seta {
  color: var(--texto-suave);
  font-size: 14px;
  transition: transform 200ms ease;
}

.bloco-seta.recolhido {
  transform: rotate(-90deg);
}

.bloco-conteudo {
  padding: 4px 20px 24px;
}
</style>

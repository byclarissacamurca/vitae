<script setup>
import { ref } from 'vue'
import { useCurriculoStore } from '../stores/curriculo'

const store = useCurriculoStore()
const novaHabilidade = ref('')

function adicionar() {
  store.adicionarHabilidade(novaHabilidade.value)
  novaHabilidade.value = ''
}
</script>

<template>
  <div>
    <h2 class="section-title">Habilidades</h2>
    <div class="field">
      <label for="habilidade">Adicionar habilidade</label>
      <input
        id="habilidade"
        v-model="novaHabilidade"
        type="text"
        placeholder="Digite e pressione Enter"
        @keydown.enter.prevent="adicionar"
      />
    </div>
    <div class="tags">
      <span v-for="(habilidade, index) in store.habilidades" :key="habilidade" class="tag">
        {{ habilidade }}
        <button type="button" class="tag-remove" @click="store.removerHabilidade(index)">
          ×
        </button>
      </span>
    </div>
  </div>
</template>

<style scoped>
.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  padding: 4px 10px;
  border: 1px solid var(--border);
  color: var(--text);
}

.tag-remove {
  background: none;
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
}

.tag-remove:hover {
  color: var(--text);
}
</style>

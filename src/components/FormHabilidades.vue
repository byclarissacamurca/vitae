<script setup>
import { computed, ref } from 'vue'
import { useCurriculoStore } from '../stores/curriculo'
import BlocoFormulario from './BlocoFormulario.vue'

const store = useCurriculoStore()
const novosItens = ref({})

const contador = computed(() => {
  const n = store.habilidades.reduce((soma, categoria) => soma + categoria.itens.length, 0)
  return n ? `${n} ${n === 1 ? 'item' : 'itens'}` : ''
})

function adicionarItem(indiceCategoria) {
  const valor = novosItens.value[indiceCategoria] || ''
  store.adicionarItemHabilidade(indiceCategoria, valor)
  novosItens.value[indiceCategoria] = ''
}
</script>

<template>
  <BlocoFormulario titulo="Habilidades" :contador="contador" chave="habilidades">
    <div v-for="(categoria, indiceCategoria) in store.habilidades" :key="indiceCategoria" class="sub-bloco">
      <div class="sub-bloco-cabecalho">
        <input
          v-model="categoria.categoria"
          type="text"
          class="categoria-nome"
          placeholder="Categoria (opcional, ex: Front-end)"
        />
        <div class="sub-bloco-acoes">
          <button
            type="button"
            class="btn-icone"
            title="Mover para cima"
            :disabled="indiceCategoria === 0"
            @click="store.moverCategoriaHabilidade(indiceCategoria, -1)"
          >
            ↑
          </button>
          <button
            type="button"
            class="btn-icone"
            title="Mover para baixo"
            :disabled="indiceCategoria === store.habilidades.length - 1"
            @click="store.moverCategoriaHabilidade(indiceCategoria, 1)"
          >
            ↓
          </button>
          <button
            type="button"
            class="btn-text"
            @click="store.removerCategoriaHabilidade(indiceCategoria)"
          >
            Remover
          </button>
        </div>
      </div>

      <div class="field">
        <label :for="`habilidade-${indiceCategoria}`">Adicionar habilidade</label>
        <input
          :id="`habilidade-${indiceCategoria}`"
          v-model="novosItens[indiceCategoria]"
          type="text"
          placeholder="Digite e pressione Enter"
          @keydown.enter.prevent="adicionarItem(indiceCategoria)"
        />
      </div>

      <div class="tags">
        <span v-for="(item, indiceItem) in categoria.itens" :key="item" class="tag">
          {{ item }}
          <button
            type="button"
            class="tag-remove"
            @click="store.removerItemHabilidade(indiceCategoria, indiceItem)"
          >
            ×
          </button>
        </span>
      </div>
    </div>

    <button type="button" class="btn" @click="store.adicionarCategoriaHabilidade()">
      + Adicionar categoria
    </button>
  </BlocoFormulario>
</template>

<style scoped>
.categoria-nome {
  flex: 1;
  font: inherit;
  font-size: 13px;
  font-weight: 500;
  color: var(--texto);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--borda);
  padding: 4px 0;
}

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
  border: 1px solid var(--borda);
  border-radius: 8px;
  color: var(--texto);
}

.tag-remove {
  background: none;
  border: none;
  color: var(--texto-suave);
  cursor: pointer;
  font-size: 14px;
  line-height: 1;
  padding: 0;
}

.tag-remove:hover {
  color: var(--texto);
}
</style>

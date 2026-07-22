<script setup>
import { computed } from 'vue'
import { useCurriculoStore } from '../stores/curriculo'
import BlocoFormulario from './BlocoFormulario.vue'

const store = useCurriculoStore()

const contador = computed(() => {
  const n = store.formacao.length
  return n ? `${n} ${n === 1 ? 'item' : 'itens'}` : ''
})
</script>

<template>
  <BlocoFormulario titulo="Formação" :contador="contador" chave="formacao">
    <div v-for="(item, index) in store.formacao" :key="index" class="sub-bloco">
      <div class="sub-bloco-cabecalho">
        <div class="sub-bloco-acoes">
          <button
            type="button"
            class="btn-icone"
            title="Mover para cima"
            :disabled="index === 0"
            @click="store.moverFormacao(index, -1)"
          >
            ↑
          </button>
          <button
            type="button"
            class="btn-icone"
            title="Mover para baixo"
            :disabled="index === store.formacao.length - 1"
            @click="store.moverFormacao(index, 1)"
          >
            ↓
          </button>
        </div>
        <button type="button" class="btn-text" @click="store.removerFormacao(index)">
          Remover
        </button>
      </div>
      <div class="field">
        <label :for="`curso-${index}`">Curso</label>
        <input :id="`curso-${index}`" v-model="item.curso" type="text" />
      </div>
      <div class="field">
        <label :for="`instituicao-${index}`">Instituição</label>
        <input :id="`instituicao-${index}`" v-model="item.instituicao" type="text" />
      </div>
      <div class="field">
        <label :for="`periodo-formacao-${index}`">Período</label>
        <input :id="`periodo-formacao-${index}`" v-model="item.periodo" type="text" />
      </div>
    </div>
    <button type="button" class="btn" @click="store.adicionarFormacao()">
      + Adicionar formação
    </button>
  </BlocoFormulario>
</template>

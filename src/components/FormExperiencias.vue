<script setup>
import { computed } from 'vue'
import { useCurriculoStore } from '../stores/curriculo'
import BlocoFormulario from './BlocoFormulario.vue'

const store = useCurriculoStore()

const contador = computed(() => {
  const n = store.experiencias.length
  return n ? `${n} ${n === 1 ? 'item' : 'itens'}` : ''
})
</script>

<template>
  <BlocoFormulario titulo="Experiência" :contador="contador" chave="experiencia">
    <div v-for="(experiencia, index) in store.experiencias" :key="index" class="sub-bloco">
      <div class="sub-bloco-cabecalho">
        <div class="sub-bloco-acoes">
          <button
            type="button"
            class="btn-icone"
            title="Mover para cima"
            :disabled="index === 0"
            @click="store.moverExperiencia(index, -1)"
          >
            ↑
          </button>
          <button
            type="button"
            class="btn-icone"
            title="Mover para baixo"
            :disabled="index === store.experiencias.length - 1"
            @click="store.moverExperiencia(index, 1)"
          >
            ↓
          </button>
        </div>
        <button type="button" class="btn-text" @click="store.removerExperiencia(index)">
          Remover
        </button>
      </div>
      <div class="field">
        <label :for="`cargo-${index}`">Cargo</label>
        <input :id="`cargo-${index}`" v-model="experiencia.cargo" type="text" />
      </div>
      <div class="field">
        <label :for="`empresa-${index}`">Empresa</label>
        <input :id="`empresa-${index}`" v-model="experiencia.empresa" type="text" />
      </div>
      <div class="field">
        <label :for="`periodo-${index}`">Período</label>
        <input :id="`periodo-${index}`" v-model="experiencia.periodo" type="text" />
      </div>
      <div class="field">
        <label :for="`descricao-${index}`">Descrição</label>
        <textarea :id="`descricao-${index}`" v-model="experiencia.descricao" rows="3"></textarea>
      </div>
    </div>
    <button type="button" class="btn" @click="store.adicionarExperiencia()">
      + Adicionar experiência
    </button>
  </BlocoFormulario>
</template>

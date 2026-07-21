<script setup>
import { useCurriculoStore } from '../stores/curriculo'

const store = useCurriculoStore()
</script>

<template>
  <div>
    <h2 class="section-title">Formação</h2>
    <div v-for="(item, index) in store.formacao" :key="index" class="list-item">
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
      <button type="button" class="btn-text" @click="store.removerFormacao(index)">
        Remover
      </button>
    </div>
    <button type="button" class="btn" @click="store.adicionarFormacao()">
      + Adicionar formação
    </button>
  </div>
</template>

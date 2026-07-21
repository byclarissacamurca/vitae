<script setup>
import { useCurriculoStore } from '../stores/curriculo'

const store = useCurriculoStore()
</script>

<template>
  <div>
    <h2 class="section-title">Experiência</h2>
    <div v-for="(experiencia, index) in store.experiencias" :key="index" class="list-item">
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
      <button type="button" class="btn-text" @click="store.removerExperiencia(index)">
        Remover
      </button>
    </div>
    <button type="button" class="btn" @click="store.adicionarExperiencia()">
      + Adicionar experiência
    </button>
  </div>
</template>

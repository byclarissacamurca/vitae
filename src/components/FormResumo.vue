<script setup>
import { useCurriculoStore } from '../stores/curriculo'

const store = useCurriculoStore()
</script>

<template>
  <div>
    <h2 class="section-title">Resumo</h2>
    <div class="field">
      <label for="resumo">Resumo profissional</label>
      <textarea id="resumo" v-model="store.resumo" rows="5"></textarea>
    </div>
  </div>
</template>

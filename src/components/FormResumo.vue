<script setup>
import { useCurriculoStore } from '../stores/curriculo'
import BlocoFormulario from './BlocoFormulario.vue'

const store = useCurriculoStore()
</script>

<template>
  <BlocoFormulario titulo="Resumo" chave="resumo">
    <div class="field">
      <label for="resumo">Resumo profissional</label>
      <textarea id="resumo" v-model="store.resumo" rows="5"></textarea>
    </div>
  </BlocoFormulario>
</template>

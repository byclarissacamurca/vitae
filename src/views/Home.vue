<script setup>
import FormDadosPessoais from '../components/FormDadosPessoais.vue'
import FormResumo from '../components/FormResumo.vue'
import FormExperiencias from '../components/FormExperiencias.vue'
import FormFormacao from '../components/FormFormacao.vue'
import FormHabilidades from '../components/FormHabilidades.vue'
</script>

<template>
  <div class="home">
    <section class="form-column">
      <FormDadosPessoais />
      <FormResumo />
      <FormExperiencias />
      <FormFormacao />
      <FormHabilidades />
    </section>
    <section class="preview-column"></section>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  min-height: 100svh;
}

.form-column {
  flex: 1 1 45%;
  padding: 48px;
  border-right: 1px solid var(--border);
}

.preview-column {
  flex: 1 1 55%;
  padding: 48px;
  background: var(--surface);
}
</style>

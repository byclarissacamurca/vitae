<script setup>
import { useExportarPdf } from '../composables/useExportarPdf'

const { exportarPdf } = useExportarPdf()
</script>

<template>
  <button type="button" class="btn-exportar" @click="exportarPdf">Baixar PDF</button>
</template>

<style scoped>
.btn-exportar {
  font: inherit;
  font-size: 13px;
  color: var(--cabecalho-texto);
  background: none;
  border: 1px solid var(--cabecalho-borda);
  border-radius: 8px;
  padding: 7px 16px;
  cursor: pointer;
}

.btn-exportar:hover {
  border-color: var(--cabecalho-texto);
}
</style>

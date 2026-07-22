<script setup>
import { useExportarPdf } from '../composables/useExportarPdf'

const { exportarPdf } = useExportarPdf()
</script>

<template>
  <button type="button" class="btn" @click="exportarPdf">Baixar PDF</button>
</template>

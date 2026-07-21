<script setup>
async function exportarPdf() {
  const elemento = document.getElementById('folha-curriculo')
  if (!elemento) return

  const { default: html2pdf } = await import('html2pdf.js')

  html2pdf()
    .set({
      filename: 'curriculo.pdf',
      margin: 0,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    })
    .from(elemento)
    .save()
}
</script>

<template>
  <button type="button" class="btn" @click="exportarPdf">Baixar PDF</button>
</template>

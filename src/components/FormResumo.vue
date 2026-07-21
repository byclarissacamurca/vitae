<script setup>
import { ref } from 'vue'
import { useCurriculoStore } from '../stores/curriculo'

const store = useCurriculoStore()
const carregando = ref(false)
const erro = ref('')

async function melhorarResumo() {
  if (!store.resumo.trim() || carregando.value) return

  carregando.value = true
  erro.value = ''

  try {
    const resposta = await fetch('/api/melhorar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ resumo: store.resumo }),
    })

    const dados = await resposta.json()

    if (!resposta.ok) {
      throw new Error(dados.erro || 'Falha ao melhorar o resumo.')
    }

    store.atualizarResumo(dados.resumo)
  } catch (e) {
    erro.value = e.message || 'Não foi possível melhorar o resumo agora.'
  } finally {
    carregando.value = false
  }
}
</script>

<template>
  <div>
    <h2 class="section-title">Resumo</h2>
    <div class="field">
      <label for="resumo">Resumo profissional</label>
      <textarea id="resumo" v-model="store.resumo" rows="5"></textarea>
    </div>
    <button
      type="button"
      class="btn-text"
      :disabled="carregando || !store.resumo.trim()"
      @click="melhorarResumo"
    >
      {{ carregando ? 'Melhorando...' : 'Melhorar resumo com IA' }}
    </button>
    <p v-if="erro" class="erro-ia">{{ erro }}</p>
  </div>
</template>

<style scoped>
.erro-ia {
  margin-top: 8px;
  font-size: 13px;
  color: #b3261e;
}
</style>

<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useCurriculoStore } from '../stores/curriculo'

const store = useCurriculoStore()
const folhaRef = ref(null)

const ALTURA_A4_PX = (297 * 96) / 25.4

function formatarLink(url) {
  if (!url) return ''
  return url
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
}

const contatos = computed(() => {
  const { email, telefone, cidade, linkedin, github } = store.dadosPessoais
  return [email, telefone, cidade, formatarLink(linkedin), formatarLink(github)].filter(Boolean)
})

function linhasDescricao(texto) {
  if (!texto) return []
  return texto
    .split('\n')
    .map((linha) => linha.trim().replace(/^[-•*]\s*/, ''))
    .filter(Boolean)
}

let observer

onMounted(() => {
  observer = new ResizeObserver(() => {
    if (folhaRef.value) {
      store.definirExcedeUmaPagina(folhaRef.value.scrollHeight > ALTURA_A4_PX + 2)
    }
  })
  observer.observe(folhaRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
})
</script>

<template>
  <article id="folha-curriculo" ref="folhaRef" class="folha">
    <header class="cabecalho">
      <h1>{{ store.dadosPessoais.nome || 'Seu nome' }}</h1>
      <p v-if="store.dadosPessoais.titulo" class="titulo">{{ store.dadosPessoais.titulo }}</p>
      <p v-if="contatos.length" class="contatos">{{ contatos.join(' • ') }}</p>
    </header>

    <section v-if="store.resumo" class="secao">
      <h2 class="titulo-secao">Resumo</h2>
      <p class="resumo-texto">{{ store.resumo }}</p>
    </section>

    <section v-if="store.experiencias.length" class="secao">
      <h2 class="titulo-secao">Experiência</h2>
      <div v-for="(experiencia, index) in store.experiencias" :key="index" class="item">
        <div class="item-cabecalho">
          <strong>{{ experiencia.cargo }}</strong>
          <span class="periodo">{{ experiencia.periodo }}</span>
        </div>
        <p class="subtitulo-item">{{ experiencia.empresa }}</p>
        <ul v-if="linhasDescricao(experiencia.descricao).length" class="descricao">
          <li v-for="(linha, i) in linhasDescricao(experiencia.descricao)" :key="i">{{ linha }}</li>
        </ul>
      </div>
    </section>

    <section v-if="store.formacao.length" class="secao">
      <h2 class="titulo-secao">Formação</h2>
      <div v-for="(item, index) in store.formacao" :key="index" class="item">
        <div class="item-cabecalho">
          <strong>{{ item.curso }}</strong>
          <span class="periodo">{{ item.periodo }}</span>
        </div>
        <p class="subtitulo-item">{{ item.instituicao }}</p>
      </div>
    </section>

    <section v-if="store.habilidades.length" class="secao">
      <h2 class="titulo-secao">Habilidades</h2>
      <p class="habilidades-lista">{{ store.habilidades.join(' • ') }}</p>
    </section>
  </article>
</template>

<style scoped>
.folha {
  width: 210mm;
  max-width: 100%;
  min-height: 297mm;
  margin: 0 auto;
  box-sizing: border-box;
  padding: 20mm 18mm;
  background: #ffffff;
  color: var(--text);
  overflow-wrap: anywhere;
  word-break: break-word;
  box-shadow:
    0 1px 3px rgba(0, 0, 0, 0.08),
    0 1px 2px rgba(0, 0, 0, 0.06);
}

.cabecalho {
  margin-bottom: 8px;
}

.cabecalho h1 {
  font-size: 32px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 4px;
}

.titulo {
  font-size: 15px;
  color: var(--text-muted);
  margin: 0 0 12px;
}

.contatos {
  font-size: 12.5px;
  color: var(--text-muted);
  margin: 0;
}

.secao {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
  break-inside: avoid;
  page-break-inside: avoid;
}

.titulo-secao {
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 16px;
}

.resumo-texto {
  font-size: 14px;
  line-height: 1.7;
  white-space: pre-line;
}

.item {
  margin-bottom: 18px;
  break-inside: avoid;
  page-break-inside: avoid;
}

.item:last-child {
  margin-bottom: 0;
}

.item-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-size: 14.5px;
}

.periodo {
  font-size: 12.5px;
  color: var(--text-muted);
  white-space: nowrap;
}

.subtitulo-item {
  font-size: 13.5px;
  color: var(--text-muted);
  margin: 2px 0 6px;
}

.descricao {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  font-size: 13.5px;
  line-height: 1.6;
}

.descricao li {
  position: relative;
  padding-left: 14px;
}

.descricao li::before {
  content: '•';
  position: absolute;
  left: 0;
}

.descricao li + li {
  margin-top: 2px;
}

.habilidades-lista {
  font-size: 13.5px;
  line-height: 1.8;
}
</style>

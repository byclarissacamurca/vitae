<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useCurriculoStore } from '../stores/curriculo'
import {
  TAMANHOS_FONTE_PX,
  FATORES_ESPACAMENTO,
  montarContatos,
  linhasDescricao,
  agruparHabilidades,
} from '../utils/formatarCurriculo'

const store = useCurriculoStore()
const folhaRef = ref(null)

const ALTURA_A4_PX = (297 * 96) / 25.4

const estiloFolha = computed(() => ({
  fontFamily: store.preferencias.fonte,
  fontSize: `${TAMANHOS_FONTE_PX[store.preferencias.tamanhoFonte] ?? 14}px`,
  '--cor-destaque': store.preferencias.corDestaque,
  '--fator-espaco': FATORES_ESPACAMENTO[store.preferencias.espacamento] ?? 1,
}))

const contatos = computed(() => montarContatos(store.dadosPessoais))
const habilidadesLinhas = computed(() => agruparHabilidades(store.habilidades))

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
  <article
    id="folha-curriculo"
    ref="folhaRef"
    class="folha"
    :class="{ 'modo-visual': store.preferencias.modo === 'visual' }"
    :style="estiloFolha"
  >
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
      <h2 class="titulo-secao">Experiência Profissional</h2>
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
      <h2 class="titulo-secao">Formação Acadêmica</h2>
      <div v-for="(item, index) in store.formacao" :key="index" class="item">
        <div class="item-cabecalho">
          <strong>{{ item.curso }}</strong>
          <span class="periodo">{{ item.periodo }}</span>
        </div>
        <p class="subtitulo-item">{{ item.instituicao }}</p>
      </div>
    </section>

    <section v-if="habilidadesLinhas.length" class="secao">
      <h2 class="titulo-secao">Habilidades</h2>
      <p v-for="(linha, i) in habilidadesLinhas" :key="i" class="habilidades-linha">
        <strong v-if="linha.categoria">{{ linha.categoria }}: </strong>{{ linha.itens.join(' • ') }}
      </p>
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
  margin-bottom: calc(8px * var(--fator-espaco, 1));
}

.cabecalho h1 {
  font-size: 2.2857em;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 4px;
}

.modo-visual .cabecalho h1 {
  color: var(--cor-destaque);
  font-family: Georgia, 'Times New Roman', serif;
  font-style: italic;
}

.titulo {
  font-size: 1.0714em;
  color: var(--text-muted);
  margin: 0 0 12px;
}

.contatos {
  font-size: 0.8929em;
  color: var(--text-muted);
  margin: 0;
}

.secao {
  margin-top: calc(32px * var(--fator-espaco, 1));
  padding-top: calc(20px * var(--fator-espaco, 1));
  border-top: 1px solid var(--cor-destaque, var(--accent));
}

.titulo-secao {
  font-size: 0.8571em;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--text-muted);
  margin: 0 0 16px;
}

.modo-visual .titulo-secao {
  color: var(--cor-destaque);
}

.resumo-texto {
  font-size: 1em;
  line-height: calc(1.7 * var(--fator-espaco, 1));
  white-space: pre-line;
}

.item {
  margin-bottom: calc(18px * var(--fator-espaco, 1));
}

.item:last-child {
  margin-bottom: 0;
}

.item-cabecalho {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 12px;
  font-size: 1.0357em;
}

.periodo {
  font-size: 0.8621em;
  color: var(--text-muted);
  white-space: nowrap;
}

.subtitulo-item {
  font-size: 0.9643em;
  color: var(--text-muted);
  margin: 2px 0 6px;
}

.descricao {
  margin: 6px 0 0;
  padding: 0;
  list-style: none;
  font-size: 0.9643em;
  line-height: calc(1.6 * var(--fator-espaco, 1));
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

.habilidades-linha {
  font-size: 0.9643em;
  line-height: calc(1.8 * var(--fator-espaco, 1));
  margin: 0;
}

.habilidades-linha + .habilidades-linha {
  margin-top: 4px;
}
</style>

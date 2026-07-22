<script setup>
import { useCurriculoStore } from '../stores/curriculo'
import { FONTES } from '../utils/formatarCurriculo'

const store = useCurriculoStore()

const PALETA_CORES = [
  { nome: 'Grafite', valor: '#1a1a1a' },
  { nome: 'Azul-marinho', valor: '#1f3350' },
  { nome: 'Petróleo', valor: '#2c4a52' },
  { nome: 'Verde-oliva', valor: '#4a5d43' },
  { nome: 'Bordô', valor: '#6b2c3e' },
  { nome: 'Terracota', valor: '#8a5a44' },
]

const OPCOES_TAMANHO = [
  { rotulo: 'Pequena', valor: 'pequeno' },
  { rotulo: 'Média', valor: 'medio' },
  { rotulo: 'Grande', valor: 'grande' },
]

const OPCOES_ESPACAMENTO = [
  { rotulo: 'Compacto', valor: 'compacto' },
  { rotulo: 'Normal', valor: 'normal' },
  { rotulo: 'Arejado', valor: 'arejado' },
]

const EXPLICACAO_MODO = {
  ats: 'Layout de uma coluna, títulos padrão e sem cor no texto — pensado para passar bem por sistemas de triagem automática (ATS).',
  visual:
    'Libera a cor de destaque nos títulos e no nome, com uma fonte de exibição — melhor para enviar por e-mail ou imprimir.',
}
</script>

<template>
  <details class="painel">
    <summary>Personalizar currículo</summary>
    <div class="painel-conteudo">
      <div class="painel-grupo">
        <span class="painel-rotulo">Modo</span>
        <div class="opcoes-segmentadas">
          <button
            type="button"
            :class="{ ativo: store.preferencias.modo === 'ats' }"
            @click="store.preferencias.modo = 'ats'"
          >
            ATS
          </button>
          <button
            type="button"
            :class="{ ativo: store.preferencias.modo === 'visual' }"
            @click="store.preferencias.modo = 'visual'"
          >
            Visual
          </button>
        </div>
        <p class="painel-ajuda">{{ EXPLICACAO_MODO[store.preferencias.modo] }}</p>
      </div>

      <div class="painel-grupo">
        <label for="fonte" class="painel-rotulo">Fonte</label>
        <select id="fonte" v-model="store.preferencias.fonte">
          <option v-for="fonte in FONTES" :key="fonte.nome" :value="fonte.valor">
            {{ fonte.nome }}
          </option>
        </select>
      </div>

      <div class="painel-grupo">
        <span class="painel-rotulo">Cor de destaque</span>
        <div class="paleta-cores">
          <button
            v-for="cor in PALETA_CORES"
            :key="cor.valor"
            type="button"
            class="swatch"
            :class="{ ativo: store.preferencias.corDestaque === cor.valor }"
            :style="{ background: cor.valor }"
            :title="cor.nome"
            @click="store.preferencias.corDestaque = cor.valor"
          ></button>
          <input
            v-model="store.preferencias.corDestaque"
            type="color"
            class="swatch-livre"
            title="Cor personalizada"
          />
        </div>
      </div>

      <div class="painel-grupo">
        <span class="painel-rotulo">Tamanho da fonte</span>
        <div class="opcoes-segmentadas">
          <button
            v-for="opcao in OPCOES_TAMANHO"
            :key="opcao.valor"
            type="button"
            :class="{ ativo: store.preferencias.tamanhoFonte === opcao.valor }"
            @click="store.preferencias.tamanhoFonte = opcao.valor"
          >
            {{ opcao.rotulo }}
          </button>
        </div>
      </div>

      <div class="painel-grupo">
        <span class="painel-rotulo">Espaçamento</span>
        <div class="opcoes-segmentadas">
          <button
            v-for="opcao in OPCOES_ESPACAMENTO"
            :key="opcao.valor"
            type="button"
            :class="{ ativo: store.preferencias.espacamento === opcao.valor }"
            @click="store.preferencias.espacamento = opcao.valor"
          >
            {{ opcao.rotulo }}
          </button>
        </div>
      </div>
    </div>
  </details>
</template>

<style scoped>
.painel {
  margin-bottom: 24px;
  border: 1px solid var(--border);
}

.painel summary {
  cursor: pointer;
  padding: 12px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--text);
  list-style: none;
}

.painel summary::-webkit-details-marker {
  display: none;
}

.painel summary::before {
  content: '+ ';
  color: var(--text-muted);
}

.painel[open] summary::before {
  content: '– ';
}

.painel-conteudo {
  padding: 4px 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  border-top: 1px solid var(--border);
}

.painel-grupo {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.painel-rotulo {
  font-size: 12px;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  color: var(--text-muted);
}

.painel-ajuda {
  margin: 0;
  font-size: 12.5px;
  line-height: 1.5;
  color: var(--text-muted);
}

.painel-conteudo select {
  font: inherit;
  font-size: 14px;
  color: var(--text);
  background: transparent;
  border: none;
  border-bottom: 1px solid var(--border);
  padding: 6px 0;
}

.opcoes-segmentadas {
  display: flex;
  gap: 8px;
}

.opcoes-segmentadas button {
  font: inherit;
  font-size: 13px;
  color: var(--text-muted);
  background: transparent;
  border: 1px solid var(--border);
  padding: 6px 14px;
  cursor: pointer;
}

.opcoes-segmentadas button.ativo {
  color: var(--text);
  border-color: var(--text);
}

.paleta-cores {
  display: flex;
  align-items: center;
  gap: 8px;
}

.swatch {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid var(--border);
  cursor: pointer;
}

.swatch.ativo {
  outline: 2px solid var(--text);
  outline-offset: 2px;
}

.swatch-livre {
  width: 22px;
  height: 22px;
  padding: 0;
  border: 1px solid var(--border);
  background: none;
  cursor: pointer;
}
</style>

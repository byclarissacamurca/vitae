<script setup>
import { ref } from 'vue'
import FormDadosPessoais from '../components/FormDadosPessoais.vue'
import FormResumo from '../components/FormResumo.vue'
import FormExperiencias from '../components/FormExperiencias.vue'
import FormFormacao from '../components/FormFormacao.vue'
import FormHabilidades from '../components/FormHabilidades.vue'
import PreviewCurriculo from '../components/PreviewCurriculo.vue'
import BotaoExportar from '../components/BotaoExportar.vue'
import PainelPersonalizacao from '../components/PainelPersonalizacao.vue'
import { useCurriculoStore } from '../stores/curriculo'

const store = useCurriculoStore()
const abaMobile = ref('editar')
</script>

<template>
  <div class="home">
    <div class="alternador-mobile">
      <button
        type="button"
        class="alternador-btn"
        :class="{ ativo: abaMobile === 'editar' }"
        @click="abaMobile = 'editar'"
      >
        Editar
      </button>
      <button
        type="button"
        class="alternador-btn"
        :class="{ ativo: abaMobile === 'visualizar' }"
        @click="abaMobile = 'visualizar'"
      >
        Visualizar
      </button>
    </div>

    <section class="form-column" :class="{ 'oculto-mobile': abaMobile !== 'editar' }">
      <PainelPersonalizacao />
      <p v-if="store.excedeUmaPagina" class="aviso-pagina">
        Seu currículo passou de 1 página. Currículos de uma página costumam ser lidos
        até o fim com mais frequência — considere cortar algum trecho.
      </p>
      <FormDadosPessoais />
      <FormResumo />
      <FormExperiencias />
      <FormFormacao />
      <FormHabilidades />
    </section>

    <section class="preview-column" :class="{ 'oculto-mobile': abaMobile !== 'visualizar' }">
      <div class="preview-toolbar">
        <BotaoExportar />
      </div>
      <PreviewCurriculo />
    </section>
  </div>
</template>

<style scoped>
.home {
  display: flex;
  align-items: flex-start;
  min-height: 100svh;
}

.alternador-mobile {
  display: none;
}

.form-column {
  flex: 1 1 45%;
  padding: 48px;
  border-right: 1px solid var(--border);
}

.aviso-pagina {
  margin: 0 0 24px;
  padding: 10px 14px;
  font-size: 13px;
  line-height: 1.5;
  color: var(--text-muted);
  border: 1px solid var(--border);
  border-left: 2px solid var(--text);
}

.preview-column {
  flex: 1 1 55%;
  padding: 48px;
  background: var(--bg);
  position: sticky;
  top: 0;
  align-self: flex-start;
  max-height: 100svh;
  overflow-y: auto;
}

.preview-toolbar {
  width: 210mm;
  max-width: 100%;
  margin: 0 auto 16px;
  display: flex;
  justify-content: flex-end;
}

@media (max-width: 768px) {
  .home {
    flex-direction: column;
  }

  .alternador-mobile {
    display: flex;
    position: sticky;
    top: 0;
    z-index: 1;
    background: var(--surface);
    border-bottom: 1px solid var(--border);
  }

  .alternador-btn {
    flex: 1;
    font: inherit;
    font-size: 14px;
    color: var(--text-muted);
    background: none;
    border: none;
    padding: 16px;
    cursor: pointer;
    border-bottom: 2px solid transparent;
  }

  .alternador-btn.ativo {
    color: var(--text);
    border-bottom-color: var(--accent);
  }

  .form-column,
  .preview-column {
    width: 100%;
    padding: 24px;
    border-right: none;
    position: static;
    max-height: none;
    overflow-y: visible;
  }

  .oculto-mobile {
    display: none;
  }
}
</style>

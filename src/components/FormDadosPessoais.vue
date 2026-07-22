<script setup>
import { useCurriculoStore } from '../stores/curriculo'
import BlocoFormulario from './BlocoFormulario.vue'

const store = useCurriculoStore()
</script>

<template>
  <BlocoFormulario titulo="Dados Pessoais" chave="dados-pessoais">
    <div class="field">
      <label for="nome">Nome</label>
      <input id="nome" v-model="store.dadosPessoais.nome" type="text" />
    </div>
    <div class="field">
      <label for="titulo">Título profissional</label>
      <input id="titulo" v-model="store.dadosPessoais.titulo" type="text" />
    </div>
    <div class="field">
      <label for="email">Email</label>
      <input id="email" v-model="store.dadosPessoais.email" type="email" />
    </div>
    <div class="field">
      <label for="telefone">Telefone</label>
      <input id="telefone" v-model="store.dadosPessoais.telefone" type="text" />
    </div>
    <div class="field">
      <label for="cidade">Cidade</label>
      <input id="cidade" v-model="store.dadosPessoais.cidade" type="text" />
    </div>
    <div class="field">
      <label for="linkedin">LinkedIn</label>
      <input id="linkedin" v-model="store.dadosPessoais.linkedin" type="text" />
    </div>
    <div class="field">
      <label for="github">GitHub</label>
      <input id="github" v-model="store.dadosPessoais.github" type="text" />
    </div>
  </BlocoFormulario>
</template>

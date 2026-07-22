import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useLocalStorage } from '@vueuse/core'

export const useCurriculoStore = defineStore('curriculo', () => {
  const excedeUmaPagina = ref(false)

  const dadosPessoais = useLocalStorage('curriculo-dados-pessoais', {
    nome: '',
    titulo: '',
    email: '',
    telefone: '',
    cidade: '',
    linkedin: '',
    github: '',
  })

  const resumo = useLocalStorage('curriculo-resumo', '')

  const experiencias = useLocalStorage('curriculo-experiencias', [])

  const formacao = useLocalStorage('curriculo-formacao', [])

  const habilidades = useLocalStorage('curriculo-habilidades', [])

  const preferencias = useLocalStorage('curriculo-preferencias', {
    modo: 'ats',
    fonte: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
    corDestaque: '#1a1a1a',
    tamanhoFonte: 'medio',
    espacamento: 'normal',
  })

  function atualizarDadosPessoais(dados) {
    Object.assign(dadosPessoais.value, dados)
  }

  function atualizarResumo(texto) {
    resumo.value = texto
  }

  function adicionarExperiencia() {
    experiencias.value.push({ cargo: '', empresa: '', periodo: '', descricao: '' })
  }

  function removerExperiencia(index) {
    experiencias.value.splice(index, 1)
  }

  function adicionarFormacao() {
    formacao.value.push({ curso: '', instituicao: '', periodo: '' })
  }

  function removerFormacao(index) {
    formacao.value.splice(index, 1)
  }

  function adicionarHabilidade(habilidade) {
    const valor = habilidade.trim()
    if (valor && !habilidades.value.includes(valor)) {
      habilidades.value.push(valor)
    }
  }

  function removerHabilidade(index) {
    habilidades.value.splice(index, 1)
  }

  function definirExcedeUmaPagina(valor) {
    excedeUmaPagina.value = valor
  }

  return {
    dadosPessoais,
    resumo,
    experiencias,
    formacao,
    habilidades,
    preferencias,
    excedeUmaPagina,
    atualizarDadosPessoais,
    atualizarResumo,
    adicionarExperiencia,
    removerExperiencia,
    adicionarFormacao,
    removerFormacao,
    adicionarHabilidade,
    removerHabilidade,
    definirExcedeUmaPagina,
  }
})

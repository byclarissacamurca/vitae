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

  const habilidades = useLocalStorage('curriculo-habilidades', [{ categoria: '', itens: [] }])

  // Migra o formato antigo (array de strings) para o novo formato por categoria.
  if (habilidades.value.length && typeof habilidades.value[0] === 'string') {
    habilidades.value = [{ categoria: '', itens: [...habilidades.value] }]
  }

  const preferencias = useLocalStorage('curriculo-preferencias', {
    modo: 'ats',
    fonte: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif",
    corDestaque: '#1a1a1a',
    tamanhoFonte: 'medio',
    espacamento: 'normal',
  })

  function moverItem(lista, indice, direcao) {
    const novoIndice = indice + direcao
    if (novoIndice < 0 || novoIndice >= lista.length) return
    ;[lista[indice], lista[novoIndice]] = [lista[novoIndice], lista[indice]]
  }

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

  function moverExperiencia(indice, direcao) {
    moverItem(experiencias.value, indice, direcao)
  }

  function adicionarFormacao() {
    formacao.value.push({ curso: '', instituicao: '', periodo: '' })
  }

  function removerFormacao(index) {
    formacao.value.splice(index, 1)
  }

  function moverFormacao(indice, direcao) {
    moverItem(formacao.value, indice, direcao)
  }

  function adicionarCategoriaHabilidade() {
    habilidades.value.push({ categoria: '', itens: [] })
  }

  function removerCategoriaHabilidade(indiceCategoria) {
    habilidades.value.splice(indiceCategoria, 1)
    if (!habilidades.value.length) {
      habilidades.value.push({ categoria: '', itens: [] })
    }
  }

  function moverCategoriaHabilidade(indiceCategoria, direcao) {
    moverItem(habilidades.value, indiceCategoria, direcao)
  }

  function adicionarItemHabilidade(indiceCategoria, item) {
    const valor = item.trim()
    const categoria = habilidades.value[indiceCategoria]
    if (valor && categoria && !categoria.itens.includes(valor)) {
      categoria.itens.push(valor)
    }
  }

  function removerItemHabilidade(indiceCategoria, indiceItem) {
    habilidades.value[indiceCategoria]?.itens.splice(indiceItem, 1)
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
    moverExperiencia,
    adicionarFormacao,
    removerFormacao,
    moverFormacao,
    adicionarCategoriaHabilidade,
    removerCategoriaHabilidade,
    moverCategoriaHabilidade,
    adicionarItemHabilidade,
    removerItemHabilidade,
    definirExcedeUmaPagina,
  }
})

import { ref, watchEffect } from 'vue'

const CHAVE_ARMAZENAMENTO = 'vitae-tema'

function detectarPreferenciaSistema() {
  if (typeof window === 'undefined' || !window.matchMedia) return 'claro'
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'escuro' : 'claro'
}

function lerTemaSalvo() {
  if (typeof window === 'undefined') return null
  const salvo = window.localStorage.getItem(CHAVE_ARMAZENAMENTO)
  return salvo === 'claro' || salvo === 'escuro' ? salvo : null
}

const tema = ref(lerTemaSalvo() ?? detectarPreferenciaSistema())

watchEffect(() => {
  if (typeof document === 'undefined') return
  document.documentElement.setAttribute('data-theme', tema.value)
})

function definirTema(valor) {
  tema.value = valor
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CHAVE_ARMAZENAMENTO, valor)
  }
}

export function useTema() {
  return { tema, definirTema }
}

export const TAMANHOS_FONTE_PX = { pequeno: 13, medio: 14, grande: 15.5 }
export const FATORES_ESPACAMENTO = { compacto: 0.75, normal: 1, arejado: 1.25 }

// "pdf" indica a fonte real usada na exportação em PDF (pdfmake): como fontes
// proprietárias (Arial, Calibri, Times New Roman) não podem ser embutidas no
// PDF, cada opção mapeia para a fonte segura mais próxima já registrada
// (Roboto para sans, Times para serifada).
export const FONTES = [
  { nome: 'Inter', valor: "'Inter', system-ui, 'Segoe UI', Roboto, sans-serif", pdf: 'Roboto' },
  { nome: 'Arial', valor: 'Arial, Helvetica, sans-serif', pdf: 'Helvetica' },
  { nome: 'Helvetica', valor: 'Helvetica, Arial, sans-serif', pdf: 'Helvetica' },
  { nome: 'Calibri', valor: "Calibri, Candara, Segoe, 'Segoe UI', Optima, sans-serif", pdf: 'Roboto' },
  { nome: 'Georgia', valor: "Georgia, 'Times New Roman', serif", pdf: 'Times' },
  { nome: 'Times New Roman', valor: "'Times New Roman', Times, serif", pdf: 'Times' },
]

export function formatarLink(url) {
  if (!url) return ''
  return url
    .trim()
    .replace(/^https?:\/\//i, '')
    .replace(/^www\./i, '')
    .replace(/\/+$/, '')
}

export function montarContatos(dadosPessoais) {
  const { email, telefone, cidade, linkedin, github } = dadosPessoais
  return [email, telefone, cidade, formatarLink(linkedin), formatarLink(github)].filter(Boolean)
}

export function linhasDescricao(texto) {
  if (!texto) return []
  return texto
    .split('\n')
    .map((linha) => linha.trim().replace(/^[-•*]\s*/, ''))
    .filter(Boolean)
}

/**
 * Agrupa habilidades por categoria para exibição.
 * Se nenhuma categoria tiver nome, devolve uma única linha sem rótulo
 * (lista simples, igual ao comportamento anterior às categorias).
 */
export function agruparHabilidades(habilidades) {
  const temCategoriasNomeadas = habilidades.some((c) => c.categoria?.trim())

  if (!temCategoriasNomeadas) {
    const todosItens = habilidades.flatMap((c) => c.itens)
    return todosItens.length ? [{ categoria: '', itens: todosItens }] : []
  }

  return habilidades.filter((c) => c.itens.length)
}

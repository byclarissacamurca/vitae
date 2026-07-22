import { useCurriculoStore } from '../stores/curriculo'
import {
  TAMANHOS_FONTE_PX,
  FATORES_ESPACAMENTO,
  FONTES,
  montarContatos,
  linhasDescricao,
  agruparHabilidades,
} from '../utils/formatarCurriculo'

// A4 (595pt de largura) menos as margens de ~40pt de cada lado.
const LARGURA_CONTEUDO_PT = 515

const COR_TEXTO = '#1a1a1a'
const COR_TEXTO_MUTED = '#6b6b6f'

function mapearFontePdf(fonteCss) {
  return FONTES.find((fonte) => fonte.valor === fonteCss)?.pdf ?? 'Roboto'
}

function linhaSeparadora(corDestaque, margemInferior) {
  return {
    canvas: [
      { type: 'line', x1: 0, y1: 0, x2: LARGURA_CONTEUDO_PT, y2: 0, lineWidth: 1, lineColor: corDestaque },
    ],
    margin: [0, 0, 0, margemInferior],
  }
}

function aplicarMargemInferior(bloco, valor) {
  const atual = bloco.margin ?? [0, 0, 0, 0]
  bloco.margin = [atual[0] ?? 0, atual[1] ?? 0, atual[2] ?? 0, valor]
  return bloco
}

export function montarDocDefinition(store) {
  const { dadosPessoais, resumo, experiencias, formacao, habilidades, preferencias } = store
  const modoVisual = preferencias.modo === 'visual'
  const corDestaque = preferencias.corDestaque
  const fontePdf = mapearFontePdf(preferencias.fonte)
  const tamanhoBase = (TAMANHOS_FONTE_PX[preferencias.tamanhoFonte] ?? 14) * 0.75
  const fatorEspaco = FATORES_ESPACAMENTO[preferencias.espacamento] ?? 1

  const contatos = montarContatos(dadosPessoais)
  const habilidadesLinhas = agruparHabilidades(habilidades)

  const content = []

  // Cabeçalho: nome em destaque, título abaixo em cinza, contatos por último.
  content.push({
    text: dadosPessoais.nome || 'Seu nome',
    fontSize: tamanhoBase * 2.2857,
    bold: true,
    italics: modoVisual,
    font: modoVisual ? 'Times' : fontePdf,
    color: modoVisual ? corDestaque : COR_TEXTO,
    margin: [0, 0, 0, 3],
  })

  if (dadosPessoais.titulo) {
    content.push({
      text: dadosPessoais.titulo,
      fontSize: tamanhoBase * 1.0714,
      color: COR_TEXTO_MUTED,
      margin: [0, 0, 0, 9],
    })
  }

  if (contatos.length) {
    content.push({
      text: contatos.join(' • '),
      fontSize: tamanhoBase * 0.8929,
      color: COR_TEXTO_MUTED,
    })
  }

  function tituloSecao(texto) {
    content.push({
      text: texto.toUpperCase(),
      fontSize: tamanhoBase * 0.8571,
      bold: true,
      characterSpacing: 0.5,
      color: modoVisual ? corDestaque : COR_TEXTO_MUTED,
      margin: [0, 24 * fatorEspaco, 0, 6 * fatorEspaco],
    })
    content.push(linhaSeparadora(corDestaque, 10 * fatorEspaco))
  }

  if (resumo) {
    tituloSecao('Resumo')
    content.push({
      text: resumo,
      fontSize: tamanhoBase,
      color: COR_TEXTO,
      lineHeight: 1.35 * fatorEspaco,
    })
  }

  if (experiencias.length) {
    tituloSecao('Experiência Profissional')
    experiencias.forEach((experiencia, indice) => {
      const blocosItem = [
        {
          columns: [
            { text: experiencia.cargo, bold: true, fontSize: tamanhoBase * 1.0357, color: COR_TEXTO },
            {
              text: experiencia.periodo,
              alignment: 'right',
              fontSize: tamanhoBase * 0.8621,
              color: COR_TEXTO_MUTED,
            },
          ],
        },
      ]

      if (experiencia.empresa) {
        blocosItem.push({
          text: experiencia.empresa,
          fontSize: tamanhoBase * 0.9643,
          color: COR_TEXTO_MUTED,
          margin: [0, 1, 0, 3],
        })
      }

      const linhas = linhasDescricao(experiencia.descricao)
      if (linhas.length) {
        blocosItem.push({ ul: linhas, fontSize: tamanhoBase * 0.9643, color: COR_TEXTO })
      }

      const ultimoItem = indice === experiencias.length - 1
      aplicarMargemInferior(blocosItem[blocosItem.length - 1], ultimoItem ? 0 : 12 * fatorEspaco)
      content.push(...blocosItem)
    })
  }

  if (formacao.length) {
    tituloSecao('Formação Acadêmica')
    formacao.forEach((item, indice) => {
      const blocosItem = [
        {
          columns: [
            { text: item.curso, bold: true, fontSize: tamanhoBase * 1.0357, color: COR_TEXTO },
            { text: item.periodo, alignment: 'right', fontSize: tamanhoBase * 0.8621, color: COR_TEXTO_MUTED },
          ],
        },
      ]

      if (item.instituicao) {
        blocosItem.push({
          text: item.instituicao,
          fontSize: tamanhoBase * 0.9643,
          color: COR_TEXTO_MUTED,
          margin: [0, 1, 0, 0],
        })
      }

      const ultimoItem = indice === formacao.length - 1
      aplicarMargemInferior(blocosItem[blocosItem.length - 1], ultimoItem ? 0 : 12 * fatorEspaco)
      content.push(...blocosItem)
    })
  }

  if (habilidadesLinhas.length) {
    tituloSecao('Habilidades')
    habilidadesLinhas.forEach((linha, indice) => {
      const ultimaLinha = indice === habilidadesLinhas.length - 1
      content.push({
        text: linha.categoria
          ? [{ text: `${linha.categoria}: `, bold: true }, { text: linha.itens.join(' • ') }]
          : linha.itens.join(' • '),
        fontSize: tamanhoBase * 0.9643,
        color: COR_TEXTO,
        margin: [0, 0, 0, ultimaLinha ? 0 : 4],
      })
    })
  }

  return {
    pageSize: 'A4',
    pageMargins: [40, 40, 40, 40],
    defaultStyle: {
      font: fontePdf,
      color: COR_TEXTO,
    },
    content,
  }
}

export function useExportarPdf() {
  const store = useCurriculoStore()

  async function exportarPdf() {
    const [
      { default: pdfMake },
      { default: pdfFonts },
      { default: helveticaFontContainer },
      { default: timesFontContainer },
    ] = await Promise.all([
      import('pdfmake/build/pdfmake'),
      import('pdfmake/build/vfs_fonts'),
      import('pdfmake/build/standard-fonts/Helvetica'),
      import('pdfmake/build/standard-fonts/Times'),
    ])

    pdfMake.addVirtualFileSystem(pdfFonts)
    pdfMake.addFontContainer(helveticaFontContainer)
    pdfMake.addFontContainer(timesFontContainer)

    const docDefinition = montarDocDefinition(store)
    pdfMake.createPdf(docDefinition).download('curriculo.pdf')
  }

  return { exportarPdf }
}

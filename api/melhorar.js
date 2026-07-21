import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ erro: 'Método não permitido.' })
    return
  }

  const { resumo } = req.body ?? {}

  if (typeof resumo !== 'string' || !resumo.trim()) {
    res.status(400).json({ erro: 'Envie um resumo para melhorar.' })
    return
  }

  try {
    const mensagem = await client.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system:
        'Você reescreve resumos profissionais de currículo em português do Brasil. ' +
        'Melhore clareza, concisão e impacto, mantendo os fatos originais e o tamanho ' +
        'aproximado do texto. Responda APENAS com o resumo reescrito, sem comentários, ' +
        'introduções ou aspas.',
      messages: [{ role: 'user', content: resumo }],
    })

    const texto = mensagem.content.find((bloco) => bloco.type === 'text')?.text ?? ''

    if (!texto.trim()) {
      res.status(502).json({ erro: 'A IA não retornou um resumo. Tente novamente.' })
      return
    }

    res.status(200).json({ resumo: texto.trim() })
  } catch (erro) {
    console.error('Erro ao chamar a API da Anthropic:', erro)
    res.status(502).json({ erro: 'Não foi possível melhorar o resumo agora. Tente novamente.' })
  }
}

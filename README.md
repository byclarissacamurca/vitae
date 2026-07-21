# Gerador de Currículo

Gerador de currículo com preview ao vivo e exportação em PDF, em estilo minimalista
tipográfico: muito espaço em branco, tipografia como protagonista, sem cores
vibrantes nem sombras pesadas. Você preenche um formulário à esquerda e vê, em
tempo real, um currículo de uma página se montando à direita, pronto para baixar.

<!-- TODO: adicionar print da aplicação em ./docs/preview.png e descomentar a linha abaixo -->
<!-- ![Preview do Gerador de Currículo](./docs/preview.png) -->

## Deploy

<!-- TODO: substituir pelo link real após o deploy na Vercel -->
🔗 _(link do deploy na Vercel aqui)_

## Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vite.dev/)
- [Pinia](https://pinia.vuejs.org/) — estado global do currículo
- [html2pdf.js](https://github.com/eKoopmans/html2pdf.js) — exportação em PDF
- [@vueuse/core](https://vueuse.org/) — persistência em localStorage
- Fonte [Inter](https://rsms.me/inter/)

## Funcionalidades

- Formulário reativo com dados pessoais, resumo, experiências, formação e habilidades
- Listas dinâmicas: adicionar/remover experiências e formações
- Habilidades como tags, adicionadas ao pressionar Enter
- Preview ao vivo de uma folha A4, atualizado a cada tecla digitada
- Exportação em PDF limpo (só o currículo, sem UI do formulário)
- Persistência automática no localStorage — recarregar a página não perde os dados
- Responsivo: colunas lado a lado no desktop (preview fixo ao rolar o formulário) e
  alternador "Editar / Visualizar" no mobile
- "Melhorar resumo com IA": reescreve o resumo profissional via Claude, chamado
  por uma função serverless (a chave de API nunca fica no front-end)

## Como rodar localmente

```bash
npm install
npm run dev
```

Abra o endereço exibido no terminal (por padrão `http://localhost:5173`).

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Configurando o "Melhorar resumo com IA"

O botão ao lado do campo de resumo chama `api/melhorar.js`, uma função serverless
que usa o [SDK oficial da Anthropic](https://github.com/anthropics/anthropic-sdk-typescript)
para reescrever o texto. A chave de API **nunca** fica no front-end — ela só existe
como variável de ambiente lida pela função no servidor.

1. Gere uma chave em [console.anthropic.com](https://console.anthropic.com/settings/keys).
2. No painel da Vercel: **Project Settings → Environment Variables** e adicione
   `ANTHROPIC_API_KEY` com o valor da chave.
3. Para testar localmente, use a [Vercel CLI](https://vercel.com/docs/cli) (o
   `npm run dev` do Vite não executa funções serverless): copie `.env.example`
   para `.env`, preencha a chave e rode `vercel dev` em vez de `npm run dev`.

Sem a variável de ambiente configurada, o botão mostra uma mensagem de erro ao
tentar melhorar o resumo — o restante do app funciona normalmente.

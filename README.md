# Vitae - Gerador de Currículo

<img width="1329" height="631" alt="image" src="https://github.com/user-attachments/assets/c9df42a7-3ae7-480e-b30c-18cefed6a408" />


Gerador de currículo com preview ao vivo e exportação em PDF, em estilo minimalista
tipográfico: muito espaço em branco, tipografia como protagonista, sem cores
vibrantes nem sombras pesadas. Você preenche um formulário à esquerda e vê, em
tempo real, um currículo de uma página se montando à direita, pronto para baixar.

<!-- TODO: adicionar print da aplicação em ./docs/preview.png e descomentar a linha abaixo -->
<!-- ![Preview do Gerador de Currículo](./docs/preview.png) -->

## Deploy

<!-- TODO: substituir pelo link real após o deploy na Vercel -->
🔗 _https://vitae-gerador-curriculo.vercel.app/_

## Stack

- [Vue 3](https://vuejs.org/) (Composition API, `<script setup>`)
- [Vite](https://vite.dev/)
- [Pinia](https://pinia.vuejs.org/) — estado global do currículo
- [pdfmake](https://github.com/bpampuch/pdfmake) — exportação em PDF com texto real (selecionável e legível por ATS)
- [@vueuse/core](https://vueuse.org/) — persistência em localStorage
- Fonte [Inter](https://rsms.me/inter/)

## Funcionalidades

- Formulário reativo com dados pessoais, resumo, experiências, formação e habilidades
- Listas dinâmicas: adicionar/remover experiências e formações
- Habilidades como tags, adicionadas ao pressionar Enter
- Preview ao vivo de uma folha A4, atualizado a cada tecla digitada
- Habilidades organizadas por categoria (ex: "Front-end: Vue.js • React"), com
  fallback para lista simples se nenhuma categoria for criada
- Exportação em PDF com texto real (selecionável, legível por ATS), download
  direto sem passar pela caixa de impressão do navegador
- Modo ATS (padrão, uma coluna, títulos padrão, sem cor no texto) e Modo Visual
  (libera cor de destaque e fonte de exibição no nome)
- Painel de personalização: fonte, cor de destaque, tamanho da fonte e espaçamento
- Persistência automática no localStorage — recarregar a página não perde os dados
- Responsivo: colunas lado a lado no desktop (preview fixo ao rolar o formulário) e
  alternador "Editar / Visualizar" no mobile
- Tema claro/escuro com detecção da preferência do sistema e persistência local

## Sobre as fontes no PDF exportado

Para o texto do PDF ser real (selecionável e legível por ATS), a fonte precisa
estar incorporada no arquivo — e fontes proprietárias como Arial, Calibri e Times
New Roman não podem ser embutidas sem licença. Por isso, no PDF exportado (não no
preview em tela, que usa a fonte real do seu sistema):

- Inter/Arial/Helvetica/Calibri → renderizam como **Roboto** (embutida, licença livre)
- Georgia/Times New Roman → renderizam como **Times** (fonte padrão do PDF, sem
  necessidade de incorporação)

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

# Estética e Bem-Estar

Base de uma plataforma de autocuidado construída com **Next.js (App Router), TypeScript, Tailwind CSS e Firebase Web SDK**. Interface em português, responsiva, com navegação para teclado e identidade em verde-sálvia, bege e branco.

## Executar localmente

Use Node.js 24 (`nvm use`, caso utilize nvm).

```bash
npm ci
npm run dev
```

Abra `http://localhost:3000` no seu navegador. Rotas: `/`, `/login` e `/cadastro`. O site público funciona sem variáveis Firebase e não precisa de banco de dados para exibir o conteúdo inicial.

O `package-lock.json` está versionado. Use `npm ci` para reproduzir a instalação; `npm install` fica reservado à atualização intencional de dependências.

```bash
npm run lint
npm run typecheck
npm run build
npm start
```

Execute os comandos na raiz do repositório. `npm start` exige um build concluído. O HTML enviado originalmente está preservado em `index.html` como referência; a aplicação ativa usa `src/app`.

## Estrutura

```text
src/app/                 Layout, estilos globais e páginas do App Router
src/components/          Cabeçalho, rodapé, formulários e elementos reutilizáveis
src/data/content.ts      Serviços, perfis e conteúdo educativo demonstrativos
src/lib/firebase/        Inicialização opcional de Authentication e Firestore
.env.example             Nomes das variáveis públicas do aplicativo Firebase
index.html               HTML original enviado, preservado
```

## O que funciona nesta etapa

- Home com serviços, proposta de cuidado, profissionais, planejamento de agendamento e conteúdo educativo.
- Menu móvel acessível e formulários com validação nativa, feedback e estado de envio.
- Login e cadastro por e-mail/senha usando Firebase Authentication **quando configurado**. Sem configuração, o site informa que o acesso ainda não está disponível e não envia dados.
- Inicialização do cliente Firestore preparada; nenhuma leitura ou gravação de documentos nesta etapa.

Serviços e profissionais são exemplos. O formulário de agendamento apenas valida a seleção; não consulta disponibilidade nem reserva horários. Área pessoal, fidelidade, registros de hábitos, gestão de profissionais e persistência de agendamentos ficam para as próximas etapas. Os cartões educativos apresentam textos curtos, sem páginas de artigos ou diagnóstico médico.

## Configurar Firebase futuramente

1. Escolha um projeto Firebase e registre um aplicativo Web no Console.
2. Copie `.env.example` para `.env.local` e preencha as quatro variáveis com a configuração pública desse aplicativo. Nunca adicione credenciais de administrador ou chaves privadas em variáveis `NEXT_PUBLIC_*`.
3. Em Authentication, habilite **E-mail/senha** e confira os domínios autorizados (incluindo `localhost` para desenvolvimento).
4. Reinicie o servidor. Valide criação de conta, entrada e mensagens de erro com um projeto de desenvolvimento.
5. Antes de usar Firestore, defina instância/edição, região, modelo de dados e regras de acesso. Crie testes de regras e use emuladores antes de liberar gravações. Não habilite acesso público irrestrito. O código atual não exige criar um banco nem implantar regras.

A criação de conta persiste apenas no Firebase Authentication. Não há perfil Firestore, dados médicos ou registros de hábitos. A configuração Firebase e os fluxos reais de autenticação precisam ser validados no projeto escolhido. Em produção, revise política de privacidade, fluxo de recuperação de senha, verificação de e-mail e gestão de sessão conforme a próxima etapa do produto.

## Implantação

### Vercel

Importe o repositório no painel da Vercel, selecione Next.js e Node.js 24. Build: `npm run build`; mantenha o diretório de saída padrão. Configure as variáveis `.env.example` no painel se for ativar Authentication e adicione o domínio publicado aos domínios autorizados do Firebase. As variáveis `NEXT_PUBLIC_*` são incorporadas no build: alterações exigem nova implantação.

### Servidor Node.js

```bash
npm ci
npm run build
npm start
```

Defina `PORT` se necessário, mantenha o processo sob supervisão e configure HTTPS no proxy da sua hospedagem. Alternativamente, Firebase App Hosting suporta aplicações Next.js; a criação do backend, vínculo com o repositório e faturamento devem ser configurados numa etapa de implantação específica. Este projeto não realiza deploy automaticamente.

## Revisão

Veja `docs/review.md` para escopo e roteiro de verificação. Nenhuma infraestrutura Firebase foi provisionada e nenhuma implantação é disparada por este repositório.

### GitHub Pages

O workflow `.github/workflows/pages.yml` publica a exportação estática a cada push em `main` ou `feat/plataforma-estetica-bem-estar`, ou manualmente pela aba Actions. Em **Settings → Pages → Build and deployment**, selecione **GitHub Actions**. Se a proteção do ambiente `github-pages` restringir branches, autorize a branch de publicação. Após a implantação bem-sucedida, o endereço esperado é `https://r-test24.github.io/Est-tica-e-Bem-Estar/`.

O workflow usa `GITHUB_PAGES=true` para exportar em `out/` com o prefixo `/Est-tica-e-Bem-Estar`. O desenvolvimento local e o build Node.js continuam sem esse prefixo. Para reproduzir a exportação: `GITHUB_PAGES=true npm run build` (Bash). A pasta `out/` é gerada e não deve ser versionada.

GitHub Pages hospeda arquivos estáticos: não oferece API, SSR nem banco de dados. Os fluxos Firebase executados no navegador são compatíveis; para ativá-los, cadastre as quatro variáveis públicas em **Settings → Secrets and variables → Actions → Variables** e autorize `r-test24.github.io` no Firebase Authentication. Alterações exigem novo build. Reservas reais e operações privilegiadas precisarão de um backend separado. Quando apenas `main` for a branch oficial, remova a branch inicial da lista `on.push.branches` do workflow para manter uma única origem de publicação.

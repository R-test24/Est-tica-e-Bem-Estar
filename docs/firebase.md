# Preparação Firebase

A implementação está preparada para **Firebase Authentication (e-mail/senha)**, **Cloud Firestore com a API Web padrão (Native/Standard)** e **Firebase Hosting estático**. Nenhum projeto, banco ou recurso pago foi criado. A edição de um banco real ainda não foi identificada: confirme a edição/API ao escolher seu projeto; esta preparação não utiliza a API MongoDB nem recursos de Firestore Enterprise.

## 1. Escolher e configurar o projeto

1. No Console Firebase, crie/escolha seu projeto e registre um aplicativo Web.
2. Copie `.env.example` para `.env.local` e preencha as quatro variáveis públicas da configuração Web. Não inclua credenciais de servidor, senhas, JSON de service account ou tokens em `NEXT_PUBLIC_*`.
3. Ative Authentication → Sign-in method → E-mail/senha. Configure a política de senha e os modelos de recuperação conforme seu produto. A UI de cadastro exige no mínimo oito caracteres.
4. Confira Authentication → Settings → Authorized domains: `localhost`, o domínio Hosting e/ou `r-test24.github.io`, conforme a hospedagem utilizada. Informe só o hostname, sem protocolo, porta ou caminho.
5. Crie/escolha uma instância Firestore com a API padrão compatível com o Web SDK. Confirme edição, região, custos e requisitos de dados antes de criar a instância. Use o banco `(default)` nesta implementação.
6. Autentique a CLI no seu computador e confira o projeto selecionado antes de publicar regras. O repositório não contém `.firebaserc` para evitar selecionar um projeto real por engano. Os comandos de teste usam exclusivamente `demo-estetica`.

```bash
npx firebase login
npx firebase firestore:databases:list --project SEU_ID
npx firebase firestore:databases:get '(default)' --project SEU_ID
# Depois de testar e revisar as regras:
npx firebase deploy --only firestore:rules,firestore:indexes --project SEU_ID
npm run dev
```

Substitua `SEU_ID`. Regras devem estar publicadas antes de permitir uso do banco pela aplicação. A configuração Firebase do cliente é pública; a proteção de dados depende das regras, não de esconder a API key.

## 2. Comportamento da aplicação

Sem as quatro variáveis preenchidas, a demonstração continua usando `localStorage`. Com as quatro presentes, login/cadastro são ativados e os planejamentos e hábitos passam a usar Firestore. Usuários sem sessão são orientados a entrar; leituras e escritas no banco exigem proprietário autenticado.

Após cadastro ou login, a aplicação abre `/minha-area`. O cabeçalho oferece **Sair da conta**. A página `/recuperar-senha` usa o fluxo de recuperação do Firebase, com mensagem genérica para evitar informar se o e-mail possui uma conta. O Firebase gerencia a persistência de sessão no navegador; use logout em dispositivos compartilhados.

**Não há migração automática dos dados locais para contas.** Os registros da demonstração não são enviados silenciosamente ao Firebase. Ao mudar de conta, a UI oculta os dados da sessão anterior e encerra os listeners antigos. Não há perfil público nem documento raiz de usuário obrigatório.

Erros de regras, conexão e configuração são apresentados ao usuário. Não habilite regras públicas para resolver `permission-denied`; confira o ID, o projeto, a sessão e as regras implantadas. No modo Firebase, a confirmação de salvamento aguarda o servidor. A sincronização usa cache em memória, sem habilitar cache persistente Firestore.

## 3. Modelo e regras de dados

- `users/{uid}/bookings/{id}`: `service`, `professional`, `startsAt` (Timestamp), `createdAt` (serverTimestamp), `status: planned`. Pode ser criado, lido e removido pelo dono; atualizações são negadas. Apenas planejamentos futuros são aceitos na criação. As datas são instantes e exibidas no fuso do navegador.
- `users/{uid}/days/{YYYY-MM-DD}`: `day` (meia-noite UTC correspondente à chave), `habits` (lista única dos IDs `pausa`, `movimento`, `autocuidado`), `updatedAt` (serverTimestamp). A chave representa o dia local selecionado pelo navegador. Para acomodar fusos, as regras aceitam escritas no dia UTC atual e nos dias adjacentes; não aceitam alterar históricos antigos ou inventar datas distantes.
- Todas as outras coleções/campos são negados. Não há campos editáveis de role, pontos, descontos ou reserva confirmada. Leituras de coleções são sempre escopadas ao UID; a aplicação não usa consultas globais ou índices compostos.

As regras são um protótipo e exigem revisão antes de lançamento amplo. Os pontos são calculados pela UI a partir dos hábitos declarados, são demonstrativos e não representam uma carteira ou recompensa de valor. O bloqueio de sobreposição é uma conveniência do cliente; não impede corridas entre dispositivos e não reserva agenda de profissionais. Reservas reais exigem uma API confiável com disponibilidade e controle transacional no backend.

## 4. Emuladores e testes

Requisitos: Node.js 24, Java 21 e download permitido em `storage.googleapis.com` para o emulador oficial Firestore. Não é necessário login Firebase para testar o projeto `demo-estetica`. Não use dados de pessoas reais nos testes.

```bash
npm ci
npx playwright install chromium
npm run test:rules
npm run test:auth
npm run test:firebase
```

`test:rules` inicia Firestore e verifica acesso anônimo, outra conta, enumerações, campos extras, tipos, imutabilidade, timestamps, datas e listas. `test:auth` inicia apenas Authentication e verifica cadastro/login/logout, sessão e recuperação genérica. `test:firebase` inicia ambos e verifica o fluxo integrado, persistência e isolamento de duas contas. `test:e2e` continua executando os oito testes da demonstração local e da biblioteca, sem exigir Firebase.

Para explorar manualmente:

```bash
cp -n .env.emulator.example .env.local
npm run emulators
# Em outro terminal:
npm run dev
```

O comando de cópia não substitui `.env.local` existente; se já houver configuração real, preserve-a e use os testes automatizados com variáveis injetadas. Use apenas localhost e o ID fictício `demo-estetica`. O cliente impede conexões de emulador em hosts remotos. Não reutilize `.env.local` de emulador em produção. O build de Hosting força o modo de emuladores desligado. Portas: Auth 9099, Firestore 8080, testes Playwright 3101. A configuração dos testes é injetada no processo, sem gravar segredos em arquivos. O workflow `firebase-tests.yml` executa regras e integração em runners GitHub, sem provisionar recursos ou fazer deploy.

### Situação de validação nesta sessão

Passaram: lint, TypeScript, oito testes da plataforma local, dois cenários de autenticação emulada, builds estáticos de GitHub Pages e Hosting, e um smoke test no emulador Hosting (páginas 200 e caminho desconhecido 404). O download Java oficial do Firestore foi bloqueado pela política de rede; por isso a compilação/testes de regras e o teste integrado Auth + Firestore ainda precisam ser executados. Não foram validados em um banco real. O domínio necessário foi salvo no rascunho de rede do ambiente; revisar, salvar e publicar o ambiente aplica a configuração para tarefas futuras. Após liberar o acesso, repita `npm run test:rules` e `npm run test:firebase` antes de implantar as regras.

## 5. Firebase Hosting (opcional)

O site também pode continuar no GitHub Pages. Para Firebase Hosting:

```bash
npm run build:firebase
npx firebase hosting:channel:deploy revisao --project SEU_ID
# Após revisar a prévia:
npx firebase deploy --only hosting --project SEU_ID
```

`build:firebase` gera `out/` na raiz do domínio, sem o prefixo GitHub Pages. `firebase.json` serve as páginas exportadas e preserva 404 real, sem reescrever todos os caminhos para a home. Não há SSR, API ou Functions nessa hospedagem estática. Não publique uma exportação feita com `GITHUB_PAGES=true` no Hosting Firebase. O deploy não está automatizado e não foi executado nesta sessão.

Para GitHub Pages, mantenha as quatro variáveis públicas em Actions → Variables e habilite o domínio nas configurações de Authentication. As variáveis são incorporadas ao build: mudanças exigem nova publicação.

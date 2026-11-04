# Proposta de pull request

**Título:** Cria base Next.js da plataforma Estética e Bem-Estar

## Alteração

Introduz uma aplicação Next.js com TypeScript e Tailwind, aproveitando a identidade e os temas do HTML inicial. Inclui home responsiva, cabeçalho com menu móvel, rodapé com serviços de apoio, serviços, profissionais ilustrativos, planejamento de agendamento, conteúdos educativos e telas de login/cadastro.

O cliente Firebase é inicializado apenas quando suas variáveis estão presentes. Authentication por e-mail/senha está preparado; Firestore é disponibilizado pelo cliente, sem operações de dados. Agendamento, perfis e fidelização permanecem demonstrativos, com indicação visível na interface. O HTML original foi preservado.

## Roteiro de revisão

- Instalar dependências e executar `npm run lint`, `npm run typecheck` e `npm run build`.
- Abrir `/`, `/login` e `/cadastro` em desktop e celular; navegar por teclado e pelo menu móvel.
- Verificar âncoras, seleção de serviço/profissional, rejeição de data passada e mensagem de ausência de reserva.
- Sem Firebase: verificar feedback de acesso ainda indisponível, validação de e-mail e confirmação de senha.
- Com um projeto de desenvolvimento configurado: habilitar E-mail/senha e verificar cadastro, login, erros e ausência de gravações Firestore.

## Limites

Sem backend de agendamento, painel autenticado, artigos completos, regras Firestore ou implantação. Conteúdo educativo não realiza diagnóstico. Não há fotografias ou fontes externas exigidas para renderizar a página.

## Validação executada nesta implementação

- `npm run lint`: passou, sem avisos.
- `npm run typecheck`: passou.
- `npm run build`: passou, gerando `/`, `/login`, `/cadastro` e a página padrão de erro.
- Chromium/Playwright: três rotas retornaram HTTP 200; larguras de 1440, 390 e 320 pixels sem overflow horizontal; menu móvel abre e fecha após navegação.
- Formulários: confirmação de senha, feedback sem Firebase configurado, rejeição de data passada e indicação de que nenhum horário foi reservado.
- Nenhum erro de JavaScript durante esses cenários. Autenticação real e Firestore não foram exercitados: projeto Firebase não configurado.

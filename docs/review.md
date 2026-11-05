# Proposta de pull request

**Título:** Prepara Authentication, Firestore por usuário e exportação para Firebase Hosting

O cliente Firebase agora suporta sessão observada, login/cadastro com redirecionamento, logout e recuperação de senha. Com a configuração Web presente, planejamentos e cuidados são salvos em coleções privadas por UID e acompanhados em tempo real; a demonstração local continua quando Firebase não estiver configurado. Não há importação automática de dados locais.

Inclui regras de segurança protótipo com schema restrito, isolamento por proprietário, timestamps e validação de hábitos, além de testes para emuladores e workflow GitHub. O build `build:firebase` exporta o site para Hosting sem o prefixo GitHub Pages. Nenhum projeto real, banco ou hospedagem foi provisionado.

## Validação e limites

Passaram lint, TypeScript, os oito testes existentes, dois testes Authentication no emulador (cadastro, sessão, login/logout e recuperação genérica), builds para GitHub Pages e Firebase Hosting, e smoke test Hosting com páginas reais e 404. O emulador Firestore não pôde ser baixado por bloqueio de rede; seus testes e a compilação das regras ainda precisam ser executados. `docs/firebase.md` documenta requisitos, comandos e essa limitação.

As regras devem ser revisadas e verificadas antes de implantação ampla. Os pontos não têm valor real, planejamentos não confirmam reservas e prevenção de sobreposição no cliente não garante exclusão entre dispositivos. Dados de hábitos não representam diagnósticos ou registros médicos. Não há vinculação a um projeto de produção nem deploy automático de regras ou Hosting.

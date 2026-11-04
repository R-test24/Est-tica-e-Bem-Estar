# Proposta de pull request

**Título:** Adiciona área local de cuidado com planejamentos, hábitos e fidelidade demonstrativa

A seleção de agendamento agora salva serviço, profissional, data e horário neste navegador. Datas passadas e planos sobrepostos são rejeitados. `/minha-area` exibe os registros e permite removê-los com confirmação; a home e o menu direcionam para essa área.

A área também registra cuidados opcionais por dia, exibe os últimos sete dias e calcula pontos reversíveis (10 por cuidado) e níveis demonstrativos. Não há descontos reais ou pontuação por reserva. Dados ficam em `localStorage`, sem vínculo com contas Firebase ou autenticação; essa limitação aparece na interface. O estado atualiza entre abas da mesma origem e o dia é reavaliado a cada minuto. Armazenamento inválido é preservado com mensagem de erro.

## Validação

- `npm run lint`, `npm run typecheck` e `GITHUB_PAGES=true npm run build`.
- `npm run test:e2e`: testes Playwright para persistência, sobreposição, remoção, hábitos/pontos, datas passadas, registros de dias anteriores e falhas de armazenamento.
- Revisão responsiva de `/minha-area` em 320 pixels.

## Limites

Sem disponibilidade real, envio ao profissional, reserva confirmada, dados médicos, sincronização Firestore ou isolamento por conta. Pessoas no mesmo navegador/origem compartilham os registros locais. Nenhuma infraestrutura Firebase foi provisionada. O conteúdo é educativo; o programa de fidelidade é uma demonstração.
